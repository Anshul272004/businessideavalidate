import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const GoldArtifact = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.22;
      ringRef.current.rotation.z = t * 0.14;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.18;
      ring2Ref.current.rotation.x = -t * 0.1;
    }
  });

  return (
    <group>
      {/* Core faceted artifact */}
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <MeshDistortMaterial
            color={"#C9A84C"}
            metalness={1}
            roughness={0.18}
            distort={0.18}
            speed={1.1}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>

      {/* Outer hairline ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.012, 16, 200]} />
        <meshStandardMaterial
          color={"#C9A84C"}
          metalness={1}
          roughness={0.25}
          emissive={"#8B6914"}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Second ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.6, 0.008, 16, 200]} />
        <meshStandardMaterial
          color={"#F2D472"}
          metalness={1}
          roughness={0.3}
          emissive={"#8B6914"}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Orbiting markers */}
      {[0, 1, 2].map((i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.3}
          floatIntensity={0.6}
          rotationIntensity={0.4}
        >
          <mesh
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 2.4,
              Math.sin((i * Math.PI * 2) / 3) * 0.6,
              Math.sin((i * Math.PI * 2) / 3) * 1.4,
            ]}
          >
            <sphereGeometry args={[0.05, 24, 24]} />
            <meshStandardMaterial
              color={"#F2D472"}
              emissive={"#C9A84C"}
              emissiveIntensity={1.2}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const CinematicArtifact = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color={"#F2D472"} />
        <pointLight position={[-5, -3, -2]} intensity={0.6} color={"#C9A84C"} />
        <spotLight
          position={[0, 6, 4]}
          angle={0.5}
          penumbra={1}
          intensity={1.4}
          color={"#FFFFFF"}
        />
        <Environment preset="sunset" />
        <GoldArtifact />
      </Suspense>
    </Canvas>
  );
};

export default CinematicArtifact;
