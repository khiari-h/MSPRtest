import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../../../components/molecules/NewsCard';

test('renders NewsCard with title and description', () => {
  const { getAllByText } = render(
    <NewsCard title="Breaking News" description="This is a breaking news description" />
  );

  expect(getAllByText(/breaking news/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/this is a breaking news description/i)).toBeInTheDocument();
});
