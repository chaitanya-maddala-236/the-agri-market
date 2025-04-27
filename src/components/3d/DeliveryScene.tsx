
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Mesh, Group } from 'three';

function Truck(props: any) {
  const group = useRef<Group>(null);
  
  // Simple animation
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={group} {...props}>
      {/* Simplified truck mesh since we don't have the actual model */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#5a9e5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.9, -1]}>
        <boxGeometry args={[1.8, 0.8, 2]} />
        <meshStandardMaterial color="#8eb78e" />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.9, -0.5, 1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, -0.5, 1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.9, -0.5, -1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, -0.5, -1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function FloatingBox() {
  const mesh = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2 + 2;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    mesh.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });
  
  return (
    <mesh ref={mesh} position={[0, 2, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f3a23a" />
    </mesh>
  );
}

export default function DeliveryScene() {
  return (
    <div className="h-64 md:h-80 w-full">
      <Canvas shadows camera={{ position: [0, 3, 10], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />
        <Truck position={[0, -1, 0]} scale={0.7} />
        <FloatingBox />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#e0f2e0" />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
