import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE } from '../constants';

const Roadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Opacity/Color Shifts based on time of day in timeline
  // 0.0 - 0.3: Morning (Mist/Blue-Gold, Sun Rising)
  // 0.3 - 0.7: Noon (Bright Gold/Orange, Sun High)
  // 0.7 - 1.0: Evening (Red/Purple/Dark, Moon & Stars)

  const morningOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const noonOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const eveningOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  // Celestial Objects Movement
  // Sun moves from bottom left to top center
  const sunY = useTransform(scrollYProgress, [0, 0.5], ['50%', '-20%']);
  const sunX = useTransform(scrollYProgress, [0, 0.5], ['10%', '50%']);
  
  // Moon moves from bottom right to top center
  const moonY = useTransform(scrollYProgress, [0.6, 1], ['50%', '10%']);
  const moonX = useTransform(scrollYProgress, [0.6, 1], ['90%', '50%']);

  // Parallax Background Elements
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const perspectiveRotate = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Update last event time for display
  const displayTimeline = [...TIMELINE];
  if(displayTimeline.length > 0) {
      displayTimeline[displayTimeline.length - 1] = {
          ...displayTimeline[displayTimeline.length - 1],
          time: '05:30 PM - 06:30 PM',
          title: 'The Final Decree',
          description: 'Valedictory & Victory Ceremony'
      };
  }

  return (
    <div id="roadmap" ref={containerRef} className="relative py-32 px-4 overflow-hidden min-h-[200vh] perspective-2000 bg-black transition-colors duration-1000">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
          {/* MORNING LAYER (Sun Rising) */}
          <motion.div 
            style={{ opacity: morningOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-orange-900 via-blue-900/60 to-black z-0"
          />
          {/* Sun Element */}
          <motion.div 
             style={{ opacity: morningOpacity, top: sunY, left: sunX, x: '-50%' }}
             className="absolute w-40 h-40 bg-gradient-to-r from-orange-400 to-gold-300 rounded-full blur-[40px] shadow-[0_0_100px_#f97316]"
          />


          {/* NOON LAYER (High Sun) */}
          <motion.div 
            style={{ opacity: noonOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-gold-200/10 to-black z-0"
          />
           <motion.div 
             style={{ opacity: noonOpacity, top: '5%', left: '50%', x: '-50%' }}
             className="absolute w-[600px] h-[600px] bg-gold-100/20 rounded-full blur-[100px]"
          />


          {/* EVENING/NIGHT LAYER (Moon & Stars) */}
          <motion.div 
            style={{ opacity: eveningOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-[#05010a] via-[#1a0515] to-black z-0"
          />
           {/* Stars */}
           <motion.div style={{ opacity: eveningOpacity }} className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 5 + 's',
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                    />
                ))}
           </motion.div>
           {/* Moon Element */}
           <motion.div 
             style={{ opacity: eveningOpacity, top: moonY, left: moonX, x: '-50%' }}
             className="absolute w-32 h-32 bg-gray-200 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.5)] overflow-hidden"
          >
              <div className="absolute top-2 left-4 w-6 h-6 bg-gray-300 rounded-full opacity-50" />
              <div className="absolute bottom-8 right-6 w-10 h-10 bg-gray-300 rounded-full opacity-30" />
          </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto transform-style-3d">
        <div className="text-center mb-32 relative">
           <motion.div
             style={{ rotateX: perspectiveRotate }}
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
           >
             <h2 className="text-5xl md:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-800 mb-6 text-shadow-strong drop-shadow-2xl">
                 THE SAGA
             </h2>
             <p className="text-gold-200/60 font-serif tracking-[0.5em] text-sm md:text-lg uppercase">Journey Through the Ages</p>
           </motion.div>
        </div>

        <div className="relative">
             {/* Central Line - Glowing Beam */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gold-900/30 rounded-full" />
            <motion.div 
                style={{ height: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]) }}
                className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-gold-400 via-gold-100 to-gold-500 origin-top shadow-[0_0_30px_#D4A32C] rounded-full z-0" 
            />

            {displayTimeline.map((item, index) => {
                 const isLeft = index % 2 === 0;
                 return (
                    <TimelineCard key={index} item={item} isLeft={isLeft} index={index} />
                 );
            })}
        </div>
      </div>
    </div>
  );
};

const TimelineCard: React.FC<{ item: any, isLeft: boolean, index: number }> = ({ item, isLeft, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -150 : 150, z: -100, rotateY: isLeft ? 45 : -45 }}
            whileInView={{ opacity: 1, x: 0, z: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.3, delay: 0.1 }}
            className={`flex items-center justify-between mb-32 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            style={{ perspective: 1000 }}
        >
            {/* Content Box */}
            <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                <motion.div 
                    whileHover={{ scale: 1.05, rotateX: 5 }}
                    className="group relative bg-[#0f0404]/90 backdrop-blur-md border border-gold-900/50 p-8 rounded-xl hover:border-gold-500/80 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                >
                    {/* Glowing Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-600 opacity-50 group-hover:opacity-100 transition-opacity" />

                    {/* 3D Floating Index */}
                    <div className={`absolute -top-8 ${isLeft ? '-left-8' : '-right-8'} text-gold-500/10 font-display text-8xl -z-10 group-hover:text-gold-500/20 transition-colors transform group-hover:translate-z-10`}>
                        {index + 1}
                    </div>

                    <h3 className="relative text-2xl md:text-4xl font-display text-gold-100 mb-3 group-hover:text-gold-400 transition-colors">{item.title}</h3>
                    <p className="relative text-gray-400 font-sans text-lg tracking-wide">{item.description}</p>
                </motion.div>
            </div>

            {/* Center Orb - Portal Style */}
            <div className="w-2/12 flex justify-center relative z-10">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="relative w-12 h-12 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-gold-600 rounded-full blur-md opacity-50 animate-pulse" />
                    <div className="relative w-4 h-4 bg-gold-100 rounded-full shadow-[0_0_20px_#D4A32C] z-20" />
                    {/* Orbiting Ring */}
                    <div className="absolute w-full h-full border border-gold-400 rounded-full animate-spin-slow" />
                </motion.div>
            </div>

            {/* Time Box */}
            <div className={`w-5/12 ${isLeft ? 'text-left' : 'text-right'}`}>
                <span className="text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-300 opacity-80 drop-shadow-lg block hover:scale-105 transition-transform origin-left">
                    {item.time.split(' - ')[0]}
                </span>
            </div>
        </motion.div>
    );
}

export default Roadmap;