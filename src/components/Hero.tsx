import React from 'react';
import { Sword, Crown } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Hero = () => {
  const { content, isLoading } = useContent();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-red-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-red-900"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Sword className="h-16 w-16 text-amber-500" />
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: content.hero.title }}
          />
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            {content.hero.subtitle}
          </p>
          
          <button
            onClick={scrollToContact}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>{content.hero.cta_text}</span>
            <Crown className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;