
//======================================================================================
//  Description: 星空模型
//  Created Date: 2012-12-19
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.Star = function (options){
    
    options = options || {};
    
    this.color = options.color !== undefined ? options.color : 0xffffff;
    this.size = options.size !== undefined ? options.size : 100;
    this.num = options.num !== undefined ? options.num : 2000;
    this.near = options.near !== undefined ? options.near : 10000;
    this.far = options.far !== undefined ? options.far : 30000;
    
    this.material = new THREE.ParticleBasicMaterial( { 
        size: this.size ,map: Space3D.TexturesLibrary.Star ,
        blending: THREE.AdditiveBlending, depthTest: false, 
        transparent : true, vertexColors: true, opacity : 1  
    }),
    
    this.geometry = new THREE.Geometry();
    
    for (i = 0; i < this.num; i++){
        var star_position = new THREE.Vector3( Math.random()*2 - 1, Math.random()*2 - 1, Math.random()*2 - 1);
        star_position.normalize();
        star_position.multiplyScalar( Math.random() * (this.far - this.near) + this.near );
        this.geometry.vertices.push(star_position);
        this.geometry.colors.push(new THREE.Color(this.color));
    }
    
    this.vertexColors = true;
    this.sortParticles = true; 
    
    THREE.ParticleSystem.call(this, this.geometry, this.material);
}

Space3D.Star.prototype = Object.create(THREE.ParticleSystem.prototype);

Space3D.Star.prototype.constructor = Space3D.Star;
