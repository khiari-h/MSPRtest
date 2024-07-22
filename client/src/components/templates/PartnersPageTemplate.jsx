import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const PartnersPageTemplate = ({ permanentPartners, newPartners, cta }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto">
          {permanentPartners}
          {newPartners}
          {cta}
        </div>
      </main>
      <Footer />
    </div>
  );
};

PartnersPageTemplate.propTypes = {
  permanentPartners: PropTypes.node.isRequired,
  newPartners: PropTypes.node.isRequired,
  cta: PropTypes.node.isRequired,
};

export default PartnersPageTemplate;
