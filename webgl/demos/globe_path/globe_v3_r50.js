var DAT = DAT || {};

DAT.Globe = function(container, colorFn) {
	colorFn = colorFn ||
	function(x) {
		var c = new THREE.Color();
		c.setHSV((0.6 - (x * 0.5 ) ), 1.0, 1.0);
		return c;
	};

	var Shaders = {
		'earth' : {
			uniforms : {
				'texture' : {
					type : 't',
					value : 0,
					texture : null
				}
			},
			vertexShader : ['varying vec3 vNormal;', 'varying vec2 vUv;', 'void main() {', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', 'vNormal = normalize( normalMatrix * normal );', 'vUv = uv;', '}'].join('\n'),
			fragmentShader : ['uniform sampler2D texture;', 'varying vec3 vNormal;', 'varying vec2 vUv;', 'void main() {', 'vec3 diffuse = texture2D( texture, vUv ).xyz;', 'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );', 'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );', 'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );', '}'].join('\n')
		},
		'atmosphere' : {
			uniforms : {},
			vertexShader : ['varying vec3 vNormal;', 'void main() {', 'vNormal = normalize( normalMatrix * normal );', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
			fragmentShader : ['varying vec3 vNormal;', 'void main() {', 'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );', 'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;', '}'].join('\n')
		}
	};

	var camera, scene, renderer, w, h;
	var vector, mesh, atmosphere, point, p_geometry;

	var overRenderer;

	var curZoomSpeed = 0;
	var zoomSpeed = 50;
	var line_splice = 30;

	var mouse = {
		x : 0,
		y : 0
	}, mouseOnDown = {
		x : 0,
		y : 0
	};
	var rotation = {
		x : 0,
		y : 0
	}, target = {
		x : Math.PI / 9.0,
		y : Math.PI / 9.0
	}, targetOnDown = {
		x : 0,
		y : 0
	};

	var distance = 700, distanceTarget = 700;
	var padding = 40;
	var PI_HALF = Math.PI / 2;
	var textMesh;
	var radius = 200;
	var geometry, p_material, lineMaterial;
	var vertices_arr = [];
	function init() {

		container.style.color = '#fff';
		container.style.font = '13px/20px Arial, sans-serif';

		var shader, uniforms, material;
		w = container.offsetWidth || window.innerWidth;
		h = container.offsetHeight || window.innerHeight;
		//w = 330;
		//h = 330;
		camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
		camera.position.z = distance;
		vector = new THREE.Vector3();
		scene = new THREE.Scene();
		geometry = new THREE.SphereGeometry(radius, 40, 30);
		shader = Shaders['earth'];
		uniforms = THREE.UniformsUtils.clone(shader.uniforms);

		uniforms['texture'].texture = THREE.ImageUtils.loadTexture('world_bak.jpg');
		material = new THREE.ShaderMaterial({

			uniforms : uniforms,
			vertexShader : shader.vertexShader,
			fragmentShader : shader.fragmentShader

		});
		mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial());
		//mesh = new THREE.Mesh(geometry, material);
		mesh.matrixAutoUpdate = false;
		scene.add(mesh);
		renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		renderer.autoClear = false;
		renderer.setClearColorHex(0x000000, 0.0);
		renderer.setSize(w, h);

		renderer.domElement.style.position = 'absolute';
		
		container.appendChild(renderer.domElement);
		/*
		container.addEventListener('mousedown', onMouseDown, false);

		container.addEventListener('mousewheel', onMouseWheel, false);

		document.addEventListener('keydown', onDocumentKeyDown, false);

		container.addEventListener('mouseover', function() {
			overRenderer = true;
		}, false);

		container.addEventListener('mouseout', function() {
			overRenderer = false;
		}, false);
		*/
		//window.addEventListener('resize', onWindowResize, false);
	}

	addData = function(data, opts) {
		var lat, lng, size, color, i, step, colorFnWrapper;

		opts.animated = opts.animated || false;
		this.is_animated = opts.animated;
		opts.format = opts.format || 'magnitude';
		// other option is 'legend'
		if(opts.format === 'magnitude') {
			step = 3;
			colorFnWrapper = function(data, i) {
				return colorFn(data[i + 2]);
			}
		} else if(opts.format === 'legend') {
			step = 4;
			colorFnWrapper = function(data, i) {
				return colorFn(data[i + 3]);
			}
		} else {
			throw ('error: format not supported: ' + opts.format);
		}
		p_geometry = new THREE.Geometry();
		for( i = 0; i < data.length; i += step) {
			//for (i = 0; i < 1000; i += step) {
			lat = data[i];
			lng = data[i + 1];
			size = data[i + 2];
			color = colorFnWrapper(data, i);
			size = 0;
			addPoint(lat, lng, size, color, p_geometry, false, data[i + 2]);
		}
		//vertices_arr = p_geometry.vertices.concat();
	};
	var textArr = []
	var flag = 0;
	function createText(v, para) {
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 100;

		var context = canvas.getContext('2d');
		context.fillStyle = '333333';
		context.globalAlpha = 1;
		//context.fillRect(0, 0, 400, 200);//填充
		context.font = "12pt 微软雅黑";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(para, canvas.width / 2.02, canvas.height / 2);
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		var textMat = new THREE.MeshBasicMaterial({
			map : texture,
			useScreenCoordinates : false,
			shading : THREE.SmoothShading,
			blending : THREE.NormalBlending,
			depthTest : true,
			vertexColors : THREE.VertexColors,
		});
		textMesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width / 5, canvas.height / 8, 0, 0), textMat);
		textMesh.scale.x = textMesh.scale.y = textMesh.scale.z = 5;
		if( v instanceof THREE.Vector3) {
			textMesh.position = v;
		} else {
			textMesh.position = new THREE.Vector3();
		}
		textArr.push(textMesh);
		return textMesh;
	}

	function createPoints() {

		var p_sprite = THREE.ImageUtils.loadTexture("ball.png");
		p_material = new THREE.ParticleBasicMaterial({
			size : 5,
			map : p_sprite,
			blending : THREE.AdditiveBlending,
			depthTest : false,
			transparent : true
		});
        //p_material.color.setHSV(Math.random(), Math.random(), 1);
        p_material.color.setHex(0xffffff);

		var p_system = new THREE.ParticleSystem(p_geometry, p_material);
		scene.add(p_system);
		THREE.GeometryUtils.merge(geometry, p_geometry);
		createLineMaterial();
	}

	function addPoint(lat, lng, size, color, geo, isDrawText, num) {
		var phi = (90 - lat) * Math.PI / 180;
		var theta = (180 - lng) * Math.PI / 180;
		geo.colors.push(color);
		var v3 = new THREE.Vector3(
			radius * Math.sin(phi) * Math.cos(theta), 
			radius * Math.cos(phi), 
			radius * Math.sin(phi) * Math.sin(theta)
		);
		geo.vertices.push(v3)
		vertices_arr.push({'vector' : v3, pt : { 'phi' : phi, 'theta' : theta } });
	}
	
	
	
	//计算两点之间的球面轨迹等分线段的顶点坐标
	function generatePhiTheta(sv, ev, points_length) {
		//spt为start phi and theta ，ept 为  end phi and theta
		var last_arr = [];
		var spt = sv.pt;
		var ept = ev.pt;
		var item_phi = (ept.phi - spt.phi)/points_length;
		var item_theta = (ept.theta - spt.theta)/points_length;
		var new_center = new THREE.Vector3().add(sv.vector, ev.vector).multiplyScalar(0.5);
		var new_radius = ev.vector.distanceTo(sv.vector)/2;
		for (i = 0; i <= points_length; i++){
			last_arr.push(
				/*
				new THREE.Vector3().add(
					new_center,
					new THREE.Vector3(
						new_radius * Math.sin(spt.phi + i*item_phi) * Math.cos(spt.theta + i*item_theta), 
						new_radius * Math.cos(spt.phi + i*item_phi), 
						new_radius * Math.sin(spt.phi + i*item_phi) * Math.sin(spt.theta + i*item_theta)
					)
				)*/
				new THREE.Vector3(
						new_radius * Math.sin(spt.phi + i*item_phi) * Math.cos(spt.theta + i*item_theta), 
						new_radius * Math.cos(spt.phi + i*item_phi), 
						new_radius * Math.sin(spt.phi + i*item_phi) * Math.sin(spt.theta + i*item_theta)
				).multiplyScalar(radius/new_radius)
			);
		}
		return last_arr;
	}

	var lines = [];
	var remove_lines = [];

	function createLines() {
		var startVector;// = vertices_arr[getPointIndex(vertices_arr.length)];
		var endVector;// = vertices_arr[getPointIndex(vertices_arr.length)];
        safe_range_s = 45 / 180 * Math.PI;
        safe_range_e = 150 / 180 * Math.PI;
		while(true){
		    startVector = vertices_arr[getPointIndex(vertices_arr.length)];
		    if (startVector.pt.phi < safe_range_e && startVector.pt.phi > safe_range_s){
		        break;
		    } 
		}
		while(true){
		    endVector = vertices_arr[getPointIndex(vertices_arr.length)];
            if (endVector.pt.phi < safe_range_e && endVector.pt.phi > safe_range_s){
                break;
            } 
		}
        var controlVector = getControlVector(startVector.vector, endVector.vector);
        line_vertices = generateCurvVectors([startVector.vector, controlVector, endVector.vector], line_splice);
		var line_vertices = generatePhiTheta(startVector, endVector, line_splice);
		var lineGeometry = new THREE.Geometry();
		
		lineGeometry.dynamic = true;
		lineGeometry.__dirtyVertices = true;
		lineGeometry.__dirtyColors = true;
		lineGeometry.verticesNeedUpdate = true;
		lineGeometry.computeCentroids();
		
		for( i = 0; i <= line_splice; i++) {
			lineGeometry.vertices.push(startVector.vector);
		}

		var line = new THREE.Line(lineGeometry, lineMaterial);
		lines.push({
			'line' : line,
			'go_vertices' : line_vertices.concat(),
			'back_vertices' : line_vertices.concat(),
			'is_complate' : false
		});
		scene.add(line);
	}

	function createLineMaterial() {
		lineMaterial = new THREE.LineBasicMaterial({
			color : Math.random()*0xffffff,
			opacity : 1,
			linewidth : 1
		});
	}

	//随机抽取index
	function getPointIndex(len) {
		return parseInt(Math.random() * len) + 1;
	}

	function getControlVector(sv, ev) {
		var cos = sv.dot(ev) / (sv.lengthManhattan() * ev.lengthManhattan());
		var cross_v = new THREE.Vector3();
		return cross_v.add(sv, ev).normalize().multiplyScalar((radius + ev.distanceTo(sv) / 10));
	}

	//获取曲线上等分线段的所有不重复顶点的坐标。
	function generateCurvVectors(para, points_length) {
		var last_arr = [];
		var s_pline = new THREE.Spline(para);
		for(var i = 0; i <= points_length; i++) {
			last_arr.push(new THREE.Vector3(s_pline.getPoint(i / points_length).x, s_pline.getPoint(i / points_length).y, s_pline.getPoint(i / points_length).z));
		}
		return last_arr;
	}

	function onMouseDown(event) {
		event.preventDefault();

		container.addEventListener('mousemove', onMouseMove, false);
		container.addEventListener('mouseup', onMouseUp, false);
		container.addEventListener('mouseout', onMouseOut, false);

		mouseOnDown.x = -event.clientX;
		mouseOnDown.y = event.clientY;

		targetOnDown.x = target.x;
		targetOnDown.y = target.y;

		container.style.cursor = 'move';
	}

	function onMouseMove(event) {
		mouse.x = -event.clientX;
		mouse.y = event.clientY;

		var zoomDamp = distance / 1000;

		target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
		target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

		target.y = target.y > PI_HALF ? PI_HALF : target.y;
		target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
	}

	function onMouseUp(event) {
		container.removeEventListener('mousemove', onMouseMove, false);
		container.removeEventListener('mouseup', onMouseUp, false);
		container.removeEventListener('mouseout', onMouseOut, false);
		container.style.cursor = 'auto';
	}

	function onMouseOut(event) {
		container.removeEventListener('mousemove', onMouseMove, false);
		container.removeEventListener('mouseup', onMouseUp, false);
		container.removeEventListener('mouseout', onMouseOut, false);
	}

	function onMouseWheel(event) {
		event.preventDefault();

		if(overRenderer) {
			zoom(event.wheelDeltaY * 0.3);
		}
		return false;
	}

	function onDocumentKeyDown(event) {
		switch (event.keyCode) {
			case 38:
				zoom(100);
				event.preventDefault();
				break;
			case 40:
				zoom(-100);
				event.preventDefault();
				break;
			case 32:
				event.preventDefault();
				createLines();
		}
	}

	function onWindowResize(event) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function zoom(delta) {
		distanceTarget -= delta;
		distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
		distanceTarget = distanceTarget < 200 ? 200 : distanceTarget;
	}
	var temp = 0;
	function animate() {
		requestAnimationFrame(animate);
		temp++;
		if (temp > 5) createLines(),temp = 0;
		render();
	}

	var timer;
	function render() {
		timer = new Date() * 0.0005;

		//zoom(curZoomSpeed);
        
		rotation.x += (target.x - rotation.x) * 0.1;
		rotation.y += (target.y - rotation.y) * 0.1;
		//distance += (distanceTarget - distance) * 0.3;

		camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
		camera.position.y = distance * Math.sin(rotation.y);
		camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

		p_material.color.setHSV((Math.sin(timer) + 1 ) / 2, (Math.cos(timer) + 1 ) / 2, (Math.cos(timer) + 10 ) / 5);

		vector.copy(camera.position);

		for( i = 0; i < textArr.length; i++) {
			textArr[i].lookAt(camera.position);
		}

		for( i = 0; i < lines.length; i++) {
			if(lines[i].go_vertices.length > 0 && !lines[i].is_complate) {
				
				var current_vector = lines[i].go_vertices.shift();

				var current_index = line_splice - lines[i].go_vertices.length;

				var lineGeometry = lines[i].line.geometry;

				for( j = current_index; j < lineGeometry.vertices.length; j++) {
					lineGeometry.vertices[j] = current_vector;
				}
				/*
				for (k = 0; k <= current_index; k++){
					lineGeometry.vertices[k].x += (Math.random()*2 - 1)/5;
					lineGeometry.vertices[k].y += (Math.random()*2 - 1)/5;
					lineGeometry.vertices[k].z += (Math.random()*2 - 1)/5;
				}*/
				lineGeometry.verticesNeedUpdate = true;
				
			}else{
				if (!lines[i].is_complate){
					lines[i].is_complate = true;
				}
				if (lines[i].line){
					if (lines[i].line.geometry.vertices.length > 0 && lines[i].is_complate){
						lines[i].line.geometry.vertices.shift();
						lines[i].line.geometry.verticesNeedUpdate = true;
					}else{
						
						if (lines[i].line != null){
							scene.__removeObject(lines[i].line);
							for (k = scene.children.length - 1; k >= 0 ; k--){
								if (scene.children[k].id == lines[i].line.id){
									scene.children.splice( k,1);
									break;
								}
							}
							lines[i].line = null;
						}
					}
				}
			}
		}

		//自动旋转
		target.x -= 0.002;
		renderer.clear();
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}

	init();
	this.animate = animate;
	this.addData = addData;
	this.createPoints = createPoints;
	this.renderer = renderer;
	this.scene = scene;
	this.zoom = zoom;
	this.createLines = createLines;

	return this;
};
