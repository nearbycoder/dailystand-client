import React, { useState } from 'react';
import { format, formatDistance } from 'date-fns';
import SlideOver from 'components/SlideOver';
import UpdateOrDeleteTask from './UpdateOrDeleteTask';

export default function TaskListItem({ task }) {
  const [openSlideOver, setOpenSlideOver] = useState(false);

  return (
    <li>
      <SlideOver open={openSlideOver} onClose={() => setOpenSlideOver(false)}>
        <UpdateOrDeleteTask
          task={task}
          onClose={() => setOpenSlideOver(false)}
        />
      </SlideOver>
      <button
        onClick={() => setOpenSlideOver(true)}
        className="block justify-between hover:bg-gray-50 w-full outline-none">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {task.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-left text-gray-700">
              {task.description}
            </p>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                {task.project.name}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
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
              <p>
                Created{' '}
                <time dateTime={format(new Date(task.createdAt), 'yyyy-MM-dd')}>
                  {formatDistance(new Date(task.createdAt), new Date())}
                </time>
              </p>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}
