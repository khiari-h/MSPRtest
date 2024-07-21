import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ConcertsOverview = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleConcerts = 3;

  useEffect(() => {
    axios.get('/api/concerts')
      .then(response => {
        setConcerts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des concerts!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      });
  }, []);

  const visibleConcertsList = concerts.slice(0, visibleConcerts);

  return (
    <section className="container mx-auto py-8" aria-labelledby="concerts-overview-heading">
      <Text content="Programme et Planning des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" id="concerts-overview-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleConcertsList.map((concert, index) => (
            <InfoCard
              key={index}
              title={concert.name}
              description={concert.description}
              image={concert.image}
              additionalInfo={`Date: ${concert.date}, Heure: ${concert.time}, Lieu: ${concert.venue}`}
              type="program"
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        {concerts.length > visibleConcerts && (
          <Button
            label="Voir Plus de Concerts"
            href="/concerts"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            aria-label="Voir tous les concerts"
          />
        )}
      </div>
    </section>
  );
};

export default ConcertsOverview;
