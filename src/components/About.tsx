import React from 'react';
import { Shield, Award, Users, Gavel } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: content.about.title }}
            />
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{content.about.name}</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {content.about.description}
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {content.about.extended_description}
              </p>
              
              <div className="flex items-center space-x-3 text-amber-500 mb-4">
                <Users className="h-5 w-5" />
                <span className="text-white font-medium">Discord: {content.about.discord}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300">
                <Gavel className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Master Judge</h4>
                <p className="text-gray-400">Official judge at major Canadian events</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300">
                <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Competitive Player</h4>
                <p className="text-gray-400">Tournament veteran with proven results</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300">
                <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Rule Expert</h4>
                <p className="text-gray-400">Deep knowledge of complex interactions</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300">
                <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Proven Mentor</h4>
                <p className="text-gray-400">Helping players achieve their goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;