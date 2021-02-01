import React from 'react';

export default function List({ children }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </div>
  );
}
