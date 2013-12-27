
//======================================================================================
//  Description: FTP安全事件
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.WormEvent = function(nodeIdDict){
    
    Space3D.SecurEvent.apply(this, arguments);
    
    //全部当前事件节点的集合
    this.eventNodeList = [];
    //每组的模型数据
    this.models = [];
    //事件的运动速率
    this.animateSpeed = 0.5;
    //当前运动百分比
    this.animatePercent = 0;
    //动画播放开关,true：play，false：stop
    this.playSwitch = false;

}

Space3D.WormEvent.prototype = Object.create(Space3D.SecurEvent.prototype);


Space3D.WormEvent.prototype.initialize = function (){
    //	Space3D.TexturesLibrary['Worm'];
}

//重新组织后台数据
Space3D.WormEvent.prototype.setData = function(result) {
	
    var has_new_node = false;
    
    if (this.eventNodeList.length == 0 || ( result.length > 1 && this.eventNodeList.length > 0)) {
        
        for (k in result){
        	
            if (this.eventNodeList.length == 0 || k != 0){
            	
                this.eventNodeList.push(result[k]);
                
            }
            
        }
        
        has_new_node = true;
        
    }
    if (has_new_node){
    	
        this.createModels();
        this.play();
        
    };
    
}


Space3D.WormEvent.prototype.createModels = function (){
	
	if (this.eventNodeList.length > 0){
		
		for (var i = 0; i < this.eventNodeList.length; i++){
			
			var worm_mark = new Space3D.Mark({map: Space3D.TexturesLibrary['Worm'], position: this.nodeIdDict[this.eventNodeList[i]['node_id']], color: 0xFF0000}); 
			this.add(worm_mark);
			this.models.push(worm_mark)
			
		}
		
	}
	
}

Space3D.WormEvent.prototype.start = function (){
	
    this.animatePercent += this.animateSpeed / 1000;
    this.animatePercent > 1 && (this.animatePercent = 1, this.pause());
    this.goTo(this.animatePercent);
    this.playSwitch && requestAnimationFrame(this.start.bind(this));
    
}

Space3D.WormEvent.prototype.play = function (){
	
    this.playSwitch || (this.playSwitch = true);
    this.start();
    
}

Space3D.WormEvent.prototype.pause = function (){
	
    this.playSwitch && (this.playSwitch = false);
    
}

Space3D.WormEvent.prototype.stop = function (){
    
    this.pause();
    this.animatePercent = 0;
    
    for (var i = 0; i < this.models.length; i++){
    	
        this.models[i].visible = false;
    
    }

}

Space3D.WormEvent.prototype.goTo = function (percent){
		
	var high_light_nodes = this.models.slice(0, Math.floor(this.models.length * percent));
	
	var others = this.models.slice(Math.floor(this.models.length * percent));
	
	for (var i = 0; i < high_light_nodes.length; i++){
		
		high_light_nodes[i].visible = true;
	
	}
	for (var i = 0; i < others.length; i++){
		
		others[i].visible = false;
	
	}

}