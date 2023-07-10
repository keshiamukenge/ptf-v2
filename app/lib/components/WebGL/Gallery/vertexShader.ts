export const vertex = `
	uniform float uTime;
	uniform float uAmplitude;
	uniform float uFrequencyMultiplier;

	varying vec2 vUv;
	varying vec3 vNormal;

	void main() {
		vUv = uv;

		vec3 transformed = position;
		float dx = position.x;
		float dy = position.y;  
		float freq = sqrt(dx*dx + dy*dy) * uFrequencyMultiplier;
		float angle = -uTime*4.+freq*.075;
		transformed.z += sin(angle)*uAmplitude;

		vec3 objectNormal = normalize(vec3(0.0,-uAmplitude * freq * cos(angle),1.0));
		vNormal = normalize(objectNormal);

		if(uTime > 0.0) {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed + vNormal, 1.0);
		} else {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	}
`;