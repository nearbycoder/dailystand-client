import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TaskListItem from '../TaskListItem';

describe('TaskListItem', () => {
  test('renders TaskListItem component', () => {
    render(
      <TaskListItem
        task={{
          id: '33',
          name: 'Nintendo',
          description: 'Best Games',
          createdAt: '2021-02-04T03:30:16Z',
          updatedAt: '2021-02-04T03:30:16Z',
          project: {
            id: '22',
            name: 'Example Project',
          },
        }}
      />
    );

    expect(screen.getByText(/Nintendo/)).toBeInTheDocument();
  });

  test('toggle Create Task side panel', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TaskListItem
          task={{
            id: '33',
            name: 'Nintendo',
            description: 'Best Games',
            createdAt: '2021-02-04T03:30:16Z',
            updatedAt: '2021-02-04T03:30:16Z',
            project: {
              id: '22',
              name: 'Example Project',
            },
          }}
        />
      </MockedProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('task-list-item'));
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
