export default function Footer() {
    return (
      <footer className="bg-gray-900 text-center py-8 mt-20 border-t border-gray-700">
        <p className="text-sm text-gray-500">&copy; 2024 Stock Pulse. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-6">
          {['About', 'Contact', 'Privacy Policy'].map((link) => (
            <a key={link} href="#" className="text-gray-500 hover:text-neon-green transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>
    );
  }
  