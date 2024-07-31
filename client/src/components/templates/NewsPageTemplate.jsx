import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const NewsPageTemplate = ({ title, filters, newsItems, pagination }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <Text content={title} type="h1" className="text-4xl font-bold mb-8 text-center text-primary-blue font-headline" />
        {filters}
        {newsItems}
        {pagination}
      </div>
      <Footer />
    </div>
  );
};

NewsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.node.isRequired,
  newsItems: PropTypes.node.isRequired,
  pagination: PropTypes.node.isRequired,
};

export default NewsPageTemplate;
