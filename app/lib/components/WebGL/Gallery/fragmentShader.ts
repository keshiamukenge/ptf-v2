export const fragment = `
	uniform sampler2D uTexture;
	uniform float uTime;
	uniform float uAlpha;

	varying vec2 vUv;

	void main() {
		vec2 uv = vUv;

		vec4 texture = texture2D(uTexture, uv);

		gl_FragColor = vec4(texture.rgb, uAlpha);
	}
`;