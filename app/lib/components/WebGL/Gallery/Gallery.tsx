'use client'

import { useRef, createRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { useLoader } from '@react-three/fiber'

import { getHTMLElementSize, getNormalizeHTMLElementPosition } from '@/app/lib/utils/webgl'
import { fragment } from './fragmentShader'
import { vertex } from './vertexShader'

interface IProps {
    refs: React.MutableRefObject<HTMLLIElement[]>
}

export default function Gallery({ refs }: IProps) {
    const meshesRefs = useRef<THREE.Mesh[]>([])
    meshesRefs.current = refs.current.map((_, i) => meshesRefs.current[i] ?? createRef());
    const texture = useLoader(TextureLoader, "/images/projects/2.jpeg")

    const uniforms = [{
        uTexture: { value: texture },
        uTime: { value: 0.0 },
        uAmplitude: { value: 0.0 }, // 25.0
        uFrequencyMultiplier: { value: 0.0 }, // 0.5
    }, 
    {   
        uTexture: { value: texture },
        uTime: { value: 0.0 },
        uAmplitude: { value: 0.0 }, // 25.0
        uFrequencyMultiplier: { value: 0.0 }, // 0.5
    }]

    function onPointerDown(e, id) {
        gsap.set(meshesRefs.current[id].current.material.uniforms.uAmplitude, {
            value: 35.0,
        })
        gsap.set(meshesRefs.current[id].current.material.uniforms.uFrequencyMultiplier, {
            value: 0.7,
        })
        gsap.to(meshesRefs.current[id].current.material.uniforms.uAmplitude, {
            value: 0.0,
            duration: 2,
            onUpdate: () => {
                meshesRefs.current[id].current.material.uniforms.uTime.value += 0.01
            }
        })
        gsap.to(meshesRefs.current[id].current.material.uniforms.uFrequencyMultiplier, {
            value: 0.0,
            duration: 1.5,
        })
        gsap.to(meshesRefs.current[id].current.position, {
            z: 1,
            duration: 1.5,
            x: 1,
            y: 1,
        })
        gsap.to(meshesRefs.current[id].current.scale, {
            duration: 0.5,
            x: 1.5,
            y: 1.5,
        })
    }

    return refs.current?.map((ref, id) => (
        <mesh
            key={id}
            position={getNormalizeHTMLElementPosition(ref?.current)}
            onPointerDown={(e) => onPointerDown(e, id)}
            ref={meshesRefs.current[id]}
        >
            <planeGeometry
                args={getHTMLElementSize(ref?.current, 100, 100)}
                attach="geometry"
            />
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms[id]}
                uniformsNeedUpdate
                attach="material"
            />
        </mesh>
    ))
}