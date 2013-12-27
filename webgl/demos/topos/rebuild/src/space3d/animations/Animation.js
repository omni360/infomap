
//======================================================================================
//  Description: 基础动画类
//  Created Date: 2013-01-10
//  Modify Date: 2013-01-10
//  Author: lvmy
//======================================================================================

Space3D.Animation = {}

//缩放、聚焦等
Space3D.Animation.zoom = function ( obj, targetPosition, zoomSpeed, zoomCount, zoomPath ){
	
	var currentPosition = obj.position;
	
	targetPosition = targetPosition instanceof THREE.Vector3 ? targetPosition : new THREE.Vector3();
	zoomSpeed = zoomSpeed !== undefined ? ( zoomSpeed > 1 && 1 ) : 0.05;
	zoomCount = zoomCount !== undefined ? zoomCount : 0;
	
	if ( currentPosition ) {
		
		distance = targetPosition.distanceTo(currentPosition);
		
		if (distance > 0){
			
			zoomCount += zoomSpeed;
			
			if (zoomCount > 1) zoomCount = 1;
			
			zoomPath = zoomPath !== undefined ? zoomPath : new THREE.LineCurve3(currentPosition, targetPosition);
			
			switch( zoomCount ){
                case 0:
                    obj.position = zoomPath.v1;
                    break;
                case 1:
                    obj.position = zoomPath.v2;
                    break;
                default:
                    obj.position = zoomPath.getPoint( zoomCount );
            }
            
			requestAnimationFrame( this.zoom.bind( this, obj, targetPosition, zoomSpeed, zoomCount, zoomPath ) );
		
		}
	}
}

//缩放、聚焦等
Space3D.Animation.focus = function ( obj1, obj2, targetPosition, zoomSpeed, zoomCount, zoomPath ){
	
	
	
	var currentPosition = obj1.position.clone();
	
	targetPosition = targetPosition instanceof THREE.Vector3 ? targetPosition : new THREE.Vector3();
	zoomSpeed = zoomSpeed !== undefined ? ( zoomSpeed > 1 ? 1 : zoomSpeed) : 0.05;
	zoomCount = zoomCount !== undefined ? zoomCount : 0;
	
	if ( currentPosition ) {
		
		distance = targetPosition.distanceTo(currentPosition);
		
		if (distance > 0){
			
			zoomCount += zoomSpeed;
			
			
			if (zoomCount > 0.5) { zoomCount = 0.5 };
			zoomPath = zoomPath instanceof THREE.LineCurve3 ? zoomPath : new THREE.LineCurve3(currentPosition, targetPosition);
			
			console.log(targetPosition)
			switch( zoomCount ){
                case 0:
                    obj1.position = zoomPath.v1;
                    // obj2.position = targetPosition.origVector;
                    // obj2.target.x = obj1.position.x;
                    // obj2.target.y = obj1.position.y;
                    // obj2.target.z = obj1.position.z;					                    break;
                    
                case 1:
                    obj1.position = zoomPath.v2;
                    // obj2.position = targetPosition.origVector;
                    // obj2.target.x = obj1.position.x;
                    // obj2.target.y = obj1.position.y;
                    // obj2.target.z = obj1.position.z;					                    break;
                    
                default:
                    obj1.position = zoomPath.getPoint( zoomCount );
                    // obj2.position = targetPosition.origVector;
                    // obj2.target.x = obj1.position.x;
                    // obj2.target.y = obj1.position.y;
                    // obj2.target.z = obj1.position.z;					
                    break;
            }
            
			requestAnimationFrame( this.focus.bind( this, obj1, obj2, targetPosition, zoomSpeed, zoomCount, zoomPath ) );
		
		}
	}
}

//旋转动画
Space3D.Animation.rotate = function ( targetObject, rotateAxis, rotateSpeed ){
	
	
	
}

//高亮动画
Space3D.Animation.highLight = function ( targetObject, texture, color, size ){
	
	
	
}

//线条移动动画
Space3D.Animation.lineVerticesMove = function (line, targetPosition, moveSpeed){
	
	
	
}


Animation = Space3D.Animation;
