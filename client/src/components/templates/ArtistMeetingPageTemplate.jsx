import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const ArtistMeetingsPageTemplate = ({ artistMeetings }) => {
  return (
    <div>
      <Header />
      {artistMeetings}
      <Footer />
    </div>
  );
};

ArtistMeetingsPageTemplate.propTypes = {
  artistMeetings: PropTypes.node.isRequired,
};

export default ArtistMeetingsPageTemplate;
