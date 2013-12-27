
//======================================================================================
//  Description: 节点系统
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-19
//  Author: lvmy
//======================================================================================

Space3D.DashedLine = function (options){
    
    options = options || {};
    
    this.color = options.color !== undefined ? options.color : 0xff0000;
	this.opacity = options.opacity !== undefined ? options.opacity : 1;
	this.vertices = options.vertices !== undefined ? options.vertices : [];
	this.vertexColors = options.vertexColors !== undefined ? options.vertexColors : false;
	
    this.material = new THREE.LineBasicMaterial({color: this.color, opacity: this.opacity, linewidth: 2, vertexColors: this.vertexColors });
    this.geometry = new THREE.Geometry();
    this.geometry.vertices = this.vertices;
	
	if (this.vertexColors) {
		this.colors = options.colors !== undefined ? options.colors : [];
	
		if (this.colors.length == 0 && this.vertices.length > 0){
			
			for (var i = 0; i < this.vertices.length; i++){
				
				this.colors.push(new THREE.Color(this.color))
				
			}
			
		}
		this.geometry.colors = this.colors;
	}
	
    this.geometry.dynamic = true;
	
    THREE.Line.call(this, this.geometry, this.material, THREE.LinePieces);
    
}

Space3D.DashedLine.prototype = Object.create(THREE.Line.prototype);

Space3D.DashedLine.prototype.constructor = Space3D.DashedLine;
