// src/__tests__/components/templates/PartnersPageTemplate.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnersPageTemplate from '../../../components/templates/PartnersPageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('PartnersPageTemplate', () => {
  test('affiche le Header et le Footer', () => {
    render(
      <PartnersPageTemplate
        permanentPartners={<div>PermanentPartners</div>}
        newPartners={<div>NewPartners</div>}
        cta={<div>CTA</div>}
      />
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('affiche les sections de partenaires et le CTA', () => {
    render(
      <PartnersPageTemplate
        permanentPartners={<div>PermanentPartners</div>}
        newPartners={<div>NewPartners</div>}
        cta={<div>CTA</div>}
      />
    );

    expect(screen.getByText(/PermanentPartners/i)).toBeInTheDocument();
    expect(screen.getByText(/NewPartners/i)).toBeInTheDocument();
    expect(screen.getByText(/CTA/i)).toBeInTheDocument();
  });
});
