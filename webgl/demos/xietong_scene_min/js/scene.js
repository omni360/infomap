/**
 * @author whenlove
 */

function ClassTPlatform(settings){
	
    this.settings = settings || {};

    this.loadFlag = true;
    this.ClaseLoadNum = true;
     
    this.loader = new THREE.JSONLoader();
    
    this.systemList = settings.systemList !== undefined ? settings.systemList : [];
    
    /*
     * 初始 类 相关数据
     */
    ClassTPlatform.prototype.initClass = function(){
        // 容纳webgl的dom对象
        this.containerId = this.settings.parentElementId;
        this.container = document.getElementById(this.containerId);
        // 中心点
        this.middlePoint = new THREE.Vector3(
            0, 0, 0
        );
        
        // 自己用的一些参数
        this.num = 0;
        this.flag = true;
        
        //mousemove 和 mousedown事件所用的用于存储坐标的标记变量，无需关注
        this.mouseLastMovePoint = new Object, 
        this.mouseDownPoint = new Object, 
        
        // 鼠标点击监听，闭包绑定写法。用于绑定执行该函数的上下文环境
        $("#" + this.containerId).mousedown(this.onMouseDown.bind(this));
        // 鼠标滑轮监听-闭包写法
        this.onMouseWheelHandler = this.onMouseWheel.bind(this);
        // Firefox支持一个名为DOMMouseScroll的类似事件
        document.getElementById(this.containerId).addEventListener("DOMMouseScroll", this.onMouseWheelHandler, !1);
        document.getElementById(this.containerId).addEventListener("mousewheel", this.onMouseWheelHandler, !1); 
        
        // 鼠标移动监听
        //this.mouse = { x: 0, y: 0 };
        //this.INTERSECTED = null;
        //this.onMouseMoveHandler = this.onDocumentMouseMove.bind(this);
        //document.getElementById(this.containerId).addEventListener( 'mousemove', this.onMouseMoveHandler, false );
        
        this.initWebgl();
    }
    
    /*
     * 初始 webgl 相关对象
     */
    ClassTPlatform.prototype.initWebgl = function(){
        
        // 控制摄像机位置
        this.phiDiff = 0, 
        this.thetaDiff = 0,
        
        // 控制摄像机和目标位置的位置关系
        this.cameraRadius = 1000, // 这个能控制摄像机的高度，初始时可以调整
        this.smoothRadius = 1, 
        
        // 当前摄像机的初始位置
        this.theta = 0, 
        this.phi = 179, 
        
        // 常量，pi转为角度值
        this.PI360 = Math.PI / 360, 
        
        //以下两个变量，用于控制加载动画摄像机微幅度旋转的次数统计，无需特别关注
        this.flagThetaNumber = 0;
        // 刚进场景时的旋转
        this.thetaDiffDiff = 1.65,
        
        // 鼠标移动用的，不需特殊关注
        this.doAnimation = true, 
        this.phiAnimation = true,
        
        //摄像机对象
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 700000),
        //摄像机的lookat目标对象
        this.camera.target = new THREE.Object3D(); 
        
	    // 投影对象，点击用的，也是固定用法
	    this.projector = new THREE.Projector, 
	    this.ray = new THREE.Ray(this.camera.position, null);
        // 以上两个都是处理点击的，想将三维的投影到2维平面，然后鼠标点击的射线，确定点击的位置
        
        //用于标记鼠标点击节点后摄像机微幅度运动的次数统计
        this.moveCount = 0,
        //用于控制鼠标点击后摄像机移动的tween动画，里面的数据用于控制匀速还是非匀速
        this.tweenAmount = [1, 1.2, 1.5, 2, 2.8, 3.5, 5, 6, 7, 8, 8, 8, 8, 8, 7, 6, 5, 3.5, 2.8, 2, 1.5, 1.2, 1], 
        
        this.moveSpeed = 60;
        this.move_objects = [];
        //this.sample_map = THREE.ImageUtils.loadTexture( "textures/sample.png" );
        this.rotating_li = [];
        this.line_li = [];
        this.cartoon_line_li = [];
        this.cartoon_line_dic = {};
        
        // 报文监测和恶意代码捕获系统
        this.sys_1_position = new THREE.Vector3(
            -3000, 9640 , -10000
        );
        this.sys_1_color = 0xffff00;
        
        // 蜜网系统
        this.sys_2_position = new THREE.Vector3(
            4170, 13400 , -10000
        );
        this.sys_2_color = 0xff0000;
        
        // 流监测系统
        this.sys_3_position = new THREE.Vector3(
            5400, 9800 , -10000
        );
        this.sys_3_color = 0x00ff00;
        
        // 网站监测系统
        this.sys_4_position = new THREE.Vector3(
            400, 8400 , -10000
        );
        this.sys_4_color = 0x0000ff;
        
        // 域名监测系统
        this.sys_5_position = new THREE.Vector3(
            3500, 6800 , -10000
        );
        this.sys_5_color = 0xDE2F6F;
        
        // 路由监测系统
        this.sys_6_position = new THREE.Vector3(
            6900, 16100 , -10000
        );
        this.sys_6_color = 0x990066;
        
        // 轻载扫描系统
        this.sys_7_position = new THREE.Vector3(
            -5000, 13500 , -10000
        );
        this.sys_7_color = 0x663399;
        
        this.scene = new THREE.Scene();
        this.rotating = new THREE.Object3D();
        this.scene.add( this.rotating );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth , window.innerHeight );
        this.renderer.autoClear = false;
        this.container.appendChild( this.renderer.domElement );
        
        this.cartoon_index = 0;
        this.cartoon_data = [];
        
        this.loadSenseObjects();
        
        this.animate();

    }
    
    /*
     * 加载场景对象，主要是周边的一些参考对象，如底部网格等
     */
    ClassTPlatform.prototype.loadSenseObjects = function(){

        // 中心参考物体
        var sphere_geometry = new THREE.SphereGeometry( 200 );
        var sphere_material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true, wireframeLinewidth: .1 } );
        sphere = new THREE.Mesh(sphere_geometry, sphere_material);
        sphere.position.set(0,0,-20000);
        this.scene.add(sphere);
        
        var sphere_material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: .1 } );
        sphere = new THREE.Mesh(sphere_geometry, sphere_material);
        sphere.position.set(0,0,0);
        this.scene.add(sphere);
        
        //<-----
        var plane_size = 40000,
            plane_num = 100;
        
        //var plane_material = new THREE.MeshBasicMaterial( { color: 0x0088cc, wireframe: true, wireframeLinewidth: .1 } );
        //var plane_material =  new THREE.MeshLambertMaterial( { color: 0x0088cc, ambient: 0x0088cc, opacity: 0.6,wireframe: true, transparent: true, side: THREE.DoubleSide } );
        var plane_material =  new THREE.MeshPhongMaterial( { color: 0x008080, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: .3,wireframe: true, } );
        var plane_geometry1 = new THREE.PlaneGeometry( 35, 20, 175, 100 );
        
        
        mesh1 = THREE.SceneUtils.createMultiMaterialObject( plane_geometry1, [
           new THREE.MeshPhongMaterial( { color: 0x008080, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: .3,wireframe: true, } ),
           new THREE.MeshPhongMaterial( { color: 0x0c0c0c, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: .6,wireframe: false, } ),
        ] );

        //mesh1 = new THREE.Mesh( plane_geometry1, plane_material );
        mesh1.position = new THREE.Vector3(
            0,0,6
        );

        mesh1.rotation.x = - Math.PI / 2;
        this.scene.add( mesh1 );
        //----->
        
        var plane_geometry2 = new THREE.PlaneGeometry( 280000, 20000, 350, 50 );
        mesh1 = new THREE.Mesh( plane_geometry2, plane_material );
        mesh1.position = new THREE.Vector3(
            0,10000,-20000
        );
        //mesh1.rotation.x = - Math.PI / 2;
        //this.scene.add( mesh1 );
        
        //各系统模型 --xfc 修改加载时机
        this.loadSystems();
        
        var ambient = new THREE.AmbientLight( 0x8c8c8c );
		//this.scene.add( ambient );
		
		var light_strong = 1.5,
			light_color = 0xf0f0f0,
			light_scale = 50;
		
        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = light_scale;
        pointLight.position.z = light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = -light_scale;
        pointLight.position.z = light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = light_scale;
        pointLight.position.z = -light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = -light_scale;
        pointLight.position.z = -light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = light_scale;
        pointLight.position.z = 0;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = -light_scale;
        pointLight.position.z = 0;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = 0;
        pointLight.position.z = light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = light_scale / 2;
        pointLight.position.x = 0;
        pointLight.position.z = -light_scale;
        this.scene.add(pointLight);
        
        /////////////
        
		/*
        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = -light_scale;
        pointLight.position.x = light_scale;
        pointLight.position.z = light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = -light_scale;
        pointLight.position.x = -light_scale;
        pointLight.position.z = light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = -light_scale;
        pointLight.position.x = light_scale;
        pointLight.position.z = -light_scale;
        this.scene.add(pointLight);

        var pointLight = new THREE.PointLight(light_color, light_strong);
        pointLight.position.y = -light_scale;
        pointLight.position.x = -light_scale;
        pointLight.position.z = -light_scale;
        this.scene.add(pointLight);
        */
    }
    
    ClassTPlatform.prototype.loadChinaModel = function(geometry){

        //中国地图
        var faces = geometry.faces;

        for (var i = 0; i < faces.length; i++){

            var face = faces[i];

            if (face.normal.z >= 0 && face.normal.z <= 0){
                
                face.color.setHex(0x99CCFF);

            }else{

                face.color.setHex(0x276F91);

            }

        }

        var china_map = new THREE.Mesh( geometry,  new THREE.MeshBasicMaterial({vertexColors: true}));
        china_map.position.set(0,8000,-18000);
        china_map.scale.set( 1600, 1600, 240);
        this.scene.add( china_map );
        
        
        particle_geometry1 = new THREE.Geometry();
        attributes = {
            size: { type: 'f', value: [] },
            customColor: { type: 'c', value: [] }
        };
        
        uniforms = {
            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            //为了着色后与背景相适应，更换粒子图片
            texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "images/map_mask.png" ) },
        };
        
        var shaderMaterial = new THREE.ShaderMaterial( {
            
            uniforms:       uniforms,
            attributes:     attributes,
            vertexShader:   document.getElementById( 'flash_vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'flash_fragmentshader' ).textContent,
            
            blending:       THREE.AdditiveBlending,
            blendDst:       THREE.SrcAlphaFactor,
            blendSrc:       THREE.OneMinusSrcAlphaFactor,
            //blendEquation:  THREE.AddEquation,
            //depthTest:      true,
            depthWrite:     false,
            transparent:    true,
            // sizeAttenuation: true,
        });
        
        var particle_size1 = attributes.size.value;
        var particle_colors1 = attributes.customColor.value;
        
        
        for( var i = 0; i < data_list.length; i ++ ) {
            var cx = data_list[i][13] * 1.6;
            var cy = -(data_list[i][14] * 1.6) + 8000;
            
            /*
            *
            *地图上动态变化贴图的图形
            *
            */

            var map = THREE.ImageUtils.loadTexture('images/glowspan.png');
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.needsUpdate = true;
            map.onUpdate = function(){
                this.offset.y -= 0.009;
                this.needsUpdate = true;
            }

            var mesh = new THREE.Mesh( 
                new THREE.CylinderGeometry( 100, 0, 30, 30, 0 ),
                new THREE.MeshBasicMaterial({
                    map: map,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    //depthTest: true,
                    depthWrite: false,
                    wireframe: true,
                    opacity:1,
                })
            );

            mesh.position.set(cx, cy , -17740);
            mesh.rotation.x = - Math.PI / 2;
            this.scene.add( mesh );
            
            /*
            *
            *地图上发射出的粒子和线条
            *
            */

            if(data_list[i][1]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_1_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_1_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_1_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][2]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_2_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_2_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_2_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][3]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_3_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_3_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_3_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][8]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_4_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_4_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_4_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][6]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_5_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_5_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_5_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][7]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_6_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_6_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_6_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            if(data_list[i][9]){
                var startPosition = new THREE.Vector3( cx, cy, -17740 );
                var endPosition = this.sys_7_position;
                var distance = startPosition.distanceTo(endPosition);
                
                var line_data = {
                    'line_curve': new THREE.LineCurve3(startPosition, endPosition),
                    // 起始位置
                    'point_at': 0,
                    'point_speed': 50 / distance,
                    'index' : this.line_li.length,
                    'size'  : 40,
                    'is_complate' : true
                };
                this.line_li.push(line_data);
                particle_colors1.push(new THREE.Color( this.sys_7_color ));
                particle_size1.push(1);
                particle_geometry1.vertices.push(  endPosition  );
                
                var line_material1 = new THREE.LineBasicMaterial( { color: this.sys_7_color, opacity: 1, linewidth: 2 } );
                var line_geometry1 =  new THREE.Geometry();
                line_geometry1.vertices.push(  startPosition  );
                line_geometry1.vertices.push(  startPosition  );
                var line1 = new THREE.Line( line_geometry1, line_material1 );
                line1.updateMatrix();
                line1.visible = false;
                this.scene.add( line1 );
                this.cartoon_line_li.push(line1);
            }
            
        }
        
        Particles1 = new THREE.ParticleSystem( particle_geometry1, shaderMaterial );
        Particles1.sortParticles = true;
        Particles1.updateMatrix();
        Particles1.visible = true;
        this.scene.add( Particles1 );
    }
    
    /*
     * 初始管道和移动对象
     */
    ClassTPlatform.prototype.initTubeAndMoveObjects = function(){

        sample_map = THREE.ImageUtils.loadTexture( "textures/sample.png" );
        data_map = THREE.ImageUtils.loadTexture( "textures/data.png" );
        
        /*
         * 数据汇聚到系统的管道
         */
        
        var sample_storage_obj_list = [
            
            // 网站监测系统
            [[[400, 8400 , -10000], [400, 8400 , -8000]], 4 ],
            [[[400, 8400 , -8000], [400, 7400 , -7000]], 4 ],
            [[[400, 7400 , -7000], [400, 4950 , -7000]], 4 ],
            [[[400, 4950 , -7000], [400, 4950 , 14000]], 4 ],
            [[[400, 4950 , 14000], [400, 8000 , 14000]], 4 ],
            [[[400, 8000 , 14000], [-18000, 8000 , 14000]], 4 ],
            [[[-18000, 8000 , 14000], [-18000, 8000 , 25000]], 4 ],
            [[[-18000, 8000 , 25000], [-100000, 8000 , 25000]], 4 ],
            [[[-100000, 8000 , 25000], [-100000, 8000 , 5000]], 4 ],
            [[[-100000, 8000 , 5000], [-107000, 8000 , 5000]], 4 ],
            [[[-107000, 8000 , 5000], [-107000, 6000 , 5000]], 4 ],
            
            // 流监测系统
            [[[5400, 9800 , -10000], [5400, 9800 , -8000]], 3 ],
            [[[5400, 9800 , -8000], [5400, 8800 , -7000]], 3 ],
            [[[5400, 8800 , -7000], [5400, 4950 , -7000]], 3 ],
            [[[5400, 4950 , -7000], [5400, 4950 , 0]], 3 ],
            [[[5400, 4950 , 0], [5400, 4950 , 20000]], 3 ],
            [[[5400, 4950 , 20000], [76000, 4950 , 20000]], 3 ],
            [[[76000, 4950 , 20000], [76000, 8000 , 20000]], 3 ],
            [[[76000, 8000 , 20000], [76000, 8000 , -8000]], 3 ],
            [[[76000, 8000 , -8000], [114000, 8000 , -8000]], 3 ],
            [[[114000, 8000 , -8000], [114000, 6000 , -8000]], 3 ],
            
            // 轻载扫描系统
            [[[-5000, 13500 , -10000], [-5000, 13500 , -8000]], 3 ],
            [[[-5000, 13500 , -8000], [-5000, 12500 , -7000]], 3 ],
            [[[-5000, 12500 , -7000], [-5000, 4950 , -7000]], 3 ],
            [[[-5000, 4950 , -7000], [-5000, 4950 , 18000]], 3 ],
            [[[-5000, 4950 , 18000], [-5000, 7000 , 18000]], 3 ],
            [[[-5000, 7000 , 18000], [60000, 7000 , 18000]], 3 ],
            [[[60000, 7000 , 18000], [60000, 7000 , 30000]], 3 ],
            [[[60000, 7000 , 30000], [120000, 7000 , 30000]], 3 ],
            [[[120000, 7000 , 30000], [120000, 7000 , 50000]], 3 ],
            [[[120000, 7000 , 50000], [120000, 6000 , 50000]], 3 ],
            
            // 路由监测系统
            [[[6900, 16100 , -10000], [6900, 16100 , -8000]], 3 ],
            [[[6900, 16100 , -8000], [6900, 15100 , -7000]], 3 ],
            [[[6900, 15100 , -7000], [6900, 8000 , -7000]], 3 ],
            [[[6900, 8000 , -7000], [6900, 8000, 2200]], 3 ],
            [[[6900, 8000, 2200], [45000, 8000, 2200]], 3 ],
            [[[45000, 8000, 2200], [45000, 8000, -9000]], 3 ],
            [[[45000, 8000, -9000], [45000, 6000, -9000]], 3 ],
            
            // 域名监测系统
            [[[3500, 6800 , -10000], [3500, 8000 , -8000]], 4 ],
            [[[3500, 8000 , -8000], [2500, 8000 , -8000]], 4 ],
            [[[2500, 8000 , -8000], [2500, 8000 , -2500]], 4 ],
            [[[2500, 8000 , -2500], [-48000, 8000 , -2500]], 4 ],
            [[[-48000, 8000 , -2500], [-48000, 6000 , -2500]], 4 ],
            
            // 蜜网系统
            [[[4170, 13400 , -10000], [4170, 13400 , -8000]], 3 ],
            [[[4170, 13400 , -8000], [4170, 12400 , -7000]], 3 ],
            [[[4170, 12400 , -7000], [4170, 4950 , -7000]], 3 ],
            [[[4170, 4950 , -7000], [4170, 4950 , 23000]], 3 ],
            [[[4170, 4950 , 23000], [4170, 8000 , 23000]], 3 ],
            [[[4170, 8000 , 23000], [24170, 8000 , 23000]], 3 ],
            [[[24170, 8000 , 23000], [24170, 8000 , 60000]], 3 ],
            [[[24170, 8000 , 60000], [50000, 8000 , 60000]], 3 ],
            [[[50000, 8000 , 60000], [50000, 8000 , 100000]], 3 ],
            [[[50000, 8000 , 100000], [112000, 8000 , 100000]], 3 ],
            [[[85000, 8000 , 100000], [85000, 6000 , 100000]], 3 ],
            [[[112000, 8000 , 100000], [112000, 6000 , 100000]], 3 ],
            
            // 报文监测和恶意代码捕获系统
            [[[-3000, 9640 , -10000], [-3000, 9640 , -8000]], 3 ],
            [[[-3000, 9640 , -8000], [-3000, 8640 , -7000]], 3 ],
            [[[-3000, 8640 , -7000], [-3000, 3000 , -7000]], 3 ],
            [[[-3000, 3000 , -7000], [-3000, 3000 , 5500]], 3 ],
            [[[-3000, 3000 , 5500], [-13000, 3000 , 5500]], 3 ],
            [[[-13000, 3000 , 5500], [-13000, 5500 , 5500]], 3 ],
            [[[-13000, 5500 , 5500], [-13000, 5500 , 38000]], 3 ],
            [[[-13000, 5500 , 38000], [-73000, 5500 , 38000]], 3 ],
            [[[-73000, 5500 , 38000], [-73000, 5500 , 58000]], 3 ],
            [[[-73000, 5500 , 58000], [-73000, 8000 , 58000]], 3 ],
            [[[-73000, 8000 , 58000], [-75000, 8000 , 58000]], 3 ],
            //分叉1
            [[[-75000, 8000 , 58000], [-77000, 8000 , 56000]], 3 ],
            [[[-77000, 8000 , 56000], [-105000, 8000 , 56000]], 3 ],
            [[[-105000, 8000 , 56000], [-105000, 8000 , 46000]], 3 ],
            [[[-105000, 8000 , 46000], [-105000, 6000 , 46000]], 3 ],
            //分叉2
            [[[-75000, 8000 , 58000], [-77000, 8000 , 60000]], 3 ],
            [[[-77000, 8000 , 60000], [-105000, 8000 , 60000]], 3 ],
            [[[-105000, 8000 , 60000], [-105000, 8000 , 115000]], 3 ],
            [[[-105000, 8000 , 115000], [-105000, 6000 , 115000]], 3 ],
        ];
        
        var sample_storage_obj_color = 0xffffff,
            sample_storage_obj_map = sample_map,
            sample_storage_obj_num = 6,
            sample_storage_obj_interval = 30;
        var sample_storage_tube_color = 0x00FFFF,
            sample_storage_tube_segments = 40,
            sample_storage_tube_radius = 60,
            sample_storage_tube_radius_segments = 4;
        
        this.createTubeAndMoveObjects(sample_storage_obj_list, sample_storage_obj_color, sample_storage_obj_map, sample_storage_obj_num, sample_storage_obj_interval, 
            sample_storage_tube_color, sample_storage_tube_segments, sample_storage_tube_radius, sample_storage_tube_radius_segments);
        
        /*
         * 系统间的管道
         */
        
        var sample_storage_obj_list = [
        
            //网站监测系统 -> 协同联动
            [[[-86000, 3500, 5000], [-80000, 3500, 5000]], 4 ],
            [[[-80000, 3500, 5000], [-80000, 1000, 5000]], 4 ],
            [[[-80000, 1000, 5000], [-80000, 1000, 30000]], 4 ],
            [[[-80000, 1000, 30000], [-8000, 1000, 30000]], 4 ],
            
            // 流监测系统 -> 协同联动
            [[[86000, 3000 , 19300], [83000, 3000 , 22300]], 4 ],
            [[[83000, 3000 , 22300], [83000, 1000 , 22300]], 4 ],
            [[[83000, 1000 , 22300], [80000, 1000, 25300]], 4 ],
            [[[80000, 1000, 25300], [15000, 1000, 25300]], 4 ],
            [[[15000, 1000, 25300], [9800, 1000, 20100]], 4 ],
            [[[9800, 1000, 20100], [5850, 1000, 24150]], 4 ],
            
            // 轻载扫描系统 -> 协同联动
            [[[63000, 1000 , 50000], [50000, 1000, 50000]], 4 ],
            [[[50000, 1000, 50000], [50000, 1000, 30000]], 4 ],
            [[[50000, 1000, 30000], [8000, 1000, 30000]], 4 ],
            
            // 域名监测系统 -> 协同联动
            [[[-45300, 1000, 15000], [-45300, 1000, 20000]], 4 ],
            [[[-45300, 1000, 20000], [-10000, 1000 , 20000]], 4 ],
            [[[-10000, 1000 , 20000], [-5600, 1000 , 24400]], 4 ],
            
            // 路由监测系统 -> 协同联动
            [[[45000,  1000, 12500], [45000,  1000, 18500]], 4 ],
            [[[45000,  1000, 18500], [15100,  1000, 18500]], 4 ],
            [[[15100,  1000, 18500], [15100,  1000, 10000]], 4 ],
            [[[15100,  1000, 10000], [0,  1000, 10000]], 4 ],
            [[[0,  1000, 10000], [0,  1000, 22000]], 4 ],
            
            // 蜜网系统 -> 协同联动
            [[[100000,  1000, 76000], [100000,  1000, 70000]], 4 ],
            [[[100000,  1000, 70000], [40000,  1000, 70000]], 4 ],
            [[[40000,  1000, 70000], [40000,  1000, 50000]], 4 ],
            [[[40000,  1000, 50000], [20000,  1000, 50000]], 4 ],
            [[[20000,  1000, 50000], [20000,  1000, 40000]], 4 ],
            [[[20000,  1000, 40000], [10000,  1000, 40000]], 4 ],
            [[[10000,  1000, 40000], [5800,  1000, 35800]], 4 ],
			
            // 恶意代码分析系统 -> 协同联动
            [[[0,  1000, 64800], [0,  1000, 38000]], 4 ],
             
            // 报文监测和恶意代码捕获系统 -> 协同联动
            [[[-80500,  1000, 80000], [-65000,  1000, 80000]], 4 ],
            [[[-65000,  1000, 80000], [-65000,  1000, 50000]], 4 ],
            [[[-65000,  1000, 50000], [-20000,  1000, 50000]], 4 ],
            [[[-20000,  1000, 50000], [-5700,  1000, 35700]], 4 ],
            
            // 蜜网系统 -> 恶意代码分析系统
            [[[100000,  1000, 124000], [100000,  1000, 132000]], 4 ],
            [[[100000,  1000, 132000], [-33500,  1000, 132000]], 4 ],
            [[[-33500,  1000, 132000], [-33500,  1000, 123000]], 4 ],
            
            // 报文监测和恶意代码捕获系统 -> 恶意代码分析系统
            [[[-127000,  1000, 80000], [-132000,  1000, 80000]], 4 ],
            [[[-132000,  1000, 80000], [-132000,  1000, 132000]], 4 ],
            [[[-132000,  1000, 132000], [-41500,  1000, 132000]], 4 ],
            [[[-41500,  1000, 132000], [-41500,  1000, 123000]], 4 ],
            
        ];
        
        var sample_storage_obj_color = 0xffffff,
            sample_storage_obj_map = data_map,
            sample_storage_obj_num = 6,
            sample_storage_obj_interval = 30;
        var sample_storage_tube_color = 0x00ff00,
            sample_storage_tube_segments = 40,
            sample_storage_tube_radius = 40,
            sample_storage_tube_radius_segments = 4;
        
        this.createTubeAndMoveObjects(sample_storage_obj_list, sample_storage_obj_color, sample_storage_obj_map, sample_storage_obj_num, sample_storage_obj_interval, 
            sample_storage_tube_color, sample_storage_tube_segments, sample_storage_tube_radius, sample_storage_tube_radius_segments);
        
        var _self = this;
        this.loader.load( 'js/new_model/catche.js', function ( geometry ) {
            	
	        var catcheMaterial = [ 
	            new THREE.MeshPhongMaterial( { color: 0X2F2F2F, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: false} ),
                new THREE.MeshPhongMaterial( { color: 0xf0f0f0, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: true, } ), 
	        ]
	        //网站监测系统 -> 协同联动
	        var catcheModel = THREE.SceneUtils.createMultiMaterialObject( geometry, catcheMaterial );
	        catcheModel.position.set(-70000, 900, 30000);
	        catcheModel.scale.set(4000, 4000, 4000);
	        _self.scene.add( catcheModel );
	        
	        // 流监测系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(50000, 900, 25300);
	        _self.scene.add( cloneModel );
	        
	        // 轻载扫描系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(40000, 900, 30000);
	        _self.scene.add( cloneModel );
	        
	        // 域名监测系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(-30000, 900 , 20000);
	        _self.scene.add( cloneModel );
	        
	        // 路由监测系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(7250,  900, 10000);
	        _self.scene.add( cloneModel );
	        
	        // 蜜网系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(70000,  900, 70000);
	        _self.scene.add( cloneModel );
	        
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(30000,  900, 50000);
	        _self.scene.add( cloneModel );
	        
	        // 恶意代码分析系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(0,  900, 50000);
	        cloneModel.rotation.y = Math.PI / 2;
	        _self.scene.add( cloneModel );
	        
	        // 报文监测和恶意代码捕获系统 -> 协同联动
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(-65000,  900, 65000);
	        cloneModel.rotation.y = Math.PI / 2;
	        _self.scene.add( cloneModel );
	        
	        var cloneModel = catcheModel.clone();
	        cloneModel.position.set(-42500,  900, 50000);
	        _self.scene.add( cloneModel );
	        
	    });
        
    }
    
    ClassTPlatform.prototype.getCoordinate = function(cx, cy, cz, d1, d2, r){
        if (d2 == 0){
            var vector = new THREE.Vector3(cx, cy , cz);
        }
        
        else{
            a1 = (d1 % 360) * Math.pi / 180;
            a2 = (d2 % 360) * Math.PI / 180;
            tx1 = cx + r * Math.cos(a2);
            ty1 = cz + r * Math.sin(a2);
            
            var vector = new THREE.Vector3(tx1, cy, ty1 );
        }
        
        return vector;
    }
    
    /*
     * 初始
     */
    ClassTPlatform.prototype.loadCartoonData = function(){

        try{


        var cartoon_list = [
            [-5000, 600, -24000, 28000, 600, -32000, 290],
            [28000, 600, -32000, 32000, 600, -28000, 250],
            
            [32000, 600, -28000, 32000, 600, 28000, 140],
            [32000, 600, 28000, 28000, 600, 32000, 100],
            
            [28000, 600, 32000, -28000, 600, 32000, -40],
            [-28000, 600, 32000, -32000, 600, 28000, -80],
            
            [-32000, 600, 28000, -32000, 600, -28000, -220],
            [-32000, 600, -28000, -28000, 600, -32000, -260],
            
            [-28000, 600, -32000, -22000, 600, -32000, -240],
            [-22000, 600, -32000, -6000, 600, 4000, -240],
        ];
        
        var cartoon_speed = 200;
        for( var a = 0; a < cartoon_list.length; a ++ ) {
            var oo = cartoon_list[a];
            
            startPosition = new THREE.Vector3(
                oo[0], oo[1], oo[2]
            );
            endPosition = new THREE.Vector3(
                oo[3], oo[4], oo[5]
            );
            var the_distance = startPosition.distanceTo(endPosition);
            
            point_num = cartoon_speed / the_distance;
            
            var ll = Math.round(the_distance/cartoon_speed);
            var point_at = 0;
            var line_curve = new THREE.LineCurve3(startPosition, endPosition);
            
            for( var i = 0; i < ll; i ++ ) {
                var current_position;
                switch(point_at){
                    case 0:
                        // v1是起始位置，v2结束位置，都是自带的属相
                        current_position = line_curve.v1;
                        break;
                    case 1:
                        current_position = line_curve.v2;
                        break;
                    default:
                        // 计算其他点的位置
                        current_position = line_curve.getPoint(point_at);
                }
                //console.info(current_position);
                point_at += point_num;
                point_at > 1 && (point_at = 0);
                //console.info(current_position);
                var current_data = {
                    'type': 'move',
                    'data': current_position,
                };
                this.cartoon_data.push(current_data);
            }
            
            var current_data = {
                'type': 'change',
                'data': oo[6],
            };
            //console.info('===================================');
            
            this.cartoon_data.push(current_data);
        }     
        }catch(e){
            console.log(e.message)
        }
    }
    
    /*
     * 
     */
    ClassTPlatform.prototype.changeAngle = function(angle){
        this.theta = angle;
    }
    
    
    /*
     * 动态渲染，摄像机变化
     */
    ClassTPlatform.prototype.StartCartoon = function(){
        // for( var i = 0; i < data_list.length; i ++ ) {
            // this.rotating_li[i].traverse(function (tt) {
                // if (tt.update !== undefined) {
                    // tt.update();
                // }
            // });
        // }
        
        //console.info(this.cartoon_line_dic);
        if(Math.random() <0.2){
            var s = Math.round(Math.random()*(this.line_li.length));
            //console.info(s);
            if(s < this.line_li.length && this.line_li[s].is_complate){
                //console.info(s);
                this.line_li[s].is_complate = false;
                this.cartoon_line_li[s].visible = true;
                //console.info(this.line_li[s].is_complate);
            }
        }
        for( var i = 0; i < this.line_li.length; i ++ ) {
            var obj = this.line_li[i];
            if(!obj.is_complate){
                //console.info(obj);
                var current_position = this.getCurrentPosition(obj, i);
                particle_geometry1.vertices[i] = current_position;
                Particles1.geometry.verticesNeedUpdate = true;
                
                //this.getCurrentPosition(obj);
            }
            
        }
        
        //if(!this.cartoon_line_dic[s]){
        //    this.cartoon_line_li.push(this.line_li[s]);
        //    this.cartoon_line_dic[s]=true;
        //}
        
        //s < 100 ? console.info(s) : console.info('s > 100');
        
        /*
        for( var i = 0; i < this.cartoon_line_li.length; i ++ ) {
            var obj = this.cartoon_line_li[i];
            var flag = this.getCurrentPosition(obj);
            
            if(!flag){
                this.cartoon_line_li.splice(i,1);
                this.cartoon_line_dic[obj.index]=false;
            }
        }
        */
        
        this.cartoon_index+=1;
    }
    
    /*
     * 动态渲染，摄像机变化
     */


    ClassTPlatform.prototype.animate = function(){

        if( !this.loadFlag ){
            // console.info('--');
            this.ClaseLoadNum && $('#loadPanel').css({
                'visibility': 'hidden'
            });
            this.ClaseLoadNum = false;

            // 镜头运动
            this.flagThetaNumber > 100 && this.StartCartoon();
            if(this.flagThetaNumber < 30){
                this.cameraRadius = this.cameraRadius - 33.2;
            }
            
            // 进场动画。100就是渲染了100次，转了大概一圈，渲染一次大概3.6度，
            if (this.flagThetaNumber < 200 && this.thetaDiffDiff > 0) {
                //主拓扑和周边数据信息加载前
                this.thetaDiffDiff -= 0.11;
                
            }else{
                //重置标记startSetData，下达通知可以开始渲染拓扑和其它周边信息，并重置thetaDiffDiff为0，使得拓扑不在旋转
                this.thetaDiffDiff = 0;
            }
            this.flagThetaNumber += 1;
            
            
            this.doAnimation && (this.thetaDiff = this.thetaDiffDiff),
            this.phiAnimation && (this.phi > 60 && (this.phiDiff = (this.phi - 50) / 18), this.phi < 60 && (this.phiAnimation = !1));
            if(this.flagThetaNumber > 65){
                this.phiDiff != 0 && (this.cameraChanged = !0, this.phiDiff *= .91, this.phi -= this.phiDiff, this.phiDiff < .001 && this.phiDiff > -0.001 && (this.phiDiff = 0)); 
            }
            this.thetaDiff != 0 && (
                this.cameraChanged = !0, 
                this.thetaDiff *= .91, 
                this.theta -= this.thetaDiff, 
                this.theta < -720 ? this.theta = this.theta + 720 : this.theta > 720 && (this.theta = this.theta - 720), 
                this.thetaDiff < .001 && (this.thetaDiff > -0.001 && (this.thetaDiff = 0)),
                this.camera.target.position = this.middlePoint
            )
            this.phi > 179 ? this.phi = 179 : this.phi < -179 && (this.phi = -179);
            if (this.smoothRadius != this.cameraRadius) {
                var a = this.smoothRadius - this.cameraRadius;
                this.smoothRadius -= a / 8; 
                this.cameraChanged = true; 
                //this.updateSelector(); 
                this.smoothRadius > this.cameraRadius - .005 && this.smoothRadius < this.cameraRadius + .005 && (this.smoothRadius = this.cameraRadius);
            }
            
            //console.info('===>');
            //console.info(this.smoothRadius);
            //console.info(this.cameraRadius);
            //console.info(this.theta);
            //console.info(this.phi);
            //console.info(this.thetaDiff);
            //console.info(this.phiDiff);
            //console.info('<===');
            
            this.cameraChanged && (this.updateCamera(), this.cameraChanged = !1);
            
            // 更新一下中心点
            this.camera.lookAt(this.middlePoint);
            
            this.renderWebgl();

            this.loadMoveObjects();
        }

        
        
        requestAnimationFrame(this.animate.bind(this));
    }
    
    /*
     * 渲染webgl场景
     */
    ClassTPlatform.prototype.renderWebgl = function(){
        
        // 仅为延迟加载3dobject， 必须得有flag，不然会无限次加载
        this.num = this.num + 1;
        //if(this.num > 2 && this.flag == true){
        if(this.flag){
            this.flag = false;
            //this.loadCartoonData();
            //this.getData();
            
            //this.initTubeAndMoveObjects();
            
        }
        
        this.renderer.render( this.scene, this.camera );
    }
    
    ClassTPlatform.prototype.updateCamera = function() {
        //console.info('updateCamera');
        this.camera.position.x = this.camera.target.position.x + this.smoothRadius * Math.sin(this.theta * this.PI360) * Math.cos(this.phi * this.PI360), 
        this.camera.position.y = this.camera.target.position.y + this.smoothRadius * Math.sin(this.phi * this.PI360), 
        this.camera.position.z = this.camera.target.position.z + this.smoothRadius * Math.cos(this.theta * this.PI360) * Math.cos(this.phi * this.PI360),  
        this.camera.updateProjectionMatrix();
    }
    
    ClassTPlatform.prototype.onMouseWheel = function(event) {

        event.preventDefault();
        var delta = event.wheelDeltaY

        delta > 0 ? this.cameraRadius -= 0.01 * delta + this.cameraRadius / 1000 : this.cameraRadius -= 0.01 * delta - this.cameraRadius / 1000; 
        //最大允许放大的倍数120
        this.cameraRadius < 2  ? this.cameraRadius = 2 : this.cameraRadius > 2000 && (this.cameraRadius = 2000); 
        event.cancelBubble = true;
    }
    
    /*
     * 鼠标直接移动的事件
     */
    ClassTPlatform.prototype.onDocumentMouseMove = function(event) {
        // this.mouseDownButton = 2为右键移动事件
        // this.mouseDownButton = 1为左键移动事件
        
        //console.info(this.mouse);
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
    
    /*
     * 鼠标点击后的移动事件
     */
    ClassTPlatform.prototype.onMouseMove = function(a) {
        // this.mouseDownButton = 2为右键移动事件
        // this.mouseDownButton = 1为左键移动事件
        if (this.mouseDownButton == 2) {
            //this.closePopup();
            var b = new THREE.Vector3(this.camera.target.position.x - this.camera.position.x, this.camera.target.position.y - this.camera.position.y, this.camera.target.position.z - this.camera.position.z), 
            c = new THREE.Vector3;
            c.crossVectors(this.camera.up, b), 
            vectorSum = Math.sqrt(Math.pow(c.x, 2) + Math.pow(c.z, 2)), 
            c.x = c.x / vectorSum, 
            c.z = c.z / vectorSum, 
            vectorSum = Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.z, 2)), 
            b.x = b.x / vectorSum, b.z = b.z / vectorSum;
            var d = 0, e = 0;
            d = a.clientX - this.mouseLastMovePoint.x, 
            e = a.clientY - this.mouseLastMovePoint.y, 
            d *= this.cameraRadius / 800, 
            e *= this.cameraRadius / 800, 
            this.camera.position.x += c.x * d + b.x * e, 
            this.camera.position.z += c.z * d + b.z * e, 
            this.camera.target.position.x += c.x * d + b.x * e, 
            this.camera.target.position.z += c.z * d + b.z * e, 
            this.middlePoint.position = this.camera.target.position,
            this.mouseLastMovePoint.x = a.clientX, 
            this.mouseLastMovePoint.y = a.clientY;
        } else if (this.mouseDownButton == 0) {
            var f = -(a.clientX - this.mouseDownPoint.x) + this.mouseDownTheta;
            var g = a.clientY - this.mouseDownPoint.y + this.mouseDownPhi;
            g = Math.min(179, Math.max(-179, g)), 
            this.phiDiff += (this.lastPhi - g) * .08, 
            this.thetaDiff += (this.lastTheta - f) * .08, 
            this.lastPhi = g, 
            this.lastTheta = f, 
            this.camera.updateProjectionMatrix();
        }
        return !1;
    }
    
    ClassTPlatform.prototype.onMouseUp = function(a) {
        
        a.preventDefault(), 
    
	    this.mouseMoveHandler && (document.removeEventListener("mousemove", this.mouseMoveHandler, !1), this.mouseMoveHandler = null), 
        this.onMouseUpHandler && window.removeEventListener("mouseup", this.onMouseUpHandler, !1);
	    this.doAnimation = !0;
	    var mouse = {};
	    mouse.x = ( a.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( a.clientY / window.innerHeight ) * 2 + 1;
	    
	    var rayVector,
	        distanceToCamera = -1;
	    var vector = new THREE.Vector3(mouse.x, mouse.y, .5), 
	    unproject_vector = this.projector.unprojectVector(vector, this.camera);
	    this.ray.direction = unproject_vector.sub(this.camera.position).normalize();
	    var intersects = THREE.Collisions.rayCastAll(this.ray);

	    if (intersects.length > 0) {
	        for (i = 0; i < intersects.length; i++) {
	            var intersect = intersects[i];
	            disToCameraX = intersect.center.x - this.camera.position.x, 
	            disToCameraY = intersect.center.y - this.camera.position.y, 
	            disToCameraZ = intersect.center.z - this.camera.position.z, 
	            distance = disToCameraX * disToCameraX + disToCameraY * disToCameraY + disToCameraZ * disToCameraZ;
	            if (distanceToCamera == -1 || distance < distanceToCamera){
	                rayVector = intersects[i].center, distanceToCamera = distance;
	            }
	        }
	        if (rayVector == undefined){
	            return;
	        }else{
	        	if (this.mouseDownButton == 0){
                    var _name = sys_text_li[parseInt(rayVector.uid)][0];
                    $('#locationLabel label').html(_name);
                    for(var i = 0; i < location_data_list.length; i++){
                        var _num = location_data_list[i][parseInt(rayVector.uid)+1];
                        var _dom = $('#locationLabel .num').eq(i);
                        if(_num == 0){
                            _dom.addClass('disable');
                            _dom.html(_num);
                        }else{
                            _dom.removeClass('disable');
                            _dom.html(_num);
                        }
                    }

	    			// console.log(a);
                    $('#locationLabel').css({
                        'top': (a.y < (window.innerHeight - 511)) ? a.y : a.y - 511,
                        'left': (a.x < (window.innerWidth - 320)) ? a.x : a.x - 320,
                        'visibility': 'visible',
                        'opacity': '1'
                    })
	        	}
	        }
	    }else{
            $('#locationLabel').css({
                'visibility': 'hidden',
                'opacity': '0'
            });
        }
    }
    
    ClassTPlatform.prototype.onMouseDown = function(a) {
        //console.info('onMouseDown');
        this.mouseDownPoint.x = a.clientX, 
        this.mouseDownPoint.y = a.clientY, 
        this.mouseLastMovePoint.x = a.clientX, 
        this.mouseLastMovePoint.y = a.clientY, 
        this.mouseDownButton = a.button, 
        this.mouseDownButton == 0 && (this.doAnimation = !1), 
        this.lastPhi = this.phi, 
        this.lastTheta = this.theta, 
        this.mouseDownTheta = this.theta, 
        this.mouseDownPhi = this.phi, this.mouseMoveHandler || (this.mouseMoveHandler = this.onMouseMove.bind(this)),
        document.addEventListener("mousemove", this.mouseMoveHandler, !1); 
        this.onMouseUpHandler = this.onMouseUp.bind(this), 
        window.addEventListener("mouseup", this.onMouseUpHandler, !1);
    }
    
    ClassTPlatform.prototype.onKeyDown = function(a) {
        var keyName = "";
        var e=e||event;
    　	var currKey=e.keyCode||e.which||e.charCode;
                　if((currKey>7&&currKey<14)||(currKey>31&&currKey<47))
        {
                　 　   switch(currKey)
                   　 　 {
                    // 　 　 　 case 8: keyName = "[退格]"; break;
                    // 　 　 　 case 9: keyName = "[制表]"; break;
                    // 　 　 　 case 13:keyName = "[回车]"; break;
                    // 　 　 　 case 32:keyName = "[空格]"; break;
                    // 　 　 　 case 33:keyName = "[PageUp]";   break;
                    // 　 　 　 case 34:keyName = "[PageDown]";   break;
                    // 　 　 　 case 35:keyName = "[End]";   break;
                    // 　 　 　 case 36:keyName = "[Home]";   break;
                    // 　 　 　 case 37:keyName = "[方向键左]";   break;
                    // 　 　 　 case 38:keyName = "[方向键上]";   break;
                    // 　 　 　 case 39:keyName = "[方向键右]";   break;
                    // 　 　 　 case 40:keyName = "[方向键下]";   break;
                    // 　 　 　 case 46:keyName = "[删除]";   break;           　 　 　
                case 38:keyName = "up";   break;
                case 40:keyName = "down";   break;
                default:keyName = "";    break;
                　 　     }
                　 }
        if(keyName == "up"){
            this.scene_index+=1;
        }
        if(keyName == "down"){
            this.scene_index+=1;
        }
    }
    
    ClassTPlatform.prototype.moveToObj = function(a, b, c, uid) {
        this.camera.target.position.x = a;
        this.camera.target.position.y = b;
        this.camera.target.position.z = c;
        this.middlePoint.x = this.camera.target.position.x;  
        this.middlePoint.y = this.camera.target.position.y;  
        this.middlePoint.z = this.camera.target.position.z; 
        this.updateCamera();
    }
    
    ClassTPlatform.prototype.getData = function() {
        for (x in data_list) {
            monitor_data = data_list[x];
            lon = monitor_data[11];
            lat = monitor_data[12];
            
            
            monitor_location = this.getXY(parseFloat(lon), parseFloat(lat));
            
        }
    };
    
    ClassTPlatform.prototype.getXY = function(lon, lat) {
        // 中国地图实际大小，15000*10000
        //北53.69
        //南18.15
        //西39.43
        //东134.63
        return {
            cx: ((lon-39.43)*(11000)/95.2) - 45 -5000,//左侧多30
            cy: ((53.69-lat)*(7000)/35.54) + 18 -5000//上侧多10
        };
    };
    
    ClassTPlatform.prototype.createTip = function(font_size, para, color, text_align) {
        
        var canvas = document.createElement('canvas');

        var font_num = Math.ceil(para.length / 2) + (para.length / 2 - 1) * 1;

        canvas.width = (font_size + 8) * font_num;
        canvas.height = (font_size + 40) * 1.5;
        
        var context = canvas.getContext('2d');

        context.globalAlpha = .6;
        context.fillStyle = 'rgb(38,111,144 )';
        //context.strokeStyle = '#111';
        context.beginPath();
        context.rect(0,0,canvas.width, canvas.height)
        context.closePath();
        context.fill();
        context.stroke();

        context.translate(canvas.width / 2,canvas.height / 2 - 4);
        context.globalAlpha = 1;
        context.font = "bold " + font_size + "pt 微软雅黑";
        context.textAlign = text_align;
        context.textBaseline = "middle";
        context.fillStyle = "#FFFFFF";
        context.fillText(para, 0 , 0);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.repeat.set(1,1);
        
        var textMesh = new THREE.Sprite(new THREE.SpriteMaterial( { color: 0xffffff, map: texture, depthTest: false, transparent: true, sizeAttenuation: true, useScreenCoordinates: false } ) );
        
        //textMesh.material.uvScale.set(canvas.width,canvas.height);
        //textMesh.material.uvScale.set( 2000, 2000 );
        //textMesh.material.uvOffset.set( -0.5, -0.5 );
        textMesh.scale.set(canvas.width,canvas.height, 1);
        return textMesh;
        
    }

    ClassTPlatform.prototype.createLegend = function(font_size, para, color, text_align) {

        var canvas = document.createElement('canvas');

        //var font_num = Math.ceil(para.length / 2) + (para.length / 2 - 1) * 1;
        var font_num = para.length;

        //canvas.width = font_size * font_num;
        //canvas.height = font_size * 1.5;
        canvas.width = (font_size + 0) * font_num;
        canvas.height = (font_size + 40) * 1.5;
        
        var context = canvas.getContext('2d');

        var context_color = new THREE.Color(color).getStyle();

        context.globalAlpha = .6;
        context.fillStyle = context_color;
        //context.strokeStyle = '#111';
        context.beginPath();
        context.rect(0,0,canvas.width, canvas.height)
        context.closePath();
        context.fill();
        context.stroke();


        context.translate(canvas.width / 2,canvas.height / 2);
        context.globalAlpha = 1;
        context.font = "bold " + font_size + "pt 微软雅黑";
        context.textAlign = text_align;
        context.textBaseline = "middle";
        context.fillStyle = "#FFFFFF";
        //context.fillStyle = context_color;
        context.fillText(para, 0 , 0);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.wrapT = 1;
        texture.wrapS = 1;

        var mesh = new THREE.Mesh(
            new THREE.PlaneGeometry( canvas.width, canvas.height, 1, 1 ),
            //new THREE.MeshBasicMaterial( { transparent: true, opacity: 1, map: texture } )
            new THREE.MeshPhongMaterial( { specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: 1, wireframe: false, map: texture})
        );

        //new THREE.MeshPhongMaterial( { color: sys_color, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: false} ),
        //new THREE.MeshPhongMaterial( { color: 0xf0f0f0, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: true, } ),

        mesh.scale.set(10, 10, 1);
        mesh.rotation.x = -Math.PI / 2;
        //mesh.position.y += 200000;

        return mesh;

    }

    
    ClassTPlatform.prototype.setSysInfo = function( flag ) {
        for(i=0; i < this.sys_info.length; i++){
            this.sys_info[i].visible = flag;
        }
    }
    
    ClassTPlatform.prototype.createMoveObjects = function(startPosition, endPosition, color, map, start_num){
        
        var distance = startPosition.distanceTo(endPosition);
        
        
        // 对象1
        var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { 
            color: color, 
            useScreenCoordinates: false,
            map: map, 
            opacity: 1
        } ));
        
        sprite.position = startPosition;
        sprite.visible = false;
        sprite.scale.set( 400, 400, 400 );
        
        this.scene.add(sprite);
        
        var obj = {
            //'line' : line,
            'sprite' : sprite,
            // 三维直线，LineCurve3
            'line_curve': new THREE.LineCurve3(startPosition, endPosition),
            // 起始位置
            'point_at': 0,
            'point_speed': this.moveSpeed / distance,
            'is_complate' : false,
            'start_num' : start_num
        };
        
        this.move_objects.push(obj);
    }
    
    /*
     * 加载移动对象数据
     */
    ClassTPlatform.prototype.getCurrentPosition = function(obj, j){
        //console.info(obj);
        var current_position = 0;
        if(obj.point_at < 1){
            
            switch(obj.point_at){
                case 0:
                    // v1是起始位置，v2结束位置，都是自带的属相
                    current_position = obj.line_curve.v1;
                    break;
                case 1:
                    current_position = obj.line_curve.v2;
                    break;
                default:
                    // 计算其他点的位置
                    current_position = obj.line_curve.getPoint(obj.point_at);
                    this.cartoon_line_li[j].geometry.vertices[ 1 ] = current_position;
                    this.cartoon_line_li[j].geometry.verticesNeedUpdate = true;
            }
            obj.point_at += obj.point_speed;
            
            attributes.size.value[ j ] = obj.point_at * obj.size;
        }
        else{
            obj.is_complate = true;
            obj.point_at = 0;
            current_position = obj.line_curve.v2;
            attributes.size.value[ j ] = 1;
            this.cartoon_line_li[j].visible = false;
        }
        return current_position;
    }
    
    /*
     * 加载移动对象数据
     */
    ClassTPlatform.prototype.loadMoveObjects = function(){
        for (i in this.move_objects){
            var obj = this.move_objects[i];
            if(this.num > obj.start_num){
                obj.sprite.visible = true;
                
                var current_position;
                switch(obj.point_at){
                    case 0:
                        // v1是起始位置，v2结束位置，都是自带的属相
                        current_position = obj.line_curve.v1;
                        break;
                    case 1:
                        current_position = obj.line_curve.v2;
                        break;
                    default:
                        // 计算其他点的位置
                        current_position = obj.line_curve.getPoint(obj.point_at);
                }
                
                obj.sprite.position = current_position;
                
                obj.point_at += obj.point_speed;
                obj.point_at > 1 && (obj.point_at = 0);
            }
        }
    }
    
    
    ClassTPlatform.prototype.loadReceive = function(geometry){


        
        //geometry.computeVertexNormals();
        var s = 100;
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_1_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_1_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_2_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_2_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_3_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_3_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_4_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_4_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_5_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_5_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_6_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_6_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_7_color, opacity: 1, transparent: true , wireframe: true} );
        var sample_storage1 = new THREE.Mesh( 
            geometry, 
            tube_material
        );
        sample_storage1.position = this.sys_7_position;
        sample_storage1.scale.set( 300, 300, 200 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
        
        
        var sys_text_li = [
            ['报 文 监 测 和 恶 意 代 码 捕 获 系 统', this.sys_1_position, 4000000, 240, 60],
            ['蜜 网 系 统', this.sys_2_position, 600000000, 240, 30],
            ['流 监 测 系 统', this.sys_3_position, 1200000, 240, 60],
            ['网 站 监 测 系 统', this.sys_4_position, 1200000, 240, 60],
            ['域 名 监 测 系 统', this.sys_5_position, 1200000, 240, 60],
            ['路 由 监 测 系 统', this.sys_6_position, 1200000, 240, 60],
            ['轻 载 扫 描 系 统', this.sys_7_position, 1200000, 240, 60],
        ]
        for(i=0; i < sys_text_li.length; i++){
        	var sprite = this.createTip( 60, sys_text_li[i][0], 0xff0000, "center");
            //var sprite = this.createTip(sys_text_li[i][2],sys_text_li[i][3],sys_text_li[i][4],sys_text_li[i][0] ,0xff0000, "center");
            //console.info(sys_text_li[i][1]);
            var pos = sys_text_li[i][1].clone();
            pos.y += 800;
            sprite.position = pos;
            sprite.opacity = 1;
            sprite.scale.x *= 3;
            sprite.scale.y *= 3;
            sprite.visible = true;
            this.scene.add( sprite );
            //this.sys_info.push(sprite);
        }

    }
    
    /*
     * 由线条形成的矩形对象
     */
    ClassTPlatform.prototype.buildLineGeometry = function( width, height, depth) {
        var w = width * 0.5;
        var h = height * 0.5;
        var d = depth * 0.5;

        var geometry = new THREE.Geometry();

        

        geometry.vertices.push( new THREE.Vector3( -w, -h, -d ) );
        geometry.vertices.push( new THREE.Vector3( -w, h, -d ) );

        geometry.vertices.push( new THREE.Vector3( -w, h, -d ) );
        geometry.vertices.push( new THREE.Vector3( w, h, -d ) );

        geometry.vertices.push( new THREE.Vector3( w, h, -d ) );
        geometry.vertices.push( new THREE.Vector3( w, -h, -d ) );

        geometry.vertices.push( new THREE.Vector3( w, -h, -d ) );
        geometry.vertices.push( new THREE.Vector3( -w, -h, -d ) );


        geometry.vertices.push( new THREE.Vector3( -w, -h, d ) );
        geometry.vertices.push( new THREE.Vector3( -w, h, d ) );

        geometry.vertices.push( new THREE.Vector3( -w, h, d ) );
        geometry.vertices.push( new THREE.Vector3( w, h, d ) );

        geometry.vertices.push( new THREE.Vector3( w, h, d ) );
        geometry.vertices.push( new THREE.Vector3( w, -h, d ) );

        geometry.vertices.push( new THREE.Vector3( w, -h, d ) );
        geometry.vertices.push( new THREE.Vector3( -w, -h, d ) );

        geometry.vertices.push( new THREE.Vector3( -w, -h, -d ) );
        geometry.vertices.push( new THREE.Vector3( -w, -h, d ) );

        geometry.vertices.push( new THREE.Vector3( -w, h, -d ) );
        geometry.vertices.push( new THREE.Vector3( -w, h, d ) );

        geometry.vertices.push( new THREE.Vector3( w, h, -d ) );
        geometry.vertices.push( new THREE.Vector3( w, h, d ) );

        geometry.vertices.push( new THREE.Vector3( w, -h, -d ) );
        geometry.vertices.push( new THREE.Vector3( w, -h, d ) );

        return geometry;

    }
    
    /*
     * 创建管道和移动对象
     */
    ClassTPlatform.prototype.createTubeAndMoveObjects = function(obj_list, obj_color, obj_map, obj_num, obj_interval, tube_color, tube_segments, tube_radius, tube_radius_segments){
        var startPosition,
            endPosition;
        
        obj_interval = 30;
        
        for( var a = 0; a < obj_list.length; a ++ ) {
            var oo = obj_list[a];
            
            var li = oo[0];
            var path = []
            for(i=0; i < li.length; i++){
                var position = new THREE.Vector3( li[i][0], li[i][1], li[i][2] );
                if(i==0){
                    startPosition = position;
                }
                path.push(position);
                endPosition = position;
                
            }
            
            // 根据距离计算segments
            var the_scale = 1000;
            var the_distance = startPosition.distanceTo(endPosition);
            tube_segments = Math.round(the_distance/the_scale);
            tube_segments == 0 && (tube_segments = 1);
            
            this.addTubeGeometry( path, tube_color , tube_segments, tube_radius, tube_radius_segments)
            
            
            for ( var b = 0; b < tube_segments/2; b ++ ) {
                this.createMoveObjects(startPosition, endPosition, obj_color, obj_map, b * obj_interval);
            }
            
        }
    }
    
    /*
     * 添加管道对象
     */
    ClassTPlatform.prototype.addTubeGeometry = function( path, color , segments, radius, radius_segments) {
         
        var tube_path = new THREE.SplineCurve3(path);
        
        var geometry = new THREE.TubeGeometry(tube_path, segments, radius, radius_segments, false, false);
        var tube_material = new THREE.MeshBasicMaterial( { color: color, wireframe: true, wireframeLinewidth: .1 } );
        tube = new THREE.Mesh(geometry, tube_material);
        
        this.scene.add(tube);
        
    }
    
    ClassTPlatform.prototype.loadSystems = function(){
    	
    	if (this.systemList.length > 0){
    		
    		var itemSys = this.systemList.shift(),
				_self = this;
				
			this.loader.load( itemSys.model, function ( geometry ) {
				
				var position_x = itemSys.position[0],
		            position_y = itemSys.position[1],
		            position_z = itemSys.position[2],
		        	sys_color = itemSys.color;
	    		
		        
		        var vector = new THREE.Vector3(position_x,15000,position_z);
	        	vector.uid = itemSys.uid;
		        var rayCollisionObject = new THREE.SphereCollider(vector.clone(), 1000);
		        THREE.Collisions.colliders.push(rayCollisionObject);
		        
		        var fontNum = Math.ceil(itemSys.name.length / 2);
		        var fontArea = 600;

                var sprite = _self.createTip(60, itemSys.name, 0xff0000, "center");
                sprite.position.set(position_x,15000,position_z);
	            sprite.scale.x *= 12;
	            sprite.scale.y *= 12;
		        
		        for (var i = -fontNum * fontArea; i <= fontNum * fontArea; i += fontArea ){
		        	
		        	var v = vector.clone();
		        	v.x += i;
		        	v.uid = itemSys.uid;
		        	var rayCollisionObject = new THREE.SphereCollider(v, 1000);
		       		THREE.Collisions.colliders.push(rayCollisionObject);
		        }
		        
		        for (var i = -fontNum * fontArea; i <= fontNum * fontArea; i += fontArea ){
		        	
		        	var v = vector.clone();
		        	v.z += i;
		        	v.uid = itemSys.uid;
		        	var rayCollisionObject = new THREE.SphereCollider(v, 1000);
		       		THREE.Collisions.colliders.push(rayCollisionObject);
		        }
		        
		        sprite.opacity = 1;
		        sprite.visible = true;

		        _self.scene.add( sprite );
                
                var legend_color = Math.random() * 0xffffff;

                var legend = _self.createLegend(60, itemSys.name, sys_color, "center");
                legend.position.set(itemSys['legendPos'][0], itemSys['legendPos'][1], itemSys['legendPos'][2]);
                _self.scene.add( legend );

	    		//geometry.computeVertexNormals();

                var sample_storage_material =  [
                    [
                        new THREE.MeshNormalMaterial(),
                        new THREE.MeshLambertMaterial( { color: 0x101010, ambient: 0x101010, refractionRatio: 0.95, wireframe: false,transparent: true, opacity: 1, side:THREE.DoubleSide} ),
                        new THREE.MeshPhongMaterial( { color: 0x0c0c0c, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: 1 ,side:THREE.DoubleSide} ),
                    ],
                    [ 
                        new THREE.MeshPhongMaterial( { color: 0xf0f0f0, specular: sys_color, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: false} ),
                        new THREE.MeshPhongMaterial( { color: sys_color, specular: sys_color, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: true, } ),
                    ],
                    [ 
                        new THREE.MeshPhongMaterial( { color: sys_color, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: false} ),
                        new THREE.MeshPhongMaterial( { color: 0xf0f0f0, specular: 0xf0f0f0, combine: THREE.MultiplyOperation, side:THREE.FrontSide, transparent: true, opacity: .6, wireframe: true, } ),
                    ],
                    [
                        new THREE.MeshNormalMaterial( { color: 0xf0f0f0, ambient: 0xf0f0f0,  side:THREE.DoubleSide, wireframe: true, transparent: true, opacity: .5} ),
                        new THREE.MeshPhongMaterial( { color: 0x0c0c0c, specular:0x0c0c0c, combine: THREE.MultiplyOperation, transparent: true, opacity: .8,wireframe: false, } ),
                    ],
                    [
                        new THREE.MeshPhongMaterial( { color: sys_color, specular:0xff0000, combine: THREE.MultiplyOperation, transparent: true, opacity: .5,wireframe: true, } ),
                        new THREE.MeshPhongMaterial( { color: 0x0c0c0c, specular:0xff0000, combine: THREE.MultiplyOperation, transparent: true, opacity: .5,wireframe: false, } ),
                    ],
                    [                        

                        new THREE.MeshLambertMaterial( { color: sys_color, ambient: sys_color, opacity: 0.3, wireframe: false, transparent: true} ), 
                        new THREE.MeshBasicMaterial( { color: sys_color, transparent: true,  opacity: 0.6, wireframe: true} ) ,
                    ],
                    [
                        new THREE.MeshPhongMaterial( { color: 0xf0f0f0, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: .6,wireframe: true, } ),
                        new THREE.MeshPhongMaterial( { color: 0x0c0c0c, specular:0xf0f0f0, combine: THREE.MultiplyOperation, transparent: true, opacity: .3,wireframe: false, } ),
                    ]
                ][0];
	    		
		        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, sample_storage_material );
		        sample_storage1.position.set(position_x, position_y, position_z);
		        
		        if (itemSys.scale){
		        	sample_storage1.scale.set(itemSys.scale[0], itemSys.scale[1], itemSys.scale[2]);
		        }
		        
		        _self.scene.add( sample_storage1 );
		        
		        _self.loadSystems();

                if(_self.systemList.length == 0){
                    _self.loadFlag = false;
                }
		        
	    	});
    	}
    }


    // phi theta postion cameraRadius
    this.systempostion = [
        [30.19217602810724,177.28644206503995,{x: -92293.08033832442, y: 10000, z: 81751.69896181411},68953.5741706093],
        [22.14217179614412,-178.21004198786054,{x: 75726.0139231652, y: 10000, z: 3763.7160591677766},21810.200642532844],
        [52.03269501335967,-290.48911627583544,{x: 87375.86151213096, y: 10000, z: 75228.53853828872},21810.200642532844],
        [65.75493233237545,-589.1032510344268,{x: -90369.63922070514, y: 10000, z: 13135.096920418397},26894.34277746474],
        [18.85809523340525,-26.764242030155113,{x: -535.2870525924086, y: 10000, z: -4310.940418270439},90104.1040960272],
        [56.066923010437144,29.53897914072717 ,{x: -50116.20192481785, y: 10000, z: -2454.5516241290366},56300.70518174786],
        [66.59247215009833,-18.746553886048844 ,{x: 39150.17436525384, y: 10000, z: 6695.0673412269525},45147.571197215766],
        [81.97073469024004,-301.45031302717916,{x: -22907.433337096823, y: 10000, z: 71289.7012084349},49902.328316937346],
        [18.886159246302398,-214.68846763478297 ,{x: 55001.1421739656, y: 10000, z: 41464.61197519472},17862.99361238641],

        // 全景
        [58.493825627600586,-51.365235024779096,{x: -23111.17313828054, y: 10000, z: 76831.78418657498},200000]
    ]
	
    ClassTPlatform.prototype.runCamera = function(index){

        this.phi = this.systempostion[index][0];
        this.theta = this.systempostion[index][1];
        this.camera.target.position.x = this.systempostion[index][2].x;
        this.camera.target.position.y = this.systempostion[index][2].y;
        this.camera.target.position.z = this.systempostion[index][2].z;
        this.cameraRadius = this.systempostion[index][3];
        this.updateCamera();
        // console.info();
    }
    this.initClass();
}
