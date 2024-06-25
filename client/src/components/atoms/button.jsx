// src/components/atoms/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, href, className }) => {
  const baseClasses = "inline-block font-bold text-center cursor-pointer rounded-full py-3 px-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} aria-label={label}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: 'bg-blue-500 hover:bg-white hover:text-blue-500 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl',
};

export default Button;
