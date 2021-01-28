import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        className="bg-blue-600 text-white py-2 px-4 m-2 rounded"
        onClick={() => setCount((count) => count - 1)}>
        Subtract
      </button>
      {count}
      <button
        className="bg-blue-600 text-white py-2 px-4 m-2 rounded"
        onClick={() => setCount((count) => count + 1)}>
        Add
      </button>
    </div>
  );
}
