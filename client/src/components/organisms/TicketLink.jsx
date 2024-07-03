import React from 'react';
import Text from '../atoms/text';
import Button from '../atoms/Button'; 

const TicketLink = () => {
  return (
    <section className="container mx-auto py-8 text-center bg-soft-beige rounded-lg shadow-md p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg" aria-labelledby="ticket-link-heading">
      <Text content="Réservez vos billets pour une expérience inoubliable!" type="h2" className="text-3xl font-bold mb-6 text-blue-600" id="ticket-link-heading" />
      <Button
        href="https://www.site-de-billetterie.com"
        label="Acheter des billets"
        className="bg-blue-500 text-white hover:bg-white hover:text-black hover:border-2 hover:border-blue-500 w-full md:w-auto"
      />
    </section>
  );
};

export default TicketLink;
