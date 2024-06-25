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

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ConcertProgram />
      <ConcertSchedule />
      <TicketLink />
      <PracticalInfo />
      <CTASection
        title="Restons en Contact!"
        ctas={[
          {
            label: "Contactez-nous",
            href: "/contact",
            className: "bg-blue-500 hover:bg-blue-700 text-white focus:bg-white focus:text-blue-500 focus:border-2 focus:border-blue-500"
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
