var SvgWorld = function(options){
	var me = this;

	me.width = window.innerWidth;
	me.height = window.innerHeight;

	me.padTop = me.padRight = me.padBottom = me.padLeft = 5;

	me.paper = Raphael(0,0,me.width,me.height);

	me.notching = 8;

	me.areas = [];

	me.upPath = 'M10.129,22.186 16.316,15.999 10.129,9.812 13.665,6.276 23.389,15.999 13.665,25.725z';

	me.paper.customAttributes.drawWindRose = function (cx, cy, r, R, d1, d2, t, a) {
	    return dWindRose(cx, cy, r, R, d1, d2, t, a);
	}

	// 右上信息栏
	me.rightTop = function(){
		cy = me.padTop;
		cx = me.width - 200 - me.padRight
		w = 200;
		h = 35;
		var p = 'M' + cx + ',' + cy;
		p += 'L' + (3/4*(h - me.notching) + cx) + ',' + (h - me.notching + cy);
		p += 'h' + (w - 3/4*(h - me.notching) - me.notching);
		p += 'L' + (w + cx) + ',' + (h + cy);
		p += 'v' + (-h + me.notching);
		p += 'L' + (w + cx - me.notching) + ',' + cy;
		p += 'z';
		// me.paper.path(p).attr({
		// 	fill: '#333',
		// 	stroke: '#888',
		// 	'stroke-width': 1.5
		// });

		function b(x,y,w,h,r){
			me.paper.path('M'+(x+w)+','+y+'h-'+(r+2)+'L'+(x+w-r-r-2)+','+(y+r)+'h-'+(w-r-r-r)+'v'+(h-r-r)+'L'+(x+r+r)+','+(y+h)).attr({
				stroke: '#75bfe3',
				'stroke-width': 1.8
			});
			x+=2;y+=4;
			me.paper.path('M'+x+','+y+'h30'+'L'+(x+30-5)+','+(y+5)+'h-'+(30-5-5)+'v'+(30-5-3)+'L'+x+','+(y+30)+'z').attr({
				fill: '#75bfe3',
				stroke: 'none'
			})
		}
		b(48,30,90,100,5);
	}

	me.earthTopLeft = function(x,y){
		var color = '#75bfe3';
		cy = me.padTop;
		cx = me.padLeft;
		w = 300;
		h = 350;

		cx = 15;
		cy = 90;

		me.paper.rect(x,y,w,h,1).attr({
			fill: 'rgba(0,0,0,0.3)',
			stroke: 'none'
		})

		// me.paper.path('M'+x+','+y+'h'+w).attr({stroke: color});

		me.paper.path('M'+(x+2)+','+(y+25)+'h60zM'+(x+w-3)+','+(y+25)+'h-60').attr({
			stroke: '#777'
		});

		r1 = {
			width: 5,
			fill: true,
			opacity: 0.4,
			color: '#75bfe3'
		}

		me.paper.rect(x,y+22,6,6,1).attr({
			fill: '#75bfe3',
			stroke: 'none'
		}).glow(r1)

		me.paper.rect(x+w-5,y+22,6,6,1).attr({
			fill: '#75bfe3',
			stroke: 'none'
		}).glow(r1)

		


		me.paper.text(x+w/2,y + 23,'昨日全网捕获').attr({
			fill: '#5992AE',
			'text-anchor': 'middle',
			'font-size': '18px',
			'font-weight': 'bold',
			'font-family': '微软雅黑',
			'letter-spacing': '1px',
			'text-shadow': '0 0 4px #FFFFFF, -1px -1px #FFFFFF, 1px -1px 4px #AD091D'
		})

		n = me.paper.text(x+w/2,y + 70,'12,773').attr({
			fill: '#FFF',
			'text-anchor': 'middle',
			'font-size': '54px',
			'font-family': 'Wallpoet',
			'letter-spacing': '1px'
		});
		n = n.getBBox();

		me.paper.rect((n.x2),(n.y - 0.5),17,11,1).attr({
			fill: 'rgba(227,19,31,0.8)',
			stroke: 'none'
		})
		
		me.paper.path(Raphael.transformPath(me.upPath,'t'+(n.x2-8.5)+','+(n.y - 11)+'s0.5,r-90')).attr({
			fill: 'rgba(255,255,255,0.8)',
			stroke: 'none'
		});

		me.paper.rect(x+w-32,y+h-25,17,11,1).attr({
			fill: 'rgba(29,97,61,0.8)',
			stroke: 'none'
		});

		me.paper.path(Raphael.transformPath(me.upPath,'t'+(x+w-40.5)+','+(y+h-35.5)+'s0.5,r90')).attr({
			fill: 'rgba(255,255,255,0.8)',
			stroke: 'none'
		});

		me.paper.text(x+w-35,y+h-19.5,'下降').attr({
			fill: '#aaa',
			'text-anchor': 'end',
			'font-size': '11px',
			'font-family': '微软雅黑',
			'letter-spacing': '1px'
		});

		me.paper.rect(x+w-82,y+h-25,17,11,1).attr({
			fill: 'rgba(227,19,31,0.8)',
			stroke: 'none'
		});

		me.paper.path(Raphael.transformPath(me.upPath,'t'+(x+w-90.5)+','+(y+h-35.5)+'s0.5,r-90')).attr({
			fill: 'rgba(255,255,255,0.8)',
			stroke: 'none'
		});

		me.paper.text(x+w-85,y+h-19.5,'上升').attr({
			fill: '#aaa',
			'text-anchor': 'end',
			'font-size': '11px',
			'font-family': '微软雅黑',
			'letter-spacing': '1px'
		});

		var numattr = {
			fill: '#FFF',
			'text-anchor': 'start',
			'font-size': '21px',
			'font-family': 'FileFolderJNL',
			'letter-spacing': '4px'
		};
		var textattr = {
			fill: '#FFF',
			'text-anchor': 'start',
			'font-size': '15px',
			'font-family': '微软雅黑',
			'letter-spacing': '1px'
		}

		cx = cx + 30;
		addy = 65;

		function a(x,y,text,num,flag){

			flag = flag === undefined ? true : flag;

			me.paper.path('M' + (x+0.5) + ',' + y + 'v48z' + 'M' + (x + 1) + ',' + (y + 20.5) + 'h70z').attr({
				fill: 'none',
				stroke: 'rgba(129,220,223,0.5)'
			});
			

			me.paper.text(x + 6,y + 5.5 ,text).attr(textattr);
			n = me.paper.text(x + 6,y + 31.5,num).attr(numattr);
			n = n.getBBox();


			me.paper.rect((n.x2+6),(n.y2 - 19.5),17,11,1).attr({
				fill: flag ? 'rgba(227,19,31,0.8)' : 'rgba(29,97,61,0.8)',
				stroke: 'none'
			})
			var p = Raphael.transformPath(
				me.upPath,
				't'+(n.x2-2.5)+','+(n.y2 - 30)+'s0.5,r' + (flag ? '-90' : '90')
			);
			
			me.paper.path(p).attr({
				fill: 'rgba(255,255,255,0.8)',
				stroke: 'none'
			});

			// console.info(n.getBBox());
			
		}

		a((x+40),y+120,'捕获样本','423');
		a((x+40),y+190,'恶意代码','122',false);
		a((x+40),y+260,'放马域名','52');

		a(x+w-110,y+120,'放马URL','109',false);
		a(x+w-110,y+190,'放马IP','83');
		a(x+w-110,y+260,'源地址','512',false);

		
		w = 220;
		h = 160;

		cx = 55;
		cy = window.innerHeight - cx - 20;

		// me.paper.path('M'+cx+','+cy+'h'+w+',v-'+h/5+'A'+options.earthRadius/2+','+options.earthRadius/2+',0,0,1,'+(cx+w/4)+','+(cy-h)+'h-'+(w/4)+'z').attr({
		// 	fill: '#333',
		// 	stroke: '#888',
		// 	'stroke-width': 1.5
		// })

		// me.paper.text(cx,cy,'源 : ').attr({
		// 	fill: '#FFF',
		// 	'text-anchor': 'end',
		// 	'font-size': '15px',
		// 	// 'font-weight': 'bold',
		// 	'font-family': '微软雅黑',
		// 	'letter-spacing': '1px'
		// });

		// me.paper.circle(cx + 30,cy,6).attr({
		// 	fill: 'none',
		// 	stroke: '#0E94BC',
		// 	'stroke-width': 3
		// });

		// me.paper.circle(cx + 30,cy,14).attr({
		// 	fill: 'none',
		// 	stroke: '#0E94BC',
		// 	'stroke-width': 1.5
		// });

		// me.paper.text(cx,cy + 40,'目的 : ').attr({
		// 	fill: '#FFF',
		// 	'text-anchor': 'end',
		// 	'font-size': '15px',
		// 	// 'font-weight': 'bold',
		// 	'font-family': '微软雅黑',
		// 	'letter-spacing': '1px'
		// });

		// me.paper.circle(cx + 30,cy + 40,4).attr({
		// 	fill: '#CC1826',
		// 	stroke: 'none'
		// });

		// me.paper.circle(cx + 30,cy + 40,14).attr({
		// 	fill: 'none',
		// 	stroke: '#CC1826',
		// 	'stroke-width': 1.5
		// });

	}

	me.map = function(x,y,w){
		$('body').append('<div id="mapName">攻击事件详细展示</div>');
		$('#mapName').css({
			position: 'absolute',
			top: y- h - 100,
			left: x-w/2 + 10
		})
		h = w/2;
		var mapPath = '', s = w/360 - 0.15;
		me.paper.rect(x-w/2,y-h/2-80,w,h+640,1).attr({
			fill: 'rgba(0,0,0,0.5)',
			stroke: 'none',
			'stroke-width': 1.5
		});

		for (var i = 0, area; area = me.areas[i]; i++) {
			if(-area[0][1] > 81) break;
			mapPath += 'M' + (area[0][0]*s + x) + ',' + (-area[0][1]*s + y);
		  	for(var j = 1, point; point = area[j]; j++){
				mapPath += 'L' + (area[j][0]*s + x) + ',' + (-area[j][1]*s + y);
			}
			mapPath += 'z';
		}

		me.paper.path(mapPath).attr({
			fill: 'none',
			stroke: 'rgba(50,180,255,0.7)',
			'stroke-width': 1
		});
		// x -= 30;
		// y -= 30;
		var rectw = recth = 6;
		var n = 57;points = [],offsetx = 12,offsety = -26;
		var rowNum = [[1,6],[0,6],[0,6],[0,7],[0,7],[0,7],[0,6],[0,6],[0,7],[0,7],[0,6],[1,7],[1,7],[1,7]];
		var celStringChar = 49,rowStringChar = 65;
		for(var i = 0; i < rowNum.length; i++){
			var temppathcel = 'M',temppathrow = '';
			for(var j = rowNum[i][0];j< rowNum[i][1];j++){
				x1 = (x-w/2+n*i+0.5+offsetx);
				y1 = (y-h/2+n*j+0.5+offsety);
				if((i < rowNum.length - 1) && (j < rowNum[i+1][1] && j >= rowNum[i+1][0])){
					if(j != 4){
						temppathrow += ('M' + (x1+rectw/2) + ',' +(y1+recth/2) + 'h' + n);
					}else{
						temppathrow += ('M' + (x1+rectw/2) + ',' +(y1+recth/2) + 'h' + n/3);
						temppathrow += ('M' + (x1+rectw/2+n*2/3) + ',' +(y1+recth/2) + 'h' + n/3);
						me.paper.text(x1+rectw/2+n/2,y1+recth/2,String.fromCharCode(rowStringChar)).attr({
							fill: '#FFF',
							'fill-opacity': 0.2,
							'font-size': '9px',
							'font-family': '微软雅黑'
						});
						rowStringChar++;
					}
					
				}

				if(j==rowNum[i][0]){
					temppathcel += ((x1+rectw/2) + ',' +(y1+recth/2))
				}else{
					if(i == 2){
						temppathcel += ('v' + n/3 + 'M' + (x1+rectw/2) + ',' +(y1+recth/2-n/3)+ 'v' + n/3);
						me.paper.text(x1+rectw/2,y1+recth/2-n/2,String.fromCharCode(celStringChar)).attr({
							fill: '#FFF',
							'fill-opacity': 0.2,
							'font-size': '9px',
							'font-family': '微软雅黑'
						});
						celStringChar++;
					}else{
						temppathcel += ('L' + (x1+rectw/2) + ',' +(y1+recth/2));
					}
				}
				me.paper.path(
					'M'+x1+','+y1+'h'+rectw/3+'M'+x1+','+y1+'v'+recth/3+
					'M'+(x1+rectw)+','+y1+'h-'+rectw/3+'M'+(x1+rectw)+','+y1+'v'+recth/3+
					'M'+x1+','+(y1+recth)+'h'+rectw/3+'M'+x1+','+(y1+recth)+'v-'+recth/3+
					'M'+(x1+rectw)+','+(y1+recth)+'h-'+rectw/3+'M'+(x1+rectw)+','+(y1+recth)+'v-'+recth/3).attr({
					stroke: '#FFF',
					'stroke-opacity': 0.1,
					fill: 'none'
				});
			}
			me.paper.path((temppathrow+temppathcel)).attr({
				stroke: '#FFF',
				'stroke-opacity': 0.1,
				fill: 'none'
			});
		}

		// 时间
		me.paper.text(x1+2,y-h/2+offsety+30,'00:11:55').attr({
			fill: 'rgba(50,180,255,1)',
			'text-anchor': 'end',
			'font-size': '38px',
			'font-family': 'Exo',
			'font-weight': '200',
			'letter-spacing': '3px'
		});
		// 日期
		me.paper.text(x1,y-h/2+offsety-3,'2013/10/21').attr({
			fill: 'rgba(50,180,255,0.6)',
			'text-anchor': 'end',
			'font-size': '16px',
			'font-family': 'Exo',
			'font-weight': '200',
			'letter-spacing': '3px'
		});

		// 来源
		me.paper.rect(x-w/2+15.5+offsetx,y1-32,4,4).attr({
			fill: '#aaa',
			stroke: '#aaa'
		});
		me.paper.text(x-w/2+35+offsetx,y1-30.5,'数据来源: T01').attr({
			fill: '#aaa',
			'fill-opacity': 1,
			'text-anchor': 'start',
			'font-size': '12px',
			'font-family': 'Exo,微软雅黑',
			'font-weight': '400',
			'letter-spacing': '4px'
		});
		me.paper.rect(x-w/2+15.5+offsetx,y1-12,4,4).attr({
			fill: '#aaa',
			stroke: '#aaa'
		});
		me.paper.text(x-w/2+35+offsetx,y1-10.5,'出现次数: 2').attr({
			fill: '#aaa',
			'fill-opacity': 1,
			'text-anchor': 'start',
			'font-size': '12px',
			'font-family': 'Exo,微软雅黑',
			'font-weight': '400',
			'letter-spacing': '4px'
		});
		// 源
		// me.paper.rect(x-w/2+5+offsetx,y1+20.5,20,13,2).attr({
		// 	fill: 'red',
		// 	'fill-opacity': 0.7,
		// 	stroke: 'none'
		// })
		$('#lotation').css({
			position: 'absolute',
			top: y1+25.5,
			left: x-w/2+1+offsetx,
			'z-index': 2
		})
		// me.paper.image('image/flagchina.png',x-w/2+5+offsetx,y1+20,30,20).attr({
		// 	fill: '#aaa',
		// 	'opacity': 0.6
		// });

		me.paper.circle(116.4075260*s+x,-39.9040300*s+y,2).attr({
			fill: 'red',
			stroke: 'none'
		})

		me.paper.circle(116.4075260*s+x,-39.9040300*s+y,20).attr({
			fill: 'none',
			stroke: 'red',
			'stroke-width': 1.5,
			'stroke-dasharray': '- '
		})

		// me.paper.path(
		// 	'M' + (116.4075260*s+x) + ',' + (-39.9040300*s+y)+'h'+((180-116.4075260)*s)+'v'+((90+39.9040300)*s)+'h-20'
		// ).attr({
		// 	fill: 'none',
		// 	stroke: 'red',
		// 	'stroke-width': 1.5,
		// 	'stroke-dasharray': '. '
		// })

		me.paper.circle(-95.7128910*s+x,-37.0902400*s+y,2).attr({
			fill: 'red',
			stroke: 'none'
		})

		me.paper.circle(-95.7128910*s+x,-37.0902400*s+y,20).attr({
			fill: 'none',
			stroke: 'red',
			'stroke-width': 1.5,
			'stroke-dasharray': '- '
		})

		// me.paper.path(
		// 	'M' + (-95.7128910*s+x) + ',' + (-37.0902400*s+y)+'h'+((180+95.7128910)*s+10)+'v'+((90+37.0902400)*s+30)+'h-30'
		// ).attr({
		// 	fill: 'none',
		// 	stroke: 'red',
		// 	'stroke-width': 1.5,
		// 	'stroke-dasharray': '. '
		// })

		// 病毒信息
		me.virusName(x-w/2+12,y1+130.5,w);

		me.virusChart(x,y1+430.5);




		
		
	}

	me.virusName = function(x,y,w){

		h = 78,p = 3;
		x+=0.5,y+=0.5;
		// var _h = h - 2*p;
		// var _path = 'M'+(x+p)+','+(y+p)+'h10'+'M'+(x+p)+','+(y+p)+'v10';

		// me.paper.rect(x+p,y+p,w-30,h).attr({
		// 	fill: 'rgba(0,0,0,0.1)',
		// 	stroke: 'rgba(0,0,0,0)'
		// });
		// me.paper.path(
		// 	Raphael.transformPath(_path,('t0,0r0'))+
		// 	Raphael.transformPath(_path,('t'+(w-3*p-30)+',0r90'))+
		// 	Raphael.transformPath(_path,('t0,'+(h-10)+'r-90'))+
		// 	Raphael.transformPath(_path,('t'+(w-3*p-30)+','+(h-10)+'r-180'))
		// ).attr({
		// 	fill: 'rgba(50,180,255,1)',
		// 	stroke: 'rgba(50,180,255,1)'
		// });
		var _w = (w-134)/4;
		me.extendVirusName(x,y+12,_w,'所属种类','Trojan');

		me.extendVirusName(x+(_w+30),y+12,_w,'传播平台','Win32',25);

		me.extendVirusName(x+(_w+30)*2,y+12,_w,'家族名','Agent');

		me.extendVirusName(x+(_w+30)*3,y+12,_w,'病毒版本','Exc',30);

		

	}
	me.extendVirusName = function(x,y,w,name,value,size){
		h = 60,p=10;
		me.paper.rect(x,y,w+2*p,h+2*p,2).attr({
			fill: 'rgba(0,0,0,0.1)',
			stroke: 'rgba(0,0,0,0)'
		});
		x+=p;y+=p;
		size = size ? size : size = 40;
		me.paper.circle(x,y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		me.paper.circle(x,y+h,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		me.paper.circle(x+w,y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		me.paper.circle(x+w,y+h,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		me.paper.path('M'+x+','+y+'h'+w).attr({fill:'none',stroke:'rgba(50,180,255,0.3)'});
		me.paper.path('M'+x+','+(y+h)+'h'+w).attr({fill:'none',stroke:'rgba(50,180,255,0.3)'});
		me.paper.text(x,y+10,name).attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'none',
			'text-anchor': 'start',
			'font-size': '10px',
			'font-family': '微软雅黑',
			'letter-spacing': '1px'
		});
		me.paper.text(x+w/2,y+35,value).attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'none',
			'font-size': size+'px',
			'font-family': 'Exo',
			'letter-spacing': '2px'
		});
	}

	me.ButtonA = function(x,y,text,transform){
		me.ButtonASet = me.paper.set();
		x = parseInt(x),y = parseInt(y);
		w = 60,h = 20,p = 3;
		x+=0.5,y+=0.5;
		var _h = h - 2*p;
		var _path = 'M'+(x+p)+','+(y+p)+'h3'+'L'+(x+p+3+6)+','+(y+p+_h/2)+'L'+(x+p+3)+','+(y+_h+p)+'h-3'+'z';
		me.ButtonASet.push(
			// me.paper.rect(x,y,w,h,1).attr({
			// 	stroke: 'rgba(20,128,192,0.5)',
			// 	fill: 'rgba(20,128,192,0.1)'
			// }),
			me.paper.text(x+w/2,y+h/2,text).attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '12px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px'
			})
		)
		
		// me.paper.path(_path+Raphael.transformPath(_path,('t'+(w-2*p-10)+',0r180'))).attr({
		// 	fill: 'rgba(50,180,255,0.7)',
		// 	stroke: 'rgba(50,180,255,0.7)'
		// });

		transform && me.ButtonASet.transform(transform);
	}

	me.ButtonB = function(x,y,text){
		x = parseInt(x),y = parseInt(y);
		w = 70,h = 35,p = 6;
		x+=0.5,y+=0.5;
		me.paper.rect(x,y,w,h,1).attr({
			stroke: 'rgba(20,128,192,0.1)',
			fill: 'rgba(0,0,0,0.1)'
		})
		var _h = h - 2*p;
		var _path = 'M'+(x+p)+','+(y+p)+'h'+w/3+'M'+(x+p)+','+(y+p)+'v'+h/3;
		var _path2 = 'M'+(x+p)+','+(y+p)+'h5'+'M'+(x+p)+','+(y+p)+'v5';
		me.paper.path(
			Raphael.transformPath(_path,('t0,0r0'))+
			Raphael.transformPath(_path2,('t'+(w-2*p-5)+',0r90'))+
			Raphael.transformPath(_path2,('t0,'+(h-2*p-5)+'r-90'))+
			Raphael.transformPath(_path,('t'+(w-2*p-w/3)+','+(h-2*p-h/3)+'r-180'))
		).attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'rgba(50,180,255,1)'
		});


		me.paper.text(x+w/2,y+h/2,text).attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'none',
			'font-size': '11px',
			'font-family': '微软雅黑',
			'font-weight': 'bolder',
			'letter-spacing': '1px'
		});
	}

	me.ButtonC = function(x,y,text){
		x = parseInt(x),y = parseInt(y);
		x+=0.5,y+=0.5;
		var _R = 20,p = 3,imgw = _R-p;
		// me.paper.rect(x,y,w,h,1).attr({
		// 	stroke: 'rgba(20,128,192,0.5)',
		// 	fill: 'rgba(20,128,192,0.1)'
		// })
		// me.paper.rect(x,y,h,h).attr({
		// 	stroke: 'rgba(0,0,0,0.2)',
		// 	fill: 'rgba(0,0,0,0.2)'
		// })
		// me.paper.image('image/'+text[0]+'.png',x+p,y+p,h-2*p,h-2*p);
		// me.paper.text(x+h+(w-h)/2,y+h/2,text[1]).attr({
		// 	fill: 'rgba(50,180,255,1)',
		// 	stroke: 'none',
		// 	'font-size': '12px',
		// 	'font-family': '微软雅黑',
		// 	'font-weight': 'bolder',
		// 	'letter-spacing': '1px'
		// });
		_r = 10,_t = 120; _n = 6, _p = '';
		
		for(var i=0;i< _n;i++){
			_theat = Math.PI*_t/180;
			_x = x-Math.sin(_theat)*_R;
			_y = y+Math.cos(_theat)*_R;
			_p += (((i == 0) ? 'M':'L') + (_x+','+_y));
			_t += 360/_n;
		}
		me.paper.path(_p+'z').attr({
			stroke: 'rgba(20,128,192,0.5)',
			fill: 'rgba(0,0,0,0.2)'
		})
		me.paper.image('image/'+text[0]+'.png',x-imgw/2,y-imgw/2,imgw,imgw);
		me.paper.text(x,y+_R+3*p,text[1]).attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'none',
			'font-size': '9px',
			'font-family': '微软雅黑'
		});
	}

	me.WorldMapData = function(data){
		$.getJSON('data/shape.txt',function(data){
			function checkArea(params){
				if(params.length == 0) return false;
				if(params[0] instanceof Array && params[0].length > 0){
					if(params[0][0] instanceof Array){
						$.each(params,function(i){
							checkArea(params[i]);
						});
					}else{
						var temp = [];
						$.each(params,function(i){
							temp.push(params[i]);
						});
						me.areas.push(temp);
					}	
				}
				
			}
			checkArea(data);
			me.map(window.innerWidth-398,295,772);
		});
	}

	me.virusChart = function(x,y){
		x += 0.5;y += 0.5;
		me.paper.circle(x,y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});

		me.paper.path('M'+x+','+y+'h-200').attr({fill:'rgba(50,180,255,1)',stroke:'rgba(50,180,255,1)'});

		me.paper.circle(x,y,3).attr({
			stroke: 'rgba(50,180,255,1)'
		})

		me.paper.path().attr({
			drawWindRose: [x,y,83,90,180,360,0,0,180],
			// fill: 'rgba(0,255,154,'+(Math.random())+')',
			fill: 'rgba(50,180,255,0.1)',
			stroke: 'rgba(50,180,255,0.7)'
		});

		me.paper.path().attr({
			drawWindRose: [x,y,83,90,180,260,0,0,180],
			// fill: 'rgba(0,255,154,'+(Math.random())+')',
			fill: 'rgba(50,180,255,0.65)',
			stroke: 'none'
		});


		(function drawRule(){
			var theat = 90;
			var R = 75,_path = '';
			for(var i = 0; i <= 5; i++){
				theat = i*180/5+180;
				_theat = Math.PI*theat/180;
				_x = x-Math.sin(_theat)*R;
				_y = y+Math.cos(_theat)*R;
				me.paper.text(_x,_y,i*20).attr({
					fill: 'rgba(50,180,255,1)',
					stroke: 'none',
					'font-size': '8px',
					'font-family': '微软雅黑',
					'letter-spacing': '1px'
				})
				_x = x-Math.sin(_theat)*(R+9);
				_y = y+Math.cos(_theat)*(R+9);
				_path = 'M' + _x + ',' + _y;
				_x = x-Math.sin(_theat)*(R+14);
				_y = y+Math.cos(_theat)*(R+14);
				_path += 'L' + _x + ',' + _y;
				me.paper.path(_path).attr({
					stroke: 'rgba(50,180,255,1)'
				})
			}
			me.paper.path('M'+x+','+(y-R-14)+'v-50').attr({
				stroke: 'rgba(50,180,255,1)'
			});
			me.paper.text(x,y-R-100,'危害程度').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '13px',
				'font-family': '微软雅黑',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text(x,y-R-76,'45').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '30px',
				'font-family': 'Exo',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text(x,y-R-72,'%').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '13px',
				'font-family': 'Exo',
				'text-anchor': 'start'
			})
		})();



		me.paper.circle(x,y,24).attr({
			stroke: 'rgba(50,180,255,1)'
		})
		me.paper.circle(x,y,29).attr({
			stroke: 'rgba(50,180,255,1)'
		})

		me.paper.path().attr({
			drawWindRose: [x,y,32,35,100,190,0,0,180],
			// fill: 'rgba(0,255,154,'+(Math.random())+')',
			fill: 'rgba(50,180,255,1)',
			stroke: 'none'
		});

		me.paper.path().attr({
			drawWindRose: [x,y,32,35,350,380,0,0,180],
			// fill: 'rgba(0,255,154,'+(Math.random())+')',
			fill: 'rgba(50,180,255,1)',
			stroke: 'none'
		});

		// me.paper.circle(x,y,82).attr({
		// 	stroke: 'rgba(100,100,100,0.5)',
		// 	'stroke-width': 5
		// })

		// me.paper.path().attr({
		// 	drawWindRose: [x,y,65,80,90,360,1,1,220],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'rgba(100,100,100,0.2)',
		// 	stroke: 'none'
		// });

		me.paper.circle(x,y,64).attr({
			stroke: 'rgba(50,180,255,0.21)',
			'stroke-width': 4,
			'stroke-opacity': 0.1
		})
		// // me.paper.path().attr({
		// // 	drawWindRose: [x,y,61,78,0,180,0,0,180],
		// // 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// // 	fill: 'red',
		// // 	stroke: 'none'
		// // });

		// me.paper.path().attr({
		// 	drawWindRose: [x,y,58,75,210,280,0,0,180],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'rgba(23,44,88,0.6)',
		// 	stroke: 'none'
		// });

		// me.paper.path().attr({
		// 	drawWindRose: [x,y,68,80,90,270,1,0,190],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'rgba(0,0,0,0.5)',
		// 	stroke: 'rgba(0,0,0,0.5)'
		// });
		// me.paper.path().attr({
		// 	drawWindRose: [x,y,81,98,90,180,0,0,180],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'none',
		// 	stroke: 'rgba(0,0,0,0.5)'
		// });
		var theat = 99;
		
		var R = 85;
		var DoName = ['网  络','进/线程','文件目录','注册表'];
		for(var i in DoName){
			
			theat += 13;
			_theat = Math.PI*theat/180;
			_x = x-Math.sin(_theat)*R;
			_y = y+Math.cos(_theat)*R;
			me.paper.circle(_x,_y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
			
			_x = x-Math.sin(_theat)*(R+20);
			_y = y+Math.cos(_theat)*(R+20);
			me.paper.path('M'+x+','+y+'L'+_x+','+_y).attr({stroke: 'rgba(255,255,255,0.1)'});
			_x = x-Math.sin(_theat)*(R+50);
			_y = y+Math.cos(_theat)*(R+50);
			me.ButtonA(_x,_y,DoName[i],'t-30,-10r'+(theat-90));
		}
		me.paper.path().attr({
			drawWindRose: [x,y,72,100,99,166,0,0,180],
			// fill: 'rgba(0,255,154,'+(Math.random())+')',
			fill: 'rgba(50,180,255,0.1)',
			stroke: 'rgba(50,180,255,1)'
		});
		me.paper.text(x-Math.sin(Math.PI*135/180)*(R+85),y+Math.cos(Math.PI*135/180)*(R+85),'主机操作').attr({
			fill: 'rgba(50,180,255,1)',
			stroke: 'none',
			'font-size': '13px',
			'font-family': '微软雅黑',
			'font-weight': 'bolder',
			'letter-spacing': '1px',
			'text-anchor': 'end'
		});

		// for(var i=0;i<4;i++){
		// 	theat += 14;
		// 	_theat = Math.PI*theat/180;
		// 	_x = x-Math.sin(_theat)*R;
		// 	_y = y+Math.cos(_theat)*R;
		// 	me.paper.circle(_x,_y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		// 	_x = x-Math.sin(_theat)*(R+20);
		// 	_y = y+Math.cos(_theat)*(R+20);
		// 	me.paper.path('M'+x+','+y+'L'+_x+','+_y+'h30').attr({stroke: 'rgba(255,255,255,0.1)'});
		// 	me.paper.text(_x+32,_y,i).attr({
		// 		'text-anchor': 'start',
		// 		fill: 'green'
		// 	})
		// }
		// R = 120;
		// theat = 0;
		
		// for(var i in ActionImage){
			
		// 	theat += 20;
		// 	_theat = Math.PI*theat/180;
		// 	_x = x-Math.sin(_theat)*R;
		// 	_y = y+Math.cos(_theat)*R;
		// 	me.paper.circle(_x,_y,1).attr({fill:'rgba(50,180,255,1)',stroke:'none'});
		// 	_x = x-Math.sin(_theat)*(R+10);
		// 	_y = y+Math.cos(_theat)*(R+10);
		// 	me.paper.path('M'+x+','+y+'L'+_x+','+_y).attr({stroke: 'rgba(255,255,255,0.1)'});
		// 	// me.paper.text(_x-12,_y,i).attr({
		// 	// 	'text-anchor': 'end',
		// 	// 	fill: 'green'
		// 	// })
		// 	if(i < 4){
		// 		me.ButtonC(x+i*43,y,ActionImage[i]);
		// 	}else{
		// 		me.ButtonC(x+(i-4)*43,y+60,ActionImage[i]);
		// 	}
			
		// }

		(function drawAction(){
			var _x = x + 200, _y = y + (-180);
			var _num = 0;
			var ActionImage = [
				['mail','邮件传播'],
				['over','自毁性'],
				['sendfile','释放文件'],
				['writefile','文件改写'],
				['download','下载文件'],
				['USB','U盘传播'],
				['CandC','链接C&C'],
				['others','其他行为']
			];
			for(var i in ActionImage){
				if(i < 4){
					me.ButtonC(_x+i*43,_y,ActionImage[i]);
				}else{
					me.ButtonC(_x+(i-4)*43,_y+60,ActionImage[i]);
				}
				if(Math.random() > 0.5){
					lineflag = true;
					fillflag = true;
					_num++;
				}else{
					lineflag = false;
					fillflag = false;
				}
				me.paper.path().attr({
					drawWindRose: [x,y,100,105,185+i*10,185+(parseInt(i)+1)*10,0,0,180],
					// fill: 'rgba(0,255,154,'+(Math.random())+')',
					fill: 'rgba(10,180,255,'+(fillflag ? 0.5 : 0)+')',
					stroke: 'rgba(50,180,255,1)'
				});
				var path = dWindRose(x,y,100,105,185+i*10,185+(parseInt(i)+1)*10,0,0,180).path;
				lineflag && me.paper.path(
					'M'+path[1][1]+','+path[1][2]+'C'+((_x-72.5+path[1][1])/2-20)+','+((_y+path[1][2])/2-20)+' '+
					((_x-72.5+path[1][1])/2+20)+','+((_y+path[1][2])/2+20)+' '+
					(_x-72.5)+','+(_y+50+(i*0.1))).attr({
					stroke: 'rgba(50,180,255,0.8)',
					'stroke-width': 1.2
				})
			}
			me.paper.text((_x-28.5),_y+40,'/10').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '16px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text((_x-28.5),_y,'恶意行为').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '13px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text((_x-60),_y+35,_num).attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '30px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
		})();


		// me.paper.path().attr({
		// 	drawWindRose: [x,y,78,85,250,330,0,0,180],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'none',
		// 	stroke: 'rgba(23,44,88,0.6)'
		// });

		(function drawComtany(){
			var _x = x + 205, _y = y + (-30);
			var AntivirusLib = ['安天AVL','卡巴斯基','McAfee','Norton','金  山','瑞  星','江  民','小红伞','微  软','比特梵德'];
			for(var i in AntivirusLib){
				if(i < 5){
					me.ButtonB(_x,_y+i*35,AntivirusLib[i]);
				}else{
					me.ButtonB(_x+70,_y+(i-5)*35,AntivirusLib[i]);
				}
				me.paper.path().attr({
					drawWindRose: [x,y,108,112,270+i*9,270+(parseInt(i)+1)*9,0,0,180],
					// fill: 'rgba(0,255,154,'+(Math.random())+')',
					fill: 'rgba(50,180,255,'+Math.random()+')',
					stroke: 'rgba(50,180,255,1)'
				});

				var path = dWindRose(x,y,108,112,270+i*9,270+(parseInt(i)+1)*9,0,0,180).path;
				me.paper.path(
					'M'+path[1][1]+','+path[1][2]+'C'+(path[1][1]+30+(i*5))+','+(path[1][2]+20)+' '+
					((_x-10.5+path[1][1])/2+10)+','+((_y+path[1][2])/2-10)+' '+
					(_x-9.5)+','+(_y+50+(i*0.5))).attr({
					stroke: 'rgba(50,180,255,0.8)',
					'stroke-width': 1.2
				})
			}
			me.paper.path('M'+(_x-10)+','+_y+'v190h30').attr({
				stroke: 'rgba(50,180,255,1)',
				'stroke-width': 1
			})
			
			me.paper.text((_x-18.5),_y+160,'/10').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '16px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text((_x-18.5),_y+120,'各厂商检\n出结果').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '13px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.text((_x-50),_y+155,'10').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '30px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
		})();

		(function drawVirusValueChart(){
			var theat = 7;
			var R = 100;
			var _w = 18,_h = 12;
			var arys = ['金融','商业','工业','通讯','其他'];
			for(var i = 0; i < 5 ;i++){
				
				_theat = Math.PI*theat/180;
				_x = parseInt(x-Math.sin(_theat)*R)+0.5;
				_y = parseInt(y+Math.cos(_theat)*R)+0.5;
				me.paper.path('M'+_x+','+_y+'v-'+_h+'h-'+_w+'L'+(_x-_w-5)+','+(_y-_h+5)+'v'+_h+'h'+_w+'z')
					.attr({fill:'none',stroke:'rgba(50,180,255,1)'});
				// me.paper.path('M'+(_x-_w-5)+','+(_y+5)+'L'+(_x-_w-5)+','+(y+140-i*18)+'L'+(x-130)+','+(y+140-i*18)).attr({fill:'none',stroke:'rgba(50,180,255,0.41)'});
				
				// me.paper.rect(x-160-100,y+150-i*20-10,100,20).attr({fill:'none',stroke:'rgba(50,180,255,1)'});

				
				me.paper.text(_x-_w,_y+14,arys[i]).attr({
					fill: 'rgba(50,180,255,1)',
					stroke: 'none',
					'font-size': '10px',
					'font-family': 'Exo',
					'font-weight': '300',
					'letter-spacing': '1px',
					'text-anchor': 'end'
				})

				me.paper.text(_x-11,_y-3,parseInt(Math.random()*100)).attr({
					fill: 'rgba(50,180,255,1)',
					stroke: 'none',
					'font-size': '12px',
					'font-family': 'Exo',
					'font-weight': '300',
					'letter-spacing': '1px',
					'text-anchor': 'middle'
				})
				theat += 17;
				
			}

			me.paper.text(x-Math.sin(Math.PI*45/180)*(R+55),y+Math.cos(Math.PI*45/180)*(R+55),'定向威胁\n评估(%)').attr({
				fill: 'rgba(50,180,255,1)',
				stroke: 'none',
				'font-size': '13px',
				'font-family': '微软雅黑',
				'font-weight': 'bolder',
				'letter-spacing': '1px',
				'text-anchor': 'end'
			})
			me.paper.path().attr({
				drawWindRose: [x,y,R-20,R,7,84,0,0,180],
				// fill: 'rgba(0,255,154,'+(Math.random())+')',
				fill: 'rgba(50,180,255,0.01)',
				stroke: 'rgba(50,180,255,0.2)'
			});
		})();

		

		// me.paper.path().attr({
		// 	drawWindRose: [x,y,80,95,5,84,0,0,180],
		// 	// fill: 'rgba(0,255,154,'+(Math.random())+')',
		// 	fill: 'rgba(50,180,255,0)',
		// 	stroke: 'rgba(50,180,255,0.2)'
		// });
	}

	function chartA(x,y,w,h){
		$('body').append('<div id="charAName">源地址排行</div>');
		$('#charAName').css({
			position: 'absolute',
			top: y + 10,
			left: x + 10
		})

		me.paper.rect(x,y,w,h,1).attr({
			fill: 'rgba(0,0,0,0.3)',
			stroke: 'none'
		});
		y += 55;
		p = 25;
		lineHeight = 30;
		day = [27,26,25,24,23];
		country = ['美国','日本','法国','巴西','韩国'];
		for(var i = 0 ; i < 5 ; i++){
			me.paper.text(x+p,y-1.5+lineHeight*i,day[i]).attr({
				fill: '#FFF',
				'font-size': '10px',
				'font-family': 'FileFolderJNL',
				'letter-spacing': '2px'
			});
			me.paper.path('M'+ (x+p+15.5) + ',' + (y+0.5+lineHeight*i) +'h'+(w-2*p-10)).attr({
				stroke: 'rgba(129,220,223,0.5)',
				'stroke-width': 1,
				"stroke-opacity": 0.3,
				'stroke-dasharray': '- '
			});
			me.paper.path('M'+ (x+p+35.5+49*i) + ',' + (y - 15.5) +'v'+(lineHeight*4+29)).attr({
				stroke: 'rgba(129,220,223,0.5)',
				'stroke-width': 1,
				"stroke-opacity": 0.3

			});
			me.paper.text(x+60+i*49,y+22+lineHeight*4,country[i]).attr({
				fill: '#FFF',
				'font-size': '12px',
				'font-family': '微软雅黑',
				'letter-spacing': '2px'
			});
		}
		for(var i = 0 ; i < 5 ; i++){
			for(var j = 0 ; j < 5 ; j++){
				num = Math.random();
				r = num*8 + 3;
				me.paper.circle(x+p+35.5+49*i,y+0.5+lineHeight*j,r).attr({
					fill: Raphael.hsl(1, 1, num*0.5+0.1),
					'stroke': 'none'
				});
			}
		}
		
	}

	function chartB(x,y,w,h){
		$('body').append('<div id="charBName">各省市被攻击统计图</div>');
		$('#charBName').css({
			position: 'absolute',
			top: y + 10,
			left: x + 10
		})
		//图例颜色值
		var Legendcolors = ['#F6FAAA','#FFAE4E','#F46D43','#D53E4F','#9E0142'];
		me.paper.rect(x,y,w,h,1).attr({
			fill: 'rgba(0,0,0,0.3)',
			stroke: 'none'
		});
		//数量
		//环空隙所占比例;
		spaceX = 2;
		//层空隙所占值;
		spaceY = 2.5;
		minr = 340/vds_data.length*spaceX/(spaceX+1);
		// d = 360/count*2;
		j = 91;

		y += 150;

		// me.paper.circle(x+w/2,y,21).attr({
		// 	fill: 'none',
		// 	stroke: 'rgba(0,255,154,1)',
		// 	'stroke-width': 3
		// });
		var ssss = 20;
		var temp = [[5,30,210],[3,210,240],[5,240,270],[3,270,300],[5,300,330],[3,330,390]];
		for(var i in temp){
			var a = Math.abs(temp[i][1]-temp[i][2]) > 180 ? 1 : 0;
			var path = dWindRose(x+w/2,y,ssss-temp[i][0],ssss,temp[i][1],temp[i][2],a*1,0,180+a*10).path;
			var pathstr = '';
			for(var p in path){
				for(var str in path[p]){
					pathstr += ($.isNumeric(path[p][str]) ? (path[p][str]  + ',') : path[p][str]);
				}
				pathstr = pathstr.substring(0,pathstr.length-1);
			}
			pathstr += 'z'
			me.paper.path(pathstr).attr({
				fill: 'rgba(0,255,154,1)',
				stroke: 'none'
			});
		}

		// me.paper.circle(x+w/2,y+h/2,87).attr({
		// 	fill: 'none',
		// 	stroke: 'rgba(0,255,154,1)',
		// 	'stroke-width': 2
		// });

		var span = [3,5,7,3,3,5,5];
		var spand = [];
		
		for(var i = 0; i < vds_data.length; i++){
			//最内侧圆半径
			r = 25;
			R = 100;
			
			ar = (Math.random()*5+4);
			spand.push(j);
			for(var k=0; k < 5 ;k++){
				
				me.paper.path().attr({
					drawWindRose: [x+w/2,y,r,r+ar,j,j+minr,0,0,180],
					// fill: 'rgba(0,255,154,'+(Math.random())+')',
					fill: Legendcolors[parseInt(Math.random()*Legendcolors.length)],
					stroke: 'none'
				});
				t = Math.PI*(j + minr/2)/180;
				
				r=r+ar+spaceY;
			}
			me.paper.text(-Math.sin(t)*R+x+w/2,Math.cos(t)*R+y,vds_data[i].name).attr({
				fill: '#999',
				'font-size': '10px',
				'font-family': '微软雅黑'
			})

			j=j+minr+minr/spaceX;
		}
		var t = 0;
		R = 85;
		for(var i in span){
			if(span[i]+t-1 > spand.length) break;
			var path = dWindRose(x+w/2,y,R,R+6,spand[t],spand[span[i]+t-1]+minr,0,0,180).path;

			me.paper.path('M'+path[2][6]+','+path[2][7]+'L'+path[3][1]+','+path[3][2]+
			'A'+path[4][1]+','+path[4][2]+','+path[4][3]+','+path[4][4]+','+path[4][5]+','+path[4][6]+','+
			path[4][7]+','+path[4][8]+'L'+path[1][1]+','+path[1][2]).attr({
				fill: 'none',
				stroke: 'rgba(0,255,154,1)',
				'stroke-width': 2
			});
			t = span[i]+t;

		}
		var recth = 18,rectw = 9;
		var font = {
			fill: "#C3CFD1", 
			"font-size":8, 
			"font-weight": "bold", 
			"font-family": "微软雅黑",
			'text-anchor': 'end'
		};
		//图例,10,50,100,1000
		var LegendValues = ['0','10','50','100','1000'];
		for(var i in LegendValues){
			me.paper.rect(x+w-10-rectw, y+recth*i+R, rectw, recth).attr({
		        "stroke-width": 0,
		        fill: Legendcolors[i],
		        "fill-opacity": 1
		    });
		    me.paper.text(x+w-7-rectw*2, y+recth*i+7+R, LegendValues[i]).attr(font);
		}
		// var recth = 9,rectw = 30;
		// for(var i in LegendValues){
		// 	me.paper.rect(x+rectw*i+w/2-recth*4, y+R+50, rectw, recth).attr({
		//         "stroke-width": 0,
		//         fill: Legendcolors[i],
		//         "fill-opacity": 1
		//     });
		//     me.paper.text(x+rectw*i+w/2-recth*4, y+R+42, LegendValues[i]).attr(font);
		// }
	}
	
	me.rightTop();
	me.WorldMapData();
	me.earthTopLeft(60,45);

	chartA(60,410,300,220);
	chartB(60,645,300,350);
}

var DrawBgSvg = function(){
	var me = this;

	var id = 'bgsvg';
	me.width = window.innerWidth;
	me.height = window.innerHeight;

	me.paper = Raphael(id,me.width,me.height);

	var gridRowNum = 28,
		gridColNum = 100,
		colSpace = 2,
		rowSpace = 2;

	colWidth = (me.width - (gridColNum + 1) * colSpace)/ gridColNum;
	colHeight = (me.height - (gridRowNum + 1) * rowSpace)/ gridRowNum;

	// for(var i = 0; i < gridColNum; i++){
	// 	c = colSpace*(i+1) + colWidth*i;
	// 	for(var j = 0; j < gridRowNum; j++){
	// 		r = rowSpace*(j+1) + colHeight*j;
	// 		me.paper.rect(c,r,colWidth,colHeight).attr({
	// 			fill: 'rgba(0,0,0,0.15)',
	// 			stroke: 'none'
	// 		})
	// 	}
	// }
}