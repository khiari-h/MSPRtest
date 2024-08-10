import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammingPage from '../../../components/pages/ProgrammingPage';

jest.mock('../../../components/organisms/ProgrammingOrganisms/ConcertProgramming', () => () => <div>Concerts Programming</div>);
jest.mock('../../../components/organisms/ProgrammingOrganisms/ArtistMeeting', () => () => <div>Artist Meeting</div>);
jest.mock('../../../components/organisms/ProgrammingOrganisms/Workshops', () => () => <div>Workshops</div>);

describe('ProgrammingPage', () => {
  test('renders ConcertsProgramming by default', () => {
    render(<ProgrammingPage />);

    expect(screen.getByText('Concerts Programming')).toBeInTheDocument();
  });

  test('renders Workshops when the workshops section is selected', () => {
    render(<ProgrammingPage />);

    fireEvent.click(screen.getByText('Ateliers'));

    expect(screen.getByText('Workshops')).toBeInTheDocument();
  });

  test('renders ArtistMeeting when the artist meetings section is selected', () => {
    render(<ProgrammingPage />);

    fireEvent.click(screen.getByText('Rencontres avec les Artistes'));

    expect(screen.getByText('Artist Meeting')).toBeInTheDocument();
  });

  test('calls the correct section when a button is clicked', () => {
    const { container } = render(<ProgrammingPage />);

    fireEvent.click(screen.getByText('Ateliers'));
    expect(container.textContent).toContain('Workshops');

    fireEvent.click(screen.getByText('Rencontres avec les Artistes'));
    expect(container.textContent).toContain('Artist Meeting');

    fireEvent.click(screen.getByText('Concerts'));
    expect(container.textContent).toContain('Concerts Programming');
  });
});
