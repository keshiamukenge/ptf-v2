'use client'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useFrame } from '@react-three/fiber'

import { getHTMLElementSize, getNormalizeHTMLElementPosition } from '@/app/lib/utils/webgl'

interface IProps {
    refs: React.MutableRefObject<HTMLLIElement[]>
}

export default function Gallery({ refs }: IProps) {
  const texture = useLoader(TextureLoader, "/images/projects/2.jpeg")
  const vertex = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
        vUv = uv;

        vec3 transformed = position;
        float dx = position.x;
        float dy = position.y;  
        float freq = sqrt(dx*dx + dy*dy);
        float amp = 5.;
        float angle = -uTime*10.0+freq*6.0;
        transformed.z += sin(angle)*amp;

        // objectNormal = normalize(vec3(0.0,-amp * freq * cos(angle),1.0));
        // vNormal = normalMatrix * objectNormal;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }`;

  const fragment = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
        vec2 uv = vUv;

        vec4 texture = texture2D(uTexture, uv);

        gl_FragColor = vec4(texture.rgb, 1.0);
    }`;

    const uniforms = {
        uTexture: { value: texture },
        uTime: { value: 0 }
    }
    
    useFrame(({ clock }) => {
        uniforms.uTime.value = clock.getElapsedTime()
    })

    return refs.current?.map((ref, id) => (
        <mesh key={id} position={getNormalizeHTMLElementPosition(ref?.current)}>
            <planeGeometry args={getHTMLElementSize(ref?.current, 60, 60)} />
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms}
            />
        </mesh>
    ))
}