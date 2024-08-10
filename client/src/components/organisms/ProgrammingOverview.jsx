import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProgrammingOverview = () => {
  const [concert, setConcert] = useState(null);
  const [artistMeeting, setArtistMeeting] = useState(null);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch concerts
        const concertResponse = await axios.get('/api/wordpress/concerts');
        const concertData = concertResponse.data;
        if (concertData.length > 0) {
          const firstConcert = concertData[0];
          if (firstConcert.acf && firstConcert.acf.photo) {
            const mediaResponse = await axios.get(`/api/wordpress/media/${firstConcert.acf.photo}`);
            firstConcert.acf.photo = mediaResponse.data.source_url;
          }
          setConcert(firstConcert);
        }

        // Fetch artist meetings
        const artistMeetingResponse = await axios.get('/api/wordpress/artists_meetings');
        const artistMeetingData = artistMeetingResponse.data;
        if (artistMeetingData.length > 0) {
          const firstArtistMeeting = artistMeetingData[0];
          if (firstArtistMeeting.acf && firstArtistMeeting.acf.photo) {
            const mediaResponse = await axios.get(`/api/wordpress/media/${firstArtistMeeting.acf.photo}`);
            firstArtistMeeting.acf.photo = mediaResponse.data.source_url;
          }
          setArtistMeeting(firstArtistMeeting);
        }

        // Fetch workshops
        const workshopResponse = await axios.get('/api/workshops');
        const workshopData = workshopResponse.data;
        if (workshopData.length > 0) {
          const firstWorkshop = workshopData[0];
          setWorkshop(firstWorkshop);
        }

        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="programming-overview-heading">
      <Text content="Programmation" type="h2" className="text-2xl font-bold mb-6 text-center" id="programming-overview-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concert && (
            <InfoCard
              title={concert.acf.nom}
              description={concert.acf.description}
              image={concert.acf.photo || 'default.jpg'}
              type="program"
            />
          )}
          {artistMeeting && (
            <InfoCard
              title={artistMeeting.acf.nom}
              description={artistMeeting.acf.description}
              image={artistMeeting.acf.photo || 'default.jpg'}
              type="meeting"
            />
          )}
          {workshop && (
            <InfoCard
              title={workshop.name}
              description={workshop.description}
              image={workshop.photo || 'default.jpg'}
              type="workshop"
            />
          )}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/programmation"
          aria-label="Voir toute la programmation"
        />
      </div>
    </section>
  );
};

export default ProgrammingOverview;
