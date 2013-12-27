var composer
var WorldMap = function(){
	var me = this;
	me.mapScale = 4;
	
	me.width = 360*me.mapScale + 24;
	me.height = me.width/2+100;
	me.depth = 6;
	
	// 设置绘制方式： 线(Line) && 点(Point)
	me.drawType = 'Point';
	
	// 是否开启模糊 
	me.fuzzyFlag = false;
	// 是否开启Control 
	me.controlFlag = false;
	
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
	
	me.startPoint = [];
	me.endPoint = [];
	me.elinegeometrys = [];
	me.alines = [];
	me.startErrors = [];
	me.endErrors = [];
	
	me.toStartCardLines = [];
	me.toEndCardLines = [];
	
	me.carmeraTarget = new THREE.Vector3(0,0,0);
	
	me.init = function(){
		me.initCarmera(10000,1100);
		me.initScene();
		me.initRender();
		me.createMapPanelObj();
		me.drawPlane();
		me.drawMap();
		me.initTitle();
		me.eventData();
		
		
		for(var i = 0, s ; s = sdata[i] ; i++){
			me.configEvent(i);
		}
		
		me.css3dFlag && me.css3d();
		me.fuzzyFlag && me.initFuzzy();
		me.initControl();
		me.onWindowResize();
	}
	
	me.initCarmera = function(far,distance){
		me.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, far);
		me.camera.position.z = distance;
	}
	me.initScene = function(){
		me.scene = new THREE.Scene();
	}
	
	me.initRender = function(){
		if(me.fuzzyFlag){
			me.renderer = new THREE.WebGLRenderer( { clearColor: me.colors.clearColor, clearAlpha: 1, antialias: true } );
			me.renderer.autoClear = false;
		}else{
			me.renderer = new THREE.WebGLRenderer( { antialias: true } );
		}		
		if(me.css3dFlag){
			me.cssrenderer = new THREE.CSS3DRenderer();
			me.cssrenderer.setSize( window.innerWidth, window.innerHeight );
			me.cssrenderer.domElement.style.position = 'absolute';
			document.body.appendChild( me.cssrenderer.domElement );
		}
		me.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( me.renderer.domElement );
	}
	
	me.initFuzzy = function(){
		me.renderModel = new THREE.RenderPass( me.scene, me.camera );
		me.effectBloom = new THREE.BloomPass( 1.3 );
		me.effectCopy = new THREE.ShaderPass( THREE.CopyShader );
		me.effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
		me.effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
		me.effectCopy.renderToScreen = true;
		me.composer = new THREE.EffectComposer( me.renderer );
		me.composer.addPass( me.renderModel );
		me.composer.addPass( me.effectFXAA );
		me.composer.addPass( me.effectBloom );
		me.composer.addPass( me.effectCopy );
	}
	
	me.initControl = function(){
		me.controls = new THREE.TrackballControls( 
			me.camera, 
			(me.css3dFlag ? me.cssrenderer.domElement : me.renderer.domElement) 
		);
		me.controls.rotateSpeed = 0.5;
	}
	
	me.onWindowResize = function() {
		window.addEventListener( 'resize', function(){
			if(me.fuzzyFlag){
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				me.camera.aspect = window.innerWidth / window.innerHeight;
				me.camera.updateProjectionMatrix();
				me.renderer.setSize( window.innerWidth, window.innerHeight );
				me.effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
				composer.reset();
			}else{
				me.camera.aspect = window.innerWidth / window.innerHeight;
				me.camera.updateProjectionMatrix();
				me.renderer.setSize( window.innerWidth, window.innerHeight );
			}
		}, false );
	}
	
	me.animate = function() {
		requestAnimationFrame( me.animate );
		me.controlFlag && me.controls.update();
		TWEEN.update();
		if(me.fuzzyFlag){
			me.renderer.clear();	
			me.composer.render();
		}else{
			me.camera.lookAt(me.carmeraTarget);
			me.renderer.render( me.scene, me.camera );
			me.css3dFlag && me.cssrenderer.render( me.scene, me.camera );
		}
	}
	
	me.createMapPanelObj = function(){
		me.mapPlaneObj = new THREE.Object3D();
		
		me.mapPlaneObj.rotation.x = -Math.PI*5/180;
		
		me.scene.add(me.mapPlaneObj);
	}
	
	me.drawPlane = function(){
		var A = new THREE.MeshBasicMaterial( {
				color: me.colors.planeFaceA,
				transparent: true, 
				opacity: 0.7,
				side: THREE.DoubleSide,
				shading: THREE.FlatShading
			}),
			B = new THREE.MeshBasicMaterial( { color: me.colors.planeFaceB }),
			planeS = 10;
		
		var plane = new THREE.Mesh( 
			new THREE.CubeGeometry(me.width, me.height, me.depth, planeS, planeS, planeS), 
			new THREE.MeshFaceMaterial([B,B,B,B,A,A])
		);
		me.mapPlaneObj.add(plane);
	}
	
	me.drawMap = function(){
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
			  
			var a = 0;
			  	
			for (var i = 0, area; area = me.points[i]; i++) {
				
			  	var geometry = new THREE.Geometry();
			  	
			  	var colors = [];
			  	// (point[0]-a < -180 ? point[0]-a+360 : point[0]-a )
			  	for(var j = 0, point; point = area[j]; j++){
					geometry.vertices.push(new THREE.Vector3( point[0], point[1], 4));
					colors[ j ] = new THREE.Color( 0xffffff );
					colors[ j ].setHSL( 0.8, 1.0, Math.max( 0, ( 200 - point[0] ) / 400 ) * 0.5 + 0.5 );
				}
				
				geometry.colors = colors;
				
				me.worldLine = new THREE.Line( geometry, material, THREE.LineStrip );
				me.worldLine.scale.set(me.mapScale,me.mapScale,1);
				me.mapPlaneObj.add(me.worldLine);
			}
		}else{
			var geometry = new THREE.Geometry();
			for(var i in me.points){
				var v = new THREE.Vector3( me.points[i][0], me.points[i][1], 4);
				geometry.vertices.push(v);
			}
			me.worldPoint = new THREE.ParticleSystem(
				geometry,
				new THREE.ParticleBasicMaterial({
					color: me.colors.worldPoint,
					size: 2
				})
			);
			me.worldPoint.scale.set(me.mapScale,me.mapScale,1);
			me.mapPlaneObj.add(me.worldPoint);
		}
		
		me.initRule();
	}
	
	me.initRule = function(){
		var geometry = new THREE.Geometry();
		for(var i = -1 ; i <= 1 ; i++){
			var v = new THREE.Vector3( 180*i*me.mapScale, 0, 2);
			geometry.vertices.push(v);
		}
		geometry.computeLineDistances();
		me.ruleLine = new THREE.Line( 
			geometry, 
			new THREE.LineDashedMaterial({ 
				color: me.colors.ruleLine ,
				dashSize: 7,
				gapSize: 4,
			}), 
			THREE.LineStrip 
		);
		me.mapPlaneObj.add(me.ruleLine);
	}
	
	me.initTitle = function(x,y){
		
		x = y = 10;
		me.titleDom = $('#title');
		me.ctimeDom = $('#ctime');
		me.tempC = $('#tempC');
		me.titleDom.css({'visibility': 'visible'});
		me.ctimeDom.css({'visibility': 'visible'});
		me.tempC.css({'visibility': 'visible'});
		
		html2canvas( me.titleDom, {
			background: 'transparent',
			onrendered: function(canvas) {
			    me.titleDom.css({'visibility': 'hidden'});
			    me.texture = new THREE.Texture(canvas);
				me.texture.needsUpdate = true;
				
				var geometry = new THREE.PlaneGeometry( parseInt(me.titleDom.css('width')),parseInt(me.titleDom.css('height')),1,1);
				
				var mesh = new THREE.Mesh( 
					geometry, 
					new THREE.MeshBasicMaterial( { 
						map: me.texture, 
						overdraw: true ,
						side: THREE.DoubleSide
					}) 
				);
				
				mesh.position = new THREE.Vector3( (-me.width+geometry.width)/2+x, (me.height-geometry.height/2)/2-2*y, 4);
				
				me.mapPlaneObj.add( mesh );
			}
		});
		
		html2canvas( me.ctimeDom, {
			background: 'transparent',
			onrendered: function(canvas) {
			    me.ctimeDom.css({'visibility': 'hidden'});
			    me.texture = new THREE.Texture(canvas);
				me.texture.needsUpdate = true;
				
				var geometry = new THREE.PlaneGeometry( parseInt(me.ctimeDom.css('width')),parseInt(me.ctimeDom.css('height')),1,1);
				
				var mesh = new THREE.Mesh( 
					geometry, 
					new THREE.MeshBasicMaterial( { 
						map: me.texture, 
						overdraw: true ,
						side: THREE.DoubleSide
					}) 
				);
				
				mesh.position = new THREE.Vector3( (-me.width+geometry.width)/2+x, (-me.height+geometry.height)/2+y, 4);
				
				me.mapPlaneObj.add( mesh );
			}
		});
// 		
		html2canvas( me.tempC, {
			background: 'transparent',
			onrendered: function(canvas) {
			    me.tempC.css({'visibility': 'hidden'});
			    me.texture = new THREE.Texture(canvas);
				me.texture.needsUpdate = true;
				
				var geometry = new THREE.PlaneGeometry( parseInt(me.tempC.css('width')),parseInt(me.tempC.css('height')),1,1);
				
				var mesh = new THREE.Mesh( 
					geometry, 
					new THREE.MeshBasicMaterial( { 
						map: me.texture, 
						overdraw: true ,
						side: THREE.DoubleSide
					}) 
				);
				
				mesh.position = new THREE.Vector3( (me.width-geometry.width)/2-x, (-me.height+geometry.height)/2+y, 4);
				
				me.mapPlaneObj.add( mesh );
			}
		});
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
	
	me.configEvent = function(index){
		// index = 0;
		me.currentEvent = me.getEvent(index);
		
		me.startPoint.push(new THREE.Vector3( me.currentEvent[0][0], me.currentEvent[0][1], 4.2));
		me.endPoint.push(new THREE.Vector3( me.currentEvent[1][0], me.currentEvent[1][1], 4.2));
		
		me.startError = new THREE.Mesh( 
			new THREE.CircleGeometry(3,20), 
			new THREE.MeshBasicMaterial( { 
				color: '#CC1A21',
				overdraw: true ,
				side: THREE.DoubleSide
			}) 
		);
		
		me.startError.position = me.startPoint[index];
		me.startError.scale.set(0.01,0.01,1);
		
		me.startErrors.push(me.startError);
		
		me.mapPlaneObj.add( me.startError );
		
		me.endError = me.startError = new THREE.Mesh( 
			new THREE.CircleGeometry(3,20), 
			new THREE.MeshBasicMaterial( { 
				color: '#F6B7BA',
				overdraw: true ,
				side: THREE.DoubleSide
			}) 
		);
		me.startError.scale.set(0.01,0.01,1);
		me.endError.position = me.endPoint[index];
		me.mapPlaneObj.add( me.endError );
		me.endErrors.push(me.endError);
		
		var elinegeometry = new THREE.Geometry();
		
		me.aline = new THREE.SplineCurve3([
			me.startPoint[index],
			(new THREE.Vector3( 
				(me.startPoint[index].x + me.endPoint[index].x)/2, 
				(me.startPoint[index].y + me.endPoint[index].y)/2, 
				// me.startPoint[index].distanceTo(me.endPoint[index])/4 + 10
				
				(me.startPoint[index].distanceTo(me.endPoint[index]) > 100 ? 80 : 60)
			)),
			me.endPoint[index]
		]);
		
		me.alines.push(me.aline);
		
// 		
// 		
		// var r = me.startPoint.distanceTo(me.endPoint)/2;
// 		
		// me.ellipseLine = new THREE.EllipseCurve(
			// (me.startPoint.x + me.endPoint.x)/2,
			// (me.startPoint.y - me.endPoint.y)/2,
			// r,
			// r,
			// 0,
			// Math.PI,
			// false
		// );
		
		var colors = [];
		// 创建线的起始点
		for(var i = 0 ; i < 100 ; i++){
			elinegeometry.vertices.push(me.startPoint[index]);
			colors[ i ] = new THREE.Color( 0xffffff );
			colors[ i ].setHSL( 1, 1, i/200 + 0.4);
		}
		elinegeometry.colors = colors;
		
		me.elinegeometrys.push(elinegeometry);
		
		me.eLine = new THREE.Line( 
			elinegeometry, 
			new THREE.LineBasicMaterial({ 
				color: '#FFF' ,
				vertexColors: THREE.VertexColors 
			}), 
			THREE.LineStrip 
		);
		elinegeometry.dynamic = true;
		me.mapPlaneObj.add( me.eLine );
		
		// for(var j = 0; j < sdata.length ; j++){
			// me.LineTransform(j);
		// }
		var tempStartLine = new THREE.Geometry();
		var tempEndLine = new THREE.Geometry();
		
		tempStartLine.vertices.push(new THREE.Vector3( me.startPoint[index].x, me.startPoint[index].y, 4));
		tempStartLine.vertices.push(new THREE.Vector3( me.startPoint[index].x, me.startPoint[index].y, 4));
		
		tempEndLine.vertices.push(new THREE.Vector3( me.endPoint[index].x, me.endPoint[index].y, 4));
		tempEndLine.vertices.push(new THREE.Vector3( me.endPoint[index].x, me.endPoint[index].y, 4));
		
		var tsLine = new THREE.Line( 
			tempStartLine, 
			new THREE.LineBasicMaterial({ 
				color: '#26ACF6'
			}), 
			THREE.LineStrip 
		);
		var teLine = new THREE.Line( 
			tempEndLine, 
			new THREE.LineBasicMaterial({ 
				color: '#26ACF6'
			}), 
			THREE.LineStrip 
		);
		tempStartLine.dynamic = true;
		tempEndLine.dynamic = true;
		me.toStartCardLines.push(tempStartLine);
		me.toEndCardLines.push(tempEndLine);
		me.mapPlaneObj.add( tsLine );
		me.mapPlaneObj.add( teLine );
	
	}
	
	me.LineTransform = function(index) {
		duration = 600;
		TWEEN.removeAll();
		
		me.controlFlag = false;
		
		// me.controls.noRotate = false;
		// me.controls.noZoom = false;
		// me.controls.noPan = false;
		// me.controls.noRoll = false;
		// me.controls.reset();
		
		var templ = new THREE.Spline([me.camera.position,new THREE.Vector3().addVectors(me.startPoint[index],me.endPoint[index]).multiplyScalar(0.5)]);
		
		console.info(me.camera.position.z,templ.getLength().total);
		
		var h = (me.camera.position.z - templ.getLength().total)/2 - 20;
		
		// h > 0 ? h-=20 : h+=20;
		
		// console.info(h);
		
		new TWEEN.Tween({v:0})
			.to({v:100},  500 )
			.onUpdate(function(a){
				// console.info(templ)
				
				tt = templ.getPoint(a);
				
				me.camera.position.x = tt.x;
				
				me.camera.position.y = tt.y;
				me.camera.position.z += h*a;
			})
			.onComplete(function(){
				
				// me.controlFlag = true;
			})
			.easing( TWEEN.Easing.Linear.None )
			.start();
		
		new TWEEN.Tween({v:0})
			.to({v:100},  duration )
			.delay(500)
			.onUpdate(function(a){
				me.startErrors[index].scale.set(a/2,a/2,1);
				for(var i = 0 ; i < 100; i++){
					me.elinegeometrys[index].vertices[i] = me.alines[index].getPoint(a/100*i);
				}
				me.elinegeometrys[index].verticesNeedUpdate = true;
			})
			.onComplete(function(){
				me.elinegeometrys[index].vertices[99] = me.alines[index].getPoint(1);
				me.elinegeometrys[index].verticesNeedUpdate = true;
				me.endErrors[index].scale.set(1,1,1);
			})
			.easing( TWEEN.Easing.Linear.None )
			.start();
		me.cardscale = 0.45;
		me.cardobject.scale.set(me.cardscale,me.cardscale,me.cardscale);
		me.cardobject.position.x = me.startPoint[index].x + (svgCard.width-svgCard.padding*2)*me.cardscale/2;
		me.cardobject.position.y = me.startPoint[index].y - (svgCard.height-svgCard.padding*2)*me.cardscale/2;
		
		me.tarcardobject.scale.set(me.cardscale,me.cardscale,me.cardscale);
		me.tarcardobject.position.x = me.endPoint[index].x - (tSvgCard.width-tSvgCard.padding*2)*me.cardscale/2;
		me.tarcardobject.position.y = me.endPoint[index].y - (tSvgCard.height-tSvgCard.padding*2)*me.cardscale/2;
		
		new TWEEN.Tween({v:0})
			.to({v:100},  400 )
			.delay(800)
			.onUpdate(function(a){
				me.toStartCardLines[index].vertices[1].z = me.toEndCardLines[index].vertices[1].z = 4 + a*66;
				me.toStartCardLines[index].verticesNeedUpdate = me.toEndCardLines[index].verticesNeedUpdate = true;
			})
			.onComplete(function(){
				svgCard.dom.css({
					'visibility': 'visible'
				})
				tSvgCard.dom.css({
					'visibility': 'visible'
				})
				svgCard.show();
				tSvgCard.show();
			})
			.easing( TWEEN.Easing.Linear.None )
			.start();
	}
	
	me.css3d =function(){
		me.cardscale = 0.6;
		
		var card = document.getElementById('card');
		me.cardobject = new THREE.CSS3DObject( card );
		me.cardobject.position.x = (svgCard.width-svgCard.padding*2)*me.cardscale/2;
		me.cardobject.position.y = (-svgCard.height+svgCard.padding*2)*me.cardscale/2;
		
		me.cardobject.position.z = 70;
		
		me.cardobject.scale.set(me.cardscale,me.cardscale,me.cardscale);
		
		var card = document.getElementById('tcard');
		me.tarcardobject = new THREE.CSS3DObject( card );
		me.tarcardobject.position.x = (tSvgCard.width-tSvgCard.padding*2)*me.cardscale/2;
		me.tarcardobject.position.y = (-tSvgCard.height+tSvgCard.padding*2)*me.cardscale/2;
		
		me.tarcardobject.position.z = 70;
		
		me.tarcardobject.scale.set(me.cardscale,me.cardscale,me.cardscale);
		
		me.mapPlaneObj.add( me.cardobject );
		me.mapPlaneObj.add( me.tarcardobject );
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
	
	me.mouseEvent = function(){
		var cameraR = me.camera.position.z,
			differenceX = differenceY = 0,
			theat = alpha = 0;
		new MouseEvent({
			domElement : (me.css3dFlag ? me.cssrenderer.domElement : me.renderer.domElement),
			mousedown : function( e , t){
				t.currentpoint.x = e.x;
				t.currentpoint.y = e.y;
			},
			mousemove : function( e , t){
				differenceX = e.x - t.currentpoint.x;
				differenceY = e.y - t.currentpoint.y;
				if(e.which === 1){
					theat -= me.calRadian(differenceX/2);
					alpha -= me.calRadian(differenceY/2);
					console.info();
					// console.info(Math.cos(me.calRadian(differenceX))*cameraR);
					me.camera.position.z = Math.cos(alpha)*Math.cos(theat)*cameraR;
					me.camera.position.y = Math.sin(alpha)*cameraR;
					me.camera.position.x = Math.cos(alpha)*Math.sin(theat)*cameraR;
					// me.camera.position.y = Math.sin(me.calRadian(differenceY/2))*cameraR;
					// me.camera.position.x += Math.sin(me.calRadian(differenceX))*cameraR/10;
				}else{
					me.camera.position.x -= differenceX;
					me.camera.position.y += differenceY;
				}
				t.currentpoint.x = e.x;
				t.currentpoint.y = e.y;
			},
			mouseup : function( e , t){
				// console.info(temp);
			},
			mousewheel : function( delta , t){
				// console.info(delta);
				cameraR = me.camera.position.z -= delta*10;
			}
		});
	}
	
	me.calRadian = function(val){
		return Math.PI*val/180;
	}
	
	me.main = function(){
		me.points = [];
		$.getJSON('world.json',function(data){
			me.analysData(data);
			me.init();
			me.mouseEvent();
			me.animate();
		});
	}
	
	me.main();
}
