
var array = [],
	pointDict = {},
	groupDict = {};


function init() {
	
	$.get('data/globe.txt', function (json){
		
		array = eval(json);
		
		$.get('data/data.txt', function (res){
			
			var result = eval(res);
			for (var i in result){
				pointDict[result[i]['id']] = result[i];
				var value = {x: result[i]['coord'][0], y: result[i]['coord'][1], scale:4, mod: 0, delay: Math.random(), group: result[i]['group'], id: result[i]['id'], level: result[i]['level'], color: result[i]['color']};
				array.push(value);
				
				!groupDict[result[i]['level']] && (
					groupDict[result[i]['level']] = {
						'name': result[i]['type'], 'children': [], 'color': result[i]['color']
					}
				);
				groupDict[result[i]['level']]['children'].push(result[i]['id']);
				
			}
			init_webgl();
			animate()
			
		},'text')

	},'text')
}