import React from 'react';
import ContactPageTemplate from '../templates/ContactPageTemplate';
import ContactForm from '../organisms/ContactForm';

const ContactPage = () => {
  return (
    <ContactPageTemplate
      contactForm={<ContactForm />}
    />
  );
};

export default ContactPage;
