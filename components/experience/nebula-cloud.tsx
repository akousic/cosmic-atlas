"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface NebulaCloudProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  opacity?: number;
}

export function NebulaCloud({ position, scale = 18, color, opacity = 0.18 }: NebulaCloudProps) {
  const sprite = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.18, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [color]);

  if (!sprite) {
    return null;
  }

  return (
    <sprite position={position} scale={[scale, scale, scale]}>
      <spriteMaterial map={sprite} transparent opacity={opacity} depthWrite={false} />
    </sprite>
  );
}
