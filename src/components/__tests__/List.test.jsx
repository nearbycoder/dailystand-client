import React from 'react';
import { render, screen } from '@testing-library/react';
 
import List from '../List';
 
describe('List', () => {
  test('renders List component with children', () => {
    render(<List><div>example render</div></List>);

    expect(screen.getByText(/example render/)).toBeInTheDocument();
  });
});