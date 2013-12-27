var detailPanel,oneDataDetailR = [[],[],[],[]];
var RaphaelTree;
$(function(){
	detailPanel = new DetailPanel();

	detailraphealFun();

	for(ob in oneDataDetailR){
		for(svgdom in oneDataDetailR[ob]){
			oneDataDetailR[ob][svgdom].attr({'opacity':0});
		}
	}

	$('.statistics-card-btn-border').hover(
		function () {
			$('.statistics-card-btn i').addClass('arrow-opacity-animat');
		},
		function () {
			$('.statistics-card-btn i').removeClass('arrow-opacity-animat');
		}
	).click(function(){
		openInfoPanel();
	});

	var activeTabC,preActiveIndex,tabanitime = 300,currentPage = 1;

	$("#detailtreepanel").mCustomScrollbar({
	    // horizontalScroll:true,
	    scrollButtons:{
          enable:true
        }
	});

	$("#detailtreepanel").css({
		'height': window.innerHeight - 120
	});

	// var silder = $( '#jms-slideshow' ).jmslideshow();

	$('.detail-tab-panel-content').eq(0).css({
		'opacity': 1,
		'left': 0
	});

	$('#openAllbtn').click(function(){
		$('#detailpanel').animate({
			'left': -700
		},400,function(){
			$('#detailpanelAll').animate({
				'left': 0,
				'opacity': 1
			},400);
			for(ob in oneDataDetailR){
				for(svgdom in oneDataDetailR[ob]){
					oneDataDetailR[ob][svgdom].attr({'opacity':0});
				}
			}
			$('#detailIp').removeClass(savefontclass[saveClickPid]);
			$('#detailAddress').removeClass(savefontclass[saveClickPid]);
		});
	})

	$('#detailAllclosebtn').click(function(){
		$('#detailpanelAll').animate({
			'left': -700
		},400);
		$('#statisticsCard').css({
			'opacity': 1
		});
	})

	$('#detailclosebtn').click(function(){
		$('#detailpanel').animate({
			'left': -700
		},400);
		$('#statisticsCard').css({
			'opacity': 1
		});
	})

});

DetailPanel = function(){
	var _thisSelf = this;

	

	_thisSelf.pidArrays = [
		[],[],[],[]
	];
	_thisSelf.tableDataArrays = [
		[],[],[],[]
	];

	_thisSelf.pagedata = [1,1,1,1];
	
	this.init = function(){

	}

	this.GetData = function(){
		$.get('data/data.txt', function (res){
			var result = eval(res);
			for (i in result){
				_thisSelf.pidArrays[(parseInt(result[i]['level'])+1)].push(result[i]['level']);

				_thisSelf.Onedata = {};
				_thisSelf.Onedata.area = result[i]['data']['area'];
				// console.info(_thisSelf.Onedata.area);
				_thisSelf.Onedata.ip = result[i]['data']['ip'];

				result[i]['type'] ? _thisSelf.Onedata.type = result[i]['type'] : _thisSelf.Onedata.type = '--';

				_thisSelf.tableDataArrays[(parseInt(result[i]['level'])+1)].push(_thisSelf.Onedata);
			}
			_thisSelf.CalculateNum();
			_thisSelf.FillTable();
			_thisSelf.TablePageControl();
		},'text');
	}
	this.CalculateNum = function(){
		var maxLength = 0;
		$('#statisticsCard .statistics-card-label-num').each(function(i){
			$(this).html(_thisSelf.pidArrays[i].length);
			(_thisSelf.pidArrays[i].length > maxLength) && (maxLength = _thisSelf.pidArrays[i].length);
		});
		$('.detail-tab-index .statistics-card-label-num').each(function(i){
			$(this).html(_thisSelf.pidArrays[i].length);
		});

		$("#detailtree").css({
			'height': maxLength*100
		});
		$("#detailtreepanel").mCustomScrollbar("update");
		RaphaelTree = new RaphaelTree({
			'height': maxLength*100
		});
	}
	this.FillTable = function(){
		$('.detail-table').each(function(i){
			for(var j in _thisSelf.tableDataArrays[i]){
				if(i == 4) break;
				$(this).find('tbody tr').eq(j).find('td').eq(0).html(_thisSelf.tableDataArrays[i][j].ip);
				$(this).find('tbody tr').eq(j).find('td').eq(1).html(_thisSelf.tableDataArrays[i][j].area);
			}
			
		});
		_thisSelf.TablePageBtnUpdate(0);
	}
	this.TablePageControl = function(){
		
		$('#pageControl button').eq(0).click(function(){
			if($(this).attr('data') == 1){

				for(var k = 0 ; k < 4 ; k++){

					var datarow = _thisSelf.tableDataArrays[activeTabC.attr('data')][((_thisSelf.pagedata[activeTabC.attr('data')] - 2)*4+k)];

					$('.detail-table').eq(activeTabC.attr('data')).find('tbody tr').eq(k).find('td').eq(0).html(datarow.ip);
					
				}
				_thisSelf.pagedata[activeTabC.attr('data')] --;
				_thisSelf.TablePageBtnUpdate(activeTabC.attr('data'));
			}
		});
		$('#pageControl button').eq(1).click(function(){
			
			if($(this).attr('data') == 1){
				// console.info(_thisSelf.tableDataArrays[activeTabC.attr('data')][((_thisSelf.pagedata[activeTabC.attr('data')])*4)]);
				
				for(var k = 0 ; k < 4 ; k++){
					var datarow = _thisSelf.tableDataArrays[activeTabC.attr('data')][((_thisSelf.pagedata[activeTabC.attr('data')])*4+k)];
					if(datarow){
						$('.detail-table').eq(activeTabC.attr('data')).find('tbody tr').eq(k).find('td').eq(0).html(datarow.ip);
						$('.detail-table').eq(activeTabC.attr('data')).find('tbody tr').eq(k).find('td').eq(1).html(datarow.area);
					}else{
						$('.detail-table').eq(activeTabC.attr('data')).find('tbody tr').eq(k).find('td').eq(0).html('&nbsp;');
					}
				}
				_thisSelf.pagedata[activeTabC.attr('data')] ++;

				_thisSelf.TablePageBtnUpdate(activeTabC.attr('data'));

			}
		});
	}
	this.TablePageBtnUpdate = function(_index){
		// if(_thisSelf.tableDataArrays[_index].length < 4 ){
		// 	$('#pageControl button').removeClass('page-control-btn-hover');
		// 	return ;
		// }
		_thisSelf.pageNum = Math.ceil(_thisSelf.tableDataArrays[_index].length/4);

		if(_thisSelf.pagedata[_index] < _thisSelf.pageNum){
			$('#pageControl button').eq(1).addClass('page-control-btn-hover').attr({'data':1});
		}else{
			$('#pageControl button').eq(1).removeClass('page-control-btn-hover').attr({'data':0});
		}

		if(_thisSelf.pagedata[_index] > 1){
			$('#pageControl button').eq(0).addClass('page-control-btn-hover').attr({'data':1});
		}else{
			$('#pageControl button').eq(0).removeClass('page-control-btn-hover').attr({'data':0});
		}

	}

	this.GetData();
}

function openInfoPanel(){
	// $('#statisticsCard').css({
	// 	'opacity': 0
	// });
	if(parseInt($('#detailpanel').css('left')) != 0 && parseInt($('#detailpanelAll').css('left')) != 0){
		$('#detailpanelAll').animate({
			'left': 0,
			'opacity': 1
		},400);
	}
}

function detailraphealFun(){
	// var activeTabC,preActiveIndex,tabanitime = 300;

	var paper = Raphael('detailrapheal',700,470);

	var attrs_lines = [
		{
			'stroke': '#CCC',
			'stroke-dasharray': '--',
			'stroke-width': 0.7
		},
		{
			'stroke': '#666',
			'stroke-dasharray': '--',
			'stroke-width': 0.7
		},
		{
			'stroke': '#fff',
			'stroke-dasharray': '--',
			'stroke-width': 1
		}
	]

	paper.path('M20,40h660').attr(attrs_lines[0]);
	paper.path('M20,460h660').attr(attrs_lines[0]);

	var algins = [
		[45, '#', 80],
		[195, 'IP',310],
		[410, '描述', 510],
		[595, '位置', 680]
	];

	for(titles in algins){
		paper.text(algins[titles][0],20,algins[titles][1]).attr({
			'fill': '#fff',
			'font-family': '微软雅黑',
			'font-size': '12px'
		});
		titles < 3 && paper.path('M'+algins[titles][2]+',50v400').attr(attrs_lines[1]);
	}

	var flags = [
		[65,'#FDBF00'],
		[175,'#FB2760'],
		[285,'#478FF9'],
		[395,'#3BDE87']
	]

	for(flag in flags){
		paper.rect(30, flags[flag][0], 30, 25, 5).attr({
			'stroke': 'none',
			'fill': flags[flag][1]
		});
	}

	var ips = [
		[65,'#E4BD43'],
		[175,'#C11E4A'],
		[285,'#2E5EA3'],
		[395,'#279259']
	]

	var ipaddress = [
		['0.0.0.0','- -','描述'],
		['0.0.0.0','- -','描述'],
		['0.0.0.0','- -','描述'],
		['0.0.0.0','- -','描述']
	];

	var delayTime = 0;
	var ipcard,ipstr,cardAnimate,addressLine,addLineAnimate;

	for(ip in ips){
		ipcard = paper.rect(105, ips[ip][0], 180, 25, 5).attr({
			'stroke': 'none',
			'fill': ips[ip][1]
		});
		ipstr = paper.text(195,(ips[ip][0]+12),ipaddress[ip][0]).attr({
			'fill': '#fff',
			'font-family': '微软雅黑',
			'font-size': '13px'
		});

		oneDataDetailR[ip].push(ipcard);
		oneDataDetailR[ip].push(ipstr);

		addressLine = paper.path('M290,'+(ips[ip][0]+12)+'h241').attr(attrs_lines[2]);

		oneDataDetailR[ip].push(addressLine);

		var province = paper.text(555,(ips[ip][0]+10),ipaddress[ip][1].split(' ')[0]).attr({
			'fill': '#FFF',
			'font-family': '微软雅黑',
			'font-size': '14px',
			'text-anchor': 'start'
		});

		var area = paper.text(585,(ips[ip][0]+30),ipaddress[ip][1].split(' ')[1]).attr({
			'fill': '#FFF',
			'font-family': '微软雅黑',
			'font-size': '14px',
			'text-anchor': 'start'
		});

		oneDataDetailR[ip].push(province);
		oneDataDetailR[ip].push(area);

		if(ip < 3){

			var nextline = paper.path('M195,'+(ips[ip][0]+30)+'v75').attr({
				'stroke': flags[ip][1],
				'stroke-dasharray': '--'
			});

			var detailline = paper.path('M196,'+(ips[ip][0]+50)+'h135').attr({
				'stroke': flags[ip][1],
				'stroke-dasharray': '--'
			});

			var detailInfo = paper.text(345,(ips[ip][0]+50),'详细信息').attr({
				'fill': '#FFF',
				'font-family': '微软雅黑',
				'font-size': '14px',
				'text-anchor': 'start'
			});


			oneDataDetailR[ip].push(nextline);
			oneDataDetailR[ip].push(detailline);
			oneDataDetailR[ip].push(detailInfo);
		}

		delayTime += 2000;

	}

}