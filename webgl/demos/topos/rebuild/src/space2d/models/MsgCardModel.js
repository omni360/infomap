
//======================================================================================
//  Description: 日志信息实时显示功能
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

Space2D.MsgCardModel = function (options){
	options = options || {};
	
	this.svgDom = options.svgDom;
	this.msgStatus = options.msgStatus;
	this.msgStrLeft = options.msgStrLeft;
	this.msgStrRight = options.msgStrRight;
	this.msgIp = options.msgIp;
	this.msgTime = options.msgTime;
	this.fontFamiy = '微软雅黑'
	
	this.getMsgCard();
}
Space2D.MsgCardModel.prototype.init = function(){	
	
}
Space2D.MsgCardModel.prototype.getMsgCard = function(){
	this.msgSet = this.createMessageSet();
	this.msgBg = this.createMessageBg();
	this.msgSet.push(this.msgBg);
	this.msgSet.push(this.createMessageTitbg());
	this.msgSet.push(this.createMessageTitle(this.msgStatus));
	this.msgSet.push(this.createMessageLine());
	this.icon = this.createMessageIcon()
	this.msgSet.push(this.icon);
	this.msgSet.push(this.createMessageStrI(this.msgStrLeft));
	this.msgSet.push(this.createMessageStrII(this.msgStrRight));
	this.msgSet.push(this.createMessageIp(this.msgIp))
	this.msgSet.push(this.createMessageTime(this.msgTime));
}

Space2D.MsgCardModel.prototype.getMsgCardIcon = function(){
	return this.icon;
}

Space2D.MsgCardModel.prototype.getMsgCardSet = function(){
	return this.msgSet;
}

Space2D.MsgCardModel.prototype.getMsgCardBg = function(){
	return this.msgBg;
}

Space2D.MsgCardModel.prototype.createMessageBg = function(){
	var _attr,_x=410,_y=260;
    switch(this.msgStatus){
    	case '1':
    		_attr = ["#ef4136",0];
    		break;
    	case '2':
    		_attr = ["#055776",0];
    		break;
    	case '3':
    		_attr = ["#BF5D00",0];
    		break;
    	case '4':
    		_attr = ["#840006",0];
    		break;
    	case '5':
    		_attr = ["#075C24",0];
    		break;
    }
	return this.svgDom.path('M'+(1+_x)+','+(1+_y)+'h208v38L'+(201+_x)+','+(45+_y)+'h-200v-45').attr({
				stroke: _attr[0], "stroke-width": _attr[1], fill: _attr[0]
		});
}
Space2D.MsgCardModel.prototype.getMessageBgPath = function(_cx,_cy){
	var _x=410+_cx,_y=260+_cy;
	return ['M'+(1+_x)+','+(1+_y)+'h208v38L'+(201+_x)+','+(45+_y)+'h-200v-45']
}
// OOPTEST.MsgCardModel.prototype.createMessageBg = function(){
	// var _attr,_x=410,_y=260;
    // switch(this.msgStatus){
    	// case 1:
    		// _attr = ["#ef4136",0];
    		// break;
    	// case 2:
    		// _attr = ["#055776",0];
    		// break;
    	// case 3:
    		// _attr = ["#BF5D00",0];
    		// break;
    	// case 4:
    		// _attr = ["#075C24",0];
    		// break;
    	// case 5:
    		// _attr = ["#840006",0];
    		// break;
    // }
	// return this.svgDom.path('M'+(1+_x)+','+(1+_y)+'h208v38L'+(201+_x)+','+(45+_y)+'h-200v-45').attr({
				// stroke: _attr[0], "stroke-width": _attr[1], fill: _attr[0]
			// }).hide();
// }
Space2D.MsgCardModel.prototype.createMessageTitbg = function(){
	var _attr,_x=322,_y=261;
    switch(this.msgStatus){
    	case '1':
    		_attr = ["#ef4136",0];
    		break;
    	case '2':
    		_attr = ["#055776",0];
    		break;
    	case '3':
    		_attr = ["#BF5D00",0];
    		break;
    	case '4':
    		_attr = ["#840006",0];
    		break;
    	case '5':
    		_attr = ["#075C24",0];
    		break;
    }
    return this.svgDom.rect(_x, _y, 90, 44).attr({
        		stroke: _attr[0], "stroke-width": _attr[1], fill: _attr[0]
	       });
}
Space2D.MsgCardModel.prototype.createMessageTitle = function(){
	var titleText = '';
    switch(this.msgStatus){
    	case '1':
    		titleText += '写入文件';
    		break;
    	case '2':
    		titleText += '读取文件';
    		break;
    	case '3':
    		titleText += '打开文件';
    		break;
    	case '4':
    		titleText += '创建进程';
    		break;
    	case '5':
    		titleText += '网络事件';
    		break;
    }
	return this.svgDom.text( 357, 283, titleText).attr(this.setFontStyle("#ffffff", 12, this.fontFamiy, "start"));
}
Space2D.MsgCardModel.prototype.createMessageLine = function(){
    return this.svgDom.path('M416,279h192z').attr({
        stroke: "#FFF",
        "stroke-width": .3,
        fill: "#FFF"
    });
}
Space2D.MsgCardModel.prototype.createMessageIcon = function(){
	var imgurl = '';
    switch(this.msgStatus){
    	case '1':
    		imgurl += Space2D.Globle.WriteFile;
    		break;
    	case '2':
    		imgurl += Space2D.Globle.ReadFile;
    		break;
    	case '3':
    		imgurl += Space2D.Globle.OpenFile;
    		break;
    	case '4':
    		imgurl += Space2D.Globle.CreatePro;
    		break;
    	case '5':
    		imgurl += Space2D.Globle.NetEvent;
    		break;
    }
    return this.svgDom.image( imgurl, 327, 271, 25, 25);
}
Space2D.MsgCardModel.prototype.createMessageStrI = function(_text){
	return this.svgDom.text( 417, 291, _text).attr(this.setFontStyle("#f6f6f6", 11, this.fontFamiy, "start"));
}
Space2D.MsgCardModel.prototype.createMessageStrII = function(_text){
	return this.svgDom.text( 608, 291, _text).attr(this.setFontStyle("#f6f6f6", 11, this.fontFamiy, "end"));
}
Space2D.MsgCardModel.prototype.createMessageIp = function(_text){
	return this.svgDom.text( 417, 269, _text).attr(this.setFontStyle("yellow", 9, this.fontFamiy, "start"));
}
Space2D.MsgCardModel.prototype.createMessageTime = function(_text){
	return this.svgDom.text( 608, 269, _text).attr(this.setFontStyle("yellow", 9, this.fontFamiy, "end"));
}
Space2D.MsgCardModel.prototype.createMessageSet = function(){
	return this.svgDom.set();
}
Space2D.MsgCardModel.prototype.setFontStyle = function(_color,_size,_family,_anchor){
	return { fill: _color,"font-family" : _family, "font-size": _size,"text-anchor": _anchor};
}