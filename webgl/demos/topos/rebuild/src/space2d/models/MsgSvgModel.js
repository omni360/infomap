
//======================================================================================
//  Description: 创建Message SVG类 
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

OOPTEST.MsgSvgModel = function (options){
	OOPTEST.BaseSvgModel.apply(this,arguments);
	this.cardPoolAry = [];
	this.card = [];
	this.cardAry = [];
	this.CreateBgrect();
	this.CreateCardPool();
	this.dispathEvent();
}

OOPTEST.MsgSvgModel.prototype = Object.create(OOPTEST.BaseSvgModel.prototype);

OOPTEST.MsgSvgModel.prototype.dispathEvent = function (){
	this.msgEvent = new OOPTEST.MessageEvent({
		modelObj: this
	});
	this.msgEvent.play();
}

OOPTEST.MsgSvgModel.prototype.CreateCardPool = function (){
	for(i=0;i<5;i++){
		new OOPTEST.MsgCardModel({
			svgDom : this.GetSvgDom(),
			msgStatus : 1,
			msgStrLeft : 'leftstr',
			msgStrRight : 'rightstr',
			msgIp : 'ip',
			msgTime : '0000-00-00 00:00:00'
		});	
	}
	this.pool = new OOPTEST.MsgCardPool({poolary: OOPTEST.CardModelLibrary});
}

OOPTEST.MsgSvgModel.prototype.getNewCard = function (){
	console.info(this.pool.pool.length)
	this.card = this.pool.getOutAElement();
	if(this.card){
		this.card[0].push(this.card[1].show());
		this.card[0].push(this.card[2].show());
		this.card[0].push(this.card[3].show());
		this.card[0].push(this.card[4].show());
		this.card[0].push(this.card[5].show());
		this.card[0].push(this.card[6].show());
		this.card[0].push(this.card[7].show());
		this.card[0].push(this.card[8].show());
		this.card[0].push(this.card[9].show());
		
		this.cardAry.push(this.card);
		return this.card[0];
	}
	
	return null;
}

OOPTEST.MsgSvgModel.prototype.CreateBgrect = function (){
	this.GetSvgDom().rect(0, 0, this.width, this.height).attr({opacity: 0});
}
OOPTEST.MsgSvgModel.prototype.getMsgSet = function(_cx,_cy){
	return this.GetSvgDom().set();
}