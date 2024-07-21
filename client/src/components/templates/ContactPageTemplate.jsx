import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const ContactPageTemplate = ({ contactForm }) => {
  return (
    <div>
      <Header />
      {contactForm}
      <Footer />
    </div>
  );
};

ContactPageTemplate.propTypes = {
  contactForm: PropTypes.node.isRequired,
};

export default ContactPageTemplate;
