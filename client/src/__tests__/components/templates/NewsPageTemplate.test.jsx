import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsPageTemplate from '../../../components/templates/NewsPageTemplate';

jest.mock('../../../components/organisms/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../../components/organisms/Footer', () => () => <div>Mocked Footer</div>);

describe('NewsPageTemplate', () => {
  test('renders the template with title, filters, newsItems, and pagination sections', () => {
    const filters = <div data-testid="filters">Filters Section</div>;
    const newsItems = <div data-testid="newsItems">News Items Section</div>;
    const pagination = <div data-testid="pagination">Pagination Section</div>;

    render(
      <NewsPageTemplate
        title="Actualités"
        filters={filters}
        newsItems={newsItems}
        pagination={pagination}
      />
    );

    expect(screen.getByText('Actualités')).toBeInTheDocument();
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('newsItems')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('renders the header and footer', () => {
    const filters = <div />;
    const newsItems = <div />;
    const pagination = <div />;

    render(
      <NewsPageTemplate
        title="Actualités"
        filters={filters}
        newsItems={newsItems}
        pagination={pagination}
      />
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
