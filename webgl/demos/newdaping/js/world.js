var composer;
var WorldMap = function(){
	var me = this;
	me.mapScale = 4;
	
	me.width = 360*me.mapScale;
	me.height = me.width/2+100;
	me.depth = 6;
	
	// 设置绘制方式： 线(Line) && 点(Point)
	me.drawType = 'Line';

	// 是否开启Control 
	me.controlFlag = true;
	
	// css 3d flag
	me.css3dFlag = true;
	
	me.colors = {
		clearColor: 0x111111,
		// 面板正面
		planeFaceA: '#222',
		// 面板侧面 
		planeFaceB: '#222',
		// 地图连线
		worldline: '#67A8E6',
		worldPoint: '#67A8E6',
		//标尺
		ruleLine: '#fff'
	}
	
	me.carmeraTarget = new THREE.Vector3(0,0,0);
	
	me.init = function(){
		me.initCarmera(10000,1100);
		me.initScene();
		me.initRender();
		me.createMapPanelObj();
		me.drawMap();
		me.initControl();
		me.onWindowResize();
	}
	
	me.initCarmera = function(far,distance){
		me.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, far);
		me.camera.position.z = distance;
	}
	me.initScene = function(){
		me.scene = new THREE.Scene();

		// var light = new THREE.DirectionalLight( 0xffffff );
		// light.position.set( 0, 0, 1 );
		// me.scene.add( light );
	}
	
	me.initRender = function(){
		me.renderer = new THREE.WebGLRenderer( { clearColor: me.colors.clearColor, clearAlpha: 1, antialias: true } );
		me.renderer.autoClear = false;
		me.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( me.renderer.domElement );
	}
	
	me.initControl = function(){
		me.controls = new THREE.TrackballControls( 
			me.camera
		);
		me.controls.rotateSpeed = 0.5;
	}
	
	me.onWindowResize = function() {
		window.addEventListener( 'resize', function(){
			me.camera.aspect = window.innerWidth / window.innerHeight;
			me.camera.updateProjectionMatrix();
			me.renderer.setSize( window.innerWidth, window.innerHeight );
		}, false );
	}
	
	me.animate = function() {
		requestAnimationFrame( me.animate );
		me.controlFlag && me.controls.update();
		// me.camera.lookAt(me.carmeraTarget);
		me.renderer.render( me.scene, me.camera );
	}
	
	me.createMapPanelObj = function(){
		me.mapPlaneObj = new THREE.Object3D();
		
		me.mapPlaneObj.rotation.x = -Math.PI*5/180;
		
		me.scene.add(me.mapPlaneObj);
	}

	
	me.drawMap = function(){
		var extrudeSettings = { amount: 20 };

		x = y = 0;

		var californiaPts = [];


		


		var a = 160;
		if(me.drawType === 'Line'){
			material = me.fuzzyFlag ? 
			 (new THREE.LineBasicMaterial( { 
			 	color: '#fff', 
			 	opacity: 1, 
			 	linewidth: 13, 
			 	vertexColors: THREE.VertexColors 
			 })) : (
			 new THREE.LineBasicMaterial({ 
				color: me.colors.worldline
			}));
			  
			var geometry = new THREE.Geometry();
			geometry.dynamic = true;

			var colors = [];



			for (var i = 0, area; area = me.points[i]; i++) {
			  	californiaPts = [];
			  	for(var j = 0, point; point = area[j]; j++){
					colors = new THREE.Color( 0xffffff );
					colors.setHSL( 0.8, 1.0, Math.max( 0, ( 200 - point[0] ) / 400 ) * 0.5 + 0.5 );
			  		if (j != 0){
			  			geometry.vertices.push(new THREE.Vector3( point[0], point[1], 4));
						geometry.colors.push(colors)
			  		}
			  		geometry.vertices.push(new THREE.Vector3( point[0], point[1], 4));
					geometry.colors.push(colors)

					californiaPts.push( new THREE.Vector2 ( point[0], point[1] ) );

				}

				geometry.vertices.push(new THREE.Vector3( area[(area.length-1)][0], area[(area.length-1)][1], 4));
				geometry.colors.push(colors)

				var californiaShape = new THREE.Shape( californiaPts );

				addShape( californiaShape, extrudeSettings, 0xffaa00, 0, 0, 0, 0, 0, 0, 4 );

			}

			me.worldLine = new THREE.Line( 
				geometry, 
				new THREE.LineDashedMaterial( { color: '#f0f0f0', dashSize: 3, gapSize: 1, linewidth: 2 } ), 
				THREE.LinePieces 
			);
			
			me.worldLine.scale.set(me.mapScale,me.mapScale,1);

			// function coordToSphereVector(x, y, r){
					
			// 	r = r !== undefined ? r : radius;
				
			// 	var phi = (180 - y) * Math.PI / 180;
			//     var theta = (180 - x) * Math.PI / 180;
				
			// 	var v = new THREE.Vector3();
			//     v.x = r * Math.cos(phi) * Math.cos(theta);
			// 	v.y = r * Math.cos(phi) * Math.sin(theta);
			// 	v.z = r * -Math.sin(phi);
				
			// 	return v;
			// }
			// vertices = geometry.vertices;
			// for (var i = 0; i < vertices.length; i++){
			// 	var vector = coordToSphereVector(vertices[i].x, 0, 220 / 3);
			// 	geometry.vertices[i] = vector;
			// }
			// geometry.verticesNeedUpdate = true;

			me.mapPlaneObj.add(me.worldLine);

			// var gu = new THREE.GeometryUtils({});



			// for(var i = 0 ;i < me.t.length - 1; i++){

			// 	THREE.GeometryUtils.merge(me.t[i].geometry,me.t[i+1].geometry);
			// }

		}else{
			var geometry = new THREE.Geometry();
			for(var i in me.points){
				if(me.points[i][1] < -86) continue;
				var v = new THREE.Vector3( (me.points[i][0]-a < -180 ? me.points[i][0]-a+360 : me.points[i][0]-a ), me.points[i][1], 4);
				geometry.vertices.push(v);
			}

			document.createElement('canvas');


			me.worldPoint = new THREE.ParticleSystem(
				geometry,
				new THREE.ParticleBasicMaterial({
					color: me.colors.worldPoint,
					size: 1,
					// map: THREE.ImageUtils.loadTexture( "image/dot.png" ),
					map: createDot('#FFF'),
					// blending: THREE.CustomBlending,
					// blendSrc: THREE.SrcAlphaFactor,
					// blendDst: THREE.DstAlphaFactor,
					// blendEquation: THREE.AddEquation,
			        depthTest:      true,
			        transparent:    true
				})
			);
			me.worldPoint.scale.set(me.mapScale,me.mapScale,1);
			me.mapPlaneObj.add(me.worldPoint);
		}

		
	}


	function createDot(color) {
	
		var canvas = document.createElement('canvas');
		canvas.width = 128;
		canvas.height = 128;

		var context = canvas.getContext('2d');
		context.globalAlpha = 0.7;
		
		context.fillStyle = color;
		context.beginPath();
		context.arc(canvas.width / 2,canvas.height / 2,canvas.width / 2,0,Math.PI*2,false);
		context.closePath();
		context.fill();
		

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		
		// var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false, depthTest: false, transparent: true } ));
		// textMesh.material.opacity = 0;
		return texture;
		
	}

	
	
	me.eventData = function(){
		me.eventData = sdata;
		// 将数据放大一倍
		for(var i = 0 , p ; p = me.eventData[i]; i++){
			for(var j in p){
				p[j] = me.pointScale(p[j]);
			}
		}
	}
	
	me.getEvent = function(index){
		return me.eventData[index];
	}


	me.pointScale = function(p){
		p[0] *= me.mapScale;
		p[1] *= me.mapScale;
		return p
	}
	
	me.analysData = function(data){
		if(me.drawType === 'Line'){
			function checkArea(params){
				if(params.length == 0) return false;
				if(params[0] instanceof Array && params[0].length > 0){
					if(params[0][0] instanceof Array){
						$.each(params,function(i){
							checkArea(params[i]);
						});
					}else{
						var temp = [];
						$.each(params,function(i){
							temp.push(params[i]);
						});
						me.points.push(temp);
					}	
				}
				
			}
			checkArea(data);
		}else if(me.drawType === 'Point'){
			function checkpoint(params,ary){
				if(params.length == 0) return false;
				if(params[0] instanceof Array){
					$.each(params,function(i){
						checkpoint(params[i],ary);
					});
				}else{
					ary && ary.push(params);
				}
			}
			checkpoint(data,me.points);
		}
	}

	
	me.calRadian = function(val){
		return Math.PI*val/180;
	}
	
	me.main = function(){
		me.points = [];
		$.getJSON('data/world.txt',function(data){
			me.analysData(data);
			me.init();
			me.animate();
		});
	}

	// me.tempG = 
	me.t = [];

	function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

		var points = shape.createPointsGeometry();
		var spacedPoints = shape.createSpacedPointsGeometry( 600 );
		var geometry = new THREE.ShapeGeometry( shape );

		var color = new THREE.Color(0x333333);
		// color.setHSL(0, 0, Math.random()/2+0.1);

		var mesh = new THREE.Mesh( 
			geometry,
			new THREE.MeshBasicMaterial( { 
				color: color,
				side: THREE.FrontSide 
			} )
		);


		mesh.position.set( x, y, 3.9 );
		// mesh.rotation.set( rx, ry, rz );
		mesh.scale.set( s, s, s );

		// me.t.push(mesh);
		me.mapPlaneObj.add( mesh );
	}
	
	me.main();
}
