import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';

const ArtistMeetingsPage = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/artist-meetings')
      .then(response => {
        setArtistMeetings(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Erreur lors de la récupération des rencontres avec les artistes !");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Rencontres avec les Artistes" type="h1" className="text-3xl font-bold mb-6 text-center" />
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistMeetings.map((meeting, index) => (
              <InfoCard
                key={index}
                title={meeting.artist}
                description={meeting.description}
                image={meeting.image}
                additionalInfo={`Date: ${meeting.date}, Heure: ${meeting.time}, Lieu: ${meeting.venue}`}
                type="meeting"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArtistMeetingsPage;
