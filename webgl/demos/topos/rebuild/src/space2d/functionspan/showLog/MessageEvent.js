//======================================================================================
//  Description: 日志信息事件
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

Space2D.Globle.specialCardImg = [];
Space2D.Globle.specialCardStatus = [];
Space2D.Globle.timerLogFlag = true;

Space2D.MessageEvent = function (options){
	
	options = options || {};
	this.modelObj = options.modelObj;
	
	this.playFlag = 1;	// 1:Play 0:Pause -1:Stop
	this.animateCounter = 0;
	this.Milliseconds = (new Date()).getTime();
	this.cardNum = 0;
	this.specialCard = 0;
	
	this.model = [];
	this.setAry = [];
	//this.play();
}
/*
 * Init 开始执行获取数据存入数组
 */
Space2D.MessageEvent.prototype.initialize = function (){
    
}

/*
 * 开始显示Msg
 */
Space2D.MessageEvent.prototype.play = function (){
    requestAnimationFrame( this.play.bind(this) );
    if(this.playFlag < 1) return false;
    // 均衡不同性能机器显示速度
    if(Space2D.Globle.timerLogFlag && ((new Date()).getTime()-this.Milliseconds) >= 1500 || this.animateCounter >= 100){
    	var _this = this;
    	this.modelObj.getTimerLogData();
		if (this.setAry.length > 5) return ;
		try{
			this.modelObj.createMsgCard();
		}catch(e){
			console.info(e);
		}
		if (this.modelObj.cardSet == null) return ;
		// this.modelObj.msgBg.attr({'fill-opacity': "0.2"});
		if(Space2D.Globle.msgBg.length - 1 > 0 && Space2D.Globle.msgBg[Space2D.Globle.msgBg.length - 2] != null){
			Space2D.Globle.msgBg[Space2D.Globle.msgBg.length - 2].attr({'fill-opacity': "0.5"});
		}
    	if(this.cardNum < 4){
    		this.modelObj.cardSet  && this.modelObj.cardSet.animate({transform: 't0,' + (this.cardNum*60-240)}, 300,function(){
    			// Space2D.Globle.msgBg.attr({'fill-opacity': "0.2"});
    		}); 
	        this.setAry.push(this.modelObj.cardSet);
	        this.cardNum++; 
    	}else{
    		this.setAry.push(this.modelObj.cardSet);
    		for(i=0;i<=this.setAry.length-1;i++){
    			if(i == this.setAry.length-1){
    				this.setAry[i].animate({transform: 't0,'+(i*60-300) }, 300, function(){
    					if(_this.modelObj.timerOneLogClass == 'real_event_sensitive' && _this.specialCard < 2){
    						(_this.setAry.pop()).animate({transform: 't-310,'+(_this.specialCard*60-240) }, 800, function(){
    							_this.modelObj.msgCard.getMsgCardIcon().attr({'src':Space2D.Globle.Search});
    							Space2D.Globle.specialCardStatus.push(_this.modelObj.timerOneLogStatus);
    							Space2D.Globle.specialCardImg.push(_this.modelObj.msgCard.getMsgCardIcon());
                			}); 
                			_this.specialCard ++;
                			_this.specialCard == 1 ? 
	                			$('#replayLogBtn').css({'z-index': '19'}) :
			                    $('#replayLogBtn2').css({'z-index': '19'});
    					}else{
    						(_this.setAry.shift()).remove();
    					}
    					
	                });
    			}else{
    				this.setAry[i].animate({transform: 't0,'+(i*60-300) }, 300);
    			} 
            }
    	}
    	  
	    this.Milliseconds = (new Date()).getTime();
	    this.animateCounter = -1;
    }
    this.animateCounter++;
}
/*
 * 设置播放标识
 */
Space2D.MessageEvent.prototype.SetPlayFlag = function (_value){
    this.playFlag = _value;
}