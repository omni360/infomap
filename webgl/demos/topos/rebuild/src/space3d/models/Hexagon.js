/**
 * @author whenlove
 */
Space3D.Hexagon = function (){
        
    Space3D.Model.call(this);
    
    this.clock = new THREE.Clock();
    
    // 调用处
    this.geometry = new THREE.Geometry(),
        h_cx = 0,
        h_cy = 0,
        h_cz = 0,
        h_r = 30
        h_for = 30;
    
    var h_obj = new Object();
    
    var w = 2*h_r*Math.cos(30*0.017453293),
    	n = 2*h_for - 1,
    	offset = w*n/2;
        
    this.draw_hexagon_geometry(this.geometry, h_cx, h_cy, h_cz , h_r, h_obj, h_for);
    
    this.obj = new THREE.Line( this.geometry, new THREE.LineBasicMaterial( { color: 0x0088cc, opacity: 0 } ), THREE.LinePieces );
    this.obj.position.set( -offset,0,0 );
    //line.scale.set( 10, 10, 10);
    this.add( this.obj );
}


Space3D.Hexagon.prototype = Object.create(Space3D.Model.prototype);

Space3D.Hexagon.prototype.constructor = Space3D.Hexagon;
    
Space3D.Hexagon.prototype.draw_hexagon_geometry = function(geometry, cx, cy, cz , r, h_obj, h_for){
    var width = 2*r*Math.cos(30*0.017453293);
    
    for( var i = 0; i < h_for; i ++ ) {
        i_cx = cx + i*width/2;
        i_cz1 = cz + 3*r*i/2;
        i_cz2 = cz - 3*r*i/2;
        for( var j = 0; j < (2*h_for - 1 -i); j++){
            
            //console.info(i, j);
            //console.info(t_cx, t_cz);
            if(i == 0){
                t_cx = i_cx + j*width;
                t_cz = i_cz1;
                this.draw_hexagon(geometry, t_cx, cy, t_cz , r, h_obj);
            }
            else{
                t_cx = i_cx + j*width;
                t_cz = i_cz1;
                this.draw_hexagon(geometry, t_cx, cy, t_cz , r, h_obj);
                
                t_cz = i_cz2;
                this.draw_hexagon(geometry, t_cx, cy, t_cz , r, h_obj);
            }
        }
    }
}

Space3D.Hexagon.prototype.draw_hexagon = function(geometry, cx, cy, cz , r, h_obj){
    var cx1 = cx,
        cz1 = cz - r/2,
        cx2 = cx + r * Math.cos(30*0.017453293),
        cz2 = cz,
        cx3 = cx2,
        cz3 = cz2 + r,
        cx4 = cx,
        cz4 = cz + r + r/2,
        cx5 = cx - r * Math.cos(30*0.017453293),
        cz5 = cz3,
        cx6 = cx - r * Math.cos(30*0.017453293),
        cz6 = cz;
    
    if(! h_obj[cx1.toString() + cz1.toString() + cx2.toString() + cz2.toString()] && ! h_obj[cx2.toString() + cz2.toString() + cx1.toString() + cz1.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx1,cy,cz1 ) );
        geometry.vertices.push( new THREE.Vector3( cx2,cy,cz2 ) );
        h_obj[cx1.toString() + cz1.toString() + cx2.toString() + cz2.toString()] = cx1.toString() + cz1.toString() + cx2.toString() + cz2.toString();
        h_obj[cx2.toString() + cz2.toString() + cx1.toString() + cz1.toString()] = cx2.toString() + cz2.toString() + cx1.toString() + cz1.toString();
    }
    
    if(! h_obj[cx2.toString() + cz2.toString() + cx3.toString() + cz3.toString()] && ! h_obj[cx3.toString() + cz3.toString() + cx2.toString() + cz2.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx2,cy,cz2 ) );
        geometry.vertices.push( new THREE.Vector3( cx3,cy,cz3 ) );
        h_obj[cx2.toString() + cz2.toString() + cx3.toString() + cz3.toString()] = cx2.toString() + cz2.toString() + cx3.toString() + cz3.toString();
        h_obj[cx3.toString() + cz3.toString() + cx2.toString() + cz2.toString()] = cx3.toString() + cz3.toString() + cx2.toString() + cz2.toString();
    }
    
    if(! h_obj[cx3.toString() + cz3.toString() + cx4.toString() + cz4.toString()] && ! h_obj[cx4.toString() + cz4.toString() + cx3.toString() + cz3.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx3,cy,cz3 ) );
        geometry.vertices.push( new THREE.Vector3( cx4,cy,cz4 ) );
        h_obj[cx3.toString() + cz3.toString() + cx4.toString() + cz4.toString()] = cx3.toString() + cz3.toString() + cx4.toString() + cz4.toString();
        h_obj[cx4.toString() + cz4.toString() + cx3.toString() + cz3.toString()] = cx4.toString() + cz4.toString() + cx3.toString() + cz3.toString();
    }
    
    if(! h_obj[cx4.toString() + cz4.toString() + cx5.toString() + cz5.toString()] && ! h_obj[cx5.toString() + cz5.toString() + cx4.toString() + cz4.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx4,cy,cz4 ) );
        geometry.vertices.push( new THREE.Vector3( cx5,cy,cz5 ) );
        h_obj[cx4.toString() + cz4.toString() + cx5.toString() + cz5.toString()] = cx4.toString() + cz4.toString() + cx5.toString() + cz5.toString();
        h_obj[cx5.toString() + cz5.toString() + cx4.toString() + cz4.toString()] = cx5.toString() + cz5.toString() + cx4.toString() + cz4.toString();
    }
    
    // 此处小bug。加上消重的话，会有极少量的边缺失
    //if(! h_obj[cx5.toString() + cz5.toString() + cx6.toString() + cz6.toString()] && ! h_obj[cx6.toString() + cz6.toString() + cx5.toString() + cz5.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx5,cy,cz5 ) );
        geometry.vertices.push( new THREE.Vector3( cx6,cy,cz6 ) );
        h_obj[cx5.toString() + cz5.toString() + cx6.toString() + cz6.toString()] = cx5.toString() + cz5.toString() + cx6.toString() + cz6.toString();
        h_obj[cx6.toString() + cz6.toString() + cx5.toString() + cz5.toString()] = cx6.toString() + cz6.toString() + cx5.toString() + cz5.toString();
    //}
    
    if(! h_obj[cx6.toString() + cz6.toString() + cx1.toString() + cz1.toString()] && ! h_obj[cx1.toString() + cz1.toString() + cx6.toString() + cz6.toString()]){
        geometry.vertices.push( new THREE.Vector3( cx6,cy,cz6 ) );
        geometry.vertices.push( new THREE.Vector3( cx1,cy,cz1 ) );
        h_obj[cx6.toString() + cz6.toString() + cx1.toString() + cz1.toString()] = cx6.toString() + cz6.toString() + cx1.toString() + cz1.toString();
        h_obj[cx1.toString() + cz1.toString() + cx6.toString() + cz6.toString()] = cx1.toString() + cz1.toString() + cx6.toString() + cz6.toString();
    }
}

Space3D.Hexagon.prototype.render = function(){
	/*
	var delta = this.clock.getDelta(),
		time = this.clock.getElapsedTime() * 10;
	
	for ( var i = 0, l = this.geometry.vertices.length; i < l; i ++ ) {
		
		this.geometry.vertices[ i ].y = 35 * Math.sin( i / 10 + ( time + i ) / 7 );
		
	}
	
	this.geometry.verticesNeedUpdate = true;*/
}
