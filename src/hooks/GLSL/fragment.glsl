#version 300 es

precision highp float;

uniform sampler2D uTexSampler;
uniform vec3 uColors[2];
uniform vec2 uDomains[2];

in vec2 vTexCoord;

out vec4 outColor;

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
	float colorValue = (texture(uTexSampler, vTexCoord).r - uDomains[0][0]) / uDomains[0][1];

	vec3 rgbCombo = vec3(0.0);
	vec3 hsvCombo = vec3(0.0);

	float colorValues[1] = float[1](colorValue);

	for(int i = 0; i < 1; i++) {
		hsvCombo = vec3(uColors[i].xy, max(0.0, colorValues[i]));
		rgbCombo += hsv2rgb(hsvCombo);
	}

	outColor = vec4(0,0,0, 1.0);
}