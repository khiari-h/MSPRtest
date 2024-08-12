import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';

const ConcertsProgramming = ({ apiEndpoint = '/api/wordpress/concerts' }) => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  // Fonction pour formater la date en JJ/MM/AAAA
  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  // Récupération des concerts depuis l'API
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const concertsData = response.data.map(concert => ({
          ...concert.acf,
          date: formatDate(concert.acf.date),
        }));

        setConcerts(concertsData);
        setFilteredConcerts(concertsData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [apiEndpoint]);

  // Gestion des changements de filtres
  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  // Filtrage des concerts en fonction des filtres appliqués
  useEffect(() => {
    let filtered = concerts;
    if (filters.date) {
      filtered = filtered.filter(concert => concert.date === filters.date);
    }
    if (filters.heuredebut) {
      filtered = filtered.filter(concert => concert.heuredebut === filters.heuredebut);
    }
    if (filters.lieu) {
      filtered = filtered.filter(concert => concert.lieu === filters.lieu);
    }
    if (filters.type) {
      filtered = filtered.filter(concert => concert.type === filters.type);
    }
    setFilteredConcerts(filtered);
  }, [filters, concerts]);

  // Réinitialisation des filtres
  const resetFilters = () => {
    setFilters({ date: '', heuredebut: '', lieu: '', type: '' });
  };

  const filterKeys = ['date', 'heuredebut', 'lieu', 'type'];

  return (
    <section className="container mx-auto py-8" aria-labelledby="concerts-programming-heading">
      <Text content="Programmation des Concerts" type="h2" className="text-2xl font-bold mb-6 text-center" id="concerts-programming-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <Filter
            data={concerts}
            filters={filters}
            filterKeys={filterKeys}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConcerts.map((concert, index) => (
              <InfoCard
                key={index}
                title={concert.nom}
                description={concert.description}
                image={concert.photo || 'default.jpg'}
                additionalInfo={`Date: ${concert.date}, Heure de début: ${concert.heuredebut}, Heure de fin: ${concert.heurefin}, Lieu: ${concert.lieu}, Type: ${concert.type}`}
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
