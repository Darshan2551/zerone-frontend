import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 500 }; 
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Spark particle state
  const [trail, setTrail] = useState<{
      x: number; 
      y: number; 
      id: number; 
      dx: number; 
      dy: number; 
      life: number; 
      color: string 
  }[]>([]);
  const trailIdCounter = useRef(0);
  const prevPos = useRef({ x: 0, y: 0 });

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play "Water Drop" Sound Effect
  const playWaterDropSound = () => {
    try {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Water Drop Logic: Sine wave sweeping down frequency quickly
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

        // Quick attack and release
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
        console.error("Audio error", e);
    }
  };

  useEffect(() => {
    let animationFrame: number;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Calculate speed
      const speedX = Math.abs(e.clientX - prevPos.current.x);
      const speedY = Math.abs(e.clientY - prevPos.current.y);
      const speed = Math.sqrt(speedX * speedX + speedY * speedY);
      prevPos.current = { x: e.clientX, y: e.clientY };

      // Spark Generation: More sparks if moving fast
      // Max 10 sparks per frame to prevent lag, min 1
      const sparkCount = Math.min(Math.floor(speed / 2), 10) + 1;

      for (let i = 0; i < sparkCount; i++) {
        const isGold = Math.random() > 0.3;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2;

        const newDot = { 
            x: e.clientX, 
            y: e.clientY, 
            id: trailIdCounter.current++,
            // Initial burst direction
            dx: (Math.cos(angle) * velocity) + (Math.random() - 0.5), 
            // GRAVITY: Start slightly up or neutral, will increase in update
            dy: (Math.sin(angle) * velocity) - 1, 
            life: 1.0,
            color: isGold ? '#D4A32C' : '#FFFFFF'
        };
        setTrail(prev => [...prev.slice(-80), newDot]); // Keep last 80 particles
      }
    };

    const updateParticles = () => {
        setTrail(prev => prev.map(p => ({
            ...p,
            x: p.x + p.dx, 
            y: p.y + p.dy + 0.2, // Gravity: Add to Y constantly to make them fall down
            dx: p.dx * 0.95, // Air resistance X
            dy: p.dy + 0.15, // Acceleration due to gravity
            life: p.life - 0.02 // Fade out
        })).filter(p => p.life > 0));

        animationFrame = requestAnimationFrame(updateParticles);
    }

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a');
        setIsHovering(!!isInteractive);
    }

    const handleMouseDown = () => {
        setIsClicking(true);
        playWaterDropSound(); // Sound on click
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    animationFrame = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* Falling Sparks Layer */}
      {trail.map((dot) => (
          <div 
            key={dot.id}
            className="fixed rounded-full pointer-events-none z-[9998]"
            style={{ 
                left: dot.x, 
                top: dot.y, 
                width: Math.max(1, dot.life * 3) + 'px',
                height: Math.max(1, dot.life * 3) + 'px',
                backgroundColor: dot.color,
                opacity: dot.life,
                boxShadow: `0 0 ${dot.life * 4}px ${dot.color}`
            }}
          />
      ))}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
          {/* Main Cursor Visual */}
          <motion.div 
            animate={{ 
                scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            }}
            className="relative flex items-center justify-center w-8 h-8"
          >
            {/* Core */}
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#D4A32C]" />
            
            {/* Outer Ring */}
            <div className={`absolute w-full h-full border border-gold-500 rounded-full transition-all duration-300 ${isHovering ? 'scale-125 border-white' : ''}`} />
          </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;