import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageTemplate from '../../../components/templates/HomePageTemplate';

// Mock des composants Header et Footer
jest.mock('../../../components/organisms/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Mocked Footer</div>);

describe('HomePageTemplate', () => {
  test('renders all sections correctly', () => {
    const heroSection = <div data-testid="hero-section">Hero Section</div>;
    const newsAndUpdates = <div data-testid="news-updates">News and Updates Section</div>;
    const concertsOverview = <div data-testid="concerts-overview">Concerts Overview Section</div>;
    const programmingOverview = <div data-testid="programming-overview">Programming Overview Section</div>;
    const ctaBeforeMap = <div data-testid="cta-before-map">CTA Before Map Section</div>;
    const practicalInfo = <div data-testid="practical-info">Practical Info Section</div>;
    const map = <div data-testid="map">Map Section</div>;
    const ctaAfterMap = <div data-testid="cta-after-map">CTA After Map Section</div>;

    render(
      <HomePageTemplate
        heroSection={heroSection}
        newsAndUpdates={newsAndUpdates}
        concertsOverview={concertsOverview}
        ProgrammingOverview={programmingOverview}
        ctaBeforeMap={ctaBeforeMap}
        practicalInfo={practicalInfo}
        map={map}
        ctaAfterMap={ctaAfterMap}
      />
    );

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('news-updates')).toBeInTheDocument();
    expect(screen.getByTestId('concerts-overview')).toBeInTheDocument();
    expect(screen.getByTestId('programming-overview')).toBeInTheDocument();
    expect(screen.getByTestId('cta-before-map')).toBeInTheDocument();
    expect(screen.getByTestId('practical-info')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('cta-after-map')).toBeInTheDocument();
  });

  test('renders the header and footer', () => {
    render(
      <HomePageTemplate
        heroSection={<div />}
        newsAndUpdates={<div />}
        concertsOverview={<div />}
        ProgrammingOverview={<div />}
        ctaBeforeMap={<div />}
        practicalInfo={<div />}
        map={<div />}
        ctaAfterMap={<div />}
      />
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument(); // Vérifie que le Header mocké est rendu
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument(); // Vérifie que le Footer mocké est rendu
  });
});
