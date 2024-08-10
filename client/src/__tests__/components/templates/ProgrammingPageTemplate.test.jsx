import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammingPageTemplate from '../../../components/templates/ProgrammingPageTemplate';

jest.mock('../../../components/organisms/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Mocked Footer</div>);
jest.mock('../../../components/atoms/Button', () => ({ label, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {label}
  </button>
));

describe('ProgrammingPageTemplate', () => {
  test('renders the template with header, footer, and buttons', () => {
    const onSectionChange = jest.fn();

    render(
      <ProgrammingPageTemplate
        currentSection="concerts"
        onSectionChange={onSectionChange}
      >
        <div data-testid="section-content">Section Content</div>
      </ProgrammingPageTemplate>
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
    expect(screen.getByText('Programmation du Festival')).toBeInTheDocument();
    expect(screen.getByText('Concerts')).toBeInTheDocument();
    expect(screen.getByText('Ateliers')).toBeInTheDocument();
    expect(screen.getByText('Rencontres avec les Artistes')).toBeInTheDocument();
    expect(screen.getByTestId('section-content')).toBeInTheDocument();
  });

  test('calls onSectionChange with the correct section when a button is clicked', () => {
    const onSectionChange = jest.fn();

    render(
      <ProgrammingPageTemplate
        currentSection="concerts"
        onSectionChange={onSectionChange}
      >
        <div>Section Content</div>
      </ProgrammingPageTemplate>
    );

    fireEvent.click(screen.getByText('Ateliers'));
    expect(onSectionChange).toHaveBeenCalledWith('workshops');

    fireEvent.click(screen.getByText('Rencontres avec les Artistes'));
    expect(onSectionChange).toHaveBeenCalledWith('artistMeetings');
  });

  test('applies the active class to the currently selected section button', () => {
    const onSectionChange = jest.fn();

    render(
      <ProgrammingPageTemplate
        currentSection="workshops"
        onSectionChange={onSectionChange}
      >
        <div>Section Content</div>
      </ProgrammingPageTemplate>
    );

    expect(screen.getByText('Ateliers')).toHaveClass('active');
    expect(screen.getByText('Concerts')).not.toHaveClass('active');
    expect(screen.getByText('Rencontres avec les Artistes')).not.toHaveClass('active');
  });
});
