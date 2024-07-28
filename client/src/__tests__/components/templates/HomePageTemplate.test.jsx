import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageTemplate from '../../../components/templates/HomePageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('HomePageTemplate', () => {
  test('affiche le Header et le Footer', () => {
    render(
      <HomePageTemplate
        heroSection={<div>HeroSection</div>}
        newsAndUpdates={<div>NewsAndUpdates</div>}
        concertsOverview={<div>ConcertsOverview</div>}
        artistMeetingsPreview={<div>ArtistMeetingsPreview</div>}
        ctaBeforeMap={<div>CTASection Before Map</div>}
        practicalInfo={<div>PracticalInfo</div>}
        map={<div>Map</div>}
        ctaAfterMap={<div>CTASection After Map</div>}
      />
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('affiche toutes les sections passées en prop', () => {
    render(
      <HomePageTemplate
        heroSection={<div>HeroSection</div>}
        newsAndUpdates={<div>NewsAndUpdates</div>}
        concertsOverview={<div>ConcertsOverview</div>}
        artistMeetingsPreview={<div>ArtistMeetingsPreview</div>}
        ctaBeforeMap={<div>CTASection Before Map</div>}
        practicalInfo={<div>PracticalInfo</div>}
        map={<div>Map</div>}
        ctaAfterMap={<div>CTASection After Map</div>}
      />
    );

    expect(screen.getByText(/HeroSection/i)).toBeInTheDocument();
    expect(screen.getByText(/NewsAndUpdates/i)).toBeInTheDocument();
    expect(screen.getByText(/ConcertsOverview/i)).toBeInTheDocument();
    expect(screen.getByText(/ArtistMeetingsPreview/i)).toBeInTheDocument();
    expect(screen.getByText(/CTASection Before Map/i)).toBeInTheDocument();
    expect(screen.getByText(/PracticalInfo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Map/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/CTASection After Map/i)).toBeInTheDocument();
  });
});
