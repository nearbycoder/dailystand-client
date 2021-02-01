import React, { Suspense } from 'react';
import DashboardLayout from 'layout/DashboardLayout';
import { useQuery, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export default function AuthRoute({
  children,
  component: Component,
  pageTitle,
}) {
  const { loading, error, data } = useQuery(CURRENT_USER, {
    nextFetchPolicy: 'network-only',
  });

  if (loading) return null;
  if (error) return <p>Error :(</p>;

  if (!data.currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <DashboardLayout currentUser={data.currentUser} pageTitle={pageTitle}>
      <Suspense fallback={null}>
        <Component>{children}</Component>
      </Suspense>
    </DashboardLayout>
  );
}
