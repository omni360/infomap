
//======================================================================================
//  Description: 菜单面板
//  Created Date: 2013-01-28
//  Modify Date: 2013-01-28
//  Author: xfc
//======================================================================================

Space2D.MenuPanel = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
}

Space2D.MenuPanel.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	this.gateway = new OOPTEST.GatewayRequest();
	this.gateway.request(OOPTEST.Gateways['getmenuPanelPage'], function (page){
		_temp.append(page);
		$('#simpleModal').css({
            'top': (window.innerHeight - 650)/2 , 
            'left': (window.innerWidth - 860)/2}
        );
        $("#closeSimple").click(function() {
            $("div#simpleModal").removeClass("show");
            $('#iframewindow').html('');
            $('.model').css({'z-index':'-100'});
            return false;
        });
		$('#node_attribute').find('.closepanel').click(function(){
            $('#node_attr_panel').css({'opacity': '0'});
            $('#node_attr_panel').css({'z-index': '-10'});
        });
        $('#node_flow').find('.closepanel').click(function(){
            $('#node_flow').css({'opacity': '0'});
            $('#node_flow').css({'z-index': '-10'});
        });
	});
}

Space2D.MenuPanel.prototype.openInfo = function(){
	if($('#node_attr_panel').css('opacity') == 1){
        $('#node_attr_panel').css({'opacity': '0'});
        $('#node_attr_panel').css({'z-index': '-10'});
    } else{
        var _pheight = $('#node_attr_panel').css('height');
        _pheight = _pheight.substr(0,(_pheight.length-2));
        $('#node_attr_panel').css({'z-index': '10'});
        $('#node_attr_panel').css({'top': (Space2D.Globle.SceenH/2-_pheight/2),'left': (Space2D.Globle.SceenW/2-380),'opacity': '1'});
    }
}

Space2D.MenuPanel.prototype.openChart = function(){
	if($('#node_flow').css('opacity') == 1){
        $('#node_flow').css({'opacity': '0'});
        $('#node_flow').css({'z-index': '-10'});
    } else{
        $('#node_flow').css({'z-index': '10'});
        $('#node_flow').css({'top': (Space2D.Globle.SceenH/2+120),'left': (Space2D.Globle.SceenW/2-150),'opacity': '1'});
    }
}

Space2D.MenuPanel.prototype.openVNC = function(){
	$('#iframewindow').html('<iframe src="http://10.255.80.43:6080/myvnc.html" frameborder="0" width="100%" height="603px"></iframe>');
	$('.model').css({'z-index':'10'});
    $("div#simpleModal").addClass("show");
}


Space2D.MenuPanel.prototype.updateData = function(_id){
	this.gateway = new OOPTEST.GatewayRequest();
	OOPTEST.Gateways['getNodeInfo']['paras'] = {'id' : _id};
	this.gateway.request(OOPTEST.Gateways['getNodeInfo'], function (json){
		// get data
        var _list = json.list;

        var _nodetr = '',_nodehtml = '';
        for( i = 0 ; i < _list.key_sort_list.length ; i++ ){
            var _str = _list.key_sort_list[i];
            _nodetr = ''
            if( _str.indexOf('VNC IP') != -1){
                _nodetr += "<tr><td height='7'></td><td>";
                _nodetr += '<input id="idRemote" value="1-'+_list["VNC IP"]+'-'+_list["VNC PORT"]+'" type="hidden"></td></tr>';
                // text_3.attr({fill: "#FFF"});
            }else if( _str.indexOf('VNC PORT') == -1 ){
                _nodetr += '<tr><td><label class="label">'+_str+'：</label></td>';
                _nodetr += '<td>'+_list[_str]+'</td></tr>';
            }
            _nodehtml += _nodetr;
        }
// 
        for(i = 0 ; i < _list.ip_list.length ; i++){
            if(i==0){
                _nodetr = '<tr><td><label class="label">Ip地址：</label></td>';
            }else{
                _nodetr = '<tr><td><label class="label">&nbsp;</label></td>';
            }

            var ipaddressstr;
            _list.ip_list[i]["nic_ip_address"] == null ? ipaddressstr = ' ' : ipaddressstr = _list.ip_list[i]["nic_ip_address"]
            _nodetr += '<td>'+ipaddressstr+'</td></tr>';
            _nodehtml += _nodetr;
        }


        _nodehtml += "<tr><td height='7'></td><td></td></tr>";

        
        $('#node_attribute table').html(_nodehtml);

	});
}
