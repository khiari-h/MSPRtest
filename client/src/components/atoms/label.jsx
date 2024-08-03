import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-concert-secondary">
      {text}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Label;
