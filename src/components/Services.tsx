import React from 'react';
import { BookOpen, Trophy, Target, Brain, Shield, Swords } from 'lucide-react';

const Services = () => {
  const beginnerServices = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Building Foundational Rule Knowledge",
      description: "Master the core mechanics that form the backbone of every game"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Understanding Army Strengths",
      description: "Learn what makes each faction unique and how to leverage their abilities"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "List-Building Principles",
      description: "Create synergistic armies that work together effectively"
    },
    {
      icon: <Swords className="h-8 w-8" />,
      title: "Tactical Fundamentals",
      description: "Movement, positioning, and combat basics that win games"
    }
  ];

  const competitiveServices = [
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Tournament List Optimization",
      description: "Fine-tune your army for competitive meta and tournament formats"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Advanced Rule Interactions",
      description: "Navigate complex scenarios with judge-level rule knowledge"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Tactical Concepts & Positioning",
      description: "Master advanced strategies that separate good from great players"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Replay Analysis",
      description: "Learn from your games with detailed tactical breakdowns"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Coaching <span className="text-amber-500">Services</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* New Players */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">New to the Old World?</h3>
                <p className="text-gray-400">Build a strong foundation for lasting success</p>
              </div>

              <div className="space-y-6">
                {beginnerServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                    <div className="text-amber-500 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Players */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
              <div className="text-center mb-8">
                <Trophy className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Compete?</h3>
                <p className="text-gray-400">Elevate your game to tournament level</p>
              </div>

              <div className="space-y-6">
                {competitiveServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                    <div className="text-red-500 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300 mb-6">
              Additional services include mental game preparation, multi-round event strategies, 
              and avoiding common mistakes that cost games.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;