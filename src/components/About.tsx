import React from 'react';
import { Shield, Award, Users, Gavel } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Your <span className="text-amber-500">Coach</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Shayne Hall</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With years of experience as both a competitive player and official judge at major 
                Canadian Warhammer events, I bring a unique dual perspective to coaching that sets 
                me apart from other instructors.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                My deep understanding of the rules comes from countless hours adjudicating complex 
                interactions at tournament level, while my competitive experience ensures I understand 
                what it takes to succeed under pressure.
              </p>
              
              <div className="flex items-center space-x-3 text-amber-500 mb-4">
                <Users className="h-5 w-5" />
                <span className="text-white font-medium">Discord: auce</span>
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