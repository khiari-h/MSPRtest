import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const NewsPageTemplate = ({ filters, newsItems }) => {
  return (
    <div>
      <Header />
      {filters}
      {newsItems}
      <Footer />
    </div>
  );
};

NewsPageTemplate.propTypes = {
  filters: PropTypes.node.isRequired,
  newsItems: PropTypes.node.isRequired,
};

export default NewsPageTemplate;
