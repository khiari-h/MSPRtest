import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';

const ConcertsProgramming = ({ apiEndpoint = 'https://nationsounds.online/wp-json/wp/v2/concerts' }) => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const concertsData = response.data;

        const concertsWithImages = await Promise.all(concertsData.map(async concert => {
          if (concert.acf && concert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`);
            concert.acf.photo = mediaResponse.data.source_url;
          }
          if (concert.acf) {
            concert.acf.date = formatDate(concert.acf.date);
          }
          return concert;
        }));

        setConcerts(concertsWithImages);
        setFilteredConcerts(concertsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [apiEndpoint]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filtered = concerts;
    if (filters.date) {
      filtered = filtered.filter(concert => concert.acf.date === filters.date);
    }
    if (filters.heuredebut) {
      filtered = filtered.filter(concert => concert.acf.heuredebut === filters.heuredebut);
    }
    if (filters.lieu) {
      filtered = filtered.filter(concert => concert.acf.lieu === filters.lieu);
    }
    if (filters.type) {
      filtered = filtered.filter(concert => concert.acf.type === filters.type);
    }
    setFilteredConcerts(filtered);
  }, [filters, concerts]);

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
            {[...new Set(concerts.map(concert => concert.acf.date))].map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Heure" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="heuredebut"
            name="heuredebut"
            value={filters.heuredebut}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Toutes les heures</option>
            {[...new Set(concerts.map(concert => concert.acf.heuredebut))].map((heure, index) => (
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
            {[...new Set(concerts.map(concert => concert.acf.lieu))].map((lieu, index) => (
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
            {[...new Set(concerts.map(concert => concert.acf.type))].map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );

  return (
    <section className="container mx-auto py-8" aria-labelledby="concerts-programming-heading">
      <Text content="Programmation des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" id="concerts-programming-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          {filterSection}
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
        </>
      )}
    </section>
  );
};

export default ConcertsProgramming;
