import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnersPageTemplate from '../../../components/templates/PartnersPageTemplate';

// Mocking the Header and Footer components
jest.mock('../../../components/organisms/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Mocked Footer</div>);

describe('PartnersPageTemplate', () => {
  test('renders the template with filters, message, partners, and cta sections', () => {
    const filters = <div data-testid="filters">Filters Section</div>;
    const message = <div data-testid="message">Message Section</div>;
    const partners = <div data-testid="partners">Partners Section</div>;
    const cta = <div data-testid="cta">CTA Section</div>;

    render(
      <PartnersPageTemplate
        filters={filters}
        message={message}
        partners={partners}
        cta={cta}
      />
    );

    // Verify the presence of different sections
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByTestId('partners')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
  });

  test('renders the mocked header and footer', () => {
    render(
      <PartnersPageTemplate
        filters={<div />}
        partners={<div />}
        cta={<div />}
      />
    );

    // Verify that the mocked Header and Footer are rendered
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
