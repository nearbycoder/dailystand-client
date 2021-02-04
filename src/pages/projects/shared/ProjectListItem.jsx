import React, { useState } from 'react';
import { format, formatDistance } from 'date-fns';
import SlideOver from 'components/SlideOver';
import UpdateOrDeleteProject from './UpdateOrDeleteProject';

export default function ProjectListItem({ project }) {
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const onClose = () => setOpenSlideOver(false);

  return (
    <li>
      <SlideOver open={openSlideOver} onClose={onClose}>
        <UpdateOrDeleteProject project={project} onClose={onClose} />
      </SlideOver>
      <button
        data-testid="project-list-item"
        onClick={() => setOpenSlideOver(true)}
        className="block justify-between hover:bg-gray-50 w-full outline-none">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex text-sm font-medium text-indigo-600 truncate">
                <p>{project.name}</p>
              </div>
              <div>
                <p className="text-sm text-left text-gray-700">
                  {project.description}
                </p>
              </div>
              <div className="mt-2 flex flex-col md:flex-row">
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs md:text-sm">
                    Created{' '}
                    <time
                      dateTime={format(
                        new Date(project.createdAt),
                        'yyyy-MM-dd'
                      )}>
                      {formatDistance(new Date(project.createdAt), new Date())}
                    </time>
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0 md:ml-5">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs md:text-sm">
                    Updated{' '}
                    <time
                      dateTime={format(
                        new Date(project.updatedAt),
                        'yyyy-MM-dd'
                      )}>
                      {formatDistance(new Date(project.updatedAt), new Date())}
                    </time>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex-shrink-0 sm:mt-0"></div>
          </div>
          <div className="ml-5 flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </button>
    </li>
  );
}
