import React from 'react';
import { BookOpen, Trophy, Target, Brain, Shield, Swords } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Services = () => {
  const { content, isLoading } = useContent();

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

  if (isLoading || !content) {
    return (
      <section id="services" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: content.services.title }}
            />
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* New Players */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{content.services.beginner_title}</h3>
                <p className="text-gray-400">{content.services.beginner_subtitle}</p>
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
                <h3 className="text-2xl font-bold text-white mb-2">{content.services.competitive_title}</h3>
                <p className="text-gray-400">{content.services.competitive_subtitle}</p>
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
              {content.services.additional_info}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;