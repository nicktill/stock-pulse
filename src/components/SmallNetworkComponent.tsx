import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function SmallNetworkComponent({
  size = 2,
  color = '#4ade80',
  position = [0, 0, 0],
}) {
  const groupRef = useRef();

  // Generate nodes
  const nodes = useMemo(() => {
    return Array(20)
      .fill()
      .map(() => ({
        position: [
          position[0] + (Math.random() - 0.5) * size,
          position[1] + (Math.random() - 0.5) * size,
          position[2] + (Math.random() - 0.5) * size,
        ],
      }));
  }, [size, position]);

  // Generate connections
  const connections = useMemo(() => {
    return Array(15)
      .fill()
      .map(() => {
        const startNode = nodes[Math.floor(Math.random() * nodes.length)].position;
        const endNode = nodes[Math.floor(Math.random() * nodes.length)].position;

        const points = [];
        for (let j = 0; j <= 20; j++) {
          const t = j / 20;
          points.push(
            new THREE.Vector3(
              startNode[0] + (endNode[0] - startNode[0]) * t,
              startNode[1] +
                (endNode[1] - startNode[1]) * t +
                Math.sin(Math.PI * t) * 0.1,
              startNode[2] + (endNode[2] - startNode[2]) * t
            )
          );
        }

        return {
          points,
        };
      });
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes with pulsing effect */}
      {nodes.map((node, i) => {
        const nodeRef = useRef();

        useFrame(({ clock }) => {
          const t = clock.getElapsedTime();
          nodeRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.5;
        });

        return (
          <Sphere
            key={`node-${i}`}
            ref={nodeRef}
            position={node.position}
            args={[0.05, 16, 16]}
          >
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              metalness={0.5}
              roughness={0.1}
            />
          </Sphere>
        );
      })}

      {/* Connections with glowing, pulsating effect */}
      {connections.map((connection, i) => {
        const lineRef = useRef();

        const positions = connection.points.map((point) => point.toArray()).flat();

        const geometry = useMemo(() => {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
          );
          return geo;
        }, [positions]);

        const material = useMemo(
          () =>
            new THREE.ShaderMaterial({
              uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(color) },
              },
              vertexShader: `
                varying vec3 vPosition;
                void main() {
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec3 vPosition;
                void main() {
                  float glow = sin(length(vPosition) * 10.0 - time * 5.0) * 0.5 + 0.5;
                  gl_FragColor = vec4(color * glow, glow);
                }
              `,
              transparent: true,
              depthWrite: false,
            }),
          [color]
        );

        useFrame(({ clock }) => {
          const t = clock.getElapsedTime();
          material.uniforms.time.value = t;
        });

        return (
          <line
            key={`connection-${i}`}
            ref={lineRef}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
}
