// src/components/pages/HomePage.js
import React from 'react';
import Header from '../organisms/header';
import HeroSection from '../organisms/heroSection';
import ConcertProgram from '../organisms/ConcertProgram';
import ConcertSchedule from '../organisms/ConcertSchedule';
import TicketLink from '../organisms/TicketLink';
import PracticalInfo from '../organisms/practicalInfo';
import ContactForm from '../organisms/contactForm';
import Footer from '../organisms/footer';
import Text from '../atoms/text';


const HomePage = () => {
  const handleFormSubmit = () => {
    alert('Form submitted!');
  };

  const concerts = [
    { title: 'Concert 1', description: 'Description 1', image: 'concert1.jpg' },
    { title: 'Concert 2', description: 'Description 2', image: 'concert2.jpg' },
  ];

  const schedule = [
    { title: 'Event 1', description: 'Details 1', image: 'event1.jpg' },
    { title: 'Event 2', description: 'Details 2', image: 'event2.jpg' },
  ];

  return (
    <div>
      <Header />
      <HeroSection />
      <ConcertProgram concerts={concerts} />
      <ConcertSchedule schedule={schedule} />
      <TicketLink />
      <PracticalInfo />
      <section className="cta-section text-center py-8">
        <a href="/partenaires" className="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
          Nos Partenaires
        </a>
      </section>
      <ContactForm onSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};

export default HomePage;
