import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
