
//======================================================================================
//  Description: 箭头模型
//  Created Date: 2012-12-19
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.Arrow = function (options){
    
    this.options = options || {};
    this.color = this.options.color !== undefined ? this.options.color : 0xffffff;
    this.scale = this.options.scale !== undefined ? this.options.scale : 1000;
    this.coneScale = this.options.coneScale !== undefined ? this.options.coneScale : .5;
    this.markSize = this.options.markSize !== undefined ? this.options.markSize : 150;
    this.direction = this.options.direction !== undefined ? this.options.direction : 'x';
    
    this.options.markTexture && (
        this.mark = new THREE.Sprite({map: this.options.markTexture, useScreenCoordinates: false, color: this.color}),
        this.mark.scale.set(this.markSize, this.markSize ,1)
    );
    
    this.arrowHelper = new THREE.ArrowHelper(new THREE.Vector3());
    
    var directionVector = new THREE.Vector3();
    switch(this.direction){
        case "x":
            directionVector.x = 1;
            this.arrowHelper.position.x -= this.scale/2;
            this.mark !== undefined && (this.mark.position.x -= (this.scale/2 + 150));
            break;
        case "y":
            directionVector.y = 1;
            this.arrowHelper.position.y -= this.scale/2;
            this.mark !== undefined && (this.mark.position.y -= (this.scale/2 + 150));
            break;
        case "z":
            directionVector.z = 1;
            this.arrowHelper.position.z -= this.scale/2;
            this.mark !== undefined && (this.mark.position.z -= (this.scale/2 + 150));
            break;
        default:
            directionVector.x = 1;
            this.arrowHelper.position.x -= this.scale/2;
            this.mark !== undefined && (this.mark.position.x -= (this.scale/2 + 150));
            break;
    }
    this.arrowHelper.setColor(this.color);
    this.arrowHelper.setDirection( directionVector );
    this.arrowHelper.scale.set(this.scale,this.scale,this.scale);
    this.arrowHelper.cone.scale.set(this.coneScale,this.coneScale,this.coneScale);
    
    Space3D.Model.call(this);
    this.add(this.arrowHelper);
    this.mark !== undefined && this.add(this.mark)
}

Space3D.Arrow.prototype = Object.create(Space3D.Model.prototype);

Space3D.Arrow.prototype.constructor = Space3D.Arrow;