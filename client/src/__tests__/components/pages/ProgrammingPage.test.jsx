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

    fireEvent.click(screen.getAllByText('Ateliers')[0]); // Utilisation de getAllByText pour éviter la confusion
    expect(screen.getByText('Workshops')).toBeInTheDocument();
  });

  test('renders ArtistMeeting when the artist meetings section is selected', () => {
    render(<ProgrammingPage />);

    fireEvent.click(screen.getAllByText('Rencontres avec les Artistes')[0]); // Utilisation de getAllByText pour éviter la confusion
    expect(screen.getByText('Artist Meeting')).toBeInTheDocument();
  });

  test('calls the correct section when a button is clicked', () => {
    const { container } = render(<ProgrammingPage />);

    fireEvent.click(screen.getAllByText('Ateliers')[0]); // Utilisation de getAllByText pour éviter la confusion
    expect(container.textContent).toContain('Workshops');

    fireEvent.click(screen.getAllByText('Rencontres avec les Artistes')[0]); // Utilisation de getAllByText pour éviter la confusion
    expect(container.textContent).toContain('Artist Meeting');

    fireEvent.click(screen.getAllByText('Concerts')[1]); // Choisir le deuxième "Concerts" pour éviter le lien de navigation
    expect(container.textContent).toContain('Concerts Programming');
  });
});
