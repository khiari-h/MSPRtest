import React from 'react';
import PropTypes from 'prop-types';

const PartnerCard = ({ name, logo, link, description, category, isPrincipal }) => {
  return (
    <a href={link} className={`partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center ${isPrincipal ? 'border-4 border-yellow-500' : ''}`}>
      {logo ? (
        <img src={logo} alt={name} className="mx-auto mb-4 h-24" />
      ) : (
        <div className="mx-auto mb-4 h-24 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-1">Catégorie: {category}</p>
    </a>
  );
};

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isPrincipal: PropTypes.bool,
};

export default PartnerCard;
