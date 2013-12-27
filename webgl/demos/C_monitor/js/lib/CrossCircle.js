/**
 * @author lvmy
 */
CrossCircle = function (options){
        
    THREE.Object3D.call(this);
    
    this.clock = new THREE.Clock();
    
    options = options || {};
    
    this.segmentRadius = options.segmentRadius !== undefined ? options.segmentRadius : 30;
    this.laps = options.laps !== undefined ? options.laps : 30;
    
    this.segmentHeight = Math.cos(Math.PI / 6) * this.segmentRadius;
    
    this.geometry = new THREE.Geometry();
    
    this.paths = [];
    
    for (var i = 0; i < this.laps; i++){
    	
    	if (i == 0){
    		
    		var circle_path = new THREE.EllipseCurve( 0, 0, this.segmentRadius, this.segmentRadius, 0, 0, false);
    		this.paths.push(circle_path);
    		
    	}else{
    		
    		var circle_num = 6;
    		var radius = i * 2 * this.segmentHeight;
    		//var circle_path = new THREE.EllipseCurve( 0, 0, radius, radius, Math.PI / 2, 2*Math.PI + Math.PI / 2, false);
    		var circle_path = new THREE.EllipseCurve( 0, 0, radius, radius, Math.PI / 3, 2*Math.PI + Math.PI / 3, false);
    		
    		var vertices = [];
    		
    		for (var j = 0; j < circle_num; j++){
    			
    			var vertex = circle_path.getPoint(j / circle_num);
    			vertices.push(vertex);
    			
    		}
    		
    		for (var j = 0; j < vertices.length; j++){
    			
    			var path;
    			
    			if (j == vertices.length - 1){
    				path = new THREE.LineCurve(vertices[j], vertices[0])
    			}else{
    				path = new THREE.LineCurve(vertices[j], vertices[j+1])
    			}

    			for (var k = 0; k <= i; k++){
    				
    				var vertex = path.getPoint(k / i);
    				var circle_path = new THREE.EllipseCurve(vertex.x, vertex.y, this.segmentRadius, this.segmentRadius, 0, 2*Math.PI, false);
    				this.paths.push(circle_path);
    			}
    		}
    	}
    }
    
    
    for (var i = 0; i < this.paths.length; i++){
    	
    	var path = this.paths[i];
    	
    	for (var j = 0; j <= 6; j++){
    		
    		var point = path.getPoint(j / 6);
    		
    		if (j == 0 || j == 6){
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    		}else{
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    		}
    	}
		
    }
    
    this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	this.obj = new THREE.Line(this.geometry, new THREE.LineBasicMaterial({color: 0x0088cc, opacity: 0}), THREE.LinePieces);
	/*
	var points = [];
	
	for (var i = 0; i < this.paths.length; i++){
    	
    	var path = this.paths[i];
    	
    	for (var j = 0; j <= 6; j++){
    		
    		var point = path.getPoint(j / 6);
    			points.push(point);
    			points.push(point);
    	}
    }
    
    var shape = new THREE.Shape(points);
    
    var geometry = new THREE.ShapeGeometry( shape );

	this.obj = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false, transparent: true, side: THREE.DoubleSide } ) );
    */
	this.add(this.obj);
}


CrossCircle.prototype = Object.create(THREE.Object3D.prototype);

CrossCircle.prototype.constructor = CrossCircle;

CrossCircle.prototype.render = function(){
	/*
	var delta = this.clock.getDelta(),
		time = this.clock.getElapsedTime() * 10;
	
	for ( var i = 0, l = this.geometry.vertices.length; i < l; i ++ ) {
		
		this.geometry.vertices[ i ].y = 35 * Math.sin( i / 10 + ( time + i ) / 7 );
		
	}
	
	this.geometry.verticesNeedUpdate = true;
	*/
}
