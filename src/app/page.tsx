"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import StockDiscoveryFilters from '../components/StockDiscoveryFilters';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Correcting to use next/navigation

  const handlePulseClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/stock-results'); // Navigate to the Stock Results page
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <title>Stock Pulse</title>
      <meta name="description" content="Discover hidden gem stocks with Stock Pulse." />
      <link rel="icon" href="/favicon.ico" />

      {/* Hero Section */}
      <HeroSection onPulseClick={handlePulseClick} loading={loading} />

      {/* Stock Discovery Filters */}
      <StockDiscoveryFilters />

      {/* Footer */}
      <Footer />
    </div>
  );
}
