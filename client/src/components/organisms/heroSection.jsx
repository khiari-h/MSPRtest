import React from 'react';
import Text from '../atoms/text';
import Button from '../atoms/button';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen md:h-2/3-screen lg:h-3/4-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(/concert2.jpg)', backgroundSize: 'cover' }}
      aria-label="Hero section avec un message de bienvenue et un appel à l'action pour acheter des billets"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay pour améliorer la lisibilité du texte */}
      <div className="relative container mx-auto text-center p-4 md:p-8 rounded">
        <Text content="Bienvenue au Festival Nation Sounds" type="h1" className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg font-serif" />
        <Text content="Rejoignez-nous pour une expérience inoubliable" type="p" className="text-lg md:text-2xl mb-8 text-white drop-shadow-lg font-serif" />
        <a
          href="https://www.site-de-billetterie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          aria-label="Acheter des billets pour le Festival Nation Sounds"
        >
          Acheter des billets
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
