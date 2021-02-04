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
import CreateProject from '../CreateProject';
import { CREATE_PROJECT, PROJECTS } from 'queries/projectQueries';

const createProjectMock = {
  request: {
    query: CREATE_PROJECT,
    variables: { input: { name: 'Blah', description: 'description' } },
  },
  result: {
    data: {
      createProject: {
        id: '56',
        name: 'Blah',
        description: 'description',
        createdAt: '2021-02-04T03:30:16Z',
        updatedAt: '2021-02-04T03:30:16Z',
      },
    },
  },
};

describe('CreateProject', () => {
  test('renders CreateProject component', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CreateProject onClose={() => {}} />
      </MockedProvider>
    );

    expect(screen.getByText(/New Project/)).toBeInTheDocument();
    expect(screen.getByText(/information below to create/)).toBeInTheDocument();
  });

  test('fires mutation for creating project and calling onClose', async () => {
    const cache = new InMemoryCache({ addTypename: false });

    await cache.writeQuery({
      query: PROJECTS,
      data: {
        projects: {
          nodes: [],
        },
      },
    });

    const onClose = jest.fn();

    render(
      <MockedProvider
        cache={cache}
        mocks={[createProjectMock]}
        addTypename={false}>
        <CreateProject onClose={onClose} />
      </MockedProvider>
    );

    const nameInput = screen.getByLabelText('Project name', {
      selector: 'input',
    });
    const descriptionInput = screen.getByLabelText('Description', {
      selector: 'textarea',
    });
    fireEvent.change(nameInput, {
      target: { value: 'Blah' },
    });

    fireEvent.change(descriptionInput, { target: { value: 'description' } });

    act(() => {
      fireEvent.click(screen.getByText('Create'));
    });

    await waitFor(() => expect(onClose).toBeCalled());
  });
});
