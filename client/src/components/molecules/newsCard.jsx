import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col m-4 border-l-4 border-concert-accent p-4">
      <div className="flex flex-col justify-between flex-grow">
        <h3 className="font-concert-title text-2xl text-concert-text mb-2">{title}</h3>
        <p className="font-concert-body text-base text-gray-700 mb-4">{description}</p>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NewsCard;
