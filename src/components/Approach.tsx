import React from 'react';
import { Heart, Lightbulb, Users, Award } from 'lucide-react';

const Approach = () => {
  const approaches = [
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      title: "Personalized Sessions",
      description: "Every coaching session is tailored to your specific goals, skill level, and learning style."
    },
    {
      icon: <Award className="h-12 w-12 text-amber-500" />,
      title: "Judge's Expertise",
      description: "Benefit from insider knowledge of rule interpretations and tournament scenarios."
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-amber-500" />,
      title: "Understanding 'Why'",
      description: "Learn the reasoning behind decisions, not just what to do in each situation."
    },
    {
      icon: <Users className="h-12 w-12 text-red-500" />,
      title: "Supportive Environment",
      description: "A judgment-free space where questions are encouraged and mistakes become learning opportunities."
    }
  ];

  return (
    <section id="approach" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Coaching <span className="text-amber-500">Approach</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              My coaching philosophy combines technical expertise with personalized mentorship, 
              ensuring you not only improve your gameplay but understand the fundamental 
              concepts that drive long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  {approach.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{approach.title}</h3>
                <p className="text-gray-400 leading-relaxed">{approach.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              What Sets My Coaching Apart
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Judge's Perspective</h4>
                <p className="text-gray-400">Unique insights from officiating major tournaments and handling complex rule interactions</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-500 mb-2">Competitive Experience</h4>
                <p className="text-gray-400">Battle-tested strategies from years of tournament play at the highest levels</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Proven Results</h4>
                <p className="text-gray-400">Track record of helping players achieve their competitive goals and rule mastery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;