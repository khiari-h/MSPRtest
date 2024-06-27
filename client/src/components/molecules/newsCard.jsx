// src/components/molecules/NewsCard.js
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/text';

const NewsCard = ({ title, description, date, link }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Text content={title} type="h3" className="text-xl font-bold mb-2" />
      <Text content={description} type="p" className="mb-4" />
      <Text content={date} type="p" className="text-gray-500 mb-4" />
      <a href={link} className="text-blue-500 hover:text-blue-700" aria-label={`Read more about ${title}`}>
        Lire plus
      </a>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NewsCard;
