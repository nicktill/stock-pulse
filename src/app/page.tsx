'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import ModernFilters from '../components/ModernFilters';
import Footer from '../components/Footer';
import StockDiscoveryFilters from '@/components/StockDiscoveryFilters';

const ThreeJSBackground = dynamic(() => import('../components/ThreeJSBackground'), { ssr: false });

export default function LandingPage() {
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
        <HeroSection />
        <Footer />
      </div>
    </div>
  );
}