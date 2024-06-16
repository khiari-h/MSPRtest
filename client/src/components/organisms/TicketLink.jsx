import React from 'react';
import Text from '../atoms/text';
import Button from '../atoms/button';

const TicketLink = () => {
  return (
    <section className="container mx-auto py-8 text-center bg-gray-100 rounded-lg shadow-md">
      <Text content="Réservez vos billets pour une expérience inoubliable!" type="h2" className="text-3xl font-bold mb-6 text-blue-600" />
      <Button 
        label="Acheter des billets" 
        onClick={() => window.open('https://www.site-de-billetterie.com', '_blank')} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg"
      />
    </section>
  );
};

export default TicketLink;
