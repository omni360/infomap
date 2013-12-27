
//======================================================================================
//  Description: 创建Message SVG类 
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

Space2D.ZoomRulerSvgModel = function (options){
	Space2D.BaseSvgModel.apply(this,arguments);
	this.CreateBgrect();
	this.CreateRuler();
}

Space2D.ZoomRulerSvgModel.prototype = Object.create(Space2D.BaseSvgModel.prototype);

Space2D.ZoomRulerSvgModel.prototype.CreateBgrect = function (){
	this.GetSvgDom().rect(0, 0, this.width, this.height).attr({opacity: 0});
}

Space2D.ZoomRulerSvgModel.prototype.CreateRuler = function (){
	this.padding = [3,12];
	// this.GetSvgDom()
		// .path(this.border(40,277,1,6.5,3,2)).attr({stroke: "rgba(14,165,204,0.5)", "stroke-width": 1.5,fill: "none"});
	this.GetSvgDom()
		.path(this.border(40,277,7,7,3,2))
		.attr({stroke: "rgba(14,165,204,0.8)", "stroke-width": 1.5,fill: "rgba(21, 21,21, 0.48)"});
	for(i = 0; i < 116;i++){
        i%2==0 && this.GetSvgDom().rect((24+this.padding[0]), (13+this.padding[1])+(i*2.1), .5, 1).attr({stroke: "rgba(14,165,204,0.6)", "stroke-width": 1.3});
    }
    for(i = 0 ; i < 19 ; i++){
        if(i != 4 && i != 9 && i != 14){
            this.duT((25+this.padding[0]),((25+this.padding[1])+(i*12)));
        }
    }
    for(i = 0 ; i < 5 ; i++){ 
        this.duO((25+this.padding[0]),((13+this.padding[1])+(i*60)));
    }
    for(i = 0 ; i < 2 ; i++){
        this.duZ((24.5+this.padding[0]),(i*240)+(6+this.padding[1])+i*15);
    }
    this.rulerflag = this.GetSvgDom().path(this.getflagpath((9+this.padding[0]),(249+this.padding[1])))
    								 .attr({stroke: "#B16F0F", "stroke-width": 1.6,fill: "#B16F0F","fill-opacity": 0.9});
}

Space2D.ZoomRulerSvgModel.prototype.border = function(w,h,x,y,R,r){
	var h1 = 11;
    return (
    	'M'+x+','+(y+R)+
    	'v'+ (h-2*R)+
    	'L'+ (x+R)+ ','+ (y+h)+
    	'h'+ h1 +
    	'L'+ (x+R+h1+r) + ',' + (y+h-r) +
    	'h'+ (w-2*(R+r+h1)) +
    	'L'+ (x+w-h1-R) + ',' + (y+h)+
    	'h'+ h1+
    	'L'+ (x+w) + ',' + (y+h-R) +
    	'v-'+ (h-2*R) +
    	'L'+ (x+w-R) + ',' + y +
    	'h-'+ h1 +
    	'L'+ (x+w-R-r-h1) + ',' + (y+r) + 
    	'h-'+ (w-2*(R+r+h1)) +
    	'L'+ (x+R+h1) + ',' + y +
    	'h-'+ h1 +
    	'z'
    );
}

Space2D.ZoomRulerSvgModel.prototype.duT = function(_x,_y){
    this.GetSvgDom().rect(_x-5, _y, 9, .7).attr({stroke: "rgba(14,165,204,1)", "stroke-width": 1,fill: "rgba(14,165,204,1)"});
}
Space2D.ZoomRulerSvgModel.prototype.duZ = function (_x,_y){
    this.GetSvgDom().circle(_x, _y, 3).attr({stroke: "rgba(14,165,204,0.8)", "stroke-width": 1.5,fill: "none"});
}
Space2D.ZoomRulerSvgModel.prototype.duO = function (_x,_y){
    this.GetSvgDom().rect(_x-10.5, _y, 20, .9).attr({stroke: "rgba(14,165,204,1)", "stroke-width": 1,fill: "rgba(14,165,204,1)"});
}
Space2D.ZoomRulerSvgModel.prototype.getflagpath = function (x,y,d){
	d = 22;
    return ('M'+(0+x)+','+(0+y)+'v8L'+(9+x)+','+(4+y)+'z'+'M'+(9+x+d)+','+(0+y)+'v8L'+(0+x+d)+','+(4+y)+'z');
}

Space2D.ZoomRulerSvgModel.prototype.setRuler = function(_value){
	// console.info((_value*240)+2)[0]);
    this.rulerflag.animate({path: this.getflagpath((9+this.padding[0]),(_value*240)+(9+this.padding[1]))}, 500, "<>");
}




