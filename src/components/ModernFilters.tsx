import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FilterOption = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const ModernFilters = () => {
  const [marketCap, setMarketCap] = useState('Any');
  const [sector, setSector] = useState('Any');
  const [avoidSector, setAvoidSector] = useState('None');

  const marketCaps = ['Any', 'Small Cap', 'Mid Cap', 'Large Cap'];
  const sectors = ['Any', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods', 'Utilities'];
  const avoidSectors = ['None', ...sectors.filter(s => s !== 'Any')];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 w-full py-6 px-4 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Stock Discovery Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FilterOption
          label="Market Cap"
          options={marketCaps}
          selectedValue={marketCap}
          onChange={setMarketCap}
        />
        <FilterOption
          label="Sector"
          options={sectors}
          selectedValue={sector}
          onChange={setSector}
        />
        <FilterOption
          label="Avoid Sector"
          options={avoidSectors}
          selectedValue={avoidSector}
          onChange={setAvoidSector}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Apply Filters
      </motion.button>
    </motion.div>
  );
};

export default ModernFilters;