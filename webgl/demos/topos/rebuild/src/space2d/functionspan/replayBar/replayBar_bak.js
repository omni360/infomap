//======================================================================================
//  Description: 回放条
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.Globle.playFlag = 1;

Space2D.replayBar = function (options){
	this.scene = options.scene;
	
	this.left = 300;
			
	this.setResultVal = 0;
	
	this.widthVar = window.innerWidth - this.left*2;

	this.createHtmlDom();
	
	requestAnimationFrame( );
	
	// this.dispathEvent();
}

Space2D.replayBar.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var _this = this;
	this.scene.gateway.request(OOPTEST.Gateways['getreplayBarPage'], function (page){
		_temp.append(page);
		$('#replayBarbg').css({'left': (_this.left-20),'width': (_this.widthVar + 70) });
		$('#replayBar').css({left: _this.left});
		$('#backbar').css({width: _this.widthVar});
		$('.replaynode').each(function(i){$(this).css({left: _this.widthVar/5*(i+1)+4});});
		$('#backbar').click(function(e){
			$('#rulerNode').css({left: _this.calVal(e.clientX)});
			_this.clickEvent();
		});
		$('.replaynode').click(function(e){
			$('#rulerNode').css({left: _this.calVal(e.clientX)});
			_this.clickEvent();
		});
		
		document.getElementById('rulerNode').addEventListener('mousedown', mouseDownHandler);
		
		function mouseDownHandler(){
			document.addEventListener('mousemove', mouseMoveHandler);
		}
		
		function mouseMoveHandler(e){
			$('#rulerNode').css({left: _this.calVal(e.clientX)});
			_this.mouseMoveEvent();
			document.addEventListener('mouseup', mouseUpHandler);
		}
		
		function mouseUpHandler(){
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		}
		
		$('#replaybutton').click(function(){
			console.info('；');
			//停止
			if(Space2D.Globle.playFlag == 1){
				_this.pause();
			}else{
				//开始
				_this.play();
			}
		});
		
	});
}

Space2D.replayBar.prototype.play = function (){
	$('#replaybutton').removeClass('replaybuttonplay').addClass('replaybuttonpause');
	Space2D.Globle.playFlag  = 1;
	Topo.eventPlay();
}

Space2D.replayBar.prototype.pause = function (){
	$('#replaybutton').removeClass('replaybuttonpause').addClass('replaybuttonplay');
	Space2D.Globle.playFlag  = 0;
	Topo.eventPause();
}

Space2D.replayBar.prototype.calVal = function(mouseXVal){
	this.calValResult = mouseXVal-(this.left+10);
	if(this.calValResult > (this.widthVar-10)) this.calValResult = (this.widthVar-10);
	if(this.calValResult < -10) this.calValResult = (-10);
	this.setResultVal = this.calValResult/(this.widthVar-10);
	if(this.setResultVal >= 0.99 ) this.setResultVal = 1;
	if(this.setResultVal < 0 ) this.setResultVal = 0;
	return this.calValResult;
}

Space2D.replayBar.prototype.clickEvent = function(){
	// 将click值传给3D
	this.change(this.setResultVal);
}

// Space2D.replayBar.prototype.dispathEvent = function(){
	// // this.scene.historyLog.replayEvent(this.setResultVal);
// }

Space2D.replayBar.prototype.mouseMoveEvent = function(){
	// 将click值传给3D
	this.change(this.setResultVal);
}

Space2D.replayBar.prototype.change = function (percent){
	Topo.eventGoTo(percent);
}

Space2D.replayBar.prototype.setRunBar = function(_val){
	if(_val >= 1){
		_val = 1;
		$('#replaybutton').removeClass('replaybuttonpause').addClass('replaybuttonplay');
		Space2D.Globle.playFlag = 0;
	}
	this.setResultVal = _val;
	// this.dispathEvent();
	this.scene.historyLog.replayEvent(this.setResultVal);
	$('#rulerNode').css({left: _val*this.widthVar - 10});
}
