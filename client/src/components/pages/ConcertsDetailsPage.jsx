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
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/concerts');
        const concertsData = response.data;

        const concertsWithImages = await Promise.all(concertsData.map(async concert => {
          if (concert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`);
            concert.acf.photo = mediaResponse.data.source_url;
          }
          // Formater la date et les heures ici
          concert.acf.date = formatDate(concert.acf.date);
          concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
          concert.acf.heurefin = formatTime(concert.acf.heurefin);
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
          <Text content="Date" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Toutes les dates</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Lieu" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="venue"
            name="venue"
            value={filters.venue}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Tous les lieux</option>
            {venues.map((venue, index) => (
              <option key={index} value={venue}>{venue}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Recherche" type="label" className="block text-sm font-medium text-charcoal" />
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Rechercher par nom"
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
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
          image={concert.acf.photo}
          additionalInfo={`Date: ${concert.acf.date}, Heure de début: ${concert.acf.heuredebut}, Heure de fin: ${concert.acf.heurefin}, Lieu: ${concert.acf.lieu}, Type: ${concert.acf.type}`}
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
