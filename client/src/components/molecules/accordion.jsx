import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full px-4 py-2 text-lg font-bold text-left bg-gray-100 rounded-t-lg focus:outline-none"
        aria-expanded={isOpen}
      >
        {title}
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
