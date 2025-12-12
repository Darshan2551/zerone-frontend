import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavProps {
  activeView: string;
  onChangeView: (view: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'roadmap', label: 'Timeline' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onChangeView(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gold-900/50 hidden md:block shadow-lg transition-all duration-300 hover:bg-black/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div 
              className="text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 tracking-widest cursor-pointer hover:scale-105 transition-transform drop-shadow-[0_2px_5px_rgba(212,163,44,0.5)]" 
              onClick={() => handleNavClick('home')}
            >
                ZERONE 3.0
            </div>
            <div className="flex space-x-6">
                {links.map((link) => (
                <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    whileHover={{ scale: 1.1, textShadow: "0 0 10px #D4A32C" }}
                    whileTap={{ scale: 0.95, y: 2 }}
                    className={`relative px-4 py-2 text-xs lg:text-sm font-serif tracking-[0.2em] transition-all duration-200 rounded-md group overflow-hidden ${activeView === link.id ? 'text-gold-400' : 'text-gray-300 hover:text-gold-100'}`}
                >
                    <span className="relative z-10">{link.label.toUpperCase()}</span>
                    
                    {/* Background Glow Pill on Hover */}
                    <motion.div 
                        className="absolute inset-0 bg-gold-900/30 rounded-md z-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Active Indicator Underline */}
                    {activeView === link.id && (
                        <motion.div 
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-500 shadow-[0_0_10px_#D4A32C]" 
                        />
                    )}
                </motion.button>
                ))}
            </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-black/80 border border-gold-600 rounded-full text-gold-400 shadow-[0_0_15px_#D4A32C]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 md:hidden backdrop-blur-xl"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 border-[20px] border-[#1a0505] pointer-events-none" />
            
            {links.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleNavClick(link.id)}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl font-display tracking-widest ${activeView === link.id ? 'text-gold-400 scale-110' : 'text-white'}`}
              >
                {link.label.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;