//======================================================================================
//  Description: 拓扑信息功能区块
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.Globle.TopoInfoDomId = 'xmlinfo';

Space2D.topoInfo = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
}

Space2D.topoInfo.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var setTopoInfo = this.setTopoInfo;
	this.scene.gateway.request(OOPTEST.Gateways['getTopoInfoPage'], function (page){
		_temp.append(page);
		setTopoInfo();
	});
}

Space2D.topoInfo.prototype.setTopoInfo = function(_id){
	this.gateway = new OOPTEST.GatewayRequest();
	// OOPTEST.Gateways['getTopoInfoData']['paras']['id'] = _id;
	
	
	
	// Demo版本 将网络部分注释---
	/*
	OOPTEST.Gateways['getTopoInfoData']['paras']['id'] = 182;
	this.gateway.request(OOPTEST.Gateways['getTopoInfoData'], function (_resule){
        var topoInfoDom = $('#' + Space2D.Globle.TopoInfoDomId);
        if(_resule.length > 0){
            topoInfoDom.find('.xmlname').html(_resule[0].name); 
        }
        for(i=0;i<_resule.length;i++){
            if(_resule[i].type == 'sim'){
                topoInfoDom.find('.xmlspan').eq(0).find('.xmlnum').html(_resule[i].num);
            }else if(_resule[i].type == 'xen'){
                topoInfoDom.find('.xmlspan').eq(1).find('.xmlnum').html(_resule[i].num);
            }else{
                topoInfoDom.find('.xmlspan').eq(2).find('.xmlnum').html(_resule[i].num);
            }
         }
	});
	*/
	
	// Demo 版本 模拟 数据
	var topoInfoDom = $('#' + Space2D.Globle.TopoInfoDomId);
	topoInfoDom.find('.xmlname').html(); 
	// topoInfoDom.find('.xmlspan').eq(0).find('.xmlnum').html(20);
	// topoInfoDom.find('.xmlspan').eq(1).find('.xmlnum').html(10);
	// topoInfoDom.find('.xmlspan').eq(2).find('.xmlnum').html(13);
	
}