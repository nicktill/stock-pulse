'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import StockDiscoveryFilters from '@/components/StockDiscoveryFilters'; 
import { Filter } from 'lucide-react'; // Importing the filter icon
import ModernFilters from '@/components/ModernFilters';

const ThreeJSBackground = dynamic(() => import('../components/ThreeJSBackground'), { ssr: false });

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter modal visibility
  const router = useRouter();

  useEffect(() => {
    // Prefetch the stock results page
    router.prefetch('/stock-results');
  }, [router]);

  const handlePulseClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/stock-results');
    }, 2000);
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden">
      <title>Stock Pulse</title>
      <meta name="description" content="Discover hidden gem stocks with Stock Pulse." />
      <link rel="icon" href="/favicon.ico" />

      <Suspense fallback={<div>Loading...</div>}>
        <ThreeJSBackground />
      </Suspense>

      <div className="relative z-10">
        {/* Filter icon in the top-right */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={() => setShowFilters(true)}>
            <Filter className="h-6 w-6 text-white" /> {/* Simple filter icon */}
          </button>
        </div>

        <HeroSection onPulseClick={handlePulseClick} loading={loading} />
      </div>

      {/* Modal for StockDiscoveryFilters */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFilters(false)}
            >
            </button>
            <ModernFilters onClose={() => setShowFilters(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
