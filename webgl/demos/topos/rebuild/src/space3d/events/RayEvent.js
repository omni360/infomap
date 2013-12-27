
//======================================================================================
//  Description: 射线事件
//  Created Date: 2012-12-18
//  Modify Date: 2012-01-07
//  Author: lvmy
//======================================================================================

Space3D.RayEvent = function (enableClick, enableRoll, viewport){
    
    
    this.enableClick = enableClick !== undefined ? enableClick : true;
    this.enableRoll = enableRoll !== undefined ? enableRoll : true;
    this.viewport = viewport instanceof Space3D.Viewport ? viewport : null;
    
    this.mouse = { x: 0, y: 0 };
    
    this.projector = Space3D.Projector;
    this.ray = new THREE.Ray();
    this.mouseRollHandler = this.onDocumentMouseRollHandler.bind(this);
    this.mouseClickHandler = this.onDocumentMouseClickHandler.bind(this);
    this.viewport && (
        this.enableRoll && document.addEventListener( 'mousemove', this.mouseRollHandler, false ),
        this.enableClick && document.addEventListener( 'click', this.mouseClickHandler, false )
    );
    
    this.selectNode = null;
    this.rotateCount = 0; // <= 10
    this.distance = 0;
    
    Space3D.Event.call(this);
    
}

Space3D.RayEvent.prototype = Object.create(Space3D.Event.prototype);

Space3D.RayEvent.prototype.constructor = Space3D.RayEvent;

Space3D.RayEvent.prototype.onDocumentMouseRollHandler = function (event){
    event.preventDefault();

    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.selectNode = this.getRayPositoin();
    if ( this.selectNode !== undefined ) {
    	//console.log(this.selectNode)
    }
}

Space3D.RayEvent.prototype.onDocumentMouseClickHandler = function (event){
    event.preventDefault();

    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.selectNode = this.getRayPositoin();
    if ( this.selectNode !== undefined ) {
    	
    	this.origVector = this.viewport.controler.target.clone();
    	this.moveToSelectNode(this.selectNode);
    	
    }
    
}

Space3D.RayEvent.prototype.moveToSelectNode = function (vector){
	
	Animation.focus(this.viewport, this.viewport.controler, vector)
	/*
	if (this.rotateCount <= 10){
		if (this.rotateCount == 10){
			this.viewport.controler.target = vector.clone();
			this.origVector = this.viewport.controler.target.clone();
			this.distance = vector.distanceTo(this.viewport.position);
		}else{
			var diff_x = (vector.x - this.origVector.x) / 10;
			var diff_y = (vector.y - this.origVector.y) / 10;
			var diff_z = (vector.z - this.origVector.z) / 10;
			this.viewport.controler.target.x += diff_x;
			this.viewport.controler.target.y += diff_y;
			this.viewport.controler.target.z += diff_z;
			
		}
		this.rotateCount += 1;
		requestAnimationFrame(this.moveToSelectNode.bind(this, vector));
	}else{
		
		var diff_x = (vector.x - this.viewport.position.x) / 20;
		var diff_y = (vector.y - this.viewport.position.y) / 20;
		var diff_z = (vector.z - this.viewport.position.z) / 20;
		var radius = this.viewport.radius;
		if (this.distance > radius + 300){
			this.viewport.position.x += diff_x;
			this.viewport.position.y += diff_y;
			this.viewport.position.z += diff_z;
			this.distance = vector.distanceTo(this.viewport.position);
			if (this.distance < radius){
				this.distance = radius;
			}
			requestAnimationFrame(this.moveToSelectNode.bind(this, vector));
		}else if (this.distance < radius - 300){
			this.viewport.position.x -= diff_x;
			this.viewport.position.y -= diff_y;
			this.viewport.position.z -= diff_z;
			this.distance = vector.distanceTo(this.viewport.position);
			if (this.distance > radius){
				this.distance = radius;
			}
			requestAnimationFrame(this.moveToSelectNode.bind(this, vector));
		}else{
			this.rotateCount = 0;
			this.focusCount = 0;
		}
	}
	*/
}

Space3D.RayEvent.prototype.getRayPositoin = function (){
    
    this.update();
    
    if (this.viewport){
        var rayVector,
            distanceToCamera = -1;
        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, .5), 
        unproject_vector = this.projector.unprojectVector(vector, this.viewport);
        this.ray.direction = unproject_vector.subSelf(this.viewport.position).normalize();
        var intersects = THREE.Collisions.rayCastAll(this.ray);
        
        if (intersects.length > 0) {
            for (i = 0; i < intersects.length; i++) {
                var intersect = intersects[i];
                disToCameraX = intersect.center.x - this.viewport.position.x, 
                disToCameraY = intersect.center.y - this.viewport.position.y, 
                disToCameraZ = intersect.center.z - this.viewport.position.z, 
                distance = disToCameraX * disToCameraX + disToCameraY * disToCameraY + disToCameraZ * disToCameraZ;
                if (distanceToCamera == -1 || distance < distanceToCamera){
                    rayVector = intersects[i].origCenter, distanceToCamera = distance;
                }
            }
            if (rayVector == undefined){
                return;
            }else{
                //console.log(rayVector);
                return rayVector;
            }
        }
    }
}

Space3D.RayEvent.prototype.update = function (){
    THREE.Collisions.update(this.viewport);
}



