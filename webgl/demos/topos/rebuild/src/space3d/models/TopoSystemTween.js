
//======================================================================================
//  Description: 主体拓扑系统
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.TopoSystem = function (options){
	
    Space3D.Model.call(this);
    
    options = options || {};
    
    /* data = {server: [], host:[], router: [], switch: [], ids: [], ips: [], firewall: []} */
    this.data = options.data !== undefined ? options.data : {};
    this.viewport = options.viewport instanceof Space3D.Viewport ? options.viewport : new Space3D.Viewport();
    this.lineColor = options.lineColor !== undefined ? options.lineColor : 0x0088CC;
    this.lineOpacity = options.lineOpacity !== undefined ? options.lineOpacity : 0.6;
    this.offsetVector = this.data.middlePoint !== undefined ? new THREE.Vector3(this.data.middlePoint[0], this.data.middlePoint[1], this.data.middlePoint[2]) : null;
    this.dataModel = options.dataModel !== undefined ? options.dataModel : 'history';
    this.sys = options.sys !== undefined ? options.sys : null;
	    
    this.eventList = options.eventList !== undefined ? options.eventList : [];
    this.eventDict = {};
    
    this.nodeIdDict = {};
    this.nodeVectorList = [];
    this.tweenList = [];
    this.systemList = [];
    //this.drawSystems();
    //this.drawLines();
}

Space3D.TopoSystem.prototype = Object.create(Space3D.Model.prototype);

Space3D.TopoSystem.constructor = Space3D.TopoSystem;

Space3D.TopoSystem.prototype.drawSystems = function (isResetScene){
	
    for (i in this.data){
        var system;
        switch(i){
            case 'server':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Server, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'server';
                break;
            case 'host':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Host, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'host';
                break;
            case 'router':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Router, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'router';
                break;
            case 'switch':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Switch, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'switch';
                break;
            case 'ids':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Ids, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'ids';
                break;
            case 'ips':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Ips, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'ips';
                break;
            case 'firewall':
                system = new Space3D.NodeSystem({parent: this, size: 100, map: Space3D.TexturesLibrary.Firewall, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'firewall';
                break;
        }
        
        system && this.systemList.push(system);
        
    } 
    
    var first_spline_points = this.nodeIdDict[this.data['level'][0][0]]['spline']['points'];
    
    var offset = first_spline_points[1].clone().subSelf(first_spline_points[0].clone())
    
    for ( var i in this.nodeIdDict){
    	var clone_vector = this.nodeIdDict[i].clone().addSelf(offset);
    	this.nodeIdDict[i].set(clone_vector.x, clone_vector.y, clone_vector.z);
    	this.nodeIdDict[i]['spline']['points'][0] = clone_vector;
    }
    
    for (var i = 0; i < this.systemList.length; i++ ){
    	this.add(this.systemList[i])
    }
    
    //this.animateSystem();
    this.animateNodes(isResetScene);
   	
}

Space3D.TopoSystem.prototype.render = function (){
	
}

Space3D.TopoSystem.prototype.animateSystem = function (){
	
 	this.rotation.x = Math.PI / 2;
    
   	//try{
    	
    	var _this = this;
   		
   		//this.data['basicPosition'].length;
   		//this.data['basicMiddle'].length;
   		var first_spline = _this.nodeIdDict[_this.data['level'][0][0]]['spline']['points'];
	 	var add_vector = first_spline[1].clone().subSelf(first_spline[0]);
		add_vector.angle = 0;
	    var tween = new TWEEN.Tween({angle: Math.PI / 2, x: 0, y: 0, z: 0})
	    	
	    	.to(add_vector, 1000)
	    	.easing(TWEEN.Easing.Linear.None)
			.delay(1500)
			.onUpdate(function (){
				_this.rotation.x = this.angle;
				
				for (var i in _this.nodeIdDict){
							
					var v1 = _this.nodeIdDict[i]['spline']['points'][0];
					
					_this.nodeIdDict[i].x = v1.x + this.x;
					_this.nodeIdDict[i].y = v1.y + this.y;
					_this.nodeIdDict[i].z = v1.z + this.z;
					
					_this.nodeIdDict[i]['geometry'].verticesNeedUpdate = true;
					_this.line.geometry.verticesNeedUpdate = true;
					
				}
				
			})
			.onComplete(function (){
				
	    		TWEEN.remove(this);
	    		for (var i in _this.nodeIdDict){
					
					_this.nodeIdDict[i]['spline']['points'][0] = _this.nodeIdDict[i].clone();
					
				}
	    		
	    		_this.animateNodes();
	    		
			})
			.start();
		this.tweenList.push(tween);
	/*
   	}catch(e){
   		//console.log(e.message)
   		TWEEN.remove(tween);
   		this.rotation.x = 0;
   	}*/
}
Space3D.TopoSystem.prototype.animateNodes = function (isResetScene){
	
	var _this = this;
	var temp_obj = {};
	
	for (var i = 0; i < this.data['level'].length; i++){
		
		var item_level = this.data['level'][i];

		var tween = new TWEEN.Tween({percent: 0, level_list: item_level.concat()})
			.to({percent: 1}, 2000)
	    	.easing(TWEEN.Easing.Linear.None)
	    	.delay((i + 2)*1000 + 300)
	    	.onUpdate(function (){
	    		
	    		for (var j = 0; j < this.level_list.length; j++){
	    				
    				var node_id = this.level_list[j];
    				var geometry = _this.nodeIdDict[node_id]['geometry'];
    				var p = _this.nodeIdDict[node_id]['spline'].getPoint(this.percent);
    				
    				temp_obj[node_id] = node_id;
    				
    				_this.nodeIdDict[node_id].x = p.x;
	    			_this.nodeIdDict[node_id].y = p.y;
	    			_this.nodeIdDict[node_id].z = p.z;
	    			
		    		_this.line.geometry.verticesNeedUpdate = true;
		    		geometry.verticesNeedUpdate = true;
		    		
	    		}
	    	})
	    	.onComplete(function (){
	    		TWEEN.remove(this);
	    	})
	    .start();
	    this.tweenList.push(tween);
		
	}
	if (isResetScene){
		var tween = new TWEEN.Tween({radius: _this.sys.cameraRadius, phi: 180, opacity: 0})
			.to({radius: 5000, phi: 25, opacity: 1}, (this.data['level'].length - 1) * 1000)
	    	.easing(TWEEN.Easing.Linear.None)
	    	.delay(3000)
	    	.onUpdate(function (){
	    		_this.sys.cameraRadius = this.radius;
	    		_this.sys.phi = this.phi;
	    		_this.sys.floor.obj.material.opacity = this.opacity;
	    	})
	    	.onComplete(function (){
	    		
	    		_this.animateComplete();
	    		TWEEN.remove(this);
	    	})
	    	.start();
	    this.tweenList.push(tween);
	}
	
}

Space3D.TopoSystem.prototype.animateComplete = function (){
	
}

Space3D.TopoSystem.prototype.drawLines = function (){
    
    var line_vertices = []; 
    
    for ( i in this.nodeIdDict ){
        links = this.nodeIdDict[i]['links'];
        for ( j in links ){
            line_vertices.push(this.nodeIdDict[i]);
            line_vertices.push(this.nodeIdDict[links[j]]);
        }
        
        this.nodeVectorList.push(this.nodeIdDict[i]);
        
    }
    
    this.line = new Space3D.DashedLine({color: this.lineColor, opacity: this.lineOpacity, vertices: line_vertices});
    this.add(this.line);
    this.initEvents();
}

Space3D.TopoSystem.prototype.initEvents = function(){
    for (i = 0; i < this.eventList.length; i++){
        switch(this.eventList[i]['type']){
            case "ftp":
                var ftp_event = new Space3D.FtpEvent(this.nodeIdDict, this.dataModel)
                this.eventDict['ftp'] = ftp_event;
                this.add(ftp_event);
                break;
            
            case "mail":
            	var mail_event = new Space3D.MailEvent(this.nodeIdDict, this.dataModel)
                this.eventDict['mail'] = mail_event;
                this.add(mail_event);
                break;
            
            case "worm":
            	var worm_event = new Space3D.WormEvent(this.nodeIdDict, this.dataModel)
                this.eventDict['worm'] = worm_event;
                this.add(worm_event);
            	break;
            
            case "trojan":
            	var trojan_event = new Space3D.TrojanEvent(this.nodeIdDict, this.dataModel)
                this.eventDict['trojan'] = trojan_event;
                this.add(trojan_event);
            	break;
        }
    }
    
    this.complete();
    
}

Space3D.TopoSystem.prototype.generateLink = function(nodes){
	
	var result = {}
	
	var has_node = '';
	
	var node_list = [];
	
	for (var i in nodes){
		node_list.push(i);
	}
	
	if (node_list.length != 2){
		has_node = 'not_enough'
	}else{
		
		has_node = 'succ';
		
		this.link = this.iterationFindLink( [node_list[0]], node_list[1] );
		
		this.link == "fail" ? has_node = 'fail' : result['link'] = this.link;
		
	}
	
	result['flag'] = has_node;
	
	return result;
}

Space3D.TopoSystem.prototype.iterationFindLink = function(link_list, target_id){
	
	var link_list = link_list.concat();	
	var last_id = link_list[link_list.length - 1];
	var last_links = this.nodeIdDict[last_id]['links'];
	var find_target = false;
	
	for (var i = 0; i < last_links.length; i++){
		
		if (last_links[i] == target_id){
			
			link_list.push(last_links[i]);
			find_target = true;
			break;
				
		}
		
	}
	
	if (!find_target){
		
		/*
		for (var i = 0; i < last_links.length; i++){
			
			link_list.push(last_links[i]);
			this.iterationFindLink(link_list, target_id);
			
		}*/
		
		return 'fail';
		
	}
	
	return link_list;
	
}

Space3D.TopoSystem.prototype.eventGoTo = function(percent){
	for ( i in this.eventDict ){
		
		var key = i;
		
		this.eventDict[key].goTo(percent);
		
	}
}

Space3D.TopoSystem.prototype.eventPlay = function(percent){
	/*
	for ( i in this.eventDict ){
		var key = i;
		this.eventDict[key].play();
	}
	*/
}

Space3D.TopoSystem.prototype.eventPause = function(percent){
	/*
	for ( i in this.eventDict ){
		var key = i;
		this.eventDict[key].pause();
	}
	*/
}



Space3D.TopoSystem.prototype.reset = function (){
	
	for (var i = 0; i < this.tweenList.length; i++){
		TWEEN.remove(this.tweenList[i]);
	}
	
	var children = this.children.concat();
	
	for (var childIndex in children){
    	this.remove(children[childIndex])
    }
    
    
    this.systemList = [];
    this.eventDict = {};
    this.nodeIdDict = {};
	
}

Space3D.TopoSystem.prototype.update = function (options){
    
    this.reset();
    
    this.data = options.data !== undefined ? options.data : {};
    this.offsetVector = this.data.middlePoint !== undefined ? new THREE.Vector3(this.data.middlePoint[0], this.data.middlePoint[1], this.data.middlePoint[2]) : null;
    this.isResetScene = options.isResetScene !== undefined ? options.isResetScene : true;
    
    
    this.drawSystems(this.isResetScene);
    this.drawLines();
	
}

Space3D.TopoSystem.prototype.complete = function (){
    
}
/*
Space3D.TopoSystem.prototype.update = function (options){
    
    for (var childIndex in this.children){
    	this.remove(this.children[childIndex])
    }
    
    this.data = options.data !== undefined ? options.data : {};
    this.offsetVector = this.data.middlePoint !== undefined ? new THREE.Vector3(this.data.middlePoint[0], this.data.middlePoint[1], this.data.middlePoint[2]) : null;
    this.eventList = options.eventList !== undefined ? options.eventList : [];
    
    this.eventDict = {};
    this.nodeIdDict = {};
    
    this.drawSystems();
    this.drawLines();

}
*/
