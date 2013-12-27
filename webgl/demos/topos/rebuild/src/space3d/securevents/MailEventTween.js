
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
    //每组的模型数据
    this.models = [];
    
    this.animateSegment = 0;
    
    //开始结束时间戳
    this.startTimestamp = 0;
    this.endTimestamp = 0;
    this.minTimeOffset = 20000;
    
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
    
    if (result.length > 0 ){
    	
    	this.startTimestamp = Date.parse(result[0]['time']);
    	this.endTimestamp = Date.parse(result[result.length - 1]['time']); 
    	if ((this.endTimestamp - this.startTimestamp) < this.minTimeOffset){
    		this.endTimestamp = this.startTimestamp + this.minTimeOffset;
    	}
    }
    
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
        
    };
    
}

Space3D.MailEvent.prototype.createModels = function (){
	
    if (this.eventGroups.length > 0){
    	
		var itemTime = (this.endTimestamp - this.startTimestamp) / this.eventGroups.length;
		 
		for (var groupIndex in this.eventGroups){
			
			var itemGroup = this.eventGroups[groupIndex];
			
			var startPosition = this.nodeIdDict[itemGroup[0]['node_id']];
            var endPosition = this.nodeIdDict[itemGroup[itemGroup.length - 1]['node_id']];
			
			var lineGeometry = new THREE.Geometry();
			lineGeometry.dynamic = true;
            lineGeometry.verticesNeedUpdate = true;
            
			for (var nodeIndex in itemGroup){
				
				var node = itemGroup[nodeIndex];
				lineGeometry.vertices.push(this.nodeIdDict[node['node_id']]);
				
				nodeIndex != itemGroup.length - 1 && lineGeometry.vertices.push(this.nodeIdDict[node['node_id']]);
				
			}
			var line = new THREE.Line(lineGeometry, this.moveLineMaterial, THREE.LinePieces);
			var mark = new Space3D.Mark({map: Space3D.TexturesLibrary['Mail'], position: startPosition, color: 0xFF0000});
			
			var startMark = startPosition.mail_node_class === "mail_server" ? new Space3D.Mark({ position: startPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailServer']}) : (
            	startPosition.mail_node_class === "mail_client" ? new Space3D.Mark({ position: startPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailClient']}) : null
            );
            
            var endMark = endPosition.mail_node_class === "mail_server" ? new Space3D.Mark({ position: endPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailServer']}) : (
            	endPosition.mail_node_class === "mail_client" ? new Space3D.Mark({ position: endPosition, color: 0xFF0000, map: Space3D.TexturesLibrary['MailClient']}) : null
            );
			
			var model = {
                'line' : line,
                'mark' : mark,
                'startMark': startMark,
                'endMark': endMark,
                //'animateTime': itemTime / (( lineGeometry.vertices.length - 1 ) / 2)
            };
            
			this.models.push(model);
			this.add(line);
			this.add(mark);
			this.add(startMark);
			this.add(endMark);
		}
        
        this.piecesLen = 0;
        
        for (var i = 0; i < this.models.length; i++){
        	
        	this.piecesLen += (this.models[i]['line']['geometry']['vertices'].length - 1) / 2
        	
        } 
        
		this.animateSegment = 1 / this.piecesLen;
		
        //this.play();
		
    }
}
/*
Space3D.MailEvent.prototype.start = function (){

    _self = this;
    var obj = {value : _self.animatePercent};
    this.tween = new TWEEN.Tween(obj)
    	.to({value: 1}, _self.endTimestamp - _self.currentTimestamp)
    	.easing(TWEEN.Easing.Linear.None)
    	.delay(0)
    	.onUpdate(function (){
    		_self.animatePercent = this.value;
    		_self.goTo(_self.animatePercent);
    	})
    	.onComplete(function (){
    	});
    this.playSwitch && this.tween.start();
    
}

Space3D.MailEvent.prototype.play = function (){
	
    this.playSwitch || (this.playSwitch = true);
    this.start();
    
}

Space3D.MailEvent.prototype.pause = function (){
	
	this.tween.stop();
    this.playSwitch && (this.playSwitch = false);
    
}

Space3D.MailEvent.prototype.stop = function (){
	
    this.pause();
	
}
*/

Space3D.MailEvent.prototype.goTo = function (timestamp){
	
	var percent = ( timestamp - this.startTimestamp ) / ( this.endTimestamp - this.startTimestamp );
	percent < 0 && (percent = 0);
	percent > 1 && (percent = 1);

	this.animatePercent = percent;
		
	if ( this.dataModel == "history" ){
		
		var index = Math.floor(percent / this.animateSegment) >= this.piecesLen - 1 ? this.piecesLen - 1 : Math.floor(percent / this.animateSegment);
	    var current_round = percent / this.animateSegment;
	    var segment_percent = parseFloat((current_round - index) / 1, 10);
	    
	    //segment_percent <= 0.03 && ( segment_percent = 0 ); 
	    //segment_percent >= 0.97 && ( segment_percent = 1 ); 
	    
	    var len = 0; 
	    
	    for (var i = 0; i < this.models.length; i++){
				
			this.models[i].line.geometry.verticesNeedUpdate = true;
	    	
	    	if (percent == 1 || percent == 0){
				
				this.models[i].mark.visible = false;
				
				if (percent == 1){
					
					this.models[i].startMark.visible = this.models[i].endMark.visible = true;
					
					for (var k = 0; k < this.models[i].line.geometry.vertices.length; k++){
						
						if (k % 2 != 0){
							
							this.models[i].line.geometry.vertices[k] = this.models[i].line.geometry.vertices[k + 1].clone();
							
						}
					}
					
				}else if (percent == 0){
					
					this.models[i].startMark.visible = this.models[i].endMark.visible = false;
					
					for (var k = 0; k < this.models[i].line.geometry.vertices.length; k++){
						
						if (k % 2 != 0){
							
							this.models[i].line.geometry.vertices[k] = this.models[i].line.geometry.vertices[k - 1].clone();
							
						}
					}
				}
			} else {
	    	
		    	len += (this.models[i].line.geometry.vertices.length - 1) / 2;
		    	
		    	if (len >= (index + 1)){
		    		
		    		var pieceIndex = index - len + (this.models[i].line.geometry.vertices.length - 1) / 2;
		    		pieceIndex = pieceIndex * 2 + 1;
		    		
		    		var path = new THREE.LineCurve3(this.models[i].line.geometry.vertices[pieceIndex - 1].clone(), this.models[i].line.geometry.vertices[pieceIndex + 1].clone());
					
					switch(segment_percent){
		                case 0:
		                    this.models[i].line.geometry.vertices[pieceIndex] = this.models[i].mark.position = path.v1;
		                    break;
		                case 1:
		                    this.models[i].line.geometry.vertices[pieceIndex] = this.models[i].mark.position = path.v2;
		                    break;
		                default:
		                    this.models[i].line.geometry.vertices[pieceIndex] = this.models[i].mark.position = path.getPoint(segment_percent);
	            			this.models[i].mark.visible = true;
							this.models[i].startMark.visible = true;
							this.models[i].endMark.visible = false;
		            }
					
					
					for (var x = pieceIndex + 2; x < this.models[i].line.geometry.vertices.length; x+=2){
						
						this.models[i].line.geometry.vertices[x] = this.models[i].line.geometry.vertices[x - 1].clone(); 
						
					}
					
					for (var j = 0; j < i; j++){
							
						for (var k = 0; k < this.models[j].line.geometry.vertices.length; k++){
							
							if (k % 2 != 0){
								
								this.models[j].line.geometry.vertices[k] = this.models[j].line.geometry.vertices[k + 1].clone();
								this.models[j].mark.visible = false;
							}
						}
						this.models[j].startMark.visible = this.models[j].endMark.visible = true;
						this.models[j].mark.position = this.models[j].line.geometry.vertices[this.models[j].line.geometry.vertices.length - 1].clone();
					}
					
					for (var m = this.models.length - 1; m > i; m--){
						
						for (var n = 0; n < this.models[m].line.geometry.vertices.length; n++){
							
							if (n % 2 != 0){
								
								this.models[m].line.geometry.vertices[n] = this.models[m].line.geometry.vertices[n - 1].clone();
								this.models[m].mark.visible = false;
								
							}
						}
						this.models[m].startMark.visible = this.models[m].endMark.visible = false;
						this.models[m].mark.position = this.models[m].line.geometry.vertices[0].clone();
					}
					
		    		break;
		    	}
			}
	    }
	}
}
