import React, { useState } from 'react';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';
import { concertsSchedule } from '../../data/concertsScheduleData';

const ConcertSchedule = () => {
  const [visibleConcerts, setVisibleConcerts] = useState(3);

  const showMoreConcerts = () => {
    setVisibleConcerts(prevVisibleConcerts => prevVisibleConcerts + 3);
  };

  const showLessConcerts = () => {
    setVisibleConcerts(3);
  };

  return (
    <section className="container mx-auto py-8">
      <Text content="Planning des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {concertsSchedule.slice(0, visibleConcerts).map((event, index) => (
          <InfoCard
            key={index}
            title={event.title}
            description={event.description}
            image={event.image}
            additionalInfo={`Date: ${event.date}, Heure: ${event.time}, Lieu: ${event.venue}`}
            type="schedule"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        {visibleConcerts < concertsSchedule.length && (
          <button onClick={showMoreConcerts} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voir Plus
          </button>
        )}
        {visibleConcerts > 3 && (
          <button onClick={showLessConcerts} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Voir Moins
          </button>
        )}
      </div>
    </section>
  );
};

export default ConcertSchedule;
