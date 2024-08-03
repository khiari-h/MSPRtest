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

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchArtistMeetings = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/artists_meetings');
        const meetingsData = response.data;

        const meetingsWithImages = await Promise.all(meetingsData.map(async meeting => {
          if (meeting.acf.photo) {
            try {
              const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${meeting.acf.photo}`);
              meeting.acf.photo = mediaResponse.data.source_url;
            } catch (mediaError) {
              meeting.acf.photo = '';
            }
          }
          // Formater la date ici
          meeting.acf.date = formatDate(meeting.acf.date);
          return meeting;
        }));

        setArtistMeetings(meetingsWithImages);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchArtistMeetings();
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h1" className="h1-class text-center" id="artist-meetings-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-error-red">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistMeetings.slice(0, visibleMeetings).map((meeting) => (
            <InfoCard
              key={meeting.id}
              title={meeting.acf.nom}
              description={meeting.acf.description}
              image={meeting.acf.photo}
              additionalInfo={`Date: ${meeting.acf.date}, Heure: ${meeting.acf.heure}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type},Durée: ${meeting.acf.duree} heures`}
              type="meeting"
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/artistes"
          aria-label="Voir toutes les rencontres avec les artistes"
        />
      </div>
    </section>
  );
};

export default ArtistMeetingPreview;
