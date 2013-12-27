THREE.ShapeModel = {
	// 扇形
	Sector : function ( sx, sy, insideRadius, outsideRadius, sStartAngle, sEndAngle,curveSegments){
		sStartAngle = Math.PI/180*sStartAngle;
		sEndAngle = Math.PI/180*sEndAngle;

		var points1 = [],points2 = [];
		insideCircle = new THREE.EllipseCurve(sx,sy,insideRadius,insideRadius,sStartAngle,sEndAngle,false);
		outsideCircle = new THREE.EllipseCurve(sx,sy,outsideRadius,outsideRadius,sStartAngle,sEndAngle,false);

		for(var i = 0 ; i <= curveSegments ; i++ ){
			points1.push(insideCircle.getPoint(i/curveSegments));
			points2.push(outsideCircle.getPoint(1-i/curveSegments));
		}
		points2.push(insideCircle.getPoint(0));
		return points1.concat(points2);
	},

	RoundedRect :  function ( x, y, width, height, radius ){

		var dddd = new THREE.Path();

		dddd.moveTo( x, y + radius );

		

		dddd.moveTo( x, y + radius );
		dddd.lineTo( x, y + height - radius );
		dddd.quadraticCurveTo( x, y + height, x + radius, y + height );
		dddd.lineTo( x + width - radius, y + height) ;
		dddd.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
		dddd.lineTo( x + width, y + radius );
		dddd.quadraticCurveTo( x + width, y, x + width - radius, y );
		dddd.lineTo( x + radius, y );
		dddd.quadraticCurveTo( x, y, x, y + radius );

		console.info(dddd);

		
	}
}