
//======================================================================================
//  Description: 安全事件
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.SecurEvent = function (nodeIdDict){
    //全部事件节点信息
    //this.eventNodeList = [];
    THREE.Object3D.call(this);
    
    this.nodeIdDict = nodeIdDict !== undefined ? nodeIdDict : {};
}

Space3D.SecurEvent.prototype = Object.create(THREE.Object3D.prototype);

Space3D.SecurEvent.prototype.init = function (){}

Space3D.SecurEvent.prototype.play = function (){}

Space3D.SecurEvent.prototype.pause = function (){}

Space3D.SecurEvent.prototype.stop = function (){}

Space3D.SecurEvent.prototype.goTo = function (para){}

