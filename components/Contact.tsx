import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Award, Shield } from 'lucide-react';
import { EVENTS, FACULTY_COORDINATORS, STUDENT_COORDINATORS } from '../constants';

const Contact: React.FC = () => {
    
  // Function to get a deterministic random image based on index/name to avoid all looking the same
  const getAvatar = (seed: string) => {
      const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
      const gender = hash % 2 === 0 ? 'men' : 'women';
      const id = hash % 50; // 50 different images
      return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  };

  return (
    <div id="contact" className="relative pt-32 pb-12 px-6 bg-[#050101] min-h-screen">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
            style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")', 
                backgroundSize: 'auto' 
            }} 
        />

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-display text-gold-500 mb-6 text-shadow-gold">THE COUNCIL</h2>
                <p className="text-gray-400 font-serif tracking-[0.2em] uppercase">Keepers of the Code</p>
            </motion.div>

            {/* Event Specific Coordinators */}
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gold-800 flex-grow" />
                    <h3 className="text-xl md:text-2xl font-serif text-white uppercase tracking-widest text-center px-4 border border-gold-800 py-2 rounded">Battalion Commanders</h3>
                    <div className="h-px bg-gold-800 flex-grow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event, idx) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-[#0f0404] border border-gold-900/40 hover:border-gold-500/50 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,163,44,0.1)] flex flex-col"
                        >
                            {/* Card Header with Image Background Hint */}
                            <div className="relative h-20 overflow-hidden border-b border-gold-900/30">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0404] to-transparent" />
                                <div className="absolute bottom-2 left-4 flex items-center gap-2">
                                     <Award className="text-gold-500 w-5 h-5" />
                                     <h4 className="font-display text-gold-200 text-lg tracking-wide">{event.title}</h4>
                                </div>
                            </div>
                            
                            {/* Coordinators List */}
                            <div className="p-4 space-y-4">
                                {event.coordinators.map((coord, cIdx) => (
                                    <div key={cIdx} className="flex items-center gap-3 group/coord">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full border border-gold-700 overflow-hidden shrink-0">
                                            <img 
                                                src={getAvatar(coord.name)} 
                                                alt={coord.name} 
                                                className="w-full h-full object-cover opacity-80 group-hover/coord:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        
                                        <div className="flex-grow min-w-0">
                                            <p className="text-white font-serif text-sm truncate">{coord.name}</p>
                                            <a 
                                                href={`tel:${coord.phone}`} 
                                                className="flex items-center gap-2 text-gray-500 hover:text-gold-400 transition-colors text-xs font-mono mt-0.5"
                                            >
                                                <Phone className="w-3 h-3" />
                                                {coord.phone}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* General Coordinators Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                
                {/* Student Coordinators */}
                <div className="bg-[#1a0505]/50 p-8 rounded-lg border border-gold-900/30 backdrop-blur-sm relative overflow-hidden">
                     <h3 className="text-xl font-display text-gold-400 mb-8 flex items-center gap-3 border-b border-gold-900/50 pb-4">
                        <Shield className="w-6 h-6" /> Student Coordinators
                     </h3>
                     <div className="space-y-6">
                        {STUDENT_COORDINATORS.map((student, idx) => (
                            <div key={idx} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                     <div className="w-16 h-16 rounded-full border-2 border-gold-600 overflow-hidden shrink-0">
                                        <img 
                                            src={getAvatar(student.name)} 
                                            alt={student.name} 
                                            className="w-full h-full object-cover"
                                        />
                                     </div>
                                     <div>
                                        <div className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors">{student.name}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">General Secretary</div>
                                     </div>
                                </div>
                                <a href={`tel:${student.phone}`} className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-black transition-all">
                                    <Phone className="w-5 h-5" />
                                </a>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Faculty Coordinators */}
                <div className="bg-[#1a0505]/50 p-8 rounded-lg border border-gold-900/30 backdrop-blur-sm relative overflow-hidden">
                     <h3 className="text-xl font-display text-gold-400 mb-8 flex items-center gap-3 border-b border-gold-900/50 pb-4">
                        <Award className="w-6 h-6" /> ROYAL ADVISORS (FACULTY)
                     </h3>
                     <div className="space-y-6">
                        {FACULTY_COORDINATORS.map((faculty, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-16 h-16 rounded-full border-2 border-gold-800 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                     <img 
                                        src={getAvatar(faculty.name)} 
                                        alt={faculty.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-xl font-serif text-white">{faculty.name}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Faculty Coordinator</div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full h-80 rounded-lg overflow-hidden border border-gold-800/50 mb-12 shadow-2xl relative group">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.686566817653!2d77.12398531530962!3d13.307525211913168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02c6b8e4b7b2b%3A0x6b8e4b7b2b6b8e4b!2sSiddaganga%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} 
                    allowFullScreen 
                    loading="lazy" 
                    title="SIT Map"
                    className="group-hover:filter-none transition-all duration-700"
                ></iframe>
                <div className="absolute top-4 left-4 bg-black/80 p-3 rounded border border-gold-500">
                    <div className="flex items-center gap-2 text-gold-400 font-bold font-sans">
                        <MapPin className="w-4 h-4" /> SIT TUMKUR
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gold-900/30 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2025 ZERONE 3.0. Forged in Code.</p>
            </div>
        </div>
    </div>
  );
};

export default Contact;