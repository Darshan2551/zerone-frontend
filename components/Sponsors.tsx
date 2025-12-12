import React from 'react';
import { motion } from 'framer-motion';

const sponsorsList = [
    { name: "TechTitan Industries", tier: "Title Sponsor", color: "from-gold-300 to-gold-600" },
    { name: "CodeForge Systems", tier: "Platinum Partner", color: "from-gray-300 to-gray-500" },
    { name: "PixelPerfect Studios", tier: "Creative Partner", color: "from-orange-400 to-red-600" },
    { name: "CyberGuard Solutions", tier: "Security Partner", color: "from-blue-400 to-indigo-600" }
];

const Sponsors: React.FC = () => {
  return (
    <div className="relative py-32 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-7xl font-display text-gold-500 mb-6 text-shadow-strong">OUR ALLIES</h2>
                <p className="text-gray-400 font-serif tracking-widest uppercase">The Pillars of the Empire</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto perspective-1000">
                {sponsorsList.map((sponsor, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, rotateY: 90 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        whileHover={{ scale: 1.05, rotateX: 5 }}
                        className="relative h-64 bg-[#1a0505] rounded-xl border border-gold-900/30 flex flex-col items-center justify-center overflow-hidden group"
                    >
                        {/* 3D Gloss Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${sponsor.color} mb-6 shadow-lg flex items-center justify-center`}>
                            <span className="text-2xl font-bold text-black font-display">{sponsor.name.charAt(0)}</span>
                        </div>
                        
                        <h3 className="text-2xl font-display text-white mb-2 relative z-10">{sponsor.name}</h3>
                        <span className="text-gold-500/80 font-sans tracking-widest text-sm uppercase border border-gold-900/50 px-3 py-1 rounded-full">
                            {sponsor.tier}
                        </span>

                        {/* Corner Decors */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-700" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-700" />
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Sponsors;