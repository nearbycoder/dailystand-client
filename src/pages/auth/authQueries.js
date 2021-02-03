import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginMutationInput!) {
    login(input: $input) {
      user {
        id
        email
        createdAt
        updatedAt
      }
      token
      errors {
        field
        message
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterMutationInput!) {
    register(input: $input) {
      user {
        id
        email
        createdAt
        updatedAt
      }
      token
      errors {
        field
        message
      }
    }
  }
`;
