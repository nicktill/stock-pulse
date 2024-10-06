import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 170 },
  { name: 'May', value: 160 },
  { name: 'Jun', value: 180 },
];

export default function StockCard({ symbol, name, currentPrice, changeToday, pastMonthReturn, pastYearReturn }) {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg m-4 w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{name} ({symbol})</h2>
      <p className="text-lg mt-2">Current Price: ${currentPrice.toFixed(2)}</p>
      <p className={`mt-1 ${changeToday >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        Today's Change: {changeToday >= 0 ? '+' : ''}{changeToday.toFixed(2)}%
      </p>
      <div className="my-6 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p>Past Month Return: <span className="text-green-400">{pastMonthReturn}%</span></p>
      <p>Past Year Return: <span className="text-green-400">{pastYearReturn}%</span></p>
    </div>
  );
}