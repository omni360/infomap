
//======================================================================================
//  Description: 视口类
//  Created Date: 2012-12-13
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.ViewportLibrary = [];

Space3D.Viewport = function (options){
    /*
     * fov, aspect, near, far, target, //视口开角，宽高比，最近可见距离，最远可见距离, 目标坐标
     * left, bottom, width, height, 
     * controler: true, clearColor: 0x8c8c8c, 
     * lookAtPosition:THREE.Vector3(),
     * 
     */
    
    this.options = options;
    
    this.enableResize = this.options.enableResize !== undefined ? this.options.enableResize : true;
    
    this.fov = this.options.fov !== undefined ? this.options.fov : 50;
    this.aspect = this.options.aspect !== undefined ? this.options.aspect : this.width / this.height;
    this.near = this.options.near !== undefined ? this.options.near : 1;
    this.far = this.options.far !== undefined ? this.options.far : 30000;
    
    this.target = this.options.target !== undefined ? this.options.target : new THREE.Object3D();
    
    //this.left = this.options.left !== undefined ? this.options.left : 0;
    //this.top = this.options.top !== undefined ? this.options.top : 0;
    
    this.scene = this.options.scene !== undefined ? this.options.scene : {container: document.body};
    
    this.right = this.options.right !== undefined ? this.options.right : 0;
    this.bottom = this.options.bottom !== undefined ? this.options.bottom : 0;
    this.options.width !== undefined ? ( this.width = this.options.width, this.enableResize = false) : this.width = $(this.scene.container).width();
    this.options.height !== undefined ? ( this.height = this.options.height, this.enableResize = false) : this.height = $(this.scene.container).height();
    
    this.target = this.options.target instanceof THREE.Vector3 ? this.options.target : new THREE.Vector3();
    this.radius = this.options.radius !== undefined ? this.options.radius : 1600;
    this.clearColor = this.options.clearColor || 0x000000;
    
    //this.options.controler && this.createControler();
    
    this.enableClick = this.options.enableClick;
    this.enableRoll = this.options.enableRoll;
        
    THREE.PerspectiveCamera.call(this, this.fov, this.aspect, this.near, this.far);
    
    this.position = this.target.clone();
    this.position.z += this.radius;
    
    Space3D.ViewportLibrary.push( this );
    
    //if (this.enableClick || this.enableRoll) 
    //    this.rayEvent = new Space3D.RayEvent(this.enableClick,this.enableRoll,this);
}

Space3D.Viewport.prototype = Object.create(THREE.PerspectiveCamera.prototype);

Space3D.Viewport.prototype.constructor = THREE.PerspectiveCamera;

Space3D.Viewport.prototype.createControler = function (){
    this.controler = new THREE.TrackballControls(this);
    
    this.controler.target = this.target,
    this.controler.rotateSpeed = .1,
    this.controler.zoomSpeed = 3,
    this.controler.panSpeed = 0.1,
    this.controler.noZoom = false,
    this.controler.noPan = false,
    this.controler.staticMoving = false,
    this.controler.minDistance = 500,
    this.controler.maxDistance = 15000,
    //this.controler.dynamicDampingFactor = 0.15,
    this.controler.keys = [ 65, 83, 68 ]
}

Space3D.Viewport.prototype.resizeHandler = function (){
	
    this.enableResize && (
       this.width = $(this.scene.container).width(),
       this.height = $(this.scene.container).height()
    );
    this.updateProjectionMatrix();
    this.controler && this.controler.handleResize();
    
}

Space3D.Viewport.prototype.update = function (){
    this.updateProjectionMatrix();
    this.aspect = this.width / this.height;
    this.controler && this.controler.update();
    this.center && this.lookAt(this.center);
    //this.rayEvent && this.rayEvent.update();
}
