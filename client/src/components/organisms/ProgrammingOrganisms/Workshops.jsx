import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', heure: '', lieu: '', type: '' });
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const workshopsPerPage = 6;
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(''); // Clear the status after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [status]);

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
        const workshopsData = response.data.map(workshop => ({
          ...workshop,
          date: formatDate(workshop.date),
          time: formatTime(workshop.time),
        }));

        setWorkshops(workshopsData);
        setFilteredWorkshops(workshopsData);
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
    setCurrentPage(1); // Reset to the first page when filters change
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
      filtered = filtered.filter(workshop => workshop.lieu === filters.lieu);
    }
    if (filters.type) {
      filtered = filtered.filter(workshop => workshop.type === filters.type);
    }
    setFilteredWorkshops(filtered);
  }, [filters, workshops]);

  const indexOfLastWorkshop = currentPage * workshopsPerPage;
  const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage;
  const currentWorkshops = filteredWorkshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredWorkshops.length / workshopsPerPage);

  const filterSection = (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="date" className="block text-sm font-medium text-charcoal">Date</label>
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
          <label htmlFor="heure" className="block text-sm font-medium text-charcoal">Heure</label>
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
          <label htmlFor="lieu" className="block text-sm font-medium text-charcoal">Lieu</label>
          <select
            id="lieu"
            name="lieu"
            value={filters.lieu}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-border-gray rounded-md text-black"
          >
            <option value="">Tous les lieux</option>
            {[...new Set(workshops.map(workshop => workshop.lieu))].map((lieu, index) => (
              <option key={index} value={lieu}>{lieu}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="type" className="block text-sm font-medium text-charcoal">Type</label>
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`/api/workshops/${formData.workshop}/participants`, {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
        });
        setStatus('Inscription réussie!');
        setFormData({ firstName: '', lastName: '', email: '', workshop: '' }); // Reset form fields
    } catch (error) {
        setStatus('Erreur lors de l\'inscription.');
    }
};


  const registrationForm = (
    <div className="my-4">
      <form className="flex flex-wrap justify-center space-x-4" onSubmit={handleSubscribe}>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-2 border border-border-gray rounded-md text-black w-full"
            required
          />
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-2 border border-border-gray rounded-md text-black w-full"
            required
          />
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-border-gray rounded-md text-black w-full"
            required
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            name="workshop"
            value={formData.workshop}
            onChange={handleInputChange}
            className="p-2 border border-border-gray rounded-md text-black w-full"
            required
          >
            <option value="">Sélectionnez un atelier</option>
            {workshops.map((workshop, index) => (
              <option key={index} value={workshop.id}>{workshop.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit" label="S'inscrire" className="bg-custom-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" />
      </form>
      {status && (
       <p className={`text-center ${status === 'Inscription réussie!' ? 'text-light-blue' : 'text-error-red'}`}>
       {status}
     </p>
     
      )}
    </div>
  );
  

  const paginationButtons = (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          label={index + 1}
          onClick={() => paginate(index + 1)}
          className={`${
            currentPage === index + 1 ? 'bg-blue-700' : 'bg-blue-500'
          } text-white py-2 px-4 rounded mx-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
        />
      ))}
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
          {registrationForm}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWorkshops.map((workshop, index) => (
              <InfoCard
                key={index}
                title={workshop.name}
                description={workshop.description}
                image={workshop.photo}
                additionalInfo={`Date: ${workshop.date}, Heure: ${workshop.time}, Lieu: ${workshop.lieu}, Durée: ${workshop.duration || 'Durée non spécifiée'} heures`}
                type="workshop"
                aria-label="Atelier"
              />
            ))}
          </div>
          {paginationButtons}
        </>
      )}
    </section>
  );
};

export default Workshops;
