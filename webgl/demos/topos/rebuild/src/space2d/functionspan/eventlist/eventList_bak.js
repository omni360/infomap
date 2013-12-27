
//======================================================================================
//  Description: 安全事件
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.eventList = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
}

Space2D.eventList.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var _this = this;
	// var clickFindHost = this.clickFindHost.bind(this);
	this.gateway = new OOPTEST.GatewayRequest();
	this.gateway.request(OOPTEST.Gateways['geteventListPage'], function (page){
		_temp.append(page);
		$("#eventtable").css({'height': (window.innerHeight-450)});
		$("#eventtable").mCustomScrollbar({
            set_width:false, /*optional element width: boolean, pixels, percentage*/
            set_height:false, /*optional element height: boolean, pixels, percentage*/
            horizontalScroll:false, /*scroll horizontally: boolean*/
            scrollInertia:550, /*scrolling inertia: integer (milliseconds)*/
            scrollEasing:"easeOutCirc", /*scrolling easing: string*/
            mouseWheel:"auto", /*mousewheel support and velocity: boolean, "auto", integer*/
            autoDraggerLength:true, /*auto-adjust scrollbar dragger length: boolean*/
            scrollButtons:{ /*scroll buttons*/
                enable:false, /*scroll buttons support: boolean*/
                scrollType:"continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
                scrollSpeed:20, /*scroll buttons continuous scrolling speed: integer*/
                scrollAmount:40 /*scroll buttons pixels scroll amount: integer (pixels)*/
            },
            advanced:{
                updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
                updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
                autoExpandHorizontalScroll:false /*auto expand width for horizontal scrolling: boolean*/
            }
        });
        _this.getList();
        $('#relist .rlimg').click(function(){
        	_this.getList();
        });
	});
}

Space2D.eventList.prototype.getList = function(){
	this.getway = new OOPTEST.GatewayRequest();
	this.getway.request(OOPTEST.Gateways['geteventList'], function (res){
		history_event_list = res;
		//var list = res.list;
		var tableHtml = '',_iptr = '';
		
		for(var i = 0; i<res.length ;i++){
			if( i%2 == 0 ){
				_iptr = "<tr class='even'><input type='hidden' value='"+res[i]['topological_id']+"'/><td class='td_serial'>" + res[i]['detect_id'] + "</td><td class='td_ip'>";
				_iptr += res[i]['detect_name'];
				_iptr += "</td></tr>";
			}else{
				_iptr = "<tr class='odd'><input type='hidden' value='"+res[i]['topological_id']+"'/><td class='td_serial'>" + res[i]['detect_id'] + "</td><td class='td_ip'>";
				_iptr += res[i]['detect_name'];
				_iptr += "</td></tr>";
			}
			tableHtml += _iptr;
		}
		$("#eventtable table tbody").html(tableHtml);
		$('#eventtable table tr').dblclick(function(){
        	$('#eventtable table').find('td').removeClass('fousetr');
        	$(this).find('td').addClass('fousetr');
        	var _did = $(this).find('td').first().html(),
        		_dtype = $(this).find('td').last().html(),
        		_tpid = $(this).find('input').val();
        });
	});
	$('#eventtable').mCustomScrollbar("scrollTo","top");
}