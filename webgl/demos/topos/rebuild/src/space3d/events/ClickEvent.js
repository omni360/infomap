
//======================================================================================
//  Description: 自定义事件--ClickRay
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.ClickEvent = function (target){
    
    Space3D.Event.call(this);
    
    this.projector = new Space3D.Projector;
    this.ray = new THREE.Ray()
}

Space3D.ClickEvent.prototype = Object.create(Space3D.Event.prototype);

Space3D.ClickEvent.prototype.constructor = Space3D.ClickEvent;

Space3D.ClickEvent.prototype.xxx = function (){
    
}
