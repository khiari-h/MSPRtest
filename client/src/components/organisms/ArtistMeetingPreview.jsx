import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../atoms/text';
import InfoCard from '../molecules/infoCard';
import Button from '../atoms/Button';

const ArtistMeetingPreview = () => {
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

  const visibleMeetings = 3;

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h2" className="text-2xl font-bold mb-6 text-center" id="artist-meetings-heading" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artistMeetings.slice(0, visibleMeetings).map((meeting, index) => (
          <InfoCard
            key={index}
            title={meeting.artist}
            description={meeting.description}
            image={meeting.image}
            type="meeting"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/artist-meetings"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          aria-label="Voir toutes les rencontres avec les artistes"
        />
      </div>
    </section>
  );
};

export default ArtistMeetingPreview;
