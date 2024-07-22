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
    axios.get('https://nationsounds.online/wp-json/wp/v2/artists_meetings')
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
                title={meeting.acf.artist}
                description={meeting.acf.description}
                image={meeting.acf.image}
                additionalInfo={`Date: ${meeting.acf.date}, Heure: ${meeting.acf.time}, Lieu: ${meeting.acf.venue}`}
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
