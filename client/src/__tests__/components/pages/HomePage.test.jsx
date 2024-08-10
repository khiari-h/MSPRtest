import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../../components/pages/HomePage';

jest.mock('../../../components/organisms/HeroSection', () => () => <div>Mocked Hero Section</div>);
jest.mock('../../../components/organisms/NewsAndUpdates', () => () => <div>Mocked News and Updates Section</div>);
jest.mock('../../../components/organisms/ConcertsOverview', () => () => <div>Mocked Concerts Overview Section</div>);
jest.mock('../../../components/organisms/ProgrammingOverview', () => () => <div>Mocked Programming Overview Section</div>);
jest.mock('../../../components/molecules/CtaSection', () => () => <div>Mocked CTA Section</div>);
jest.mock('../../../components/organisms/PracticalInfo', () => () => <div>Mocked Practical Info Section</div>);
jest.mock('../../../components/organisms/Map', () => () => <div>Mocked Map Section</div>);

describe('HomePage', () => {
  test('renders the HomePage with all sections', () => {
    render(<HomePage />);

    expect(screen.getByText('Mocked Hero Section')).toBeInTheDocument();
    expect(screen.getByText('Mocked News and Updates Section')).toBeInTheDocument();
    expect(screen.getByText('Mocked Concerts Overview Section')).toBeInTheDocument();
    expect(screen.getByText('Mocked Programming Overview Section')).toBeInTheDocument();
    expect(screen.getAllByText('Mocked CTA Section').length).toBe(2); // Since CTASection is used twice
    expect(screen.getByText('Mocked Practical Info Section')).toBeInTheDocument();
    expect(screen.getByText('Mocked Map Section')).toBeInTheDocument();
  });
});
