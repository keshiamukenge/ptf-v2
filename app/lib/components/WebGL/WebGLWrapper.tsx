'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react';

interface IProps {
    children: React.ReactNode
}

export default function WebGLWrapper({ children }: IProps) {
    const cameraPositionZ = 700
    
    const cameraOptions = {
        position: [0, 0, cameraPositionZ], // Set the initial position of the camera
        fov: 70, // Set the field of view
        near: 100, // Set the near clipping plane
        far: 2000,
        aspect: window.innerWidth / window.innerHeight,
    }

    return (
        <div className="container-canvas">
            <Canvas camera={cameraOptions}>{children}</Canvas>
        </div>
    )
}