import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ title, description, image, additionalInfo, link, type }) => {
  return (
    <div className={`bg-soft-beige rounded-lg shadow-md mb-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col ${type === 'schedule' ? 'border-l-4 border-blue-500' : ''}`} role="article" aria-labelledby={`info-card-title-${title}`}>
      <img src={image} alt={`Image de ${title}`} className="w-full h-48 object-cover border-b border-gray-200" />
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <h3 id={`info-card-title-${title}`} className="font-concert text-xl text-gray-900 mb-2">{title}</h3>
        <p className="font-concert text-base text-gray-700 mb-4 flex-grow">{description}</p>
        {additionalInfo && <p className="font-concert text-sm text-gray-500 mb-2">{additionalInfo}</p>}
        {link && <a href={link} className="font-concert text-blue-500 hover:text-blue-700 font-bold" aria-label={`En savoir plus sur ${title}`}>En savoir plus</a>}
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
