import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { client } from '../apollo';

function NavLink({ to, children, mobile, onClick }) {
  const location = useLocation();
  const match = location.pathname.includes(to) && to !== '/';

  const mobileFontSize = mobile ? 'text-base' : 'text-sm';

  return (
    <Link
      onClick={onClick}
      to={to}
      className={
        match
          ? `bg-gray-100 text-gray-900 group flex items-center px-2 py-2 ${mobileFontSize} font-medium rounded-md`
          : `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 ${mobileFontSize} font-medium rounded-md`
      }>
      {children}
    </Link>
  );
}

function UserMenu({ currentUser }) {
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <Link to="/settings" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
              {currentUser.email.split('@')[0]}
            </p>
            <p
              onClick={() => {
                localStorage.removeItem('token');
                client.clearStore();

                window.location.href = '';
              }}
              className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Logout
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function DashboardLayout({ pageTitle, children, currentUser }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Transition show={isOpen} className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            className="fixed inset-0"
            show={isOpen ? 'true' : 'false'}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </Transition.Child>
          <Transition.Child
            className="relative flex-1 flex flex-col h-full w-full bg-white"
            show={isOpen ? 'true' : 'false'}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
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
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 text-indigo-700 font-bold text-xl">
                Daily<span className="text-blue-700">Stand</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <NavLink to="/tasks" mobile onClick={handleClose}>
                  <svg
                    className="text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  All Tasks
                </NavLink>
                <NavLink to="/projects" mobile onClick={handleClose}>
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </NavLink>
              </nav>
            </div>
            <UserMenu currentUser={currentUser} />
          </Transition.Child>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      </Transition>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 text-indigo-700 font-bold text-xl">
                Daily<span className="text-blue-700">Stand</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <NavLink to="/tasks">
                  <svg
                    className="text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  All Tasks
                </NavLink>
                <NavLink to="/projects">
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </NavLink>
              </nav>
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={() => setIsOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open sidebar</span>
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex={0}>
          {children}
        </main>
      </div>
    </div>
  );
}
