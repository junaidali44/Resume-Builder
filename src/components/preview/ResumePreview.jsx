import React from 'react';
import useResumeStore from '../../store/resumeStore';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';

const ResumePreview = ({ templateId }) => {
  const personalInfo = useResumeStore((state) => state.personalInfo);
  const summary = useResumeStore((state) => state.professionalSummary);
  const education = useResumeStore((state) => state.education);
  const skills = useResumeStore((state) => state.skills);
  const experience = useResumeStore((state) => state.experience);
  const projects = useResumeStore((state) => state.projects);
  const certifications = useResumeStore((state) => state.certifications);

  const data = {
    personalInfo,
    summary,
    education,
    skills,
    experience,
    projects,
    certifications
  };

  const templates = {
    1: <Template1 data={data} />,
    2: <Template2 data={data} />,
    3: <Template3 data={data} />,
    4: <Template4 data={data} />,
    5: <Template5 data={data} />
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden min-h-[600px]">
      {templates[templateId] || templates[1]}
    </div>
  );
};

export default ResumePreview;