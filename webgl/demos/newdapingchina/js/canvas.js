var stage = new Kinetic.Stage({
	x:0,
	y:0,
    container: 'canvascontainer',
    width: 430,
    height: 280
});

var width = stage.getWidth();
var height = stage.getHeight();

var centerX = 280,
	centerY = height/2;

var layer = new Kinetic.Layer();


// 间距 5
var interSpace = 8,
	R = 80.9,
	Num = 12,
	everyRadiu = 360/Num;



var points = [];

var layers1 = [];

var lineLayers = [];

var bottomlayer = new Kinetic.Layer();

bottomlayer.add(
	new Kinetic.Shape({
		x: 60,
		y: 195,
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(0,10);
			context.lineTo(80,10);
			context.lineTo(100,0);
			context.fillStrokeShape(this);
		},
		stroke: 'rgba(167,187,224,0.5)'
	})
)
bottomlayer.add(
	new Kinetic.Text({
		x: 60,
		y: 190,
		width: 110,
		text: '被感染次数',
		align: 'left',
		fontSize: 8,
		fontFamily: '微软雅黑',
		fill: '#ccc'
	})
)
bottomlayer.add(
	new Kinetic.Shape({
		x: 60,
		y: 75,
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(80,0);
			context.lineTo(100,10);
			context.fillStrokeShape(this);
		},
		stroke: 'rgba(167,187,224,0.5)'
	})
)

bottomlayer.add(
	new Kinetic.Text({
		x: 60,
		y: 60,
		width: 110,
		text: '传播次数',
		align: 'left',
		fontSize: 8,
		fontFamily: '微软雅黑',
		fill: '#ccc'
	})
)

stage.add(bottomlayer);

var activeIndex = -1;

for(var i = 0; i < Num; i++){
	start = (everyRadiu)*i + interSpace/2 - 90 - everyRadiu/2;
	a1 = toMathPI(start);
	a2 = toMathPI(start+everyRadiu-interSpace);
	if (i%6 != 0 ){dd(a1,a2,R,i)};
}

function dd(a1,a2,R,i){
	points.push([a1,a2]);

	_thisLayer = new Kinetic.Layer({
		visible: false
	});
	

	_thisLayer.add(new Kinetic.Shape({
		x: centerX,
		y: centerY,
		drawFunc: function(context) {
			context.beginPath();
			context.arc(0,0,R,a1,a2-(a2-a1)/2 - (Math.PI/180*0.1),false);
			context.fillStrokeShape(this);
		},
		stroke: 'rgba(167,187,224,1)',
		strokeWidth: 10.85
	}));
	var _point4 = (a2-a1)/4 +a1;
	var _r4 = Math.random()*30 + 5;
	_thisLayer.add(new Kinetic.Shape({
		x: centerX + Math.cos(_point4)*(R+20),
		y: centerY + (R+20) * Math.sin(_point4),
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(Math.cos(_point4)*_r4,Math.sin(_point4)*_r4);
			context.fillStrokeShape(this);
		},
		stroke: '#ff0073',
		strokeWidth: 1.5
	}));

	_thisLayer.add(new Kinetic.Circle({
		x: centerX + Math.cos(_point4)*(R+_r4 + 20),
		y: centerY + (R+_r4 + 20) * Math.sin(_point4),
		radius: 2,
		stroke: '#FF1A15',
		fill: '#FF1A15',
		strokeWidth: 1.2
	}));

	_thisLayer.add(new Kinetic.Shape({
		x: centerX,
		y: centerY,
		drawFunc: function(context) {
			context.beginPath();
			context.arc(0,0,R,a2-(a2-a1)/2 + (Math.PI/180*0.1),a2,false);
			context.fillStrokeShape(this);
		},
		stroke: '#e3eafe',
		strokeWidth: 10.85
	}));

	_thisLayer.add(new Kinetic.Shape({
		x: centerX + Math.cos(_point4)*(R + 20),
		y: centerY + (R + 20) * Math.sin(_point4),
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(6,0);
			context.arc(0,0,6,0,Math.PI,false);
			context.lineTo(-6,-_r4);
			context.arc(0,-_r4,6,Math.PI,0,false);
			context.closePath();
			context.fillStrokeShape(this);
		},
		rotation: _point4 + Math.PI/2,
		stroke: 'none',
		fillLinearGradientStartPoint: [0,-30],
		fillLinearGradientEndPoint: [0,0],
		fillLinearGradientColorStops: [0,'rgba(223,0,101,0.68)',1,'rgba(223,0,101,0.2)'],
	}));

	var _point43 = a2 - (a2-a1)/4;
	var _r43 = Math.random()*25 + 1;
	_thisLayer.add(new Kinetic.Shape({
		x: centerX + Math.cos(_point43)*(R+20),
		y: centerY + (R+20) * Math.sin(_point43),
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(Math.cos(_point43)*_r43,Math.sin(_point43)*_r43);
			context.fillStrokeShape(this);
		},
		stroke: '#2D7EC3',
		strokeWidth: 1.5
	}));

	_thisLayer.add(new Kinetic.Circle({
		x: centerX + Math.cos(_point43)*(R+_r43 + 20),
		y: centerY + (R+_r43 + 20) * Math.sin(_point43),
		radius: 2,
		stroke: '#2D7EC3',
		fill: '#2D7EC3',
		strokeWidth: 1.2
	}));

	_thisLayer.add(new Kinetic.Shape({
		x: centerX + Math.cos(_point43)*(R + 20),
		y: centerY + (R + 20) * Math.sin(_point43),
		drawFunc: function(context) {
			context.beginPath();
			context.moveTo(6,0);
			context.arc(0,0,6,0,Math.PI,false);
			context.lineTo(-6,-_r43);
			context.arc(0,-_r43,6,Math.PI,0,false);
			context.closePath();
			context.fillStrokeShape(this);
		},
		rotation: _point43 + Math.PI/2,
		stroke: 'none',
		fillLinearGradientStartPoint: [0,-30],
		fillLinearGradientEndPoint: [0,0],
		fillLinearGradientColorStops: [1,'rgba(45,126,195,0.6)',0,'rgba(45,126,195,0.1)'],
	}));



	_thisLayer.add(
		new Kinetic.Shape({
			x: centerX,
			y: centerY,
			drawFunc: function(context) {
				context.beginPath();
				context.arc(0,0,R-5,a1,a2,false);
				context.fillStrokeShape(this);
			},
			stroke: 'rgba(29,29,27,0.2)',
			strokeWidth: 20/2,
			draggable: false,
			dragOnTop: false
		})
	);

	_thisLayer.add(new Kinetic.Circle({
		x: centerX + Math.cos(a1)*R,
		y: centerY + R * Math.sin(a1),
		radius: 4.024,
		stroke: '#042a3a',
		fill: '#a7bbe0',
		strokeWidth: 1.508
	}));

	_thisLayer.add(new Kinetic.Circle({
		x: centerX + Math.cos(a2)*R,
		y: centerY + R * Math.sin(a2),
		radius: 4.024,
		stroke: '#042a3a',
		fill: '#e3eafe',
		strokeWidth: 1.508
	}));
	_r = R - 125,
	rotation = a2-(a2-a1)/2;
	if (rotation < Math.PI/2){
		_thisLayer.add(new Kinetic.Text({
			x: centerX + Math.cos(a2-(a2-a1)/2)*_r,
			y: centerY + _r * Math.sin(a2-(a2-a1)/2) - 3,
			width: 110,
			text: dataName[points.length-1],
			align: 'right',
			rotation: rotation,
			fontSize: 8,
			fontFamily: '微软雅黑',
			fill: '#ccc'
		}));

	}else{
		rotation = a2-(a2-a1)/2 + Math.PI;
		_r = R - 10;
		_thisLayer.add(new Kinetic.Text({
			x: centerX + Math.cos(a2-(a2-a1)/2)*_r,
			y: centerY + _r * Math.sin(a2-(a2-a1)/2) - 5,
			width: 110,
			text: dataName[points.length-1],
			align: 'left',
			rotation: rotation,
			fontSize: 8,
			fontFamily: '微软雅黑',
			fill: '#ccc'
		}));

	}

	var df = new Kinetic.Shape({
		x: centerX,
		y: centerY,
		drawFunc: function(context) {
			context.beginPath();
			context.arc(0,0,R-61,a1,a2,false);
			context.fillStrokeShape(this);
		},
		stroke: 'rgba(0,0,0,0)',
		strokeWidth: 140,

	})

	_thisLayer.add(df);

	// _thisLayer.setOpacity(0.9);
	stage.add(_thisLayer);
	layers1.push(_thisLayer);
}

function showAll(){
	if(btnStatus == 1) btnControl();
	setTimeout(function(){
		if(btnStatus == 0){
			activeIndex = -1;
			for(var n in layers1){
				layers1[n].setOpacity(1);
				layers1[n].draw();
				lineLayers[n].setVisible(true);
				lineLayers[n].draw();
			}
		}
		
	},800)
}

for(var i in points){
	var lineLayer = new Kinetic.Layer({
		visible: false
	});

	a1 = points[i][0];
	a2 = points[i][1];

	line(a1,a2,lineLayer);
	for(var j = 0; j < data[i].length; j++){
		var random = data[i][j];
		if(random >= 100){
			_a2 = toMathPI(90);
		}else if(random == -1){
			_a2 = toMathPI(-90);
		}else{
			_a2 = points[random][1];
		}
		
		line(a1,_a2,lineLayer);
	}

	for(var j = 0; j < data[i].length; j++){
		var random = data[i][j];
		if(random >= 100){
			_a2 = toMathPI(90);
		}else if(random == -1){
			_a2 = toMathPI(-90);
		}else{
			_a2 = points[random][1];
		}
		
		line(a2,_a2,lineLayer);
	}

	stage.add(lineLayer);
	lineLayers.push(lineLayer);

	lineLayer.moveToBottom();
	lineLayer.draw();
}
function rd(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}
function line(a1,a2){

	if(
		(a2 == toMathPI(90) && (a1 == 3.6340248354024784)) || 
		(a2 == toMathPI(-90) && (a1 == 3.9955573233155897 ))
	){
		_sw = 5
	}else{
		_sw = 1
	}
	lineLayer.add(
		new Kinetic.Shape({
			stroke: 'rgba(45,126,195,0.15)',
			strokeWidth: _sw,
			drawFunc: function(context) {
				var _bd = (Math.random()*2 - 1)*2;

				context.beginPath();
				context.moveTo(centerX + Math.cos(a1)*R, centerY + R * Math.sin(a1));
				context.lineTo(centerX + Math.cos(a1)*(R-40), centerY + (R-40) * Math.sin(a1));
				
				if(a2 == toMathPI(90) || a2 == toMathPI(-90)){
					context.quadraticCurveTo(
						centerX + Math.cos(a2-(a2-a1)/2), 
						centerY + Math.sin(a2-(a2-a1)/2), 
						centerX + Math.cos(a2)*(R) + _bd, centerY + (R) * Math.sin(a2)
					);
					// context.lineTo(centerX + Math.cos(a2)*R, centerY + R * Math.sin(a2));
				}else{
					context.quadraticCurveTo(
						centerX + Math.cos(a2-(a2-a1)/2), 
						centerY + Math.sin(a2-(a2-a1)/2), 
						centerX + Math.cos(a2)*(R-40), centerY + (R-40) * Math.sin(a2)
					);
					context.lineTo(centerX + Math.cos(a2)*R, centerY + R * Math.sin(a2));
				}

				
				if(a2 == toMathPI(90)){
					context.lineTo(centerX + _bd, height);
				}else if(a2 == toMathPI(-90)){
					context.lineTo(centerX + _bd, 0);
				}
				context.fillStrokeShape(this);
			}
		})
	);
}




var ani = 0,ani2 = 0,start = 100;
var anim = new Kinetic.Animation(function(frame) {
	if(ani==layers1.length){
		if(ani2 == lineLayers.length){
			anim.stop();
		}
		if((frame.time >= start) && lineLayers[ani2]){
			lineLayers[ani2].setVisible(true);
			lineLayers[ani2].draw();
			start += 50;
			ani2++;
		}
	}
	if((frame.time >= start) && layers1[ani]){
		layers1[ani].setVisible(true);
		layers1[ani].draw();
		start += 50;
		ani++;
	}
}, layer);

anim.start();

function toMathPI(d){
	return d * Math.PI / 180;
}