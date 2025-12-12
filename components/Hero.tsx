import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Download, ChevronRight, Calendar } from 'lucide-react';

export const Hero: React.FC<{ onChangeView: (view: string) => void }> = ({ onChangeView }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { scrollY } = useScroll();
  
  const titleY = useTransform(scrollY, [0, 500], [0, 150]); 
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.8]); 

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const ringsX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const ringsY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // Set Date to Dec 24, 2025
    const targetDate = new Date('2025-12-24T09:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadBrochure = (e: React.MouseEvent) => {
      e.preventDefault();
      alert("Brochure download started!");
  };

  return (
    <div 
        className="w-full overflow-hidden perspective-1000"
        onMouseMove={handleMouseMove}
    >
        {/* Full Screen Hero Section */}
        <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent overflow-hidden">
        
        {/* 3D Rotating Rings Background with Parallax */}
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-900/10 pointer-events-none"
            animate={{ rotate: 360 }}
            style={{ 
                x: ringsX, 
                y: ringsY,
                perspective: 1000 
            }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
            <div className="absolute inset-0 rounded-full border-t-[3px] border-gold-500/20 transform rotate-45" />
            <div className="absolute inset-20 rounded-full border-b-[3px] border-red-900/30 transform -rotate-45" />
            <div className="absolute inset-40 rounded-full border-l-[3px] border-gold-300/10 transform rotate-12" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
            style={{ y: titleY, opacity: contentOpacity }}
            className="relative z-10 text-center px-4 w-full max-w-6xl flex flex-col items-center justify-center pt-20"
        >
            
            {/* Top Organization Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 flex flex-col items-center justify-center"
            >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-black/80 backdrop-blur-md px-8 py-4 rounded-xl border border-gold-600/50 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                     <div className="bg-white p-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                         <img 
                            src="https://img.collegepravesh.com/2018/10/SIT-Tumkur-Logo.png" 
                            alt="SIT Logo" 
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                        />
                     </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-serif text-lg md:text-2xl font-bold tracking-wide leading-tight drop-shadow-md">
                            SIDDAGANGA INSTITUTE OF TECHNOLOGY
                        </h3>
                         <p className="text-gold-400 font-sans text-sm md:text-base uppercase tracking-[0.2em] font-bold mt-1">
                            Organized by Dept. of MCA
                        </p>
                    </div>
                </div>
            </motion.div>

             {/* Presented By */}
             <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.3, duration: 0.8 }}
                 className="mb-2"
             >
                <span className="text-gold-400/80 font-display text-base md:text-xl tracking-[0.3em] uppercase border-b border-gold-800/50 pb-1">
                    Presented by Pied Pipers
                </span>
             </motion.div>

            {/* EPIC MAIN TITLE */}
            <div className="relative py-2 md:py-6 perspective-1000 group cursor-default w-full">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
                    className="relative z-10 text-6xl md:text-[9rem] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffecb3] via-[#d4a32c] to-[#5c4005] drop-shadow-2xl"
                    style={{
                        textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 50px rgba(212, 163, 44, 0.3)',
                        WebkitTextStroke: '2px rgba(138, 110, 40, 0.3)'
                    }}
                >
                    ZERONE 3.0
                </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div animate={{ x: [-5, 0, -5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-2xl hidden md:block">✦</motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl md:text-6xl font-serif text-white tracking-[0.2em] uppercase"
                    style={{ textShadow: '0 0 20px rgba(212, 163, 44, 0.6)' }}
                >
                    YUGA
                </motion.h2>
                <motion.div animate={{ x: [5, 0, 5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-2xl hidden md:block">✦</motion.div>
            </div>
            
            <p className="text-gold-200/60 font-sans tracking-[0.5em] text-xs md:text-lg mb-8 uppercase bg-black/60 backdrop-blur-sm px-6 py-2 rounded border border-gold-900/30">The Age of Digital Empires</p>

            {/* Date Display */}
            <div className="flex items-center gap-3 bg-black/80 border-2 border-gold-600 px-8 py-4 rounded-lg mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(212,163,44,0.2)]">
                 <Calendar className="text-gold-400 w-6 h-6" />
                 <span className="text-gold-100 font-serif text-2xl tracking-widest border-r border-gold-600/50 pr-4 mr-1">DEC 24</span>
                 <span className="text-gold-400 font-sans text-xl">2025</span>
            </div>

            {/* Countdown */}
            <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-12 font-serif text-gold-300">
            {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="relative group">
                        <span className="text-xl md:text-4xl font-bold border border-gold-800 bg-black/80 px-4 py-3 rounded backdrop-blur-md min-w-[70px] inline-block text-center shadow-[0_0_15px_rgba(212,163,44,0.3)] border-b-4 border-b-gold-600">
                            {String(item.val).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[10px] mt-2 uppercase tracking-widest text-gold-500 font-sans font-bold">{item.label}</span>
                </div>
            ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212,163,44,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChangeView('events')}
                    className="relative px-10 py-5 w-full md:w-auto bg-gradient-to-r from-gold-900 to-black border-2 border-gold-500 text-white font-bold font-serif tracking-widest text-lg group overflow-hidden shadow-[0_0_20px_rgba(212,163,44,0.3)] rounded-sm"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        ENTER THE ARENA <ChevronRight className="w-6 h-6 text-gold-400 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0 opacity-80" />
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadBrochure}
                    className="relative px-10 py-5 w-full md:w-auto bg-black/60 border border-white/30 text-gold-100 font-sans tracking-widest text-sm flex items-center justify-center gap-3 hover:border-gold-400 hover:text-gold-400 transition-all uppercase rounded-sm backdrop-blur-md"
                >
                    <Download className="w-5 h-5" />
                    Get Decree (Brochure)
                </motion.button>
            </div>
        </motion.div>
        
        </div>
    </div>
  );
};