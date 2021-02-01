import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CREATE_PROJECT = gql`
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

const CreateProjectSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string(),
});

export default function CreateProject({ onClose, refetch }) {
  const [createProject] = useMutation(CREATE_PROJECT);

  const formik = useFormik({
    validationSchema: CreateProjectSchema,
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        const {
          data: { createProject: data },
        } = await createProject({ variables: { input: values } });

        if (data?.id) {
          refetch();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
      <div className="flex-1 h-0 overflow-y-auto">
        <div className="py-6 px-4 bg-indigo-700 sm:px-6">
          <div className="flex items-center justify-between">
            <h2
              id="slide-over-heading"
              className="text-lg font-medium text-white">
              New Project
            </h2>
            <div className="ml-3 h-7 flex items-center">
              <button
                type="button"
                onClick={onClose}
                className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-indigo-300">
              Get started by filling in the information below to create your new
              project.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="px-4 divide-y divide-gray-200 sm:px-6">
            <div className="space-y-6 pt-6 pb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900">
                  Project name{' '}
                  {formik.errors.name && formik.touched.name ? (
                    <span className="text-xs font-base text-red-500">
                      *{formik.errors.name}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 px-4 py-4 flex justify-end">
        <button
          onClick={onClose}
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button
          type="submit"
          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </form>
  );
}
