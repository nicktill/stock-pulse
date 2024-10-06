import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Logo from './Logo';

const phrases = [
  'institutional investors',
  'hedge funds',
  'political figures',
  'top analysts',
  'venture capitalists',
];

export default function HeroSection({ onPulseClick, loading }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typeEffect = useCallback(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting && displayedText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }
  }, [currentPhraseIndex, displayedText, isDeleting]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }

      typeEffect();
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timer);
  }, [currentPhraseIndex, displayedText, isDeleting, typeEffect]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-white">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-20">
        <Logo />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
          Discover the Hidden Gems of the Stock Market
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
          Uncover the stocks that{' '}
          <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
            {displayedText}
          </span>
          {' '}are investing in
        </h2>

        {!loading ? (
          <motion.button
            onClick={onPulseClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Pulse Stocks
          </motion.button>
        ) : (
          <div className="mt-10 flex flex-col items-center">
            <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
            <p className="mt-6 text-lg text-gray-300">Performing Market Research...</p>
          </div>
        )}
      </div>
    </main>
  );
}