// src/components/molecules/NewsCard.js
import React from 'react';
import PropTypes from 'prop-types';
import './newsCard.css';

const NewsCard = ({ title, description, image, link }) => {
  return (
    <div className="news-card">
      <img src={image} alt={`Image de ${title}`} className="news-card-image" />
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
        <a href={link} className="news-card-link" aria-label={`En savoir plus sur ${title}`}>En savoir plus</a>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NewsCard;
