import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PartnersPageTemplate from '../templates/PartnersPageTemplate';
import Text from '../atoms/Text';
import PartnerCard from '../molecules/PartnersCard';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/partners');
        const partnersData = response.data;

        // Récupérer les URLs des logos
        const partnersWithLogos = await Promise.all(partnersData.map(async (partner) => {
          if (partner.acf.logo) {
            try {
              const logoResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${partner.acf.logo}`);
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
    if (category === 'Tous') {
      setFilteredPartners(partners);
    } else {
      setFilteredPartners(partners.filter(partner => partner.acf && partner.acf.categorie === category));
    }
  };

  const filters = categories.map((category, index) => (
    <button
      key={index}
      onClick={() => handleCategoryChange(category)}
      className={`${
        selectedCategory === category ? 'bg-blue-700' : 'bg-blue-500'
      } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
    >
      {category}
    </button>
  ));

  const partnersSection = filteredPartners.map((partner, index) => (
    <PartnerCard
      key={index}
      name={partner.acf.nom}
      logo={partner.acf.logoUrl}
      link={partner.acf.lien}
      description={partner.acf.description}
      category={partner.acf.categorie}
      isPrincipal={partner.acf.categorie === 'Partenaire Principal'}
    />
  ));

  const ctaSection = (
    <div className="mt-12 text-center">
      <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="text-2xl font-bold mb-4" aria-label="Vous souhaitez devenir partenaire ?" />
      <a href="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" aria-label="Contactez-nous pour devenir partenaire">
        Contactez-nous
      </a>
    </div>
  );

  return (
    <PartnersPageTemplate
      filters={loading || error ? <p>{loading ? 'Chargement...' : error}</p> : filters}
      partners={loading || error ? <p>{loading ? 'Chargement...' : error}</p> : partnersSection}
      cta={loading || error ? null : ctaSection}
    />
  );
};

export default PartnersPage;
