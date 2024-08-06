import React, { useState } from 'react';
import ProgrammingPageTemplate from '../templates/ProgrammingPageTemplate';
import ConcertsProgramming from '../organisms/ProgrammingOrganisms/ConcertProgramming';
import ArtistMeetingPreview from '../organisms/ProgrammingOrganisms/ArtistMeetingPreview';
import WorkshopsOverview from '../organisms/ProgrammingOrganisms/WorkshopsOverview';

const ProgrammingPage = () => {
  const [currentSection, setCurrentSection] = useState('concerts');

  const renderSection = () => {
    switch (currentSection) {
      case 'concerts':
        return <ConcertsProgramming />;
      case 'workshops':
        return <WorkshopsOverview />;
      case 'artistMeetings':
        return <ArtistMeetingPreview />;
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
