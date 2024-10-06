export default function StockDiscoveryFilters() {
    return (
      <section className="px-8 py-12 bg-gray-800 rounded-lg mt-10 max-w-6xl mx-auto shadow-lg">
        <h2 className="text-4xl font-semibold mb-8 text-center text-neon-green">Define Your Stock Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Stock Type', 'Market Cap', 'Sector'].map((filter) => (
            <div
              key={filter}
              className="p-8 border border-gray-600 rounded-lg hover:border-neon-green hover:bg-gray-700 transition-all cursor-pointer shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">{filter}</h3>
              <p className="text-md text-gray-400">Select your preferred {filter.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  