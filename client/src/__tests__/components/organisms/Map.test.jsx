// src/__tests__/components/organisms/Map.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Map from '../../../components/organisms/Map';

jest.mock('axios');

const mockData = [
  {
    id: 1,
    title: { rendered: 'Point 1' },
    acf: {
      Latitude: 48.8566,
      Longitude: 2.3522,
      Categorie: 'Scène',
      Description: 'Description 1',
    },
  },
  {
    id: 2,
    title: { rendered: 'Point 2' },
    acf: {
      Latitude: 48.8576,
      Longitude: 2.3532,
      Categorie: 'Buvettes',
      Description: 'Description 2',
    },
  },
];

axios.get.mockResolvedValue({ data: mockData });

describe('Map Component', () => {
  test('renders Map component and checks for elements', async () => {
    render(<Map />);

    // Vérifie que le titre de la carte est présent
    expect(screen.getByText(/Carte du Festival/i)).toBeInTheDocument();

    // Vérifie que les catégories sont présentes
    const categories = ['Tous', 'Scènes', 'Shops', 'Buvettes', 'WC', 'Restaurants'];
    categories.forEach((category) => {
      expect(screen.getByLabelText(new RegExp(category, 'i'))).toBeInTheDocument();
    });

    // Vérifie que le menu de sélection du point de départ est présent
    expect(screen.getByLabelText(/point de départ/i)).toBeInTheDocument();

    // Vérifie que le menu de sélection du point d'arrivée est présent
    expect(screen.getByLabelText(/point d'arrivée/i)).toBeInTheDocument();

    // Attendre que les points d'intérêt soient chargés et affichés sur la carte
    await waitFor(() => {
      mockData.forEach((point) => {
        expect(screen.getAllByText(point.title.rendered).length).toBeGreaterThan(0);
      });
    });
  });
});
