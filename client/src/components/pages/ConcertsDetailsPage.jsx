import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import ConcertsDetailsPageTemplate from '../templates/ConcertsDetailsPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';

const ConcertsDetailsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filters, setFilters] = useState({ group: '', date: '', venue: '', type: '' });

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
        const response = await axios.get('/api/wordpress/concerts');
        const concertsData = response.data;

        const concertsWithDetails = await Promise.all(concertsData.map(async concert => {
          if (concert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`);
            concert.acf.photo = mediaResponse.data.source_url;
          }
          concert.acf.date = formatDate(concert.acf.date);
          concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
          concert.acf.heurefin = formatTime(concert.acf.heurefin);
          return concert;
        }));

        setConcerts(concertsWithDetails);
        setGroups([...new Set(concertsWithDetails.map(concert => concert.acf.nom))]);
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
      (filters.group === '' || concert.acf.nom === filters.group) &&
      (filters.date === '' || concert.acf.date === filters.date) &&
      (filters.venue === '' || concert.acf.lieu === filters.venue) &&
      (filters.type === '' || concert.acf.type === filters.type)
    );
  });

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4">
        <div className="w-full sm:w-auto">
          <Text content="Groupe" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="group"
            name="group"
            value={filters.group}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Tous les groupes</option>
            {groups.map((group, index) => (
              <option key={index} value={group}>{group}</option>
            ))}
          </select>
        </div>
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
            {[...new Set(concerts.map(concert => concert.acf.date))].map((date, index) => (
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
            {[...new Set(concerts.map(concert => concert.acf.lieu))].map((venue, index) => (
              <option key={index} value={venue}>{venue}</option>
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
            {[...new Set(concerts.map(concert => concert.acf.type))].map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
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
