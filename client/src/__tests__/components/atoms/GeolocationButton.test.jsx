import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GeolocationButton from '../../../components/atoms/GeolocationBouton';

describe('GeolocationButton Component', () => {
  // Test pour vérifier que le bouton de géolocalisation est rendu
  test('renders the geolocation button', () => {
    render(<GeolocationButton onClick={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /Localiser ma position/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // Test pour vérifier que la fonction onClick est appelée lorsque le bouton est cliqué
  test('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<GeolocationButton onClick={onClick} />);
    const buttonElement = screen.getByRole('button', { name: /Localiser ma position/i });
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
