import React from 'react';
import { Crown, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <Crown className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold text-white">Old World Coach</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <MessageCircle className="h-5 w-5 text-amber-500" />
              <span>Discord: <span className="text-amber-500 font-medium">auce</span></span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-amber-500 transition-colors duration-200 font-medium"
            >
              Back to Top
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 Shayne Hall - Old World Coach. Master the battlefield with expert guidance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;