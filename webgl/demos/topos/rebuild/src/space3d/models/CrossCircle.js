/**
 * @author lvmy
 */
Space3D.CrossCircle = function (options){
        
    Space3D.Model.call(this);
    
    options || (options = {});
    
    this.segmentRadius = options.segmentRadius !== undefined ? options.segmentRadius : 50;
    this.laps = options.laps !== undefined ? options.laps : 19;
    
    this.segmentHeight = Math.cos(Math.PI / 6) * this.segmentRadius;
    
    this.geometry = new THREE.Geometry();
    
    this.paths = [];
    
    for (var i = 0; i < this.laps; i++){
    	
    	if (i == 0){
    		
    		var circle_path = new THREE.EllipseCurve( 0, 0, this.segmentRadius, this.segmentRadius, 0, 2*Math.PI, false);
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
    	//this.geometry = new THREE.Geometry();
    	for (var j = 0; j <= 6; j++){
    		
    		var point = path.getPoint(j / 6);
    		if (j == 0){
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    		}else{
    			this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    			//this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
    		}
    	}
    }
    
	var line = new THREE.Line(this.geometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: 1}), THREE.LinePieces);//
	this.add(line);
	
}


Space3D.CrossCircle.prototype = Object.create(Space3D.Model.prototype);

Space3D.CrossCircle.prototype.constructor = Space3D.CrossCircle;

Space3D.CrossCircle.prototype.render = function(){}
