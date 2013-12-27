
//======================================================================================
//  Description: 系统调度类
//  Created Date: 2013-01-10
//  Modify Date: 2013-01-10
//  Author: lvmy
//======================================================================================

System = null;

Topo = null;

OOPTEST.System = function ( loadModel, dataModel ){
	
    //开始执行周边操作的标记
    this.startSetData = false;
    this.DEFAULT_WIDTH = 960, 
    this.DEFAULT_HEIGHT = 450, 
    //用于存储节点信息的向量集合  {'1001': v} key为节点ID，value为该节点的Vector3对象
    this.solarDictionaryID = {}, 
    //mousemove 和 mousedown事件所用的用于存储坐标的标记变量，无需关注
    this.mouseLastMovePoint = new Object, 
    this.mouseDownPoint = new Object, 
    
    //用于标记鼠标点击节点后摄像机微幅度运动的次数统计
    this.moveCount = 0, 
    //以下两个变量，用于控制加载动画摄像机微幅度旋转的次数统计，无需特别关注
    this.rotateCount = 0, 
    this.flagThetaNumber = 0;
    
    //worm、trojan事件的线条运动速度标记
    this.lineSplice = 60;
    
    //是否允许摄像机自动跟随事件旋转的标记
    this.isRotateCamera = false;
    //是否显示陀螺仪的标记，在场景加载完毕后更改此标记，使得陀螺仪可以延迟加载，提高整体加载速度之用，也可用于单独控制陀螺仪是否被需要创建
    this.isShowAxis = true;
    this.middlePoint = new THREE.Vector3();
        
    this.mouseLastMovePoint = new Object, 
    this.mouseDownPoint = new Object, 
    
    this.phiDiff = 0, 
    this.thetaDiff = 0, 
    this.cameraRadius = 4500, 
    this.sceneScalePercent = 0,
    this.smoothRadius = 9000, 
    this.theta = 0, 
    this.phi = 45, 
    this.thetaDiffDiff = 10.03,
    this.PI360 = Math.PI / 360, 
    this.mouseDownPhi = 60, 
    this.mouseDownTheta = 45, 
    this.pulseValue = 0, 
    this.selectedSize = 3;
    
    this.animDeltaX = 0,
    this.animDeltaY = 0,
    this.animDeltaZ = 0;
    
    this.projector = new THREE.Projector();
    
     //用于控制鼠标点击后摄像机移动的tween动画
    this.tweenAmount = [1, 1.2, 1.5, 2, 2.8, 3.5, 5, 6, 7, 8, 8, 8, 8, 8, 7, 6, 5, 3.5, 2.8, 2, 1.5, 1.2, 1], 
    
    ////////////////////////////////////////////////////////////////////////////////////

	this.loadModel = loadModel !== undefined ? loadModel.toLowerCase() : 'all';	//ALL, SPACE2D, SPACE3D
	this.dataModel = dataModel !== undefined ? dataModel.toLowerCase() : 'current';	//history, current

	this.initialize();
	
}

////////////////////////////////////////////////////////////////////////////////////

OOPTEST.System.prototype.addEvent = function (){
	
	this.ray = new THREE.Ray(this.mainViewport.position, null), 
	
	this.mainViewport.target = new THREE.Object3D(); 
	
	this.scene3d.extendAnimate = this.renderHandler.bind(this);
	
	this.scene3d.container.addEventListener("mousedown", this.onMouseDown.bind(this)); 
    //鼠标滑轮监听-闭包写法
    this.onMouseWheelHandler = this.onMouseWheel.bind(this), 
    this.scene3d.container.addEventListener("DOMMouseScroll", this.onMouseWheelHandler, !1), 
    this.scene3d.container.addEventListener("mousewheel", this.onMouseWheelHandler, !1), 
    window.onresize = this.onWindowResize.bind(this); 
	
}

OOPTEST.System.prototype.onMouseMove = function(a) {

    if (this.mouseDownButton == 2) {
        
        var b = new THREE.Vector3(this.mainViewport.target.position.x - this.mainViewport.position.x, this.mainViewport.target.position.y - this.mainViewport.position.y, this.mainViewport.target.position.z - this.mainViewport.position.z), 
        c = new THREE.Vector3;
        c.cross(this.mainViewport.up, b), 
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
        this.mainViewport.position.x += c.x * d + b.x * e, 
        this.mainViewport.position.z += c.z * d + b.z * e, 
        this.mainViewport.target.position.x += c.x * d + b.x * e, 
        this.mainViewport.target.position.z += c.z * d + b.z * e, 
        this.middlePoint.position = this.mainViewport.target.position,
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
        
        this.mainViewport.updateProjectionMatrix();
    }
    return !1;
    
}

OOPTEST.System.prototype.onMouseDown = function(a) {
	
    this.mouseDownPoint.x = a.clientX, 
    this.mouseDownPoint.y = a.clientY, 
    this.mouseLastMovePoint.x = a.clientX, 
    this.mouseLastMovePoint.y = a.clientY, 
    this.mouseDownButton = a.button, 
    this.mouseDownButton == 0 && (this.doAnimation = !1), 
    this.lastPhi = this.phi, 
    this.lastTheta = this.theta, 
    this.mouseDownTheta = this.theta, 
    this.mouseDownPhi = this.phi, 
    this.mouseMoveHandler || (this.mouseMoveHandler = this.onMouseMove.bind(this)),
    this.scene3d.container.addEventListener("mousemove", this.mouseMoveHandler, !1), 
    this.onMouseUpHandler = this.onMouseUp.bind(this);
    this.scene3d.container.addEventListener("mouseup", this.onMouseUpHandler, !1);
    
}

OOPTEST.System.prototype.onMouseUp = function(a) {
    a.preventDefault(), 
    
    this.mouseMoveHandler && (this.scene3d.container.removeEventListener("mousemove", this.mouseMoveHandler, !1), this.mouseMoveHandler = null), 
    this.onMouseUpHandler && this.scene3d.container.removeEventListener("mouseup", this.onMouseUpHandler, !1);
    
    var mouse = {};
    mouse.x = ( a.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( a.clientY / window.innerHeight ) * 2 + 1;
    
    var rayVector,
        distanceToCamera = -1;
    var vector = new THREE.Vector3(mouse.x, mouse.y, .5), 
    unproject_vector = this.projector.unprojectVector(vector, this.mainViewport);
    this.ray.direction = unproject_vector.subSelf(this.mainViewport.position).normalize();
    var intersects = THREE.Collisions.rayCastAll(this.ray);
    if (intersects.length > 0) {
        for (i = 0; i < intersects.length; i++) {
            var intersect = intersects[i];
            disToCameraX = intersect.origCenter.x - this.mainViewport.position.x, 
            disToCameraY = intersect.origCenter.y - this.mainViewport.position.y, 
            disToCameraZ = intersect.origCenter.z - this.mainViewport.position.z, 
            distance = disToCameraX * disToCameraX + disToCameraY * disToCameraY + disToCameraZ * disToCameraZ;
            if (distanceToCamera == -1 || distance < distanceToCamera){
                rayVector = intersects[i].origCenter, distanceToCamera = distance;
            }
        }
        if (rayVector == undefined){
            return;
        }else{
        	if (this.mouseDownButton == 0){
        		this.animDeltaX = rayVector.x - this.mainViewport.target.position.x; 
			    this.animDeltaY = rayVector.y - this.mainViewport.target.position.y; 
			    this.animDeltaZ = rayVector.z - this.mainViewport.target.position.z; 
			    this.moveToClickedSystem(this.animDeltaX + this.mainViewport.target.position.x, this.animDeltaY + this.mainViewport.target.position.y, this.animDeltaZ + this.mainViewport.target.position.z, rayVector.uid);
    		
        	}
            
        }
    }
    
}

OOPTEST.System.prototype.onMouseWheel = function(a) {
	
    a.preventDefault();
    var b = 0;
    a || (a = window.event), 
    a.wheelDeltaY != undefined && !isNaN(a.wheelDeltaY) ? b = a.wheelDeltaY : a.wheelDelta ? a.wheelDelta > 0 ? b = 120 : a.wheelDelta < 0 && (b = -120) : a.detail && (a.detail < 0 ? b = 120 : a.detail > 0 && (b = -120)), 
    b > 0 ? this.cameraRadius -= 2 * b + this.cameraRadius / 10 : this.cameraRadius += 2 * b * -1 + this.cameraRadius / 10; 
    this.cameraRadius < 1 && (this.cameraRadius = 1);
    //最大允许放大的倍数120
    this.cameraRadius < 120 * this.selectedSize ? this.cameraRadius = 120 * this.selectedSize : this.cameraRadius > 8e3 && (this.cameraRadius = 8e3); 
    a.returnValue = !1, 
    a.cancelBubble = !0;
    this.setRulerValue();
    
}

OOPTEST.System.prototype.onWindowResize = function() {
	
    this.mainViewport.aspect = window.innerWidth / window.innerHeight;
    this.updateCamera();
    this.scene3d.renderer.setSize( window.innerWidth, window.innerHeight );
    
}

OOPTEST.System.prototype.updateCamera = function() {
	
    this.mainViewport.position.x = this.mainViewport.target.position.x + this.smoothRadius * Math.sin(this.theta * this.PI360) * Math.cos(this.phi * this.PI360), 
    this.mainViewport.position.y = this.mainViewport.target.position.y + this.smoothRadius * Math.sin(this.phi * this.PI360), 
    this.mainViewport.position.z = this.mainViewport.target.position.z + this.smoothRadius * Math.cos(this.theta * this.PI360) * Math.cos(this.phi * this.PI360), 
    this.mainViewport.updateProjectionMatrix();
    
    this.gyroscope_viewport.position.x = this.gyroscope.position.x + 1500 * Math.sin(this.theta * this.PI360) * Math.cos(this.phi * this.PI360), 
    this.gyroscope_viewport.position.y = this.gyroscope.position.y + 1500 * Math.sin(this.phi * this.PI360), 
    this.gyroscope_viewport.position.z = this.gyroscope.position.z + 1500 * Math.cos(this.theta * this.PI360) * Math.cos(this.phi * this.PI360);
    this.gyroscope_viewport.lookAt(this.gyroscope.position);
    this.gyroscope_viewport.updateProjectionMatrix();
   
}

OOPTEST.System.prototype.setRulerValue = function() {
    var current_percent = this.cameraRadius/8e3 <= 0.05 ? 0 : this.cameraRadius/8e3;
    this.sceneScalePercent != current_percent && (
        this.sceneScalePercent = current_percent,
        (this.setInteractMap(this)['setZoomRuler'] && (this.setInteractMap(this)['setZoomRuler'](this.sceneScalePercent)))
    );
}

OOPTEST.System.prototype.renderHandler = function (){
	
	//this.updateCamera();
	
	if (this.flagThetaNumber < 100 && this.thetaDiffDiff > 0) {
        //主拓扑和周边数据信息加载前
        this.flagThetaNumber += 1;
        this.thetaDiffDiff -= 0.11;
        this.setRulerValue();
    }else{
        //重置标记startSetData，下达通知可以开始渲染拓扑和其它周边信息，并重置thetaDiffDiff为0，使得拓扑不在旋转
    	this.thetaDiffDiff = 0;
    	this.startSetData = true;
    }
    
    //以下为控制场景加载后摄像机所停留的角度和位置，无需关注
    this.smoothRadius > this.cameraRadius - .005 && this.smoothRadius < this.cameraRadius + .005 && (this.thetaDiffDiff = 0)
    this.doAnimation && (this.thetaDiff = this.thetaDiffDiff),
    this.phiAnimation && (this.phi > 60 && (this.phiDiff = (this.phi - 50) / 18), this.phi < 60 && (this.phiAnimation = !1)),
    this.phiDiff != 0 && (this.cameraChanged = !0, this.phiDiff *= .91, this.phi -= this.phiDiff, this.phiDiff < .001 && this.phiDiff > -0.001 && (this.phiDiff = 0)), 
    this.thetaDiff != 0 && (
        this.cameraChanged = !0, 
        this.thetaDiff *= .91, 
        this.theta -= this.thetaDiff, 
        this.theta < -720 ? this.theta = this.theta + 720 : this.theta > 720 && (this.theta = this.theta - 720), 
        this.thetaDiff < .001 && (this.thetaDiff > -0.001 && (this.thetaDiff = 0)),
        this.mainViewport.target.position = this.middlePoint
    )
    
    this.phi > 179 ? this.phi = 179 : this.phi < -179 && (this.phi = -179);
    if (this.smoothRadius != this.cameraRadius) {
        var a = this.smoothRadius - this.cameraRadius;
        this.smoothRadius -= a / 8; 
        this.cameraChanged = true; 
        //this.updateRotationSprite(); 
        this.smoothRadius > this.cameraRadius - .005 && this.smoothRadius < this.cameraRadius + .005 && (this.smoothRadius = this.cameraRadius);
    }
    
    this.cameraChanged && (this.updateCamera(), this.cameraChanged = !1);
        
    this.mainViewport.lookAt(this.middlePoint);
    
    for (i = 0; i < Space3D.MarkLibarary.length; i++){
    	this.updateRotationSprite(Space3D.MarkLibarary[i]);
    }
    
    
    //着色器相关
    //this.scene3d.renderer.clear();
	//this.composer.render( 0.01 );
}

OOPTEST.System.prototype.moveToClickedSystem = function(a, b, c, uid) {
	
	this.cameraRadius = 1600;
	
     if (this.moveCount < 23  && (a != this.mainViewport.target.position.x || b != this.mainViewport.target.position.y || c != this.mainViewport.target.position.z) ) {
        var d = this.animDeltaX * this.tweenAmount[this.moveCount] / 100, 
        e = this.animDeltaY * this.tweenAmount[this.moveCount] / 100, 
        f = this.animDeltaZ * this.tweenAmount[this.moveCount] / 100;
        this.moveCount == 22 ? (this.mainViewport.target.position.x = a, this.mainViewport.target.position.y = b, this.mainViewport.target.position.z = c) : (this.mainViewport.target.position.x += d, this.mainViewport.target.position.y += e, this.mainViewport.target.position.z += f), 
        this.middlePoint.x = this.mainViewport.target.position.x;
        this.middlePoint.y = this.mainViewport.target.position.y;
        this.middlePoint.z = this.mainViewport.target.position.z;
        this.updateCamera(), 
        this.moveCount++;
        requestAnimationFrame( this.moveToClickedSystem.bind( this, a, b, c, uid ) );
    } else{
        this.moveCount = 0;
        this.loadModel === "all" &&  this.setInteractMap(this)['openNodeInfo'](uid);
    }
    
}

OOPTEST.System.prototype.moveToNode = function(node_id) {
    var node = Topo.nodeIdDict[node_id];
    if (node){
        this.animDeltaX = node.x - this.mainViewport.target.position.x; 
        this.animDeltaY = node.y - this.mainViewport.target.position.y; 
        this.animDeltaZ = node.z - this.mainViewport.target.position.z; 
        this.moveToClickedSystem(this.animDeltaX + this.mainViewport.target.position.x, this.animDeltaY + this.mainViewport.target.position.y, this.animDeltaZ + this.mainViewport.target.position.z, node_id);
        return 1;
    }else{
        return 0;
    }
}

OOPTEST.System.prototype.updateRotationSprite = function(s) {
	var distance = s.position.distanceTo(this.mainViewport.position);
	var a = 200000 / distance;
	a < 45 && (a = 45);
    s.scale.set(a, a, a);
}

////////////////////////////////////////////////////////////////////////////////////

OOPTEST.System.prototype.initialize = function (){
	
	switch( this.loadModel ){
			
		case "all":
			this.initAllSpace();
			break;
			
		case "space2d":
			this.initSpace2D();
			break;
			
		case "space3d":
			this.initSpace3D();
			break;
			
		default:
			this.initAllSpace();
			break;
			
	}
	
}
	
OOPTEST.System.prototype.initSpace2D = function (){
	
	this.scene2d = new Space2D.Scene({
		type: this.dataModel
	});
	
	System = this.setInteractMap(this);
	
};
	
OOPTEST.System.prototype.initSpace3D = function (complateFun){
		
	var scene = this.scene3d = new Space3D.Scene({
		container: document.getElementById('topo'), 
		fogColor: 0x002240, 
		fogNear: 7000, 
		fogFar: 20000,
	});
	
	scene.dispatchEvent('resize');
		
	//创建主视口
	var mainViewport = this.mainViewport = new Space3D.Viewport({controler: true, radius: 3500, clearColor: 0x002240, enableClick: true, enableRollOver: true});
	//this.mainViewport.position.y += 2500;
	//this.mainViewport.fov = 45;
	
	//渲染场景
	scene.startAnimate();
	
	//创建陀螺仪
	var gyroscope = this.gyroscope = new Space3D.Gyroscope();
	gyroscope.position.set(40000,40000,40000);
	scene.add(gyroscope);
	
	//创建陀螺仪视口
	var gyroscope_viewport = this.gyroscope_viewport = new Space3D.Viewport({
		fov: 45, near: 1, far: 30000, top: 76, left: 11, width: 160, height: 120, 
		controler: true, clearColor: 0x00000, target: gyroscope.position
	});
	//gyroscope_viewport.controler.noPan = true;
	//gyroscope_viewport.controler.noZoom = true; 
	
	////////////////////////////////////////////////////////////////////////////////
	
	/*
	var renderModel = new THREE.RenderPass( scene, mainViewport );
	var effectBloom = new THREE.BloomPass( 1.0 );

	var effectHBlur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
	effectHBlur.uniforms[ 'h' ].value = 1.0 / window.innerWidth;

	var effectFocus = new THREE.ShaderPass( THREE.FocusShader );

	effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
	effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;

	effectFocus.renderToScreen = true;

	this.composer = new THREE.EffectComposer( scene.renderer );

	this.composer.addPass( renderModel );
	this.composer.addPass( effectHBlur );
	this.composer.addPass( effectBloom );
	this.composer.addPass( effectFocus );
	*/
	
	////////////////////////////////////////////////////////////////////////////////
	
	//创建地板
	var floor = new Space3D.Floor();
	scene.add(floor);
	//创建星空
	var star = new Space3D.Star({size: 100});
	scene.add(star);
	
	//创建拓扑引用
	//var topo;
	
	
	var dataModel = this.dataModel,
		_this = this;
	//获取detectList
	
	gateway = new OOPTEST.GatewayRequest();
	gateway.request(OOPTEST.Gateways['detectInfo'], function (detect_obj){
		//设定获取topo信息的参数列表
		OOPTEST.Gateways['topoInfo']['paras']['topo_id'] = detect_obj['topological_id'];
		gateway.request(OOPTEST.Gateways['topoInfo'], function (topo_info){
			_this.topo = Topo = new Space3D.TopoSystem({'data': topo_info, 'viewport': mainViewport, 'eventList': detect_obj['detect_list'], 'dataModel': dataModel});
			scene.add(_this.topo);
			//设定安全事件实时数据的参数列表
			OOPTEST.Gateways['topoEventInfo']['paras'] = Space3D.Utils.generateDetectObject(detect_obj.detect_list, detect_obj.detect_type);
			
			//获取安全事件实时数据
			if (dataModel == "history"){
				
				gateway.request(OOPTEST.Gateways['topoEventInfo'], topoEventInfoCallback.bind(_this));
				
			}else{
				
				gateway.timerRequest(OOPTEST.Gateways['topoEventInfo'], topoEventInfoCallback.bind(_this))
				
			}
			
			function topoEventInfoCallback(event_info){
				
				for (var i = 0; i < event_info.length ; i++){

                    detect_obj.detect_list.push({'id' : event_info[i].id, 'type' : event_info[i].type, 'start_event_id' : event_info[i].start_event_id}); 
                    detect_obj.detect_list.shift(); 
                    Topo.eventDict[event_info[i].type].setData(event_info[i]['result']);                     
                }
                
                OOPTEST.Gateways['topoEventInfo']['paras'] = Space3D.Utils.generateDetectObject( detect_obj.detect_list, detect_obj.detect_type );
                
			}
		});
	});
	
	this.addEvent();
	
}
	
OOPTEST.System.prototype.initAllSpace = function (){
		
	this.initSpace3D();
	
	this.scene3d.creationComplate(this.initSpace2D.bind(this));
	
}

OOPTEST.System.prototype.setInteractMap = function (_this){
	return {
		/* 以下由Space3D 调用 Space2D中的函数  */
		
		//刷新Space2D相关信息
		//'refreshSpace2D': Space2D.Refresh,
		//设置缩放比例尺
		'setZoomRuler': _this.scene2d && _this.scene2d.setZoomRuler.bind(_this.scene2d),
		//打开节点信息
		'openNodeInfo': _this.scene2d && _this.scene2d.OpenNodeInfo.bind(_this.scene2d),
		
		/*  以下由Space2D 调用 Space3D中的函数   */
		
		//设置安全事件的进度
		'fixedPosition': _this.moveToNode.bind(_this),
		
		'setRollbackBar': _this.scene2d && ( _this.scene2d.replayBar && _this.scene2d.replayBar.setRunBar.bind(_this.scene2d.replayBar)),
			}
};