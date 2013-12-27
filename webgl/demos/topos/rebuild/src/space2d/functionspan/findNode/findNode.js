
//======================================================================================
//  Description: 定位节点
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.findNode = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
}

Space2D.findNode.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var clickFindHost = this.clickFindHost.bind(this);
	this.gateway = new OOPTEST.GatewayRequest();
	this.gateway.request(OOPTEST.Gateways['getfindNodePage'], function (page){
		_temp.append(page);
		$('#checkdiv a').click(function(){
            clickFindHost();
        });
		
	});
}

Space2D.findNode.prototype.clickFindHost = function(){
	
	
	var _nodeinput = $('#checkdiv input').val();

    _nodeinput = _nodeinput.replace(/(^\s*)|(\s*$)/g, ""); 
    if(_nodeinput == null || _nodeinput == ''){
        $("#errortip .tipcon").html("节点不能为空");
        $("#checkhost #errortip").css({'z-index': 10 });
        $("#checkhost #errortip").animate({ 
            opacity: "1"}, 10 ).delay(2500).animate({ 
            opacity: "0"}, 10 ,function(){
                $("#checkhost #errortip").css({'z-index': 0 });
            });
        $('#checkdiv input').val(_nodeinput);
        return false;
    }
    //验证文本框
    if(isNaN(_nodeinput)){
        $("#errortip .tipcon").html("请输入数字");
        $("#checkhost #errortip").css({'z-index': 10 });
        $("#checkhost #errortip").animate({ 
            opacity: "1"}, 10 ).delay(2500).animate({ 
            opacity: "0"}, 10 ,function(){
                $("#checkhost #errortip").css({'z-index': 0 });
            });
    }else{
        if((System.setInteractMap(System)['fixedPosition'](_nodeinput) )== 0){
            $("#errortip .tipcon").html("节点不存在");
            $("#checkhost #errortip").css({'z-index': 10 });
            $("#checkhost #errortip").animate({ 
                opacity: "1"}, 10 ).delay(2500).animate({ 
                opacity: "0"}, 10 ,function(){
                    $("#checkhost #errortip").css({'z-index': 0 });
                });
        }
    }  
}
