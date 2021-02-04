import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RegisterPage from '../RegisterPage';
import { MemoryRouter } from 'react-router-dom';
import { REGISTER } from 'queries/authQueries';

const successMock = {
  request: {
    query: REGISTER,
    variables: {
      input: { email: 'nearbycoder@gmail.com', password: 'testing1234@' },
    },
  },
  result: {
    data: {
      register: {
        user: {
          id: '1',
          email: 'nearbycoder@gmail.com',
          createdAt: '2021-01-31T22:38:20Z',
          updatedAt: '2021-01-31T22:38:20Z',
        },
        token: 'token',
        errors: null,
      },
    },
  },
};

const errorMock = {
  request: {
    query: REGISTER,
    variables: {
      input: { email: 'nearbycoder@gmail.com', password: 'blah' },
    },
  },
  result: {
    data: {
      register: {
        user: null,
        token: null,
        errors: [{ field: 'email', message: 'has already been taken' }],
      },
    },
  },
};

describe('RegisterPage', () => {
  const renderComponent = (mock, refetch = () => {}) =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <MockedProvider mocks={[mock]} addTypename={false}>
          <RegisterPage refetch={refetch} />
        </MockedProvider>
      </MemoryRouter>
    );

  test('renders RegisterPage component with children', async () => {
    renderComponent(successMock);
    expect(screen.getByText(/Register for an Account/)).toBeInTheDocument();
  });

  test('fires refetch after successful register', async () => {
    const refetch = jest.fn();
    renderComponent(successMock, refetch);

    const emailInput = screen.getByLabelText('Email address', {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText('Password', {
      selector: 'input',
    });
    fireEvent.change(emailInput, {
      target: { value: 'nearbycoder@gmail.com' },
    });

    fireEvent.change(passwordInput, { target: { value: 'testing1234@' } });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => expect(refetch).toBeCalled());
  });

  test('renders error after unsuccessful register', async () => {
    renderComponent(errorMock);

    const emailInput = screen.getByLabelText('Email address', {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText('Password', {
      selector: 'input',
    });
    fireEvent.change(emailInput, {
      target: { value: 'nearbycoder@gmail.com' },
    });

    fireEvent.change(passwordInput, { target: { value: 'blah' } });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() =>
      expect(
        screen.getByText(/email has already been taken/)
      ).toBeInTheDocument()
    );
  });
});
