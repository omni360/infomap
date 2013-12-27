
var fragmentshader = 

	"uniform vec3 color;" + 
	"uniform sampler2D texture;" + 
	
	"varying vec3 vColor;" + 
	"varying float fAlpha;" + 
	
	"void main() {" + 
	
	"	float depth = gl_FragCoord.z / gl_FragCoord.w;" + 
	"	float near = 100.0;" + 
	"	float far = 400.0;" + 
	"	float fog = 0.0 + smoothstep( near, far, depth );" + 
	
	"	vec4 outColor = texture2D( texture, gl_PointCoord );" + 
	"	if ( outColor.a < 0.24 ) discard;" + 
	
	"	gl_FragColor = vec4( color * vColor, fAlpha );" + 
	"	gl_FragColor = gl_FragColor * outColor;" + 
	"	gl_FragColor = mix( gl_FragColor, vec4( vec3(0.0,0.0,0.0), gl_FragColor.w ), fog );" + 
	
	"}";