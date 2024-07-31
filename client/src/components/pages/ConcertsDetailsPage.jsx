import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import ConcertsDetailsPageTemplate from '../templates/ConcertsDetailsPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';

const ConcertsDetailsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [dates, setDates] = useState([]);
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({ date: '', venue: '', search: '' });

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/concerts');
        const concertsData = response.data;

        // Fetch media details for each concert
        const concertsWithImages = await Promise.all(concertsData.map(async concert => {
          if (concert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`);
            concert.acf.photo = mediaResponse.data.source_url;
          }
          return concert;
        }));

        setConcerts(concertsWithImages);
        setDates([...new Set(concertsWithImages.map(concert => concert.acf.date))]);
        setVenues([...new Set(concertsWithImages.map(concert => concert.acf.lieu))]);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
      }
    };

    fetchConcerts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredConcerts = concerts.filter(concert => {
    return (
      (filters.date === '' || concert.acf.date === filters.date) &&
      (filters.venue === '' || concert.acf.lieu === filters.venue) &&
      (filters.search === '' || concert.acf.nom.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <select
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes les dates</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Lieu</label>
          <select
            id="venue"
            name="venue"
            value={filters.venue}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous les lieux</option>
            {venues.map((venue, index) => (
              <option key={index} value={venue}>{venue}</option>
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

  const concertsSection = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredConcerts.map((concert, index) => (
        <InfoCard
          key={index}
          title={concert.acf.nom}
          description={concert.acf.description}
          image={concert.acf.photo} // Utilise directement l'URL de l'image
          additionalInfo={`Date: ${concert.acf.date}, Heure: ${concert.acf.heure}, Lieu: ${concert.acf.lieu}`}
          type="program"
        />
      ))}
    </div>
  );

  return (
    <ConcertsDetailsPageTemplate
      filters={filterSection}
      concerts={concertsSection}
    />
  );
};

export default ConcertsDetailsPage;
