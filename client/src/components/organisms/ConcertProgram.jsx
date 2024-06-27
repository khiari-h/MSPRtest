import React from 'react';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';
import Button from '../atoms/button';
import { concerts } from '../../data/concertsData';

const ConcertProgram = () => {
  const visibleConcerts = 3;

  return (
    <section className="container mx-auto py-8" aria-labelledby="concert-program-heading">
      <Text content="Programme des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" id="concert-program-heading" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.slice(0, visibleConcerts).map((concert, index) => (
          <InfoCard
            key={index}
            title={concert.title}
            description={concert.description}
            image={concert.image}
            type="program"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        {visibleConcerts < concerts.length && (
          <Button
            label="Voir Plus"
            href="/concerts"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            aria-label="Voir tous les concerts"
          />
        )}
      </div>
    </section>
  );
};

export default ConcertProgram;
