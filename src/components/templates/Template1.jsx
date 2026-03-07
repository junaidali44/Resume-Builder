import React from 'react';

const Template1 = ({ data }) => {
  const { personalInfo, summary, skills, education, experience } = data;

  return (
    <div className="font-sans">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="profile" className="w-20 h-20 rounded-full border-4 border-white" />
          )}
          <div>
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-blue-100">{personalInfo.email}</p>
            <p className="text-blue-100">{personalInfo.phone}</p>
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white underline text-sm">
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-purple-200 pb-1">Summary</h2>
            <p className="text-gray-600">{summary}</p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            {skills?.technical?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Technical Skills</h2>
                <div className="space-y-2">
                  {skills.technical.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-purple-600">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-600 rounded-full h-1.5" style={{ width: '80%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {skills?.soft?.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="col-span-2">
            {experience?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Experience</h2>
                {experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-bold">{exp.position} at {exp.company}</h3>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <p className="text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {education?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institute}</p>
                    <p className="text-sm text-gray-500">{edu.year} | {edu.grade}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;