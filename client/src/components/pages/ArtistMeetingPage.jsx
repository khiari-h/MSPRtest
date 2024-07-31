import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtistMeetingsPageTemplate from '../templates/ArtistMeetingPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';

const ArtistMeetingsPage = () => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ type: '', search: '' });
  const [artistTypes, setArtistTypes] = useState([]);

  useEffect(() => {
    const fetchArtistMeetings = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/artists_meetings');
        const meetingsData = response.data;
        console.log("Meetings data received:", meetingsData);

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

        const types = Array.from(new Set(meetingsWithImages.map(meeting => meeting.acf.type))).filter(Boolean);
        setArtistTypes(types);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredMeetings = artistMeetings.filter(meeting => {
    return (
      (filters.type === '' || meeting.acf.type?.toLowerCase().includes(filters.type.toLowerCase())) &&
      (filters.search === '' || meeting.acf.nom.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type d'Artiste</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous les types</option>
            {artistTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Recherche</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Rechercher par nom"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </form>
    </div>
  );

  // Transformation des données en composant InfoCard pour le template
  const artistMeetingsContent = loading ? (
    <div className="text-center">Chargement...</div>
  ) : error ? (
    <div className="text-red-500 text-center">{error}</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMeetings.map((meeting, index) => (
        <InfoCard
          key={index}
          title={meeting.acf.nom}
          description={meeting.acf.description}
          image={meeting.acf.photo}
          additionalInfo={`Date: ${meeting.acf.date}, Heure: ${meeting.acf.heure}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type}`}
          type="meeting"
        />
      ))}
    </div>
  );

  return (
    <ArtistMeetingsPageTemplate
      title={<Text content="Rencontres avec les Artistes" type="h1" className="font-concert-title text-4xl text-center mb-6" />}
      filters={filterSection}
      artistMeetings={artistMeetingsContent}
    />
  );
};

export default ArtistMeetingsPage;
