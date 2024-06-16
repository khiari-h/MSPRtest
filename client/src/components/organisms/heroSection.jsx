// src/components/organisms/HeroSection.js
import React from 'react';
import Text from '../atoms/text';
import Button from '../atoms/button';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-1/2-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(/concert2.jpg)', backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay to enhance text readability */}
      <div className="relative container mx-auto text-center p-8 rounded">
        <Text content="Bienvenue au Festival Nation Sounds" type="h1" className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg font-serif" />
        <Text content="Rejoignez-nous pour une expérience inoubliable" type="p" className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg font-serif" />
        <a
          href="https://www.site-de-billetterie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        >
          Acheter des billets
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
