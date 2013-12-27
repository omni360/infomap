
//======================================================================================
//  Description: 历史页面日志展示
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.Globle.specialFlagRecordNum = [];
Space2D.Globle.specialFlagRecord = [];
Space2D.Globle.currentCardId = 0;

Space2D.historyLog = function (options){
	Space2D.BaseSvgModel.apply(this,arguments);
	this.scene = options.scene;
	this.stringUils = new Space2D.StringUils();
	this.CreateBgrect();
	this.maxEventId = 0;	// 存储库中取回的列表的Id最大值
	this.timerLogData = [];
	this.leftStr = this.rightStr = '';
	this.leftStrAry = this.rightStrAry = [];
	this.specialCard = 0;
	this.replayIdI = '-1';
	this.replayIdII = '-1';
	this.init();
	this.dispathEvent();
}

Space2D.historyLog.prototype = Object.create(Space2D.BaseSvgModel.prototype);

Space2D.historyLog.prototype.init = function(){
	var _self = this;
	setTimerLogData = this.setTimerLogData.bind(this);
	this.getway = new OOPTEST.GatewayRequest();
	// 初始化日志先关Id
	this.getway.request(OOPTEST.Gateways['detectInfoReplay'], function (detect_obj){
		// 设定展示日志查询id
		Space2D.Globle.timerLogId = detect_obj['log']['timer_log'];
		Space2D.Globle.replayIdI = detect_obj['log']['replay_i'];
		console.info(Space2D.Globle.replayIdI+'-=-=');
		Space2D.Globle.replayIdII  = detect_obj['log']['replay_ii'];
		setTimerLogData();
		_self.replayLog = new Space2D.replayLog({
			scene: _self.scene
		});
	});
	
}

Space2D.historyLog.prototype.CreateBgrect = function (){
	this.GetSvgDom().rect(0, 0, this.width, this.height).attr({stroke: "#FFF", "stroke-opacity": 0});
}

Space2D.historyLog.prototype.setTimerLogData = function(){
	var _this = this;
	if(!Space2D.Globle.timerLogId) return ;
	OOPTEST.Gateways['getShowReplayLog']['paras'] = {'id' : Space2D.Globle.timerLogId};
	this.getway.request(OOPTEST.Gateways['getShowReplayLog'], function (list){
		if(list.length == 0) return; 
        var _temp = [];
        for(var i=0;i<list.length;i++){
    		_temp.push(list[i]);
        }
        
        for(var i=_temp.length-1;i>=0;i--){
        	if(_this.specialCard == 2) break;
        	if(_temp[i]['node_class'] == 'real_event_sensitive'){
        		_this.createSpecialMsgCard(_temp[i]);
        		_this.cardSet.hide();
        		Space2D.Globle.specialCardStatus.push(_this.timerOneLogStatus);
        		Space2D.Globle.specialFlagRecordNum.push(_temp.length - i - 1);
        		Space2D.Globle.specialFlagRecord.push(_this.cardSet);
        		_this.cardSet.animate({transform: 't-310,'+(_this.specialCard*60-240) }, 100); 
        		_this.specialCard++;
        	}
        }
        Space2D.Globle.timerLogDataAry.push(_temp);
        _this.timerLogData = Space2D.Globle.timerLogDataAry[0].slice(0);
	});
}

Space2D.historyLog.prototype.createMsgCard = function(){
	this.cardSet = this.msgBg = null;
	if(Space2D.Globle.playFlag == 0 || this.timerLogData.length == 0) return null;  
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

Space2D.historyLog.prototype.createSpecialMsgCard = function(spcialCard){
	this.cardSet = this.msgBg = null;
	this.timerOneLog = spcialCard;
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
} 

Space2D.historyLog.prototype.showReplay = function (){
	if(Space2D.Globle.specialFlagRecord.length < 0) return;
	if(Space2D.Globle.currentCardId > Space2D.Globle.specialFlagRecordNum[0]){
		Space2D.Globle.specialFlagRecord[0].show();
		$('#replayLogBtn').css({'z-index': '19'});
	}else{
		Space2D.Globle.specialFlagRecord[0].hide();
		$('#replayLogBtn').css({'z-index': '-1'});
	}
	if(Space2D.Globle.currentCardId > Space2D.Globle.specialFlagRecordNum[1]){
		Space2D.Globle.specialFlagRecord[1].show();
		$('#replayLogBtn2').css({'z-index': '19'});
	}else{
		Space2D.Globle.specialFlagRecord[1].hide();
		$('#replayLogBtn2').css({'z-index': '-1'});
	}
}

Space2D.historyLog.prototype.replayEvent = function (val){
	if(Space2D.Globle.timerLogDataAry.length < 1) return;
	for(var i = Space2D.Globle.timerLogDataAry[0].length -1 ; i >=0 ; i--){
		if( val <= Date.parse(Space2D.Globle.timerLogDataAry[0][i]['time'])){
			this.timerLogData = [Space2D.Globle.timerLogDataAry[0][i]];
			Space2D.Globle.currentCardId = (Space2D.Globle.timerLogDataAry[0].length - i);
			return;
		}else{
			this.timerLogData = [];
		}
	}
	// Space2D.Globle.currentCardId = parseInt(Space2D.Globle.timerLogDataAry[0].length*val);
	// this.timerLogData = Space2D.Globle.timerLogDataAry[0].slice(0,parseInt(Space2D.Globle.timerLogDataAry[0].length*(1-val)));
}

Space2D.historyLog.prototype.clearData = function (){
	console.info('claer');
	this.timerLogData = [];
}

Space2D.historyLog.prototype.dispathEvent = function (){
	this.msgEvent = new Space2D.historyMsgEvent({
		modelObj: this
	});
	try{
		this.msgEvent.play();
	}catch(e){
		console.info(e);
	}
	
}