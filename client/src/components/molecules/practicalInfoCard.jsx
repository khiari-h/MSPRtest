// src/components/molecules/PracticalInfoCard.js
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/text';

const PracticalInfoCard = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6">
      <Text content={title} type="h3" className="text-xl font-semibold mb-2" />
      <div className="text-gray-700">{content}</div>
    </div>
  );
};

PracticalInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default PracticalInfoCard;
