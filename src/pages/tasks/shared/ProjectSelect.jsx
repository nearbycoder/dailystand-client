import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import find from 'lodash/find';
import { Transition } from '@headlessui/react';
import { PROJECTS } from 'queries/projectQueries';

export default function ProjectSelect({
  projectId,
  setFieldValue,
  error: formError,
}) {
  const { data } = useQuery(PROJECTS, {
    fetchPolicy: 'network-only',
  });
  const [show, setShow] = useState(false);

  const selectedProject = find(get(data, 'projects.nodes', []), {
    id: projectId,
  });

  return (
    <div>
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-900">
        Project{' '}
        {formError && (
          <span className="text-xs font-base text-red-500">*{formError}</span>
        )}
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          data-testid="project-select"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setShow(!show)}
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            {selectedProject ? selectedProject.name : 'Select a Project'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <Transition
          show={show}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-1"
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {get(data, 'projects.nodes', []).map((project, index) => {
              return (
                <li
                  onClick={() => {
                    setFieldValue('projectId', project.id);
                    setShow(false);
                  }}
                  data-testid={`listbox-option-${index}`}
                  key={project.id}
                  id={`listbox-option-${index}`}
                  className="text-gray-900 group hover:text-white hover:bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9">
                  <span
                    className={`${
                      project.id === projectId ? 'font-semibold' : 'font-normal'
                    } block truncate`}>
                    {project.name}
                  </span>
                  {project.id === projectId && (
                    <span className="text-indigo-600 group-hover:text-white absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Transition>
      </div>
    </div>
  );
}
