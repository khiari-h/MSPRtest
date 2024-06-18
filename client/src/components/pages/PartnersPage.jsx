// src/components/pages/PartnersPage.js
import React from 'react';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import Text from '../atoms/text';
import PartnerCard from '../molecules/partnersCard';
import { permanentPartners, newPartners } from '../../data/partnersData';
import './partnersPage.css';

const PartnersPage = () => {
  return (
    <div>
      <Header />
      <div className="partners-page container mx-auto py-8">
        <Text content="Nos Partenaires" type="h1" className="text-3xl font-bold mb-8 text-center" />
        <Text content="Nous remercions chaleureusement tous nos partenaires pour leur soutien. Avec leur aide, nous pouvons offrir une expérience exceptionnelle à tous nos festivaliers." type="p" className="text-center mb-6" />

        <div className="partners-section mb-12">
          <Text content="Partenaires Permanents" type="h2" className="text-2xl font-bold mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {permanentPartners.map((partner, index) => (
              <PartnerCard key={index} name={partner.name} logo={partner.logo} link={partner.link} description={partner.description} />
            ))}
          </div>
        </div>

        <div className="partners-section mb-12">
          <Text content="Nouveaux Partenaires" type="h2" className="text-2xl font-bold mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newPartners.map((partner, index) => (
              <PartnerCard key={index} name={partner.name} logo={partner.logo} link={partner.link} description={partner.description} />
            ))}
          </div>
        </div>

        <div className="cta-section mt-12 text-center">
          <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="text-2xl font-bold mb-4" />
          <a href="/contact" className="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Contactez-nous</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnersPage;
