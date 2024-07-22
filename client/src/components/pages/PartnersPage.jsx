import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PartnersPageTemplate from '../templates/PartnersPageTemplate';
import Text from '../atoms/Text';
import PartnerCard from '../molecules/PartnersCard';

const PartnersPage = () => {
  const [permanentPartners, setPermanentPartners] = useState([]);
  const [newPartners, setNewPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://nationsounds.online/wp-json/wp/v2/partners')
      .then(response => {
        const partners = response.data;
        setPermanentPartners(partners.filter(partner => partner.acf.category === 'permanent'));
        setNewPartners(partners.filter(partner => partner.acf.category === 'new'));
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des partenaires!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      });
  }, []);

  const permanentPartnersSection = (
    <section className="mb-12" aria-labelledby="permanent-partners">
      <Text content="Partenaires Permanents" type="h2" id="permanent-partners" className="text-2xl font-bold mb-6 text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {permanentPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.acf.name}
            logo={partner.acf.logo}
            link={partner.acf.link}
            description={partner.acf.description}
          />
        ))}
      </div>
    </section>
  );

  const newPartnersSection = (
    <section className="mb-12" aria-labelledby="new-partners">
      <Text content="Nouveaux Partenaires" type="h2" id="new-partners" className="text-2xl font-bold mb-6 text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.acf.name}
            logo={partner.acf.logo}
            link={partner.acf.link}
            description={partner.acf.description}
          />
        ))}
      </div>
    </section>
  );

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
      permanentPartners={loading || error ? <p>{loading ? 'Chargement...' : error}</p> : permanentPartnersSection}
      newPartners={loading || error ? null : newPartnersSection}
      cta={loading || error ? null : ctaSection}
    />
  );
};

export default PartnersPage;
