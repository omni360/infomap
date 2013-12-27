var container;

var w = 1440;
var h = 989;

var camera, scene, renderer;
var composer;

var has_gl = false;

var delta;
var time;
var oldTime;

var world, worldContainer, vertical_line_Geometry;
var array = [];

var uniforms;
var attributes;

var ribbonArray = [];

var mouseX = 0;
var mouseY = 0;

var radius = 100;
var lineHeight = 6;
var spriteScale = 15;

var effect;
var opacityOffset = 2000;

var pointDict = {};
var groupDict = {};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener( 'touchmove', onTouchMove, false );

var projector = new THREE.Projector();
var vertical_line, outerParticles;
var centerCoord = [108.9401750, 34.3415680];
init();

function init() {
	
	$.get('data/globe.json', function (json){
		
		array = eval(json);
		
		$.get('data/data.json', function (res){
			
			var result = eval(res);
			for (var i in result){
				pointDict[result[i]['id']] = result[i];
				var value = {x: result[i]['coord'][0], y: result[i]['coord'][1], scale:4, mod: 0, delay: Math.random(), group: result[i]['group'], id: result[i]['id'], level: result[i]['level'], color: result[i]['color']};
				array.push(value);
				
				!groupDict[result[i]['level']] && (
					groupDict[result[i]['level']] = {
						'name': result[i]['type'], 'children': [], 'color': result[i]['color']
					}
				);
				groupDict[result[i]['level']]['children'].push(result[i]['id']);
				
			}
			console.log(groupDict)
			init_webgl();
			animate()
			
		},'text')

	},'text')
}

function init_webgl() {

	container = document.getElementById('container');

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 30, 590 );
	
	camera = new THREE.PerspectiveCamera( 45, w / h, 1, 10000 );
	camera.position.z = -145;
	camera.target = new THREE.Vector3( 0, 0, 0 );

	world = new THREE.Object3D();
	world.rotation.y = -Math.PI / 1.7;
	world.rotation.x = -Math.PI / 55;
	world.position.y -= 50;
	scene.add(world);

	worldContainer = new THREE.Object3D();
	worldContainer.rotation.x = -Math.PI/2;
	world.add(worldContainer);

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
	vertical_line_Geometry = new THREE.Geometry();
	
	var vertices = particles_geometry.vertices;
	var values_size = attributes.size.value;
	var values_time = attributes.time.value;
	var values_color = attributes.customColor.value;

	var random_colors = [new THREE.Color(0x587f52),new THREE.Color(0xabb7aa),new THREE.Color(0x0a0d09),new THREE.Color(0x4e8342),new THREE.Color(0x818e7f)];
	
	//地球几何对象的生成
	for (var i = 0; i < array.length; i ++ ) {
		
		var vertex;
		
		if (array[i] instanceof Array){
			
			for (var j = 0; j < array[i].length; j++){
				
				var point = array[i][j];
				
				vertex = coordToVector(point.x, point.y);
				
				vertices.push( vertex );
				
				switch(j){
					case 0:
						globe_line_geometry.vertices.push(vertex);
						break;
					case array[i].length - 1:
						globe_line_geometry.vertices.push(vertex);
						break;
					default:
						globe_line_geometry.vertices.push(vertex);
						globe_line_geometry.vertices.push(vertex);
						break;
				}
				
				values_size.push(point.scale);
				values_time.push(point.delay);
				values_color.push(new THREE.Color('#408988'));
			}

		} else if (array[i] instanceof Object){
			
			var point = array[i];
			
			vertex = coordToVector(point.x, point.y);
			
			vertices.push( vertex );
				
			values_size.push(point.scale);
			values_color.push(new THREE.Color(point.color));
			values_time.push(point.delay);
			
			if (vertex.z < -90 || vertex.z > 90) {continue};
			vertical_line_Geometry.colors.push( new THREE.Color(point.color));
			vertical_line_Geometry.colors.push( new THREE.Color(point.color));
			vertical_line_Geometry.vertices.push( vertex.clone() );
			vertical_line_Geometry.vertices.push( vertex.clone() );

			var index = vertical_line_Geometry.vertices.length - 1;
			
			var div = document.createElement( 'div' );
			div.setAttribute('id', 'click_div_' + point.id);
			div.setAttribute('data', point.level);
			div.setAttribute('class', 'click_div');
			div.addEventListener('mousedown', function (e){
				e.preventDefault();

				RaphaelTree.pointClick(e.currentTarget.id.split('click_div_')[1],e.currentTarget.getAttribute('data'))
			})
			document.body.appendChild( div );
			pointDict[point.id]['vector'] = vertex.clone();
			pointDict[point.id]['index'] = index;
			pointDict[point.id]['tip'] = null;
			pointDict[point.id]['dot'] = null;
			pointDict[point.id]['ribbon'] = [];
			pointDict[point.id]['div'] = div
			
		}
	}
	
	var particles = new THREE.ParticleSystem( particles_geometry, particles_material);
	worldContainer.add( particles);
	
	// blue Globe
	var globe = new THREE.Mesh(
		new THREE.SphereGeometry(radius - 1, 100, 100), 
		new THREE.MeshBasicMaterial({'color': new THREE.Color(0x0B1818), opacity: .5, blending: THREE.AdditiveBlending})
	);
	worldContainer.add( globe);
	
	//globe line
	var globe_line = new THREE.Line(globe_line_geometry, 
		new THREE.LineBasicMaterial( { color: 0x408988, blending: THREE.AdditiveBlending}) , 
		THREE.LinePieces
	);
	worldContainer.add( globe_line );
	
	//vertical_line
	vertical_line = new THREE.Line( 
		vertical_line_Geometry, 
		new THREE.LineBasicMaterial( { opacity: 1.0, linewidth: 1.0, vertexColors: THREE.VertexColors } ), 
		THREE.LinePieces 
	);
	worldContainer.add( vertical_line );

	for (var id in pointDict){
		var point = pointDict[id];
		
		// dot、tip
		var vertex = point['vector'].clone().multiplyScalar( (radius + lineHeight) / radius);
		
		var color = point.color;
		
		var number = point.links.length;
	
		number = number !== 0 ? number : '';
		
		var dot = createDot(number, color);
		dot.position = vertex;
		worldContainer.add(dot);
		
		var point_data = point['data'];
		var tip = createTip(point_data['area']['cities'] + " : " + point_data['ip'], color);
		tip.position = vertex;
		worldContainer.add(tip);
		
		point['dot'] = dot;
		point['tip'] = tip;
		
		// ribbons
		for (var link in point['links']){
			
			var linkPoint = pointDict[point['links'][link]];

			if(linkPoint == undefined) continue;

			var ribbon = new THREE.Geometry();
			var color = new THREE.Color(0xffffff);
			
			for ( var c = 0; c < 100; c ++ ) {

				ribbon.vertices.push( new THREE.Vector3() );
				var hsl = new THREE.Color(point['color']).getHSL();
				color.setHSL(hsl.h, hsl.s, 1.0-(c/100));
				ribbon.colors.push(color.clone());

			}
	
			var ribbonMesh = new THREE.Line( 
				ribbon,  
				new THREE.LineBasicMaterial( { opacity: 0.5, linewidth: 1.0, vertexColors: THREE.VertexColors } ) 
			);
			ribbon.dynamic = true;
			ribbonMesh.frustumCulled = false;
			worldContainer.add( ribbonMesh );
			

			var obj = {
				geometry: ribbon, mesh: ribbonMesh , 
				startPoint: point['vector'].clone(), 
				endPoint: linkPoint['vector'].clone(), 
				currentPoint: null, animationTime: 0
			};
			
			point['ribbon'].push(obj);
		}
	}
	
	var animTween = new TWEEN.Tween(uniforms.globalTime)
	.to({value: 1.0}, 2000)
	.easing(TWEEN.Easing.Linear.None)
	.delay(100)
	.onComplete(function (){
		createLegends();
		create3dButton();
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

function startLineAnimation(obj, delay){
	
	var temp_vertor = vertical_line_Geometry.vertices[obj['index']].normalize().setLength(radius);
	var to_vertor = temp_vertor.clone().multiplyScalar((radius + lineHeight) / radius);
	var animLines = new TWEEN.Tween(temp_vertor)
		.to({x: to_vertor.x, y: to_vertor.y, z: to_vertor.z},1500)
		.easing(TWEEN.Easing.Linear.None)
		.delay(delay);
	animLines.start();
	
	obj.dot.material.opacity = obj.tip.material.opacity = 0;
	
	var dotOpacityTween = new TWEEN.Tween(obj.dot.material)
		.to ({opacity: 1}, 1500)
		.easing(TWEEN.Easing.Linear.None)
		.delay(delay)
		.onComplete(function (){
			
			var scaleInTween = new TWEEN.Tween(obj.dot.scale)
				.to ({x: spriteScale / 10 * 2, y: spriteScale / 10 * 2 , z: spriteScale / 10 * 2 }, 150)
				.easing(TWEEN.Easing.Cubic.Out)
				.delay(0)
				.onComplete(function (){
					
					var scaleOutTween = new TWEEN.Tween(obj.dot.scale)
						.to ({x: spriteScale / 10, y: spriteScale / 10, z: spriteScale / 10}, 300)
						.easing(TWEEN.Easing.Quartic.Out)
						.delay(0);
						
					scaleOutTween.start();
					
				});
				
			scaleInTween.start();
			
		});
	dotOpacityTween.start();
	
	var tipOpacityTween = new TWEEN.Tween(obj.tip.material)
		.to ({opacity: 1}, 2000)
		.easing(TWEEN.Easing.Linear.None)
		.delay(delay);
	tipOpacityTween.start();

}

function startRibbonAnimation (obj, delay) {

	var o = obj;
	var distance = o.startPoint.distanceTo(o.endPoint);
	var time = Math.max( 3000 ,(distance*40) );
	
	o.currentPoint = o.startPoint.clone();
	
	o.animationTime = 0;
	
	var d = delay || 0;

	//动态线条的渲染速度
	var timeTween = new TWEEN.Tween(o)
		//.to({animationTime: 0.5}, time)
		.to({animationTime: 0.8}, 3000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.delay(d)
		/*
		.onUpdate( function() {
			if (o.animationTime >= 0.2){
				vertical_line_Geometry.vertices[obj['index']].normalize().setLength(radius + lineHeight);
			}
		})
		.onComplete(function (){
			//setTimeout(startRibbonAnimation(obj, 200+Math.random()*300), 1500);
		});
		*/
	timeTween.start();
	
	for (var i = 0; i < o.geometry.vertices.length; i++) {
		o.geometry.vertices[i] = o.currentPoint.clone();
	};

	o.geometry.verticesNeedUpdate = true;				

}

function runLineAnimations () {
	
	for (var p in pointDict){
		
		var ribbons = pointDict[p]['ribbon'];
		
		for (var r in ribbons){
			
			var o = ribbons[r];

			if ( o.currentPoint !== null ){
				
				o.currentPoint.lerp(o.endPoint, o.animationTime);
			
				if (!o.currentPoint.equals(o.endPoint)){
					
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
	textMesh.material.opacity = 0;
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
	textMesh.material.opacity = 0;
	return textMesh;
	
}

function createLegends(){
	
	var delay = 3000;
	
	var groupLength = 0;
	for (var i in groupDict){
		groupLength++;
	}
	
	var buttonHtmls = $('<div id = "legend_0" class="legend" tabindex = " 0 ">回放</div>');
	
	
	animateTween();
	setInterval(animateTween, 100000);
	
	/*
	$('#css-legend-panel').append(buttonHtmls);
	$("#" + 'legend_'+ 0).click(function (){
		
		remove_all();
			
		var index = parseInt($(this).attr('tabindex'));
		
		for (var m = -1; m <= index; m++){
			
			var objs = groupDict[m]['children']
			
			for (var o = 0; o < objs.length; o++){
				
				var obj = pointDict[objs[o]];
				
				if (m == -1){
					startLineAnimation(obj, (m + 1)*delay+o*opacityOffset);
				
				for (var p = 0; p < obj['links'].length; p++){
					//obj['ribbon'][p]['index'] = pointDict[obj['links'][p]]['index'];//obj['index'];
					obj['ribbon'][p].mesh.visible = true;
					startRibbonAnimation( obj['ribbon'][p], (m + 1 + 1)*delay+( ( p + ( m + 1 ) + o ) * opacityOffset) );
					startLineAnimation(pointDict[obj['links'][p]], (m + 1 + 1)*delay+( ( p + ( m + 1 ) + o ) * opacityOffset));
				}
			}
		}
	});

	$('#css-legend-panel').animate({ opacity: 1 }, opacityOffset);
	*/                  
}

function animateTween (){
		
	var delay = 3000;

	remove_all();
			
	var index = 1;
	
	for (var m = -1; m <= index; m++){
		
		var objs = groupDict[m]['children'];
		
		for (var o = 0; o < objs.length; o++){
			
			var obj = pointDict[objs[o]];
			
			if (m == -1){
				startLineAnimation(obj, (m + 1)*delay+o*opacityOffset);
			}
			for (var p = 0; p < obj['links'].length; p++){
				//obj['ribbon'][p]['index'] = pointDict[obj['links'][p]]['index'];//obj['index'];
				obj['ribbon'][p].mesh.visible = true;
				startRibbonAnimation( obj['ribbon'][p], (m + 1 + 1)*delay+( ( p + ( m + 1 ) + o ) * opacityOffset) );
				startLineAnimation(pointDict[obj['links'][p]], (m + 1 + 1)*delay+( ( p + ( m + 1 ) + o ) * opacityOffset));
			}
		}
	}
}

function create3dButton(){
	
	$('#change_button_panel').animate({ opacity: 1 }, opacityOffset);
	$('#parallaxModel').click(function (){
		var d = $(this).attr('data');
		if (d == 0){
			d = 1;
			$('#parallaxModel').html('关闭3D');
		}else{
			d = 0;
			$('#parallaxModel').html('开启3D');
		}
		$(this).attr('data', d);
	});
	
}

function remove_all (){
	
	var dot_scale = spriteScale / 10,
		tip_scale = spriteScale * 1.25;
	
	for (var k in pointDict){
		pointDict[k]['dot'].material.opacity = pointDict[k]['tip'].material.opacity = 0;
		pointDict[k]['dot'].scale = new THREE.Vector3( dot_scale ,dot_scale ,dot_scale );
		pointDict[k]['tip'].scale = new THREE.Vector3( tip_scale ,tip_scale ,tip_scale );
		
		for (var j in pointDict[k]['ribbon']){
			pointDict[k]['ribbon'][j]['mesh'].visible = false;
		}
		
		vertical_line_Geometry.vertices[pointDict[k]['index']].normalize().setLength(radius);
		
	}
	
	TWEEN.removeAll()
	
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

function worldToScreen(worldVectorObj, projectorObj, cameraObj ){
	
	//var projector = new THREE.Projector();
	
	//var world_vector = new THREE.Vector3(0,0,1);
	
	var vector = projectorObj.projectVector(worldVectorObj, cameraObj);
	
	var halfWidth = w / 2;
	
	var halfHeight = h / 2;
	
	return result = {
	
		x: Math.round(vector.x * halfWidth + halfWidth),
		y: Math.round(-vector.y * halfHeight + halfHeight)
	
	}
	
}

function coordToVector(x, y, r){
		
	r = r !== undefined ? r : radius;
	
	var phi = (180 - y) * Math.PI / 180;
    var theta = (180 - x) * Math.PI / 180;
	
	var v = new THREE.Vector3();
    v.x = r * Math.cos(phi) * Math.cos(theta);
	v.y = r * Math.cos(phi) * Math.sin(theta);
	v.z = r * -Math.sin(phi);
	
	return v;
}

function animate() {
	
	vertical_line.geometry.verticesNeedUpdate = true;
	
	for (var i in pointDict){
		var v = worldContainer.localToWorld(pointDict[i]['vector'].clone().multiplyScalar((radius + lineHeight) / radius));
		var a = worldToScreen(v, projector, camera);
		$(pointDict[i]['div']).css({
			'left': a.x - 10,
			'top': a.y - 10
		});
	}
	
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
	
	//camera.position.y += (-10 * Math.sin(mouseY/500) - camera.position.y) / 30;
	//camera.position.x += (-10 * Math.sin(mouseX/500) - camera.position.x) / 30;
	camera.position.y += (-10 * Math.sin(time / 3000) - camera.position.y) / 10;
	camera.position.x += (-10 * Math.cos(time / 3000) - camera.position.x) / 10;
	camera.lookAt(camera.target);
	
	TWEEN.update();
	runLineAnimations();
	
	if (has_gl) {
		
		renderer.render( scene, camera );
		parseInt($('#parallaxModel').attr('data')) && effect.render( scene, camera );
	}
	
}