import React from 'react';
import { render, screen } from '@testing-library/react';
import ConcertsDetailsPageTemplate from '../../../components/templates/ConcertsDetailsPageTemplate';

jest.mock('../../../components/organisms/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Mocked Footer</div>);

describe('ConcertsDetailsPageTemplate', () => {
  test('renders the template with filters and concerts sections', () => {
    const filters = <div data-testid="filters">Filters Section</div>;
    const concerts = <div data-testid="concerts">Concerts Section</div>;

    render(<ConcertsDetailsPageTemplate filters={filters} concerts={concerts} />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('concerts')).toBeInTheDocument();
  });

  test('renders the header and footer', () => {
    const filters = <div />;
    const concerts = <div />;

    render(<ConcertsDetailsPageTemplate filters={filters} concerts={concerts} />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument(); // Vérifie la présence du Header mocké
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument(); // Vérifie la présence du Footer mocké
  });
});
