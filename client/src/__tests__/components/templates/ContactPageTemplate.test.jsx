// src/__tests__/components/templates/ContactPageTemplate.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPageTemplate from '../../../components/templates/ContactPageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('ContactPageTemplate', () => {
  test('affiche le Header et le Footer', () => {
    render(<ContactPageTemplate contactForm={<div>Contact Form</div>} />);
    
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('affiche le formulaire de contact', () => {
    render(<ContactPageTemplate contactForm={<div>Contact Form</div>} />);
    
    expect(screen.getByText(/Contact Form/i)).toBeInTheDocument();
  });
});
