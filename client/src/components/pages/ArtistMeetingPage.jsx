import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';

const ArtistMeetingsPage = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);

  useEffect(() => {
    axios.get('/api/artist-meetings')
      .then(response => {
        setArtistMeetings(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des rencontres avec les artistes!", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Rencontres avec les Artistes" type="h1" className="text-3xl font-bold mb-6 text-center" />
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
      </main>
      <Footer />
    </div>
  );
};

export default ArtistMeetingsPage;
