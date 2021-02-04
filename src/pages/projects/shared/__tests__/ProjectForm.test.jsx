import React from 'react';
import { render, screen } from '@testing-library/react';

import ProjectForm from '../ProjectForm';

describe('ProjectForm', () => {
  test('renders ProjectForm component', () => {
    render(
      <ProjectForm
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
    );

    expect(screen.getByText(/Title/)).toBeInTheDocument();
    expect(screen.getByText(/Description Text/)).toBeInTheDocument();
  });

  test('renders ProjectForm component with form errors', () => {
    render(
      <ProjectForm
        formik={{
          values: {},
          errors: { name: 'required text' },
          touched: { name: true },
        }}
        onClose={() => {}}
        onDelete={() => {}}
        action="Update"
        title="Title"
        description="Description Text"
      />
    );

    expect(screen.getByText(/required text/)).toBeInTheDocument();
  });
});
