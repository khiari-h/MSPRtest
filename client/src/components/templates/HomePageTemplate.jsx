import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const HomePageTemplate = ({ heroSection, newsAndUpdates, concertsOverview, artistMeetingsPreview, ctaBeforeMap, practicalInfo, map, ctaAfterMap }) => {
  return (
    <div>
      <Header />
      {heroSection}
      {newsAndUpdates}
      {concertsOverview}
      {artistMeetingsPreview}
      {ctaBeforeMap}
      {practicalInfo}
      {map}
      {ctaAfterMap}
      <Footer />
    </div>
  );
};

HomePageTemplate.propTypes = {
  heroSection: PropTypes.node.isRequired,
  newsAndUpdates: PropTypes.node.isRequired,
  concertsOverview: PropTypes.node.isRequired,
  artistMeetingsPreview: PropTypes.node.isRequired,
  ctaBeforeMap: PropTypes.node.isRequired,
  practicalInfo: PropTypes.node.isRequired,
  map: PropTypes.node.isRequired,
  ctaAfterMap: PropTypes.node.isRequired,
};

export default HomePageTemplate;
