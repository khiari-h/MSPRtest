import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const ArtistMeetingsPageTemplate = ({ title, filters, artistMeetings }) => {
  return (
    <div className="bg-soft-beige text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        {title}
        {filters}
        {artistMeetings}
      </main>
      <Footer />
    </div>
  );
};

ArtistMeetingsPageTemplate.propTypes = {
  title: PropTypes.node.isRequired,
  filters: PropTypes.node,
  artistMeetings: PropTypes.node.isRequired,
};

export default ArtistMeetingsPageTemplate;
