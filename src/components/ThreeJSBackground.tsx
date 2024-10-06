import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Node({ position }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t + position[0] * 1000) * 0.1;
  });

  return (
    <Sphere ref={ref} position={position} args={[0.05, 16, 16]}>
      <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
    </Sphere>
  );
}

function Connection({ start, end }) {
  const ref = useRef();

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push(new THREE.Vector3(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t + Math.sin(Math.PI * t) * 0.5,
        start[2] + (end[2] - start[2]) * t
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [start, end]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.material.uniforms.dashOffset.value = t * 0.5;
  });

  return (
    <Line
      ref={ref}
      points={curve.getPoints(50)}
      color="#3b82f6"
      lineWidth={1}
      dashed={true}
      dashScale={0.5}
      dashSize={0.5}
      dashOffset={0}
      transparent
      opacity={0.3}
    />
  );
}

function NetworkFlow() {
  const groupRef = useRef();
  const { viewport } = useThree();

  const nodes = useMemo(() => {
    return Array(200).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 20
      ]
    }));
  }, [viewport]);

  const connections = useMemo(() => {
    return Array(150).fill().map(() => ({
      start: nodes[Math.floor(Math.random() * nodes.length)].position,
      end: nodes[Math.floor(Math.random() * nodes.length)].position
    }));
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.3;
    groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Node key={`node-${i}`} {...node} />
      ))}
      {connections.map((connection, i) => (
        <Connection key={`connection-${i}`} {...connection} />
      ))}
    </group>
  );
}

const ThreeJSBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <NetworkFlow />
      </Canvas>
    </div>
  );
};

export default ThreeJSBackground;