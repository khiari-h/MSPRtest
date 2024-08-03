import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtistMeetingsPageTemplate from '../templates/ArtistMeetingPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';

const ArtistMeetingsPage = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ type: '', search: '', date: '' });
  const [artistTypes, setArtistTypes] = useState([]);
  const [dates, setDates] = useState([]);

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
          meeting.acf.date = formatDate(meeting.acf.date);
          return meeting;
        }));

        const types = Array.from(new Set(meetingsWithImages.map(meeting => meeting.acf.type))).filter(Boolean);
        const dates = Array.from(new Set(meetingsWithImages.map(meeting => meeting.acf.date))).filter(Boolean);
        setArtistTypes(types);
        setDates(dates);
        setArtistMeetings(meetingsWithImages);
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

  const filteredMeetings = artistMeetings.filter(meeting => {
    return (
      (filters.type === '' || meeting.acf.type?.toLowerCase().includes(filters.type.toLowerCase())) &&
      (filters.date === '' || meeting.acf.date === filters.date) &&
      (filters.search === '' || meeting.acf.nom.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-col sm:flex-row flex-wrap justify-center space-y-4 sm:space-y-0 sm:space-x-4" aria-label="Filtres de recherche pour les rencontres d'artistes">
        <div className="w-full sm:w-auto">
          <label htmlFor="type" className="block text-sm font-medium text-black">Type d'Artiste</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            aria-label="Filtrer par type d'artiste"
          >
            <option value="">Tous les types</option>
            {artistTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="date" className="block text-sm font-medium text-black">Date</label>
          <select
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            aria-label="Filtrer par date"
          >
            <option value="">Toutes les dates</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="search" className="block text-sm font-medium text-black">Recherche</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Rechercher par nom"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            aria-label="Rechercher par nom"
          />
        </div>
      </form>
    </div>
  );

  const artistMeetingsContent = loading ? (
    <div className="text-center">Chargement...</div>
  ) : error ? (
    <div className="text-red-500 text-center">{error}</div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMeetings.map((meeting, index) => (
        <InfoCard
          key={index}
          title={meeting.acf.nom}
          description={meeting.acf.description}
          image={meeting.acf.photo}
          additionalInfo={`Date: ${meeting.acf.date}, Heure: ${meeting.acf.heure}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type}, Durée: ${meeting.acf.duree} heures`}
          type="meeting"
        />
      ))}
    </div>
  );

  return (
    <ArtistMeetingsPageTemplate
      title={<Text content="Rencontres avec les Artistes" type="h1" className="h1-class text-center mb-6" />}
      filters={filterSection}
      artistMeetings={artistMeetingsContent}
    />
  );
};

export default ArtistMeetingsPage;
