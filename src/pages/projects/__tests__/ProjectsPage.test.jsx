import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProjectsPage from '../ProjectsPage';
import { PROJECTS } from 'queries/projectQueries';

const successMock = {
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

describe('ProjectsPage', () => {
  const renderComponent = (mock) =>
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <ProjectsPage />
      </MockedProvider>
    );

  test('renders ProjectsPage component with ghost items and then project', async () => {
    renderComponent(successMock);
    expect(screen.getByText(/Projects/)).toBeInTheDocument();
    expect(screen.getAllByTestId('ghost-item').length).toBe(2);
    await waitFor(() =>
      expect(screen.getByText(/Test Project/)).toBeInTheDocument()
    );
  });

  test('toggle Create Project side panel', async () => {
    renderComponent(successMock);

    act(() => {
      fireEvent.click(screen.getByText('New Project'));
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
