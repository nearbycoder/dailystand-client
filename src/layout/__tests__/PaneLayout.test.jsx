import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PaneLayout from '../PaneLayout';

describe('PaneLayout', () => {
  test('renders PaneLayout component with children and pageTitle', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PaneLayout pageTitle="Test Page Title">
          <div>example render</div>
        </PaneLayout>
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Page Title/)).toBeInTheDocument();
    expect(screen.getByText(/example render/)).toBeInTheDocument();
  });

  test('renders PaneLayout component with 2 ghost elements when loading true', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PaneLayout loading={true}>
          <div>example render</div>
        </PaneLayout>
      </MemoryRouter>
    );

    expect(screen.queryByText(/example render/)).toBeNull();
    expect(screen.getAllByTestId('ghost-item').length).toBe(2);
  });
});
