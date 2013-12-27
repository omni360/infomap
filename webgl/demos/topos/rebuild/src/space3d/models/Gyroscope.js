
//======================================================================================
//  Description: 陀螺仪
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.Gyroscope = function (color){
    
    Space3D.Model.call(this);
    
    this.color = color !== undefined ? color: 0xffffff;
    
    this.arrowX = new Space3D.Arrow({'color': 0xFF0000,'markTexture':Space3D.TexturesLibrary['AxisX'], 'direction': 'x'})
    this.arrowY = new Space3D.Arrow({'color': 0x00FF00,'markTexture':Space3D.TexturesLibrary['AxisY'], 'direction': 'y'})
    this.arrowZ = new Space3D.Arrow({'color': 0x00C0FF,'markTexture':Space3D.TexturesLibrary['AxisZ'], 'direction': 'z'})
    
    this.circleXY = new Space3D.Circle({color: this.color});
    this.circleXZ = new Space3D.Circle({color: this.color});
    this.circleXZ.rotation.x = Math.PI/2;
    //this.circleYZ = new Space3D.Circle({color: this.color});
    //this.circleYZ.rotation.y = Math.PI/2;
    
    this.add(this.arrowX);
    this.add(this.arrowY);
    this.add(this.arrowZ);
    
    this.add(this.circleXY);
    this.add(this.circleXZ);
    //this.add(this.circleYZ);
}

Space3D.Gyroscope.prototype = Object.create(Space3D.Model.prototype);

Space3D.Gyroscope.constructor = Space3D.Gyroscope;