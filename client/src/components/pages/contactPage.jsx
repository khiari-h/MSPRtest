import React from 'react';
import ContactForm from '../organisms/contactForm';
import Header from '../organisms/header';
import Footer from '../organisms/footer';

const ContactPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h1>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
