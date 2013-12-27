/**
 * @author whenlove
 */

function ClassTPlatform(settings){
    this.settings = settings || {};
     
    /*
     * 初始 类 相关数据
     */
    ClassTPlatform.prototype.initClass = function(){
        // 容纳webgl的dom对象
        this.containerId = this.settings.parentElementId;
        this.container = document.getElementById(this.containerId);
        // 中心点
        this.middlePoint = new THREE.Vector3(
            0, 10000, 0
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
        this.cameraRadius = 165500, // 这个能控制摄像机的高度，初始时可以调整
        this.smoothRadius = 9000, 
        
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
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 700000),
        //摄像机的lookat目标对象
        this.camera.target = new THREE.Object3D(); 
        
        // 投影对象，点击用的，也是固定用法
        this.projector = new THREE.Projector, 
        this.ray = new THREE.Ray(this.camera.position, null), 
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
        
        var plane_material = new THREE.MeshBasicMaterial( { color: 0x0088cc, wireframe: true, wireframeLinewidth: .1 } );
        var plane_geometry1 = new THREE.PlaneGeometry( 80000, 80000, 200, 200 );
        
        mesh1 = new THREE.Mesh( plane_geometry1, plane_material );
        mesh1.position = new THREE.Vector3(
            0,0,20000
        );
        mesh1.rotation.x = - Math.PI / 2;
        this.scene.add( mesh1 );
        //----->
        
        var plane_geometry2 = new THREE.PlaneGeometry( 80000, plane_size / 2, plane_num, plane_num/2 );
        mesh1 = new THREE.Mesh( plane_geometry2, plane_material );
        mesh1.position = new THREE.Vector3(
            0,plane_size/4,-plane_size/2
        );
        //mesh1.rotation.x = - Math.PI / 2;
        this.scene.add( mesh1 );
        
        
    }
    
    
    ClassTPlatform.prototype.loadChinaModel = function(geometryQuads){
        var vertexShader = document.getElementById( 'vertexShader' ).textContent;
        var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

        var attributesQuads = { center: { type: 'v4', boundTo: 'faceVertices', value: [] } };
        var valuesQuads = attributesQuads.center.value;

        this.setupAttributes( geometryQuads, valuesQuads );

        var materialQuads = new THREE.ShaderMaterial( { uniforms: {}, attributes: attributesQuads, vertexShader: vertexShader, fragmentShader: fragmentShader } );

        meshQuads = new THREE.Mesh( geometryQuads, materialQuads );
        meshQuads.position.x = 0;
        
        
        meshQuads.position = new THREE.Vector3(
            0,8000,-18000
        );
        meshQuads.scale.set( 1600, 1600, 120);
        //meshQuads.rotation.x = - Math.PI / 2;
        this.scene.add( meshQuads );
        
        
        var glowSpanTexture = THREE.ImageUtils.loadTexture('images/glowspan.png');
        var cylinderMaterial = new THREE.MeshBasicMaterial({
            map: glowSpanTexture,
            blending: THREE.AdditiveBlending,
            transparent: true,
            //depthTest: true,
            depthWrite: false,
            wireframe: true,
            opacity:1,
        })
        
        
          
        
        //
        var planeGeometry = new THREE.CircleGeometry( 400, 50 );
        var planeMaterial = new THREE.MeshBasicMaterial( { color: this.sys_1_color, side:THREE.DoubleSide, opacity: 1, transparent: false } );
        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position = this.sys_1_position;
        //this.scene.add(plane)
        
        var planeGeometry = new THREE.CircleGeometry( 400, 50 );
        var planeMaterial = new THREE.MeshBasicMaterial( { color: this.sys_2_color, side:THREE.DoubleSide, opacity: 1, transparent: false } );
        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position = this.sys_2_position;
        //this.scene.add(plane)
        
        var planeGeometry = new THREE.CircleGeometry( 400, 50 );
        var planeMaterial = new THREE.MeshBasicMaterial( { color: this.sys_3_color, side:THREE.DoubleSide, opacity: 1, transparent: false } );
        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position = this.sys_3_position;
        //this.scene.add(plane)
        
        var planeGeometry = new THREE.CircleGeometry( 400, 50 );
        var planeMaterial = new THREE.MeshBasicMaterial( { color: this.sys_4_color, side:THREE.DoubleSide, opacity: 1, transparent: false } );
        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position = this.sys_4_position;
        //this.scene.add(plane)
        
        
        
        /*
        var sprite = THREE.ImageUtils.loadTexture( "images/ripple.png" );
        particle_geometry1 = new THREE.Geometry();
        attributes = {
            size: { type: 'f', value: [] },
            ca:   { type: 'c', value: [] }
        };
        uniforms = {
            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            texture:   { type: "t", value: sprite },
        };
        uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;
        var shaderMaterial = new THREE.ShaderMaterial( {
            uniforms:       uniforms,
            attributes:     attributes,
            vertexShader:   document.getElementById( 'particlevertexshader' ).textContent,
            fragmentShader: document.getElementById( 'particlefragmentshader' ).textContent,
            depthTest:      true,
            depthWrite:     false,
            transparent:    true,
        });
        var particle_size1 = attributes.size.value;
        var particle_colors1 = attributes.ca.value;
        */
        
        
        
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
            
            
            var cylinderGeo = new THREE.CylinderGeometry( 100, 0, 0, 30, 0 );
            var matrix = new THREE.Matrix4();
            matrix.scale( new THREE.Vector3(1,1,1) );
            cylinderGeo.applyMatrix( matrix );
            var mesh = new THREE.Mesh( cylinderGeo, cylinderMaterial );
            mesh.material.map.wrapS = THREE.RepeatWrapping;
            mesh.material.map.wrapT = THREE.RepeatWrapping;
            mesh.material.map.needsUpdate = true;
            mesh.material.map.onUpdate = function(){
                this.offset.y -= 0.001;
                this.needsUpdate = true;
            }
            var updatePlaneMaterial = function(){
                this.material.opacity = 1;
                this.visible = true;
            }
            mesh.position = new THREE.Vector3(
                cx, cy , -17740
            );
            //console.info(data_list[i][0], cx, cy);
            mesh.rotation.x = - Math.PI / 2;
            mesh.update = updatePlaneMaterial;
            mesh.visible = true;
            this.scene.add( mesh );
            
            
            //var sprite_map = THREE.ImageUtils.loadTexture( "images/circle.png" );
            
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
        
        //for( var f = 0; f < this.line_li.length; f ++ ) {
            //this.cartoon_line_dic[f]=false;
        //}
        
    }
    
    ClassTPlatform.prototype.setupAttributes = function( geometry, values ) {

        for( var f = 0; f < geometry.faces.length; f ++ ) {

            var face = geometry.faces[ f ];

            if ( face instanceof THREE.Face3 ) {

                values[ f ] = [ new THREE.Vector4( 1, 0, 0, 0 ), new THREE.Vector4( 0, 1, 0, 0 ), new THREE.Vector4( 0, 0, 1, 0 ) ];

            } else {
                //console.info(face.normal.z);
                if(face.normal.z != 0){
                    values[ f ] = [ new THREE.Vector4( 1, 0, 0, 0 ), new THREE.Vector4( 1, 1, 0, 0 ), new THREE.Vector4( 0, 1, 0, 0 ), new THREE.Vector4( 0, 0, 0, 0 ) ];
                }
                else{
                    values[ f ] = [ new THREE.Vector4( 1, 0, 0, 1 ), new THREE.Vector4( 1, 1, 0, 1 ), new THREE.Vector4( 0, 1, 0, 1 ), new THREE.Vector4( 0, 0, 0, 1 ) ];
                }
                
            }

        }

    }
    
    ClassTPlatform.prototype.loadTPlatformObject = function(){
        
        var sys_li = [
            ['恶意代码分析系统',           0,  0, 45000, "60"],
            ['蜜网系统',                   30000, 0, 45000, "60"],
            ['网站监测系统',               0, 0 , 2000, "60"],
            ['轻载扫描系统',               -25000, 0, 2000,"60"],
            ['路由监测系统',               26000,  0, 2000,    "60"],
            ['流监测系统',                 26000,      0, 20000, "60"],
            ['域名监测系统',               -25000, 0, 20000, "60"],
            ['协同联动系统',               0,      0, 20000, "60"],
            ['报文监测和恶意代码捕获系统',  -20000, 0, 45000, "60"],
        ]
        
        for(i=0; i < sys_li.length; i++){
            //this.loadSysObject(sys_li[i][1], sys_li[i][2], sys_li[i][3]);
            
            var sprite = this.createTip(2000, 400, sys_li[i][4], sys_li[i][0], 0xff0000, "right");
            sprite.position.set(sys_li[i][1],sys_li[i][2] + 6000,sys_li[i][3]);
            sprite.scale.set( 8000, 1600, 1 );
            sprite.opacity = 1;
            sprite.visible = true;
            this.scene.add( sprite );
        }
        
    }
    
    ClassTPlatform.prototype.loadSysObject = function(position_x, position_y, position_z){
        //var sample_storage_lines_geometry = this.buildLineGeometry(7600, 800, 3600);
        //sample_storage_lines_geometry.computeLineDistances();
        //var sample_storage_lines = new THREE.Line( sample_storage_lines_geometry, new THREE.LineDashedMaterial( { color: 0x00EE00, dashSize: 10, gapSize: 10} ), THREE.LinePieces );
        //sample_storage_lines.position.set( position_x, position_y, position_z);
        //this.scene.add(sample_storage_lines);
        
        var sys_material = [ 
            new THREE.MeshLambertMaterial( { color: 0x00EE00, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: 0x00EE00, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        
        // 底座
        var sys_geometry = new THREE.CubeGeometry(4000, 200, 4000);
        var sys_obj = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj.position.set( position_x, position_y + 550, position_z );
        this.scene.add( sys_obj );
        
        // 小
        var sys_geometry = new THREE.CubeGeometry(400, 1400, 700);
        var sys_obj1 = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj1.position.set( position_x - 400, position_y + 650 + 700, position_z - 800);
        this.scene.add( sys_obj1 );
        
        sys_obj2 = sys_obj1.clone();
        sys_obj2.position.set( position_x - 1200, position_y + 650 + 700, position_z - 800);
        this.scene.add( sys_obj2 );
        
        sys_obj3 = sys_obj1.clone();
        sys_obj3.position.set( position_x  + 400, position_y + 650 + 700, position_z - 800);
        this.scene.add( sys_obj3 );
        
        sys_obj4 = sys_obj1.clone();
        sys_obj4.position.set( position_x + 1200, position_y + 650 + 700, position_z - 800);
        this.scene.add( sys_obj4 );
        
        sys_obj5 = sys_obj1.clone();
        sys_obj5.position.set( position_x - 400, position_y + 650 + 700, position_z + 800);
        this.scene.add( sys_obj5 );
        
        sys_obj6 = sys_obj1.clone();
        sys_obj6.position.set( position_x - 1200, position_y + 650 + 700, position_z + 800);
        this.scene.add( sys_obj6 );
        
        sys_obj7 = sys_obj1.clone();
        sys_obj7.position.set( position_x  + 400, position_y + 650 + 700, position_z + 800);
        this.scene.add( sys_obj7 );
        
        sys_obj8 = sys_obj1.clone();
        sys_obj8.position.set( position_x + 1200, position_y + 650 + 700, position_z + 800);
        this.scene.add( sys_obj8 );
        
        // 顶
        var sys_material = [ 
            new THREE.MeshLambertMaterial( { color: 0xffff00, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true,  opacity: 0.8, side: THREE.DoubleSide } ) 
        ]
        
        var sys_geometry = new THREE.CubeGeometry(1000, 200, 1000);
        var sys_obj = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj.position.set( position_x, position_y + 650 + 700 + 2500, position_z);
        this.scene.add( sys_obj );
        
        // 线
        var lines_geometry = new THREE.Geometry();
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 400, position_y + 650 + 1400, position_z + 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 1200, position_y + 650 + 1400, position_z + 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x  + 400, position_y + 650 + 1400, position_z + 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200, position_y + 650 + 1400, position_z + 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 400, position_y + 650 + 1400, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 1200, position_y + 650 + 1400, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x  + 400, position_y + 650 + 1400, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 2400, position_z) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200, position_y + 650 + 1400, position_z - 800 ) );
        
        //sample_storage_lines_geometry.computeLineDistances();
        var sys_lines = new THREE.Line( 
            lines_geometry, 
            new THREE.LineDashedMaterial( { color: 0xffff00, dashSize: 10, gapSize: 10} )
        );
        //sys_lines.position.set( position_x, position_y, position_z);
        this.scene.add(sys_lines);
    }
    
    /*
     * 初始管道和移动对象
     */
    ClassTPlatform.prototype.initTubeAndMoveObjects = function(){
        console.info('initMoveObjects');
        sample_map = THREE.ImageUtils.loadTexture( "textures/sample.png" );
        data_map = THREE.ImageUtils.loadTexture( "textures/data.png" );
        
        /*
         * 数据汇聚到系统的管道
         */
        var sample_storage_obj_list = [
            // 路由监测系统
            [[[6900, 16100 , -10000], [6900, 16100 , -8000]], 3 ],
            [[[6900, 16100 , -8000], [6900, 15100 , -7000]], 3 ],
            [[[6900, 15100 , -7000], [6900, 5000 , -7000]], 3 ],
            [[[6900, 5000 , -7000], [6900, 4950, 2200]], 3 ],
            [[[6900, 4950, 2200], [25500, 4950, 2200]], 3 ],
            [[[25500, 4950, 2200], [25500, 3950, 2200]], 3 ],
            
            // 流监测系统
            [[[5400, 9800 , -10000], [5400, 9800 , -8000]], 3 ],
            [[[5400, 9800 , -8000], [5400, 8800 , -7000]], 3 ],
            [[[5400, 8800 , -7000], [5400, 4950 , -7000]], 3 ],
            [[[5400, 4950 , -7000], [5400, 4950 , 0]], 3 ],
            [[[5400, 4950 , 0], [5400, 4950 , 20000]], 3 ],
            [[[5400, 4950 , 20000], [26000, 4950 , 20000]], 3 ],
            [[[26000, 4950 , 20000], [26000, 3950 , 20000]], 3 ],
            
            // 蜜网系统
            [[[4170, 13400 , -10000], [4170, 13400 , -8000]], 3 ],
            [[[4170, 13400 , -8000], [4170, 12400 , -7000]], 3 ],
            [[[4170, 12400 , -7000], [4170, 4950 , -7000]], 3 ],
            [[[4170, 4950 , -7000], [4170, 4950 , 30000]], 3 ],
            [[[4170, 4950 , 30000], [30000, 4950 , 30000]], 3 ],
            [[[30000, 4950 , 30000], [30000, 4950 , 45000]], 3 ],
            [[[30000, 4950 , 45000], [30000, 3950 , 45000]], 3 ],
            
            
            // 网站监测系统
            [[[400, 8400 , -10000], [400, 8400 , -8000]], 4 ],
            [[[400, 8400 , -8000], [400, 7400 , -7000]], 4 ],
            [[[400, 7400 , -7000], [400, 4950 , -7000]], 4 ],
            [[[400, 4950 , -7000], [0, 4950 , -7000]], 4 ],
            [[[0, 4950 , -7000], [0, 4950 , 2000]], 4 ],
            [[[0, 4950 , 2000], [0, 3950 , 2000]], 4 ],
            
            
            // 报文监测和恶意代码捕获系统
            [[[-3000, 9640 , -10000], [-3000, 9640 , -8000]], 3 ],
            [[[-3000, 9640 , -8000], [-3000, 8640 , -7000]], 3 ],
            [[[-3000, 8640 , -7000], [-3000, 4950 , -7000]], 3 ],
            [[[-3000, 4950 , -7000], [-3000, 4950 , -4000]], 3 ],
            [[[-3000, 4950 , -4000], [-10000, 4950 , -4000]], 3 ],
            [[[-10000, 4950 , -4000], [-10000, 4950 , 45000]], 3 ],
            [[[-10000, 4950 , 45000], [-20000, 4950 , 45000]], 3 ],
            [[[-20000, 4950 , 45000], [-20000, 3950 , 45000]], 3 ],
            
            // 域名监测系统
            [[[3500, 6800 , -10000], [3500, 6800 , -8000]], 4 ],
            [[[3500, 6800 , -8000], [3500, 5800 , -7000]], 4 ],
            [[[3500, 5800 , -7000], [3500, 5800 , -9000]], 4 ],
            [[[3500, 5800 , -9000], [-7000, 5800 , -9000]], 4 ],
            [[[-7000, 5800 , -9000], [-7000, 5800 , 0]], 4 ],
            [[[-7000, 5800 , 0], [-16000, 5800 , 0]], 4 ],
            [[[-16000, 5800 , 0], [-16000, 4950 , 0]], 4 ],
            [[[-16000, 4950 , 0], [-16000, 4950 , 20000]], 4 ],
            [[[-16000, 4950 , 20000], [-25000, 4950 , 20000]], 4 ],
            [[[-25000, 4950 , 20000], [-25000, 3950 , 20000]], 4 ],
            
            // 轻载扫描系统
            [[[-5000, 13500 , -10000], [-5000, 13500 , -8000]], 3 ],
            [[[-5000, 13500 , -8000], [-5000, 12500 , -7000]], 3 ],
            [[[-5000, 12500 , -7000], [-5000, 4950 , -7000]], 3 ],
            [[[-5000, 4950 , -7000], [-17000, 4950 , -7000]], 3 ],
            [[[-17000, 4950 , -7000], [-17000, 4950 , 2000]], 3 ],
            [[[-17000, 4950 , 2000], [-25000, 4950 , 2000]], 3 ],
            [[[-25000, 4950 , 2000], [-25000, 3950 , 2000]], 3 ],
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
            // 网站监测系统 -> 协同联动
            [[[0, 1500 , 5000], [0, 1500, 18000]], 4 ],
            
            // 轻载扫描系统 -> 协同联动
            [[[-19000, 1500, 2000], [-17000, 1500, 2000]], 4 ],
            [[[-17000, 1500, 2000], [-1500, 1500, 18500]], 4 ],
            
            
            // 域名监测系统 -> 协同联动
            [[[-21000, 1500, 20000], [-2000, 1500 , 20000]], 4 ],
            
            // 路由监测系统 -> 协同联动
            [[[20000,  1500, 2000], [1500,  1500, 18500]], 4 ],
            [[[22000,  1500, 2000], [20000,  1500, 2000]], 4 ],
            
            // 流监测系统 -> 协同联动
            [[[22000,  1500, 20000], [2000,  1500, 20000]], 4 ],
            
            // 蜜网系统 -> 协同联动
            [[[30000,  1500, 39000], [30000,  1500, 33500]], 4 ],
            [[[30000,  1500, 33500], [13500,  1500, 33500]], 4 ],
            [[[13500,  1500, 33500], [1500,  1500, 21500]], 4 ],

            // 恶意代码分析系统 -> 协同联动
            [[[0,  1500, 36000], [0,  1500, 22000]], 4 ],
            
            // 报文监测和恶意代码捕获系统 -> 协同联动
            [[[-25000,  1500, 37000], [-25000,  1500, 31500]], 4 ],
            [[[-25000,  1500, 31500], [-11500,  1500, 31500]], 4 ],
            [[[-11500,  1500, 31500], [-1500,  1500, 21500]], 4 ],
            
            // 蜜网系统 -> 恶意代码分析系统
            [[[30000,  1500, 51000], [30000,  1500, 56000]], 4 ],
            [[[30000,  1500, 56000], [10000,  1500, 56000]], 4 ],
            [[[10000,  1500, 56000], [10000,  1500, 53000]], 4 ],
            
            // 报文监测和恶意代码捕获系统 -> 恶意代码分析系统
            [[[-20000,  1500, 53000], [-20000,  1500, 56000]], 4 ],
            [[[-20000,  1500, 56000], [5000,  1500, 56000]], 4 ],
            [[[5000,  1500, 56000], [5000,  1500, 53000]], 4 ],
            
        ];
        
        var sample_storage_obj_color = 0xffffff,
            sample_storage_obj_map = data_map,
            sample_storage_obj_num = 6,
            sample_storage_obj_interval = 30;
        var sample_storage_tube_color = 0x00ff00,
            sample_storage_tube_segments = 40,
            sample_storage_tube_radius = 60,
            sample_storage_tube_radius_segments = 4;
        
        this.createTubeAndMoveObjects(sample_storage_obj_list, sample_storage_obj_color, sample_storage_obj_map, sample_storage_obj_num, sample_storage_obj_interval, 
            sample_storage_tube_color, sample_storage_tube_segments, sample_storage_tube_radius, sample_storage_tube_radius_segments);
        
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
        // 镜头运动
        this.flagThetaNumber > 100 && this.StartCartoon();
        if(this.flagThetaNumber < 31){
            this.cameraRadius = this.cameraRadius -5000;
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
        //this.thetaDiffDiff = 0
        
        // 以下为控制场景加载后摄像机所停留的角度和位置，无需关注，starmap的。
        this.smoothRadius > this.cameraRadius - .005 && this.smoothRadius < this.cameraRadius + .005 && (this.thetaDiffDiff = 0)
        //console.info(this.smoothRadius > this.cameraRadius - .005 && this.smoothRadius < this.cameraRadius + .005 && (this.thetaDiffDiff = 0));
        //console.info(this.thetaDiffDiff);
        // if(this.smoothRadius > this.cameraRadius - .005){
            // this.smoothRadius < this.cameraRadius + .005;
        // }
        // else{
            // this.thetaDiffDiff = 0;
        // }
        
        
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
            console.info('renderWebgl');
            //this.loadCartoonData();
            //this.getData();
            this.loadTPlatformObject();
            
            this.loadBaowenSys();
            this.loadEyiSys();
            
            this.initTubeAndMoveObjects();
            
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
    
    ClassTPlatform.prototype.onMouseWheel = function(a) {
        //console.info('onMouseWheel');
        a.preventDefault();
        var b = 0;
        a || (a = window.event), 
        a.wheelDeltaY != undefined && !isNaN(a.wheelDeltaY) ? b = a.wheelDeltaY : a.wheelDelta ? a.wheelDelta > 0 ? b = 220 : a.wheelDelta < 0 && (b = -220) : a.detail && (a.detail < 0 ? b = 220 : a.detail > 0 && (b = -220)), 
        b > 0 ? this.cameraRadius -= 2 * b + this.cameraRadius / 10 : this.cameraRadius += 2 * b * -1 + this.cameraRadius / 10; 
        this.cameraRadius < 1 && (this.cameraRadius = 1);
        //最大允许放大的倍数120
        //this.cameraRadius < 120 * this.selectedSize ? this.cameraRadius = 120 * this.selectedSize : this.cameraRadius > 8e3 && (this.cameraRadius = 8e3); 
        this.cameraRadius < 220  ? this.cameraRadius = 220 : this.cameraRadius > 8e3*4 && (this.cameraRadius = 8e3*4); 
        a.returnValue = !1, 
        a.cancelBubble = !0;
        //this.setRulerValue();
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
            c.cross(this.camera.up, b), 
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
        //console.info('onMouseUp');
        a.preventDefault(), 
        this.mouseMoveHandler && (document.removeEventListener("mousemove", this.mouseMoveHandler, !1), this.mouseMoveHandler = null), 
        this.onMouseUpHandler && window.removeEventListener("mouseup", this.onMouseUpHandler, !1);
        this.doAnimation = !0;
        //console.info(this.doAnimation);
        //var b, c, d, e = -1;
        //b = this.mouseDownPoint.x - a.clientX, 
        //c = this.mouseDownPoint.y - a.clientY;
        //var f = b * b + c * c;
        //if (f > 9){
        //    return !1;
        //}
        //var g, h, i, j, k = $("#" + this.containerId).offset();
        //g = a.pageX - k.left, h = a.pageY - k.top;
        //g = g / window.innerWidth * 2 - 1, 
        //h = -(h / window.innerHeight) * 2 + 1;
        //var l = new THREE.Vector3(g, h, .5), 
        //m = this.projector.unprojectVector(l, this.camera);
        //this.ray.direction = m.subSelf(this.camera.position).normalize();
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
                　 　     console.info(keyName);
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
            console.info(monitor_data[0], monitor_location['cx'], monitor_location['cy']);
            
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
    
    ClassTPlatform.prototype.createTip = function( width, height, font_size, para, color, text_align) {
    
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        var tipHight = 40;
        var alpha = .3;
        var offsetX = canvas.width / 2 ;
        
        var context = canvas.getContext('2d');
        
        context.globalAlpha = 1;
        context.font = "bold " + font_size + "pt 微软雅黑";
        context.textAlign = text_align;
        context.textBaseline = "middle";
        context.fillStyle = "#FFFFFF";
        context.fillText(para, canvas.width / 2 , canvas.height / 2);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
    
        var textMesh = new THREE.Sprite({ map: texture, useScreenCoordinates: false, depthTest: false, transparent: true } );
        //textMesh.position.x = canvas.width / 2;
        //textMesh.material.opacity = 0;
        return textMesh;
        
    }
    
    ClassTPlatform.prototype.setSysInfo = function( flag ) {
        for(i=0; i < this.sys_info.length; i++){
            this.sys_info[i].visible = flag;
        }
    }
    
    ClassTPlatform.prototype.createMoveObjects = function(startPosition, endPosition, color, map, start_num){
        
        var distance = startPosition.distanceTo(endPosition);
        
        
        // 对象1
        var sprite = new THREE.Sprite({ 
            color: color, 
            useScreenCoordinates: false
            /*
            blending : THREE.AdditiveBlending,
            blendSrc: THREE.SrcColorFactor, 
            blendDst: THREE.SrcColorFactor, 
            blendEquation: THREE.AddEquation*/
        });
        
        sprite.map = map
        sprite.position = startPosition;
        sprite.opacity = 1;
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

        
        geometry.computeVertexNormals();
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
            ['报文监测和恶意代码捕获系统', this.sys_1_position, 2200, 200, "60"],
            ['蜜网系统', this.sys_2_position, 1200, 200, "60"],
            ['流监测系统', this.sys_3_position, 1200, 200, "60"],
            ['网站监测系统', this.sys_4_position, 1200, 200, "60"],
            ['域名监测系统', this.sys_5_position, 1200, 200, "60"],
            ['路由监测系统', this.sys_6_position, 1200, 200, "60"],
            ['轻载扫描系统', this.sys_7_position, 1200, 200, "60"],
        ]
        for(i=0; i < sys_text_li.length; i++){
            var sprite = this.createTip(sys_text_li[i][2],sys_text_li[i][3],sys_text_li[i][4],sys_text_li[i][0] ,0xff0000, "right");
            //console.info(sys_text_li[i][1]);
            sprite.position = sys_text_li[i][1];
            sprite.scale.set( 4000, 800, 1 );
            sprite.opacity = 1;
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
    
    ClassTPlatform.prototype.loadQingzaiSys = function(geometry){
        geometry.computeVertexNormals();
        var sys_color = 0x00ff00;
        
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, sample_storage_material );
        sample_storage1.position.set(-25000,  1000, 2000);
        sample_storage1.scale.set( 1000, 500, 1000 );
        this.scene.add( sample_storage1 );
        
        
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 1, transparent: false, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 1, side: THREE.DoubleSide } ) 
        ]
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, sample_storage_material );
        sample_storage1.position.set(30000,  1000, 45000);
        sample_storage1.scale.set( 1000, 500, 1000 );
        sample_storage1.rotation.y = Math.PI / 2;
        this.scene.add( sample_storage1 );
    }
    
    ClassTPlatform.prototype.loadYumingSys = function(geometry){
        var sys_color = 0x00ff00;
        
        geometry.computeVertexNormals();
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, sample_storage_material );
        sample_storage1.position.set(-25000, 1000, 20000);
        sample_storage1.scale.set( 1000, 200, 1000 );
        this.scene.add( sample_storage1 );
    }
    
    ClassTPlatform.prototype.loadBaowenSys = function(){
        var sys_li = [
            [-30000,  0, 40000, ],
            [-25000,  0, 40000, ],
            [-30000,  0, 45000, ],
            [-25000,  0, 45000, ],
            [-30000,  0, 50000, ],
            [-25000,  0, 50000, ],
            
            [-20000,  0, 40000, ],
            [-15000,  0, 40000, ],
            [-20000,  0, 45000, ],
            [-15000,  0, 45000, ],
            [-20000,  0, 50000, ],
            [-15000,  0, 50000, ],
        ]
        
        for(i=0; i < sys_li.length; i++){
            this.loadSysObject(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
        }
    }
    
    ClassTPlatform.prototype.loadEyiSys = function(){
        var sys_li = [
            [-5000,  0, 40000, ],
            [0,  0, 40000, ],
            [-5000,  0, 45000, ],
            [0,  0, 45000, ],
            [-5000,  0, 50000, ],
            [0,  0, 50000, ],
            
            [10000,  0, 40000, ],
            [5000,  0, 40000, ],
            [10000,  0, 45000, ],
            [5000,  0, 45000, ],
            [10000,  0, 50000, ],
            [5000,  0, 50000, ],
            
            [20000,  0, 40000, ],
            [15000,  0, 40000, ],
            [20000,  0, 45000, ],
            [15000,  0, 45000, ],
            [20000,  0, 50000, ],
            [15000,  0, 50000, ],
        ]
        
        for(i=0; i < sys_li.length; i++){
            this.loadSysObject(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
        }
    }
    
    ClassTPlatform.prototype.loadMiwangSys = function(geometry){
        geometry.computeVertexNormals();
        var tube_material = new THREE.MeshBasicMaterial( { color: this.sys_4_color, opacity: 1, transparent: true , wireframe: true} );
        
        var sys_li = [
            [30000,  0, 40000, ],
            [35000,  0, 40000, ],
            [30000,  0, 45000, ],
            [35000,  0, 45000, ],
            [30000,  0, 50000, ],
            [35000,  0, 50000, ],
        ]
        
        for(i=0; i < sys_li.length; i++){
            var sample_storage1 = new THREE.Mesh( 
                geometry, 
                tube_material
            );
            sample_storage1.position.set(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
            sample_storage1.scale.set( 300, 300, 300 );
            this.scene.add( sample_storage1 );
        }
    }
    
    ClassTPlatform.prototype.loadLiuSys = function(geometry){
        //流监测系统
        var position_x = 26000,
            position_y = 1000,
            position_z = 20000;
        var sys_color = 0x00ff00;
        geometry.computeVertexNormals();
        var tube_material = new THREE.MeshBasicMaterial( { color: sys_color, opacity: 1, transparent: true , wireframe: true} );
        
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        
        var sys_li = [
            [position_x + 3000,  position_y, position_z + 2000, ],
            [position_x - 500,  position_y, position_z + 2000, ],
            [position_x + 3000,  position_y, position_z - 2000, ],
            [position_x - 500,  position_y, position_z - 2000, ],
        ]
        
        var geometry_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        for(i=0; i < sys_li.length; i++){
            // var sample_storage1 = new THREE.Mesh( 
                // geometry, 
                // tube_material
            // );
            var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, geometry_material );
            sample_storage1.position.set(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
            sample_storage1.scale.set( 200, 250, 200 );
            this.scene.add( sample_storage1 );
        }
        
        var sample_storage_lines_geometry = this.buildLineGeometry(9000, 1400, 8000);
        sample_storage_lines_geometry.computeLineDistances();
        var sample_storage_lines = new THREE.Line( sample_storage_lines_geometry, new THREE.LineDashedMaterial( { color: sys_color, dashSize: 10, gapSize: 10} ), THREE.LinePieces );
        sample_storage_lines.position.set( position_x, position_y + 500, position_z);
        //this.scene.add(sample_storage_lines);
        
        // 底座
        var sample_storage_geometry = new THREE.CubeGeometry(9400, 200, 8400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y - 350, position_z );
        this.scene.add( sample_storage1 );
        
        // 前
        var sample_storage_geometry = new THREE.CubeGeometry(500, 1000, 3000);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 3500, position_y + 500, position_z );
        this.scene.add( sample_storage1 );
        
        //小柱
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200,  position_y + 600, position_z + 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z - 1000 );
       this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z  + 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z - 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200,  position_y + 600, position_z + 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z - 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z  + 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z - 3000 );
        this.scene.add( sample_storage1 );
        
        // 顶
        var sys_material = [ 
            new THREE.MeshLambertMaterial( { color: 0xffff00, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true,  opacity: 0.8, side: THREE.DoubleSide } ) 
        ]
        
        var sys_geometry = new THREE.CubeGeometry(2000, 200, 2000);
        var sys_obj = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj.position.set( position_x - 500, position_y + 650 + 700 + 1500, position_z + 200);
        this.scene.add( sys_obj );
        
        // 线
        var lines_geometry = new THREE.Geometry();
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z + 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z - 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z + 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z - 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z + 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z + 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z - 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z - 3000 ) );
        
        var sys_lines = new THREE.Line( 
            lines_geometry, 
            new THREE.LineDashedMaterial( { color: 0xffff00, dashSize: 10, gapSize: 10} )
        );
        this.scene.add(sys_lines);
    }
    
    ClassTPlatform.prototype.loadLuyouSys = function(geometry){
        //路由监测系统
        var position_x = 26000,
            position_y = 1000,
            position_z = 2000;
        var sys_color = 0x990066;
        geometry.computeVertexNormals();
        var tube_material = new THREE.MeshBasicMaterial( { color: sys_color, opacity: 1, transparent: true , wireframe: true} );
        
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        
        var sys_li = [
            [position_x + 3000,  position_y, position_z + 2000, ],
            [position_x - 500,  position_y, position_z + 2000, ],
            [position_x + 3000,  position_y, position_z - 2000, ],
            [position_x - 500,  position_y, position_z - 2000, ],
        ]
        
        for(i=0; i < sys_li.length; i++){
            var sample_storage1 = new THREE.Mesh( 
                geometry, 
                tube_material
            );
            sample_storage1.position.set(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
            sample_storage1.scale.set( 200, 250, 200 );
            this.scene.add( sample_storage1 );
        }
        
        var sample_storage_lines_geometry = this.buildLineGeometry(9000, 1400, 8000);
        sample_storage_lines_geometry.computeLineDistances();
        var sample_storage_lines = new THREE.Line( sample_storage_lines_geometry, new THREE.LineDashedMaterial( { color: sys_color, dashSize: 10, gapSize: 10} ), THREE.LinePieces );
        sample_storage_lines.position.set( position_x, position_y + 500, position_z);
        this.scene.add(sample_storage_lines);
        
        // 底座
        var sample_storage_geometry = new THREE.CubeGeometry(9400, 200, 8400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y - 350, position_z );
        this.scene.add( sample_storage1 );
        
        // 前
        var sample_storage_geometry = new THREE.CubeGeometry(500, 1000, 3000);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 3500, position_y + 500, position_z );
        this.scene.add( sample_storage1 );
        
        //小柱
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200,  position_y + 600, position_z + 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z - 1000 );
       this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z  + 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 1200, position_y + 600, position_z - 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200,  position_y + 600, position_z + 3000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z - 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z  + 1000 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 2200, position_y + 600, position_z - 3000 );
        this.scene.add( sample_storage1 );
        
        // 顶
        var sys_material = [ 
            new THREE.MeshLambertMaterial( { color: 0xffff00, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true,  opacity: 0.8, side: THREE.DoubleSide } ) 
        ]
        
        var sys_geometry = new THREE.CubeGeometry(2000, 200, 2000);
        var sys_obj = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj.position.set( position_x - 500, position_y + 650 + 700 + 1500, position_z + 200);
        this.scene.add( sys_obj );
        
        // 线
        var lines_geometry = new THREE.Geometry();
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z + 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z - 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z + 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1200,  position_y + 1600, position_z - 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z + 3000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z + 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z - 1000 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 500, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 2200,  position_y + 1600, position_z - 3000 ) );
        
        var sys_lines = new THREE.Line( 
            lines_geometry, 
            new THREE.LineDashedMaterial( { color: 0xffff00, dashSize: 10, gapSize: 10} )
        );
        this.scene.add(sys_lines);
    }
    
    ClassTPlatform.prototype.loadWangzhanSys = function(geometry){
        //网站监测系统
        var position_x = 0,
            position_y = 1000,
            position_z = 2000;
        var sys_color = 0x0000ff;
        
        geometry.computeVertexNormals();
        var tube_material = new THREE.MeshBasicMaterial( { color: sys_color, opacity: 1, transparent: true , wireframe: false} );
        var geometry_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.6, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.5, side: THREE.DoubleSide } ) 
        ]
        
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        
        var sys_li = [
            [position_x - 4500,  position_y, position_z - 2000, ],
            [position_x + 1500,  position_y, position_z - 2000, ],
            [position_x - 1500,  position_y, position_z - 2000, ],
            [position_x + 4500,  position_y, position_z - 2000, ],
            [position_x - 4500,  position_y, position_z + 500 ],
            [position_x + 1500,  position_y, position_z + 500 ],
            [position_x - 1500,  position_y, position_z + 500 ],
            [position_x + 4500,  position_y, position_z + 500 ],
        ]
        
        for(i=0; i < sys_li.length; i++){
            
            var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, geometry_material );
            sample_storage1.position.set(sys_li[i][0], sys_li[i][1], sys_li[i][2]);
            sample_storage1.scale.set( 200, 200, 200 );
            this.scene.add( sample_storage1 );
            
            var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
            var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
            sample_storage1.position.set( sys_li[i][0], sys_li[i][1] + 600, sys_li[i][2] + 1200 );
            this.scene.add( sample_storage1 );
        }
        
        var sample_storage_lines_geometry = this.buildLineGeometry(14000, 1400, 8000);
        sample_storage_lines_geometry.computeLineDistances();
        var sample_storage_lines = new THREE.Line( sample_storage_lines_geometry, new THREE.LineDashedMaterial( { color: sys_color, dashSize: 10, gapSize: 10} ), THREE.LinePieces );
        sample_storage_lines.position.set( position_x, position_y + 500, position_z);
        this.scene.add(sample_storage_lines);
        
        
        
        // 底座
        var sample_storage_geometry = new THREE.CubeGeometry(14400, 200, 8400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y - 350, position_z );
        this.scene.add( sample_storage1 );
        
        
        // 前
        var sample_storage_geometry = new THREE.CubeGeometry(4000, 1000, 500);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y + 500, position_z + 2800 );
        this.scene.add( sample_storage1 );
        
        //小柱
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y + 600, position_z - 800 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 3000, position_y + 600, position_z - 800 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 3000, position_y + 600, position_z - 800 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x, position_y + 600, position_z + 1700 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x + 3000, position_y + 600, position_z + 1700 );
        this.scene.add( sample_storage1 );
        
        var sample_storage_geometry = new THREE.CubeGeometry(400, 2000, 400);
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( sample_storage_geometry, sample_storage_material );
        sample_storage1.position.set( position_x - 3000, position_y + 600, position_z + 1700 );
        this.scene.add( sample_storage1 );
        
        // 顶
        var sys_material = [ 
            new THREE.MeshLambertMaterial( { color: 0xffff00, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true,  opacity: 0.8, side: THREE.DoubleSide } ) 
        ]
        
        var sys_geometry = new THREE.CubeGeometry(2000, 200, 2000);
        var sys_obj = THREE.SceneUtils.createMultiMaterialObject( sys_geometry, sys_material );
        sys_obj.position.set( position_x, position_y + 650 + 700 + 1500, position_z + 200);
        this.scene.add( sys_obj );
        
        // 线
        var lines_geometry = new THREE.Geometry();
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 600 + 1000, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 3000, position_y + 600 + 1000, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 3000, position_y + 600 + 1000, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 1500, position_y + 600 + 1000, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1500, position_y + 600 + 1000, position_z - 800 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 600 + 1000, position_z + 1700 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 3000, position_y + 600 + 1000, position_z + 1700 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 3000, position_y + 600 + 1000, position_z + 1700 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x + 1500, position_y + 600 + 1000, position_z + 1700 ) );
        
        lines_geometry.vertices.push( new THREE.Vector3( position_x, position_y + 650 + 700 + 1400, position_z + 200) );
        lines_geometry.vertices.push( new THREE.Vector3( position_x - 1500, position_y + 600 + 1000, position_z + 1700 ) );
        
        //sample_storage_lines_geometry.computeLineDistances();
        var sys_lines = new THREE.Line( 
            lines_geometry, 
            new THREE.LineDashedMaterial( { color: 0xffff00, dashSize: 10, gapSize: 10} )
        );
        this.scene.add(sys_lines);
    }
    
    ClassTPlatform.prototype.loadXietongSys = function(geometry){
        var sys_color = 0x00ff00;
        
        geometry.computeVertexNormals();
        var sample_storage_material = [ 
            new THREE.MeshLambertMaterial( { color: sys_color, opacity: 0.4, transparent: true, side: THREE.DoubleSide } ), 
            new THREE.MeshBasicMaterial( { color: sys_color, wireframe: true,  opacity: 0.3, side: THREE.DoubleSide } ) 
        ]
        var sample_storage1 = THREE.SceneUtils.createMultiMaterialObject( geometry, sample_storage_material );
        sample_storage1.position.set(0, 1000, 20000);
        sample_storage1.scale.set( 1000, 200, 1000 );
        //sample_storage1.rotation.x = Math.PI / 2;
        this.scene.add( sample_storage1 );
    }
    
    
    this.initClass();
}
