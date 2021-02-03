import { gql } from '@apollo/client';

export const TASKS = gql`
  query Tasks {
    tasks {
      nodes {
        id
        name
        description
        createdAt
        updatedAt
        project {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskMutationInput!) {
    createTask(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      project {
        id
        name
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      project {
        id
        name
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskMutationInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;
