import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react'; // Optional close icon for better UX
import { Toaster, toast } from 'react-hot-toast'; // Import react-hot-toast

const FilterOption = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
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

const PredefinedSearches = ({ searches, selectedSearch, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {searches.map((search) => (
        <motion.div
          key={search}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`cursor-pointer px-4 py-2 rounded-full shadow-md transition-all ${
            selectedSearch === search
              ? 'bg-teal-600 text-white'
              : 'border-2 border-teal-600 text-teal-600 bg-transparent hover:bg-teal-600 hover:text-white transition-colors duration-200'
          }`}
          onClick={() => onSelect(search)}
        >
          {search}
        </motion.div>
      ))}
    </div>
  );
};

const ModernFilters = ({ onClose }) => {
  const [marketCap, setMarketCap] = useState('Any');
  const [sector, setSector] = useState('Any');
  const [avoidSector, setAvoidSector] = useState('None');
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [dividendYield, setDividendYield] = useState('Any');
  const [stockVolatility, setStockVolatility] = useState('Any');
  const [selectedSearch, setSelectedSearch] = useState('');

  const marketCaps = ['Any', 'Small Cap', 'Mid Cap', 'Large Cap'];
  const sectors = ['Any', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods', 'Utilities'];
  const avoidSectors = ['None', ...sectors.filter((s) => s !== 'Any')];
  const riskTolerances = ['Low', 'Medium', 'High'];
  const dividendYields = ['Any', 'Above 3%', 'Above 5%', 'Above 7%'];
  const stockVolatilities = ['Any', 'Low', 'Medium', 'High'];

  const predefinedSearches = [
    'Blue-Chip Stocks',
    'Emerging Markets',
    'Value Stocks',
    'High-Growth Tech',
    'Small-Cap Growth',
    'Large-Cap Value',
    'Recession-Proof Stocks',
    'High-Yield Bonds',
    'Penny Stocks',
    'IPO Opportunities',
    'Healthcare Innovators',
    'Cryptocurrency',
    'Consumer Staples',
    'Energy Sector',
    'Global Infrastructure',
    'Defense & Aerospace',
    'Fintech',
    'Blockchain & Crypto Tech',
  ];

  const handleApplyFilters = () => {
    // Trigger the toast notification
    toast.success('Filters applied successfully!', {
      style: {
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
      position: "top-center",
    });

    // Delay closing the modal to give time for the toast to appear
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 w-full max-w-5xl py-8 px-6 rounded-lg shadow-xl relative"
    >
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Close Icon */}
      <button className="absolute top-4 right-4 text-white" onClick={onClose}>
        <XIcon className="h-6 w-6" />
      </button>

      <h2 className="text-3xl font-bold text-white mb-6 text-center">Stock Discovery Filters</h2>

      {/* Predefined Searches */}
      <h3 className="text-lg text-teal-400 mb-2">Quick Searches</h3>
      <PredefinedSearches
        searches={predefinedSearches}
        selectedSearch={selectedSearch}
        onSelect={setSelectedSearch}
      />

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <FilterOption
          label="Risk Tolerance"
          options={riskTolerances}
          selectedValue={riskTolerance}
          onChange={setRiskTolerance}
        />
        <FilterOption
          label="Dividend Yield"
          options={dividendYields}
          selectedValue={dividendYield}
          onChange={setDividendYield}
        />
        <FilterOption
          label="Stock Volatility"
          options={stockVolatilities}
          selectedValue={stockVolatility}
          onChange={setStockVolatility}
        />
      </div>

      {/* Apply Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleApplyFilters}
        className="mt-8 w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Apply Filters
      </motion.button>
    </motion.div>
  );
};

export default ModernFilters;
