import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500); // Short delay after 100% before unmounting
          return 100;
        }
        return prev + 1; // Increment progress
      });
    }, 20); // Speed of loading

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-gold-500"
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* College Name in Loader for Context */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-gray-400 font-serif text-sm tracking-widest uppercase mb-2">Siddaganga Institute of Technology</h2>
        <h1 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600 tracking-wider">
          ZERONE 3.0
        </h1>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gold-500 shadow-[0_0_10px_#D4A32C]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Percentage Text */}
      <div className="mt-4 font-mono text-gold-400 text-sm">
        {progress}%
      </div>

    </motion.div>
  );
};

export default Loader;