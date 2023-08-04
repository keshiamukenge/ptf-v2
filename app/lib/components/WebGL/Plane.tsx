'use client'

import { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { useLoader, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { PlaneGeometry, Mesh } from 'three';

import { useScroll } from '../../hooks/useScroll'
import { fragment } from './Gallery/fragmentShader'
import { vertex } from './Gallery/vertexShader'

interface IProps {
	position: [number, number, number];
	args: [number, number, number, number];
	isSelected: boolean;
	imageUrl: string;
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

export default function Plane({ position, args, isSelected, imageUrl }: IProps) {
  const texture = useLoader(TextureLoader, imageUrl)
	const meshRef = useRef<Mesh>(null)
	const scroll = useScroll()

	function startWaveAnimation() {
		if(!meshRef.current) return

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
				if(!meshRef.current) return

				meshRef.current.material.uniforms.uTime.value += 0.01
			},
		})
		gsap.to(meshRef.current.material.uniforms.uFrequencyMultiplier, {
			value: 0.0,
			duration: 1.5,
		})
	}

	useEffect(() => {
		if (isSelected) {
			startWaveAnimation()
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