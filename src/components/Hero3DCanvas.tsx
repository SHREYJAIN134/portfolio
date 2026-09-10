import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  color: string;
}

export const Hero3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = width < 768;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse and Touch interaction tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const updateCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = clientX - rect.left;
      targetMouseY = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    // Adaptive Particle Count for Mobile GPUs
    const particleCount = isMobile ? 35 : 75;
    const particles: Particle[] = [];
    const colors = ['#00f0ff', '#a855f7', '#3b82f6', '#10b981'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 400 - 200,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        vz: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // 3D Geometric Ring Nodes
    let rotationAngleX = 0;
    let rotationAngleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse/touch interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Slow ambient rotation
      rotationAngleX += 0.002;
      rotationAngleY += 0.003;

      // Draw background ambient light orb
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.6
      );
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.07)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.03)');
      gradient.addColorStop(1, 'rgba(7, 7, 10, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Wireframe Polyhedron Mesh in Center
      ctx.save();
      ctx.translate(centerX, centerY);
      const meshSize = Math.min(width, height) * (isMobile ? 0.28 : 0.22);
      const vertices = [
        { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
        { x: 0, y: -1.6, z: 0 }, { x: 0, y: 1.6, z: 0 },
      ];

      // Mouse/Touch influence on rotation
      const mouseRotX = (mouseY - centerY) * 0.0003;
      const mouseRotY = (mouseX - centerX) * 0.0003;
      const currentRotX = rotationAngleX + mouseRotX;
      const currentRotY = rotationAngleY + mouseRotY;

      // Project vertices to 2D
      const projected = vertices.map(v => {
        let x1 = v.x * Math.cos(currentRotY) - v.z * Math.sin(currentRotY);
        let z1 = v.x * Math.sin(currentRotY) + v.z * Math.cos(currentRotY);
        let y2 = v.y * Math.cos(currentRotX) - z1 * Math.sin(currentRotX);
        let z2 = v.y * Math.sin(currentRotX) + z1 * Math.cos(currentRotX);

        const fov = 400;
        const scale = fov / (fov + z2 * meshSize);
        return {
          x: x1 * meshSize * scale,
          y: y2 * meshSize * scale,
          z: z2,
          scale,
        };
      });

      const edges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7],
        [8,0],[8,1],[8,4],[8,5],
        [9,2],[9,3],[9,6],[9,7],
      ];

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1.2;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Render projected mesh vertices
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.z < 0 ? '#00f0ff' : '#a855f7';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      // Render particles
      const connectionDist = isMobile ? 90 : 130;
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -width / 2 || p.x > width / 2) p.vx *= -1;
        if (p.y < -height / 2 || p.y > height / 2) p.vy *= -1;
        if (p.z < -200 || p.z > 200) p.vz *= -1;

        const fov = 350;
        const scale = fov / (fov + p.z);
        const px = centerX + p.x * scale;
        const py = centerY + p.y * scale;

        ctx.beginPath();
        ctx.arc(px, py, p.baseRadius * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, scale * 0.7));
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const p2x = centerX + p2.x * (fov / (fov + p2.z));
            const p2y = centerY + p2.y * (fov / (fov + p2.z));
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / connectionDist) * 0.15;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-80"
    />
  );
};
