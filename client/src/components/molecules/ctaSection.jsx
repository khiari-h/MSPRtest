// src/components/molecules/CTASection.js
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

const CTASection = ({ title, ctas }) => {
  return (
    <section className="cta-section text-center py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex justify-center">
        {ctas.map((cta, index) => (
          <Button
            key={index}
            label={cta.label}
            href={cta.href}
            className={cta.className}
          />
        ))}
      </div>
    </section>
  );
};

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
};

export default CTASection;