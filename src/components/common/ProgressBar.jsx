import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="mt-4 max-w-md mx-auto">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Profile Completion</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-2.5 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;