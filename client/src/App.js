import React from 'react';
import Header from './components/organisms/header';
import HeroSection from './components/organisms/heroSection';
import ConcertProgramContainer from './components/organisms/ConcertProgramContainer';
import ConcertSchedule from './components/organisms/ConcertSchedule';
import TicketLink from './components/organisms/TicketLink';
import PracticalInfo from './components/organisms/practicalInfo';
import ContactForm from './components/organisms/contactForm';
import Footer from './components/organisms/footer';
import './index.css';

const concerts = [
  { title: 'Concert 1', description: 'Description 1', image: 'concert1.jpg' },
  { title: 'Concert 2', description: 'Description 2', image: 'concert2.jpg' },
];

const schedule = [
  { title: 'Event 1', description: 'Details 1', image: 'event1.jpg' },
  { title: 'Event 2', description: 'Details 2', image: 'event2.jpg' },
];

const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ConcertProgramContainer />
      <ConcertSchedule schedule={schedule} /> {/* Prop schedule est passée ici */}
      <TicketLink />
      <PracticalInfo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
