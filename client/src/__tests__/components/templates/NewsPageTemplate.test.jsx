// src/__tests__/components/templates/NewsPageTemplate.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsPageTemplate from '../../../components/templates/NewsPageTemplate';
import Header from '../../../components/organisms/Header';
import Footer from '../../../components/organisms/Footer';

jest.mock('../../../components/organisms/Header', () => () => <div>Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Footer</div>);

describe('NewsPageTemplate', () => {
  test('affiche le Header et le Footer', () => {
    render(
      <NewsPageTemplate
        filters={<div>Filters</div>}
        newsItems={<div>NewsItems</div>}
      />
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('affiche les filtres et les éléments d\'actualités', () => {
    render(
      <NewsPageTemplate
        filters={<div>Filters</div>}
        newsItems={<div>NewsItems</div>}
      />
    );

    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/NewsItems/i)).toBeInTheDocument();
  });
});
