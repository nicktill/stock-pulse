'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import ModernFilters from '../components/ModernFilters';
import Footer from '../components/Footer';
import StockDiscoveryFilters from '@/components/StockDiscoveryFilters';

const ThreeJSBackground = dynamic(() => import('../components/ThreeJSBackground'), { ssr: false });

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
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
        {/* <ModernFilters /> */}
        {/* <StockDiscoveryFilters /> */}
        <HeroSection onPulseClick={handlePulseClick} loading={loading} />
        <Footer />
      </div>
    </div>
  );
}