//======================================================================================
//  Description: 回放条
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.Globle.playTime = [];
Space2D.Globle.playFlag = 0;
Space2D.Globle.playRate = 1;
Space2D.Globle.playpanelDetail = 0;

Space2D.replayBar = function (options){
	this.scene = options.scene;
	
	var _self = this;
	
	this.left = 0;
	
	this.MaxTimeRecord = [
		['FTP 事件开始','ftpcolor'],
		['Mail 事件开始','mailcolor'],
		['创建进程日志开始','createcolor'],
		['写入文件日志开始','writecolor']
	];
			
	this.setResultVal = 0;
	
	this.widthVar = window.innerWidth - this.left*2 - 300;
	
	this.init();

	
	this.Update();

    // requestAnimationFrame(function(){
    	// console.info('---');
    	// TWEEN.update();
    // });
	
	// this.dispathEvent();
}

Space2D.replayBar.prototype.init = function(){
	//获取detectList
	var _this = this;
	gateway = new OOPTEST.GatewayRequest();
	gateway.request(OOPTEST.Gateways['detectInfoReplay'], function (detect_obj){
		//设定获取topo信息的参数列表
		OOPTEST.Gateways['topoInfoRelplay']['paras']['topo_id'] = detect_obj['topological_id'];
		
		gateway.request(OOPTEST.Gateways['topoInfoRelplay'], function (topo_info){
			
			Topo.update({'data': topoJsonList[0], 'eventList': detect_obj['detect_list']});
			//设定安全事件实时数据的参数列表
			OOPTEST.Gateways['topoEventInfoReplay']['paras'] = Space3D.Utils.generateDetectObject(detect_obj.detect_list, detect_obj.detect_type);
			
			//获取安全事件实时数据
			
			gateway.request(OOPTEST.Gateways['topoEventInfoReplay'], topoEventInfoCallback.bind(_this));
				
			function topoEventInfoCallback(event_info){
				
				for (var i = 0; i < event_info.length ; i++){
					
                    detect_obj.detect_list.push({'id' : event_info[i].id, 'type' : event_info[i].type, 'start_event_id' : event_info[i].start_event_id}); 
                    detect_obj.detect_list.shift(); 
                    Topo.eventDict[event_info[i].type] && Topo.eventDict[event_info[i].type].setData(event_info[i]['result']); 
                    _this.MaxTimeRecord[i].push(Date.parse(event_info[i]['result'][0].time));
                }
                
                OOPTEST.Gateways['topoEventInfoReplay']['paras'] = Space3D.Utils.generateDetectObject( detect_obj.detect_list, detect_obj.detect_type );
                
                gateway.request(OOPTEST.Gateways['getreplayLogMaxTime'], function(data){
                	_this.MaxTimeRecord[2].push(Date.parse(data[0].ctime));
                	_this.MaxTimeRecord[3].push(Date.parse(data[0].wtime));
                	_this.MaxTimeRecord.sort();
                	_this.createHtmlDom();
                });
                
			}
		});
	});
}

Space2D.replayBar.prototype.createHtmlDom = function(){
	$(window.parent.document).find('#main_iframe').css({'opacity':1});
	var _temp = this.scene.sceneDom;
	var _this = this;
	this.scene.gateway.request(OOPTEST.Gateways['getreplayTime'], function (data){
		Space2D.Globle.playTime = data[0];
		_this.obj = {value : 0};
		Space2D.Globle.playTime = [
			Date.parse(data[0]['maxtime']),
			Date.parse(data[0]['mintime']),
			data[0]['maxtime'],
			data[0]['mintime']
		];
		
		_this.scene.gateway.request(OOPTEST.Gateways['getreplayBarPage'], function (page){
			_temp.append(page);
			_this.controlPlayRate();
			$('#replayButtonRate').click(function(){
				$('.replay-bar-button-right-content .rightNumPanel').css({'z-index': 2,'opacity': 1});
			});
			$('.replay-detail').css({
				'left': window.innerWidth/2 - 27
			})
			// $('#replaySpaceInfo').html('回访时长: ' + (new Date(data[0]['maxtime']) - new Date(data[0]['mintime']))/60000 + ' 分');
			
			//设置时间
			// $('#replayStartime').html(Space2D.Globle.playTime[3].substring(10));
			$('#startTimeText .time-text-time').html(Space2D.Globle.playTime[3].split(' ')[1]);
			$('#endTimeText .time-text-time').html(Space2D.Globle.playTime[2].split(' ')[1]);
			$('#startTimeText .time-text-date').html(Space2D.Globle.playTime[3].substring(2,4)+'/'+Space2D.Globle.playTime[2].substring(5,7)+'/'+Space2D.Globle.playTime[2].substring(8,10));
			$('#endTimeText .time-text-date').html(Space2D.Globle.playTime[2].substring(2,4)+'/'+Space2D.Globle.playTime[2].substring(5,7)+'/'+Space2D.Globle.playTime[2].substring(8,10));
			
			$('#replayStartime').html(Space2D.Globle.playTime[3].substring(10));
			$('#replayendtime').html(Space2D.Globle.playTime[2].substring(10));
			$('.replay-bar-button-right-content .rightNumPanel').mouseleave(function(){
				$(this).css({'z-index': -1,'opacity': 0});
			});
			for(max in _this.MaxTimeRecord){
				_this.MaxTimeRecord[max].push(((_this.MaxTimeRecord[max][2] - Space2D.Globle.playTime[1])/(Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1]))*_this.widthVar);
				_this.MaxTimeRecord[max].push('#imoptionInfo_'+max);
				$('#replayBarActive').after('<div class="replay-bar-imoption '+_this.MaxTimeRecord[max][1]+'" id="recordTime_'+ max +'"></div>');
				// $('#replayBarActive').after('<div class="replay-bar-imoption_line '+_this.MaxTimeRecord[max][1]+'" id="recordTimeLine_'+ max +'"></div>');
				$('#imoptionInfo_'+max+' span').html(_this.MaxTimeRecord[max][0]);
				$(_this.MaxTimeRecord[max][4]).css({
					'left' : _this.MaxTimeRecord[max][3] - 7
				})
				$('#recordTime_'+max).css({
					'left': _this.MaxTimeRecord[max][3]
				});
				
				// $('#recordTimeLine_'+max).css({
					// 'left': _this.MaxTimeRecord[max][3] + 1.3
				// });
				
				var temp = max;
				$('#recordTime_'+max).mouseover(function(){
					
					$(_this.MaxTimeRecord[($(this).attr('id')).split('_')[1]][4]).css({
						'opacity': 1
					})
				}).mouseout(function(){
					$(_this.MaxTimeRecord[($(this).attr('id')).split('_')[1]][4]).css({
						'opacity': 0
					})
				})
			}
			
			$('#replayDetail').click(function(){
				if(Space2D.Globle.playpanelDetail == 0){
					$(this).removeClass('replay-detail-button-up').addClass('replay-detail-button-down');
					$('.replay-bar-content').animate({
						'padding-top': 54,
						'padding-bottom': 10
					},300);
					Space2D.Globle.playpanelDetail = 1;
					$(this).find('i').removeClass('icon-double-angle-up').addClass('icon-double-angle-down');
					$('#replayIconList').animate({
						'z-index': 1,
						'opacity': 0.7
					},300)
					$('#replaySpaceInfo').parent().animate({
						'z-index': 1,
						'opacity': 1
					},300)
				}else{
					$(this).removeClass('replay-detail-button-down').addClass('replay-detail-button-up');
					$('.replay-bar-content').animate({
						'padding-top': 18,
						'padding-bottom': 18
					},300);
					Space2D.Globle.playpanelDetail = 0;
					$(this).find('i').removeClass('icon-double-angle-down').addClass('icon-double-angle-up');
					$('#replayIconList').animate({
						'z-index': -1,
						'opacity': 0
					},300)
					$('#replaySpaceInfo').parent().animate({
						'z-index': -1,
						'opacity': 0
					},300)
				}
				
			});
			
			$('.replay-bar-warp').css({'width': (_this.widthVar + 300) ,'left': _this.left});
			$('#replayBar').css({'width': _this.widthVar});
			$('#backbar').css({width: _this.widthVar});
			$('#replayBar').click(function(e){
				_this.barValue(_this.calVal(e.clientX));
				_this.spaceValue();
				_this.clickEvent();
			});
			document.getElementById('replayBarRadio').addEventListener('mousedown', mouseDownHandler);
			
			function mouseDownHandler(){
				_this.pause();
				document.addEventListener('mousemove', mouseMoveHandler);
			}
			
			function mouseMoveHandler(e){
				_this.barValue(_this.calVal(e.clientX));
				document.addEventListener('mouseup', mouseUpHandler);
			}
			
			function mouseUpHandler(){
				_this.play();
				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
			}
			
			$('#replayButtonPlay').click(function(){
				if(Space2D.Globle.playFlag == 1){
					_this.pause();
				}else{
					//开始
					_this.play();
				}
			});
			
		});
	});
}

Space2D.replayBar.prototype.controlPlayRate = function(){
	var _this = this;
	$('#replayRateUl li').each(function(){
		$(this).click(function(){
			Space2D.Globle.playRate = $(this).attr('data');
			if(Space2D.Globle.playFlag == 1){
				TWEEN.remove(_this.tween);
				_this.runBar(_this.setResultVal,(Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1])*_this.setResultVal + Space2D.Globle.playTime[1]);
			}
			$('#replayButtonRate span').html($(this).html());
			$(this).parent().parent().css({'z-index': -1,'opacity': 0});
		});
		
	});
}

Space2D.replayBar.prototype.play = function (){
	$('#replayButtonPlay i').removeClass('icon-play').addClass('icon-pause');
	Space2D.Globle.playFlag  = 1;
	this.runBar(this.setResultVal,(Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1])*this.setResultVal + Space2D.Globle.playTime[1]);
	Topo.eventPlay();
}

Space2D.replayBar.prototype.pause = function (){
	TWEEN.remove(this.tween);
	$('#replayButtonPlay i').removeClass('icon-pause').addClass('icon-play');
	Space2D.Globle.playFlag  = 0;
	Topo.eventPause();
}

Space2D.replayBar.prototype.calVal = function(mouseXVal){
	this.calValResult = mouseXVal-(this.left+78);
	if(this.calValResult > (this.widthVar)) this.calValResult = (this.widthVar);
	if(this.calValResult < -10) this.calValResult = (-10);
	this.setResultVal = this.calValResult/(this.widthVar);
	if(this.setResultVal >= 0.99 ) this.setResultVal = 1;
	if(this.setResultVal < 0 ) this.setResultVal = 0;
	return this.calValResult;
}

Space2D.replayBar.prototype.clickEvent = function(){
	// 将click值传给3D
	// this.change(this.setResultVal);
	TWEEN.remove(this.tween);
	(Space2D.Globle.playFlag == 1) && this.runBar(this.setResultVal,(Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1])*this.setResultVal + Space2D.Globle.playTime[1]);
}

// Space2D.replayBar.prototype.dispathEvent = function(){
	// // this.scene.historyLog.replayEvent(this.setResultVal);
// }

Space2D.replayBar.prototype.mouseMoveEvent = function(){
	// 将click值传给3D
	this.change(this.setResultVal);
}

Space2D.replayBar.prototype.change = function (percent){
	// Topo.eventGoTo(percent);
}

Space2D.replayBar.prototype.barValue = function(_val){
	$('#replayBarRadio').css({left: _val-5});
	$('#replayBarActive').css({'width': _val});
}

Space2D.replayBar.prototype.spaceValue = function(){
	Topo.eventGoTo(((Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1])*this.setResultVal + Space2D.Globle.playTime[1]));
	this.scene.historyLog.replayEvent(((Space2D.Globle.playTime[0] - Space2D.Globle.playTime[1])*this.setResultVal + Space2D.Globle.playTime[1]));
}

Space2D.replayBar.prototype.setrunBar = function(_val){
	if(_val >= 1){
		_val = 1;
		$('#replayButtonPlay i').removeClass('icon-pause').addClass('icon-play');
		Space2D.Globle.playFlag = 0;
	}
	this.setResultVal = _val;
	// this.dispathEvent();
	this.barValue(_val*this.widthVar);
	this.spaceValue();
}


Space2D.replayBar.prototype.setRunBar = function(_val){
	// if(_val >= 1){
		// _val = 1;
		// $('#replayButtonPlay i').removeClass('icon-pause').addClass('icon-play');
		// Space2D.Globle.playFlag = 0;
	// }
	// this.setResultVal = _val;
	// // this.dispathEvent();
	// this.scene.historyLog.replayEvent(this.setResultVal);
	// $('#replayBarRadio').css({left: _val*this.widthVar-3});
	// $('#replayBarActive').css({'width': _val*this.widthVar});
}

Space2D.replayBar.prototype.runBar = function(_startValue,_startTime){
	var _this = this;
	console.info(Space2D.Globle.playTime[0] - _startTime);
	this.tween = new TWEEN.Tween({value : _startValue})
    	.to({value: 1}, (Space2D.Globle.playTime[0] - _startTime)/Space2D.Globle.playRate)
    	.easing(TWEEN.Easing.Linear.None)
    	.delay(0)
    	.onUpdate(function (){
    		// _self.animatePercent = this.value;
    		// _self.goTo(_self.animatePercent);
    		// console.info((new Date(this.value+Space2D.Globle.playTime[1]).getTime()));
    		_this.setrunBar(this.value);
    	})
    	.onComplete(function (){
    		//console.log('complete');
    	});
    this.tween.start();
}

Space2D.replayBar.prototype.Update = function (){
	TWEEN.update()
    requestAnimationFrame( this.Update.bind(this) );
}
