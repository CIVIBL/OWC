import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Crown } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Contact = () => {
  const { content, isLoading } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/contact-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent. I\'ll get back to you soon via Discord or email.');
        setFormData({ name: '', email: '', experience: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again or contact me directly on Discord.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection or contact me directly on Discord.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading || !content) {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: content.contact.title }}
            />
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed">
              {content.contact.subtitle}
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
                    <p className="text-amber-500 font-medium">{content.contact.discord}</p>
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
              <h3 className="text-2xl font-bold text-white mb-6">{content.contact.form_title}</h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
                  <p className="text-green-300">{statusMessage}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                  <p className="text-red-300">{statusMessage}</p>
                </div>
              )}
              
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
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors disabled:opacity-50"
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
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors disabled:opacity-50"
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
                    disabled={isSubmitting}
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors disabled:opacity-50"
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
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your goals, current challenges, or any specific areas you'd like to focus on..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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