// src/components/atoms/Label.js
import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {text}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Label;
