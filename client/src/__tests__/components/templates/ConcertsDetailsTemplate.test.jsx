import React from 'react';
import { render, screen } from '@testing-library/react';
import ConcertsDetailsPageTemplate from '../../../components/templates/ConcertsDetailsPageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('ConcertsDetailsPageTemplate', () => {
  test('affiche les sections de filtre et de concerts', () => {
    render(
      <ConcertsDetailsPageTemplate
        filters={<div>Filters</div>}
        concerts={<div>Concerts</div>}
      />
    );

    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    const concertElements = screen.getAllByText(/Concerts/i);
    expect(concertElements.length).toBeGreaterThan(0);
  });
});
