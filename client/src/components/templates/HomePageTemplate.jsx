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
        <section aria-labelledby="actualites-mises-a-jour">
  {newsAndUpdates}
</section>
<section aria-labelledby="aperçu-concerts">
  {concertsOverview}
</section>
<section aria-labelledby="aperçu-programmation">
  {ProgrammingOverview}
</section>
<section aria-labelledby="cta-avant-carte">
  {ctaBeforeMap}
</section>
<section aria-labelledby="infos-pratiques">
  {practicalInfo}
</section>
<section aria-labelledby="carte">
  {map}
</section>
<section aria-labelledby="cta-apres-carte">
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
  ctaBeforeMap: PropTypes.node.isRequired,
  practicalInfo: PropTypes.node.isRequired,
  map: PropTypes.node.isRequired,
  ctaAfterMap: PropTypes.node.isRequired,
};

export default HomePageTemplate;
