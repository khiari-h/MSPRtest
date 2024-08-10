import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  // Test pour vérifier que l'image est rendue avec le src et l'alt corrects
  test('renders the image with src and alt', () => {
    render(<Image src="https://example.com/image.jpg" alt="Example Image" />);
    const imgElement = screen.getByAltText(/Example Image/i);
    expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  // Test pour vérifier que des classes supplémentaires passées en props sont appliquées
  test('applies additional classes passed as props', () => {
    render(<Image src="https://example.com/image.jpg" alt="Example Image" className="custom-class" />);
    const imgElement = screen.getByAltText(/Example Image/i);
    expect(imgElement).toHaveClass('custom-class');
  });
});
