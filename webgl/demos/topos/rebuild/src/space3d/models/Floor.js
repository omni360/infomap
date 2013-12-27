
//======================================================================================
//  Description: 水平地板模型
//  Created Date: 2012-12-19
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.Floor = function (options){
    
    Space3D.Model.call(this);
    
    this.clock = new THREE.Clock();
    
    options = options || {};
    
    this.color = options.color !== undefined ? options.color : 0x0088CC;
    this.size = options.size !== undefined ? options.size : 15000;
    this.segments = options.segments !== undefined ? options.segments : 180;
    this.showDisc = options.showDisc !== undefined ? options.showDisc : true;
    
    var texture = Space3D.TexturesLibrary['Hexagon'];
	texture.anisotropy = 16;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.premultiplyAlpha = true;
	texture.repeat.set( 1, 1 );
	
	var floorWater = Space3D.TexturesLibrary['FloorWater'];
	floorWater.anisotropy = 16;
	floorWater.wrapS = texture.wrapT = THREE.RepeatWrapping;
	floorWater.repeat.set( 20, 20 );
    
    this.material = new THREE.MeshBasicMaterial( {map:texture, wireframe: true, opacity: 0, transparent: true } );
    this.material.color.setHex(this.color);
    this.geometry = new THREE.PlaneGeometry( this.size, this.size, this.segments, this.segments );
    this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	this.geometry.dynamic = true;
    this.geometry.computeFaceNormals();
	this.geometry.computeVertexNormals();
    
    this.obj = new THREE.Mesh( this.geometry, this.material );
    /*
    this.obj = THREE.SceneUtils.createMultiMaterialObject( 
        this.geometry, 
        [
            new THREE.MeshBasicMaterial( {map:texture, color: this.color, wireframe: true, opacity: 0.3, transparent: true, side: THREE.DoubleSide } ) ,
            new THREE.MeshBasicMaterial( {map:floorWater, color: this.color, wireframe: false, opacity: .5, transparent: true, side: THREE.DoubleSide } ), 
        ]
    );
    */
    this.add( this.obj );
    
    this.showDisc && this.createDisc();
}

Space3D.Floor.prototype = Object.create(Space3D.Model.prototype);

Space3D.Floor.prototype.constructor = Space3D.Floor;

Space3D.Floor.prototype.createDisc = function (){
    this.discGeometry = new THREE.Geometry();
    for (i = -this.segments/2; i <= this.segments/2; i++ ){
        for (j = -this.segments/2; j <= this.segments/2; j++ ){
            //控制地板上粒子的坐标
            if ((i%4 == 0 && j%4 == 0 && ( i == 20 || i == -20 || j == 20 || j == -20)) || 
                ((i+2)%4 == 0 && (j+2)%4 == 0 && ( i == 22 || i == -22 || j == 22 || j == -22))
            ){
                    this.discGeometry.vertices.push(
                        new THREE.Vector3(
                            i*(this.size/this.segments),
                            this.position.y,
                            j*(this.size/this.segments)
                        )
                    )
                    this.discGeometry.colors.push(new THREE.Color( 0xffffff ));
            }
        }
    }
    this.discMaterial = new THREE.ParticleBasicMaterial( { color: 0xffffff, size: 60 ,map: Space3D.TexturesLibrary.FloorDisc ,blending: THREE.AdditiveBlending, depthTest: false, transparent : true, vertexColors: true, opacity : 1  }),
    this.discParticles = new THREE.ParticleSystem(this.discGeometry, this.discMaterial);
    this.discParticles.vertexColors = true;
    this.discParticles.sortParticles = true; 
    this.add( this.discParticles );
};

Space3D.Floor.prototype.render = function (){
	/*
	var delta = this.clock.getDelta(),
		time = this.clock.getElapsedTime() * 10;
	
	for ( var i = 0, l = this.geometry.vertices.length; i < l; i ++ ) {
		
		this.geometry.vertices[ i ].y = 35 * Math.sin( i / 10 + ( time + i ) / 7 );
		
	}
	
	this.geometry.verticesNeedUpdate = true;
	*/
};