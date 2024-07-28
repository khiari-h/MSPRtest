// src/__tests__/components/templates/ArtistMeetingsPageTemplate.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistMeetingsPageTemplate from '../../../components/templates/ArtistMeetingPageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('ArtistMeetingsPageTemplate', () => {
  test('affiche le Header et le Footer', () => {
    render(<ArtistMeetingsPageTemplate artistMeetings={<div>Test Content</div>} />);
    
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('affiche le contenu des réunions artistiques', () => {
    render(<ArtistMeetingsPageTemplate artistMeetings={<div>Test Content</div>} />);
    
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });
});
