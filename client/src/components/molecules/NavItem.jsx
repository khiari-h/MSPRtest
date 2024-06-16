// src/components/molecules/NavItem.js
import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ label, href, className }) => {
  return (
    <a
      href={href}
      className={`text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-bold transform transition duration-500 hover:scale-110 ${className}`}
    >
      {label}
    </a>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

NavItem.defaultProps = {
  className: '',
};

export default NavItem;
