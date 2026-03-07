import React from 'react';

const Template5 = ({ data }) => {
  const { personalInfo, summary } = data;

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-serif text-red-900">{personalInfo.fullName || 'Your Name'}</h1>
      <p className="text-gray-600 mt-2">{personalInfo.email}</p>
      {personalInfo.linkedin && (
        <p className="text-sm text-blue-700 mt-1">🔗 {personalInfo.linkedin}</p>
      )}
      {summary && (
        <div className="mt-4 p-4 bg-white rounded border-l-4 border-red-900">
          <p className="text-gray-700 italic">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Template5;