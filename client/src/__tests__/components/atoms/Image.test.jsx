import React from 'react';
import { render } from '@testing-library/react';
import Image from '../../../components/atoms/Image';


test('renders image with correct src and alt attributes', () => {
  const { getByAltText } = render(<Image src="image.jpg" alt="Sample image" />);
  
  // Vérifie que l'image a le bon src et alt
  const imgElement = getByAltText(/sample image/i);
  expect(imgElement).toHaveAttribute('src', 'image.jpg');
});
