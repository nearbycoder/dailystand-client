import { gql } from '@apollo/client';

export const PROJECTS = gql`
  query Projects {
    projects {
      nodes {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectMutationInput!) {
    createProject(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectMutationInput!) {
    updateProject(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($input: DeleteProjectMutationInput!) {
    deleteProject(input: $input) {
      id
    }
  }
`;
