import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const PartnersPageTemplate = ({ filters, partners, cta }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto">
          <Text content="Nos Partenaires" type="h1" className="text-3xl font-bold mb-6 text-center" />
          <div className="flex justify-center mb-6">
            {filters}
          </div>
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners}
            </div>
          </section>
          <div className="mt-12 text-center bg-yellow-100 p-6 rounded-lg shadow-lg">
            <Text content="Profitez de 10% de réduction chez nos partenaires principaux" type="h2" className="text-2xl font-bold mb-4" />
          </div>
          {cta}
        </div>
      </main>
      <Footer />
    </div>
  );
};

PartnersPageTemplate.propTypes = {
  filters: PropTypes.node.isRequired,
  partners: PropTypes.node.isRequired,
  cta: PropTypes.node.isRequired,
};

export default PartnersPageTemplate;
