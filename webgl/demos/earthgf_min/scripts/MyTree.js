var saveClickPid,
	savefontclass = [
		'color-yellow',
		'color-red',
		'color-blue',
		'color-green'
	];
RaphaelTree = function(options){
	var _ownself = this;


	_ownself.width = 635;
	_ownself.height = options.height || 700;
	_ownself.padding = [10,50,10,50];
	_ownself.domId = 'detailtree';
	_ownself.dataaddress = 'data/data.txt';

	_ownself.dataArrays = [[],[],[],[]];
	_ownself.dataPositions = [];
	_ownself.pointDict = {};

	_ownself.pointAttr = {
		'stroke-width': 1.8,
		// 'fill': 'rgba(0,0,0,0)',
		'cursor': 'pointer'
	};

	_ownself.pointType = [
		{'stroke': '#FBBD00','fill': '#FBBD00'},
		
		{'stroke': '#EF253B','fill': '#EF253B'},
		{'stroke': '#41A9FB','fill': '#41A9FB'},
		{'stroke': '#32BC73','fill': '#32BC73'}
	]

	_ownself.lineAttr = {
		'stroke-width': 1.4,
		'stroke': 'red'
	};

	_ownself.lineType = [
		{'stroke': '#FBBD00'},
		{'stroke': '#EF253B'},
		{'stroke': '#41A9FB'},
		
		{'stroke': '#32BC73'}
	]
	
	_ownself.IpAttr = {
		'font-size': '13px',
		'stroke': '#ddd',
		'cursor': 'pointer'
	}

	_ownself.AreaAttr = {
		'stroke': '#ddd',
		'cursor': 'pointer'
	}

	_ownself.init = function(){
		_ownself.paper = Raphael(_ownself.domId,_ownself.width,_ownself.height);
	}

	_ownself.getData = function(){
		$.get( _ownself.dataaddress , _ownself.analyseData ,'text');
	}
	_ownself.analyseData = function(res){
		_ownself.data = eval(res);
		for (var i in _ownself.data){
			_ownself.pointDict[_ownself.data[i]['id']] = _ownself.data[i];
		}
		for(rowNum in _ownself.data){
			_ownself.dataArrays[(parseInt(_ownself.data[rowNum]['level'])+1)].push(_ownself.data[rowNum]);
		}
		_ownself.CalculatePosition();
		
		_ownself.Drawline();
		_ownself.DrawPoint();
	}

	_ownself.CalculatePosition = function() {
		var h_x = parseInt((_ownself.width - _ownself.padding[1] - _ownself.padding[3])/3);
		var v_y = parseInt((_ownself.height - _ownself.padding[0] - _ownself.padding[2]));
		for(rowNum in _ownself.dataArrays){
			var dataArray =  _ownself.dataArrays[rowNum];
			var dataArraysLength = (dataArray.length + 1);

			for(dataNum in dataArray){
				var dataPositon = [];
				dataPositon.push(dataArray[dataNum].id);
				if(parseInt(dataArray[dataNum].level) == -1 || parseInt(dataArray[dataNum].level) == 2){
					dataPositon.push((parseInt(dataArray[dataNum].level)+1)*h_x+_ownself.padding[1]);
				}else if(parseInt(dataArray[dataNum].level) == 1){
					dataPositon.push((parseInt(dataArray[dataNum].level)+1)*(h_x - 50)+_ownself.padding[1]);
				}else{
					dataPositon.push((parseInt(dataArray[dataNum].level)+1)*(h_x - 60)+_ownself.padding[1]);
				}
				
				dataPositon.push((parseInt(v_y/dataArraysLength))*(parseInt(dataNum)+1)+_ownself.padding[0]);
				_ownself.dataPositions.push(dataPositon);
			}
		}
	}
	_ownself.DrawPoint = function() {

		for(pointNum in _ownself.dataArrays){
			for(row_data in _ownself.dataArrays[pointNum]){
				var currentPoint = _ownself.dataArrays[pointNum][row_data];
				pointpres = _ownself.getPointPositionById(0, _ownself.dataPositions.length, parseInt(currentPoint.id));
				pointpres &&  _ownself.paper.circle(pointpres[1], pointpres[2], 4)
								.data("id", currentPoint.id)
								.data("level", currentPoint.level)
						        .click(function(){
						        	_ownself.pointClick(this.data('id'),this.data('level'));
						        })
								.attr(_ownself.pointAttr)
								.attr(_ownself.pointType[parseInt(currentPoint.level)+1]);
				pointpres &&  _ownself.paper.text(pointpres[1], pointpres[2] - 17, currentPoint.data.ip)
								.data("id", currentPoint.id)
								.data("level", currentPoint.level)
						        .click(function(){
						        	_ownself.pointClick(this.data('id'),this.data('level'));
						        })
								.attr(_ownself.IpAttr)
								// .attr(_ownself.pointType[parseInt(currentPoint.level)+1]);
				pointpres && _ownself.paper
								.text(pointpres[1], pointpres[2] + 15, currentPoint.data.area.province + currentPoint.data.area.cities)
								.data("id", currentPoint.id)
								.data("level", currentPoint.level)
						        .click(function(){
						        	_ownself.pointClick(this.data('id'),this.data('level'));
						        })
								.attr(_ownself.AreaAttr)
								// .attr(_ownself.pointType[parseInt(currentPoint.level)+1]);
			}
		}
		
	}

	_ownself.Drawline = function() {
		for(pointNum in _ownself.dataArrays){
			var pointpres,pointnext;
			for(row_data in _ownself.dataArrays[pointNum]){
				var currentPoint = _ownself.dataArrays[pointNum][row_data]
				if(currentPoint.level == 2) break;
				pointpres = _ownself.getPointPositionById(0, _ownself.dataPositions.length, currentPoint.id);
				for(linksid in currentPoint.links){
					pointnext = _ownself.getPointPositionById(0, _ownself.dataPositions.length, currentPoint.links[linksid]);

					// _ownself.paper.path('M'+pointpres[1]+','+pointpres[2]+'L'+pointnext[1]+','+pointnext[2]);/

					_ownself.Drawline_HowToDraw(pointpres[1],pointpres[2],pointnext[1],pointnext[2],4,-4.2,80,currentPoint.level);

				}
			}
		}
	}

	_ownself.Drawline_HowToDraw = function(x1,y1,x2,y2,offsetx1,offsetx2,c,level) {
		var pathstr = '';
		if(x1 == x2){
			pathstr = 'M' + (x1+offsetx1) + ',' + y1 + 'L' + (x2+offsetx2) + ',' + y2;
		}else{
			pathstr = 'M'+(x1+offsetx1)+','+y1+'C'+(x1+offsetx1+c)+','+y1+','+(x2+offsetx2-c)+','+y2+','+(x2+offsetx2)+','+y2;
		}
		_ownself.paper.path(pathstr)
						.attr(_ownself.lineAttr)
						.attr(_ownself.lineType[parseInt(level)+1]);
	}

	_ownself.pointClick = function(id,level) {

		for(ob in oneDataDetailR){
			for(svgdom in oneDataDetailR[ob]){
				oneDataDetailR[ob][svgdom].attr({'opacity':0});
			}
		}

		saveClickPid = (parseInt(_ownself.pointDict[parseInt(id)].level)+1);
		$('#detailpanelAll').animate({
			'left': -700
		},400,function(){
			$('#detailpanel').animate({
				'left': 0,
				'opacity': 1
			},400,function(){

				$('#detailIp').addClass(savefontclass[saveClickPid])
							  .html('Ip：'+ _ownself.pointDict[parseInt(id)].data.ip);
				$('#detailAddress').addClass(savefontclass[saveClickPid])
									.html(_ownself.pointDict[parseInt(id)].data.area.province + ' ' + _ownself.pointDict[parseInt(id)].data.area.cities);
				
				for(var k = (parseInt(level)+1) ; k >= 0 ; k--){
					oneDataDetailR[k][0].attr({'opacity':1});
					oneDataDetailR[k][2].attr({'opacity':1});
					oneDataDetailR[k][1].attr({'text': _ownself.pointDict[parseInt(id)].data.ip,'opacity':1});
					oneDataDetailR[k][3].attr({'text': _ownself.pointDict[parseInt(id)].data.area.province,'opacity':1});
					oneDataDetailR[k][4].attr({'text': _ownself.pointDict[parseInt(id)].data.area.cities,'opacity':1});

					if( k > 0){
						oneDataDetailR[k-1][5].attr({'opacity':1});
						oneDataDetailR[k-1][6].attr({'opacity':1});
						if(_ownself.pointDict[parseInt(id)].type){
							oneDataDetailR[k-1][7].attr({'text': _ownself.pointDict[parseInt(id)].type,'opacity':1});
						}else{
							oneDataDetailR[k-1][7].attr({'text': '无','opacity':1});
						}
						
					}

					(parseInt(_ownself.pointDict[parseInt(id)].parent) > -1) && (id = _ownself.pointDict[parseInt(id)].parent);
				}
			});
		});
	}

	// _ownself.bin_sch = function ($array, $low, $high, $k, $value){ 
	//     if ($low <= $high){ 
	//         $mid = parseInt(($low+$high)/2); 
	//         if ($array[$mid][$value] == $k){ 
	//             return $array[$mid]
	//         }
	//         else if ($k < $array[$mid][$value]){ 
	//             return _ownself.bin_sch($array, $low, $mid-1, $k); 
	//         }
	//         else{ 
	//             return _ownself.bin_sch($array, $mid+1, $high, $k); 
	//         } 
	//     } 
	//     return null; 
	// } 

	_ownself.getPointPositionById = function ($low, $high, $k){ 
		$array = _ownself.dataPositions;
	    if ($low <= $high){ 
	        $mid = parseInt(($low+$high)/2); 

	        if ($array[$mid][0] == $k){ 
	            return $array[$mid]
	        }
	        else if ($k < $array[$mid][0]){ 
	            return _ownself.getPointPositionById($low, $mid-1, $k); 
	        }
	        else{ 
	            return _ownself.getPointPositionById($mid+1, $high, $k); 
	        } 
	    } 
	    return null; 
	} 
	_ownself.init();
	_ownself.getData();
}