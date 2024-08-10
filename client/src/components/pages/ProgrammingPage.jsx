import React, { useState } from 'react';
import ProgrammingPageTemplate from '../templates/ProgrammingPageTemplate';
import ConcertsProgramming from '../organisms/ProgrammingOrganisms/ConcertProgramming';
import ArtistMeeting from '../organisms/ProgrammingOrganisms/ArtistMeeting';
import Workshops from '../organisms/ProgrammingOrganisms/Workshops';

const ProgrammingPage = () => {
  const [currentSection, setCurrentSection] = useState('concerts');

  const renderSection = () => {
    switch (currentSection) {
      case 'concerts':
        return <ConcertsProgramming />;
      case 'workshops':
        return <Workshops />;
      case 'artistMeetings':
        return <ArtistMeeting />;
      default:
        return null;
    }
  };

  return (
    <ProgrammingPageTemplate
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
    >
      {renderSection()}
    </ProgrammingPageTemplate>
  );
};

export default ProgrammingPage;
