/**
 * Full-screen textured quad shader
 */

 const CustomShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 }

	},

	vertexShader: /* glsl */`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`
		uniform float opacity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		void main() {
			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;
			vec4 color = gl_FragColor;
			
			// Andere Angehensweise
			// Es wird der durchschnitt der unterschiede von grün zu den andern bzw. rot zu den anderen ausgelesen
			float diffGreen = ((color.g - color.r) + (color.g - color.b))/2.0;
			float diffRed = ((color.r - color.g) + (color.r - color.b))/2.0;
			// Überprüft ob grün einen bestimmten Teil größer ist als die anderen beiden
			if (diffGreen >= 0.1) {
				gl_FragColor = vec4(color.r + color.r*diffGreen*4.0, color.g + color.g*diffGreen*1.0, color.b + color.b*diffGreen, 1.0);   
				//fragColor = vec4(1.0,0.0,0.0,1.0);
			}
			// Überprüft ob rot einen bestimmten Teil größer ist als die anderen beiden
			else if (diffRed >= 0.1) 
			{
				gl_FragColor = vec4(color.r - color.r*diffRed*1.0, color.g + color.g*diffRed*5.0, color.b + color.b*diffRed*8.0 + 0.5, 1.0);   
				//fragColor = vec4(0.0,1.0,0.0,1.0);
			}
			else{
				// wenn weder grün noch rot wahrgenommen wird, wird einfach der Pixel ohne manipulation weitergegeben
				gl_FragColor = vec4(0.0,1.0,0.0,0.01);
			}
		}`

};

export { CustomShader };