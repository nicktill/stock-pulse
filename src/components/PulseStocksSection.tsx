import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Using Heroicons for modern loading indicator

export default function PulseStocksSection() {
  const [loading, setLoading] = useState(false);

  const handlePulseClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Mocked data fetched!');
    }, 2000);
  };

  return (
    <section className="text-center py-12 mt-10 max-w-6xl mx-auto">
      {!loading && (
        <button
          onClick={handlePulseClick}
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-10 py-4 rounded-full text-2xl font-bold hover:shadow-lg transition-transform transform hover:scale-110 shadow-xl"
        >
          Find Pulse Stocks
        </button>
      )}
      {loading && (
        <div className="mt-10 flex flex-col items-center">
          <ArrowPathIcon className="h-16 w-16 animate-spin text-neon-green" />
          <p className="mt-6 text-lg text-gray-300">Performing Market Research...</p>
        </div>
      )}
    </section>
  );
}
