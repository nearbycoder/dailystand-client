import React from 'react';
import { render, screen } from '@testing-library/react';

import SlideOver from '../SlideOver';

describe('SlideOver', () => {
  test('does not render when no open prop', () => {
    render(
      <SlideOver>
        <div>testing</div>
      </SlideOver>
    );

    expect(screen.queryByText(/testing/)).toBeNull();
  });

  test('does not render when open false', () => {
    render(
      <SlideOver open={false}>
        <div>testing</div>
      </SlideOver>
    );

    expect(screen.queryByText(/testing/)).toBeNull();
  });

  test('renders when open true', () => {
    render(
      <SlideOver open={true}>
        <div>slide test</div>
      </SlideOver>
    );

    expect(screen.queryByText(/slide test/)).toBeInTheDocument();
  });
});
