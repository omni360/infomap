//======================================================================================
//  Description: 日志展示
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.Globle.maxEventId = 0;
Space2D.Globle.timerLogDataAry = [];
Space2D.Globle.msgBg = [];

Space2D.showLog = function (options){
	Space2D.BaseSvgModel.apply(this,arguments);
	this.scene = options.scene;
	this.stringUils = new Space2D.StringUils();
	this.CreateBgrect();
	this.maxEventId = 0;	// 存储库中取回的列表的Id最大值
	this.timerLogData = [];
	this.leftStr = this.rightStr = '';
	this.leftStrAry = this.rightStrAry = [];
	
	this.replayIdI = '-1';
	this.replayIdII = '-1';
	this.init();
	this.dispathEvent();
}

Space2D.showLog.prototype = Object.create(Space2D.BaseSvgModel.prototype);

Space2D.showLog.prototype.init = function(){
	setTimerLogData = this.setTimerLogData.bind(this);
	this.getway = new OOPTEST.GatewayRequest();
	// 初始化日志先关Id
	this.getway.request(OOPTEST.Gateways['detectInfoReplay'], function (detect_obj){
		// 设定展示日志查询id
		Space2D.Globle.timerLogId = detect_obj['log']['timer_log'];
		Space2D.Globle.replayIdI = detect_obj['log']['replay_i'];
		Space2D.Globle.replayIdII  = detect_obj['log']['replay_ii'];
		setTimerLogData();
	});
	this.replayLog = new Space2D.replayLog({
		scene: this.scene
	});
}

Space2D.showLog.prototype.CreateBgrect = function (){
	this.GetSvgDom().rect(0, 0, this.width, this.height).attr({stroke: "#FFF", "stroke-opacity": 0});
}

Space2D.showLog.prototype.setTimerLogData = function(){
	if(!Space2D.Globle.timerLogId) return ; 
	
	OOPTEST.Gateways['getTimerLog']['paras'] = {'id' : Space2D.Globle.timerLogId, 'max' : Space2D.Globle.maxEventId};
	this.getway.timerRequest(OOPTEST.Gateways['getTimerLog'], function (list){
		if(list.length == 0) return; 
        var _temp = [];
        Space2D.Globle.maxEventId = list[0]['event_id'];
        for(i=0;i<list.length;i++){
            _temp.push(list[i]);
        }
        Space2D.Globle.timerLogDataAry.push(_temp);
		OOPTEST.Gateways['getTimerLog']['paras'] = {'id' : Space2D.Globle.timerLogId, 'max' : Space2D.Globle.maxEventId};
	});
}

Space2D.showLog.prototype.getTimerLogData = function(){
	if(this.timerLogData.length == 0 && Space2D.Globle.timerLogDataAry.length > 0)
		this.timerLogData = Space2D.Globle.timerLogDataAry.shift();
	// console.info(this.timerLogData.length);
}  

Space2D.showLog.prototype.createMsgCard = function(){
	this.cardSet = this.msgBg = null;
	if(this.timerLogData.length == 0) return null;  
	this.timerOneLog = this.timerLogData.pop();
	this.timerOneLogClass = this.timerOneLog['node_class'];
	this.timerOneLogStatus = this.timerOneLog['status'];
	this.timerOneLogContentAry = this.timerOneLog['content'].split(";");
	if(this.timerOneLogStatus == 5){
		this.leftStr = this.timerOneLog['dstip'];
        this.rightStr = this.timerOneLog['content'];
	}else{
		this.leftStr = this.rightStrAry = '';
		(this.timerOneLogContentAry.length > 1) && (this.leftStrAry = this.timerOneLogContentAry[1].split("/"));
		(this.leftStrAry.length > 0) && (this.leftStr = ((this.leftStrAry.pop()).split(":")).pop());
		(this.timerOneLogContentAry.length > 3) && (this.rightStrAry = this.timerOneLogContentAry[3].split("/"));
		(this.rightStrAry.length > 0) && (this.rightStr = ((this.rightStrAry.pop()).split(":")).pop());
		this.leftStr = this.stringUils.widthCheck(this.leftStr,20)[0];
		this.rightStr = this.stringUils.widthCheck(this.rightStr,20)[0];
	}
	this.msgCard = new Space2D.MsgCardModel({
		svgDom : this.GetSvgDom(),
		msgStatus : this.timerOneLogStatus,
		msgStrLeft : this.leftStr,
		msgStrRight : this.rightStr,
		msgIp : this.timerOneLog['srcip'],
		msgTime : this.timerOneLog['time']
	});
	this.cardSet = this.msgCard.getMsgCardSet();
	(this.timerOneLogClass != 'real_event_sensitive') && Space2D.Globle.msgBg.push(this.msgCard.getMsgCardBg());
}  

Space2D.showLog.prototype.dispathEvent = function (){
	this.msgEvent = new Space2D.MessageEvent({
		modelObj: this
	});
	try{
		this.msgEvent.play();
	}catch(e){
		console.info(e);
	}
	
}