
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
    
    
    this.eventList = options.eventList !== undefined ? options.eventList : [];
    this.eventDict = {};
    
    this.nodeIdDict = {};
    this.drawSystems();
    this.drawLines();
    
}

Space3D.TopoSystem.prototype = Object.create(Space3D.Model.prototype);

Space3D.TopoSystem.constructor = Space3D.TopoSystem;

Space3D.TopoSystem.prototype.drawSystems = function (){
	
    for (i in this.data){
        var system;
        switch(i){
            case 'server':
                system = new Space3D.NodeSystem({size: 120, map: Space3D.TexturesLibrary.Server, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'server';
                break;
            case 'host':
                system = new Space3D.NodeSystem({size: 120, map: Space3D.TexturesLibrary.Host, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'host';
                break;
            case 'router':
                system = new Space3D.NodeSystem({size: 180, map: Space3D.TexturesLibrary.Router, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'router';
                break;
            case 'switch':
                system = new Space3D.NodeSystem({size: 180, map: Space3D.TexturesLibrary.Switch, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'switch';
                break;
            case 'ids':
                system = new Space3D.NodeSystem({size: 180, map: Space3D.TexturesLibrary.Ids, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'ids';
                break;
            case 'ips':
                system = new Space3D.NodeSystem({size: 180, map: Space3D.TexturesLibrary.Ips, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'ips';
                break;
            case 'firewall':
                system = new Space3D.NodeSystem({size: 180, map: Space3D.TexturesLibrary.Firewall, data: this.data[i], idDict: this.nodeIdDict, offset: this.offsetVector, viewport: this.viewport});
                system.type = 'firewall';
                break;
        }
        
        system && this.add(system);
        
    } 
    
}

Space3D.TopoSystem.prototype.drawLines = function (){
    this.lineMaterial = new THREE.LineBasicMaterial({color: this.lineColor, opacity: this.lineOpacity, linewidth: 2});
    this.lineGeometry = new THREE.Geometry();
    for ( i in this.nodeIdDict ){
        index = i;
        links = this.nodeIdDict[index]['links'];
        for ( j in links ){
            this.lineGeometry.vertices.push(this.nodeIdDict[index]);
            this.lineGeometry.vertices.push(this.nodeIdDict[links[j]]);
        }
    }
    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial, THREE.LinePieces);
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
        }
    }
}

Space3D.TopoSystem.prototype.eventGoTo = function(percent){
	for ( i in this.eventDict ){
		var key = i;
		
		this.eventDict[key].goTo(percent);
	}
}

Space3D.TopoSystem.prototype.eventPlay = function(percent){
	
	for ( i in this.eventDict ){
		var key = i;
		this.eventDict[key].play();
	}
	
}

Space3D.TopoSystem.prototype.eventPause = function(percent){
	
	for ( i in this.eventDict ){
		var key = i;
		this.eventDict[key].pause();
	}
	
}

Space3D.TopoSystem.prototype.update = function (){
    
}
