import React from 'react';
import Header from '../organisms/header';
import HeroSection from '../organisms/heroSection';
import ConcertProgram from '../organisms/ConcertProgram';
import ConcertSchedule from '../organisms/ConcertSchedule';
import TicketLink from '../organisms/TicketLink';
import PracticalInfo from '../organisms/practicalInfo';
import Footer from '../organisms/footer';
import Text from '../atoms/text';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ConcertProgram />
      <ConcertSchedule />
      <TicketLink />
      <PracticalInfo />
      <section className="cta-section text-center py-8">
        <a href="/contact" className="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
          Restons en Contact!
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
