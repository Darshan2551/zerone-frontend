import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import { Hero } from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Roadmap from './components/Roadmap';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-gold-900 selection:text-gold-100">
      <CustomCursor />
      
      {/* Loader only shows once initially */}
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}
      
      {!loading && (
        <div className="animate-fade-in relative min-h-screen flex flex-col">
          <Background />
          <Navigation activeView={currentView} onChangeView={handleViewChange} />
          
          <main className="flex-grow relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {/* HOME PAGE: Combines Hero, Highlights, Events Preview, Roadmap Preview */}
                    {currentView === 'home' && (
                        <>
                            <Hero onChangeView={handleViewChange} />
                            <About />
                            <Events />
                            <Roadmap />
                        </>
                    )}

                    {/* DEDICATED PAGES */}
                    {currentView === 'about' && <About />}
                    {currentView === 'events' && <Events />}
                    {currentView === 'roadmap' && <Roadmap />}
                    {currentView === 'sponsors' && <Sponsors />}
                    {currentView === 'contact' && <Contact />}
                </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;