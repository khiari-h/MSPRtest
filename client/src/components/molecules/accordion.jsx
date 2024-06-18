import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button onClick={toggleOpen} className="accordion-title">
        {title} <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
