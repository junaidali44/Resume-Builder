import React, { useState } from 'react';
import { FaDownload, FaFilePdf, FaFileWord } from 'react-icons/fa';

const DownloadButton = ({ onDownload }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDownload = (format) => {
    if (onDownload && onDownload(format)) {
      setShowOptions(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
      >
        <FaDownload /> Download
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
          <button
            onClick={() => handleDownload('pdf')}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
          >
            <FaFilePdf /> PDF Format
          </button>
          <button
            onClick={() => handleDownload('word')}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-blue-600"
          >
            <FaFileWord /> Word Format
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;