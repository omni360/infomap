window.parent && (window.parent.topo.isRenderer = false);

//屏蔽鼠标事件
document.oncontextmenu = function() {
	return false;
};
var system;

var apps = []
	app_index = 0;

var show_types = [
	'点状态展示', 
	'点程度展示', 
	'点镜头特写', 
	'路径展示', 
	'线流量展示', 
	'线镜头特写', 
	'曲线图', 
	'柱状图', 
	'饼状图', 
	'滚动展示' 
];

function init() {
	
	system = new OOPTEST.System('SPACE3D', 'history', 7000, 8000);
	system.update(topoJsonList[0]);
	
	//alert对话框
	function popup_alert(str){
		
		str = str == undefined ? '' : str; 
		
		$('#alert_dialog .control-label').html(str);
		
		$('#alert_dialog').addClass('models-dialog-show');
	}
	
	$('#alert_dialog_confirm').click(function (){
		$('#alert_dialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#alert_dialog').removeClass('models-dialog-show');
			$('#alert_dialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	
	
	var countTop = 0,
		closeFlag = true,
		createFlag = true,
		listDom = $('#leftSilder'),
		tempy;
		
	// create_and_remove_app(html, 'flow');
	var test_data = [{
		name: '网络行为监控--1',
		center: ("<table class='table table-striped'>" + 
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
					"</table>"),
		panel: ("<div class='config-dialog-hidepanel'>" + 
						"<div class='config-dialog-label'>" + 
							"<label>点型展示：</label>" +
						"</div>" +
						"<div class='config-dialog-form'>" +
							'<div class="myradio-set">' + 
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-3" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-3">点程度展示</label>' +
							    '</div>' +
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-2"  title="单次"/>' +
							    	'<label class="radio-label-2">点状态展示</label>' +
							    '</div>' +
						    	'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-1" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-1">点镜头特写</label>' +
							    '</div>' +
						    '</div>' +
						"</div>" +
					"</div>")
	},
	{
		name: '应用监控--1',
		center: ('<table class="table table-striped">'+
					'<tr><td>应用：</td><td>Worm应用/仿真应用</td></tr>'+
					'<tr><td>配置方式：</td><td>批量</td></tr>'+
					'<tr><td>监控名称：</td><td>应用监控</td></tr>'+
					'<tr><td>规则文件：</td><td>appMonitorConf.conf</td></tr>'+
					'<tr><td>是否保存配置规则</td><td>是</td></tr>'+
					'<tr><td>是否捕获数据包</td><td>否</td></tr>'+
				'</table>'),
		panel: ("<div class='config-dialog-hidepanel'>" + 
						"<div class='config-dialog-label'>" + 
							"<label>图标展示：</label>" +
						"</div>" +
						"<div class='config-dialog-form'>" +
							'<div class="myradio-set">' + 
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-3" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-3">曲线图</label>' +
							    '</div>' +
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-2"  title="单次"/>' +
							    	'<label class="radio-label-2">柱状图</label>' +
							    '</div>' +
						    	'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-1" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-1">饼状图</label>' +
							    '</div>' +
						    '</div>' +
						"</div>" +
					"</div>")
	},
	{
		name: '主机行为监控--1',
		center: ("<table class='table table-striped'>" + 
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
					"</table>" ),
		panel: ("<div class='config-dialog-hidepanel'>" + 
						"<div class='config-dialog-label'>" + 
							"<label>线型展示：</label>" +
						"</div>" +
						"<div class='config-dialog-form'>" +
							'<div class="myradio-set">' + 
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-3" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-3">路径展示</label>' +
							    '</div>' +
								'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-2"  title="单次"/>' +
							    	'<label class="radio-label-2">线流量展示</label>' +
							    '</div>' +
						    	'<div class="myradio-elem">' +
							    	'<input type="radio" name="mbjg_'+i+'" class="myradio radio-selector-1" checked="checked" title="循环"/>' +
							    	'<label class="radio-label-1">线镜头特写</label>' +
							    '</div>' +
						    '</div>' +
						"</div>" +
					"</div>")
	}
	]
	
	
	
	for(var i = 0 ; i < 3 ; i++){
		var html = $("<li class='slider_box hover_app hover_flow'>" + 
				"<span class='cog_status'>未配置</span><span id='app_" + i + "' class='close_img' data='0'><i class='icon-cog'></i></span>" +
				"<div id='configdia_" + i + "' class='config-dialog'>"+
					"<div class='config-dialog-label'>" + 
						"<label>是否展示：</label>" +
					"</div>" +
					"<div class='config-dialog-form'>" +
						'<div class="switch-button">' +
							'<input type="radio" name="some_'+i+'" value="否" class="switch-button-radio switch-button-radio-no" checked="checked"/>' +
							'<input type="radio" name="some_'+i+'" value="是" class="switch-button-radio switch-button-radio-yes" />' +
							'<div class="switch-button-body">' +
								'<span class="switch-button-bg"></span>' +
								'<span class="switch-button-text switch-button-left">否</span>' +
								'<span class="switch-button-text switch-button-right">是</span>' +
							'</div>' +
						'</div>' +
					"</div>" +
					test_data[i].panel +
					"<div class='config-dialog-footbar'>" + 
						"<button id='config-btn-"+i+"' class='pull-right barbutton '>保存配置</button>" +
					"</div>" +
				"</div>" +
				"<header id='slider_tit_"+i+"' data='0'>"+test_data[i].name+"</header>" + 
				"<div class='contentbody'  style='display:none;'>" + test_data[i].center + "</div>" + 
			"</li>"
		);
		
		listDom.append(html);
		
		$('input[name="some_'+i+'"]').click(function(){
			if($(this).val() == '是'){
				$(this).parents('.config-dialog').find('.config-dialog-hidepanel').show('normal');
			}else{
				$(this).parents('.config-dialog').find('.config-dialog-hidepanel').hide('normal');
			}
		});
		$('#configdia_'+i).find('.config-dialog-hidepanel').hide();
		$('#app_'+i).click(function(){
			if($(this).parent().find('header').attr('data') == 0){
				closedialog($(this).parent().find('header'));
			}
			var thisindex = parseInt(($(this).attr('id')).split('_')[1]);
			$('.config-dialog').each(function(i){
				i != thisindex && $(this).removeClass("config-dialog-show");
			});
			$(this).parent().find('.config-dialog').toggleClass("config-dialog-show");
		});
		$('#config-btn-'+i).click(function(){
			var temp = $(this).parents('.slider_box');
			temp.find('.cog_status').html('已配置').css({'color': '#FB9D15'});
			temp.find('.config-dialog').removeClass("config-dialog-show");
		});
		
		html.attr({'index': i,'datay': countTop});
		
		transformFun(
			html,
			{'opacity': 1},
			['translateY('+countTop+'px)']
		);
		
		var thispH = parseInt(html.css('height').split('px')[0]) + 10;
		
		countTop += thispH;
		
		apps.push({'id' : 'app_' + i, 'dom': html, 'type': ''});
		
		$('#slider_tit_'+i).click(function(){
			closedialog($(this));
		});
		
		listDom.css({'height': countTop});
		
	}
	
	function closedialog(dom){
		dom.parent().find('.config-dialog').removeClass("config-dialog-show");
		var thisp = dom.parent();
			thisnext = dom.next('.contentbody');
		if(dom.attr('data') == 1){
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
			
			dom.attr({'data': 0});
			
			for(var i = 0; i < apps.length; i++){
				if(i > parseInt(thisp.attr("index"))){
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
				if(i > parseInt(thisp.attr("index"))){
					apps[i]['dom'].attr({"datay": (parseInt(apps[i]['dom'].attr("datay")) + thispH)});
					transformFun(
						apps[i]['dom'],
						{},
						['translateY('+apps[i]['dom'].attr("datay")+'px)']
					);
				}
			}
			
			dom.attr({'data': 1});
			setTimeout(function(){
				thisnext.css({
					'opacity': 1
				});
			},0.7);
			
		}
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
	var p = new Process(4);
	
}