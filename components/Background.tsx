import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle System (Golden Ash / Embers)
    const particles: { x: number; y: number; size: number; speed: number; opacity: number; sway: number, dx: number, dy: number }[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5, 
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        sway: Math.random() * 0.05 - 0.025,
        dx: 0,
        dy: 0
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Particles
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.sway; 

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 163, 44, ${p.opacity})`; 
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#1a1500]">
      
      {/* EPIC VISIBLE BACKGROUND IMAGE (Ancient Palace/Fortress) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1599581878070-5b6d2e6161e7?q=80&w=2070&auto=format&fit=crop")`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35 // Higher opacity so it's not black
        }} 
      />

      {/* Warm Gradient Overlay (Instead of black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#3d1e05]/30 to-black/80" />
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
           style={{ 
               backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")`, 
               backgroundSize: '120px'
           }} 
      />

      {/* Floating Light Spirits */}
      <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
             <motion.div 
                key={i}
                animate={{ 
                    y: [0, -800], 
                    opacity: [0, 0.6, 0],
                }}
                transition={{ 
                    duration: Math.random() * 20 + 15, 
                    repeat: Infinity, 
                    ease: "linear"
                }}
                className="absolute rounded-full bg-gold-400 blur-[20px]"
                style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 50 + 100}%`,
                    width: '40px',
                    height: '40px'
                }}
             />
          ))}
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
    </div>
  );
};

export default Background;