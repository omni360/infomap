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
            0, 1000, 1000
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
        this.thetaDiffDiff = 2.85,
        
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
        
        
        this.data = [];
        // 圆柱或长方体
        this.data_object = [];
        this.geometry_li = [];
        this.mesh_li = [];
        this.rotating_li = [];
        this.sys_info = [];
        this.sprite_li = [];
        this.particle_vector_li1 = [];
        this.particle_vector_li2 = [];
        this.particle_vector_li3 = [];
        this.particle_vector_li4 = [];
        this.particle_vector_li5 = [];
        this.particle_vector_li6 = [];
        this.particle_vector_li7 = [];
        this.particle_vector_li8 = [];
        this.particle_vector_li9 = [];
        this.circle_vector_li1 = [];
        this.circle_vector_li2 = [];
        this.circle_vector_li3 = [];
        this.circle_vector_li4 = [];
        this.circle_vector_li5 = [];
        this.circle_vector_li6 = [];
        this.circle_vector_li7 = [];
        this.circle_vector_li8 = [];
        this.circle_vector_li9 = [];
        this.circle_li1 = [];
        this.circle_li2 = [];
        this.circle_li3 = [];
        this.circle_li4 = [];
        this.circle_li5 = [];
        this.circle_li6 = [];
        this.circle_li7 = [];
        this.circle_li8 = [];
        this.circle_li9 = [];
        this.circle_flag1 = false;
        this.circle_flag2 = false;
        this.circle_flag3 = false;
        this.circle_flag4 = false;
        this.circle_flag5 = false;
        this.circle_flag6 = false;
        this.circle_flag7 = false;
        this.circle_flag8 = false;
        this.circle_flag9 = false;
        
        
        var Particles1,
            particle_geometry1,
            Particles2,
            particle_geometry2,
            Particles3,
            particle_geometry3,
            Particles4,
            particle_geometry4,
            Particles5,
            particle_geometry5,
            Particles6,
            particle_geometry6,
            Particles7,
            particle_geometry7,
            Particles8,
            particle_geometry8,
            Particles9,
            particle_geometry9,
            killedParticles,
            killedGeometry;
        //this.geometry;
        //this.mesh;
        
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
        //<------------------------------
        var glowSpanTexture = THREE.ImageUtils.loadTexture('images/glowspan.png');
        var cylinderMaterial = new THREE.MeshBasicMaterial({
            map: glowSpanTexture,
            blending: THREE.AdditiveBlending,
            transparent: true,
            //depthTest: false,
            depthWrite: false,
            wireframe: true,
            opacity: 0,
        })
        
        var plane_size = 20000,
            plane_num = 100,
            plane_offset_y = 500,
            wall_offset_y = plane_size / 2 - plane_offset_y;
        //var plane_geometry = new THREE.PlaneGeometry( plane_size, plane_size, plane_num, plane_num );
        //var plane_geometry = new THREE.CircleGeometry( 13000, 200 );
        var plane_geometry = new THREE.CylinderGeometry( 15000, 6000, 600, 200, 0 );
        var matrix = new THREE.Matrix4();
        matrix.scale( new THREE.Vector3(1,1,1) );
        plane_geometry.applyMatrix( matrix );

        var mesh = new THREE.Mesh( plane_geometry, cylinderMaterial );
        mesh.material.map.wrapS = THREE.RepeatWrapping;
        mesh.material.map.wrapT = THREE.RepeatWrapping;
        mesh.material.map.needsUpdate = true;
        mesh.material.map.onUpdate = function(){
            this.offset.y -= 0.001;
            this.needsUpdate = true;
        }
    
        var updatePlaneMaterial = function(){
            //console.dir(this);
            this.material.opacity = 1;
            //this.material.opacity += (0.0 - this.material.opacity) * 0.1;
            this.visible = true;
        }
        
        mesh.position = new THREE.Vector3(
            0,-300,-2000
        );
        //mesh.position.y += plane_offset_y;
        //mesh.rotation.x = - Math.PI / 2;
        mesh.update = updatePlaneMaterial;
        //this.rotating.add( mesh );
        //--------------->
        
        
        //<-----
        var plane_size = 40000,
            plane_num = 100,
            plane_offset_y = 500,
            wall_offset_y = plane_size / 2 - plane_offset_y;
        
        //创建水平面-0x26691F，每个网格是两个三角形拼的
        var plane_material = new THREE.MeshBasicMaterial( { color: 0x0088cc, wireframe: true, wireframeLinewidth: .1 } );
        //plane_material.color.setHSV( 0.3, 0.3, 0.6 );
        plane_material.color.setHex(0x0088cc);
        
        var plane_geometry = new THREE.PlaneGeometry( plane_size, plane_size, plane_num, plane_num );
        
        mesh = new THREE.Mesh( plane_geometry, plane_material );
        //mesh.position = this.middlePoint.clone();
        mesh.position = new THREE.Vector3(
            0,0,0
        );
        //mesh.position.y += plane_offset_y;
        mesh.rotation.x = - Math.PI / 2;
        this.scene.add( mesh );
        //----->
        
    }
    
    
    ClassTPlatform.prototype.loadChinaModel = function(geometry){
        
        var vertexShader = document.getElementById( 'vertexShader' ).textContent;
        var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

        var attributesQuads = { center: { type: 'v4', boundTo: 'faceVertices', value: [] } };
        var valuesQuads = attributesQuads.center.value;

        this.setupAttributes( geometry, valuesQuads );

        var materialQuads = new THREE.ShaderMaterial( { uniforms: {}, attributes: attributesQuads, vertexShader: vertexShader, fragmentShader: fragmentShader } );

        meshQuads = new THREE.Mesh( geometry, materialQuads );
        meshQuads.position.x = 0;
        
        
        meshQuads.position = new THREE.Vector3(
            0,200,0
        );
        meshQuads.scale.set( 1000, 1000, 120);
        meshQuads.rotation.x = - Math.PI / 2;
        //this.scene.add( meshQuads );
        
        
        attributes = {

            size: { type: 'f', value: [] },
            ca:   { type: 'c', value: [] }

        };
        
        var indexedMapTexture = THREE.ImageUtils.loadTexture( "textures/sprites/ripple.png" );
        
        indexedMapTexture.needsUpdate = true;
        indexedMapTexture.magFilter = THREE.NearestFilter;
        indexedMapTexture.minFilter = THREE.NearestFilter;
        
        uniforms = {

            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            texture:   { type: "t", value:  indexedMapTexture},

        };

        uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

        var shaderMaterial = new THREE.ShaderMaterial( {
            transparent: true,
            uniforms:       uniforms,
            attributes:     attributes,
            vertexShader:   document.getElementById( 'particlevertexshader' ).textContent,
            fragmentShader: document.getElementById( 'particlefragmentshader' ).textContent

        });


        
        model_geometry = this.getModelVertices(geometry);
        console.info(model_geometry.vertices.length);
        
        //var indexedMapTexture = THREE.ImageUtils.loadTexture( "textures/sprites/circle.png" );
        //var particle_colors1 = [];
        //model_geometry.colors = particle_colors1;
        //var particle_material1 = new THREE.ParticleBasicMaterial( { size: 4, sizeAttenuation:false, blending: THREE.AdditiveBlending, map: indexedMapTexture, vertexColors: true } );
        
        
        //sphere = new THREE.ParticleSystem( geometry, shaderMaterial );
        sphere = new THREE.ParticleSystem( model_geometry, shaderMaterial );
        //sphere = new THREE.ParticleSystem( model_geometry, particle_material1 );

        sphere.dynamic = true;
        sphere.sortParticles = true;

        var vertices = sphere.geometry.vertices;
        var values_size = attributes.size.value;
        var values_color = attributes.ca.value;

        for( var v = 0; v < vertices.length; v++ ) {
            //console.info(vertices[ v ]);
            values_size[ v ] = 8;
            values_color[ v ] = new THREE.Color( 0xFFFF00 );
            //particle_colors1.push(new THREE.Color( 0xFFFF00 ));
        }
        sphere.position = new THREE.Vector3(
            0,1200,0
        );
        sphere.scale.set( 1000, 1000, 120);
        sphere.rotation.x = - Math.PI / 2;

        this.scene.add( sphere );
        
    }
    
    ClassTPlatform.prototype.setupAttributes = function( geometry, values ) {
        //console.info(geometry);
        for( var f = 0; f < geometry.faces.length; f ++ ) {

            var face = geometry.faces[ f ];

            if ( face instanceof THREE.Face3 ) {
                //geometry.faces.splice(f,1);
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
    
    ClassTPlatform.prototype.getModelVertices = function( geometry ) {
        //console.info(geometry);
        var model_geometry = new THREE.Geometry();
        var finish_hash = {}
        for( var f = 0; f < geometry.faces.length; f ++ ) {

            var face = geometry.faces[ f ];
            //console.info(face instanceof THREE.Face4 );
            if ( face instanceof THREE.Face4 ) {
                if(face.normal.z == 0){
                   if(!finish_hash[face.a]){
                        model_geometry.vertices.push( geometry.vertices[face.a] );
                        finish_hash[face.a] = 1;
                    }
                    if(!finish_hash[face.b]){
                        model_geometry.vertices.push( geometry.vertices[face.b] );
                        finish_hash[face.b] = 1;
                    }
                }
            }

        }
        
        return model_geometry;
    }
    
    ClassTPlatform.prototype.loadTPlatformObject = function(){
        
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
        /* 线移动
        for( var i = 0; i < data_list.length; i ++ ) {
            if(data_list[i][10]*6 > this.cartoon_index*10){
                data_list[i][15].vertices[ 1 ].y = this.cartoon_index*10;
                
                data_list[i][16].geometry.verticesNeedUpdate = true;
            }
        }
        */
        var time = Date.now() * 0.005;
        var size = 10 * Math.sin( 0.5 + time );
        //console.info(Math.abs(size));
        for( var j = 0; j < sphere.geometry.vertices.length; j ++ ) {
            // 一起闪动
            
            attributes.size.value[ j ] = Math.abs( size );
            
            // 分别闪动
            // var time = Date.now() * 0.005;
            // if ( Math.sin( 0.1 * j + time ) > 0 ){
                // attributes.size.value[ j ] = 12 * Math.sin( 0.1 * j + time );
            // }
            // else{
                // attributes.size.value[ j ] = 0;
            // }
        }
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
            //this.loadTextObject();
            //this.loadVdsObject();
            //this.loadAvmlReceive_1();
            //this.loadAvmlReceive_2();
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
                   // 　 　 　   case 40:keyName = "[方向键下]";   break;
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
            //monitor_data.push(monitor_location['cx']);
            //monitor_data.push(monitor_location['cy']);
            
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
    
    ClassTPlatform.prototype.createMoveObjects = function(startPosition, endPosition){
        
        var distance = startPosition.distanceTo(endPosition);
        //console.info(1 / distance);
        var obj = {
            // 三维直线，LineCurve3
            'line_curve': new THREE.LineCurve3(startPosition, endPosition),
            // 起始位置
            'point_at': 0,
            'point_speed': 0.4 / distance,
            'is_complate' : false
        };
        
        return obj;
    }
    
    /*
     * 加载移动对象数据
     */
    ClassTPlatform.prototype.getCurrentPosition = function(obj){
        //console.info('tt');
        var current_position = 0;
        if(obj.point_at <= 1){
            
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
            obj.point_at += obj.point_speed;
        }
        
        return current_position;
    }
    
    ClassTPlatform.prototype.getCirclePosition = function(obj){
        //console.info('tt');
        obj.point_at += obj.point_speed;
        
        return obj.point_at;
    }
    
    this.initClass();
}
