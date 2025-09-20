import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This is the core component that handles the particle animations.
function AnimatedEmojis({ count, isHappy }) {
  const meshRef = useRef();

  // Set up the emoji sets
  const happyEmojis = useMemo(() => ['🎉', '🎊', '🥳', '✨', '🎈'], []);
  const sadEmojis = useMemo(() => ['😢', '😭', '👎', '💔', '💧'], []);
  const emojiSet = isHappy ? happyEmojis : sadEmojis;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        isHappy ? -5 : 5,
        (Math.random() - 0.5) * 15
      );
      const velocity = new THREE.Vector3(
        0, 0, 0
      );
      const emoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      temp.push({ position, velocity, emoji });
    }
    return temp;
  }, [count, isHappy, emojiSet]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        // Happy animation: Upward explosion
        if (isHappy) {
          if (particle.position.y < 5) {
            particle.velocity.y = (Math.random() * 0.3) + 0.1;
            particle.velocity.x = (Math.random() - 0.5) * 0.3;
            particle.velocity.z = (Math.random() - 0.5) * 0.3;
          } else {
            particle.velocity.y -= 0.005;
          }
        }
        // Sad animation: Simple, slow, downward motion
        else {
          particle.velocity.y = -0.05;
          particle.rotation.z += 0.01;
        }

        // Update position based on velocity
        particle.position.add(particle.velocity);

        // Reset particle if it goes off-screen
        if (isHappy && particle.position.y > 10 || !isHappy && particle.position.y < -5) {
          particle.position.y = isHappy ? -5 : 5;
          particle.position.x = (Math.random() - 0.5) * 15;
          particle.position.z = (Math.random() - 0.5) * 15;
          particle.velocity.set(0, 0, 0);
        }

        // We use a dummy object to set the position and rotation for each instance
        const dummy = new THREE.Object3D();
        dummy.position.copy(particle.position);
        dummy.rotation.set(
          state.clock.getElapsedTime(),
          state.clock.getElapsedTime(),
          state.clock.getElapsedTime()
        );
        dummy.scale.setScalar(0.4);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial metalness={0.9} roughness={0.1} />
    </instancedMesh>
  );
}

// Main overlay component that sets the scene
export default function AnimationOverlay({ type }) {
  const isHappy = type === 'happy';

  // Define mood-specific lights and colors
  const lightColor = isHappy ? '#FFD700' : '#4169E1';
  const ambientLightIntensity = isHappy ? 0.7 : 0.3;

  return (
    <div className="animation-overlay-3d">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={ambientLightIntensity} />
        <spotLight position={[5, 5, 5]} intensity={1.5} color={lightColor} />
        <pointLight position={[-10, -10, -10]} intensity={1} color={lightColor} />

        {/* Render the animated emojis */}
        <AnimatedEmojis count={isHappy ? 150 : 75} isHappy={isHappy} />
      </Canvas>
    </div>
  );
}