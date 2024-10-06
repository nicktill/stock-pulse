"use client";

import StockCard from '../../components/StockCard';

export default function StockResults() {
  // Mock Stock Data
  const stockData = [
    { symbol: 'LDOS', name: 'Leidos Holdings', currentPrice: 166.39, changeToday: 0.75, pastMonthReturn: 5.6, pastYearReturn: 25.3 },
    { symbol: 'BMY', name: 'Bristol-Myers Squibb', currentPrice: 53.96, changeToday: 0.67, pastMonthReturn: 3.4, pastYearReturn: 12.2 },
    { symbol: 'LI', name: 'Li Auto', currentPrice: 29.28, changeToday: 1.61, pastMonthReturn: 6.2, pastYearReturn: 45.1 },
    { symbol: 'BWXT', name: 'BWX Technologies', currentPrice: 117.71, changeToday: 0.48, pastMonthReturn: 4.8, pastYearReturn: 18.7 },
    { symbol: 'PEG', name: 'Public Service Enterprise', currentPrice: 92.03, changeToday: 0.47, pastMonthReturn: 2.9, pastYearReturn: 9.1 },
    { symbol: 'IBKR', name: 'Interactive Brokers', currentPrice: 147.85, changeToday: 2.12, pastMonthReturn: 7.1, pastYearReturn: 22.9 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pulse Stocks Results</h1>
      <div className="flex flex-wrap justify-center">
        {stockData.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            currentPrice={stock.currentPrice}
            changeToday={stock.changeToday}
            pastMonthReturn={stock.pastMonthReturn}
            pastYearReturn={stock.pastYearReturn}
          />
        ))}
      </div>
    </div>
  );
}
