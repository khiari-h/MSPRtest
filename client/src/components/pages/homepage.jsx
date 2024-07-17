// src/components/pages/HomePage.js
import React from 'react';
import Header from '../organisms/header';
import HeroSection from '../organisms/heroSection';
import ConcertsOverview from '../organisms/ConcertsOverview';
import PracticalInfo from '../organisms/practicalInfo';
import Footer from '../organisms/footer';
import CTASection from '../molecules/ctaSection';
import ArtistMeetingsPreview from '../organisms/ArtistMeetingPreview';
import NewsAndUpdates from '../organisms/NewsAndUpdates';
import Map from '../organisms/Map';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <NewsAndUpdates />
      <ConcertsOverview />
      <ArtistMeetingsPreview />
      <CTASection
        title="Réservez vos billets pour une expérience inoubliable!"
        customClass="ticket-cta-section"
        ctas={[
          {
            label: "Acheter des billets",
            href: "https://www.site-de-billetterie.com",
            className: "bg-blue-500 text-white hover:bg-white hover:text-black hover:border-2 hover:border-blue-500 w-full md:w-auto rounded-full shadow-lg transform hover:scale-105 transition-transform",
          },
        ]}
      />
      <PracticalInfo />
      <Map/>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-24 py-8 px-4">
        <CTASection
          title="Restons en Contact!"
          ctas={[
            {
              label: "Contactez-nous",
              href: "/contact",
              className: "bg-blue-500 text-white px-4 py-2 rounded",
            },
          ]}
        />
        <CTASection
          title="Découvrez nos partenaires"
          ctas={[
            {
              label: "Nos Partenaires",
              href: "/partenaires",
              className: "bg-blue-500 text-white px-4 py-2 rounded",
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
