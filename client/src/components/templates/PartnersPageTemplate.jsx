import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const PartnersPageTemplate = ({ permanentPartners, newPartners, cta }) => {
  return (
    <div>
      <Header />
      {permanentPartners}
      {newPartners}
      {cta}
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
