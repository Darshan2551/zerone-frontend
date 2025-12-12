import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EVENTS } from '../constants';
import { EventDetails } from '../types';
import EventModal from './EventModal';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -350 : 350;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div id="events" className="relative py-24 px-4 md:px-12 max-w-[100vw] overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="text-center mb-12">
         <h2 className="text-4xl md:text-6xl font-display text-gold-500 mb-4 text-shadow-gold">THE BATTLEFIELDS</h2>
         <p className="text-gray-400 font-serif tracking-widest uppercase">Swipe to Choose Your Arena</p>
      </div>

      {/* Swipe Controls (Desktop) */}
      <div className="hidden md:flex justify-end gap-4 max-w-7xl mx-auto w-full mb-4 px-4">
          <button onClick={() => scroll('left')} className="p-2 border border-gold-700 rounded-full hover:bg-gold-900/50 text-gold-400"><ChevronLeft/></button>
          <button onClick={() => scroll('right')} className="p-2 border border-gold-700 rounded-full hover:bg-gold-900/50 text-gold-400"><ChevronRight/></button>
      </div>

      {/* Horizontal Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 py-8 px-4 md:px-12 snap-x snap-mandatory hide-scrollbar pb-16 touch-pan-x"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {EVENTS.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
        ))}
        {/* Spacer for end of scroll */}
        <div className="w-1 flex-shrink-0" />
      </div>

      <EventModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
      
      {/* Mobile Swipe Hint */}
      <div className="md:hidden text-center text-gray-600 text-xs uppercase tracking-widest mt-4 animate-pulse">
          Swipe to explore
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: EventDetails, index: number, onClick: () => void }> = ({ event, index, onClick }) => {
    // Parallax logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Snappier spring configuration for responsiveness
    const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
    
    // Increased tilt range for more dramatic 3D effect
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
    
    // Deep parallax: Image moves significantly opposite to mouse
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25%", "25%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-25%", "25%"]);

    // Subtle counter-movement for content to make it float "above" the background
    const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["8px", "-8px"]);
    const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["8px", "-8px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layoutId={`card-${event.id}`}
            onClick={onClick}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className="flex-shrink-0 w-[85vw] md:w-[400px] h-[500px] snap-center relative cursor-pointer group perspective-1000"
          >
             {/* Card Content */}
             <motion.div 
                className="w-full h-full relative bg-[#0f0404] border border-gold-900/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-gold-500 group-hover:shadow-[0_0_40px_rgba(212,163,44,0.3)] shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
             >
                
                {/* Background Image with Deep Parallax */}
                <motion.div 
                    className="absolute inset-[-50px] object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                    style={{ 
                        x: imageX, 
                        y: imageY, 
                        scale: 1.35 
                    }}
                >
                    <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover" 
                    />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" style={{ transform: "translateZ(1px)" }} />

                {/* Info Layer - Floating */}
                <motion.div 
                    className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full pointer-events-none"
                    style={{ 
                        x: contentX,
                        y: contentY,
                        transform: "translateZ(40px)" 
                    }}
                >
                    <div className="mb-auto pt-4">
                         <div className="text-xs font-sans text-gold-400 mb-2 uppercase tracking-widest bg-black/60 w-max px-3 py-1 rounded-full border border-gold-900/50 backdrop-blur-md shadow-lg">
                            {event.category}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-display text-white mb-2 group-hover:text-gold-200 transition-colors drop-shadow-md">{event.title}</h3>
                        <p className="text-gray-300 text-sm font-serif italic mb-6 opacity-80">{event.subtitle}</p>
                        
                        <div className="flex justify-between items-center border-t border-white/20 pt-4">
                            <div>
                                <div className="text-xs text-gold-500 uppercase tracking-wider">Prize Pool</div>
                                <div className="text-xl font-bold text-white">{event.prizePool}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                                <ChevronRight />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
          </motion.div>
    );
};

export default Events;