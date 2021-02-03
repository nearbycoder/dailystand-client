import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export default function GuestRoute({
  children,
  component: Component,
  pageTitle,
  ...props
}) {
  const { data, refetch } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  if (data?.currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Component {...props} refetch={refetch}>
      {children}
    </Component>
  );
}
