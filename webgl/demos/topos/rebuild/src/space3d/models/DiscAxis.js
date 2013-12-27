
//======================================================================================
//  Description: 水平地板模型
//  Created Date: 2012-12-19
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.DiscAxis = function (options){
    
    Space3D.Model.call(this);
    
    options || (options = {});
    
    this.depht = options.depht !== undefined ? options.depht : 100;
    this.radius = options.radius !== undefined ? options.radius : 500;
    this.length = options.length !== undefined ? options.length : 100;
    this.angle = options.angle !== undefined ? options.angle : 0;
    this.opacity = options.opacity !== undefined ? options.opacity : 1;
    
    this.vertices = [];
    this.colors = [];
    
    this.path = new THREE.EllipseCurve( 0, 0, this.radius, this.radius, 0, 2*Math.PI, false);
    
    for (var i = 0; i < this.length; i++){
    	
    	var point = this.path.getPoint(i / this.length);
    	
    	this.vertices.push(new THREE.Vector3(point.x, -this.depht/2, point.y));
    	this.vertices.push(new THREE.Vector3(point.x, this.depht/2, point.y));
    	
    	this.colors.push(new THREE.Color(0xff0000));
    	this.colors.push(new THREE.Color(0xff0000));
    }
    
    this.obj = new Space3D.DashedLine({vertices: this.vertices, colors: this.colors, vertexColors: true, opacity: this.opacity});
    
    this.add(this.obj);
    
}

Space3D.DiscAxis.prototype = Object.create(Space3D.Model.prototype);

Space3D.DiscAxis.prototype.constructor = Space3D.DiscAxis;

Space3D.DiscAxis.prototype.render = function (){
	
};