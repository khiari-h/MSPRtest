import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import Text from '../atoms/Text';
import InfoCard from '../molecules/InfoCard';
import Button from '../atoms/Button';

const ArtistMeetingPreview = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleMeetings = 3;

  useEffect(() => {
    const fetchArtistMeetings = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/artists_meetings');
        console.log("API Response:", response.data);
        const meetingsData = response.data;

        // Fetch media details for each meeting
        const meetingsWithImages = await Promise.all(meetingsData.map(async meeting => {
          if (meeting.acf.photo) {
            try {
              const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${meeting.acf.photo}`);
              meeting.acf.photo = mediaResponse.data.source_url;
            } catch (mediaError) {
              console.error(`Erreur lors de la récupération de l'image pour la réunion ${meeting.id}`, mediaError);
              meeting.acf.photo = '';  // Set to an empty string or a default image URL in case of error
            }
          }
          return meeting;
        }));

        console.log("Meetings with Images:", meetingsWithImages);
        setArtistMeetings(meetingsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des rencontres avec les artistes!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchArtistMeetings();
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h2" className="text-2xl font-bold mb-6 text-center" id="artist-meetings-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistMeetings.slice(0, visibleMeetings).map((meeting) => (
            <InfoCard
              key={meeting.id}
              title={meeting.acf.nom}
              description={meeting.acf.description}
              image={meeting.acf.photo}
              additionalInfo={`Date: ${meeting.acf.date}, Heure: ${meeting.acf.heure}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type}`}
              type="meeting"
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/artistes"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          aria-label="Voir toutes les rencontres avec les artistes"
        />
      </div>
    </section>
  );
};

export default ArtistMeetingPreview;
