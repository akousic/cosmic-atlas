"use client";

import { Billboard, Text } from "@react-three/drei";

interface ObjectMarkerProps {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
  active: boolean;
  labelVisible?: boolean;
  opacity?: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

export function ObjectMarker({
  name,
  position,
  color,
  size,
  active,
  labelVisible = true,
  opacity = 1,
  onClick,
  onHover
}: ObjectMarkerProps) {
  return (
    <group position={position}>
      <Billboard follow>
        <mesh
          scale={active ? size * 1.16 : size}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            onHover?.(true);
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            onHover?.(false);
          }}
        >
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={(active ? 1 : 0.85) * opacity} />
        </mesh>
      </Billboard>
      {labelVisible ? (
        <Text
          position={[0, size * 2.6, 0]}
          fontSize={0.68}
          fillOpacity={opacity}
          color={active ? "#ffffff" : "#c5d4ff"}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      ) : null}
    </group>
  );
}
