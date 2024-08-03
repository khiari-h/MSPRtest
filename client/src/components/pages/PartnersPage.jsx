import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
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

  const filters = (
    <div className="flex justify-center mb-6">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryChange(category)}
          className={`${
            selectedCategory === category ? 'bg-custom-blue-700' : 'bg-custom-blue-500'
          } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-custom-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
          aria-pressed={selectedCategory === category}
          aria-label={`Afficher les partenaires de catégorie ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const partnersSection = (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.acf.nom}
            logo={partner.acf.logoUrl}
            link={partner.acf.lien}
            description={partner.acf.description}
            category={partner.acf.categorie}
            isPrincipal={partner.acf.principal}
          />
        ))}
      </div>
    </section>
  );

  const ctaSection = (
    <div className="mt-12 text-center">
      <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="h2-class mb-4" aria-label="Vous souhaitez devenir partenaire ?" />
      <a href="/contact" className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" aria-label="Contactez-nous pour devenir partenaire">
        Contactez-nous
      </a>
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
