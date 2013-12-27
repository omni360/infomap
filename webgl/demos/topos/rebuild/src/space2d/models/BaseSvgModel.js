
//======================================================================================
//  Description: 创建SVG基础类
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

Space2D.BaseSvgModel = function (options){
	options = options || {};
	this.containerName = options.containerName !== undefined ? options.containerName : 'body';
	this.container = this.containerName !== 'body' ? $('#'+this.containerName) : $('body');
	this.idName = options.idName !== undefined ? options.idName : 'svgDiv';
	this.className = options.className !== undefined ? options.className : '';
	this.width = options.width !== undefined ? options.width : window.innerWidth;
	this.height = options.height !== undefined ? options.height : window.innerHeight;
	this.CreatedDiv();
	this.CreatedSvg();
	// Created Svg
}
Space2D.BaseSvgModel.prototype.CreatedDiv = function (){
	var div_html_str = '<div id="'+this.idName+'" class= "'+this.className+'"></div>';
	this.container.append(div_html_str);
	this.dom = $('#'+this.idName);
}

Space2D.BaseSvgModel.prototype.CreatedSvg = function (){
	this.raphael = Raphael(this.idName, this.width, this.height);
}

Space2D.BaseSvgModel.prototype.GetSvgDom = function (){
	return this.raphael;
}

Space2D.BaseSvgModel.prototype.customPath = function (a,b){
	
	switch(a){
		case 'M':
			this.cuspath = a + b[0] + ',' +  b[1];
			break;
		case 'L':
			this.cuspath = a + b[0] + ',' + b[1];
			break;
		case 'A':
			this.cuspath = a + b[0] + ',' + b[1] + ',' + b[2] + ',' + b[3] + ',' + b[4];
			break;
	}
	// console.info(this.cuspath);
	return this.cuspath;
}