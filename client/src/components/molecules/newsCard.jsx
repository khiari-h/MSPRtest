import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col m-4 border-l-4 border-red-500">
      <div className="p-4 flex flex-col justify-between flex-grow bg-soft-beige">
        <h3 className="font-headline text-2xl text-red-500 mb-2">{title}</h3>
        <p className="font-concert text-base text-gray-700 mb-4 flex-grow">{description}</p>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NewsCard;
