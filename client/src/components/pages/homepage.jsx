// src/components/pages/HomePage.js
import React from 'react';
import Header from '../organisms/header';
import HeroSection from '../organisms/heroSection';
import ConcertProgram from '../organisms/ConcertProgram';
import ConcertSchedule from '../organisms/ConcertSchedule';
import TicketLink from '../organisms/TicketLink';
import PracticalInfo from '../organisms/practicalInfo';
import PartnersList from '../organisms/partnersList';
import ContactForm from '../organisms/contactForm';
import Footer from '../organisms/footer';

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

  const partners = [
    { name: 'Partner 1', logo: 'partner1.png' },
    { name: 'Partner 2', logo: 'partner2.png' },
  ];

  const formFields = [
    { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name', value: '', onChange: () => {} },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email', value: '', onChange: () => {} },
    { label: 'Message', type: 'textarea', name: 'message', placeholder: 'Enter your message', value: '', onChange: () => {} },
  ];

  return (
    <div>
      <Header />
      <HeroSection />
      <ConcertProgram concerts={concerts} />
      <ConcertSchedule schedule={schedule} />
      <TicketLink />
      <PracticalInfo />
      <PartnersList partners={partners} />
      <ContactForm fields={formFields} onSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};

export default HomePage;
