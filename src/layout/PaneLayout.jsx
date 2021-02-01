import React from 'react';

function GhostItem() {
  return (
    <div className="border rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ghost() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        <GhostItem />
        <GhostItem />
      </ul>
    </div>
  );
}

export default function PaneLayout({
  pageTitle,
  children,
  actionTitle,
  actionOnClick,
  loading,
}) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
        <button
          onClick={actionOnClick}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {actionTitle}
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
        {loading ? <Ghost /> : children}
      </div>
    </div>
  );
}
