'use client'

import { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { ThreeEvent, useLoader, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { PlaneGeometry, Mesh } from 'three';

import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { fragment } from './Gallery/fragmentShader'
import { vertex } from './Gallery/vertexShader'

interface IProps {
	position: [number, number, number];
	args: [number, number, number, number];
	isSelected: boolean;
}

extend({ PlaneGeometry, Mesh });
const CustomPlane = 'mesh';
const CustomPlaneGeometry = 'planeGeometry';

const RippleShaderMaterial = shaderMaterial(
	{
		uTexture: null,
		uTime: 0.0,
		uAmplitude: 10.0,
		uFrequencyMultiplier: 0.2,
		uAlpha: 1.0,
	},
	vertex,
	fragment
)

extend({ RippleShaderMaterial });

export default function Plane({ position, args, isSelected }: IProps) {
  const texture = useLoader(TextureLoader, "/images/projects/2.jpeg")
	const meshRef = useRef<Mesh>()
	const { selectedProjectId } = useProjects()

	function selectedPlaneLeaveAnimation() {
		gsap.set(meshRef.current.material.uniforms.uAmplitude, {
			value: 35.0,
		})
		gsap.set(meshRef.current.material.uniforms.uFrequencyMultiplier, {
			value: 0.7,
		})
		gsap.to(meshRef.current.material.uniforms.uAmplitude, {
			value: 0.0,
			duration: 2,
			onUpdate: () => {
				meshRef.current.material.uniforms.uTime.value += 0.01
			},
		})
		gsap.to(meshRef.current.material.uniforms.uFrequencyMultiplier, {
			value: 0.0,
			duration: 1.5,
		})
		// gsap.to(meshRef.current.position, {
		// 	z: 1,
		// 	duration: 0.9,
		// 	x: 1,
		// 	y: 1,
		// })
		// gsap.to(meshRef.current.scale, {
		// 	duration: 0.5,
		// 	x: 1.5,
		// 	y: 1.5,
		// })
	}

	function notSelectedPlaneLeaveAnimation() {
		gsap.to(meshRef.current.material.uniforms.uAlpha, {
			value: 0.0,
			duration: 0.5,
		})
	}

	useEffect(() => {
		if(isSelected) {
			selectedPlaneLeaveAnimation()
		}
	}, [isSelected])

	return(
		<mesh ref={meshRef} position={position}>
			<CustomPlaneGeometry
				args={args}
				attach="geometry"
			/>
			<rippleShaderMaterial uTexture={texture} />
		</mesh>
	)
}