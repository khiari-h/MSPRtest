import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ title, description, image, additionalInfo, link, type }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${type === 'schedule' ? 'border-l-4 border-blue-500' : ''}`}>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${type === 'schedule' ? 'text-blue-500' : 'text-black'}`}>{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        {additionalInfo && <p className="text-gray-600 mb-4">{additionalInfo}</p>}
        {link && <a href={link} className="text-blue-500 hover:text-blue-700 font-bold">En savoir plus</a>}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
};

export default InfoCard;
