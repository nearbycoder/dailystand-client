import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import DashboardLayout from '../DashboardLayout';

describe('DashboardLayout', () => {
  test('renders DashboardLayout component with children', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DashboardLayout currentUser={{ email: 'nearbycoder@gmail.com' }}>
          <div>example render</div>
        </DashboardLayout>
      </MemoryRouter>
    );

    expect(screen.getByText(/example render/)).toBeInTheDocument();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <DashboardLayout
          currentUser={{ email: 'nearbycoder@gmail.com' }}></DashboardLayout>
      </MemoryRouter>
    );

  test('renders DashboardLayout component with avatar name', () => {
    renderComponent();

    expect(screen.getAllByText(/nearbycoder/).length).toBe(1);
  });

  test('clicking logout clears localStorage token', () => {
    localStorage.setItem('token', 'test1234');
    renderComponent();

    const logoutButton = screen.getByRole('button', { name: 'Logout' });

    fireEvent.click(logoutButton);
    expect(localStorage.getItem('token')).toBe(null);
  });

  test('toggle mobile navigation', async () => {
    renderComponent();

    expect(screen.getAllByText(/nearbycoder/).length).toBe(1);

    fireEvent.click(screen.getByTestId('open-sidebar'));

    expect(screen.getAllByText(/nearbycoder/).length).toBe(2);

    fireEvent.click(screen.getByTestId('close-sidebar'));

    await waitFor(() =>
      expect(screen.getAllByText(/nearbycoder/).length).toBe(1)
    );
  });
});
