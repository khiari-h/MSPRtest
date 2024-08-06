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

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return timeStr;
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch concerts
        const concertResponse = await axios.get('https://nationsounds.online/wp-json/wp/v2/concerts');
        const concertData = concertResponse.data;
        if (concertData.length > 0) {
          const firstConcert = concertData[0];
          if (firstConcert.acf && firstConcert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${firstConcert.acf.photo}`);
            firstConcert.acf.photo = mediaResponse.data.source_url;
          }
          firstConcert.acf.date = formatDate(firstConcert.acf.date);
          firstConcert.acf.heuredebut = formatTime(firstConcert.acf.heuredebut);
          firstConcert.acf.heurefin = formatTime(firstConcert.acf.heurefin);
          setConcert(firstConcert);
        }

        // Fetch artist meetings
        const artistMeetingResponse = await axios.get('https://nationsounds.online/wp-json/wp/v2/artists_meetings');
        const artistMeetingData = artistMeetingResponse.data;
        if (artistMeetingData.length > 0) {
          const firstArtistMeeting = artistMeetingData[0];
          if (firstArtistMeeting.acf && firstArtistMeeting.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${firstArtistMeeting.acf.photo}`);
            firstArtistMeeting.acf.photo = mediaResponse.data.source_url;
          }
          firstArtistMeeting.acf.date = formatDate(firstArtistMeeting.acf.date);
          firstArtistMeeting.acf.heuredebut = firstArtistMeeting.acf.heuredebut ? formatTime(firstArtistMeeting.acf.heuredebut) : 'Non spécifiée';
          firstArtistMeeting.acf.heurefin = firstArtistMeeting.acf.heurefin ? formatTime(firstArtistMeeting.acf.heurefin) : 'Non spécifiée';
          setArtistMeeting(firstArtistMeeting);
        }

        // Fetch workshops
        const workshopResponse = await axios.get('/api/workshops');
        const workshopData = workshopResponse.data;
        if (workshopData.length > 0) {
          const firstWorkshop = workshopData[0];
          firstWorkshop.date = formatDate(firstWorkshop.date);
          firstWorkshop.time = formatTime(firstWorkshop.time);
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
              image={concert.acf.photo}
              additionalInfo={`Date: ${concert.acf.date}, Heure de début: ${concert.acf.heuredebut}, Heure de fin: ${concert.acf.heurefin}, Lieu: ${concert.acf.lieu}, Type: ${concert.acf.type}`}
              type="program"
            />
          )}
          {artistMeeting && (
            <InfoCard
              title={artistMeeting.acf.nom}
              description={artistMeeting.acf.description}
              image={artistMeeting.acf.photo}
              additionalInfo={`Date: ${artistMeeting.acf.date}, Heure de début: ${artistMeeting.acf.heuredebut}, Heure de fin: ${artistMeeting.acf.heurefin}, Lieu: ${artistMeeting.acf.lieu}, Type: ${artistMeeting.acf.type}`}
              type="meeting"
            />
          )}
          {workshop && (
            <InfoCard
              title={workshop.name}
              description={workshop.description}
              image={workshop.photo}
              additionalInfo={`Date: ${workshop.date}, Heure: ${workshop.time}, Lieu: ${workshop.venue}`}
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
