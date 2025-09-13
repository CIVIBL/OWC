import React from 'react';
import { ContentProvider } from './contexts/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Hero />
        <About />
        <Services />
        <Approach />
        <Contact />
        <Footer />
      </div>
    </ContentProvider>
  );
}

export default App;