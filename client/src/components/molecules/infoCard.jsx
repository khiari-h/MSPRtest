import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const InfoCard = ({ title, description, image, additionalInfo, link, type }) => {
  return (
    <div className={`bg-concert-bg-beige rounded-lg shadow-md mb-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col ${type === 'schedule' ? 'border-l-4 border-custom-blue-500' : ''}`} role="article" aria-labelledby={`info-card-title-${title}`}>
      <img src={image} alt={title} className="w-full h-48 object-cover border-b border-border-gray" />
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <Text type="h3" content={title} className="mb-2 h3-class" />
        <Text type="p" content={description} className="mb-4 flex-grow p-class" />
        {additionalInfo && <Text type="p" content={additionalInfo} className="text-sm mb-2 p-class" />}
        {link && <a href={link} className="a-class" aria-label={`En savoir plus sur ${title}`}>En savoir plus</a>}
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
