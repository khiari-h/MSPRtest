import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import Text from '../atoms/text';
import PartnerCard from '../molecules/partnersCard';

const PartnersPage = () => {
  const [permanentPartners, setPermanentPartners] = useState([]);
  const [newPartners, setNewPartners] = useState([]);

  useEffect(() => {
    axios.get('/api/partners')
      .then(response => {
        const partners = response.data;
        setPermanentPartners(partners.filter(partner => partner.category === 'permanent'));
        setNewPartners(partners.filter(partner => partner.category === 'new'));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des partenaires!", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto">
          <Text content="Nos Partenaires" type="h1" className="text-3xl font-bold mb-8 text-center" aria-label="Nos Partenaires" />
          <Text content="Nous remercions chaleureusement tous nos partenaires pour leur soutien. Avec leur aide, nous pouvons offrir une expérience exceptionnelle à tous nos festivaliers." type="p" className="text-center mb-6" aria-label="Message de remerciement pour nos partenaires" />

          <section className="mb-12" aria-labelledby="permanent-partners">
            <Text content="Partenaires Permanents" type="h2" id="permanent-partners" className="text-2xl font-bold mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {permanentPartners.map((partner, index) => (
                <PartnerCard key={index} name={partner.name} logo={partner.logo} link={partner.link} description={partner.description} />
              ))}
            </div>
          </section>

          <section className="mb-12" aria-labelledby="new-partners">
            <Text content="Nouveaux Partenaires" type="h2" id="new-partners" className="text-2xl font-bold mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newPartners.map((partner, index) => (
                <PartnerCard key={index} name={partner.name} logo={partner.logo} link={partner.link} description={partner.description} />
              ))}
            </div>
          </section>

          <div className="mt-12 text-center">
            <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="text-2xl font-bold mb-4" aria-label="Vous souhaitez devenir partenaire ?" />
            <a href="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" aria-label="Contactez-nous pour devenir partenaire">
              Contactez-nous
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
