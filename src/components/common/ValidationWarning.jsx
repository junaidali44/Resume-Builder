import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ValidationWarning = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <FaExclamationTriangle className="text-red-500" />
        <p className="text-red-700 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ValidationWarning;