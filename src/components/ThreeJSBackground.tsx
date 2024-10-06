// Updated ThreeJSBackground.js

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { SmallNetworkComponent } from './SmallNetworkComponent';

function Node({ position }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y =
      position[1] + Math.sin(t + position[0] * 1000) * 0.1;
  });

  return (
    <Sphere ref={ref} position={position} args={[0.05, 16, 16]}>
      <meshBasicMaterial color="#50fa7b" transparent opacity={0.6} />
    </Sphere>
  );
}

function Connection({ start, end }) {
  const ref = useRef();

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push(
        new THREE.Vector3(
          start[0] + (end[0] - start[0]) * t,
          start[1] + (end[1] - start[1]) * t + Math.sin(Math.PI * t) * 0.5,
          start[2] + (end[2] - start[2]) * t
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, [start, end]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current.material.uniforms) {
      ref.current.material.uniforms.dashOffset.value = t * 0.5;
    }
  });

  return (
    <Line
      ref={ref}
      points={curve.getPoints(50)}
      color="#6272a4"
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
    return Array(200)
      .fill()
      .map(() => ({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * 20,
        ],
      }));
  }, [viewport]);

  const connections = useMemo(() => {
    return Array(150)
      .fill()
      .map(() => ({
        start: nodes[Math.floor(Math.random() * nodes.length)].position,
        end: nodes[Math.floor(Math.random() * nodes.length)].position,
      }));
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.3;
    groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Existing Nodes and Connections */}
      {nodes.map((node, i) => (
        <Node key={`node-${i}`} {...node} />
      ))}
      {connections.map((connection, i) => (
        <Connection key={`connection-${i}`} {...connection} />
      ))}

      {/* Small Network Components with Glowing, Pulsating Lines */}
      <SmallNetworkComponent
        size={2}
        color="#ff79c6"
        position={[-viewport.width * 0.7, viewport.height * 0.5, 0]}
      />
      <SmallNetworkComponent
        size={2}
        color="#8be9fd"
        position={[-viewport.width * 0.5, -viewport.height * 0.3, 0]}
      />
      <SmallNetworkComponent
        size={2}
        color="#bd93f9"
        position={[viewport.width * 0.4, viewport.height * 0.4, 0]}
      />
    </group>
  );
}

const ThreeJSBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#1a1a1a'), 1);
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NetworkFlow />
      </Canvas>
    </div>
  );
};

export default ThreeJSBackground;
