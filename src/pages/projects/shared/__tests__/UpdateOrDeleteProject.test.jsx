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
import UpdateOrDeleteProject from '../UpdateOrDeleteProject';
import {
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECTS,
} from 'queries/projectQueries';

const updateProjectMock = {
  request: {
    query: UPDATE_PROJECT,
    variables: {
      input: { id: '56', name: 'Test', description: 'description' },
    },
  },
  result: {
    data: {
      updateProject: {
        id: '56',
        name: 'Test',
        description: 'description',
        createdAt: '2021-02-04T03:30:16Z',
        updatedAt: '2021-02-04T03:30:16Z',
      },
    },
  },
};

const deleteProjectMock = {
  request: {
    query: DELETE_PROJECT,
    variables: {
      input: { id: '56' },
    },
  },
  result: {
    data: {
      deleteProject: {
        id: '56',
      },
    },
  },
};

describe('UpdateOrDeleteProject', () => {
  const renderComponent = async (mocks, onClose = () => {}) => {
    const cache = new InMemoryCache({ addTypename: false });

    await cache.writeQuery({
      query: PROJECTS,
      data: {
        projects: {
          nodes: [
            {
              id: '56',
              name: 'Blah',
              description: 'description',
              createdAt: '2021-02-04T03:30:16Z',
              updatedAt: '2021-02-04T03:30:16Z',
            },
            {
              id: '102',
              name: 'numbers',
              description: 'testing',
              createdAt: '2021-02-04T03:30:16Z',
              updatedAt: '2021-02-04T03:30:16Z',
            },
          ],
        },
      },
    });

    render(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
        <UpdateOrDeleteProject
          project={{
            id: '56',
            name: 'Blah',
            description: 'description',
            createdAt: '2021-02-04T03:30:16Z',
            updatedAt: '2021-02-04T03:30:16Z',
          }}
          onClose={onClose}
        />
      </MockedProvider>
    );

    return cache;
  };

  test('renders UpdateOrDeleteProject component', async () => {
    await renderComponent([]);

    expect(screen.getByText(/Update Project/)).toBeInTheDocument();
    expect(
      screen.getByText(/Update or delete one of your existing/)
    ).toBeInTheDocument();
  });

  test('fires mutation for updating project and calling onClose', async () => {
    const onClose = jest.fn();

    const cache = await renderComponent(
      [updateProjectMock, deleteProjectMock],
      onClose
    );

    const nameInput = screen.getByLabelText('Project name', {
      selector: 'input',
    });
    const descriptionInput = screen.getByLabelText('Description', {
      selector: 'textarea',
    });
    fireEvent.change(nameInput, {
      target: { value: 'Test' },
    });

    fireEvent.change(descriptionInput, { target: { value: 'description' } });

    act(() => {
      fireEvent.click(screen.getByText('Update'));
    });

    await waitFor(() => expect(onClose).toBeCalled());

    const {
      projects: { nodes },
    } = await cache.readQuery({ query: PROJECTS });

    expect(nodes.length).toBe(2);
    expect(nodes[0].name).toBe('Test');
  });

  test('fires mutation for deleting project and calling onClose', async () => {
    const onClose = jest.fn();

    const cache = await renderComponent(
      [updateProjectMock, deleteProjectMock],
      onClose
    );

    const {
      projects: { nodes: beforeNodes },
    } = await cache.readQuery({ query: PROJECTS });

    expect(beforeNodes.length).toBe(2);

    act(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    await waitFor(() => expect(onClose).toBeCalled());

    const {
      projects: { nodes: afterNodes },
    } = await cache.readQuery({ query: PROJECTS });

    expect(afterNodes.length).toBe(1);
  });
});
