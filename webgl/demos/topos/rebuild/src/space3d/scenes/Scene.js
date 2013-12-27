
//======================================================================================
//  Description: 场景的封装，一个页面有且仅能有一个场景
//  Created Date: 2012-12-13
//  Modify Date: 2012-12-17
//  Author: lvmy
//======================================================================================

Space3D.Scene = function (options){
    
    THREE.Scene.call( this );
    
    this.container = options.container !== undefined ? options.container : document.body;
    this.fogColor = options.fogColor !== undefined ? options.fogColor : null;
    this.fogNear = options.fogNear !== undefined ? options.fogNear : 1;
    this.fogFar = options.fogFar !== undefined ? options.fogFar : 1;
    
    //console.log
    
    this.fogColor && (this.fog = new THREE.Fog( this.fogColor, this.fogNear, this.fogFar));
    this.renderer = new THREE.WebGLRenderer({clearAlpha: 1, antialias :true, maxLights : 10}), 
    //this.renderer.autoClear = false;
    //this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize($(this.container).width(), $(this.container).height());
    this.container.appendChild(this.renderer.domElement); 
    
}

Space3D.Scene.prototype = Object.create( THREE.Scene.prototype );

Space3D.Scene.prototype.constructor = THREE.Scene;

Space3D.Scene.prototype.dispatchEvent = function (event_type){
    switch(event_type){
        case "resize":
            new Space3D.ResizeEvent(this);
            break;
        default:
            new Space3D.ResizeEvent(this);
            break;
    }
}

Space3D.Scene.prototype.startAnimate = function (){
	
    for (i = 0; i < Space3D.ViewportLibrary.length; i++){
    	if (i == 0){
    		//this.renderer.setViewport( Space3D.ViewportLibrary[i].left, window.innerHeight - Space3D.ViewportLibrary[i].top - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        //this.renderer.setScissor( Space3D.ViewportLibrary[i].left, window.innerHeight - Space3D.ViewportLibrary[i].top - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        if (Space3D.ViewportLibrary[i].right == 0 && Space3D.ViewportLibrary[i].bottom == 0){
	        	this.renderer.setViewport( 0, 0, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        	this.renderer.setScissor( 0, 0, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	    	}else{
	        	//this.renderer.setViewport( window.innerWidth - Space3D.ViewportLibrary[i].right, Space3D.ViewportLibrary[i].bottom - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        	//this.renderer.setScissor( window.innerWidth - Space3D.ViewportLibrary[i].right, Space3D.ViewportLibrary[i].bottom - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        	this.renderer.setViewport( $(this.container).width() - Space3D.ViewportLibrary[i].right, Space3D.ViewportLibrary[i].bottom - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        	this.renderer.setScissor( $(this.container).width() - Space3D.ViewportLibrary[i].right, Space3D.ViewportLibrary[i].bottom - Space3D.ViewportLibrary[i].height, Space3D.ViewportLibrary[i].width, Space3D.ViewportLibrary[i].height );
	        }
	        this.renderer.enableScissorTest ( true );
	        this.renderer.setClearColorHex( Space3D.ViewportLibrary[i].clearColor, 1 );
	        this.renderer.render( this,  Space3D.ViewportLibrary[i]);
	        Space3D.ViewportLibrary[i].update();
    	}
    }
    
    TWEEN.update();
    this.extendAnimate();
    requestAnimationFrame(this.startAnimate.bind(this));
    
}

Space3D.Scene.prototype.extendAnimate = function (){
    //console.log("Don't have any extend animate function!")
}

Space3D.Scene.prototype.creationComplate = function (fun){
	fun = fun !== undefined ? fun : function(){};
	fun();
}

//this.creationComplate = function(){};
