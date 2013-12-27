
//======================================================================================
//  Description: 标识
//  Created Date: 2012-12-20
//  Modify Date: 2012-12-20
//  Author: lvmy
//======================================================================================

Space3D.MarkLibarary = [];

Space3D.Mark = function ( options ){
    
    THREE.Sprite.apply(this,arguments);
    
    this.useScreenCoordinates = false;
    this.fog = false;
    this.opacity = 1;
    this.visible = false;
    this.position = options.position instanceof THREE.Vector3 ? options.position : new THREE.Vector3();
    //this.blending = THREE.AdditiveBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.SrcColorFactor;
    this.blendEquation = THREE.AddEquation;
    
    Space3D.MarkLibarary.push(this);
    
}

Space3D.Mark.prototype = Object.create(THREE.Sprite.prototype);

