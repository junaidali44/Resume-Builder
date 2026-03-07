import React from 'react';

const Template2 = ({ data }) => {
  const { personalInfo, summary } = data;

  return (
    <div className="font-serif p-6">
      <h1 className="text-4xl text-center border-b-2 border-gray-800 pb-2 mb-4">
        {personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-center text-gray-600 mb-4">{personalInfo.email} | {personalInfo.phone}</p>
      {personalInfo.linkedin && (
        <p className="text-center text-sm mb-4">
          <a href={personalInfo.linkedin} className="text-blue-800">LinkedIn</a>
        </p>
      )}
      {summary && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Template2;