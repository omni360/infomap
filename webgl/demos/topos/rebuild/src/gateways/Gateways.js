
//======================================================================================
//  Description: 网关URL映射
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-08
//  Author: lvmy
//======================================================================================



OOPTEST.Gateways = {
	//安全事件列表
	'detectInfo': {
		'url': '/lmy/get_session_detect_id/',
		'type': 'json'
	},
	
	//固定的事件列表
	'detectInfoReplay': {
		// 'url': '/lmy/get_history_detect_list/',
		'url': 'dataA.json',
		'type': 'json'
	},
	
	//拓扑节点信息
	'topoInfo': {
		'url': '/get_topo_json/',
		'paras': {'topo_id': 0},	//'topo_id'
		'type': 'json'
	},
	
	//拓扑节点信息
	'topoInfoRelplay': {
		// 'url': '/get_replay_topo_json/',
		'url': 'dataD.json',
		'paras': {'topo_id': 0},	//'topo_id'
		'type': 'json'
	},
	
	//拓扑实时安全事件
	'topoEventInfo': {
		'url': '/lmy/get_event_timer_data/',
		'paras': {},
		'type': 'json'
	},
	
	//拓扑历史安全事件
	'topoEventInfoReplay': {
		// 'url': '/lmy/get_event_history_data/',
		'url': 'dataE.json',
		'paras': {},
		'type': 'json'
	},
	
	//获取预览的拓扑信息
	'getPreviewTopoJson': {
		'url': '/get_preview_topo_json/',
		'paras': {},
		'type': 'json'
	},
	
	// 获取拓扑信息页面
	'getTopoInfoPage': {
		'url': '../../rebuild/src/space2d/functionspan/topoinfo/topoInfo.html',
		'paras': {},
		'type': 'text'
	},
	// 获取拓扑信息数据
	'getTopoInfoData': {
		// 'url': '/xc/topu_info/',
		'url': 'dataC.json',
		'paras': {'id': 0},
		'type': 'json'
	},
	// 获取拓扑信息页面
	'getmapStylePage': {
		'url': '../../rebuild/src/space2d/functionspan/mapstyle/mapStyle.html',
		'paras': {},
		'type': 'text'
	},
	// 获取查找拓扑节点
	'getfindNodePage': {
		'url': '../../rebuild/src/space2d/functionspan/findNode/findNode.html',
		'paras': {},
		'type': 'text'
	},
	// 获取缩放尺页面
	'getdynamiChartPage': {
		'url': 'src/space2d/functionspan/dynamichart/dynamiChart.html',
		'paras': {},
		'type': 'text'
	},
	// 展示日志
	'getshowLogPage': {
		'url': '../../rebuild/src/space2d/functionspan/showLog/showLog.html',
		'paras': {},
		'type': 'text'
	},
	// 展示日志
	'getmenuPanelPage': {
		'url': '../../rebuild/src/space2d/functionspan/menupanel/menuPanel.html',
		'paras': {},
		'type': 'text'
	},
	// 展示日志
	'geteventListPage': {
		'url': 'src/space2d/functionspan/eventlist/eventList.html',
		'paras': {},
		'type': 'text'
	},
	// 展示日志
	'getreplayBarPage': {
		'url': '../../rebuild/src/space2d/functionspan/replayBar/replayBar.html',
		'paras': {},
		'type': 'text'
	},
	// 展示日志
	'getreplayTimeCardPage': {
		'url': '../../rebuild/src/space2d/functionspan/replaytime/replaytime.html',
		'paras': {},
		'type': 'text'
	},
	'getreplayTime': {
		// 'url': '/xc/replay_time/',
		'url': 'dataG.json',
		'paras': {},
		'type': 'json'
	},
	'getreplayLogMaxTime': {
		// 'url': '/xc/replay_log_time/',
		'url': 'dataF.json',
		'paras': {},
		'type': 'json'
	},
	// 获取日志信息 
	'getTimerLog': {
		// 'url': '/xc/host_tlog/',
		'url': 'dataB.json',
		'paras': {},
		'type': 'json'
	},
	// 获取日志信息 
	'getShowReplayLog': {
		// 'url': '/xc/replay_log/',
		'url': 'dataH.json',
		'paras': {},
		'type': 'json'
	},
	// 获取回放日志
	'getBackLog': {
		'url': '/xc/log_back/',
		'paras': {'id': -100},
		'type': 'json'
	},
	// 获取回放日志
	'getReplayLog': {
		'url': '/xc/log_back/',
		'paras': {'id': -100},
		'type': 'json'
	},
	// 获取节点信息
	'getNodeInfo': {
		'url': '/xc/node_info/',
		'paras': {'id': 0},
		'type': 'json'
	},
	// 获取节点信息
	'geteventList': {
		'url': '/lmy/get_history_event_list/',
		'paras': {},
		'type': 'json'
	}
}
