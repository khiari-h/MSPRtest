import React from 'react';
import Text from '../atoms/text';
import './ticketLink.css';

const TicketLink = () => {
  return (
    <section className="ticket-link-section container mx-auto py-8 text-center" aria-labelledby="ticket-link-heading">
      <Text content="Réservez vos billets pour une expérience inoubliable!" type="h2" className="ticket-link-title text-3xl font-bold mb-6" id="ticket-link-heading" />
      <a
        href="https://www.site-de-billetterie.com"
        target="_blank"
        rel="noopener noreferrer"
        className="ticket-link-button inline-block text-white font-bold py-3 px-6 rounded-full text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        aria-label="Acheter des billets pour une expérience inoubliable"
      >
        Acheter des billets
      </a>
    </section>
  );
};

export default TicketLink;
