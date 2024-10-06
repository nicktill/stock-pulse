import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function HeroSection({ onPulseClick, loading }) {
  return (
    <main className="flex flex-col items-center justify-center pt-20 pb-16 text-center">
      <h1 className="text-6xl font-extrabold mb-6 text-neon-green font-inter">
        Discover the Hidden Gems of the Stock Market
      </h1>
      <p className="text-xl max-w-2xl mb-10 text-gray-300">
        Uncover the stocks that institutional investors, hedge funds, and political figures are buying. Let Stock-Pulse be your guide.
      </p>
      {!loading && (
        <button
          onClick={onPulseClick}
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
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
    </main>
  );
}
