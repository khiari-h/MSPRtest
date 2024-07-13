import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 transition-all duration-300">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full px-4 py-2 text-lg font-bold text-left bg-gray-200 rounded-t-lg focus:outline-none transition-colors duration-300 hover:bg-gray-300"
        aria-expanded={isOpen}
      >
        {title}
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg text-gray-700">
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
