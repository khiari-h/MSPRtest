import React, { useState, Suspense, lazy } from 'react';
import ProgrammingPageTemplate from '../templates/ProgrammingPageTemplate';

// Importer les composants dynamiquement
const ConcertsProgramming = lazy(() => import('../organisms/ProgrammingOrganisms/ConcertProgramming'));
const ArtistMeeting = lazy(() => import('../organisms/ProgrammingOrganisms/ArtistMeeting'));
const Workshops = lazy(() => import('../organisms/ProgrammingOrganisms/Workshops'));

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
      <Suspense fallback={<div>Loading...</div>}>
        {renderSection()}
      </Suspense>
    </ProgrammingPageTemplate>
  );
};

export default ProgrammingPage;
