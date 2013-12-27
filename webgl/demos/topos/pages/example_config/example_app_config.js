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

function init() {
	
	system = new OOPTEST.System('SPACE3D', 'history', 7000, 8000);
	system.update(topoJsonList[0]);
	
	//3d
	
	$('#flow_range_num').hide('fast');
	
	$('input[type=file]').bootstrapFileInput();
	
	
	var tabContentsDom = $('.block-dialog-body').children(),
		tabActiveIndex = 2;
	
	$('#headerLinkBtn li').each(function(i){
		$(this).click(function(){
			tabswitch($(this),i);
		})
	});
	var tabswitch = function(dom,i){
		$('#headerLinkBtn').find('.'+dom.attr('data')).attr({'checked': true});
		if(i > tabActiveIndex){
			transformFun(
				tabContentsDom.eq(tabActiveIndex),
				{ opacity:0, 'visibility': 'hidden'},
				['rotateY(80deg)', 'translate3d(200px,0,0)']
			);
			transformFun(
				tabContentsDom.eq(i),
				{ opacity: 1, 'visibility': 'visible'},
				['rotateY(0deg)', 'translate3d(0,0,0)']
			);
		}else if(i < tabActiveIndex){
			transformFun(
				tabContentsDom.eq(tabActiveIndex),
				{ opacity:0, 'visibility': 'hidden'},
				['rotateY(-80deg)', 'translate3d(-200px,0,0)']
			);
			transformFun(
				tabContentsDom.eq(i),
				{ opacity: 1, 'visibility': 'visible'},
				['rotateY(0deg)', 'translate3d(0,0,0)']
			);
		}
		tabActiveIndex = i;
	}
	
	tabswitch($('#headerLinkBtn li').eq(1),1);
	
	var paginations = {
		'id': '',
		'data': [],
		'everypageNum': 3,
		'tdfun': function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					dom.eq(i).find('td').eq(j+1).html(m);		
				});
			}
		},
		'pagefun': function(){
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
		}
	};
	
	var worm_data = [],
		ddos_data = [],
		custom_data = [];
		
	paginations.id = '.worm-table-list';
	paginations.data = worm_data;
	
	var wormTable = new Pagination(paginations);
	
	wormTable.update(worm_data);
	
	$('#worm_key_node_btn').click(function() {
		for (var i in system.multiObjs) {
			temp = [];
			temp.push(i);
			worm_data.push(temp);
		}
		wormTable.update(worm_data);
	})
	$('#worm_remove_node_btn').click(function(){
		worm_data.splice(wormTable.selectedRow,1);
		wormTable.update(worm_data);
	});
	
	paginations.id = '.ddos-table-list';
	paginations.data = ddos_data;
	var ddosTable = new Pagination(paginations);
	
	$('#ddos_key_node_btn').click(function() {
		for (var i in system.multiObjs) {
			temp = [];
			temp.push(i);
			ddos_data.push(temp);
		}
		ddosTable.update(ddos_data);
	})
	$('#ddos_remove_node_btn').click(function(){
		ddos_data.splice(ddosTable.selectedRow,1);
		ddosTable.update(ddos_data);
	});
	
	paginations.id = '.custom-table-list';
	paginations.data = custom_data;
	var customTable = new Pagination(paginations);
	
	$('#customAddBtn').click(function() {
		for (var i in system.multiObjs) {
			temp = [];
			temp.push(i);
			custom_data.push(temp);
		}
		customTable.update(custom_data);
	})
	$('#customRemoveBtn').click(function(){
		custom_data.splice(customTable.selectedRow,1);
		customTable.update(custom_data);
	});
	
	
	
	
	$('#xen-search-btn').click(function(){
		$('#search_node_dialog').addClass('models-dialog-show');
	});
	function close_search_dialog(){
		$('#search_node_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#search_node_dialog').removeClass('models-dialog-show');
			$('#search_node_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
	
	$('#search_node_dialog .closed-btn').click(close_search_dialog);
	
	// $("#confirm_host_rw_btn").click(function (){
		// hostFile_data.push([
			// $("#add_host_rw_dialog :input").eq(0).val(),
		    // $("#add_host_rw_dialog :input").eq(1).val()
		// ]);
		// hostFileTable.update(hostFile_data);
	    // close_search_dialog();
	// });
	
	// 模拟
	var xen_node_data = [

	];
	
	paginations.id = '.xen-nodes-list';
	paginations.data = xen_node_data;
	paginations.tdfun =  function(i,n,dom,c,num){
		if(n.length == 0){
			dom.eq(i).find('td').html('&nbsp;');
		}else{
			dom.eq(i).find('td').eq(0).html((i+1)+c*num);
			$.each(n,function(j,m){
				if(j==3){
					dom.eq(i).find('td').eq(j+1).html('<input type="checkbox" name="app-select"/>');	
				}else{
					dom.eq(i).find('td').eq(j+1).html(m);	
				}
			});
		}
	}
	var xenNodeTable = new Pagination(paginations);
	
	var xen_files_data = [
		
	];
	
	paginations.id = '.xen-files-table';
	paginations.data = xen_files_data;
	
	paginations.tdfun =  function(i,n,dom,c,num){
		if(n.length == 0){
			dom.eq(i).find('td').html('&nbsp;');
		}else{
			dom.eq(i).find('td').eq(0).html((i+1)+c*num);
			$.each(n,function(j,m){
				dom.eq(i).find('td').eq(j+1).html(m);	
			});
		}
	}
	
	var xenFilesTable = new Pagination(paginations);
	
	
	$('#xen-add-file-btn').click(function(){
		$('#xen_file_dialog').addClass('models-dialog-show');
	});
	function close_file_dialog(){
		$('#xen_file_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#xen_file_dialog').removeClass('models-dialog-show');
			$('#xen_file_dialog').removeClass('models-dialog-hide');
		}, 300);
	}
	
	$('#xen_file_dialog .closed-btn').click(close_file_dialog);
	
	$("#confirm_network_rule_btn").click(function (){
		xen_files_data.push([
			$("#xen_file_dialog :input").eq(0).val(),
		    $("#xen_file_dialog :input").eq(1).val(),
		    $("#xen_file_dialog :input").eq(2).val(),
		    $("#xen_file_dialog :input[name='some_q'][checked]").val()
		]);
		xenFilesTable.update(xen_files_data);
	    close_file_dialog();
	});
	
	$('#xen-remove-file-btn').click(function(){
		xen_files_data.splice(xenFilesTable.selectedRow,1);
		xenFilesTable.update(xen_files_data);
	});
	
	
		
	var cardDom = [
			$('#flow_config_div'),
			$('#xen_app_config_div'),
			$('#sim_app_config_div')
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
	// transfromCard(-45);
	
	//模拟节点应用配置窗口动画
	$("#sim_app_toggle_btn").click(function(e) {
	
		transfromCard($(this),-90);
	})
	//仿真节点应用配置窗口动画
	$("#xen_app_toggle_btn").click(function(e) {
		transfromCard($(this),-45);
	});
	//流量应用配置窗口动画
	$("#flow_toggle_btn").click(function(e) {
		transfromCard($(this),0);
	})
	
	var scanInterval = $("#scanInterval").spinner();
	var infectionPercent = $("#infectionPercent").spinner();
	var hostPercent = $("#hostPercent").spinner();
	var wormStartTime = $("#wormStartTime").spinner();
	var wormEndTime = $("#wormEndTime").spinner();
	var attackPowerStartRound = $("#attackPowerStartRound").spinner();
	var attackPowerEndRound = $("#attackPowerEndRound").spinner();
	var attackPowerDistri = $("#attackPowerDistri").spinner();
	var ddosInfectionPercent = $("#ddosInfectionPercent").spinner();
	var ddosDostPercent = $("#ddosDostPercent").spinner();
	var ddosStartTime = $("#ddosStartTime").spinner();
	var ddosEndTime = $("#ddosEndTime").spinner();
	
	var topoix = 15;

	var recordIndex = [1,1,1,1,1];

	$("#save_worm_app_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>Worm应用--"+(recordIndex[0]++)+"</header>" +
				"<div class='contentbody'>" + 
					"<table class='table table-striped'><tr><td>关键节点：</td><td>1001,1002,1003,1004,1005</td></tr>" + 
						"<tr><td>扫描方式：</td><td>Random</td></tr>" + 
						"<tr><td>扫描间隔：</td><td>3s</td></tr>" + 
						"<tr><td>感染概率：</td><td>80%</td></tr>" + 
						"<tr><td>模拟主机比例：</td><td>85%</td></tr>" + 
						"<tr><td>开始时间：</td><td>30s</td></tr>" + 
						"<tr><td>结束时间：</td><td>90s</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		
		create_and_remove_app(html, 'worm');
	})
    
	$("#save_ddos_app_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>DDos应用--"+(recordIndex[1]++)+"</header>" + 
				"<div class='contentbody'>" + 
					"<table class='table table-striped'><tr><td>关键节点：</td><td>1001</td></tr>" + 
						"<tr><td>攻击强度范围：</td><td>0.00001 ~ 0.00009</td></tr>" + 
						"<tr><td>攻击强度分布方式：</td><td>100%</td></tr>" + 
						"<tr><td>感染概率：</td><td>80%</td></tr>" + 
						"<tr><td>模拟主机参与比例：</td><td>85%</td></tr>" + 
						"<tr><td>开始时间：</td><td>30s</td></tr>" + 
						"<tr><td>结束时间：</td><td>90s</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		
		create_and_remove_app(html, 'ddos');
	})
	
	var countTop = 0,
		closeFlag = true,
		createFlag = true;
	
	$("#save_custom_app_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app hover_custom'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>自定义应用--"+(recordIndex[2]++)+"</header>" + 
				"<div class='contentbody'>" + 
					"<table class='table table-striped'><tr><td>节点：</td><td>1001</td></tr>" + 
						"<tr><td>应用配置文件：</td><td>custom.conf</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		create_and_remove_app(html, 'custom');
	})
	
	$("#save_xen_app_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app hover_xen'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>仿真应用--"+(recordIndex[3]++)+"</header>" + 
				"<div class='contentbody'>" + 
					"<table class='table table-striped'>" + 
						"<tr><td>节点：</td><td colspan='2'>2001,2002,2003,2004,2005</td></tr>" + 
						"<tr><td >应用：</td><td>QQ2013</td><td>自动运行</td></tr>" + 
						"<tr><td></td><td>Office2007</td><td>非自动运行</td></tr>" + 
						"<tr><td></td><td>Rtx2010</td><td>自动运行</td></tr>" + 
						"<tr><td></td><td>Apache</td><td>非自动运行</td></tr>" + 
						"<tr><td></td><td>KAV</td><td>自动运行</td></tr>" + 
						"<tr><td></td><td>Foxmail</td><td>自动运行</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		create_and_remove_app(html, 'xen');
	});
	
	$("#save_flow_app_btn").click(function (){
		var html = $(
			"<li class='slider_box hover_app hover_flow'>" + 
				"<span id='app_" + app_index + "' class='close_img'><i class='icon-remove'></i></span>" +
				"<header id='slider_tit_"+app_index+"' data='1'>流量应用--"+(recordIndex[4]++)+"</header>" + 
				"<div class='contentbody'>" + 
					"<table class='table table-striped'>" + 
						"<tr><td>流量配置文件：</td><td>custom_flow.conf</td></tr>" + 
						"<tr><td>流量发生方式：</td><td>循环</td></tr>" + 
						"<tr><td>循环次数：</td><td>256</td></tr>" + 
						"<tr><td>流量时间间隔：</td><td>10s ~ 100s</td></tr>" + 
					"</table>" + 
				"</div>" + 
			"</li>"
		);
		create_and_remove_app(html, 'flow');
	})
	
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
				domheight = parseInt(listDom.css('height').split('px')[0] - thispH);
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
	var p = new Process(2);
	
}