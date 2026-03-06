"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarfieldProps {
  zoom: number;
}

export function Starfield({ zoom }: StarfieldProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(
    () =>
      Array.from({ length: 1400 }, () => ({
        position: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(420),
          THREE.MathUtils.randFloatSpread(260),
          THREE.MathUtils.randFloatSpread(180)
        ),
        scale: Math.random() * 0.22 + 0.05
      })),
    []
  );

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    const densityScale = 0.65 + zoom * 0.9;
    positions.forEach((item, index) => {
      dummy.position.copy(item.position);
      dummy.rotation.y = state.clock.elapsedTime * 0.008;
      dummy.scale.setScalar(item.scale * densityScale);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#d9ecff" transparent opacity={0.9} />
    </instancedMesh>
  );
}
