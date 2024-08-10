import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import Text from '../../atoms/Text';
import InfoCard from '../../molecules/InfoCard';

const ArtistMeeting = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [filteredMeetings, setFilteredMeetings] = useState([]);

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
        const response = await axios.get('/api/wordpress/artists_meetings');
        const meetingsData = response.data;

        const meetingsWithImages = await Promise.all(meetingsData.map(async meeting => {
          if (meeting.acf.photo) {
            try {
              const mediaResponse = await axios.get(`/api/wordpress/media/${meeting.acf.photo}`);
              meeting.acf.photo = mediaResponse.data.source_url;
            } catch (mediaError) {
              meeting.acf.photo = '';
            }
          }
          meeting.acf.date = formatDate(meeting.acf.date);
          meeting.acf.heuredebut = meeting.acf.heuredebut ? meeting.acf.heuredebut : 'Non spécifiée';
          meeting.acf.heurefin = meeting.acf.heurefin ? meeting.acf.heurefin : 'Non spécifiée';
          return meeting;
        }));

        setArtistMeetings(meetingsWithImages);
        setFilteredMeetings(meetingsWithImages);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchArtistMeetings();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filtered = artistMeetings;
    if (filters.date) {
      filtered = filtered.filter(meeting => meeting.acf.date === filters.date);
    }
    if (filters.heuredebut) {
      filtered = filtered.filter(meeting => meeting.acf.heuredebut === filters.heuredebut);
    }
    if (filters.lieu) {
      filtered = filtered.filter(meeting => meeting.acf.lieu === filters.lieu);
    }
    if (filters.type) {
      filtered = filtered.filter(meeting => meeting.acf.type === filters.type);
    }
    setFilteredMeetings(filtered);
  }, [filters, artistMeetings]);

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4">
        <div className="w-full sm:w-auto">
          <Text content="Date" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Toutes les dates</option>
            {[...new Set(artistMeetings.map(meeting => meeting.acf.date))].map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Heure de début" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="heuredebut"
            name="heuredebut"
            value={filters.heuredebut}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Toutes les heures de début</option>
            {[...new Set(artistMeetings.map(meeting => meeting.acf.heuredebut))].map((heure, index) => (
              <option key={index} value={heure}>{heure}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Lieu" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="lieu"
            name="lieu"
            value={filters.lieu}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Tous les lieux</option>
            {[...new Set(artistMeetings.map(meeting => meeting.acf.lieu))].map((lieu, index) => (
              <option key={index} value={lieu}>{lieu}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Type" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Tous les types</option>
            {[...new Set(artistMeetings.map(meeting => meeting.acf.type))].map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h1" className="text-concert-title text-center" id="artist-meetings-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-error-red">{error}</p>}
      {!loading && !error && (
        <>
          {filterSection}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => (
              <InfoCard
                key={meeting.id}
                title={meeting.acf.nom}
                description={meeting.acf.description}
                image={meeting.acf.photo}
                additionalInfo={`Date: ${meeting.acf.date}, Heure de début: ${meeting.acf.heuredebut}, Heure de fin: ${meeting.acf.heurefin}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type}`}
                type="meeting"
                aria-label="Rencontre avec artiste"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ArtistMeeting;
