
//======================================================================================
//  Description: Mail安全事件
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.MailEvent = function(nodeIdDict, dataModel){
    
    Space3D.SecurEvent.apply(this, arguments);
    
    //全部当前事件节点的集合
    this.eventNodeList = [];
    //临时变量，用于存储前一个节点class类型
    this.prevNodeClass = "";
    //临时存储每组数据中的元素
    this.tempGroup = [];
    //不断扩充的事件组数据
    this.eventGroups = [];
    //eventGroups的索引
    this.groupIndex = 0;
    //每组的模型数据
    this.models = [];
    //事件的运动速率
    this.animateSpeed = 15;
    //当前运动百分比
    this.animatePercent = 0;
    
    this.animateSegment = 0;
    
    //动画播放开关,true：play，false：stop
    this.playSwitch = false;
    
    //用于记录当前运动所至节点的class
    this.currentNodeClass = "";
    //用于记录当前运动所至节点的position
    this.currentNodePosition;
    
    //运动线条的材质
    this.moveLineMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        opacity: 1,
        linewidth: 1,
        vertexColors: false,
        blending : THREE.AdditiveBlending,
        blendSrc: THREE.SrcAlphaFactor, 
        blendDst: THREE.SrcColorFactor, 
        blendEquation: THREE.AddEquation
    });
    
    this.dataModel = dataModel;
}

Space3D.MailEvent.prototype = Object.create(Space3D.SecurEvent.prototype);


Space3D.MailEvent.prototype.initialize = function (){
    
}

//重新组织后台数据
Space3D.MailEvent.prototype.setData = function(result) {
    var has_new_node = false;
    if (this.eventNodeList.length == 0 || ( result.length > 1 && this.eventNodeList.length > 0)) {
        for (k in result){
            if (this.eventNodeList.length == 0 || k != 0){
                this.eventNodeList.push(result[k]);
                if (!this.nodeIdDict[result[k].node_id]){
                    console.log("node_id : " + result[k].node_id + "  is not fount!");
                    return;
                }
                this.nodeIdDict[result[k].node_id]['mail_node_class'] = result[k]['node_class'],
                this.nodeIdDict[result[k].node_id]['mail_node_status'] = result[k]['status']
                !this.nodeIdDict[result[k].node_id]['mail_img'] && (this.nodeIdDict[result[k].node_id]['mail_img'] = false);
                
                if (this.tempGroup.length == 0){
                    this.prevNodeClass = result[k]['node_class'];
                }
                this.tempGroup.push(result[k]);
                if ( (this.prevNodeClass == "mail_server" && result[k]['node_class'] == 'mail_client') ||
                     (this.prevNodeClass == "mail_client" && result[k]['node_class'] == 'mail_server')){
                    this.eventGroups.push(this.tempGroup.concat());
                    this.tempGroup = [];
                }
            }
        }
        has_new_node = true;
    }
    if (has_new_node){
    	
        this.createModels();
        this.play();
        
    };
}

Space3D.MailEvent.prototype.createModels = function (){
    if (this.eventGroups.length > 0){
        var shift_num = 0;
        var start_index = this.groupIndex;
        for (item_index = start_index; item_index < this.eventGroups.length; item_index++){
            if ( this.eventGroups[item_index].length > 1 ){
                var itemGroup = this.eventGroups[item_index];
                //shift_num += 1;
                this.groupIndex += 1;
                //模型文件
                for (i = 0; i < itemGroup.length-1; i++){
                    var lineGeometry = new THREE.Geometry();
                    lineGeometry.dynamic = true;
                    lineGeometry.verticesNeedUpdate = true;
                    
                    var startPosition = this.nodeIdDict[itemGroup[i].node_id];
                    var endPosition = this.nodeIdDict[itemGroup[i+1].node_id];
                    
                    var distance = startPosition.distanceTo(endPosition);
                    
                    lineGeometry.vertices.push(startPosition);
                    lineGeometry.vertices.push(startPosition);
                    
                    var line = new THREE.Line(lineGeometry, this.moveLineMaterial, THREE.LinePieces);
                    line.visible = false;
                    
                    var mark = new Space3D.Mark({map: Space3D.TexturesLibrary['Mail'], position: startPosition, color: 0xFF0000});
                    
                    var startmark = startPosition.mail_node_class === "mail_server" ? new Space3D.Mark({ position: startPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailServer']}) : (
                    	startPosition.mail_node_class === "mail_client" ? new Space3D.Mark({ position: startPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailClient']}) : null
                    );
                    
                    var endmark = endPosition.mail_node_class === "mail_server" ? new Space3D.Mark({ position: endPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailServer']}) : (
                    	endPosition.mail_node_class === "mail_client" ? new Space3D.Mark({ position: endPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailClient']}) : null
                    );
                    
                    var model = {
                        'line' : line,
                        'mark' : mark,
                        'path': new THREE.LineCurve3(startPosition, endPosition),
                        'percent': 0,
                        'speed': this.animateSpeed / distance,
                        'startMark': startmark,
                        'endMark': endmark,
                    };
                    
                    this.add(line);
                    this.add(mark);
                    startmark !== null && this.add(startmark);
                    endmark !== null && this.add(endmark);
                    
                    this.models.push(model);
                }
            }
        }
        /*
        for (i = 0; i < shift_num; i++){
            this.eventGroups.shift();
        }*/
    }
}

Space3D.MailEvent.prototype.start = function (){
	
	this.animateSegment = 1 / this.models.length;
    this.animatePercent += this.animateSpeed / 10000;
    this.animatePercent > 1 + this.animateSegment && (this.animatePercent = 1 + this.animateSegment, this.pause());
    
    this.models.length > 0 && this.goTo(this.animatePercent);
    
    if (!this.playSwitch){
    	
    	for (var i = 0; i < this.models.length; i++){
    		
    		var index = Math.ceil(this.animatePercent / this.animateSegment) >= this.models.length ? this.models.length : Math.floor(this.animatePercent / this.animateSegment);
    		
    		if (i == index || i == this.models.length - 1){
    			
    			this.models[i].mark.visible = false;
    		}
    		
    	}
    	
    }
    
    this.playSwitch && requestAnimationFrame(this.start.bind(this));
    
}

Space3D.MailEvent.prototype.play = function (){
	
    this.playSwitch || (this.playSwitch = true);
    this.start();
    
}

Space3D.MailEvent.prototype.pause = function (){
	
    this.playSwitch && (this.playSwitch = false);
    
}

Space3D.MailEvent.prototype.stop = function (){
	
    this.pause();
    this.animatePercent = 0;
    
    for (i = 0; i < this.models.length; i++){
    	
        this.models[i].line.geometry.vertices[1] = this.models[i].line.geometry.vertices[0] = this.models[i].mark.position;
        this.models[i].line.visible = this.models[i].mark.visible = false;
        this.models[i].percent = 0;
        
    }
    
}

Space3D.MailEvent.prototype.goTo = function (percent){
	
	System.setRollbackBar && System.setRollbackBar(percent);
	
	this.animatePercent = percent;
	
	if ( this.dataModel == "history" ){
		
		var index = Math.floor(percent / this.animateSegment) >= this.models.length ? this.models.length : Math.floor(percent / this.animateSegment);
	    var current_round = percent / this.animateSegment
	    var segment_percent = (current_round - index) / 1;
	    
	    segment_percent <= 0.03 && ( segment_percent = 0 ); 
	    
	    segment_percent >= 0.97 && ( segment_percent = 1 ); 
	    
	    var show_models = this.models.slice(0, index);
	    
		var hide_models = this.models.slice(index);
		
		for (var i = 0; i < show_models.length; i++){
			
			show_models[i].line.geometry.verticesNeedUpdate = true;
			
			switch(segment_percent){
                case 0:
                    this.currentNodePosition = show_models[i].path.v1;
                    show_models[i].startMark && (show_models[i].startMark.visible = true);
                    break;
                case 1:
                    this.currentNodePosition = show_models[i].path.v2;
					show_models[i].endMark && (show_models[i].endMark.visible = true);
                    break;
                default:
                    this.currentNodePosition = show_models[i].path.getPoint(segment_percent);
            }
			
			if (i == show_models.length - 1){
				
				show_models[i].line.visible = show_models[i].mark.visible = true;
				show_models[i].line.geometry.vertices[1] = this.currentNodePosition.clone();
				show_models[i].mark.position = this.currentNodePosition.clone();
				
			}else{
				
				show_models[i].mark.visible = false;
				show_models[i].line.geometry.vertices[1] = show_models[i].path.v2.clone(); 
				
			}
			
		}
		
		for (var i = 0; i < hide_models.length; i++){
			
			hide_models[i].startMark && (hide_models[i].startMark.visible = false);
			hide_models[i].endMark && (hide_models[i].endMark.visible = false);
			hide_models[i].line.visible = hide_models[i].mark.visible = false;
			hide_models[i].line.geometry.vertices[1] = hide_models[i].path.v1.clone();
			hide_models[i].line.geometry.verticesNeedUpdate = true;
			
		}
		
	}else if ( this.dataModel == "current" ){
		
		var obj = this.models[0];
        obj.line.visible = obj.mark.visible = true;
        if (obj.percent <= 1){
            switch(obj.percent){
                case 0:
                    this.currentNodePosition = obj.path.v1;
                    obj.startMark && (obj.startMark.visible = true);
                    break;
                case 1:
                    this.currentNodePosition = obj.path.v2;
                    obj.endMark && (obj.endMark.visible = true);
                    break;
                default:
                    this.currentNodePosition = obj.path.getPoint(obj.percent);
            }
            
            if (obj.percent == 1){
                obj.mark.visible = false;
                this.models.shift();
            }
            
            obj.percent += obj.speed;
            obj.percent > 1 && (obj.percent = 1);
            
            obj.line.geometry.vertices[1] = this.currentNodePosition;
            obj.line.geometry.verticesNeedUpdate = true;
            obj.mark.position = this.currentNodePosition;
            
        }
		
	}
	
}
