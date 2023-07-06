import { Canvas } from "@react-three/fiber"

interface IProps {
    children: React.ReactNode
}

export default function WebGLWrapper({ children }: IProps) {
    const cameraPositionZ = 700
    
    const cameraOptions = {
        position: [0, 0, cameraPositionZ],
        fov: 70,
        near: 100,
        far: 2000,
        aspect: window.innerWidth / window.innerHeight,
    }

    return (
        <div className="container-canvas">
            <Canvas camera={cameraOptions}>{children}</Canvas>
        </div>
    )
}