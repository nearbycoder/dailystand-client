import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import CreateTask from '../CreateTask';
import { CREATE_TASK, TASKS } from 'queries/taskQueries';
import { PROJECTS } from 'queries/projectQueries';

const createTaskMock = {
  request: {
    query: CREATE_TASK,
    variables: {
      input: {
        name: 'Example Task',
        description: 'description',
        projectId: '55',
      },
    },
  },
  result: {
    data: {
      createTask: {
        id: '56',
        name: 'Example Task',
        description: 'description',
        createdAt: '2021-02-04T03:30:16Z',
        updatedAt: '2021-02-04T03:30:16Z',
        project: {
          id: '55',
          name: 'Test Project',
        },
      },
    },
  },
};

const projectsMock = {
  request: {
    query: PROJECTS,
    variables: {},
  },
  result: {
    data: {
      projects: {
        nodes: [
          {
            id: '55',
            name: 'Test Project',
            description: 'example description',
            createdAt: '2021-02-04T02:45:27Z',
            updatedAt: '2021-02-04T02:45:27Z',
          },
        ],
      },
    },
  },
};

describe('CreateTask', () => {
  test('renders CreateTask component', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CreateTask onClose={() => {}} />
      </MockedProvider>
    );

    expect(screen.getByText(/New Task/)).toBeInTheDocument();
    expect(screen.getByText(/information below to create/)).toBeInTheDocument();
  });

  test('fires mutation for creating task and calling onClose', async () => {
    const cache = new InMemoryCache({ addTypename: false });

    await cache.writeQuery({
      query: TASKS,
      data: {
        tasks: {
          nodes: [
            {
              id: '1',
              name: 'First Task',
              description: 'description',
              createdAt: '2021-02-04T03:30:16Z',
              updatedAt: '2021-02-04T03:30:16Z',
              project: {
                id: '55',
                name: 'Test Project',
              },
            },
          ],
        },
      },
    });

    const onClose = jest.fn();

    render(
      <MockedProvider
        cache={cache}
        mocks={[projectsMock, createTaskMock]}
        addTypename={false}>
        <CreateTask onClose={onClose} />
      </MockedProvider>
    );

    const nameInput = screen.getByLabelText('Task name', {
      selector: 'input',
    });
    const descriptionInput = screen.getByLabelText('Description', {
      selector: 'textarea',
    });
    fireEvent.change(nameInput, {
      target: { value: 'Example Task' },
    });

    fireEvent.change(descriptionInput, { target: { value: 'description' } });

    act(() => {
      fireEvent.click(screen.getByTestId('project-select'));
    });

    await waitFor(() =>
      expect(screen.getByTestId('listbox-option-0')).toBeInTheDocument()
    );

    act(() => {
      fireEvent.click(screen.getByTestId('listbox-option-0'));
    });

    act(() => {
      fireEvent.click(screen.getByText('Create'));
    });

    await waitFor(() => expect(onClose).toBeCalled());
  });
});
