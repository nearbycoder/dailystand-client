import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  test('renders AuthForm component with title, subtitle and action text', () => {
    render(
      <AuthForm
        formik={{ values: {}, errors: {} }}
        title="Example"
        subtitle={<div>click me</div>}
        errors={[]}
        actionText="Submit"></AuthForm>
    );

    expect(screen.getByText(/Example/)).toBeInTheDocument();
    expect(screen.getByText(/click me/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });

  test('renders AuthForm component with error', () => {
    render(
      <AuthForm
        formik={{ values: {}, errors: {} }}
        title="Example"
        subtitle={<div>click me</div>}
        errors={[{ field: 'email', message: 'invalid' }]}
        actionText="Submit"></AuthForm>
    );

    expect(
      screen.getByText(/There were 1 error with your submission/)
    ).toBeInTheDocument();
    expect(screen.getByText(/email invalid/)).toBeInTheDocument();
  });

  test('renders AuthForm component with errors', () => {
    render(
      <AuthForm
        formik={{ values: {}, errors: {} }}
        title="Example"
        subtitle={<div>click me</div>}
        errors={[
          { field: 'email', message: 'invalid' },
          { field: 'password', message: 'to short' },
        ]}
        actionText="Submit"></AuthForm>
    );

    expect(
      screen.getByText(/There were 2 errors with your submission/)
    ).toBeInTheDocument();
    expect(screen.getByText(/email invalid/)).toBeInTheDocument();
    expect(screen.getByText(/password to short/)).toBeInTheDocument();
  });
});
