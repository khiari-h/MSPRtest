import React from 'react';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';
import { concerts } from '../../data/concertsData';

const ConcertsPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-8" aria-labelledby="all-concerts-heading">
        <Text content="Tous les Concerts" type="h1" className="text-3xl font-bold mb-6 text-center" id="all-concerts-heading" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerts.map((concert, index) => (
            <InfoCard
              key={index}
              title={concert.title}
              description={concert.description}
              image={concert.image}
              type="program"
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConcertsPage;
