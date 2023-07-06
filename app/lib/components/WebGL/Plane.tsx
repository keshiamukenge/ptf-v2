import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { ThreeEvent, useLoader, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { PlaneGeometry, Mesh } from 'three';

import { fragment } from './Gallery/fragmentShader'
import { vertex } from './Gallery/vertexShader'

interface IProps {
	position: [number, number, number];
	args: [number, number, number, number];
}

extend({ PlaneGeometry, Mesh });
const CustomPlane = 'mesh';
const CustomPlaneGeometry = 'planeGeometry';

const RippleShaderMaterial = shaderMaterial(
	{
		uTexture: null,
		uTime: 0.0,
		uAmplitude: 0.0,
		uFrequencyMultiplier: 0.0,
		uAlpha: 1.0,
	},
	vertex,
	fragment
)

extend({ RippleShaderMaterial });

export default function Plane({ position, args }: IProps) {
  const texture = useLoader(TextureLoader, "/images/projects/2.jpeg")

	function onPointerDown(e: ThreeEvent<PointerEvent>) {
		gsap.set(e.intersections[0].object.material.uniforms.uAmplitude, {
			value: 35.0,
		})
		gsap.set(e.intersections[0].object.material.uniforms.uFrequencyMultiplier, {
			value: 0.7,
		})
		gsap.to(e.intersections[0].object.material.uniforms.uAmplitude, {
			value: 0.0,
			duration: 2,
			onUpdate: () => {
				e.intersections[0].object.material.uniforms.uTime.value += 0.01
			},
		})
		gsap.to(e.intersections[0].object.material.uniforms.uFrequencyMultiplier, {
			value: 0.0,
			duration: 1.5,
		})
		gsap.to(e.intersections[0].object.position, {
			z: 1,
			duration: 0.9,
			x: 1,
			y: 1,
		})
		gsap.to(e.intersections[0].object.scale, {
			duration: 0.5,
			x: 1.5,
			y: 1.5,
		})

		console.log(e)
	}

	return(
		<mesh
			position={position}
			onPointerDown={onPointerDown}
		>
			<CustomPlaneGeometry
				args={args}
				attach="geometry"
			/>
			<rippleShaderMaterial uTexture={texture} />
		</mesh>
	)
}