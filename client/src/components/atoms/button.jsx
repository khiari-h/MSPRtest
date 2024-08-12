import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, href, className = '', isSelected = false }) => {
  const baseClasses = "inline-block font-bold text-center cursor-pointer rounded-full py-3 px-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";
  const defaultClasses = "bg-light-blue hover:bg-white hover:text-light-blue text-white font-concert-body";
  const selectedClasses = "bg-light-blue";

  const combinedClasses = isSelected ? `${baseClasses} ${selectedClasses}` : `${baseClasses} ${defaultClasses}`;

  return href ? (
    <a
      href={href}
      className={`${combinedClasses} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {label}
    </a>
  ) : (
    <button onClick={onClick} className={`${combinedClasses} ${className}`} aria-label={label}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,  // Accepter à la fois string et number
  ]).isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default Button;
