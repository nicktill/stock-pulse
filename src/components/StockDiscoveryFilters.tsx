// src/components/StockDiscoveryFilters.tsx
import { useState } from 'react';

export default function StockDiscoveryFilters() {
  const [selectedMarketCap, setSelectedMarketCap] = useState<string>('Any');
  const [selectedSector, setSelectedSector] = useState<string>('Any');
  const [selectedAvoidSectors, setSelectedAvoidSectors] = useState<string>('None');

  const marketCaps = ['Any', 'Small Cap', 'Mid Cap', 'Large Cap'];
  const sectors = [
    'Any',
    'Technology',
    'Healthcare',
    'Finance',
    'Energy',
    'Consumer Goods',
    'Utilities',
    // Add more sectors as needed
  ];
  const avoidSectors = ['None', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods', 'Utilities'];

  return (
    <div className="bg-gray-800 w-full py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center space-x-4">
        {/* Market Cap Filter */}
        <div className="flex items-center my-2">
          <label htmlFor="marketCap" className="mr-2 text-white">
            Market Cap:
          </label>
          <select
            id="marketCap"
            value={selectedMarketCap}
            onChange={(e) => setSelectedMarketCap(e.target.value)}
            className="bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {marketCaps.map((cap) => (
              <option key={cap} value={cap}>
                {cap}
              </option>
            ))}
          </select>
        </div>

        {/* Sector Filter */}
        <div className="flex items-center my-2">
          <label htmlFor="sector" className="mr-2 text-white">
            Sector:
          </label>
          <select
            id="sector"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Avoid Sector Filter */}
        <div className="flex items-center my-2">
          <label htmlFor="avoidSector" className="mr-2 text-white">
            Avoid Sector:
          </label>
          <select
            id="avoidSector"
            value={selectedAvoidSectors}
            onChange={(e) => setSelectedAvoidSectors(e.target.value)}
            className="bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {avoidSectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Filters */}
        {/* You can add more dropdowns or inputs here following the same pattern */}
      </div>
    </div>
  );
}
