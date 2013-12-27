
//======================================================================================
//  Description: 陀螺仪外观
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.mapStyle = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
}

Space2D.mapStyle.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	this.gateway = new OOPTEST.GatewayRequest();
	this.gateway.request(OOPTEST.Gateways['getmapStylePage'], function (page){
		_temp.append(page);
	});
}



