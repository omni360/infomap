
//======================================================================================
//  Description: 2D场景
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.Globle = {};

Space2D.Scene = function(options){
	options = options || {};
	
	this.type = options.type;
	
	this.sceneContainer = options.sceneContainer !== undefined ? options.sceneContainer : 'body';
	
	this.sceneDom = this.sceneContainer !== 'body' ? $('#'+this.sceneContainer) : $('body');
	
	this.listenWindowResize();
	
	this.gateway = new OOPTEST.GatewayRequest();
	
	this.configureScene();
}
/*
 * 从后台获取配置信息 若从前台传入则不需此方法
 */
Space2D.Scene.prototype.getSetting = function(){}

/*
 * 配置场景
 */
Space2D.Scene.prototype.configureScene = function(){
	// 缩放尺
	this.zoomRuler = new Space2D.ZoomRulerSvgModel({
		idName: 'zoomRuler',
		containerName: 'body',
		className: 'zoomRuler',
		width: 58,
		height: 285
	});
	// 陀螺仪装饰
	// this.mapStyle = new Space2D.mapStyle({
		// scene: this
	// });
	// this.menuPanel = new Space2D.MenuPanel({
		// scene: this
	// });
	// 扇形菜单
	this.hostMenu = new Space2D.HostMenuSvgModel({
		idName: 'hostMenu',
		containerName: 'body',
		className: 'hostMenu',
		menuPanel: this.menuPanel
	});
	if( this.type == 'current'){
		// 拓扑信息
		this.tupoInfo = new Space2D.topoInfo({
			scene: this
		});
		//查找节点
		this.findNode = new Space2D.findNode({
			scene: this
		});
		// 动态图表
		this.dynamiChart = new Space2D.dynamiChart({
			scene: this
		});
		// 日志展示
		this.showLog = new Space2D.showLog({
			idName: 'timerlog',
			className: 'timerlog',
			width: 620,
			height: 250,
			scene: this
		});
	}else if ( this.type == 'replay'){
		// 日志展示
		this.historyLog = new Space2D.historyLog({
			idName: 'timerlog',
			className: 'timerlog',
			width: 620,
			height: 250,
			scene: this
		});
		this.replayTimeCard = new Space2D.replayTimeCard({
			scene: this
		});
		this.replayBar = new Space2D.replayBar({
			scene: this
		});
	}else if ( this.type == 'alarm'){
		// 日志展示
		// this.historyLog = new Space2D.historyLog({
			// idName: 'timerlog',
			// className: 'timerlog',
			// width: 620,
			// height: 250,
			// scene: this
		// });
		// this.replayTimeCard = new Space2D.replayTimeCard({
			// scene: this
		// });
		// this.replayBar = new Space2D.replayBar({
			// scene: this
		// });
	}else{
		this.tupoInfo = new Space2D.topoInfo({
			scene: this
		});
		// 日志展示
		this.showLog = new Space2D.showLog({
			idName: 'timerlog',
			className: 'timerlog',
			width: 620,
			height: 250,
			scene: this
		});
		// this.tupoInfo = new Space2D.topoInfo({
			// scene: this
		// });
		// 拓扑信息
		// this.tupoInfo = new Space2D.topoInfo({
			// scene: this
		// });
		
		// this.replayTimeCard = new Space2D.replayTimeCard({
			// scene: this
		// });
		// $('#zoomRuler').removeClass('zoomRuler');
		// this.eventList = new Space2D.eventList({
			// scene: this
		// });
		// 日志展示
		// this.historyLog = new Space2D.historyLog({
			// idName: 'timerlog',
			// className: 'timerlog',
			// width: 620,
			// height: 250,
			// scene: this
		// });
		// this.replayBar = new Space2D.replayBar({
			// scene: this
		// });
	}
	$(window.parent.document).find('#main_iframe').css({'opacity':1});
	// var stringUtils = new Space2D.StringUils();
	// console.info('|' + stringUtils.Trim('  String  ') + '|');
}

/*
 * 设置缩放比例尺
 */
Space2D.Scene.prototype.setZoomRuler = function(percent){
	this.zoomRuler.setRuler(percent);
}
/*
 * 打开扇形菜单
 */
Space2D.Scene.prototype.OpenNodeInfo = function(_id){
	//this.hostMenu.OpenMenu(_id);
}
/*
 * 监听屏幕大小改变事件
 */
Space2D.Scene.prototype.listenWindowResize = function(){
	window.addEventListener( 'resize', this.windowResizeHandler.bind(this), false );
}

Space2D.Scene.prototype.windowResizeHandler = function(){
	// 当窗口大小发生变化时，重绘菜单
	// 
	var _this = this;
	Space2D.Globle.timerLogFlag = false;
	setTimeout(function(){
		_this.hostMenu.redrawMenu();
		Space2D.Globle.timerLogFlag = true;
	},1000);
}
