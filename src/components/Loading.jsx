import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-blue-600 space-y-3">
      <FaSpinner className="animate-spin text-4xl" />
      <p className="text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
