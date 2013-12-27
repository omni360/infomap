$(function(){
	$('#container').css({'width': parseFloat($('#slzs-1').css('width'))/4});
	
	// $('.mapimg').css({'width': parseFloat($('#slzs-1').css('width'))/4-80});
	
	
	$('#container1').css({'width': parseFloat($('#slzs-1').css('width'))/4});
	$('#pie').css({'right': parseFloat($('#slzs-1').css('width'))/4+43});
	$('#pie1').css({'left': parseFloat($('#slzs-1').css('width'))/4});
	$('#pie2').css({'left': parseFloat($('#slzs-1').css('width'))/4});
	$('#pie3').css({'left': parseFloat($('#slzs-1').css('width'))/4 + 200});
	$('.statusbar').css({'width': parseFloat($('#slzs-1').css('width'))-70});
	
	for(var i=1 ; i<4;i++){
		new PageBackGround({
			'id': 'slzs-'+i,
			'transform': 'r180',
			'height': parseFloat($('.example-area').css('height'))
		});
	}
	
	new PageBackGround({
		'id': 'slzs1',
		'height': window.innerHeight-10
		
	});
	
	
	 $(".knob").knob({
        /*change : function (value) {
            //console.log("change : " + value);
        },
        release : function (value) {
            console.log("release : " + value);
        },
        cancel : function () {
            console.log("cancel : " + this.value);
        },*/
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv)  // Angle
                    , sa = this.startAngle          // Previous start angle
                    , sat = this.startAngle         // Start angle
                    , ea                            // Previous end angle
                    , eat = sat + a                 // End angle
                    , r = true;

                this.g.lineWidth = this.lineWidth;

                this.o.cursor
                    && (sat = eat - 0.3)
                    && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.value);
                    this.o.cursor
                        && (sa = ea - 0.3)
                        && (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.previousColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });
	
	$('#pie').highcharts({
        chart: {
            type: 'pie',
            margin: [-8,0,-8,0],
            backgroundColor: 'rgba(255,255,255,0)',
        },
        colors: [
		   '#00588A', 
		   '#008890', 
		   '#72A9B1'
		],
        title: {
            text: ''
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                borderColor: 'none',
                showInLegend: true
            }
        },
        tooltip: {
    	    valueSuffix: '%'
        },
        credits: {
        	enabled: false
        },
        legend: {
        	y: -36,
        	borderColor: 'none',
        	layout:'vertical',
        	itemStyle: {
			   cursor: 'pointer',
			   color: '#fff',
			   fontSize: '12px',
			   paddingTop: '10px',
			   paddingBottom: '5px',
			   'font-family': '微软雅黑'
			}
        },
        series: [ {
            name: 'Versions',
            data: [
                ['应用A',   45.0],
                ['应用B',       26.8],
                ['应用C', 12.8]
            ],
            size: '85%',
            innerSize: '79%',
            dataLabels: {
                enabled: false
            }
        }]
    });
    
    var ppp = {
        chart: {
            type: 'pie',
            margin: [-8,0,-8,14],
            backgroundColor: 'rgba(255,255,255,0)',
        },
        colors: [
		   '#DD6025', 
		   'rgb(247,171,0)', 
		   'rgb(114,175,45)'
		],
        title: {
            text: ''
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['8%', '50%'],
                borderColor: 'none',
                showInLegend: true
            }
        },
        tooltip: {
    	    valueSuffix: '%'
        },
        credits: {
        	enabled: false
        },
        legend:{
            layout: 'vertical',
            floating: true,
            align: 'right',
            verticalAlign: 'middle',
            borderWidth:0,
            symbolWidth: 20,
            
            // width:50,
            labelFormatter: function() {
                return this.name + ' : ' + this.y
            },
            // itemMarginTop: -10,
            itemStyle: {
			   cursor: 'pointer',
			   color: '#ddd',
			   fontSize: '9px',
			   paddingTop: '1px',
			   paddingBottom: '1px',
			   'font-family': '微软雅黑'
			}
        },
        series: [ {
            name: 'Versions',
            data: [
                ['模拟',   45.0],
                ['仿真',       26.8],
                ['实物', 12.8]
            ],
            size: '100%',
            innerSize: '92%',
            dataLabels: {
                enabled: false
            }
        }]
    };
    
    $('#pie1').highcharts(ppp);
    $('#pie2').highcharts(ppp);
    $('#pie3').highcharts(ppp);
    
    
	
	chartoptions = {
        chart: {
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0)',
            margin: [34,5,2,35],
            borderRadius: 1
        },
        title: {
            text: ''
        },
        subtitle: {
            text: '节点流量记录比例',
            verticalAlign: 'top',
            y: 18,
            x: 85,
            style: {
            	color: '#FFF',
            	'font-family': '微软雅黑'
            }
        },
        xAxis: {
        	
            labels: {
            	enabled: false,
                formatter: function() {
                    return this.value; // clean, unformatted number for year
                },
                style: {
        			color: '#FFF',
        			font: '11px Trebuchet MS, Verdana, sans-serif'
     			}
            },
            gridLineColor: '#999',
  			gridLineWidth: 0,
  			tickLength: 30,
  			tickColor: '<div id="999"></div>',
			lineColor: '#ddd',
        },
        yAxis: {
            title: {
                text: ''
            },
			labels: {
				x: -2,
				y: -5,
                formatter: function() {
                    return this.value; // clean, unformatted number for year
                },
                style: {
        			color: '#FFF',
        			font: '11px Trebuchet MS, Verdana, sans-serif'
     			}
            },
            gridLineDashStyle: 'longdash',
            gridLineColor: '#999',
  			gridLineWidth: 1,
  			tickLength: 0,
  			tickColor: '#999',
			lineColor: 'red',
        },
        tooltip: {
            pointFormat: '{series.name} in {point.x}'
        },
        credits: {
        	enabled: false
        },
        legend: {
        	// enabled : false
        },
        
        legend: {
        	x: -65,
        	verticalAlign: "top",
        	borderColor: 'none',
        	itemStyle: {
			   cursor: 'pointer',
			   color: '#ddd',
			   fontSize: '13px'
			}
        },
        plotOptions: {
            area: {
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [
        {
            name: 'A',
            color: '#E55A8D',
            data: [20,24,86,23,84,43,24,18,43,4]
        }, {
            name: 'B',
            color: '#CD185C',
            data: [10,14,56,13,54,23,14,8,23,2]
        }]
    };
    
    $('#container').highcharts(chartoptions);
    $('#container1').highcharts(chartoptions);
    
    new StatusBar({
    	id: 'statusbar1',
    	width : parseFloat($('#slzs-1').css('width'))-70
    });
    
});
PageBackGround = function(params){
	var _me = this,
		options = {
			'id': 'PageBack',
			'padding': [25,15],
			'height': 500,
			'attr': {
				'stroke-width': 2,
				'fill' : 'rgba(4, 63, 85, 0.51)',
				'stroke' : 'rgba(14,165,204,0.9)'
			},
			'transform': '',
			'resizeTime': 10,
			'resize': function(){
				_me.height = window.innerHeight - 20
				_me.paper.clear();
				_me.draw();
			},
			
		};
	$.extend(true,options, params);
	
	_me.pdom = $('#'+options.id);
	
	if(_me.pdom.length == 0) { console.info("con't found div id for " + options.id) ; return false;}
	
	_me.width = options.width || parseFloat(_me.pdom.css('width'));
	_me.height = options.height || parseFloat(_me.pdom.css('height'));
	
	_me.paper = Raphael(options.id,_me.width,_me.height);
	
	_me.draw = function(){
		var p = options.padding,
			x = 4,
			y = 6,
			y1 = 13,
			k = 20,
			w = _me.width,
			h = _me.height,
			z1 = 200,
			z2 = 0.25 * (h - 2*p[1]);
		_me.paper.path(_me.madepath([
			['M', p[0], p[1]+x],
			['v', h - 2*p[1] -2*x],
			['L', p[0]+x, h-p[1]],
			['h', z1],
			['L', p[0]+2*x+z1, h-p[1]-y1],
			['h', w-2*p[0]-3*x-z1-y],
			['L', w-p[0]-y,h-p[1]-x-y1],
			['v', -(h-2*p[1]-2*x-y1-z2-2*y-k)],
			['L', w-p[0], p[1]+x+k+y+z2],
			['v', -z2],
			['L', w-p[0]-y, p[1]+x+k],
			['v', -k],
			['L', w-p[0]-y-x, p[1]],
			['h', -(w-2*p[0]-2*x-y)],
			['z']
		])).attr(options.attr).transform(options.transform);
	}
	
	_me.madepath = function(_val){
		var temp_path = '', _val = _val || [];
		$.each(_val,function(i,n){
			$.each(n,function(j,k){
				temp_path += $.isNumeric(k) ? ( (j == n.length - 1)  ? k : ( k + ',') ) : k;
			});
		});
		return temp_path;
	}
	// 相应屏幕变化
	_me.resizeTimer = null; 
	window.addEventListener( 'resize', function(){
		_me.resizeTimer = _me.resizeTimer ? null : setTimeout(options.resize,options.resizeTime);  
	}, false );
	
	_me.draw();
	
}
StatusBar = function(params){
	var _me  = this,
		options = {
			id: '',
			height: 36,
			background: 'rgba(0,0,0,0.1)',
			padding: [2,6,2,6],
			colors: ['#BE1655','#EDE72D','#258A54','#22BDDD'],
			barstyle: {
				fill: "#FFF",
				stroke: "none",
				opacity: 0.9
			},
			tipstyle: {
				fill: 'rgba(0,0,0,0.6)',
				stroke: '#FFF',
				// opacity: 0.9
			},
			tipradius: 3,
			data: [
				['2013-07-09 10:10:10','2013-07-09 10:12:10','0'],
				['2013-07-09 10:12:10','2013-07-09 10:13:10','1'],
				['2013-07-09 10:13:10','2013-07-09 10:14:10','3'],
			]
		};
	$.extend(true,options, params);
	
	_me.pdom = $('#'+options.id);
	
	if(_me.pdom.length == 0) { console.info("con't found div id for " + options.id) ; return false;}
	
	_me.width = options.width || parseFloat(_me.pdom.css('width'));
	
	_me.height = options.height || parseFloat(_me.pdom.css('height'));
	
	_me.paper = Raphael(options.id,_me.width,_me.height);
	
	_me.paper.rect(0,0,_me.width,_me.height).attr({fill: options.background,'stroke-width': 0});

	_me.draw = function(){
		_me.totaltime = Date.parse(options.data[options.data.length-1][1]) - Date.parse(options.data[0][0]);
		
		var y = options.padding[0]+13,
			h = 6,
			w = _me.width - options.padding[1] - options.padding[3],
			_tempx = options.padding[1],
			tiph = (_me.height-2*5-h/2),
			tipw = 100,
			radius = 0;
			
		// _me.tip = _me.paper.rect(0,0,tipw,tiph,options.tipradius).attr(options.tipstyle);
		// _me.tiptext = _me.paper.text(0,tiph/2-5,'').attr(options.tipstyle);
	
		$.each(options.data,function(i,n){
			var _tempmin = Date.parse(n[0]),
				_tempmax = Date.parse(n[1]),
				tw = (_tempmax-_tempmin)/_me.totaltime*w;
			
			_me.paper.path('M'+_tempx+','+options.padding[0]+'v'+(_me.height-options.padding[0]-options.padding[2]))
					 .attr({stroke: _me.switchColor(n[2]),'stroke-width': 1.5});
			
			_me.paper.text(_tempx+3,options.padding[0]+5,_me.switchStatus(n[2])).attr({fill: '#FFF','text-anchor': 'start'});
			_me.paper.text(_tempx+3,options.padding[0]+2+tiph,n[1]).attr({fill: '#FFF','text-anchor': 'start'})
			
			_me.paper.rect(_tempx,y,tw,h,radius)
					 .attr(options.barstyle)
					 .attr({fill: _me.switchColor(n[2])})
					 .data({'0': n[0],'1': n[1],'2': n[2]})
					 .hover(function(event){
					 	// _me.tiptext.attr({'text': this.data('0')+'--'+this.data('1')+'--'+this.data('2') });
					 	this.attr({opacity: 1});
					 },function(){
					 	this.attr({opacity: options.barstyle.opacity});
					 });
			_tempx += tw;
		});
	}
	
	_me.switchColor = function(type){
		var _tempcolor;
		switch(type){
			case '0': 
				_tempcolor = options.colors[0];
				break;
			case '1': 
				_tempcolor = options.colors[1];
				break;
			case '2': 
				_tempcolor = options.colors[2];
				break;
			case '3': 
				_tempcolor = options.colors[3];
				break;
		}
		return _tempcolor;
	}
	
	_me.switchStatus = function(type){
		var _temp;
		switch(type){
			case '0': 
				_temp = '运行';
				break;
			case '1': 
				_temp = '暂停';
				break;
			case '2': 
				_temp = '休眠';
				break;
			case '3': 
				_temp = '结束';
				break;
		}
		return _temp;
	}
	
	_me.draw();
	
}
// PieChart = function(params){
	// var _me  = this,
		// options = {
			// id: '',
			// height: 36,
			// padding: [2,6,2,6],
			// colors: ['#BE1655','#EDE72D','#258A54','#22BDDD'],
			// barstyle: {
// 
			// },
			// tipstyle: {
// 
			// },
			// legend: 3,
			// data: [
                // ['A 20',   45.0],
                // ['B 40',       26.8],
                // ['C 40', 12.8]
            // ]
		// };
	// $.extend(true,options, params);
// 	
// 	
// 	
// }
function P(_info){
	console.info(_info);
}