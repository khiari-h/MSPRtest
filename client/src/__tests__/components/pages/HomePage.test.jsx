import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../../components/pages/HomePage';
import HomePageTemplate from '../../../components/templates/HomePageTemplate';
import HeroSection from '../../../components/organisms/HeroSection';
import NewsAndUpdates from '../../../components/organisms/NewsAndUpdates';
import ConcertsOverview from '../../../components/organisms/ConcertsOverview';
import ArtistMeetingsPreview from '../../../components/organisms/ArtistMeetingPreview';
import CTASection from '../../../components/molecules/CtaSection';
import PracticalInfo from '../../../components/organisms/PracticalInfo';
import Map from '../../../components/organisms/Map';

jest.mock('../../../components/templates/HomePageTemplate', () => ({
  heroSection,
  newsAndUpdates,
  concertsOverview,
  artistMeetingsPreview,
  ctaBeforeMap,
  practicalInfo,
  map,
  ctaAfterMap
}) => (
  <div>
    <div>HomePageTemplate Header</div>
    {heroSection}
    {newsAndUpdates}
    {concertsOverview}
    {artistMeetingsPreview}
    {ctaBeforeMap}
    {practicalInfo}
    {map}
    {ctaAfterMap}
    <div>HomePageTemplate Footer</div>
  </div>
));

jest.mock('../../../components/organisms/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('../../../components/organisms/NewsAndUpdates', () => () => <div>NewsAndUpdates</div>);
jest.mock('../../../components/organisms/ConcertsOverview', () => () => <div>ConcertsOverview</div>);
jest.mock('../../../components/organisms/ArtistMeetingPreview', () => () => <div>ArtistMeetingsPreview</div>);
jest.mock('../../../components/molecules/CTASection', () => ({ title, ctas }) => (
  <div>
    <h2>{title}</h2>
    <ul>
      {ctas.map((cta, index) => (
        <li key={index}><a href={cta.href}>{cta.label}</a></li>
      ))}
    </ul>
  </div>
));
jest.mock('../../../components/organisms/PracticalInfo', () => () => <div>PracticalInfo</div>);
jest.mock('../../../components/organisms/Map', () => () => <div>Map</div>);

describe('HomePage', () => {
  test('rend le HomePageTemplate avec tous les composants nécessaires', () => {
    render(<HomePage />);
    
    expect(screen.getByText(/HomePageTemplate Header/i)).toBeInTheDocument();
    expect(screen.getByText(/HeroSection/i)).toBeInTheDocument();
    expect(screen.getByText(/NewsAndUpdates/i)).toBeInTheDocument();
    expect(screen.getByText(/ConcertsOverview/i)).toBeInTheDocument();
    expect(screen.getByText(/ArtistMeetingsPreview/i)).toBeInTheDocument();
    expect(screen.getByText(/Réservez vos billets pour une expérience inoubliable!/i)).toBeInTheDocument();
    expect(screen.getByText(/PracticalInfo/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Nos Partenaires/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/HomePageTemplate Footer/i)).toBeInTheDocument();
  });
});
