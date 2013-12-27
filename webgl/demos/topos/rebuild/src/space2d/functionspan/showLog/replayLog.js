
//======================================================================================
//  Description: 日志展示
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.replayLog = function (options){
    this.scene = options.scene;
    this.init();
    this.gobackflag = false;
    this.replayfalg = false;
    
    this.num = 1;
	this.saveLastinfo = [];
}

Space2D.replayLog.prototype.init = function(){
    var __this = this;
    this.gateway = new OOPTEST.GatewayRequest();
    this.gateway.request(OOPTEST.Gateways['getshowLogPage'], function (page){
        __this.scene.sceneDom.append(page);
        // __this.replayButtonI();
        // __this.replayButtonII();
        // 绑定按钮事件
        $('#replayLogBtn').click(function(){
            if(Space2D.Globle.specialCardStatus.length >= 1){
                __this.openReplayPanel(Space2D.Globle.specialCardStatus[0]);
            }
        });
        $('#replayLogBtn2').click(function(){
            if(Space2D.Globle.specialCardStatus.length >= 2){
                __this.openReplayPanel(Space2D.Globle.specialCardStatus[1]);
            }
        });
        $('#lookaction').find('.closepanel').click(function(){
            __this.closeReplayPanel();
        });
        __this.drawTitle();
        // _this.openReplayPanel();
        $("#backoverflow").mCustomScrollbar({
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
                autoExpandHorizontalScroll:true /*auto expand width for horizontal scrolling: boolean*/
            }
        });
    });
}

Space2D.replayLog.prototype.drawTitle = function(status){
    this.replaytitle = new Space2D.BaseSvgModel({
        idName: 'backtitle',
        containerName: 'lookaction',
        className: 'backtitle',
        width: 640,
        height: 38
    });
    rectattr = {"fill-opacity": 0.95,"stroke-opacity": 0.0};
    textattr = {fill: "#ffffff", "font-family":"微软雅黑", "font-size":12, "font-weight": "bold", "text-anchor":"start"};
    this.replaytitle.GetSvgDom().rect(0, 0, 650, 25, 0).attr({"opacity": 0});
    this.replaytitle.GetSvgDom().rect(210 , 12, 80, 25, 0).attr(rectattr).attr({fill: "#a30008"});
    this.replaytitle.GetSvgDom().rect(310 , 12, 80, 25, 0).attr(rectattr).attr({fill: "#EC8524"});
    this.replaytitle.GetSvgDom().rect(410 , 12, 80, 25, 0).attr(rectattr).attr({fill: "#0776a0"});
    this.replaytitle.GetSvgDom().rect(510 , 12, 80, 25, 0).attr(rectattr).attr({fill: "#ef4136"});
    this.replaytitle.GetSvgDom().text(227 , 25 , "创建进程").attr(textattr),
    this.replaytitle.GetSvgDom().text(327 , 25 , "打开文件").attr(textattr),
    this.replaytitle.GetSvgDom().text(427 , 25 , "读取文件").attr(textattr),
    this.replaytitle.GetSvgDom().text(527 , 25 , "写入文件").attr(textattr);
}

Space2D.replayLog.prototype.openReplayPanel = function(flag){
	var _this = this ;
    if ($('#lookaction').css('opacity') != 1 ){
    	Space2D.Globle.dataary = (flag == '4' ? this.log_back : this.log_replay);
        if((flag == '4' && this.gobackflag) || (flag == '1' && this.replayfalg)){
            this.openShade(20);
            this.calculatePanelCss(flag == '1');
            var __height = Space2D.Globle.dataary.length*40 - 40;
            this.logBack = Raphael('backsvg', 640, (__height > 0 ? __height : 0));
            $('#backsvg').css({'height': (Space2D.Globle.dataary.length*40-40)});
// // 
            this.drawreplayBackgroud(Space2D.Globle.dataary.length);
// 
            this.interTime1 = setInterval(function(){
                _this.getActionLog();
            }, 100);
            $('#lookaction').css({'z-index': '21','opacity': '1'});
            // rereplayflag = false;
        }  
    }
}

Space2D.replayLog.prototype.drawreplayBackgroud = function(aryLen){
    this.logBack.rect(0, 0, 650, aryLen*40 + 40, 0).attr({"opacity": 0}),
    this.logBack.path("M250,0L250,"+(aryLen*40 + 10)).attr({stroke: "#4B8F88", "stroke-width": 1, "stroke-dasharray":"- ", "stroke-opacity": 0.9}),
    this.logBack.path("M350,0L350,"+(aryLen*40 + 10)).attr({stroke: "#4B8F88", "stroke-width": 1, "stroke-dasharray":"- ", "stroke-opacity": 0.9}),
    this.logBack.path("M450,0L450,"+(aryLen*40 + 10)).attr({stroke: "#4B8F88", "stroke-width": 1, "stroke-dasharray":"- ", "stroke-opacity": 0.9}),
    this.logBack.path("M550,0L550,"+(aryLen*40 + 10)).attr({stroke: "#4B8F88", "stroke-width": 1, "stroke-dasharray":"- ", "stroke-opacity": 0.9});
}

Space2D.replayLog.prototype.replayButtonI = function(){
    var _this = this;
    this.getLog = new OOPTEST.GatewayRequest();
    (Space2D.Globle.replayIdI) && (OOPTEST.Gateways['getBackLog']['paras'] = {'id' : Space2D.Globle.replayIdI});
    this.getLog.request(OOPTEST.Gateways['getBackLog'], function (_list){
        var isSearover = false;
        for(i= _list.length-1; i>=0 ; i--){
            if(_list[i]['node_class'] == 'end'){
                isSearover = true;
            }
        }
        if(isSearover){
            _this.log_back = [];
            for(j=0;j<_list.length;j++){
                if(_list[j]['node_class'] == 'start') continue;
                var _logary = [];
                var _strtext = _list[j]['content'];
                _logary.push(_list[j]['status']);
                _logary.push(_strtext);
                 _logary.push(_list[j]['time']);
                _this.log_back.push(_logary);
            }
            _this.gobackflag = true;
            // 更换 图片
            // imgstatus(false); 
            Space2D.Globle.specialCardImg[0] && Space2D.Globle.specialCardImg[0].attr({src: Space2D.Globle.CreatePro});
        }
    });
   
}

Space2D.replayLog.prototype.replayButtonII = function(){
    var _this = this;
    this.getLog = new OOPTEST.GatewayRequest();
    (Space2D.Globle.replayIdI) && (OOPTEST.Gateways['getReplayLog']['paras'] = {'id' : Space2D.Globle.replayIdII});
    this.getLog.request(OOPTEST.Gateways['getReplayLog'], function (_list){
        var isSearover = false;
        for(i= _list.length-1; i>=0 ; i--){
            if(_list[i]['node_class'] == 'end'){
                isSearover = true;
            }
        }
        if(isSearover){
            _this.log_replay = [];
            for(j=0;j<_list.length;j++){
                if(_list[j]['node_class'] == 'start') continue;
                var _logary = [];
                var _strtext = _list[j]['content'];
                _logary.push(_list[j]['status']);
                _logary.push(_strtext);
                 _logary.push(_list[j]['time']);
                _this.log_replay.push(_logary);
            }
            _this.replayfalg = true;
            Space2D.Globle.specialCardImg[1] && Space2D.Globle.specialCardImg[1].attr({src: Space2D.Globle.WriteFile});
        }
    });
   
}

Space2D.replayLog.prototype.openShade = function(_value){
    $('#shadediv').css({'z-index': _value});
}

Space2D.replayLog.prototype.calculatePanelCss = function(flag){
    /* 计算面板宽高位置 */
    var lookactionheight = window.innerHeight - 140;
    if(flag){
        lookactionheight > 690 ? lookactionheight = 690 : lookactionheight = lookactionheight ;
    }else{
        lookactionheight > 550 ? lookactionheight = 550 : lookactionheight = lookactionheight ;
    }
    $('#lookaction').css({
        'height': lookactionheight,
        'top': (window.innerHeight - lookactionheight - 140)/2 , 
        'left': (window.innerWidth - 640)/2
    });
    $('#backoverflow').mCustomScrollbar("scrollTo","top");
}



Space2D.replayLog.prototype.getActionLog = function(){
	var replayary = Space2D.Globle.dataary ;
	if( replayary.length == 0 ) return ;
	var currentrecord = replayary[this.num-1];
	
    var _strtext = '',
        _strtextary = currentrecord[1].split(';'),
        lasttextary = currentrecord[1].split(';'),
        _lasttext = '',
        _time = currentrecord[2],
        _status = currentrecord[0],
        _lastinfo = [],
        arrowcolor = '#FFF';
// 
    if(_strtextary.length > 0){

        lasttextary = lasttextary[1].split("/");
        if(lasttextary.length > 0){
            _lasttext = lasttextary[lasttextary.length-1];
            lasttextary = _lasttext.split(":");
            if(lasttextary.length>0)  _lasttext = lasttextary[0];
        }

        _strtextary = _strtextary[3].split("/");
        
        if(_strtextary.length > 0){
            _strtext = _strtextary[_strtextary.length-1];
            _strtextary = _strtext.split(":");
            if(_strtextary.length>0)  _strtext = _strtextary[0];
        }
        _lastinfo.push(_strtext);
    }

    if(this.num < replayary.length){ 

        l_set = this.logBack.set();

        if(currentrecord[0] == 'create process'){
            var l_back = this.logBack.rect(backlog_cx+25, backlog_cy + (this.num-1)*40, 130, 30, 5).attr(backlogParams[0]);
        }
        if(currentrecord[0] == 'create file'){
            var l_back = this.logBack.rect(backlog_cx+25, backlog_cy + (this.num-1)*40, 130, 30, 5).attr(backlogParams[1]);
        }
        if(currentrecord[0] == 'read file'){
            var l_back = this.logBack.rect(backlog_cx+25, backlog_cy + (this.num-1)*40, 130, 30, 5).attr(backlogParams[2]);
        }
        if(currentrecord[0] == 'write file'){
            var l_back = this.logBack.rect(backlog_cx+25, backlog_cy + (this.num-1)*40, 130, 30, 5).attr(backlogParams[3]);
            // l_back.glow({'width' : 10, 'color': 'red','fill' : false});
        }
        
        var cx1 = backlog_cx + 200,
            cy1 = backlog_cy + (this.num-1)*40 + 15;
        var l_text,l_text_1 = null,_strtext_1;
        if(_strtext.length > 16){
            _strtext_1 = _strtext.substring(13,_strtext.length);
            _strtext = _strtext.substring(0,13);
            l_text = this.logBack.text(backlog_cx + 90 , cy1-7 , _strtext).attr(back_text_params);
            l_text_1 = this.logBack.text(backlog_cx + 90 , cy1+6 , _strtext_1).attr(back_text_params);
        }else{
            l_text = this.logBack.text(backlog_cx + 90 , cy1 , _strtext).attr(back_text_params);
        }
        
        l_set.push(l_back);
        l_set.push(l_text);
        if(l_text_1 != null){
            l_set.push(l_text_1);
        }

        l_set.animate({"fill-opacity": 0.8, "stroke-opacity": 0.8}, 200);
        var _tline;
        if(currentrecord[0] == 'create process'){
            l_set.animate({transform: "t-300,0"}, 100);
            _tline = this.logBack.path("M" + (backlog_cx - 410) + "," + cy1 + "L" + (backlog_cx-280) + ","+ cy1).attr({stroke: "#D4E5F5", "stroke-width": 0.5, "stroke-dasharray":"- ", "stroke-opacity": 1});
            _lastinfo.push(0);
            arrow_ex = 250;
            arrow_ey = (this.saveLastinfo.length * 40) + 0;
            arrowcolor = arrowcolorary[0];
        }
        if(currentrecord[0] == 'create file'){
            l_set.animate({transform: "t-200,0"}, 100);
            _tline = this.logBack.path("M" + (backlog_cx - 410) + "," + cy1 + "L" + (backlog_cx-180) + ","+ cy1).attr({stroke: "#D4E5F5", "stroke-width": 0.5, "stroke-dasharray":"- ", "stroke-opacity": 1});
            _lastinfo.push(1);
            arrow_ex = 286;
            arrow_ey = (this.saveLastinfo.length * 40) + 2;
            arrowcolor = arrowcolorary[1];
        }
        if(currentrecord[0] == 'read file'){
            l_set.animate({transform: "t-100,0"}, 100);
            _tline = this.logBack.path("M" + (backlog_cx - 410) + "," + cy1 + "L" + (backlog_cx-80) + ","+ cy1).attr({stroke: "#D4E5F5", "stroke-width": 0.5, "stroke-dasharray":"- ", "stroke-opacity": 1});
            _lastinfo.push(2);
            arrow_ex = 385;
            arrow_ey = (this.saveLastinfo.length * 40) + 14;
            arrowcolor = arrowcolorary[2];
        }
        if(currentrecord[0] == 'write file'){
            //l_set.animate({transform: "t-100,0"}, 200);
            _tline = this.logBack.path("M" + (backlog_cx - 410) + "," + cy1 + "L" + (backlog_cx+20) + ","+ cy1).attr({stroke: "#D4E5F5", "stroke-width": 0.5, "stroke-dasharray":"- ", "stroke-opacity": 1});
            _lastinfo.push(3);
            arrow_ex = 485;
            arrow_ey = (this.saveLastinfo.length * 40) + 14;
            arrowcolor = arrowcolorary[3];
        }

         //开始绘制箭头
        for(i=this.saveLastinfo.length-1;i>=0;i--){
            if(_lasttext == this.saveLastinfo[i][0]){
                // x: 
                // y:(i*40)+40
                if(this.saveLastinfo[i][1] == 0){
                    arrow_sx = 250;
                }else if(this.saveLastinfo[i][1] == 1){
                    arrow_sx = 350;
                }else if(this.saveLastinfo[i][1] == 2){
                    arrow_sx = 450;
                }else if(this.saveLastinfo[i][1] == 3){
                    arrow_sx = 550;
                }
                arrow_sy = (i*40)+30;
                
                var arrow = this.logBack.path('M'+arrow_sx+','+arrow_sy+'L'+arrow_ex+','+arrow_ey+'z').attr(arrowcolor);
                // _lbary.push(arrow);
                break;

            }
        }
        
        var _lbcir = this.logBack.circle(backlog_cx - 430, cy1, 6).attr({stroke: "#507973", "stroke-width": 1,fill: "#507973", "fill-opacity": 0.9,});
        var _lbtime = this.logBack.text(backlog_cx - 410 , cy1 + 8 , currentrecord[2]).attr(date_text_params);
        
        // _lbary.push(_lbcir);
        // _lbary.push(_lbtime);
        // _lbary.push(l_back);
        // _lbary.push(l_text);
        // if(l_text_1 != null){
            // _lbary.push(l_text_1);
        // }
        // _lbary.push(_tline);
        
        this.saveLastinfo.push(_lastinfo);

        this.num++;

    }
}

Space2D.replayLog.prototype.closeReplayPanel = function(){
    /* 关闭回放页面 */
    this.openShade(-1);
    $('#lookaction').css({'opacity': '0'});
    $('#lookaction').css({'z-index': '-10'});
    this.logBack.remove();
    window.clearInterval(this.interTime1);  
    this.num = 1;
    this.saveLastinfo = [];
    // rereplayflag = true;
}

var backlog_cx = 460,
    backlog_cy = 0;
var backlogParams = [
    {
        fill: "#a30008",
        "opacity": 1,
        "fill-opacity": 0.95,
        "stroke-opacity": 0
    },
    {
        fill: "#EC8524",
        "opacity": 1,
        "fill-opacity": 0.95,
        "stroke-opacity": 0
    },
    {
        fill: "#0776a0",
        "opacity": 1,
        "fill-opacity": 0.95,
        "stroke-opacity": 0,
    },
    {
        // fill: "#007929",
        fill: "#ef4136",
        "opacity": 1,
        "fill-opacity": 0.95,
        stroke: "#ef4136", 
        "stroke-opacity": 0
    }
];

var back_text_params = {
    fill: "#ffffff", 
    "fill-opacity": 0.0,
    "font-family":"微软雅黑", 
    "font-size":9, 
    "text-anchor":"middle"
};
var backtypeParams = [
    {
        fill: "#a30008",
        "fill-opacity": 0.95,
        "stroke-opacity": 0.0
    },
    {
        fill: "#EC8524",
        "fill-opacity": 0.95,
        "stroke-opacity": 0.0
    },
    {
        fill: "#0776a0",
        "fill-opacity": 0.95,
        "stroke-opacity": 0.0
    },
    {
        fill: "#ef4136",
        "fill-opacity": 1,
        "stroke-opacity": 0.0
    }
];
var date_text_params = {
    fill: "#ffffff", 
    "fill-opacity": 0.9,
    "font-family":"微软雅黑", 
    "font-size":10, 
    "text-anchor":"start"
};
var arrowcolorary = [
   {"stroke": "#a30008",'fill': '#a30008'}, 
   {"stroke": "#EC8524",'fill': '#EC8524'}, 
   
   {"stroke": "#0776a0",'fill': '#0776a0'},
   {"stroke": "#ef4136",'fill': '#ef4136'} //#007929
]