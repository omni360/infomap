
//======================================================================================
//  Description: 创建Menu SVG类 
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================
Space2D.Globle.SceenW = window.innerWidth;
Space2D.Globle.SceenH = window.innerHeight;

Space2D.Globle.HostMenuDomId = 'hostMenu';

Space2D.HostMenuSvgModel = function (options){
	Space2D.BaseSvgModel.apply(this,arguments);
	
	this.menuPanel = options.menuPanel;
	
	this.svg = this.GetSvgDom();
	// 用于存储当前菜单所有状态
	this.menuStatus = false;	// 菜单打开关闭状态 false: 关闭
	
	
   	this.setAttr();
   	this.DrawRose();
	this.CreateBgrect();
	
	this.CreateMenu();
}

Space2D.HostMenuSvgModel.prototype = Object.create(Space2D.BaseSvgModel.prototype);

Space2D.HostMenuSvgModel.prototype.CreateBgrect = function (){
	var _this = this;
	this.svg.rect(0, 0, this.width, this.height).attr({opacity: .001, fill: "#FFF"}).click(function(e){
        e.preventDefault();
		
		$('#' + Space2D.Globle.HostMenuDomId).css({'top': '-1000px'});
        // // menuB_io(false);
        _this.menu_2.animate({dWindRose: [_this.centerX, _this.centerY, 87, 60, 210, 210, 1, 200]}, 300, "<>");
	    _this.menuLineRight.animate({dWindRose: [_this.centerX, _this.centerY, 90, 87, 210, 210, 1, 200, null]}, 300, "<>");
	    _this.menu_3.animate({dWindRose: [_this.centerX, _this.centerY, 190, 100, 210, 210, 1, 200, null]}, 300, "<>" ,function(){
			_this.text_1.hide();
			_this.text_2.hide();
			_this.text_3.hide();
			_this.text_4.hide();
	    });	
	    
        // _this.menu_1.hide();
        // _this.menuLineLeft.hide();
        // _this.infoImg.hide();
        

        
        $('#node_attr_panel').css({'opacity': '0'});
        $('#node_attr_panel').css({'z-index': '-10'});
        $('#node_flow').css({'opacity': '0'});
        $('#node_flow').css({'z-index': '-10'});
        // $('#hostlog').css({'opacity': '0'});
        // $('#hostlog').css({'z-index': '-10'});
        // $('#lookaction').css({'opacity': '0'});
        // $('#lookaction').css({'z-index': '-10'});
        // text_1.attr({x: (cx+80),y: (cy-70)});
    });
}

Space2D.HostMenuSvgModel.prototype.OpenMenu = function (_id){
	// this.menuPanel.updateData(_id);
	$('#hostMenu').css({'top': '0px'});
	this.OpenRightMenu();
	// this.redrawMenu();
}
/*
 * 重绘根据存储状态重绘菜单
 */
Space2D.HostMenuSvgModel.prototype.redrawMenu = function (){
	$('#topo').css({
		'width': window.innerWidth,
        'height': window.innerHeight
    });
	try{
		// 设置改变后窗口
		this.width = Space2D.Globle.SceenW = window.innerWidth;
		this.height = Space2D.Globle.SceenH = window.innerHeight;
		this.centerX = Space2D.Globle.SceenW/2;
	    this.centerY = Space2D.Globle.SceenH/2;
		// 改变基础dom及svg大小
		$('#' + Space2D.Globle.HostMenuDomId).css({width: Space2D.Globle.SceenW,height: Space2D.Globle.SceenH});
		this.svg.setSize(Space2D.Globle.SceenW,Space2D.Globle.SceenH);
		
		//清除窗口原有元素
		this.svg.clear();
		//重绘
		this.CreateBgrect();
		this.CreateMenu();
		this.OpenRightMenu();
	}catch(e){
		console.info(e);
	}
}

Space2D.HostMenuSvgModel.prototype.CreateMenu = function (){
	var _this = this;
	this.svg.circle(this.centerX, this.centerY, 60)
		.attr({stroke: "rgba(20, 20, 20, 0.77)", "stroke-width": 59, "opacity":1, "fill-opacity": 0});
    
    for(i=0;i<360;i=i+30){
        this.svg.path()
        	.attr({dWindRose: [this.centerX, this.centerY, 34, 37, i, i+20, 0, 60],fill: "#FFF", "stroke-opacity": 0});
    }
    
        			 	  
    this.menu_1 = this.svg.path()
    				  .attr(this.menuBgAttr)
    			 	  .attr({dWindRose: [this.centerX, this.centerY, 97, 60, 70, 110, 0, 60]});
	this.menuLineLeft = this.svg.path()
							.attr(this.menuLineAttr)
							.attr({dWindRose: [this.centerX, this.centerY, 100, 97, 70, 110, 0, 60]});
	this.menu_2 = this.svg.path()
							.attr(this.menuBgAttr)
							 .attr({dWindRose: [this.centerX, this.centerY, 87, 60, 210, 210, 1, 200]});
	this.menuLineRight = this.svg.path()
							.attr(this.menuLineAttr)
							 .attr({dWindRose: [this.centerX, this.centerY, 90, 87, 210, 210, 1, 200]});
	this.menu_3 = this.svg.path()
						.attr(this.menuBgAttr)
    			 	  .attr({dWindRose: [this.centerX, this.centerY, 190, 100, 210, 210, 1, 200]});
    			 	  
    this.infoImg = this.svg.image(Space2D.Globle.MenuInfoImg, this.centerX-95, this.centerY-14, 32, 24).click(function(){
 		// _this.menuPanel.openInfo();
 	});
    			 	  
 	this.text_1 = this.svg.text(this.centerX + 102, this.centerY - 48, '日志信息').attr(this.menu_tatr[0]).hide();

    this.text_2 = this.svg.text(this.centerX + 110, this.centerY - 15, '行为回放').attr(this.menu_tatr[1]).hide();

    this.text_3 = this.svg.text(this.centerX + 110, this.centerY + 15, '远程连接').attr(this.menu_tatr[2]).hide().click(function(){
    	// _this.menuPanel.openVNC();
    });

    this.text_4 = this.svg.text(this.centerX + 102, this.centerY + 48, '节点流量').attr(this.menu_tatr[3]).hide().click(function(){
 		// _this.menuPanel.openChart();
 	});
}

Space2D.HostMenuSvgModel.prototype.OpenRightMenu = function(){
	var _this = this;
	this.menu_2.animate({dWindRose: [this.centerX, this.centerY, 87, 60, 235, 305, 1, 200]}, 300, "<>");
    this.menuLineRight.animate({dWindRose: [this.centerX, this.centerY, 90, 87, 235, 305, 1, 200, null]}, 300, "<>");
    this.menu_3.animate({dWindRose: [this.centerX, this.centerY, 190, 100, 235, 305, 1, 200, null]}, 300, "<>", function(){
		_this.text_1.show();
		_this.text_2.show();
		_this.text_3.show();
		_this.text_4.show();
    });	
    
}

Space2D.HostMenuSvgModel.prototype.setAttr = function(){
	this.centerX = Space2D.Globle.SceenW/2;
    this.centerY = Space2D.Globle.SceenH/2;
    
	this.menuLineAttr = {fill: "#FFF", "stroke-opacity": 0,"opacity":1};
	this.menuBgAttr = {fill: "#0A4FB5", "stroke-opacity": 0,"opacity":1};
	this.menu_tatr = [
	    {
	        transform: "r-25",
	        fill: "#fff", 
	        "font-family":"微软雅黑", 
	        "font-size":16, 
	        "font-weight": "bold", 
	        "text-anchor":"start"
	    },
	    {
	        transform: "r-10", 
	        fill: "#999", 
	        "font-family":"微软雅黑", 
	        "font-size":16, 
	        "font-weight": "bold", 
	        "text-anchor":"start"
	    },
	    {
	        transform: "r8", 
	        fill: "#999", 
	        "font-family":"微软雅黑", 
	        "font-size":16, 
	        "font-weight": "bold", 
	        "text-anchor":"start"
	    },
	    {
	        transform: "r25", 
	        fill: "#FFF", 
	        "font-family":"微软雅黑", 
	        "font-size":16, 
	        "font-weight": "bold", 
	        "text-anchor":"start"
	    }
	];
}

Space2D.HostMenuSvgModel.prototype.DrawRose = function(){
    this.svg.customAttributes.dWindRose = function (cx, cy, r, R, d1, d2, type, angle) {
        a1 = ((d1 + 90) % 360) * Math.PI / 180;
        a2 = ((d2 + 90) % 360) * Math.PI / 180;

        var tx1 = cx + r * Math.cos(a1);
        var ty1 = cy + r * Math.sin(a1);
        var tx2 = cx + R * Math.cos(a1);
        var ty2 = cy + R * Math.sin(a1);
        var tx3 = cx + R * Math.cos(a2);
        var ty3 = cy + R * Math.sin(a2);
        var tx4 = cx + r * Math.cos(a2);
        var ty4 = cy + r * Math.sin(a2);
        
        angle <180 ? 
        	(type == 1 ? 
        		this.drowpath =  { 
        			path: [
	                    ["M", tx1, ty1], 
	                    ["L", tx2, ty2], 
	                    ["A", R, R, 1, 1, 1, tx3, ty3], 
	                    ["L", tx4, ty4], 
	                    ["A", r, r, 1, 1, 0, tx1, ty1], 
	                    ["z"]
	                   ] }
			: this.drowpath = { 
					path: [
	                    ["M", tx1, ty1], 
	                    ["L", tx2, ty2], 
	                    ["A", R, R, 0, 0, 1, tx3, ty3], 
	                    ["L", tx4, ty4], 
	                    ["A", r, r, 0, 0, 0, tx1, ty1], 
	                    ["z"]
		               ] }
			)
        :
        	(type == 0 ?
                this.drowpath = {
                	path: [
                        ["M", tx1, ty1], 
                        ["L", tx2, ty2], 
                        ["A", R, R, 1, 1, 1, tx3, ty3], 
                        ["L", tx4, ty4], 
                        ["A", r, r, 1, 1, 0, tx1, ty1], 
                        ["z"]
                    ] }
            : this.drowpath = { 
            		path: [
                        ["M", tx1, ty1], 
                        ["L", tx2, ty2], 
                        ["A", R, R, 0, 0, 1, tx3, ty3], 
                        ["L", tx4, ty4], 
                        ["A", r, r, 0, 0, 0, tx1, ty1], 
                        ["z"]
        			] }
           )
        return this.drowpath;
    }
}
