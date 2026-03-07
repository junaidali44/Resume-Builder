import React from 'react';

const Template4 = ({ data }) => {
  const { personalInfo, summary } = data;

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-light tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
      <hr className="my-4 border-gray-300" />
      <p className="text-gray-500 text-sm">{personalInfo.email}</p>
      {personalInfo.linkedin && (
        <p className="text-gray-500 text-sm mt-1">{personalInfo.linkedin}</p>
      )}
      {summary && (
        <p className="mt-4 text-gray-600 leading-relaxed">{summary}</p>
      )}
    </div>
  );
};

export default Template4;