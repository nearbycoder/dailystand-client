import React from 'react';
import { render } from '@testing-library/react';
import Counter from '../Counter';

describe('This will test Counter', () => {
  test('renders message', () => {
    const { getByText } = render(<Counter />);

    expect(getByText('Test')).toHaveTextContent('Test');
  });
});
