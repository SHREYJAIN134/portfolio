import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';

// Interactive 3D object behind the intro screen: a wireframe torus knot around a smaller
// icosahedron. It leans toward the pointer, grows as the pointer nears the centre, and gets a
// burst of spin on every press. Loaded lazily (see Preloader), so it costs the page nothing
// until the intro appears.
const Knot: React.FC = () => {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const boost = useRef(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const press = () => {
      boost.current = 6;
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
    };
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    const i = inner.current;
    if (!g || !i) return;
    const { x, y } = pointer.current;

    boost.current = MathUtils.damp(boost.current, 0, 2.5, delta);
    const spin = 0.25 + boost.current;
    g.rotation.y += delta * spin;
    g.rotation.x = MathUtils.damp(g.rotation.x, y * 0.9, 3, delta);
    g.position.x = MathUtils.damp(g.position.x, x * 0.6, 3, delta);
    g.position.y = MathUtils.damp(g.position.y, -y * 0.4, 3, delta);

    const near = 1 - Math.min(1, Math.hypot(x, y));
    const scale = MathUtils.damp(g.scale.x, 1 + near * 0.18, 4, delta);
    g.scale.setScalar(scale);

    i.rotation.y -= delta * (0.5 + boost.current);
    i.rotation.x += delta * 0.3;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.95, 0.26, 140, 18]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.28} />
      </mesh>
      <group ref={inner}>
        <mesh>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
};

const IntroScene: React.FC = () => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 6.2], fov: 50 }}
    gl={{ antialias: true, alpha: true }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <Knot />
  </Canvas>
);

export default IntroScene;
