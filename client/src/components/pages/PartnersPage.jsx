// src/components/pages/PartnersPage.js
import React from 'react';
import Header from '../organisms/header';
import PartnersList from '../organisms/partnersList';
import Footer from '../organisms/footer';

const partners = [
  { name: 'Partner 1', logo: 'partner1.png', category: 'Category 1' },
  { name: 'Partner 2', logo: 'partner2.png', category: 'Category 2' },
  // Ajoutez d'autres partenaires ici
];

const PartnersPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
        <PartnersList partners={partners} />
      </div>
      <Footer />
    </div>
  );
};

export default PartnersPage;
