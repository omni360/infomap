// default effect

var updateText= function(){
	/*
	if( spark ){
		scene.remove(spark.container());
		spark.destroy();
		spark	= null;
	}*/
	
	createSparks()

	
}

function createSparks(){
	
	for (var i = 1; i <= 10 ; i++){
		var spark= new THREEx.Sparks({
			maxParticles	: 250 * i ,
			counter		: new SPARKS.SteadyCounter(250 * i)
		});
		
		// setup the emitter
		var emitter	= spark.emitter();
		
		var initColorSize	= function(){
			this.initialize = function( emitter, particle ){
				particle.target.color().setHSL(Math.random(), Math.random(), Math.random() / 2);
				particle.target.size(Math.random() * 100);
			};
		};
		
		emitter.addInitializer(new initColorSize());
		var emitterpos = new THREE.Vector3(0, 0, 0);
		emitter.emitterpos = emitterpos;
		
		emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( emitter.emitterpos ) ) );
		emitter.addInitializer(new SPARKS.Lifetime(0.9, 1));
		emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,0,0))));
		
		emitter.addAction(new SPARKS.Age(TWEEN.Easing.Quadratic.EaseInOut));
		emitter.addAction(new SPARKS.Move());
		
		var randomDrift = Math.random() * 1000;
		
		emitter.addAction(new SPARKS.RandomDrift(randomDrift,randomDrift,randomDrift));
		emitter.addAction(new SPARKS.Accelerate(0,800,0));
		emitter.start();
		
		// restart it 
		threexSparks.push(spark);
		sparkGroup.add(spark.container());
	}
	scene.add(sparkGroup);
}

updateText();
