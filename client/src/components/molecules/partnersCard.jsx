import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const PartnerCard = ({ name, logo, link, description, category, isPrincipal }) => {
  return (
    <a href={link} className={`partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center ${isPrincipal ? 'border-2 border-custom-yellow-500' : ''}`}>
      {logo ? (
        <img src={logo} alt={name} className="mx-auto mb-4 h-24" />
      ) : (
        <div className="mx-auto mb-4 h-24 bg-custom-gray flex items-center justify-center">
          <span className="text-custom-gray-500">No image</span>
        </div>
      )}
      <Text type="h3" content={name} className="text-xl font-semibold h3-class" />
      <Text type="p" content={description} className="mt-2 p-class" />
      <Text type="p" content={`Catégorie: ${category}`} className="text-sm p-class mt-1" />
    </a>
  );
};

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isPrincipal: PropTypes.bool.isRequired,
};

export default PartnerCard;
