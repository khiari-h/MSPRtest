// GeolocationButton.js
import React from 'react';

const GeolocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="geolocation-button">
      📍
    </button>
  );
};

export default GeolocationButton;
