import React from 'react';
import { motion } from 'framer-motion';

const PreviewSection = ({ children, onDownload, onTemplateChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 sticky top-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
        <div className="flex gap-2">
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Download
            </button>
          )}
          {onTemplateChange && (
            <button
              onClick={onTemplateChange}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
            >
              Change Template
            </button>
          )}
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden bg-gray-50 min-h-[500px]">
        {children}
      </div>
    </motion.div>
  );
};

export default PreviewSection;