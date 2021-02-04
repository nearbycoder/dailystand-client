import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProjectListItem from '../ProjectListItem';

describe('ProjectListItem', () => {
  test('renders ProjectListItem component', () => {
    render(
      <ProjectListItem
        project={{
          id: '33',
          name: 'Nintendo',
          description: 'Best Games',
          createdAt: '2021-02-04T03:30:16Z',
          updatedAt: '2021-02-04T03:30:16Z',
        }}
      />
    );

    expect(screen.getByText(/Nintendo/)).toBeInTheDocument();
  });

  test('toggle Create Project side panel', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProjectListItem
          project={{
            id: '33',
            name: 'Nintendo',
            description: 'Best Games',
            createdAt: '2021-02-04T03:30:16Z',
            updatedAt: '2021-02-04T03:30:16Z',
          }}
        />
      </MockedProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('project-list-item'));
    });

    expect(
      screen.getByText(/Update or delete one of your existing/)
    ).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Close panel'));
    });

    await waitFor(() =>
      expect(
        screen.queryByText(/Update or delete one of your existing/)
      ).toBeNull()
    );
  });
});
