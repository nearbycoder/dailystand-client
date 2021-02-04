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
import UpdateOrDeleteTask from '../UpdateOrDeleteTask';
import { PROJECTS } from 'queries/projectQueries';
import { UPDATE_TASK, DELETE_TASK, TASKS } from 'queries/taskQueries';

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
            id: '22',
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

const updateTaskMock = {
  request: {
    query: UPDATE_TASK,
    variables: {
      input: {
        id: '56',
        name: 'Example Test',
        description: 'description',
        projectId: '22',
      },
    },
  },
  result: {
    data: {
      updateTask: {
        id: '56',
        name: 'Example Test',
        description: 'description',
        createdAt: '2021-02-04T03:30:16Z',
        updatedAt: '2021-02-04T03:30:16Z',
        project: {
          id: '22',
          name: 'Example Project',
        },
      },
    },
  },
};

const deleteTaskMock = {
  request: {
    query: DELETE_TASK,
    variables: {
      input: { id: '56' },
    },
  },
  result: {
    data: {
      deleteTask: {
        id: '56',
      },
    },
  },
};

describe('UpdateOrDeleteTask', () => {
  const renderComponent = async (mocks, onClose = () => {}) => {
    const cache = new InMemoryCache({ addTypename: false });

    await cache.writeQuery({
      query: TASKS,
      data: {
        tasks: {
          nodes: [
            {
              id: '56',
              name: 'Blah',
              description: 'description',
              createdAt: '2021-02-04T03:30:16Z',
              updatedAt: '2021-02-04T03:30:16Z',
              project: {
                id: '22',
                name: 'Example Project',
              },
            },
            {
              id: '102',
              name: 'numbers',
              description: 'testing',
              createdAt: '2021-02-04T03:30:16Z',
              updatedAt: '2021-02-04T03:30:16Z',
              project: {
                id: '22',
                name: 'Example Project',
              },
            },
          ],
        },
      },
    });

    render(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
        <UpdateOrDeleteTask
          task={{
            id: '56',
            name: 'Blah',
            description: 'description',
            createdAt: '2021-02-04T03:30:16Z',
            updatedAt: '2021-02-04T03:30:16Z',
            project: {
              id: '22',
              name: 'Example Project',
            },
          }}
          onClose={onClose}
        />
      </MockedProvider>
    );

    return cache;
  };

  test('renders UpdateOrDeleteTask component', async () => {
    await renderComponent([]);

    expect(screen.getByText(/Update Task/)).toBeInTheDocument();
    expect(
      screen.getByText(/Update or delete one of your existing/)
    ).toBeInTheDocument();
  });

  test('fires mutation for updating task and calling onClose', async () => {
    const onClose = jest.fn();

    const cache = await renderComponent(
      [projectsMock, updateTaskMock, deleteTaskMock],
      onClose
    );

    const nameInput = screen.getByLabelText('Task name', {
      selector: 'input',
    });
    const descriptionInput = screen.getByLabelText('Description', {
      selector: 'textarea',
    });
    fireEvent.change(nameInput, {
      target: { value: 'Example Test' },
    });

    fireEvent.change(descriptionInput, { target: { value: 'description' } });

    act(() => {
      fireEvent.click(screen.getByText('Update'));
    });

    await waitFor(() => expect(onClose).toBeCalled());

    const {
      tasks: { nodes },
    } = await cache.readQuery({ query: TASKS });

    expect(nodes.length).toBe(2);
    expect(nodes[0].name).toBe('Example Test');
  });

  test('fires mutation for deleting project and calling onClose', async () => {
    const onClose = jest.fn();

    const cache = await renderComponent(
      [projectsMock, updateTaskMock, deleteTaskMock],
      onClose
    );

    const {
      tasks: { nodes: beforeNodes },
    } = await cache.readQuery({ query: TASKS });

    expect(beforeNodes.length).toBe(2);

    act(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    await waitFor(() => expect(onClose).toBeCalled());

    const {
      tasks: { nodes: afterNodes },
    } = await cache.readQuery({ query: TASKS });

    expect(afterNodes.length).toBe(1);
  });
});
