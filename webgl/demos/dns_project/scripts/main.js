
var container, camera, scene, renderer, controls;//, cube

//主体元素
var particleMap, foreignShapeMap, chinaShapeMap, ribbonContainer, sparkContainer, 
	normal_geo = new THREE.Geometry();
	
var threexSparks = [];
var sparkGroup = new THREE.Object3D();

//辅助元素
var backgroundLight,
	skyGlobe;
var sprite;

var mapWidth = 360, 
	mapHeight = 180, 
	mapDepth = 10, 
	radius = 150,
	areas = [];
	
//带厚度的中国地图上层的顶点索引列表 
var chinaOuterGeoIndices = [];

var client_list = [],
	auth_list = [];
	final_list = [{name: '美国', number: '0', position: coordToSphereVector(-78.46, 35.47)}];

var frameSize = 0;

init();

function init() {
	
	$.get('data/globe.json', function (json){
		
		for (var i = 0; i < client_data.length; i++){
			
			var item = client_data[i],
				client_position_lower = coordToSphereVector(item[2], item[3]),
				client_position_height = client_position_lower.clone().multiplyScalar(1.1),
				item_client = {name: item[0], number: item[1], position: client_position_height, lowerPos: client_position_lower};
			
			client_list.push(item_client);
		}
		
		for (var i = 0; i < auth_data.length; i++){
			
			var item = auth_data[i],
				auth_position_lower = coordToSphereVector(item[2], item[3]),
				auth_position_height = auth_position_lower.clone().multiplyScalar(1.2),
				item_auth = {name: item[6], number: item[1], position: auth_position_height, lowerPos: auth_position_lower};

			auth_list.push(item_auth);
		}
		
		for (var i = 0; i < final_list.length; i++){
			
			var final_position_lower = final_list[i].position,
				final_position_height = final_position_lower.clone().multiplyScalar(1.35);
				final_list[i].position = final_position_height;
				final_list[i].lowerPos = final_position_lower;
			
			sprite = createHeartbeatDot();
			sprite.position = final_position_height;
		}
		
		earth_data = eval(json);
		generateVectices(earth_data);
		
	},'text');

}

function generateVectices(data){
	//地球几何对象的生成
	for (var i = 0; i < data.length; i ++ ) {
		
		var area = [];
		
		if (data[i] instanceof Array){
			
			for (var j = 0; j < data[i].length; j++){
				
				var point = data[i][j];
				area.push(point);

			}
		}
		
		areas.push(area);
		
	}
	
	init_webgl();
	animate();
	
}

function init_webgl() {
	
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	scene = new THREE.Scene();
	scene.add(sprite);
	//scene.fog = new THREE.Fog( 0x000000, 30, 2000 );
	
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 50000 );
	camera.position.z = 500;
	
	//controls = new THREE.TrackballControler( {camera: camera} );
	controls = new THREE.TrackballControls( camera );
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	//renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x222222, 1);
	//renderer.autoClearColor = false;
	
	container.appendChild( renderer.domElement );
	
	ribbonContainer = new THREE.Object3D();
	scene.add(ribbonContainer);
	
	sparkContainer = new THREE.Object3D();
	scene.add(sparkContainer);
	
	backgroundLight = new THREE.HemisphereLight( 0x002A52, 0x000000, 7);	//0x002A52
	scene.add(backgroundLight);
	
	createShapeMap();
}

function subdivisionMap(geo, level){
	
	level = level !== undefined ? level : 0;
	
	var modifier = new THREE.SubdivisionModifier( level );
	
	geo.mergeVertices();
	//geo.computeCentroids();
	//geo.computeFaceNormals();
	//geo.computeVertexNormals();

	modifier.modify( geo );
	
	return geo;
	
}

function createShapeMap(){
	
	//国外地图几何对象
	var foreignGeo = new THREE.Geometry();
	//中国地图几何对象
	var chinaGeo = new THREE.Geometry();
	
	for (var i = 0; i < areas.length; i++){
		
		var shape_pts = [];
		
		var area_type = 'foreign';
		
		for (var j = 0; j < areas[i].length; j++){
			
			var vector = areas[i][j];
			
			if (vector.name != undefined){
				
				area_type = 'china';
				
			}
			
			shape_pts.push(new THREE.Vector2(vector.x, vector.y));
		}
		
		var shape = new THREE.Shape(shape_pts);
		
		var geometry = new THREE.ShapeGeometry( shape );
		//var geometry = area_type == 'china' ? new THREE.ExtrudeGeometry( shape, {amount: 5, steps: 1, bevelSegments: 0, bevelSize: -0.03, bevelThickness: 0 } ): new THREE.ShapeGeometry( shape );
		
		area_type == 'foreign' && THREE.GeometryUtils.merge(foreignGeo,geometry);
		area_type == 'china' && THREE.GeometryUtils.merge(chinaGeo,geometry);
	}
	
	//获取Extrude中国地图几何对象上层的顶点索引
	for (var i = 0; i < chinaGeo.vertices.length; i++){
		
		if (chinaGeo.vertices[i].z != 0){
			chinaOuterGeoIndices.push(i);
			
		}
	}
	
	//国外地图
	coordToVector(foreignGeo.vertices, radius + 5.5);
	
	chinaGeo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0.1) );
	chinaGeo.computeCentroids();
	
	//中国地图
	coordToVector(chinaGeo.vertices, radius + 5.5);
	
	//粒子系统地图几何对象
	var particles_geometry = foreignGeo.clone();
	
	for (var i = 0; i < particles_geometry.vertices.length; i++){
		
		particles_geometry.colors.push(new THREE.Color(0xffffff));
		
	}
	
	particles_geometry.applyMatrix( new THREE.Matrix4().makeScale( 0.98, 0.98, 0.98) );
	
	particles_geometry.dynamic = true;
	
	particles_material = new THREE.ParticleBasicMaterial({
		size: 1, 
		map: THREE.ImageUtils.loadTexture( "textures/dot.png" ),
		blending: THREE.CustomBlending,
		blendSrc: THREE.OneFactor,
		blendDst: THREE.OneFactor,
		blendEquation: THREE.AddEquation,
		opacity: .8,
		side: THREE.FrontSide,
		transparent: false,
		vertexColors: true
	});
	
	//粒子系统地图
	particleMap = new THREE.ParticleSystem( particles_geometry, particles_material);
	scene.add( particleMap );
	
	//blue globe
	var blueGlobe = THREE.SceneUtils.createMultiMaterialObject( 
		new THREE.SphereGeometry(radius - 3, 80, 40), 
		[
       		new THREE.MeshPhongMaterial({color: 0xfefefe, opacity: .7,  combine: THREE.MultiplyOperation, transparent: true } ),
			new THREE.MeshBasicMaterial({color: 0x002A52, transparent: true, opacity: .5,  blending: THREE.AdditiveBlending, wireframe: false, side: THREE.FrontSide}),
			new THREE.MeshBasicMaterial({color: 0xf0f0f0, transparent: true, opacity: .1, blending: THREE.AdditiveBlending, wireframe: true, side: THREE.FrontSide}),
       	]
	);
	scene.add( blueGlobe );
	
	//天空盒子
	var skyboxGeo = new THREE.SphereGeometry(radius * 10, 100, 100),
		skyboxMat = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( "textures/sky_globe.png" ), opacity: .7,  combine: THREE.MultiplyOperation, transparent: true, side: THREE.BackSide } );
	skyGlobe = new THREE.Mesh(skyboxGeo, skyboxMat);
	scene.add(skyGlobe);
	
	//经线圆环
	var arcShape = new THREE.Shape();
	arcShape.absarc( 0,0, 190, 0, Math.PI*2, false );
	
	var holePath = new THREE.Path();
	holePath.absarc( 0,0, 185, 0, Math.PI*2, true );
	arcShape.holes.push( holePath );
	
	var torusGeo = arcShape.extrude({amount: 1.5, bevelEnabled: false, curveSegments: 50 });
	torusGeo.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ));
	
	var torus = new THREE.Mesh(
		torusGeo,
		new THREE.MeshPhongMaterial({emissive: 0x002A52, opacity: .5, transparent: true} )
	);
	scene.add( torus );
	
	//创建球面法线
	createGlobeNormal();
}

function createGlobeNormal(){
	
	var geo = new THREE.Geometry();
	
	for (var i = 0; i < client_list.length; i++){

		var tempGeo = new THREE.CubeGeometry(0.5, 0.5, client_list[i]['position'].distanceTo(client_list[i]['lowerPos']));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -tempGeo.depth / 2) );
		tempGeo.applyMatrix( new THREE.Matrix4().lookAt(new THREE.Vector3(), client_list[i]['lowerPos'] , client_list[i]['lowerPos'].clone().normalize()));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(client_list[i]['lowerPos'].x, client_list[i]['lowerPos'].y, client_list[i]['lowerPos'].z) );
		
		for (var j = 0, geoFacesLen = tempGeo.faces.length; j < geoFacesLen; j++){
			
			tempGeo.faces[j].color.setHex(0x00ff00);
			
		}
		
		THREE.GeometryUtils.merge(geo,tempGeo);
	}
	
	for (var i = 0; i < auth_list.length; i++){

		var tempGeo = new THREE.CubeGeometry(0.5, 0.5, auth_list[i]['position'].distanceTo(auth_list[i]['lowerPos']));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -tempGeo.depth / 2) );
		tempGeo.applyMatrix( new THREE.Matrix4().lookAt(new THREE.Vector3(), auth_list[i]['lowerPos'] , auth_list[i]['lowerPos'].clone().normalize()));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(auth_list[i]['lowerPos'].x, auth_list[i]['lowerPos'].y, auth_list[i]['lowerPos'].z) );
		
		for (var j = 0, geoFacesLen = tempGeo.faces.length; j < geoFacesLen; j++){
			
			tempGeo.faces[j].color.setHex(0xf5389e);
			
		}
		
		THREE.GeometryUtils.merge(geo,tempGeo);
	}
	
	for (var i = 0; i < final_list.length; i++){

		var tempGeo = new THREE.CubeGeometry(0.5, 0.5, final_list[i]['position'].distanceTo(final_list[i]['lowerPos']));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -tempGeo.depth / 2) );
		tempGeo.applyMatrix( new THREE.Matrix4().lookAt(new THREE.Vector3(), final_list[i]['lowerPos'] , final_list[i]['lowerPos'].clone().normalize()));
		tempGeo.applyMatrix( new THREE.Matrix4().makeTranslation(final_list[i]['lowerPos'].x, final_list[i]['lowerPos'].y, final_list[i]['lowerPos'].z) );
		
		for (var j = 0, geoFacesLen = tempGeo.faces.length; j < geoFacesLen; j++){
			
			tempGeo.faces[j].color.setHex(0x002A52);
			
		}
		
		THREE.GeometryUtils.merge(geo,tempGeo);
	}
	
	var normal_mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({transparnt: true, opacity: .8, vertexColors: true, depthTest: true}));
	scene.add(normal_mesh);
	
}

function createCubeGeo(mergeGeo, length, color){
	
	
	
}

function createRibbon(startPosition, endPosition, color, number){
	
	color = color !== undefined ? color : 0xff0000;
	number = number !== undefined ? number : 100;
	
	var ribbonGeo = new THREE.Geometry();
	var ribbonColor = new THREE.Color(color);
	
	var point_num = 50;
	
	for ( var c = 0; c < point_num; c ++ ) {

		ribbonGeo.vertices.push( new THREE.Vector3() );
		var hsl = new THREE.Color(0xff0000).getHSL();
		ribbonColor.setHSL(hsl.h, hsl.s, 1.0-(c/point_num));
		ribbonGeo.colors.push(ribbonColor.clone());
	
	}

	var ribbon = new THREE.Line( 
		ribbonGeo,  new THREE.LineBasicMaterial( { linewidth: 3.0, vertexColors: THREE.VertexColors, depthTest: false } )
	);
	ribbonGeo.dynamic = true;
	ribbon.frustumCulled = false;
	
	var spark = createSparks(color, number);
	
	var ribbonAnimationObj = {
		geometry: ribbonGeo,
		spark: spark,
		startPoint: startPosition, 
		endPoint: endPosition, 
		currentPoint: startPosition.clone(),
		animationTime: 0,
		length: startPosition.length()
	};
	
	ribbon.obj = ribbonAnimationObj;
	
	ribbonContainer.add(ribbon);
}


function createSparks(color, number){
	
	color = color !== undefined ? color : 0xff0000;
	number = number !== undefined ? number : 100;
	
	number = Math.min(100, number);
	number = Math.max(500, number);
	
	var spark= new THREEx.Sparks({
		maxParticles	: number ,
		counter		: new SPARKS.SteadyCounter(number / 2)
	});
	
	// setup the emitter
	var emitter	= spark.emitter();
	
	var initColorSize	= function(){
		this.initialize = function( emitter, particle ){
			particle.target.color().setHex(color);
			particle.target.size(25);
		};
	};
	
	emitter.addInitializer(new initColorSize());
	var emitterpos = new THREE.Vector3(0, 0, 0);
	emitter.emitterpos = emitterpos;
	
	emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( emitter.emitterpos ) ) );
	emitter.addInitializer(new SPARKS.Lifetime(0.9, 1));
	emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))));
	
	emitter.addAction(new SPARKS.Age(TWEEN.Easing.Linear.None));
	emitter.addAction(new SPARKS.Move());
	
	var randomDrift = 25;
	
	emitter.addAction(new SPARKS.RandomDrift(randomDrift,randomDrift,randomDrift));
	emitter.addAction(new SPARKS.Accelerate(0,0,0));
	emitter.start();
	
	// restart it 
	sparkContainer.add(spark.container());
	
	return spark;
		
}

function createHeartbeatDot(color){
	
	color = color !== undefined ? color : 0xff0000;
	
	var canvas = document.createElement('canvas');
	canvas.width = canvas.height = 256;

	var context = canvas.getContext('2d');
	context.globalAlpha = .9;
	
	context.strokeStyle = '#FF0000';
	context.lineWidth = 20;
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 * 4 / 5, 0, Math.PI*2, false);
	context.stroke();
	
	var r = canvas.width / 2,
		sideLen = r / Math.tan(Math.PI / 6),
		height = Math.cos(Math.PI / 6) * sideLen;
	context.fillStyle = '#FFFFFF';
	context.beginPath();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2 - sideLen / 2, height);
	context.lineTo(canvas.width / 2 + sideLen / 2, height);
	context.lineTo(canvas.width / 2, 0);
	context.closePath();
	context.fill();
	
	context.strokeStyle = '#000000';
	context.lineWidth = 20;
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 / 2, 0, Math.PI*2, false);
	context.stroke();
	
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	
	var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false, depthTest: true, transparent: true} ));
	return textMesh;
	
}

function createDot(color){
	
	color = color !== undefined ? color : 0xff0000;
	
	var canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;

	var context = canvas.getContext('2d');
	context.globalAlpha = .6;
	
	context.fillStyle = '#FFFFFF';
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI*2, false);
	context.closePath();
	context.fill();
	
	context.strokeStyle = '#000000';
	context.lineWidth = 1.3;
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 * 4 / 5, 0, Math.PI*2, false);
	context.stroke();
	
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	
	var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { color: color, map: texture, useScreenCoordinates: false, depthTest: false, transparent: true} ));
	textMesh.scale.set(5, 5, 5);
	return textMesh;
	
}

function runRibbonAnimations () {
	
	for (var k = 0; k < ribbonContainer.children.length; k++){
		
		var o = ribbonContainer.children[k].obj;

		o.currentPoint.lerp(o.endPoint, 0.05);
		
		for (var i = 0; i < o.geometry.vertices.length; i++) {
			
			if (i == 0) {
				
				o.geometry.vertices[i] = o.currentPoint.clone().setLength(o.length);
				
			} else {
				
				o.geometry.vertices[i].lerp(o.geometry.vertices[i-1], 0.3).setLength(o.length);
				
			};
		};
		
		o.spark.emitter().emitterpos.x = o.geometry.vertices[0].x,
		o.spark.emitter().emitterpos.y = o.geometry.vertices[0].y,
		o.spark.emitter().emitterpos.z = o.geometry.vertices[0].z,
		o.spark.update();
		
		o.geometry.verticesNeedUpdate = true;
		
		if (o.currentPoint.distanceTo(o.endPoint) < 0.0005){
			
			var dns_pos = final_list[Math.floor(Math.random()*final_list.length/2)*2]['position'];
			
			if (!o.endPoint.equals(dns_pos)){
				createRibbon(o.endPoint, dns_pos, 0xf5389e, o.number);
			}else{
				
			}
			o.spark.destroy();
			sparkContainer.remove(o.spark.container());
			ribbonContainer.remove(ribbonContainer.children[k]);
			
		}
	}
}

function coordToVector(vertices, r){
	
	r = r !== undefined ? r : radius;
	
	for (var i = 0; i < vertices.length; i++){
		
		var vector = vertices[i];
		var sphereV = coordToSphereVector(vector.x, vector.y, r);
		vertices[i].set(sphereV.x, sphereV.y, sphereV.z);
		
	}
}

function coordToSphereVector(x, y, r){
	
	r = r !== undefined ? r : radius;
	
	var phi = (180 - y) * Math.PI / 180;
    var theta = (180 - x) * Math.PI / 180;
	
	var v = new THREE.Vector3();
    v.x = r * Math.cos(phi) * Math.cos(theta);
	v.y = r * Math.sin(phi);
	v.z = r * Math.cos(phi) * Math.sin(theta);
	
	return v;
	
}

function animate() {
	
	requestAnimationFrame( animate );
	render();
	runRibbonAnimations();
	
	var clock = new Date().getTime() / 500;
		
	frameSize++;
	
	if (frameSize > 10){
		
		var itemClient = client_list[Math.floor(Math.random()*client_list.length/2)*2];
		var startPosition = itemClient['position'];
		var endPosition = auth_list[Math.floor(Math.random()*auth_list.length/2)*2]['position'];
		createRibbon(startPosition, endPosition, 0x00ff00, itemClient['number']);
		frameSize = 0;
		
	}
	
	var scale = Math.max( 10, Math.abs(Math.sin(clock)) * 20),
		opacity = Math.max( 0.5, Math.abs(Math.sin(clock)));
	sprite.scale.set(scale, scale, scale);
	sprite.material.opacity = opacity;
	sprite.material.rotation += 0.05;
	
	backgroundLight && (backgroundLight.position = camera.position.clone().negate());
	particleMap && ( particleMap.geometry.verticesNeedUpdate = true );
	foreignShapeMap && ( foreignShapeMap.geometry.verticesNeedUpdate = true );
	chinaShapeMap && ( chinaShapeMap.geometry.verticesNeedUpdate = true );
	
	skyGlobe.rotation.y += 0.0001;
}

function render() {
	
	renderer.render( scene, camera );
	
	controls.update();
	TWEEN.update();
	
}