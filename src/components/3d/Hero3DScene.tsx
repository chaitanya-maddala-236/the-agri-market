import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingVegetable, FloatingElement } from './FloatingElements';

export default function Hero3DScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Floating vegetables/elements */}
        <FloatingVegetable position={[-3, 2, 0]} color="#22c55e" />
        <FloatingVegetable position={[3, -2, -2]} color="#ef4444" />
        <FloatingVegetable position={[2, 3, -1]} color="#f59e0b" />
        <FloatingVegetable position={[-2, -3, -3]} color="#8b5cf6" />
        
        <FloatingElement position={[-4, 0, -2]} />
        <FloatingElement position={[4, 1, -3]} />
        <FloatingElement position={[0, -2, -4]} />

        {/* Optional: Add orbit controls for interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
