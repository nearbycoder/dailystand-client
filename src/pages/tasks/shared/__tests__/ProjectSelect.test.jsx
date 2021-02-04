import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProjectSelect from '../ProjectSelect';
import { PROJECTS } from 'queries/projectQueries';

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

describe('ProjectSelect', () => {
  test('renders ProjectSelect component', () => {
    render(
      <MockedProvider mocks={[projectsMock]} addTypename={false}>
        <ProjectSelect />
      </MockedProvider>
    );

    expect(screen.getByText(/Select a Project/)).toBeInTheDocument();
  });

  test('renders ProjectSelect component with selected project', async () => {
    render(
      <MockedProvider mocks={[projectsMock]} addTypename={false}>
        <ProjectSelect projectId="55" />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Test Project/)).toBeInTheDocument()
    );
  });
});
