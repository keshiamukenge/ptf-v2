export const fragment = `
	uniform sampler2D uTexture;
	varying vec2 vUv;
	uniform float uTime;

	void main() {
		vec2 uv = vUv;

		vec4 texture = texture2D(uTexture, uv);

		gl_FragColor = vec4(texture.rgb, 1.0);
	}
`;