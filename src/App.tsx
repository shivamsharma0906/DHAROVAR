import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WelfareGrid } from './components/WelfareGrid';
import { PublicationsGrid } from './components/PublicationsGrid';
import { SocialsContact } from './components/SocialsContact';
import { Footer } from './components/Footer';

import { welfareInitiatives } from './data/welfare';
import { publications } from './data/publications';

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <Hero />
      <About />
      <WelfareGrid items={welfareInitiatives} />
      <PublicationsGrid items={publications} />
      <SocialsContact />
      <Footer />
    </div>
  );
}

export default App;
