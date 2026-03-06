import * as THREE from "three";

type TextureStyle = "earth" | "rocky" | "venus" | "gas" | "ice" | "moon";

const palettes: Record<TextureStyle, string[]> = {
  earth: ["#0a2c73", "#1256a0", "#1b8ea8", "#52b788", "#f0e0b6"],
  rocky: ["#492f22", "#6f4d38", "#9c6e4b", "#bf8d63", "#dfbd8f"],
  venus: ["#8c4a24", "#c66d38", "#e7a05f", "#f1c781", "#f8e7b8"],
  gas: ["#73523f", "#b07d4d", "#d7a364", "#f2d099", "#f7ead1"],
  ice: ["#155b88", "#2e8cb4", "#6fc6de", "#a6f2ff", "#dff8ff"],
  moon: ["#5f6164", "#888b8f", "#b9b8b4", "#d6d4cf", "#efede5"]
};

function drawBands(ctx: CanvasRenderingContext2D, colors: string[]) {
  for (let index = 0; index < 18; index += 1) {
    ctx.fillStyle = colors[index % colors.length];
    const y = (index / 18) * ctx.canvas.height;
    const height = ctx.canvas.height / 18 + Math.random() * 18;
    ctx.globalAlpha = 0.72;
    ctx.fillRect(0, y, ctx.canvas.width, height);
  }
}

function drawContinents(ctx: CanvasRenderingContext2D) {
  const shapes = [
    [70, 120, 130, 70, 140, 130],
    [190, 70, 260, 100, 230, 170],
    [300, 160, 360, 120, 370, 230]
  ];

  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "#5ac18f";
  shapes.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x2, y2, x3, y3);
    ctx.quadraticCurveTo(x3 - 20, y3 + 28, x1 - 18, y1 + 34);
    ctx.closePath();
    ctx.fill();
  });
}

function drawCrates(ctx: CanvasRenderingContext2D, count: number, alpha = 0.18) {
  ctx.globalAlpha = alpha;
  for (let index = 0; index < count; index += 1) {
    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const radius = 4 + Math.random() * 18;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x - radius * 0.16, y - radius * 0.16, radius * 0.82, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function createProceduralPlanetTexture(style: TextureStyle) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const colors = palettes[style];
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (style === "earth") {
    drawContinents(ctx);
  }

  if (style === "gas" || style === "venus") {
    drawBands(ctx, colors);
  }

  if (style === "rocky" || style === "moon") {
    drawCrates(ctx, style === "moon" ? 46 : 28, style === "moon" ? 0.22 : 0.14);
  }

  if (style === "ice") {
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = "#d9f8ff";
    ctx.lineWidth = 4;
    for (let index = 0; index < 18; index += 1) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.quadraticCurveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
