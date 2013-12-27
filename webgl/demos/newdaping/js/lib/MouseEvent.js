var MouseEvent = function(options){
	var me = this;
	
	me.currentpoint = {
		x: 0,
		y: 0
	}
	
	me.contextMenu = options.contextMenu === undefined ? options.contextMenu : true ;
	
	if(options.domElement){
		me.domElement = options.domElement;
	}else{
		return false;
	}
	
	me.mousedown = function( event ) {
		if ( me.enabled === false ) return;
		event.preventDefault();
		event.stopPropagation();
		
		options.mousedown && options.mousedown( event , me);
		
		document.addEventListener( 'mousemove', me.mousemove, false );
		document.addEventListener( 'mouseup', me.mouseup, false );
	}
	
	me.mousemove = function( event ) {
		if ( me.enabled === false ) return;
	
		event.preventDefault();
		event.stopPropagation();
		
		// 
		options.mousemove && options.mousemove( event , me);
	}
	
	me.mouseup = function( event ) {

		if ( me.enabled === false ) return;
	
		event.preventDefault();
		event.stopPropagation();
	
		options.mouseup && options.mouseup( event , me);
	
		document.removeEventListener( 'mousemove', me.mousemove );
		document.removeEventListener( 'mouseup', me .mouseup );
	}
	
	
	me.mousewheel = function( event ) {
		if ( me.enabled === false ) return;
		event.preventDefault();
		event.stopPropagation();
		
		var delta = 0;
		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
			delta = event.wheelDelta / 40;
		} else if ( event.detail ) { // Firefox
			delta = - event.detail / 3;
		}
		options.mousewheel && options.mousewheel(delta,me);
		// _zoomStart.y += delta * 0.01;
	}
	
	me.contextMenu &&  me.domElement.addEventListener( 'contextmenu', 
		function ( event ) { 
			event.preventDefault(); 
		}, false );

	me.domElement.addEventListener( 'mousedown', me.mousedown, false );

	me.domElement.addEventListener( 'mousewheel', me.mousewheel, false );
	me.domElement.addEventListener( 'DOMMouseScroll', me.mousewheel, false ); // firefox
}

