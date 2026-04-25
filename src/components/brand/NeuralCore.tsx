import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * NeuralCore — wireframe icosahedron + glowing core + animated synapse particles.
 * Used as the centerpiece of the Loading "analysis chamber".
 */

const Wireframe = () => {
  const ref = useRef<THREE.LineSegments>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.2;
  });
  const geom = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.6, 1);
    return new THREE.EdgesGeometry(ico);
  }, []);
  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color="#C9A84C" transparent opacity={0.55} />
    </lineSegments>
  );
};

const Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.6) * 0.05;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshStandardMaterial
        color="#F2D472"
        emissive="#C9A84C"
        emissiveIntensity={1.6}
        metalness={1}
        roughness={0.15}
      />
    </mesh>
  );
};

const Synapses = ({ count = 80 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions: arr };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(t * 2) * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F2D472"
        size={0.045}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[4, 4, 4]} intensity={1.4} color="#F2D472" />
    <pointLight position={[-4, -2, -2]} intensity={0.7} color="#C9A84C" />
    <Wireframe />
    <Core />
    <Synapses />
  </>
);

interface NeuralCoreProps {
  className?: string;
}

const NeuralCore = ({ className }: NeuralCoreProps) => (
  <div className={className} style={{ width: "100%", height: "100%" }}>
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  </div>
);

export default NeuralCore;
