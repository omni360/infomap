
//======================================================================================
//  Description: 圆形线圈
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.Circle = function (options){
    
    this.options = options || {};
    
    this.radius = this.options.radius !== undefined ? this.options.radius : 325;
    this.color = this.options.color !== undefined ? this.options.color : 0xffffff;
    this.precision = this.options.precision !== undefined ? this.options.precision : 0.01;
    //this.rotation = this.options.rotation !== undefined ? this.options.rotation : {'x': 0, 'y': 0, 'z': 0};
    
    this.path = new THREE.EllipseCurve( 0, 0, this.radius, this.radius, 0, 2*Math.PI, false);
    
    this.geometry = new THREE.Geometry();
    var point = new THREE.Vector2();
    var max_point_at = 0;
    for (var i = 0; i <= 1; i+=this.precision){
        point = this.path.getPoint(i);
        max_point_at = i;
        this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    }
    max_point_at != 1 && (
        point = this.path.getPoint(1),
        this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0))
    )
    
    THREE.Line.call(this, this.geometry,new THREE.LineBasicMaterial({color: this.color ,opacity: 1,linewidth: 2}));
    
}

Space3D.Circle.prototype = Object.create(THREE.Line.prototype);

Space3D.Circle.prototype.constructor = Space3D.Circle;
