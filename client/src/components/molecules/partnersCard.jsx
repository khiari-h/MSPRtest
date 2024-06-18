import React from 'react';
import PropTypes from 'prop-types';

const PartnerCard = ({ name, logo, link }) => {
  return (
    <a href={link} className="partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center">
      <img src={logo} alt={name} className="mx-auto mb-4 h-24" />
      <h3 className="text-xl font-semibold">{name}</h3>
    </a>
  );
};

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PartnerCard;
