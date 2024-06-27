import React from 'react';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import Text from '../atoms/text';
import InfoCard from '../molecules/infoCard';
import { concertsSchedule } from '../../data/concertsScheduleData';

const ConcertsSchedulePage = () => {
  return (
    <div>
      <Header />
      <section className="container mx-auto py-8" aria-labelledby="all-concert-schedule-heading">
        <Text content="Tous les Concerts" type="h1" className="text-3xl font-bold mb-6 text-center" id="all-concert-schedule-heading" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {concertsSchedule.map((event, index) => (
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
      </section>
      <Footer />
    </div>
  );
};

export default ConcertsSchedulePage;