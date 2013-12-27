var container;
var w = 1440;
var h = 989;

var camera, scene, renderer;
var composer;

var delta;
var time;
var oldTime;

var world, worldContainer, ribbonContainer, lineContainer;
var earth_data = [];

var uniforms;
var attributes;

var ribbonArray = [];

var mouseX = 0;
var mouseY = 0;

var radius = 100;
var lineHeight = 6;
var spriteScale = 15;

var effect;
var opacityOffset = 1000;

var pointDict = {};
var groupDict = {};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener( 'touchmove', onTouchMove, false );

var projector = new THREE.Projector();
var vertical_line, outerParticles;

init();

var attack_data = [],
	clone_attack_data = [];

var srcPos, dstPos;

function init() {
	
	$.get('data/globe.json', function (json){
		
		$.get('data/data.json', function (res){
			
			earth_data = eval(json);
			attack_data = eval(res);
			init_webgl();
			animate();
			
		},'text');
		
	},'text');

}

function init_webgl() {

	//container = document.createElement( 'div' );
	//document.body.appendChild( container );
	
	container = document.getElementById('container');
	
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 30, 590 );
	
	camera = new THREE.PerspectiveCamera( 45, w / h, 1, 10000 );
	camera.position.z = -160;
	camera.target = new THREE.Vector3( 0, 0, 0 );

	world = new THREE.Object3D();
	world.rotation.y = -Math.PI / 1.7;
	world.rotation.x = -Math.PI / 55;
	world.position.y -= 50;
	scene.add(world);

	worldContainer = new THREE.Object3D();
	worldContainer.rotation.x = -Math.PI/2;
	world.add(worldContainer);
	
	ribbonContainer = new THREE.Object3D();
	ribbonContainer.rotation.x = -Math.PI/2;
	world.add(ribbonContainer);
	
	lineContainer = new THREE.Object3D();
	lineContainer.rotation.x = -Math.PI/2;
	world.add(lineContainer);
	
	attributes = {

		size: {	type: 'f', value: [] },
		time: {	type: 'f', value: [] },
		customColor: { type: 'c', value: [] }

	};

	uniforms = {

		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		globalTime:{ type: "f", value: 2.6 },
		texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "assets/images/light_dot.png" ) },

	};

	var particles_material = new THREE.ShaderMaterial( {

		uniforms: 		uniforms,
		attributes:     attributes,
		vertexShader:   vertexshader,
		fragmentShader: fragmentshader,
		blending: 		THREE.AdditiveBlending,
		blendSrc: 		THREE.SrcAlphaFactor,
		blendDst: 		THREE.SrcColorFactor,
		depthTest: 		false,
		transparent:	true
		
	});
	

	var particles_geometry = new THREE.Geometry();
	var globe_line_geometry = new THREE.Geometry();
	
	var vertices = particles_geometry.vertices;
	var values_size = attributes.size.value;
	var values_time = attributes.time.value;
	var values_color = attributes.customColor.value;

	var random_colors = [new THREE.Color(0x587f52),new THREE.Color(0xabb7aa),new THREE.Color(0x0a0d09),new THREE.Color(0x4e8342),new THREE.Color(0x818e7f)];
	
	//地球几何对象的生成
	for (var i = 0; i < earth_data.length; i ++ ) {
		
		if (earth_data[i] instanceof Array){
			
			for (var j = 0; j < earth_data[i].length; j++){
				
				var point = earth_data[i][j];
				
				var vertex = coordToVector(point.x, point.y);
				
				vertices.push( vertex );
				
				switch(j){
					case 0:
						globe_line_geometry.vertices.push(vertex);
						break;
					case earth_data[i].length - 1:
						globe_line_geometry.vertices.push(vertex);
						break;
					default:
						globe_line_geometry.vertices.push(vertex);
						globe_line_geometry.vertices.push(vertex);
						break;
				}
				
				values_size.push(point.scale);
				values_time.push(point.delay);
				values_color.push(new THREE.Color(point.color));
				//values_color.push(new THREE.Color('#408988'));
			}

		}
	}
	
	var particles = new THREE.ParticleSystem( particles_geometry, particles_material);
	worldContainer.add( particles);
	
	// blue Globe
	var globe = new THREE.Mesh(
		new THREE.SphereGeometry(radius - 1, 100, 100), 
		new THREE.MeshBasicMaterial({'color': new THREE.Color(0x1E2533), opacity: .5, blending: THREE.AdditiveBlending})
	);
	worldContainer.add( globe);
	
	//globe line
	var globe_line = new THREE.Line(globe_line_geometry, 
		new THREE.LineBasicMaterial( { color: 0x114E6A, blending: THREE.AdditiveBlending}) , 
		THREE.LinePieces
	);
	worldContainer.add( globe_line );

	var animTween = new TWEEN.Tween(uniforms.globalTime)
	.to({value: 1.0}, 2000)
	.easing(TWEEN.Easing.Linear.None)
	.delay(100)
	.onComplete(function (){
		startTimer();
	});
	animTween.start();
	
	// renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( w, h );
	renderer.setClearColor(0x000000, 0.0);
	renderer.setFaceCulling( THREE.CullFaceNone );
	THREEx.WindowResize(renderer, camera, function (){
		effect.setSize( w, h );
	});
	
	container.appendChild( renderer.domElement );
	has_gl = true;
	
	world.rotation.y -= Math.PI * 0.48;
	world.rotation.z += Math.PI;
	
	//effect = new THREE.CrosseyedEffect( renderer );
	effect = new THREE.ParallaxBarrierEffect( renderer );
	//effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( w, h );
	//effect.separation = 0;

}

function coordToVector(x, y){
		
	var phi = (180 - y) * Math.PI / 180;
    var theta = (180 - x) * Math.PI / 180;
	
	var v = new THREE.Vector3();
    v.x = radius * Math.cos(phi) * Math.cos(theta);
	v.y = radius * Math.cos(phi) * Math.sin(theta);
	v.z = radius * -Math.sin(phi);
	
	return v;
}


function worldToScreen(worldVectorObj, projectorObj, cameraObj ){
	
	//var projector = new THREE.Projector();
	
	//var world_vector = new THREE.Vector3(0,0,1);
	
	var vector = projectorObj.projectVector(worldVectorObj, cameraObj);
	
	var halfWidth = w / 2;
	
	var halfHeight = h / 2;
	
	
	var result = {
	
		x: Math.round(vector.x * halfWidth + halfWidth),
		y: Math.round(-vector.y * halfHeight + halfHeight)
	
	};
	
	return result;
	
}

function startLineAnimation(line, delay){
	
	for (var i = 0; i < line.geometry.vertices.length; i+=2){
		
		if ((i / 2)%2 == 0){
			delay = 0;
		}else{
			delay = 1000;
		}
		
		var vertex = line.geometry.vertices[i];
		var to_vertor = vertex.clone().multiplyScalar((radius + lineHeight) / radius);
		var animLines = new TWEEN.Tween(vertex)
			.to({x: to_vertor.x, y: to_vertor.y, z: to_vertor.z},800)
			.easing(TWEEN.Easing.Linear.None)
			.delay(delay)
			.onUpdate(function (){
				line.geometry.verticesNeedUpdate = true;
			})
			.onComplete(function (){
				TWEEN.remove(this);
			});
		animLines.start();
	}
	
	setTimeout(function (){
		lineContainer.remove(line);
		for (var m in line.dots){
			lineContainer.remove(line.dots[m]);
		}
		for (var m in line.tips){
			lineContainer.remove(line.tips[m]);
		}
	}, 3500);
	
}

function startRibbonAnimation (obj, delay) {

	var o = obj.obj;
	var distance = o.startPoint.distanceTo(o.endPoint);
	
	var time = Math.max( 3000 ,(distance*40) );
	
	o.currentPoint = o.startPoint.clone();
	
	o.animationTime = 0;
	
	var d = delay || 0;

	//动态线条的渲染速度
	var timeTween = new TWEEN.Tween(o)
		//.to({animationTime: 0.5}, time)
		.to({animationTime: 0.5}, 2500)
		.easing(TWEEN.Easing.Linear.None)
		.delay(d)
		.onUpdate(function (){
			
			srcPos = worldToScreen( lineContainer.localToWorld(o.startPoint.clone().multiplyScalar((radius + lineHeight) / radius)), projector, camera);
			
			dstPos = worldToScreen( lineContainer.localToWorld(o.endPoint.clone().multiplyScalar((radius + lineHeight) / radius)), projector, camera);
			
		})
		.onComplete(function (){
			
			console.log(dstPos);
			
			ribbonContainer.remove(obj);
			//TWEEN.remove(timeTween);
			
		});
		
	timeTween.start();
	
}

function runLineAnimations () {
	
	for (var k = 0; k < ribbonContainer.children.length; k++){
		var o = ribbonContainer.children[k].obj;
		if ( o.currentPoint !== null ){
			
			o.currentPoint.lerp(o.endPoint, o.animationTime);
		
			var lng = radius + lineHeight;

			for (var i = 0; i < o.geometry.vertices.length; i++) {
				
				if (i == 0) {
					
					o.geometry.vertices[i] = o.currentPoint.clone().setLength(lng);
					
				} else {
					
					o.geometry.vertices[i].lerp(o.geometry.vertices[i-1], 0.4).setLength(lng);
					
				};
				
			};

			o.geometry.verticesNeedUpdate = true;	
		}
	}
}

function createDot(para, color) {
	
	var canvas = document.createElement('canvas');
	canvas.width = 40;
	canvas.height = 40;

	var context = canvas.getContext('2d');
	context.globalAlpha = .6;
	
	context.fillStyle = color;
	context.beginPath();
	context.arc(canvas.width / 2,canvas.height / 2,15,0,Math.PI*2,false);
	context.closePath();
	context.fill();
	
	context.strokeStyle = '#000000';
	context.lineWidth = 1.3;
	context.beginPath();
	context.arc(canvas.width / 2,canvas.height / 2,12,0,Math.PI*2,false);
	context.stroke();
	
	context.globalAlpha = 1;
	context.font = "bold 12pt 微软雅黑";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = "#FFFFFF";
	context.fillText(para, canvas.width / 2, canvas.height / 2);
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	
	var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false, depthTest: false, transparent: true } ));
	textMesh.material.opacity = 1;
	textMesh.scale.set(spriteScale / 10, spriteScale / 10, spriteScale / 10)
	return textMesh;
	
}

function createTip(para, color) {
	
	var canvas = document.createElement('canvas');
	canvas.width = 500;
	canvas.height = 500;
	
	var tipHight = 40;
	var alpha = .3;
	var offsetX = canvas.width / 2 ;
	
	var context = canvas.getContext('2d');
	context.globalAlpha = alpha;
	
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(offsetX, canvas.width / 2 - tipHight / 2);
	
	context.bezierCurveTo(
		tipHight / 2 + offsetX + 5, canvas.width / 2 - 13, 
		tipHight / 2 + offsetX + 5, canvas.width / 2 + 13, 
		offsetX, canvas.width / 2 + tipHight / 2
	);
	context.lineTo(canvas.width + offsetX, canvas.width / 2 + tipHight / 2);
	context.lineTo(canvas.width + offsetX, canvas.width / 2 - tipHight / 2);
	context.lineTo(offsetX, canvas.width / 2 - tipHight / 2);
	context.closePath();
	context.fill();
	context.stroke();
	
	context.globalAlpha = 1;
	context.font = "bold 14pt 微软雅黑";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = "#FFFFFF";
	context.fillText(para, offsetX + canvas.width / 4 + 13/2 , canvas.height / 2);
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false, depthTest: false, transparent: true } ));
	textMesh.position.x = canvas.width / 2;
	textMesh.material.opacity = 1;
	textMesh.scale.set(spriteScale * 1.25, spriteScale * 1.25, spriteScale * 1.25);
	return textMesh;
	
}

function startTimer(){
	
	var ribbonMaterial = new THREE.LineBasicMaterial( { opacity: 0.5, linewidth: 1.0, vertexColors: THREE.VertexColors } );
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1 } );
	
	var timer = setInterval(function (){
		
		if ( clone_attack_data.length == 0 ){
			
			clone_attack_data = attack_data.concat();
		} 
		
		var item = clone_attack_data.shift();
		var srcInfo = item['srcInfo'];
		var dstInfo = item['dstInfo'];
		
		//lineGeo
		var lineGeo = new THREE.Geometry();
		lineGeo.dynamic = true;
		var dots = [];
		var tips = [];
		
		//ribbon
		var ribbonGeo = new THREE.Geometry();
		var color = new THREE.Color(0xffffff);
		
		
		for ( var c = 0; c < 50; c ++ ) {

			ribbonGeo.vertices.push( new THREE.Vector3() );
			var hsl = new THREE.Color(0xff0000).getHSL();
			color.setHSL(hsl.h, hsl.s, 1.0-(c/50));
			ribbonGeo.colors.push(color.clone());

		}

		var ribbon = new THREE.Line( 
			ribbonGeo,  ribbonMaterial
		);
		ribbonGeo.dynamic = true;
		ribbon.frustumCulled = false;
		ribbonContainer.add( ribbon );
		
		var srcCoord = srcInfo['coord'];
		var startPosition = coordToVector(srcCoord[0], srcCoord[1]);
		var dstCoord = dstInfo['coord'];
		var endPosition = coordToVector(dstCoord[0], dstCoord[1]);
		
		lineGeo.vertices.push(startPosition.clone());
		lineGeo.vertices.push(startPosition.clone());
		lineGeo.vertices.push(endPosition.clone());
		lineGeo.vertices.push(endPosition.clone());
		
		
		var dot = createDot('', '#00FF00');
		dot.position = startPosition.clone().multiplyScalar((radius + lineHeight) / radius);
		dots.push(dot);
		lineContainer.add(dot);
		
		var dot = createDot('', '#FF0000');
		dot.position = endPosition.clone().multiplyScalar((radius + lineHeight) / radius);
		dots.push(dot);
		lineContainer.add(dot);
		
		var tip = createTip(srcInfo['area']['cities'] + " : " + srcInfo['ip'], '#00FF00');
		tip.position = startPosition.clone().multiplyScalar((radius + lineHeight) / radius);
		tips.push(tip);
		lineContainer.add(tip);
		
		var tip = createTip(dstInfo['area']['cities'] + " : " + dstInfo['ip'], '#FF0000');
		tip.position = endPosition.clone().multiplyScalar((radius + lineHeight) / radius);
		tips.push(tip);
		lineContainer.add(tip);
		
		var ribbonAnimationObj = {
			geometry: ribbonGeo,
			startPoint: startPosition, 
			endPoint: endPosition, 
			currentPoint: null, animationTime: 0
		};
		ribbon.obj = ribbonAnimationObj;
		startRibbonAnimation(ribbon, 1000);
		
		//line
		var line = new THREE.Line(lineGeo, lineMaterial, THREE.LinePieces);
		line.dots = dots;
		line.tips = tips;
		lineContainer.add(line);
		startLineAnimation(line, 0);
		
		consoleTrace('xxxxxx');
		
	}, 1500);
	
}

function consoleTrace(traceInfo){
	var consoledom = $('#consoleDom');
	consoledom.find('.info').eq(0).remove();
	consoledom.append('<div class="info">'+traceInfo+'</div>');
}

function onDocumentMouseMove(event) {
	
	var windowHalfX = w >> 1;
	var windowHalfY = h >> 1;

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function onTouchMove(event) { 
	event.preventDefault();

	var windowHalfX = w >> 1;
	var windowHalfY = h >> 1;

	mouseX = ( event.touches[0].clientX - windowHalfX ) * -1;
	mouseY = ( event.touches[0].clientY - windowHalfY ) * -1;

}

function animate() {
	
	requestAnimationFrame( animate );

	render();

}

function render() {

	time = new Date().getTime();
	delta = time - oldTime;
	oldTime = time;

	if (isNaN(delta) || delta > 1000 || delta == 0 ) {
		delta = 1000/60;
	}
	
	if (dstPos && srcPos){
		
		camera.position.x += (-20 * Math.sin(dstPos.x / 500) - camera.position.x) / 30;
		camera.position.y += (-20 * Math.sin(dstPos.y / 500) - camera.position.y) / 30;
		
	}
	
	/*
	if (dstPos && srcPos){
		
		if (camera.position.y <= 10 && camera.position.y >= -10){
			camera.position.y += (dstPos.y - srcPos.y) / 100;
			
			if (camera.position.y < -10 || camera.position.y > 10){
				//camera.position.y = camera.position.y > 0 ? 10 : -10;
			}
			
		}else{
			
		}
		
		if (camera.position.x <= 20 && camera.position.x >= -20){
			camera.position.x += (dstPos.x - srcPos.x) / 100;
			
			if (camera.position.x < -20 || camera.position.x > 20){
				//camera.position.x = camera.position.x > 0 ? 20 : -20;
			}
		}
	}
	*/
	//camera.position.y += (-10 * Math.sin(time/5000) - camera.position.y) / 30;
	//camera.position.x += (10 * Math.sin(time/5000) - camera.position.x) / 30;
	//camera.position.z += Math.sin(time/5000) / 30;
	
	//camera.position.y += (-10 * Math.sin(mouseY/500) - camera.position.y) / 30;
	//camera.position.x += (-10 * Math.sin(mouseX/500) - camera.position.x) / 30;
	camera.lookAt(camera.target);
	
	
	TWEEN.update();
	runLineAnimations();
	
	if (has_gl) {
		
		renderer.render( scene, camera );
		parseInt($('#parallaxModel').attr('data')) && effect.render( scene, camera );
	}
	
}