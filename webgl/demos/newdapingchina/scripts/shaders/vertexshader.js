
var vertexshader = 

	"attribute float size;" + 
	"attribute vec3 customColor;" + 
	"attribute float time;" + 
	"uniform float globalTime;" + 
	
	"varying vec3 vColor;" + 
	"varying float fAlpha;" + 
	
	"void main() {" + 
		
	"	vColor = customColor;" + 
		
	"	vec3 pos = position; " + 
		
	"	float animTime = min(1.4, max(1.0, globalTime - time));" + 
		
	"	vec3 animated = vec3( pos.x * animTime, pos.y * animTime, pos.z * animTime );" + 
		
	"	vec4 mvPosition = modelViewMatrix * vec4( animated, 1.0 );" + 
		
	"	fAlpha = 1.0;" + 
		
	"	gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );" + 
		
	"	gl_Position = projectionMatrix * mvPosition;" + 
		
	"}";