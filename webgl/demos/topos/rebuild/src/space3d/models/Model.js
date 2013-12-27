
//======================================================================================
//  Description: 模型基类
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.Model = function (){
    THREE.Object3D.call(this);
}

Space3D.Model.prototype = Object.create(THREE.Object3D.prototype);

Space3D.Model.prototype.constructor = Space3D.Model;
