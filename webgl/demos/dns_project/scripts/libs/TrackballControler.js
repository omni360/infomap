/**
 * @author Eberhard Graether / http://egraether.com/
 */

THREE.TrackballControler = function ( paras ) {
	
	var paras = paras || {};
	
	this.camera = paras.camera;
	
	this.domElement = paras.domElement !== undefined ? paras.domElement : document;
	this.PI360 = Math.PI / 360;

	this.rotateSpeed = 0.3,
	this.zoomSpeed = 0.5,
	this.panSpeed = 0.5,
	this.minDistance = 5,
	this.maxDistance = Infinity;	//Infinity;
	
	this.phi = paras.phi !== undefined ? paras.phi : 0, //纬度
	this.theta = paras.theta !== undefined ? paras.theta : 0,	//经度
	this.radius = paras.radius !== undefined ? paras.radius : 500,	//半径
	this.target = paras.target !== undefined ? paras.target : new THREE.Vector3();
		
	this.mouseDownPhi = 0,
	this.mouseDownTheta = 0;
	this.mouseDownPosition = new THREE.Vector2();
	this.mouseLastPosition = new THREE.Vector2();
	
	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousewheel', this.mousewheel.bind(this), false );
	this.domElement.addEventListener( 'DOMMouseScroll', this.mousewheel.bind(this), false ); // firefox
	
	this.domElement.addEventListener( 'mousewheel', function (event){
		console.log(event)
	});
	
	
	this.domElement.addEventListener( 'mousedown', this.mousedown.bind(this), false );
};

THREE.TrackballControler.prototype = Object.create( THREE.EventDispatcher.prototype );

THREE.TrackballControler.prototype.mousedown = function (event){
	
	event.preventDefault();
	event.stopPropagation();
	
	this.mouseDownPosition.x = event.clientX;
	this.mouseDownPosition.y = event.clientY;
	
	this.mouseDownPhi = this.phi;
	this.mouseDownTheta = this.theta;
	
	this.onMouseMoveHandler = this.mousemove.bind(this);
	this.onMouseUpHandler = this.mouseup.bind(this);
	
	this.domElement.addEventListener( 'mousemove', this.onMouseMoveHandler, false );
	this.domElement.addEventListener( 'mouseup', this.onMouseUpHandler, false );
	
	if (event.button == 1){
		
		console.log(
    		'{ ' + 
		    	'phi: ' + this.phi + ', ' +
		    	'theta: ' + this.theta + ', ' +
		    	'targetX: ' + this.target.x + ', ' +
		    	'targetY: ' + this.target.y + ', ' +
		    	'targetZ: ' + this.target.z + ', ' +
		    	'radius: ' + this.radius +
		    ' },'
	   );
	}
};

THREE.TrackballControler.prototype.mousemove = function (event){
	
	event.preventDefault();
	event.stopPropagation();
	
	this.mouseLastPosition.set(event.clientX, event.clientY);
		
	switch(event.button){
		
		//鼠标左键旋转
		case 0:
			
			this.theta = this.mouseDownTheta + (this.mouseDownPosition.x - this.mouseLastPosition.x) * this.rotateSpeed * 2;
			this.phi = this.mouseDownPhi - (this.mouseDownPosition.y - this.mouseLastPosition.y) * this.rotateSpeed;
			this.phi = Math.min(179, Math.max(-179, this.phi));
			break;
		
		//鼠标右键平移
		case 2:
			//计算camera和target之间的向量
			var vCameraTarget = new THREE.Vector3().subVectors(this.target, this.camera.position);
			//使用差乘，计算vCameraTarget与camera.up构成面的垂直向量
			var vNormal = new THREE.Vector3().crossVectors(this.camera.up, vCameraTarget);

			var moveDistanceX = this.mouseLastPosition.x - this.mouseDownPosition.x;
            var moveDistanceY = this.mouseLastPosition.y - this.mouseDownPosition.y;
            
        	moveDistanceX *= this.radius * this.panSpeed / 3000;
        	moveDistanceY *= this.radius * this.panSpeed / 3000;
        	
        	var mergeVector = new THREE.Vector3().addVectors(
        			vNormal.multiplyScalar(moveDistanceX), 
        			vCameraTarget.multiplyScalar(moveDistanceY)
        		).multiplyScalar(0.01);
        	
        	this.camera.position.addVectors(this.camera.position, mergeVector);
        	this.target.addVectors(this.target, mergeVector);
        	
        	this.mouseDownPosition.set(event.clientX, event.clientY);
        	
			break;
	}
		
};

THREE.TrackballControler.prototype.mouseup = function (event){
	
	event.preventDefault();
	event.stopPropagation();
	
	this.domElement.removeEventListener( 'mousemove', this.onMouseMoveHandler, false);
	this.domElement.removeEventListener( 'mouseup', this.onMouseUpHandler, false);
	
};

THREE.TrackballControler.prototype.mousewheel = function (event){
	
	event.preventDefault();
	event.stopPropagation();
	
	var delta = event.wheelDeltaY;
	
	if (delta > 0){
		
		this.radius -= delta / 10 * this.zoomSpeed + this.radius / 10 * this.zoomSpeed;
		
	}else{
		
		this.radius += -delta / 10 * this.zoomSpeed + this.radius / 10 * this.zoomSpeed;
		
	}
	
	console.log(event);
	
	this.radius = this.radius < this.minDistance ? this.minDistance : this.radius;
	this.radius = this.radius > this.maxDistance ? this.maxDistance : this.radius;
	
};

THREE.TrackballControler.prototype.moveTo = function (target, radius, phi, theta){
	
	this.target = target;
	this.radius = radius;
	this.phi = phi;
	this.theta = theta;
	
};

THREE.TrackballControler.prototype.update = function (){
	
	this.theta %= 720;
	
	this.camera.position.x = this.target.x + this.radius * Math.sin(this.theta * this.PI360) * Math.cos(this.phi * this.PI360), 
    this.camera.position.y = this.target.y + this.radius * Math.sin(this.phi * this.PI360), 
    this.camera.position.z = this.target.z + this.radius * Math.cos(this.theta * this.PI360) * Math.cos(this.phi * this.PI360),  
    this.camera.lookAt(this.target);
    this.camera.updateProjectionMatrix();
	
};
