import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig'; // Utilisation de la configuration Axios
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import InfoCard from '../molecules/infoCard';
import Text from '../atoms/text';

const ConcertsDetailsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [dates, setDates] = useState([]);
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({ date: '', venue: '', search: '' });

  useEffect(() => {
    axios.get('/api/concerts')
      .then(response => {
        setConcerts(response.data);
        // Extract unique dates and venues for the filter dropdowns
        setDates([...new Set(response.data.map(concert => concert.date))]);
        setVenues([...new Set(response.data.map(concert => concert.venue))]);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des concerts!", error);
      });
  }, []);

  // Handle filter changes and update the filter state
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter concerts based on the selected criteria
  const filteredConcerts = concerts.filter(concert => {
    return (
      (filters.date === '' || concert.date === filters.date) &&
      (filters.venue === '' || concert.venue === filters.venue) &&
      (filters.search === '' || concert.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8" aria-labelledby="all-concerts-details-heading">
        <Text content="Tous les Concerts et leur Planning" type="h1" className="text-3xl font-bold mb-6 text-center" id="all-concerts-details-heading" />
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcerts.map((concert, index) => (
            <InfoCard
              key={index}
              title={concert.name}
              description={concert.description}
              image={concert.image}
              additionalInfo={`Date: ${concert.date}, Heure: ${concert.time}, Lieu: ${concert.venue}`}
              type="program"
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConcertsDetailsPage;