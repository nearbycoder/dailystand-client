import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TaskForm from '../TaskForm';
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

describe('TaskForm', () => {
  test('renders TaskForm component', () => {
    render(
      <MockedProvider mocks={[projectsMock]} addTypename={false}>
        <TaskForm
          formik={{
            values: {},
            errors: {},
          }}
          onClose={() => {}}
          onDelete={() => {}}
          action="Update"
          title="Title"
          description="Description Text"
        />
      </MockedProvider>
    );

    expect(screen.getByText(/Title/)).toBeInTheDocument();
    expect(screen.getByText(/Description Text/)).toBeInTheDocument();
  });

  test('renders TaskForm component with form errors', () => {
    render(
      <MockedProvider mocks={[projectsMock]} addTypename={false}>
        <TaskForm
          formik={{
            values: {},
            errors: { name: 'required text', projectId: 'project missing' },
            touched: { name: true, projectId: true },
          }}
          onClose={() => {}}
          onDelete={() => {}}
          action="Update"
          title="Title"
          description="Description Text"
        />
      </MockedProvider>
    );

    expect(screen.getByText(/required text/)).toBeInTheDocument();
    expect(screen.getByText(/project missing/)).toBeInTheDocument();
  });
});
