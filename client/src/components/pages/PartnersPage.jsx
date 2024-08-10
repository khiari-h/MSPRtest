import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import PartnersPageTemplate from '../templates/PartnersPageTemplate';
import Text from '../atoms/Text';
import PartnerCard from '../molecules/PartnersCard';
import Button from '../atoms/Button';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('/api/wordpress/partners');
        const partnersData = response.data;

        // Récupérer les URLs des logos
        const partnersWithLogos = await Promise.all(partnersData.map(async (partner) => {
          if (partner.acf.logo) {
            try {
              const logoResponse = await axios.get(`/api/wordpress/media/${partner.acf.logo}`);
              return { ...partner, acf: { ...partner.acf, logoUrl: logoResponse.data.source_url } };
            } catch (logoError) {
              console.error("Erreur lors de la récupération du logo!", logoError);
              return { ...partner, acf: { ...partner.acf, logoUrl: '' } };
            }
          }
          return { ...partner, acf: { ...partner.acf, logoUrl: '' } };
        }));

        setPartners(partnersWithLogos);
        setFilteredPartners(partnersWithLogos);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const categories = ['Tous', ...new Set(partners.map(partner => partner.acf && partner.acf.categorie ? partner.acf.categorie : ''))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page
    if (category === 'Tous') {
      setFilteredPartners(partners);
    } else {
      setFilteredPartners(partners.filter(partner => partner.acf && partner.acf.categorie === category));
    }
  };

  // Get current partners for pagination
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);

  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filters = (
    <div className="flex justify-center mb-6 space-x-4">
      {categories.map((category, index) => (
        <Button
          key={index}
          label={category}
          onClick={() => handleCategoryChange(category)}
          isSelected={selectedCategory === category}
          aria-pressed={selectedCategory === category}
        />
      ))}
    </div>
  );

  const partnersSection = (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.acf.nom}
            logo={partner.acf.logoUrl}
            link={partner.acf.lien}
            description={partner.acf.description}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            label={index + 1}
            onClick={() => handleClick(index + 1)}
            isSelected={currentPage === index + 1}
            className="mx-1"
          />
        ))}
      </div>
    </section>
  );

  const ctaSection = (
    <div className="mt-12 text-center">
      <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="h2-class mb-4" aria-label="Vous souhaitez devenir partenaire ?" />
      <Button
        label="Envoyez-nous un email"
        onClick={() => window.location.href = 'mailto:partenariats@nationsounds.com'}
        className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        aria-label="Envoyez-nous un email pour devenir partenaire"
      />
    </div>
  );
  
  

  const messageSection = (
    <div className="bg-custom-yellow-500 p-4 rounded-lg mb-6 text-center">
      <Text content="Profitez de 10% de réduction chez nos partenaires principaux !" type="h2" className="text-xl font-semibold" />
    </div>
  );

  return (
    <PartnersPageTemplate
      filters={filters}
      partners={loading || error ? <p>{loading ? 'Chargement...' : error}</p> : partnersSection}
      cta={loading || error ? null : ctaSection}
      message={messageSection}
    />
  );
};

export default PartnersPage;
