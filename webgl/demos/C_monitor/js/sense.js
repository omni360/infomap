/**
 * @author whenlove
 */

function ClassTPlatform(settings){
    var _self = this;

    this.settings = settings || {};

    //颜色控制
    this.colorObj = {
        // 网格颜色
        grid : {
            c : '#205775',
            o : 0.5
        },
        // 地图颜色
        map : {
            // 正面
            f : '#256589',
            f_o: 0.95,
            // 侧面
            b : '#3899CE'
        },
        // 垂直地图的线
        vlines : {
            c : '#9BDCFD',
            o : 0.8,
            //国家中心
            cc: '#ff0000',
            co: 1
        },
        systemColors : [
            // '#314AB7',
            // '#8131B5',
            // '#BF357B',
            // '#C84D37',
            // '#C87E37',
            // '#C8A237',
            // '#C8C837',
            // '#83BC33',
            // '#33B96C'
            '#33B96C',
            '#8131B5',
            '#C8C837',
            '#83BC33',
            '#C8A237',
            '#BF357B',
            '#C87E37',
            '#C84D37',
            '#314AB7'
        ]
    }
    var R = 10500;

    //系统加载控制标识
    this.loadFlag = true;

    // 存储圆柱
    this.Cubelinders = [];
    this.cylinderGeoHeights = [];
    this.SystemAarys = [];
    this.detailNums = [];
    // 卡片图片
    this.CardMeshars = [];
    this.cardDom = $('#Card');
    this.cardNum = $('#sysNum');
    this.cardName = $('#LocationName');
    this.cardSystem = $('#sysName');
        
    this.cardScale = 1.5;
    this.cardWidth = parseInt(this.cardDom.css('width')) * this.cardScale,
    this.cardHeight = parseInt(this.cardDom.css('height')) * this.cardScale;

    this.tewwnFlag = true;
    this.highValue = 2600;
    //记录当前线的高度;
    this.curentHigh = this.highValue;

    // 系统辅助线状态;
    this.lineStatus = false;
    // 系统展示状态
    this.systemShowStatus = [];
    // 城市展示状态
    this.locationShowStatus = [];
    
    // 数量卡片
    this.numStatus = false;

    this.scaleSet = 0.02;

    this.bottomUpdates = [];

    // 粒子系统

    this.plist = [];

    this.sphereList = [];

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
        GlobalLoadNum += 5;
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
        // this.camera.up = new THREE.Vector3( 0, 0, -1 );
        
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
        // 系统名称标签
        this.sys_info = [];
        this.sys_info_right = [];
        // 系统辅助线
        this.sys_line = [];
        this.sprite_li = [];
        
        
        this.scene = new THREE.Scene();
        this.rotating = new THREE.Object3D();
        this.scene.add( this.rotating );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth , window.innerHeight );
        this.container.appendChild( this.renderer.domElement );
        
        
        this.cartoon_index = 0;
        this.cartoon_data = [];
        
        GlobalLoadNum += 5;

        this.loadSenseObjects();
        this.loadTPlatformObject();

        this.animate();
    }
    
    /*
     * 加载场景对象，主要是周边的一些参考对象，如底部网格等
     */
    ClassTPlatform.prototype.loadSenseObjects = function(){

        this.segmentRadius = 150;
        this.laps = 45;
        
        this.segmentHeight = Math.cos(Math.PI / 6) * this.segmentRadius;
        
        this.geometry = new THREE.Geometry();
        
        this.paths = [];
        
        for (var i = 0; i < this.laps; i++){
            
            if (i == 0){
                
                var circle_path = new THREE.EllipseCurve( 0, 0, this.segmentRadius, this.segmentRadius, 0, 0, false);
                this.paths.push(circle_path);
                
            }else{
                
                var circle_num = 6;
                var radius = i * 2 * this.segmentHeight;
                var circle_path = new THREE.EllipseCurve( 0, 0, radius, radius, Math.PI / 2, 2*Math.PI + Math.PI / 2, false);
                // var circle_path = new THREE.EllipseCurve( 0, 0, radius, radius, Math.PI / 3, 2*Math.PI + Math.PI / 3, false);
                
                var vertices = [];
                
                for (var j = 0; j < circle_num; j++){
                    
                    var vertex = circle_path.getPoint(j / circle_num);
                    vertices.push(vertex);
                    
                }
                
                for (var j = 0; j < vertices.length; j++){
                    
                    var path;
                    
                    if (j == vertices.length - 1){
                        path = new THREE.LineCurve(vertices[j], vertices[0])
                    }else{
                        path = new THREE.LineCurve(vertices[j], vertices[j+1])
                    }

                    for (var k = 0; k <= i; k++){
                        
                        var vertex = path.getPoint(k / i);
                        var circle_path = new THREE.EllipseCurve(vertex.x, vertex.y, this.segmentRadius, this.segmentRadius, 0, 2*Math.PI, false);
                        this.paths.push(circle_path);
                    }
                }
            }
        }
        
        
        for (var i = 0; i < this.paths.length; i++){
            
            var path = this.paths[i];
            
            for (var j = 0; j <= 6; j++){
                
                var point = path.getPoint(j / 6);
                
                if (j == 0 || j == 6){
                    this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
                }else{
                    this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
                    this.geometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
                }
            }
            
        }
        
        this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
        this.obj = new THREE.Line(
            this.geometry, 
            new THREE.LineBasicMaterial({
                color: this.colorObj.grid.c, 
                transparent: true,
                opacity: this.colorObj.grid.o,
                side: THREE.DoubleSide
            }),
            THREE.LinePieces
        );

        this.obj.position.x += 1000;
        this.obj.position.z -= 500;

        this.scene.add(this.obj);


        this.pictureType = $('#projectList');

        var _scale = 8,
            _w = parseInt(this.pictureType.css('width')) * _scale,
            _h = parseInt(this.pictureType.css('height')) * _scale;
        
        html2canvas( this.pictureType, {
            background: 'transparent',
            onrendered: function(canvas) {
                _self.pictureType.css({'visibility': 'hidden'});
                _self.texture = new THREE.Texture(canvas);
                _self.texture.needsUpdate = true;
                
                var geometry = new THREE.PlaneGeometry( _w, _h,1,1);
                
                var mesh = new THREE.Mesh( 
                    geometry, 
                    new THREE.MeshBasicMaterial( { 
                        map: _self.texture, 
                        overdraw: true ,
                        side: THREE.DoubleSide
                    }) 
                );
                
                mesh.position = new THREE.Vector3(6500,10,-1000);
                mesh.rotation.set(-Math.PI*90/180,0,0);
                
                _self.scene.add( mesh );

                GlobalLoadNum += 10;
            }
        });

        
    } 

    ClassTPlatform.prototype.addShape = function( shape, color, x, y, z, s ) {

        var points = shape.createPointsGeometry();
        var spacedPoints = shape.createSpacedPointsGeometry( 100 );

        var extrudeSettings = { amount: 1 };

        // extrudeSettings.bevelEnabled = true;
        // extrudeSettings.bevelSegments = 1;
        // extrudeSettings.steps = 1;

        // 3d shape

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        geometry.applyMatrix((new THREE.Matrix4()).makeRotationX(Math.PI*90/180)); 

        var mesh = THREE.SceneUtils.createMultiMaterialObject( 
            geometry, [ new THREE.MeshBasicMaterial( { color: color, transparent: true,side: THREE.DoubleSide,opacity: 0.99 } ) ] );
        mesh.position.set( x, y, z );
        this.scene.add( mesh );


    }
    ClassTPlatform.prototype.loadChinaModel = function(geometry){
        

        // 正面和侧面颜色;
        var fontColor = new THREE.Color( this.colorObj.map.f ),leftColor = new THREE.Color( this.colorObj.map.b );
        for( var f = 0,face; face = geometry.faces[f]; f++ ) {
            face.color = (face.normal.z != 0) ? fontColor : leftColor;
        }
        var meshQuads = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ 
            vertexColors: true ,
            opacity: this.colorObj.map.f_o
        }) );
        meshQuads.position = new THREE.Vector3( 0, 200, 0);
        meshQuads.scale.set( 1000, 1000, 30);
        meshQuads.rotation.x = - Math.PI / 2;
        this.scene.add( meshQuads );
        GlobalLoadNum += 27;
    }

    ClassTPlatform.prototype.madeCardTexture = function(name,system,num,h,cx,cy,color){
        if(num > 0){
            var numsprite = this.createNumTip(160, 105, 55, num , color, "center");
            numsprite.position.set( cx + 100, h + 70, cy );
            numsprite.visible = false;
            this.scene.add( numsprite );
        }else{
            var numsprite = null;
        }
        GlobalLoadNum += 0.2;
        return numsprite;
    }
    
    ClassTPlatform.prototype.loadTPlatformObject = function(){

        var data_colors = this.colorObj.systemColors;
        
        var lines = [];
        this.dataHeights = [];
        for(var i = 0; i < 9; i++){
            lines.push(new THREE.Geometry());
            this.plist.push(new THREE.Geometry());

            // this.sphereList.push([]);
            // this.plist[i].colors = []
            // this.plist[i].colors = new THREE.Color( 0xff00ff );
            this.dataHeights.push(parseInt(500 + i*250));
            this.systemShowStatus.push(true);
        }

        var cardW = 400,cardH = 200;


        var system_scales = [2.6, 5, 13, 20, 7, 5, 13, 3.2, 10];

        for(var i=0; i < sys_text_li.length; i++){
            //sprite = new THREE.Sprite( { map: THREE.ImageUtils.loadTexture( sys_text_li[i][1] ), useScreenCoordinates: false, color: 0xffffff, fog: true } );
            var sprite = this.createTip(2200,100,'60',sys_text_li[i][0] ,this.colorObj.systemColors[i], "right");
            sprite.position.set( -5000, this.dataHeights[i], -4000 );
            sprite.scale.set( 4400, 200, 1 );
            sprite.visible = false;
            this.scene.add( sprite );
            this.sys_info.push(sprite);

            var sprite_right = this.createTip(2200,100,'60',sys_text_li[i][0] ,this.colorObj.systemColors[i], "left");
            sprite_right.position.set( 5700, this.dataHeights[i], -5000 );
            sprite_right.scale.set( 4400, 200, 1 );
            sprite_right.visible = false;
            this.scene.add( sprite_right );
            this.sys_info_right.push(sprite_right);

        }

        for( var i = 0,tempdata; tempdata = data_list[i]; i ++ ) {

            var cx = tempdata[13];
            var cy = tempdata[14];

            this.locationShowStatus.push(true);


            for(var l = 0; l < 9; l++){
                lines[l].vertices.push( new THREE.Vector3( cx, this.dataHeights[l], cy ) );
            }
            this.createDisks(cx,260,cy);
            
            if(tempdata[0] == '北京(国家中心)'){
                //设置中间圆柱高度
                this.cylinderGeoHeights.push(this.curentHigh+400);
                var line_material = new THREE.LineBasicMaterial( { color: this.colorObj.vlines.cc } );

                var sprite = this.createTip(1800, 200, 100, tempdata[0] ,'#FFFFFF', "center");
                sprite.position.set( cx, 260, cy );
                sprite.scale.set( 1800, 200, 1 );
            }
            else{
                //设置中间圆柱高度
                // this.cylinderGeoHeights.push(parseInt(Math.random()*500 + 1700));
                this.cylinderGeoHeights.push(this.curentHigh);
                var line_material = new THREE.LineBasicMaterial( { 
                    color: this.colorObj.vlines.c ,
                    transparent: true,
                    opacity: this.colorObj.vlines.o
                } );

                var sprite = this.createTip(1400, 200, 90, tempdata[0] ,'#FFFFFF', "center");
                sprite.position.set( cx, 260, cy );
                sprite.scale.set( 1400, 200, 1 );
            }


            sprite.opacity = 1;
            sprite.visible = false;
            this.sprite_li.push(  sprite  );
            this.scene.add( sprite );




            var line_geometry = new THREE.Geometry();
            line_geometry.dynamic = true;
            line_geometry.vertices.push(new THREE.Vector3( cx, 260,cy ));
            line_geometry.vertices.push(new THREE.Vector3( cx, 260,cy ));

            var mesh = new THREE.Line( line_geometry, line_material );

            this.Cubelinders.push(mesh);

            this.scene.add( mesh );
            
            var _systemarys = [];
            var _numarys = [];
            var _syssphere = [];
            
            // 第一个系统 圆环
            for(var n = 1; n < 10; n++){


                _numarys.push(this.madeCardTexture(tempdata[0],sys_text_li[n-1][0],tempdata[n],this.dataHeights[n-1],cx,cy,data_colors[n-1]));

                if(tempdata[n]){
                    circle_r = tempdata[n]*system_scales[n-1];
                    // circle_r = data_list[i][n]*10;
                    temp_s_d = 360/tempdata[n];

                    var mergeGeo = new THREE.Geometry();

                    mergeGeo.dynamic = true;

                    // var planeGeometry = new THREE.CircleGeometry( circle_r - 10, 30);

                    var planeGeometry = new THREE.CircleGeometry( circle_r - 10, 25);

                    // planeGeometry.applyMatrix((new THREE.Matrix4()).makeRotationX(-Math.PI*90/180)); 

                    // var arcShape = new THREE.Shape();
                    // arcShape.absarc( 0, 0, circle_r - 10, 0, Math.PI*2, false );

                    // var holePath = new THREE.Path();
                    // holePath.absarc( 0, 0, 10, 0, Math.PI*2, true );
                    // arcShape.holes.push( holePath );

                    // this.addShape( arcShape, data_colors[n-1], cx,this.dataHeights[n-1],cy, 1 );

                    THREE.GeometryUtils.merge(mergeGeo,planeGeometry);
                    var planeMaterials = new THREE.MeshBasicMaterial( { 
                        color: data_colors[n-1], 
                        side:THREE.DoubleSide, 
                        opacity: 1, 
                        transparent: true 
                    } );

                    var _tvertices = [];

                    for( var j = 0; j < tempdata[n]; j ++ ) {
                        var _p = Math.PI*temp_s_d/180*j;
                        // var _c = new THREE.CircleGeometry( 5);
                        // var _c = new THREE.SphereGeometry( 13, 10, 10 );
                        // _c.applyMatrix((new THREE.Matrix4()).makeRotationX(-Math.PI*90/180)); 
                        // _c.applyMatrix((new THREE.Matrix4()).makeTranslation(Math.sin(_p)*(circle_r+10),Math.cos(_p)*(circle_r+10),0)); 
                        // THREE.GeometryUtils.merge(mergeGeo,_c);      
                        
                        _tvertices.push(new THREE.Vector3(Math.sin(_p)*(circle_r+10) + cx,0,cy + Math.cos(_p)*(circle_r+10)))
                        
                       


                        this.plist[n-1].vertices.push(new THREE.Vector3(Math.sin(_p)*(circle_r+10) + cx,this.dataHeights[n-1],cy + Math.cos(_p)*(circle_r+10)));
                        this.plist[n-1].colors.push(new THREE.Color( data_colors[n-1] ));


                    }
                    var planeMaterial = new THREE.MeshBasicMaterial( { 
                        color: data_colors[n-1], 
                        side:THREE.DoubleSide, 
                        opacity: 0.7, 
                        transparent: true 
                    } );
                    var plane = new THREE.Mesh( mergeGeo, planeMaterial );
                    plane.position = new THREE.Vector3( cx,this.dataHeights[n-1],cy );
                    plane.rotation.x = - Math.PI / 2;
                    plane.scale.set(0.01,0.01,1);
                    plane.visible = false;
                    _systemarys.push(plane);
                    this.scene.add(plane);

                    // var planess = new THREE.Mesh( mergeGeo, planeMaterials );
                    // planess.position = new THREE.Vector3( cx,this.dataHeights[n-1],cy );
                    // planess.rotation.x = - Math.PI / 2;
                    // planess.scale.set(0.01,0.01,1);
                    // planess.visible = false;

                    // this.scene.add(planess);

                    _syssphere.push(_tvertices);

                    GlobalLoadNum += 0.2;
                }
            }

            this.detailNums.push(_numarys);
            this.SystemAarys.push(_systemarys);
            this.sphereList.push(_syssphere);
            
        }
        

        for(var l = 0; l < 9; l++){
            lines[l].vertices.unshift( new THREE.Vector3( 5700, this.dataHeights[l], -5000 ) );
            lines[l].vertices.push( new THREE.Vector3( -5000, this.dataHeights[l], -4000 ) );
            var _line = new THREE.Line( 
                lines[l], 
                new THREE.LineBasicMaterial( { 
                    // color: data_colors[l],
                    // color: data_colors[l],
                    color: this.colorObj.vlines.c, 
                    transparent: true,
                    opacity: 0.3
                } ) 
            );
            _line.visible = false;
            this.sys_line.push(_line);
            this.scene.add( _line );

            // this.plist[l].colors = new THREE.Color( 0xffffff );


            // var Particles9 = new THREE.ParticleSystem( this.plist[l], p );


            // Particles9.sortParticles = true;
            // Particles9.updateMatrix();
            // Particles9.visible = true;
            // this.scene.add( Particles9 );
        }

        // 创建例子系统
        this.particleSystemL = [];

        var texture = THREE.ImageUtils.loadTexture( "images/ripple.png" );
        var p = new THREE.ParticleSystemMaterial( {   
            size: 45, 
            map: texture, 
            sizeAttenuation : true,
            blending: THREE.CustomBlending,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.DstAlphaFactor,
            blendEquation: THREE.AddEquation,
            depthTest:true,
            vertexColors: true,
            transparent: true,
            opacity: 0
        } );


        // heng
       
        for(var i in this.sphereList){
            var _particleSystems = [];
            var _t = new THREE.Geometry();
                for(var a = 0 ; a < 9 ; a++){
                var _t = new THREE.Geometry();
                for(var j in this.sphereList[i][a]){
                    _t.vertices.push(this.sphereList[i][a][j]);
                    _t.colors.push(new THREE.Color( data_colors[a] ));
                }
                var Particles9 = new THREE.ParticleSystem( _t, p.clone() );
                Particles9.visible = false;

                // Particles9.translateY(-2000);
                Particles9.position.y = _self.dataHeights[a];

                _particleSystems.push(Particles9);
                this.scene.add( Particles9 );
            }
            this.particleSystemL.push(_particleSystems);
        }     
        // console.info(this.particleSystemL)   
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
        
    ClassTPlatform.prototype.Transfrom = function(){
        // this.CubelinderRun = new TWEEN.Tween({v: 1})
        //     .to({v:100},  2000 )
        //     .onUpdate(function(){
        //         for( var i = 0; i < _self.Cubelinders.length; i ++ ) {
        //             _h = _self.cylinderGeoHeights[i]/100*this.v;

        //             _self.Cubelinders[i].geometry.vertices[0].setY(_h);
        //             _self.Cubelinders[i].geometry.verticesNeedUpdate = true;

        //             _self.sprite_li[i].visible = true;
        //             _self.sprite_li[i].position.y = _h + 250;


        //             for(var s in _self.SystemAarys[i]){
        //                 _self.SystemAarys[i][s].visible = true;
        //                 _self.SystemAarys[i][s].scale.set(this.v/100,this.v/100,this.v/100);

        //                 _self.particleSystemL[s][i].visible = true;
        //                 _self.particleSystemL[s][i].position.y = _self.dataHeights[s]/100*this.v;
        //             }
                    
        //         }
        //     })
        //     .onComplete(function(){
        //         $('.location-label').css({
        //             left: _self.settings.padding[1] + 1
        //         })

        //         $('.system-label').css({
        //             left: _self.settings.padding[1] + 1
        //         })

        //         $('#btngroup').css({
        //             right: _self.settings.padding[1] + 1
        //         })
        //     })
        //     .easing( TWEEN.Easing.Linear.None )
        //     .start();
        
        var systemId = 0;

        (function run(Id){

            
            new TWEEN.Tween({v: 1,scale: 1})
                .to({v:100,scale:10},  800 )
                .onUpdate(function(){

                    for(var i in _self.SystemAarys){
                        _h = (_self.cylinderGeoHeights[i]/9)/100*this.v + _self.cylinderGeoHeights[i]/9*(Id+1);

                        _self.Cubelinders[i].geometry.vertices[0].setY(_h);
                        _self.Cubelinders[i].geometry.verticesNeedUpdate = true;

                        _self.sprite_li[i].visible = true;
                        _self.sprite_li[i].position.y = _h + 250;

                        if(this.v > 60 && _self.SystemAarys[i][Id]){
                            _self.SystemAarys[i][Id].visible = true;
                            _self.SystemAarys[i][Id].scale.set((this.scale/5-1),(this.scale/5-1),(this.scale/5-1));

                            _self.particleSystemL[i][Id].visible = true;
                            _self.particleSystemL[i][Id].material.opacity = (this.scale/5-1);
                        }
                    }

                })
                .onComplete(function(){
                    // console.info(_self.particleSystemL[Id]);
                    if(systemId < 8){
                        systemId += 1;
                        run(systemId);
                    } else{
                        $('.location-label').css({
                            left: _self.settings.padding[1] + 1
                        })

                        $('.system-label').css({
                            left: _self.settings.padding[1] + 1
                        })

                        $('#btngroup').css({
                            right: _self.settings.padding[1] + 1
                        })
                    }
                })
                .easing( TWEEN.Easing.Linear.None )
                .start();
        })(systemId);
    }



    ClassTPlatform.prototype.SwitchShow = function(){
        // 计算本次线高
        var end_h = this.CheckMaxHigh();

        //根据系统展示状态，地区展示状态进行展示
        new TWEEN.Tween({v: 1})
            .to({v:100},  1000 )
            .onUpdate(function(){
                _h = end_h/100*this.v;

                for(var s in _self.SystemAarys){
                    // 得到每个城市系统集合
                    // 判断当前是城市的展示状态
                    if(_self.locationShowStatus[s]){
                        // 展示线
                        if(s != 3){
                            // 北京高 400；
                            _self.Cubelinders[s].geometry.vertices[0].setY(_h);
                            _self.sprite_li[s].position.y = _h + 250;
                        }else{
                            _self.Cubelinders[s].geometry.vertices[0].setY(_h+4*this.v);
                            _self.sprite_li[s].position.y = _h + 4*this.v + 250;
                        }
                        _self.sprite_li[s].visible = true;
                        _self.Cubelinders[s].geometry.verticesNeedUpdate = true;


                        for(var j in _self.SystemAarys[s]){
                            //得到一个城市的一个系统
                            // 判断每个系统展示状态    
                            if(_self.systemShowStatus[j]){
                                _self.SystemAarys[s][j].scale.set(_self.scaleSet*this.v,_self.scaleSet*this.v,0.01*this.v);
                                _self.detailNums[s][j] && (_self.detailNums[s][j].visible = _self.numStatus);
                                _self.particleSystemL[s][j].visible = true;
                                _self.sys_info[j].visible = _self.sys_info_right[j].visible = _self.sys_line[j].visible = (_self.systemShowStatus[j] && _self.lineStatus);
                            }else{
                                _self.SystemAarys[s][j].scale.set(0.01,0.01,0.01);
                                _self.detailNums[s][j] && (_self.detailNums[s][j].visible = false);
                                _self.particleSystemL[s][j].visible = false;
                                _self.sys_info[j].visible = _self.sys_info_right[j].visible = _self.sys_line[j].visible = (_self.systemShowStatus[j] && _self.lineStatus);
                            }
                        }
                    }else{
                        //隐藏线
                        _self.Cubelinders[s].geometry.vertices[0].setY(0);
                        _self.sprite_li[s].visible = false;
                        _self.sprite_li[s].position.y = 250;
                        _self.Cubelinders[s].geometry.verticesNeedUpdate = true;

                        for(var j in _self.SystemAarys[s]){
                            //得到一个城市的一个系统
                            // 判断每个系统展示状态    
                            _self.SystemAarys[s][j].scale.set(0.01,0.01,0.01);
                            _self.detailNums[s][j] && (_self.detailNums[s][j].visible = false);
                            _self.particleSystemL[s][j].visible = false;
                        }
                    }
                }
            })
            .onComplete(function(){
            })
            .easing( TWEEN.Easing.Linear.None )
            .start();
    }

    ClassTPlatform.prototype.CheckMaxHigh = function(){
        var _maxHigh = this.highValue;
        for(var i = 0; i < this.systemShowStatus.length; i++){
            this.systemShowStatus[i] && (_maxHigh = (this.dataHeights[i] + 200));   
        }
        return _maxHigh;
    }


    ClassTPlatform.prototype.ShwoALLSystem = function(){
        var old_x = this.camera.target.position.x;
        // console.info(old_x);
        var temp_x = (old_x - 0)/100;

        var old_z = this.camera.target.position.z;
        var temp_z = (old_z - 0)/100;

        var old_t = _self.theta;
        var temp_t = (old_t + 32.3)/100;

        var old_p = _self.phi;
        var temp_p = (old_p - 54.5)/100;

        new TWEEN.Tween({v: 0})
            .to({v:100 },  1000 )
            .onUpdate(function(){
                // _self.cameraRadius += temp_r/100;
                _self.theta = old_t - temp_t*this.v;
                _self.phi = old_p - temp_p*this.v;
                _self.camera.target.position.x = old_x - temp_x*this.v;
                _self.camera.target.position.z = old_z - temp_z*this.v;
                _self.updateCamera();
            })
            .onComplete(function(){
                // console.info(_self.camera.target.position.x);
            })
            .easing( TWEEN.Easing.Linear.None )
            .start();

        this.scaleSet = 0.01;
        for(var i in this.systemShowStatus){
            this.systemShowStatus[i] = true;
        }
        this.SwitchShow();
    }

    ClassTPlatform.prototype.ShwoOneSystem = function(id){
        // var R = 10501;
        // var temp_r = R - _self.cameraRadius;
        
        // var old_t = _self.theta;
        // var temp_t = (old_t - 0)/100;

        // var old_p = _self.phi;
        // var temp_p = (old_p - 180)/100;

        var old_x = this.camera.target.position.x;
        // console.info(old_x);
        var temp_x = (old_x - 0)/100;

        var old_z = this.camera.target.position.z;
        var temp_z = (old_z - 0)/100;

        var old_t = _self.theta;
        var temp_t = (old_t + 32.3)/100;

        var old_p = _self.phi;
        var temp_p = (old_p - 54.5)/100;

        new TWEEN.Tween({v: 0})
            .to({v:100 },  1000 )
            .onUpdate(function(){
                // _self.cameraRadius += temp_r/100;
                // _self.theta = old_t - temp_t*this.v;
                // _self.phi = old_p - temp_p*this.v;
                // _self.camera.target.position.z = -1500;
                // _self.camera.target.position.x = 0;
                // _self.updateCamera();
                _self.theta = old_t - temp_t*this.v;
                _self.phi = old_p - temp_p*this.v;
                _self.camera.target.position.x = old_x - temp_x*this.v;
                _self.camera.target.position.z = old_z - temp_z*this.v;
                _self.updateCamera();
            })
            .onComplete(function(){
            })
            .easing( TWEEN.Easing.Linear.None )
            .start();

        this.scaleSet = 0.01;
        for(var i in this.systemShowStatus){
            this.systemShowStatus[i] = ((i != id) ? false : true);
        }
        this.SwitchShow();
    }

    ClassTPlatform.prototype.ShowOneLocation = function(id){
        // var R = 9501;
        // var temp_r = R - _self.cameraRadius;

        var old_x = this.camera.target.position.x;
        // console.info(old_x);
        var temp_x = (old_x - data_list[id][13])/100;

        var old_z = this.camera.target.position.z;
        var temp_z = (old_z - data_list[id][14])/100;

        var old_t = _self.theta;
        var temp_t = (old_t + 32.3)/100;

        var old_p = _self.phi;
        var temp_p = (old_p - 54.5)/100;

        new TWEEN.Tween({v: 0})
            .to({v:100 },  1000 )
            .onUpdate(function(){
                // _self.cameraRadius += temp_r/100;
                _self.theta = old_t - temp_t*this.v;
                _self.phi = old_p - temp_p*this.v;
                _self.camera.target.position.x = old_x - temp_x*this.v;
                _self.camera.target.position.z = old_z - temp_z*this.v;
                _self.updateCamera();
            })
            .onComplete(function(){
                console.info(_self.cameraRadius);
            })
            .easing( TWEEN.Easing.Linear.None )
            .start();


        this.scaleSet = 0.01;
        for(var i in this.locationShowStatus){
            this.locationShowStatus[i] = ((i != id) ? false : true);
        }
        this.SwitchShow();
    }

    ClassTPlatform.prototype.ShwoALLLocation = function(){
        var old_x = this.camera.target.position.x;
        // console.info(old_x);
        var temp_x = (old_x - 0)/100;

        var old_z = this.camera.target.position.z;
        var temp_z = (old_z - 0)/100;

        var old_t = _self.theta;
        var temp_t = (old_t + 32.3)/100;

        var old_p = _self.phi;
        var temp_p = (old_p - 54.5)/100;

        new TWEEN.Tween({v: 0})
            .to({v:100 },  1000 )
            .onUpdate(function(){
                // _self.cameraRadius += temp_r/100;
                _self.theta = old_t - temp_t*this.v;
                _self.phi = old_p - temp_p*this.v;
                _self.camera.target.position.x = old_x - temp_x*this.v;
                _self.camera.target.position.z = old_z - temp_z*this.v;
                _self.updateCamera();
            })
            .onComplete(function(){
                console.info(_self.camera.target.position.x);
            })
            .easing( TWEEN.Easing.Linear.None )
            .start();

        this.scaleSet = 0.01;
        for(var i in this.locationShowStatus){
            this.locationShowStatus[i] = true;
        }
        this.SwitchShow();
    }
    
    /*
     * 动态渲染，摄像机变化
     */
    ClassTPlatform.prototype.animate = function(){
        // console.info(GlobalLoadNum);
        requestAnimationFrame(this.animate.bind(this));
        if(this.loadFlag){
            // 判断并且控制滚动条
            // GlobalLoadNumDom.html(parseInt(GlobalLoadNum) + '%');
            // GlobalLoadNumDom.css({'opacity': (1.1-parseInt(GlobalLoadNum)/100)});
            // GlobalBarDom.css({'width': window.innerWidth/100 * parseInt(GlobalLoadNum)});
            if(parseInt(GlobalLoadNum) >= 100){
                this.loadFlag = false;
                // $('#loadFrame').addClass('load-frame-hide');
            }
            return false;
        }

        for(var i=0,s; s = this.detailNums[i] ; i++){
            for(var j in s){
                s[j] && s[j].lookAt(this.camera.position);
            }
        }

        // 镜头运动

        if(this.flagThetaNumber > 100 && this.tewwnFlag){
            // this.CubelinderRun.start();
            this.Transfrom();
            this.updateBottom();
            this.tewwnFlag = false;
        }

        TWEEN.update();

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
        
        this.cameraChanged && (this.updateCamera(), this.cameraChanged = !1);
        
        
        // 更新一下中心点
        this.camera.lookAt(this.middlePoint);
        
        
        this.renderWebgl();
    }
    
    /*
     * 渲染webgl场景
     */
    ClassTPlatform.prototype.renderWebgl = function(){

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
        var alpha = .9;
        var offsetX = canvas.width / 2 ;
        
        var context = canvas.getContext('2d');
        
        context.globalAlpha = 1;
        context.font = "bold " + font_size + "pt 微软雅黑";
        context.textAlign = text_align;
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(para, canvas.width / 2 , canvas.height / 2);

        var texture = new THREE.Texture(canvas);

        texture.needsUpdate = true;
    
        var textMesh = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture,useScreenCoordinates: false}));
        //textMesh.position.x = canvas.width / 2;
        //textMesh.material.opacity = 0;
        return textMesh;
        
    }

    ClassTPlatform.prototype.createNumTip = function( width, height, font_size, para, color, text_align) {
    
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        var tipHight = 40;
        var alpha = 1;
        var offsetX = canvas.width / 2 ;
        
        var context = canvas.getContext('2d');
        
        context.globalAlpha = alpha;
        context.fillStyle = color;
        context.fillRect(0,0,width,height,5);

        
        context.globalAlpha = 1;
        context.font = "bold " + font_size + "pt FileFolderJNL";
        context.textAlign = text_align;
        context.textBaseline = "middle";
        context.fillStyle = '#FFF';
        // var ctext = (para+'').split("").join(String.fromCharCode(8201))
        context.fillText(para, canvas.width / 2 , canvas.height / 2 - 5);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        // var textMesh = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture,useScreenCoordinates: false}));

        var textMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( width, height, 1, 1 ),
            new THREE.MeshBasicMaterial( { 
                map: texture,
                // blending: THREE.CustomBlending,
                // blendSrc: THREE.SrcAlphaFactor,
                // blendDst: THREE.DstAlphaFactor,
                // blendEquation: THREE.AddEquation,
                // depthTest:      true,
                transparent:    true 
            } )
        );

        return textMesh;
    }
    
    ClassTPlatform.prototype.setSysInfo = function(flag) {
        this.lineStatus = flag;
        for(var i=0; i < this.sys_info.length; i++){
            this.sys_info[i].visible = this.sys_info_right[i].visible = this.sys_line[i].visible = (this.systemShowStatus[i] && this.lineStatus);
        }
    }

    ClassTPlatform.prototype.showSysInfo = function(id) {
        for(var i=0; i < this.sys_info.length; i++){
            if(i == id){
                this.sys_info[i].visible = this.sys_info_right[i].visible = this.sys_line[i].visible = (this.systemShowStatus[id] && this.lineStatus);
            }else{
                this.sys_info[i].visible = this.sys_info_right[i].visible = this.sys_line[i].visible = false;
            }
            
        }
    }

    ClassTPlatform.prototype.setCard = function( flag) {
        // this.numStatus = flag;
        // this.scaleSet = 0.01;
        // this.SwitchShow();

        this.numStatus = flag;
        for(var i=0,d; d = this.detailNums[i]; i++){
            for(var j in d){
                d[j] && (d[j].visible = this.systemShowStatus[j] && this.numStatus && this.locationShowStatus[i]);
                // console.info();
            }
        }
    }

    ClassTPlatform.prototype.createDisks = function(x,y,z){
        

        var gray_color = new THREE.Color('#41B3F3');
        var _color = new THREE.Color('#86CBF2');

        var gray_hsl = gray_color.getHSL();

        for(var h = 0; h < 3; h++){
            var mergeGeometry = new THREE.Geometry();
                
            for (var i = 1; i < 2; i++){
                var arcShape = new THREE.Shape();
                arcShape.absellipse( 0, 0, i * 30 + 25, i * 30 + 25, 0, Math.PI*2, false );

                var borderShape = new THREE.Shape();
                borderShape.absellipse( 0, 0, i * 30 + 26, i * 30 + 26, 0, Math.PI*2, false );
                var holePath = new THREE.Path();
                holePath.absellipse( 0, 0, i * 30 + 24, i * 30 + 24, 0, Math.PI*2, true );
                borderShape.holes.push( holePath );
                
                var geometry = arcShape.makeGeometry( arcShape );
                var g = borderShape.makeGeometry( arcShape );
                
                var faces = geometry.faces;
                
                // var color = new THREE.Color().setHSL(gray_hsl.h, gray_hsl.s, i / 4)
                
                for (var j = 0; j < faces.length; j++){
                    faces[j].color = gray_color;
                }

                for (var j = 0; j < g.faces.length; j++){
                    g.faces[j].color = _color;
                }

                
                
                THREE.GeometryUtils.merge(mergeGeometry,geometry);
                THREE.GeometryUtils.merge(mergeGeometry,g);
            }
            mergeGeometry.applyMatrix((new THREE.Matrix4()).makeRotationX(-Math.PI*90/180)); 
            
            var mesh = new THREE.Mesh( 
                mergeGeometry, 
                new THREE.MeshBasicMaterial({
                    transparent: true, 
                    opacity: .3, 
                    side: THREE.DoubleSide,
                    vertexColors: true,
                })
            );

            mesh.position = new THREE.Vector3(x,y,z);
            
            this.scene.add( mesh );   
            this.bottomUpdates.push( mesh ); 
        }
         
        // this.updateBottom();
    }

    ClassTPlatform.prototype.updateBottom = function(){
        new TWEEN.Tween({scale: -1, opacity: .8})
            .to({scale: 1, opacity: 0}, 2500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function (){
                for(var i=0,m;m = _self.bottomUpdates[i]; i++){
                    m.scale.set(this.scale + 1, 1, this.scale + 1);
                    m.material.opacity = this.opacity;
                }
            })
            .onComplete(function (){
                _self.updateBottom();
            })
            .start();
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
