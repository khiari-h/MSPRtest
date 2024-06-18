// src/components/molecules/PracticalInfoCard.js
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/text';

const PracticalInfoCard = ({ title, content }) => {
  return (
    <div className="practical-info-card">
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
