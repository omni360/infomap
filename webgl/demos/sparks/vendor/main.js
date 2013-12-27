
var clock = new THREE.Clock();
var container, stats;
var camera, scene, renderer, mesh;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var threexSparks = [];
var sparkGroup = new THREE.Object3D();

if( !init() ){
	animate();
}

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true
	});
	renderer.setClearColor( 0x000000, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.getElementById('container').appendChild(renderer.domElement);
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 0, 1000); 
	//camera.lookAt(scene.position);
	scene.add(camera);
	
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	/*
	controls.rotateSpeed		= 0.1;
	controls.staticMoving		= false;
	controls.dynamicDampingFactor	= 0.3;*/
	
	THREEx.WindowResize(renderer, camera);

	// add Stats.js - https://github.com/mrdoob/stats.js
	stats = new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.bottom	= '0px';
	stats.domElement.style.right	= '0px';
	document.body.appendChild( stats.domElement );
	
	var geometry	= new THREE.SphereGeometry( 30, 50, 50 );
	
	var mesh	= new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({
		color: 0x0c0c0c, 
		transparent: false, 
		opacity: .5, 
		side: THREE.DoubleSide,
		wireframe: false, 
		blending: THREE.CustomBlending,
		blendSrc: THREE.OneMinusSrcAlphaFactor,
		blendDst: THREE.OneFactor,
		blendEquation: THREE.AddEquation,
	}) );
	mesh.position.y	= 0;
	sparkGroup.add( mesh );
	
	addLights();
	
}

function addLights(){
	
	lightweight = 7
	/*
	var topLight = new THREE.PointLight(0xffffff, lightweight);
	topLight.position.y = 5000;
	sparkGroup.add(topLight);
	
	var bottomLight = new THREE.PointLight(0xffffff, lightweight);
	bottomLight.position.y = -5000;
	sparkGroup.add(bottomLight);
	*/
	var leftLight = new THREE.PointLight(0xffffff, lightweight);
	leftLight.position.x = 5000;
	sparkGroup.add(leftLight);
	
	var rightLight = new THREE.PointLight(0xffffff, lightweight);
	rightLight.position.x = -5000;
	sparkGroup.add(rightLight);
	/*
	var frontLight = new THREE.PointLight(0xffffff, lightweight);
	frontLight.position.z = 5000;
	sparkGroup.add(frontLight);
	
	var backLight = new THREE.PointLight(0xffffff, lightweight);
	backLight.position.z = -5000;
	sparkGroup.add(backLight);
	*/
}

function animate() {

	requestAnimationFrame( animate );

	render();

	stats.update();
}

function render() {

	controls.update( clock.getDelta() );
	
	
	var time = new Date().getTime() / 1000;
	
	for (var i = 0; i < threexSparks.length; i++){
		
		var scale = (i + 1) / 2;
		
		threexSparks[i].emitter().emitterpos.x = Math.sin(time * scale) * scale * 50,
		threexSparks[i].emitter().emitterpos.y = Math.cos(time * scale) * scale * 50,
		threexSparks[i].emitter().emitterpos.z = Math.sin(time * scale) * Math.cos(time * scale) * scale * 50,
		threexSparks[i].update()
		
	}
	// FIXME this should be INSIDE webgl renderer... bug
	//renderer.context.depthMask( true );
	sparkGroup.rotation.y += 0.01;
	/*
	sparkGroup.rotation.x += 0.001;
	sparkGroup.rotation.z += 0.001;
	*/
	renderer.render( scene, camera );
}
