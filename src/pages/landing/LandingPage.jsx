import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/landing/Hero';
import ProductShowcase from '../../components/landing/ProductShowcase';
import Features from '../../components/landing/Features';

const LandingPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <ProductShowcase />
      <Features />
    </>
  );
};

export default LandingPage;
