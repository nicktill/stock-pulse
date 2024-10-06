import React from 'react';
import Link from 'next/link';
import { BarChart2 } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
      <BarChart2 className="w-8 h-8 text-teal-400" />
      <span className="text-xl font-bold text-white">
        StockPulse
      </span>
    </Link>
  );
};

export default Logo;