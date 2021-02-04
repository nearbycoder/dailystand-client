import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LoginPage from '../LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { LOGIN } from 'queries/authQueries';

const successMock = {
  request: {
    query: LOGIN,
    variables: {
      input: { email: 'nearbycoder@gmail.com', password: 'testing1234@' },
    },
  },
  result: {
    data: {
      login: {
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
    query: LOGIN,
    variables: {
      input: { email: 'nearbycoder@gmail.com', password: 'blah' },
    },
  },
  result: {
    data: {
      login: {
        user: null,
        token: null,
        errors: [{ field: 'email or password', message: 'does not match' }],
      },
    },
  },
};

describe('LoginPage', () => {
  const renderComponent = (mock, refetch = () => {}) =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <MockedProvider mocks={[mock]} addTypename={false}>
          <LoginPage refetch={refetch} />
        </MockedProvider>
      </MemoryRouter>
    );

  test('renders LoginPage component with children', async () => {
    renderComponent(successMock);
    expect(screen.getByText(/Login to your account/)).toBeInTheDocument();
  });

  test('fires refetch after successful login', async () => {
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
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => expect(refetch).toBeCalled());
  });

  test('renders error after unsuccessful login', async () => {
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
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() =>
      expect(
        screen.getByText(/email or password does not match/)
      ).toBeInTheDocument()
    );
  });
});
