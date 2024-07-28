import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from '../../../components/pages/ContactPage';
import ContactPageTemplate from '../../../components/templates/ContactPageTemplate';
import ContactForm from '../../../components/organisms/ContactForm';

jest.mock('../../../components/templates/ContactPageTemplate', () => ({ contactForm }) => (
  <div>
    <div>ContactPageTemplate Header</div>
    {contactForm}
    <div>ContactPageTemplate Footer</div>
  </div>
));

jest.mock('../../../components/organisms/ContactForm', () => () => <div>ContactForm</div>);

describe('ContactPage', () => {
  test('rend le ContactPageTemplate avec le formulaire de contact', () => {
    render(<ContactPage />);
    
    expect(screen.getByText(/ContactPageTemplate Header/i)).toBeInTheDocument();
    expect(screen.getByText(/ContactForm/i)).toBeInTheDocument();
    expect(screen.getByText(/ContactPageTemplate Footer/i)).toBeInTheDocument();
  });
});
