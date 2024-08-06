import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';



const HomePageTemplate = ({ heroSection, newsAndUpdates, concertsOverview, ProgrammingOverview, ctaBeforeMap, practicalInfo, map, ctaAfterMap }) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main>
        {heroSection}
        <section aria-labelledby="news-updates-heading">
          {newsAndUpdates}
        </section>
        <section aria-labelledby="concerts-overview-heading">
          {concertsOverview}
        </section>
        <section aria-labelledby="programming-overview-heading">
          {ProgrammingOverview}
        </section>
        <section aria-labelledby="cta-before-map-heading">
          {ctaBeforeMap}
        </section>
        <section aria-labelledby="practical-info-heading">
          {practicalInfo}
        </section>
        <section aria-labelledby="map-heading">
          {map}
        </section>
        <section aria-labelledby="cta-after-map-heading">
          {ctaAfterMap}
        </section>
      </main>
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
