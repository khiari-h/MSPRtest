// src/components/molecules/NewsCard.js
import React from 'react';
import PropTypes from 'prop-types';
import './newsCard.css';  // Import du fichier CSS

const NewsCard = ({ title, description }) => {
  return (
    <div className="news-card">
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NewsCard;
