import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../../../components/molecules/NewsCard';

test('renders NewsCard with title and description', () => {
  render(
    <NewsCard title="Breaking News" description="This is a breaking news description" />
  );

  expect(screen.getByText(/breaking news/i)).toBeInTheDocument();
  expect(screen.getByText(/this is a breaking news description/i)).toBeInTheDocument();
});
