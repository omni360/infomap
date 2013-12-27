
//======================================================================================
//  Description: 节点系统
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.NodeSystem = function (options){
    
    options = options || {};
    
    this.parent = options.parent !== undefined ? options.parent : {};
    this.color = options.color !== undefined ? options.color : 0xffffff;
    this.size = options.size !== undefined ? options.size : 250;
    this.map = options.map !== undefined ? options.map : null;
    this.data = options.data !== undefined ? options.data : [];
    this.idDict = options.idDict !== undefined ? options.idDict : {};
    this.offset = options.offset;
    this.viewport = options.viewport instanceof Space3D.Viewport ? options.viewport : new Space3D.Viewport();
    
    this.material = new THREE.ParticleBasicMaterial( { 
        color: this.color, size: this.size , blending: THREE.NormalBlending, 
        depthTest: true, transparent : true, vertexColors: true, opacity : 1  
    });
    
    this.map && ( this.material.map = this.map );
    
    this.geometry = new THREE.Geometry();
    this.geometry.dynamic = true;
    
    for (var i = 0; i < this.data.length; i++){
		
        var vector = new THREE.Vector3(this.data[i][10], 0, this.data[i][11]);
        vector.multiplyScalar(6);
        //this.offset instanceof THREE.Vector3 && vector.subSelf(this.offset);
        
        var easing_vector = new THREE.Vector3(this.data[i][2], this.data[i][3], this.data[i][4]);
        this.offset instanceof THREE.Vector3 && easing_vector.subSelf(this.offset);
        
        vector.uid = this.data[i][0];
        vector.name = this.data[i][1];
        vector.links = this.data[i][9];
        vector.region = this.data[i][6];
        vector.constellation = this.data[i][7];
        vector.index = i;
        vector.geometry = this.geometry;
        vector.spline = new THREE.Spline([vector.clone(), easing_vector.clone()]);
        
        this.idDict[this.data[i][0]] = vector;
        
        //var rayCollisionObject = new THREE.SphereCollider(vector.clone().subSelf(this.viewport.position), this.size/6);
        var rayCollisionObject = new THREE.SphereCollider(vector, this.size/4);
        rayCollisionObject.origCenter = vector;
        THREE.Collisions.colliders.push(rayCollisionObject);
        
        this.geometry.vertices.push(vector);
        this.geometry.colors.push(new THREE.Color(this.color));
        
    }
    
    THREE.ParticleSystem.call(this, this.geometry, this.material);
    
}

Space3D.NodeSystem.prototype = Object.create(THREE.ParticleSystem.prototype);

Space3D.NodeSystem.prototype.constructor = Space3D.NodeSystem;
