/*
        名称    链接地址     images ( 310 * 150 double属性将无效 ) 没有将被填充随机颜色 卡片大小( 横向double 纵向 double-vertical )
*/

var linkDatas = [
    /*
    {
        'group-name': '疫情监控',
        'group-info': 'WebGL',
        'group-data': [
            {'name' : '疫情趋势 - 世界', 'href': 'http://10.14.14.14/virus_globe/index.html', 'images': 'globl.jpg','color': '','card': 'double'},
            {'name' : '疫情趋势 - 中国', 'href': 'http://10.14.14.14/chinaTrend/china_trend.html', 'images': 'newui.png' ,'color': '','card': 'double'},
            {'name' : '疫情监控 - 世界', 'href': 'http://10.255.80.5/world.html', 'images': 'dpworld.png' ,'color': '','card': 'double'},
            {'name' : '疫情监控 - 中国', 'href': 'http://10.255.80.5/hlj.html', 'images': 'dphlj.png','color': '','card': 'double'},
            
        ]
    },
    {
        'group-name': '安全事件展示',
        'group-info': '',
        'group-data': [
            {'name' : 'WB', 'href': 'http://10.14.14.14/staticwb/index_timer_static.html', 'images': 'wb.png' ,'color': '','card': 'double'},
            {'name' : '失窃密主动监管平台', 'href': 'http://10.14.14.14/earthgf/index.html', 'images': '','color': '','card': 'double'},
            {'name' : '地  球', 'href': 'http://10.14.14.14/earth/index.html', 'images': 'earth.png','color': '','card': 'double double-vertical'},
            
        ]
    },

    {
        'group-name': '可视化',
        'group-info': '',
        'group-data': [
            {'name' : '恶意代码可视化', 'href': 'http://10.14.14.14/virusbk/index.html', 'images': 'virusbk.png','color': '','card': 'double'},
            {'name' : '拓扑 - 星云', 'href': 'http://10.14.14.14/starmap/index.html', 'images': 'startmap.png','color': '','card': 'double'},
            {'name' : '沙  盘', 'href': 'http://10.14.14.14/t_platform/t_platform.html', 'images': 'spcn.png','color': '','card': 'double'},
            {'name' : '中水系统', 'href': 'http://10.14.14.14/zhongshui/webgl_loader_json_objconverter.html', 'images': '','color': '','card': 'double'},
            {'name' : '团队建设', 'href': 'http://10.14.14.14/person/person.html', 'images': 'person.png','color': '','card': 'double'},
            
        ]
    },

    {
        'group-name': '图表设计',
        'group-info': '',
        'group-data': [
            {'name' : '三维图表', 'href': 'http://10.14.14.14/threechart/index.html', 'images': '3dchart.png','color': '','card': 'double'},
            {'name' : '趋势柱图', 'href': 'http://10.14.14.14/custom-bar/index.html', 'images': 'cbar.png' ,'color': '','card': 'double'},
            {'name' : 'AVL SDK 流程图', 'href': 'http://10.14.14.14/avl_web_demo/newpage.html', 'images': '' ,'color': '','card': 'double'},
        ]
    },

    {
        'group-name': 'Others',
        'group-info': '',
        'group-data': [
            
            {'name' : 'Strut', 'href': 'http://10.14.14.14/strut/index.html', 'images': '' ,'color': 'red','card': 'double'},
            {'name' : 'GitLab', 'href': 'http://10.255.80.48', 'images': '' ,'color': 'blueDark','card': 'double'},

        ]
    }*/

    {
        'group-name': '可视化项目',
        'group-info': '',
        'group-data': [
            {'name' : 'DNS', 'href': 'demos/dns_project/index.html', 'images': 'dns_project.png','color': '','card': 'quadro double-vertical'},
            //{'name' : '部署分布', 'href': 'demos/C_monitor/index.html', 'images': 'c_monitor.png','color': '','card': 'double'},
            {'name' : '数据来源', 'href': 'demos/newdaping/world.html', 'images': 'newdpworld.png','color': '','card': 'double'},
            {'name' : '实时安全事件模拟3D', 'href': 'demos/newdapingchina/blue.html', 'images': 'newdpchina.png','color': '','card': 'double'},
            //{'name' : '实时安全事件模拟2D', 'href': 'demos/newdapingchina/world.html', 'images': 'dpworld.png','color': '','card': 'double'},
            {'name' : 'Hack分布', 'href': 'demos/virus_globe/index.html', 'images': 'globl.jpg','color': '','card': 'double'},
            //{'name' : '虚拟网络', 'href': 'demos/topos/pages/platform_topo/platform_topo.html', 'images': 'platform_topo.png','color': '','card': 'double'},
            //{'name' : '网络拓扑图', 'href': 'demos/topos/pages/index/index.html', 'images': 'topos_index.png','color': '','card': 'double'},
            //{'name' : '流程图', 'href': 'demos/avl_web_demo/index.html', 'images': '','color': '','card': 'double'},
            {'name' : '僵尸网络', 'href': 'demos/earthgf_min/', 'images': 'earthgf_min.png','color': '','card': 'double'},
        ]
    },
    {
        'group-name': '实验',
        'group-info': '',
        'group-data': [
			{'name' : '疫情', 'href': 'demos/camberCube/', 'images': 'globe_warning.png','color': '','card': 'double'},
            {'name' : 'Fire', 'href': 'demos/sparks/index.html', 'images': 'sparks.png','color': '','card': 'double'},
            {'name' : '球面轨迹', 'href': 'demos/globe_path/', 'images': 'globe_path.png','color': '','card': 'double'},
            {'name' : '沙盘', 'href': 'demos/xietong_scene_min/', 'images': 'shapan.png','color': '','card': 'double'},
            {'name' : '数据流向', 'href': 'demos/earth/index.html', 'images': 'earth.png','color': '','card': 'double double-vertical'},
            
        ]
    },

];