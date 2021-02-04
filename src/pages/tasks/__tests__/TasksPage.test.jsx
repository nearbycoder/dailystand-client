import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TasksPage from '../TasksPage';
import { TASKS } from 'queries/taskQueries';

const successMock = {
  request: {
    query: TASKS,
    variables: {},
  },
  result: {
    data: {
      tasks: {
        nodes: [
          {
            id: '51',
            name: 'Example Task',
            description: 'example task',
            createdAt: '2021-02-04T02:49:31Z',
            updatedAt: '2021-02-04T02:49:31Z',
            project: { id: '55', name: 'Test Project' },
          },
        ],
      },
    },
  },
};

describe('TasksPage', () => {
  const renderComponent = (mock) =>
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <TasksPage />
      </MockedProvider>
    );

  test('renders TasksPage component with ghost items and then task', async () => {
    renderComponent(successMock);
    expect(screen.getByText(/All Tasks/)).toBeInTheDocument();
    expect(screen.getAllByTestId('ghost-item').length).toBe(2);
    await waitFor(() =>
      expect(screen.getByText(/Example Task/)).toBeInTheDocument()
    );
  });

  test('toggle Create Task side panel', async () => {
    renderComponent(successMock);

    act(() => {
      fireEvent.click(screen.getByText('New Task'));
    });

    expect(screen.getByText(/information below to create/)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Close panel'));
    });

    await waitFor(() =>
      expect(screen.queryByText(/information below to create/)).toBeNull()
    );
  });
});
