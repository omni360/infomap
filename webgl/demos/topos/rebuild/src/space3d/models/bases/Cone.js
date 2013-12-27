
//======================================================================================
//  Description: 箭头模型
//  Created Date: 2012-12-19
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================


Space3D.Cone = function (options){
	
	Space3D.Model.call(this);
	
	options = options || {};
	
	this.color = options.color !== undefined ? options.color : 0xff0000;
	this.size = options.size !== undefined ? options.size : 1000;
	
	this.coneGeometry = new THREE.CylinderGeometry( 0, 0.05, 0.25, 5, 1 );
	this.cone = new THREE.Mesh( this.coneGeometry, new THREE.MeshBasicMaterial( { color: this.color } ) );
	this.cone.scale.set(this.size, this.size, this.size);
	
	this.cone.visible = false;
	
	this.add(this.cone);
	
}

Space3D.Cone.prototype = Object.create(Space3D.Model.prototype);

Space3D.Cone.prototype.setDirection = function ( dir ) {

	var axis = new THREE.Vector3( 0, 1, 0 ).crossSelf( dir );

	var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );

	this.cone.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );

	this.cone.rotation.setEulerFromRotationMatrix( this.cone.matrix, this.cone.eulerOrder );

};

Space3D.Cone.prototype.constructor = Space3D.Cone;
