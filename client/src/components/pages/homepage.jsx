// src/components/pages/HomePage.js
import React from 'react';
import Header from '../organisms/header';
import HeroSection from '../organisms/heroSection';
import ConcertProgram from '../organisms/ConcertProgram';
import ConcertSchedule from '../organisms/ConcertSchedule';
import TicketLink from '../organisms/TicketLink';
import PracticalInfo from '../organisms/practicalInfo';
import Footer from '../organisms/footer';
import CTASection from '../molecules/ctaSection';
import ArtistMeetingsPreview from '../organisms/ArtistMeetingPreview';
import NewsAndUpdates from '../organisms/NewsAndUpdates';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <NewsAndUpdates />
      <ConcertProgram />
      <ConcertSchedule />
      <ArtistMeetingsPreview />
      <TicketLink />
      <PracticalInfo />
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
