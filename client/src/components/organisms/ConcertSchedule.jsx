import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';
import Button from '../atoms/Button';

const ConcertSchedule = () => {
  const [concertsSchedule, setConcertsSchedule] = useState([]);
  const visibleConcerts = 3;

  useEffect(() => {
    axios.get('/api/concerts-schedule')
      .then(response => {
        setConcertsSchedule(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du planning des concerts!", error);
      });
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="concert-schedule-heading">
      <Text content="Planning des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" id="concert-schedule-heading" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concertsSchedule.slice(0, visibleConcerts).map((event, index) => (
          <InfoCard
            key={index}
            title={event.title}
            description={event.description}
            image={event.image}
            additionalInfo={`Date: ${event.date}, Heure: ${event.time}, Lieu: ${event.venue}`}
            type="program"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        {visibleConcerts < concertsSchedule.length && (
          <Button
            label="Voir Plus"
            href="/concerts-schedule"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            aria-label="Voir le programme des concerts"
          />
        )}
      </div>
    </section>
  );
};

export default ConcertSchedule;
