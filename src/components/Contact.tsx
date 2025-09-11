import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Crown } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! I\'ll get back to you soon via Discord or email.');
    setFormData({ name: '', email: '', experience: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get <span className="text-amber-500">Started</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to elevate your game? Let's discuss your goals and create a personalized coaching plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect with Me</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-amber-500" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">Discord</h4>
                    <p className="text-amber-500 font-medium">auce</p>
                    <p className="text-gray-400 text-sm">Fastest way to reach me</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
                  <Mail className="h-6 w-6 text-red-500" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email Inquiry</h4>
                    <p className="text-gray-400 text-sm">Use the form to send a detailed message</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-4">What to Expect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Initial consultation to assess your goals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Personalized coaching plan development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Flexible scheduling to fit your availability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Ongoing support and progress tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your level</option>
                    <option value="new">New to Warhammer: The Old World</option>
                    <option value="casual">Casual player</option>
                    <option value="intermediate">Intermediate player</option>
                    <option value="competitive">Competitive/Tournament player</option>
                    <option value="veteran">Veteran looking to improve</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your goals, current challenges, or any specific areas you'd like to focus on..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;