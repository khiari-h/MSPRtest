// src/components/molecules/InfoCard.js
import React from 'react';
import PropTypes from 'prop-types';
import './infoCard.css';  // Import du fichier CSS

const InfoCard = ({ title, description, image, additionalInfo, link, type }) => {
  return (
    <div className={`card ${type === 'schedule' ? 'border-l-4 border-blue-500' : ''}`} role="article" aria-labelledby={`info-card-title-${title}`}>
      <img src={image} alt={`Image de ${title}`} className="card-image"/>
      <div className="card-content">
        <h3 id={`info-card-title-${title}`} className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {additionalInfo && <p className="card-additional-info">{additionalInfo}</p>}
        {link && <a href={link} className="card-link" aria-label={`En savoir plus sur ${title}`}>En savoir plus</a>}
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
