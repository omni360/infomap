Space3D.DisplayList = {
	
	viewports: [
		{
			parameters: [
				{controler: true, radius: 5000, clearColor: 0x002240, enableClick: true, enableRollOver: true},
			],
			position: {x: 0, y: 1000, z: 5000},
		}, 
		
		{
			parameters: [
				{
					fov: 45, near: 1, far: 30000, top: 50, left: 50, width: 200, height: 150, 
					controler: true, clearColor: 0x00000, target: models[0].position
				}
			],
			controlerAttr: { noPan: true, noZoom: true }
		}
	],
	
	models: [
	/*
		{
			model: null,
			parameters: [],
			attributes: [],
			position: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		}
	*/
		{
			model: Space3D.Gyroscope,
			position: {x: 40000, y: 40000, z: 40000},
		}, 
		
		{
			model: Space3D.Floor,
		},
		
		{
			model: Space3D.Star,
			parameters: [
				{ size: 100 }
			],
		},
		
		{
			model: Space3D.TopoSystem,
			parameters: [
				{ size: 100 }
			],
		},
		
	]
}
