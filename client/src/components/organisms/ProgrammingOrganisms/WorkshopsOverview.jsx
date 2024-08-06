import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';

const WorkshopsOverview = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', heure: '', lieu: '', type: '' });
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return timeStr;
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('/api/workshops');
        const workshopsData = response.data;

        const workshopsWithFormattedDates = workshopsData.map(workshop => {
          workshop.date = formatDate(workshop.date);
          workshop.time = formatTime(workshop.time);
          return workshop;
        });

        setWorkshops(workshopsWithFormattedDates);
        setFilteredWorkshops(workshopsWithFormattedDates);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filtered = workshops;
    if (filters.date) {
      filtered = filtered.filter(workshop => workshop.date === filters.date);
    }
    if (filters.heure) {
      filtered = filtered.filter(workshop => workshop.time === filters.heure);
    }
    if (filters.lieu) {
      filtered = filtered.filter(workshop => workshop.venue === filters.lieu);
    }
    if (filters.type) {
      filtered = filtered.filter(workshop => workshop.type === filters.type);
    }
    setFilteredWorkshops(filtered);
  }, [filters, workshops]);

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
            {[...new Set(workshops.map(workshop => workshop.date))].map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <Text content="Heure" type="label" className="block text-sm font-medium text-charcoal" />
          <select
            id="heure"
            name="heure"
            value={filters.heure}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Toutes les heures</option>
            {[...new Set(workshops.map(workshop => workshop.time))].map((heure, index) => (
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
            {[...new Set(workshops.map(workshop => workshop.venue))].map((lieu, index) => (
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
            {[...new Set(workshops.map(workshop => workshop.type))].map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );

  return (
    <section className="container mx-auto py-8" aria-labelledby="workshops-overview-heading">
      <Text content="Ateliers" type="h1" className="text-concert-title text-center" id="workshops-overview-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-error-red">{error}</p>}
      {!loading && !error && (
        <>
          {filterSection}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop, index) => (
              <InfoCard
                key={index}
                title={workshop.name}
                description={workshop.description}
                image={workshop.photo}
                additionalInfo={`Date: ${workshop.date}, Heure: ${workshop.time}, Lieu: ${workshop.venue}, Durée: ${workshop.duration || 'Durée non spécifiée'} heures`}
                type="workshop"
                aria-label="Atelier"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default WorkshopsOverview;
