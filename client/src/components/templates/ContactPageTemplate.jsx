import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const ContactPageTemplate = ({ contactForm }) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Contactez-nous" type="h1" className="h1-class text-center mb-6" />
        {contactForm}
      </main>
      <Footer />
    </div>
  );
};

ContactPageTemplate.propTypes = {
  contactForm: PropTypes.node.isRequired,
};

export default ContactPageTemplate;
