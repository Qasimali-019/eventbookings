import React from 'react';
import Hero from '../components/Hero';
import FeesSection from '../components/FeesSection';
import Features from '../components/Features';
import Industry from '../components/Industry';
import Testimonials from '../components/Testimonials';
import DiscoverEvents from '../components/DiscoverEvents';

const Home = () => {
  return (
    <>
      <Hero />
      <FeesSection />
      <Features />
      <Industry />
      <Testimonials />
      <DiscoverEvents />
    </>
  );
};

export default Home;
