import React from 'react';

const Template3 = ({ data }) => {
  const { personalInfo } = data;

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-orange-50">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
        {personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-gray-600 mt-2">{personalInfo.email}</p>
      {personalInfo.linkedin && (
        <p className="mt-1"><a href={personalInfo.linkedin} className="text-pink-600">Connect on LinkedIn</a></p>
      )}
    </div>
  );
};

export default Template3;