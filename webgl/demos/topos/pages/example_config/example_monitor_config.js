window.parent && (window.parent.topo.isRenderer = false);

document.onmousedown = function (e){
	if (e.which == 2){
		return false;
	}
}
//屏蔽鼠标事件
document.oncontextmenu = function() {
	return false;
};
var system;

var apps = []
	app_index = 0;

var HeaderTab = function(linkDom,bodyDom){
	var me = this;
	me.contentsDom = bodyDom.children(),
	me.activeIndex = 1;
	linkDom.find('li').each(function(i,n){
		
		$(this).click(function(){
			console.info('--');
			linkDom.find('.'+$(this).attr('data')).attr({'checked': true});
			me.contentsDom.eq(me.activeIndex).removeClass('block-dialog-content-tab-contents-show');
			me.contentsDom.eq(i).addClass('block-dialog-content-tab-contents-show');
			me.activeIndex = i;
		})
	});
}

function init() {
	
	system = new OOPTEST.System('SPACE3D', 'history', 7000, 8000);
	system.update(topoJsonList[0]);
	
	$('input[type=file]').bootstrapFileInput();
	
	new HeaderTab($('#m_nConfigtabLink'),$('#m_nConfigtab'));
	
	new HeaderTab($('#net-congfig-link'),$('#net-congfig-tab'));
	
	new HeaderTab($('#m_hConfigtabLink'),$('#m_hConfigtab'));

	var appRole_data = [],
		hostNodes_data = [],
		hostFile_data = [],
		hostPro_data = [],
		netLinks_data = [],
		netNodes_data = [],
		netRole_data = [];
		
	var appRoleTable = new Pagination(CustomPaginations('#app-role-list',appRole_data,3));
	
	var hostNodeTable = new Pagination(CustomPaginations('#host-node-list',hostNodes_data,2));
	var hostFileTable = new Pagination(CustomPaginations('#host-file-list',hostFile_data,2));
	var hostProTable = new Pagination(CustomPaginations('#host-process-list',hostPro_data,2));

	var netLinksTable = new Pagination(CustomPaginations('#net-links-list',netLinks_data,3));
	var netNodesTable = new Pagination(CustomPaginations('#net-nodes-list',netNodes_data,3));
	var netRolsTable = new Pagination(CustomPaginations('#net-role-list',netRole_data,3));
	
	$('#host_add_nodes_btn').click(function() {
		for (var i in system.multiObjs) {
			temp = [];
			temp.push(i);
			temp.push('');
			hostNodes_data.push(temp);
		}
		hostNodeTable.update(hostNodes_data);
	});
	$('#host_remove_nodes_btn').click(function() {
		hostNodes_data.splice(hostNodeTable.selectedRow,1);
		hostNodeTable.update(hostNodes_data);
	});
	
	// 主机 文件
	$('#host_add_file_btn').click(function(){
		$('#add_host_rw_dialog').addClass('models-dialog-show');
	});
	
	function close_host_rw_dialog(){
		$('#add_host_rw_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#add_host_rw_dialog').removeClass('models-dialog-show');
			$('#add_host_rw_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
	
	$('#add_host_rw_dialog .closed-btn').click(close_host_rw_dialog);
	
	$("#confirm_host_rw_btn").click(function (){
		hostFile_data.push([
			$("#add_host_rw_dialog :input").eq(0).val(),
		    $("#add_host_rw_dialog :input").eq(1).val()
		]);
		hostFileTable.update(hostFile_data);
	    close_host_rw_dialog();
	});

	$('#host_remove_file_btn').click(function() {
		hostFile_data.splice(hostFileTable.selectedRow,1);
		hostFileTable.update(hostFile_data);
	});
	
	// end 主机 文件
	
	$('#add_host_process_btn').click(function(){
		$('#add_host_process_dialog').addClass('models-dialog-show');
	});
	
	function close_host_process_dialog(){
		$('#add_host_process_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#add_host_process_dialog').removeClass('models-dialog-show');
			$('#add_host_process_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
	
	$('#add_host_process_dialog .closed-btn').click(close_host_process_dialog);
	
	$("#confirm_host_process_btn").click(function (){
		hostPro_data.push([
			$("#add_host_process_dialog :input").eq(0).val(),
			$("#add_host_process_dialog :input").eq(1).val(),
			$("#add_host_process_dialog :input").eq(2).val()
		]);
		hostProTable.update(hostPro_data);
	    close_host_process_dialog();
	});
	
	$('#remove_host_process_btn').click(function() {
		hostPro_data.splice(hostProTable.selectedRow,1);
		hostProTable.update(hostPro_data);
	});
	
	// ----
	
	$('#network_add_nodes_btn').click(function() {
		for (var i in system.multiObjs) {
			temp = [];
			temp.push(i);
			temp.push('节点');
			netNodes_data.push(temp);
		}
		netNodesTable.update(netNodes_data);
	});
	$('#network_remove_nodes_btn').click(function() {
		netNodes_data.splice(netNodesTable.selectedRow,1);
		netNodesTable.update(netNodes_data);
	})
	
	$('#network_add_links_btn').click(function() {
		var result = system.generateLink(),
			temp = [];	
		switch(result['flag']){
			case 'not_enough':
				popup_alert('请选择两个相邻节点来构成链路。');
				break;
			case 'succ':
				temp.push(result['link'].join('~'));
				temp.push('链路');
				$('#network_add_nodes_btn').attr("disabled",true); 
				netLinks_data.push(temp);
				break;
			case 'fail':
				popup_alert('所选节点不能构成合理的链路, 请选择两个相邻节点来构成链路。');
				break;
		}
		netLinksTable.update(netLinks_data);
	});
	$('#network_remove_links_btn').click(function() {
		netLinksTable.selectedRow > -1 && netLinks_data.splice(netLinksTable.selectedRow,1);
		netLinksTable.update(netLinks_data);
	});
	// 网络行为 --. 监控配置
	$('#add_net_rule_btn').click(function(){
		$('#add_network_rule_dialog').addClass('models-dialog-show');
	});
	function close_network_rule_dialog(){
		$('#add_network_rule_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#add_network_rule_dialog').removeClass('models-dialog-show');
			$('#add_network_rule_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
				
	$('#add_network_rule_dialog .closed-btn').click(close_network_rule_dialog);
	$("#confirm_network_rule_btn").click(function (){
		netRole_data.push([
			$("#add_network_rule_dialog :input").eq(0).val(),
		    $("#add_network_rule_dialog :input").eq(1).val(),
		    $("#add_network_rule_dialog :input[name='some_20'][checked]").val(),
		    $("#add_network_rule_dialog :input[name='some_2'][checked]").val()
		]);
		netRolsTable.update(netRole_data);
	    close_network_rule_dialog();
	});
	$('#remove_net_rule_btn').click(function() {
		netRolsTable.selectedRow > -1 &&  netRole_data.splice(netRolsTable.selectedRow,1);
		netRolsTable.update(netRole_data);
	});
	// end 网络行为 --. 监控配置
	$('#add_app_rule_btn').click(function(){
		$('#add_app_rule_dialog').addClass('models-dialog-show');
	});
	
	function close_app_rule_dialog(){
		$('#add_app_rule_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#add_app_rule_dialog').removeClass('models-dialog-show');
			$('#add_app_rule_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
	
	$('#add_app_rule_dialog .closed-btn').click(close_app_rule_dialog);
	
	$("#confirm_app_rule_btn").click(function (){
		appRole_data.push([
			$("#add_app_rule_dialog :input").eq(0).val(),
		    $("#add_app_rule_dialog :input").eq(1).val(),
		    $("#add_app_rule_dialog :input[name='some_1'][checked]").val(),
		    $("#add_app_rule_dialog :input[name='some_3'][checked]").val()
		]);
		appRoleTable.update(appRole_data);
	    close_app_rule_dialog();
	});
	
	$('#remove_app_rule_btn').click(function() {
		appRoleTable.selectedRow > -1 && appRole_data.splice(appRoleTable.selectedRow,1);
		appRoleTable.update(appRole_data);
	});
// 	
	var cardDom = [
			$('#monitor_app_config_div'),
			
			$('#monitor_network_config_div'),
			$('#monitor_host_config_div'),
		],
		R = 600,
		current = -45;
		switchStatus = 0;
	
	function transfromCard(dom,val){
		if(dom){
			$('.silderList li').removeClass('active');
			if(switchStatus == 0){
				$('.config-scene').css({
					right: 10
				});
				
			}else if(switchStatus == 1 && val == current){
				$('.config-scene').css({
					right: -490
				})
				switchStatus = 0;
				current = 1;
				dom.removeClass('active');
				return false;
			}
			dom.addClass('active');
			
			switchStatus = 1;
		}

		current = val;
		for(var i = 2; i >= 0 ; i-- ){
			var d = (val+i*45),
				radius = Math.PI*d/180;
			transformFun(
				cardDom[i],
				(((-val/45) == i) ? { opacity: 1,'visibility': 'visible'} : { opacity: 0,'visibility': 'hidden'}),
				['translate3d('+Math.sin(radius)*R+'px,0,'+(Math.cos(radius)*R-R)+'px)','rotateY('+d+'deg)']
			);
		}
	}
	
	transfromCard('',0);

	$("#monitor_network_toggle_btn").click(function(e) {
		transfromCard($(this),-90);
	})
	$("#monitor_host_toggle_btn").click(function(e) {
		transfromCard($(this),-45);
	});
	$("#monitor_app_toggle_btn").click(function(e) {
		transfromCard($(this),0);
	})
	
	var recordIndex = [1,1,1,1,1];
	
	//保存应用监控配置
	$("#save_app_monitor_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>应用监控配置--"+(recordIndex[0]++)+"</header>" +
				"<div class='contentbody'>" + 
					"<table class='table table-striped'>" + 
						"<tr><td width='95'>应用名称：</td><td title='应用A、应用B、应用C、应用D'>应用A、应用B、应用C...</td></tr>" + 
						"<tr><td>配置方式：</td><td>批量</td></tr>" + 
						"<tr><td>监控名称：</td><td>应用监控</td></tr>" + 
						"<tr><td>规则文件：</td><td>appMonitorConf.conf</td></tr>" + 
						"<tr><td>保存配置规则：</td><td>是</td></tr>" + 
						"<tr><td>捕获数据包：</td><td>否</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		create_and_remove_app(html, 'app');
	})
    
    //保存网络行为监控配置
	$("#save_network_monitor_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>网络行为监控配置--"+(recordIndex[1]++)+"</header>" +
				"<div class='contentbody'>" + 
					"<table class='table table-striped'>" + 
						"<tr width='195'><td>节点：</td><td>1001,1008,1009</td></tr>" + 
						"<tr><td>链路：</td><td>1001,1002,1003 | 1008,1009</td></tr>" + 
						"<tr><td>配置方式：</td><td>单条</td></tr>" + 
						"<tr><td>规则列表：</td><td></td></tr>" + 
						"<tr><td colspan='2'>" + 
							"<table style='width: 100%'>" + 
								"<thead><tr><th>监控名称</th><th>监控规则</th><th>保存规则</th><th>捕获数据包</th></tr></thead>" + 
								"<tr><td>监控1</td><td>..............</td><td>是</td><td>否</td></tr>" + 
								"<tr><td>监控2</td><td>..............</td><td>否</td><td>否</td></tr>" + 
								"<tr><td>监控3</td><td>..............</td><td>是</td><td>是</td></tr>" + 
								"<tr><td>监控4</td><td>..............</td><td>否</td><td>是</td></tr>" + 
							"</table>" + 
						"</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		
		create_and_remove_app(html, 'network');
	})
	
	//保存主机行为监控配置
	$("#save_host_monitor_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>主机行为监控配置--"+(recordIndex[2]++)+"</header>" +
				"<div class='contentbody'>" + 
					"<table class='table table-striped'>" + 
						"<tr width='110'><td>主机：</td><td>1001,1008,1009</td></tr>" + 
						"<tr><td>文件读写：</td><td></td></tr>" + 
						"<tr><td colspan='2'>" + 
							"<table style='width: 100%'>" + 
								"<thead><tr><th>操作</th><th>文件路径</th></tr></thead>" + 
								"<tr><td>读取</td><td>..............</td></tr>" + 
								"<tr><td>写入</td><td>..............</td></tr>" + 
							"</table>" + 
						"</td></tr>" + 
						
						"<tr><td>进程操作：</td><td></td></tr>" + 
						"<tr><td colspan='2'>" + 
							"<table style='width: 100%'>" + 
								"<thead><tr><th>操作</th><th>进程ID</th><th>进程名称</th></tr></thead>" + 
								"<tr><td>创建</td><td>..............</td><td>..............</td></tr>" + 
								"<tr><td>关闭</td><td>..............</td><td>..............</td></tr>" + 
							"</table>" + 
						"</td></tr>" + 
						"<tr><td>文件(夹)操作：</td><td>创建、删除、移动</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		
		create_and_remove_app(html, 'host');
    	
	})
	
	var countTop = 0,
		closeFlag = true,
		createFlag = true;
	
	var listDom = $('#leftSilder'),
		tempy;
	
	function create_and_remove_app(html, type){
		if(!createFlag) return false;
		createFlag = false;
		setTimeout(function(){
			createFlag = true;
		},500);
		
		listDom.append(html);
		
		var thispH = parseInt(html.css('height').split('px')[0]) + 10;
		
		if (apps.length > 0){
			countTop += thispH;
		}
		
		html.attr({'index': app_index,'datay': 0});
		
		setTimeout(function(){
			transformFun(
				html,
				{'opacity': 1},
				['translateY(0px)']
			);
		},10);
		
		
		for(var i = 0; i < apps.length; i++){
			apps[i]['dom'].attr({"datay": (parseInt(apps[i]['dom'].attr("datay")) + thispH)});
			transformFun(
				apps[i]['dom'],
				{},
				['translateY('+apps[i]['dom'].attr("datay")+'px)']
			);
		}
		
		apps.push({'id' : 'app_' + app_index, 'dom': html, 'type': type});
		
		listDom.css({'height': countTop+parseInt(apps[i]['dom'].css('height').split('px')[0])});
		
		$('#slider_tit_'+app_index).click(function(){
			var thisp = $(this).parent();
				thisnext = $(this).next('.contentbody');
			if($(this).attr('data') == 1){
				var thispH = parseInt(thisp.css('height').split('px')[0]) + 10 - 50,
					domheight = parseInt(listDom.css('height').split('px')[0]) - thispH;
				listDom.css({'height': domheight >= 0 ? domheight : 0});
				if(parseInt(listDom.css('height').split('px')[0]) > window.innerHeight - 10){
					transformFun(
						$('#leftSilder'),
						{},
						['translateY(0px)']
					);
				}
				thisnext.css({
					'opacity': 0
				});
				setTimeout(function(){
					thisnext.css({
						'display': 'none'
					});
				},0.7);
				
				$(this).attr({'data': 0});
				
				for(var i = 0; i < apps.length; i++){
					if(i < parseInt(thisp.attr("index"))){
						apps[i]['dom'].attr({"datay": (parseInt(apps[i]['dom'].attr("datay")) - thispH)});
						transformFun(
							apps[i]['dom'],
							{},
							['translateY('+apps[i]['dom'].attr("datay")+'px)']
						);
					}
				}
			}else{
				thisnext.css({
					'display': ''
				});
				var thispH = parseInt(thisp.css('height').split('px')[0]) + 10 - 50,
					domheight = parseInt(listDom.css('height').split('px')[0]) + thispH;
				listDom.css({'height': domheight >= 0 ? domheight : 0});
				if(parseInt(listDom.css('height').split('px')[0]) > window.innerHeight - 10){
					transformFun(
						$('#leftSilder'),
						{},
						['translateY(0px)']
					);
				}
				for(var i = 0; i < apps.length; i++){
					if(i < parseInt(thisp.attr("index"))){
						apps[i]['dom'].attr({"datay": (parseInt(apps[i]['dom'].attr("datay")) + thispH)});
						transformFun(
							apps[i]['dom'],
							{},
							['translateY('+apps[i]['dom'].attr("datay")+'px)']
						);
					}
				}
				
				$(this).attr({'data': 1});
				setTimeout(function(){
					thisnext.css({
						'opacity': 1
					});
				},0.7);
				
			}
		});

		$('#app_'+app_index).click(function(){
			if(!closeFlag) return false;
			closeFlag = false;
			setTimeout(function(){
				closeFlag = true;
			},800);
			var thisp = $(this).parent(),
				thispH = parseInt(thisp.css('height').split('px')[0]) + 10,
				domheight = parseInt(listDom.css('height').split('px')[0]) - thispH;
			(apps.length > 1) ? countTop -= thispH : countTop = 0;
			
			listDom.css({'height': domheight >= 0 ? domheight : 0});
			if(parseInt(listDom.css('height').split('px')[0]) > window.innerHeight - 10){
				transformFun(
					$('#leftSilder'),
					{},
					['translateY(0px)']
				);
			}
			for(var i = 0; i < apps.length; i++){
				if(i < parseInt(thisp.attr("index"))){
					apps[i]['dom'].attr({"datay": (parseInt(apps[i]['dom'].attr("datay")) - thispH)});
					transformFun(
						apps[i]['dom'],
						{},
						['translateY('+apps[i]['dom'].attr("datay")+'px)']
					);
				}else if(i > parseInt(thisp.attr("index"))){
					apps[i]['dom'].attr({"index": (parseInt(apps[i]['dom'].attr("index")) - 1)});
				}
			}
			thisp.remove();
			apps.splice(parseInt(thisp.attr("index")), 1);
			
			app_index--;
		});
		
		app_index++;
		
	}
	var listtranform = 0,
		listtranformflag = true,
	 	leftSilder =  document.getElementById('leftSilder');
	
	leftSilder.addEventListener('mouseover', mouseOverHandler);
	
	function mouseOverHandler(e){
		e.stopPropagation();
		leftSilder.addEventListener('mousewheel', mouseWheelHandler);
		leftSilder.addEventListener('mouseout', mouseOutHandler);
	}
	
	function mouseOutHandler(e){
		e.stopPropagation();
		leftSilder.removeEventListener('mousewheel', mouseWheelHandler);
		leftSilder.removeEventListener('mouseout', mouseOutHandler);
	}
	
	function mouseWheelHandler(e){
		e.stopPropagation();
		
		if(parseInt(listDom.css('height').split('px')[0]) <= window.innerHeight - 10) return false;
		if(e.wheelDelta > 0){
			listtranform += (listtranform < 0 ? e.wheelDelta : 0);
		}else{
			if(window.innerHeight - 10 - listtranform < parseInt(listDom.css('height').split('px')[0])){
				listtranform += e.wheelDelta
			}
		}
		transformFun(
			$('#leftSilder'),
			{},
			['translateY('+listtranform+'px)']
		);
	}

	//svg 流程控制条
	var p = new Process(3);
	
}