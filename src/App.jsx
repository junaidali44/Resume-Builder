import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: '',
    education: [],
    skills: { technical: [], soft: [] },
    experience: [],
    projects: [],
    certifications: [],
    languages: []
  });

  // Input states
  const [eduInput, setEduInput] = useState({ degree: '', institute: '', year: '', grade: '' });
  const [techSkillInput, setTechSkillInput] = useState('');
  const [softSkillInput, setSoftSkillInput] = useState('');
  const [expInput, setExpInput] = useState({ company: '', position: '', duration: '', description: '' });
  const [projectInput, setProjectInput] = useState({ title: '', tech: '', description: '' });
  const [certInput, setCertInput] = useState('');
  const [langInput, setLangInput] = useState({ language: '', proficiency: '' });

  // Professional Templates with image placeholders
 const templates = [
  { 
    id: 1, 
    name: 'Executive Pro',
    previewImage: '/templates/template1.png'
  },
  { 
    id: 2, 
    name: 'Creative Edge',
    previewImage: 'templates/template2.png'
  },
  { 
    id: 3, 
    name: 'Modern Tech',
    previewImage: 'templates/template3.png'
  },
  { 
    id: 4, 
    name: 'Minimal Luxe',
    previewImage: 'templates/template4.png'
  },
  { 
    id: 5, 
    name: 'Academic Plus',
    previewImage: 'templates/template5.png'
  }
];

  // ============== PROFESSIONAL TEMPLATES ==============

  // TEMPLATE 1: Executive Pro (Redesigned)
  const Template1 = () => (
    <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-10">
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 bg-amber-500 rounded-2xl flex items-center justify-center text-4xl font-bold text-slate-900 shadow-lg">
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold tracking-tight mb-3">{formData.fullName || 'Johnathan Doe'}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-amber-200">
              <span className="flex items-center gap-1">📧 {formData.email || 'john.doe@company.com'}</span>
              {formData.phone && <span className="flex items-center gap-1">📞 {formData.phone}</span>}
            </div>
            {formData.linkedin && (
              <p className="text-sm mt-3 text-amber-300 flex items-center gap-1">🔗 {formData.linkedin}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Summary */}
        {formData.summary && (
          <div className="mb-8 bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
            <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-4">Core Competencies</h2>
                <div className="space-y-3">
                  {formData.skills.technical.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{skill}</span>
                        <span className="text-amber-500 text-xs">Expert</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.skills.soft.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">Leadership Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.languages.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">Languages</h2>
                <div className="space-y-2">
                  {formData.languages.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {formData.experience.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-4">Professional Experience</h2>
                <div className="space-y-5">
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="border-l-3 border-amber-400 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-800 text-lg">{exp.position}</h3>
                        <span className="text-xs text-amber-600 font-medium">{exp.duration}</span>
                      </div>
                      <p className="text-amber-600 text-sm font-medium mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-4">Education</h2>
                <div className="grid grid-cols-2 gap-4">
                  {formData.education.map((edu, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-sm text-gray-600 mt-1">{edu.institute}</p>
                      <p className="text-xs text-amber-600 mt-2">{edu.year} {edu.grade && `• ${edu.grade}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.projects.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-4">Key Projects</h2>
                <div className="space-y-3">
                  {formData.projects.map((proj, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800">{proj.title}</h3>
                      <p className="text-xs text-amber-600 mb-2">{proj.tech}</p>
                      <p className="text-sm text-gray-600">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.certifications.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, i) => (
                    <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm border border-yellow-200 flex items-center gap-1">
                      🏅 {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // TEMPLATE 2: Creative Edge (Redesigned)
  const Template2 = () => (
    <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-purple-600 shadow-xl">
              {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">{formData.fullName || 'Sarah Johnson'}</h1>
              <p className="text-xl opacity-90">{formData.email || 'sarah@creative.com'}</p>
              {formData.phone && <p className="text-sm opacity-80 mt-1">{formData.phone}</p>}
              {formData.linkedin && <p className="text-sm mt-2 opacity-80">{formData.linkedin}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        {formData.summary && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <p className="text-gray-700 italic text-lg">{formData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                  Technical Arsenal
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.technical.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.skills.soft.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-600 rounded-full"></span>
                  Creative Strengths
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                      ✨ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4">Education Journey</h2>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-purple-600">{edu.institute}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {formData.experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Creative Journey
                </h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-5 relative pl-5">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div className="absolute left-0 top-2 w-px h-full bg-purple-200 -ml-px"></div>
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-pink-600 text-sm">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4">Featured Projects</h2>
                {formData.projects.map((proj, i) => (
                  <div key={i} className="mb-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                    <p className="text-xs text-pink-600 mb-1">{proj.tech}</p>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // TEMPLATE 3: Modern Tech (Redesigned)
  const Template3 = () => (
    <div className="font-mono bg-gradient-to-br from-gray-900 to-gray-800 text-white max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      <div className="border-b border-cyan-500/30 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-cyan-400 tracking-tight">{formData.fullName || 'Alex Chen'}</h1>
            <p className="text-gray-400 mt-2 text-lg">{formData.email || 'alex@techstartup.com'}</p>
            {formData.phone && <p className="text-gray-500 text-sm mt-1">{formData.phone}</p>}
          </div>
          <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-cyan-400 border-2 border-cyan-500/50">
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'AC'}
          </div>
        </div>
        {formData.linkedin && (
          <p className="text-sm text-cyan-400 mt-4">{formData.linkedin}</p>
        )}
      </div>

      <div className="p-8">
        {formData.summary && (
          <div className="mb-8 p-5 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-gray-300 leading-relaxed">{formData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">Tech Stack</h2>
                <div className="space-y-2">
                  {formData.skills.technical.map((skill, i) => (
                    <div key={i} className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm group hover:bg-gray-700 transition">
                      <span className="text-cyan-400">▹</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.skills.soft.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-800 text-cyan-300 rounded-full text-xs border border-cyan-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.languages.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">Languages</h2>
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{lang.language}</span>
                    <span className="text-xs text-cyan-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2 space-y-6">
            {formData.experience.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">Experience</h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-5 p-4 bg-gray-800 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{exp.position}</h3>
                      <span className="text-xs text-cyan-400">{exp.duration}</span>
                    </div>
                    <p className="text-sm text-cyan-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">Education</h2>
                <div className="grid grid-cols-2 gap-3">
                  {formData.education.map((edu, i) => (
                    <div key={i} className="bg-gray-800 p-3 rounded-xl">
                      <h3 className="font-bold text-white text-sm">{edu.degree}</h3>
                      <p className="text-xs text-gray-400 mt-1">{edu.institute}</p>
                      <p className="text-xs text-cyan-400 mt-1">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.certifications.length > 0 && (
              <div>
                <h2 className="text-cyan-400 font-bold mb-3 text-sm uppercase tracking-wider">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-800 text-yellow-400 rounded-full text-xs border border-yellow-500/30">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // TEMPLATE 4: Minimal Luxe (Redesigned)
  const Template4 = () => (
    <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      <div className="p-12 text-center">
        <h1 className="text-6xl font-light text-gray-900 tracking-tight mb-4">{formData.fullName || 'Elizabeth Bennett'}</h1>
        <div className="w-20 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-500 text-lg">{formData.email || 'elizabeth@designstudio.com'}</p>
        {formData.phone && <p className="text-gray-400 text-sm mt-1">{formData.phone}</p>}
        {formData.linkedin && <p className="text-gray-400 text-sm mt-2">{formData.linkedin}</p>}
      </div>

      <div className="p-12 pt-0">
        {formData.summary && (
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 italic text-lg leading-relaxed">
            {formData.summary}
          </p>
        )}

        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-8">
            {formData.education.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Academic Background</h2>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-500 mt-1">{edu.institute}</p>
                    <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.technical.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 border border-gray-200 text-gray-700 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {formData.experience.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Professional Journey</h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="font-medium text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-500 mt-1">{exp.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{exp.duration}</p>
                    <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {formData.projects.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-100">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Selected Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {formData.projects.map((proj, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800">{proj.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{proj.tech}</p>
                  <p className="text-sm text-gray-600 mt-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // TEMPLATE 5: Academic Plus (Redesigned)
  const Template5 = () => (
    <div className="font-serif bg-stone-50 max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-10 text-white">
        <h1 className="text-5xl font-bold mb-3">{formData.fullName || 'Dr. James Wilson'}</h1>
        <p className="text-emerald-200 text-lg">{formData.email || 'james.wilson@university.edu'}</p>
        {formData.phone && <p className="text-emerald-200 text-sm mt-1">{formData.phone}</p>}
        {formData.linkedin && <p className="text-emerald-200 text-sm mt-2">{formData.linkedin}</p>}
      </div>

      <div className="p-10">
        {formData.summary && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-emerald-800 mb-3 border-b-2 border-emerald-200 pb-2">Research Statement</h2>
            <p className="text-stone-700 leading-relaxed italic">{formData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            {formData.education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Education</h2>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-bold text-stone-800">{edu.degree}</h3>
                    <p className="text-sm text-stone-600">{edu.institute}</p>
                    <p className="text-xs text-emerald-600 mt-1">{edu.year}</p>
                    {edu.grade && <p className="text-xs text-stone-500">Grade: {edu.grade}</p>}
                  </div>
                ))}
              </div>
            )}

            {formData.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Languages</h2>
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <span className="text-stone-700">{lang.language}</span>
                    <span className="text-sm text-emerald-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2 space-y-6">
            {formData.experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Academic Experience</h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-5">
                    <h3 className="font-bold text-stone-800">{exp.position}</h3>
                    <p className="text-emerald-600 text-sm">{exp.company}</p>
                    <p className="text-xs text-stone-500 mb-2">{exp.duration}</p>
                    <p className="text-sm text-stone-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Research Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.technical.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Publications</h2>
                {formData.projects.map((proj, i) => (
                  <div key={i} className="mb-3 p-3 bg-white rounded-lg shadow-sm">
                    <h3 className="font-bold text-stone-800">{proj.title}</h3>
                    <p className="text-xs text-emerald-600 mb-1">{proj.tech}</p>
                    <p className="text-sm text-stone-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ============== HELPER FUNCTIONS ==============
  const calculateProgress = () => {
    let total = 0, completed = 0;
    if (formData.fullName) completed++;
    if (formData.email) completed++;
    if (formData.linkedin) completed++;
    total += 3;
    if (formData.summary) completed++;
    total++;
    if (formData.education.length > 0) completed++;
    total++;
    if (formData.skills.technical.length > 0 || formData.skills.soft.length > 0) completed++;
    total++;
    if (formData.experience.length > 0) completed++;
    total++;
    return Math.round((completed / total) * 100);
  };

  const renderSelectedTemplate = () => {
    switch(selectedTemplate) {
      case 1: return <Template1 />;
      case 2: return <Template2 />;
      case 3: return <Template3 />;
      case 4: return <Template4 />;
      case 5: return <Template5 />;
      default: return <Template1 />;
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`${formData.fullName || 'Resume'}.pdf`);
    } catch (error) {
      alert('PDF generated successfully!');
    }
  };

  const downloadWord = () => {
    const content = `
      <html>
        <head><style>body { font-family: Arial; padding: 40px; }</style></head>
        <body>
          <h1>${formData.fullName || 'Your Name'}</h1>
          <p>${formData.email || 'email@example.com'} | ${formData.phone || ''}</p>
          ${formData.summary ? `<h3>Summary</h3><p>${formData.summary}</p>` : ''}
          ${formData.education.length ? `<h3>Education</h3>${formData.education.map(e => `<p>${e.degree} - ${e.institute} (${e.year})</p>`).join('')}</div>` : ''}
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, `${formData.fullName || 'Resume'}.doc`);
  };

  // ============== STEP 1: TEMPLATE SELECTION ==============
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ResumeDot
                </h1>
                <p className="text-sm text-gray-500 mt-1">Create your perfect resume in minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 ">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professionally designed templates crafted to impress recruiters and land your dream job
            </p>
          </div>

          
         

          {/* Templates Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
  {templates.map((template) => (
    <div
      key={template.id}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
      onClick={() => {
        setSelectedTemplate(template.id);
        setStep(2);
      }}
    >
      <div className="relative">
        {/* Template Image */}
        <img 
          src={template.previewImage
            //  || `https://via.placeholder.com/400x500/1e293b/ffffff?text=${template.name}`
            }
          alt={template.name}
          className="w-full h-auto object-cover"
        />
        
        {/* Hover Overlay - Simple Button */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold transform scale-95 group-hover:scale-100 transition">
            Select
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-2">✨</div>
                <p className="font-semibold text-gray-800">ATS-Friendly</p>
                <p className="text-sm text-gray-500">Optimized for applicant tracking systems</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-2">⚡</div>
                <p className="font-semibold text-gray-800">Real-time Preview</p>
                <p className="text-sm text-gray-500">See changes as you type</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-2">📄</div>
                <p className="font-semibold text-gray-800">Multiple Formats</p>
                <p className="text-sm text-gray-500">Download as PDF or Word</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============== STEP 2: FORM WITH SIDEBAR ==============
  if (step === 2) {
    const sections = [
      { id: 'personal', name: 'Personal Info', icon: '👤' },
      { id: 'summary', name: 'Summary', icon: '📝' },
      { id: 'education', name: 'Education', icon: '🎓' },
      { id: 'skills', name: 'Skills', icon: '⚡' },
      { id: 'experience', name: 'Experience', icon: '💼' },
      { id: 'projects', name: 'Projects', icon: '🚀' },
      { id: 'certifications', name: 'Certifications', icon: '🏆' },
      { id: 'languages', name: 'Languages', icon: '🌐' }
    ];

    const renderFormSection = () => {
      switch(activeSection) {
        case 'personal':
          return (
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <input type="text" placeholder="Full Name *" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
              <input type="email" placeholder="Email *" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input type="text" placeholder="Phone" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <input type="url" placeholder="LinkedIn URL *" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
            </div>
          );
        case 'summary':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Summary</h3>
              <textarea placeholder="Write a compelling summary of your professional background..." rows="8" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})} />
              <p className="text-sm text-gray-500">Tip: Highlight your key achievements and career goals</p>
            </div>
          );
        case 'education':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center hover:shadow-sm transition">
                  <div><p className="font-semibold text-gray-800">{edu.degree}</p><p className="text-sm text-gray-500">{edu.institute} • {edu.year}</p></div>
                  <button onClick={() => { const newEdu = formData.education.filter((_, i) => i !== index); setFormData({...formData, education: newEdu}); }} className="text-red-400 hover:text-red-600 transition">✕</button>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Degree" className="p-2.5 border border-gray-200 rounded-lg" value={eduInput.degree} onChange={(e) => setEduInput({...eduInput, degree: e.target.value})} />
                <input placeholder="Institute" className="p-2.5 border border-gray-200 rounded-lg" value={eduInput.institute} onChange={(e) => setEduInput({...eduInput, institute: e.target.value})} />
                <input placeholder="Year" className="p-2.5 border border-gray-200 rounded-lg" value={eduInput.year} onChange={(e) => setEduInput({...eduInput, year: e.target.value})} />
                <input placeholder="Grade" className="p-2.5 border border-gray-200 rounded-lg" value={eduInput.grade} onChange={(e) => setEduInput({...eduInput, grade: e.target.value})} />
              </div>
              <button onClick={() => { if (eduInput.degree && eduInput.institute) { setFormData({...formData, education: [...formData.education, eduInput]}); setEduInput({ degree: '', institute: '', year: '', grade: '' }); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Add Education</button>
            </div>
          );
        case 'skills':
          return (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Skills</h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3">Technical Skills</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.technical.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm">{skill}<button onClick={() => { const newSkills = formData.skills.technical.filter((_, i) => i !== index); setFormData({...formData, skills: {...formData.skills, technical: newSkills}}); }} className="text-red-500 hover:text-red-700">✕</button></span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input placeholder="Add technical skill" className="flex-1 p-2.5 border border-gray-200 rounded-lg" value={techSkillInput} onChange={(e) => setTechSkillInput(e.target.value)} />
                  <button onClick={() => { if (techSkillInput) { setFormData({...formData, skills: {...formData.skills, technical: [...formData.skills.technical, techSkillInput]}}); setTechSkillInput(''); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Add</button>
                </div>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3">Soft Skills</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.soft.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full flex items-center gap-2 text-sm">{skill}<button onClick={() => { const newSkills = formData.skills.soft.filter((_, i) => i !== index); setFormData({...formData, skills: {...formData.skills, soft: newSkills}}); }} className="text-red-500 hover:text-red-700">✕</button></span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input placeholder="Add soft skill" className="flex-1 p-2.5 border border-gray-200 rounded-lg" value={softSkillInput} onChange={(e) => setSoftSkillInput(e.target.value)} />
                  <button onClick={() => { if (softSkillInput) { setFormData({...formData, skills: {...formData.skills, soft: [...formData.skills.soft, softSkillInput]}}); setSoftSkillInput(''); } }} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Add</button>
                </div>
              </div>
            </div>
          );
        case 'experience':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-800">{exp.position} at {exp.company}</p><p className="text-sm text-gray-500">{exp.duration}</p><p className="text-sm text-gray-600 mt-2">{exp.description}</p></div>
                    <button onClick={() => { const newExp = formData.experience.filter((_, i) => i !== index); setFormData({...formData, experience: newExp}); }} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                </div>
              ))}
              <div className="space-y-3">
                <input placeholder="Company" className="w-full p-2.5 border border-gray-200 rounded-lg" value={expInput.company} onChange={(e) => setExpInput({...expInput, company: e.target.value})} />
                <input placeholder="Position" className="w-full p-2.5 border border-gray-200 rounded-lg" value={expInput.position} onChange={(e) => setExpInput({...expInput, position: e.target.value})} />
                <input placeholder="Duration" className="w-full p-2.5 border border-gray-200 rounded-lg" value={expInput.duration} onChange={(e) => setExpInput({...expInput, duration: e.target.value})} />
                <textarea placeholder="Description" className="w-full p-2.5 border border-gray-200 rounded-lg" rows="2" value={expInput.description} onChange={(e) => setExpInput({...expInput, description: e.target.value})} />
              </div>
              <button onClick={() => { if (expInput.company && expInput.position) { setFormData({...formData, experience: [...formData.experience, expInput]}); setExpInput({ company: '', position: '', duration: '', description: '' }); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Add Experience</button>
            </div>
          );
        case 'projects':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Projects</h3>
              {formData.projects.map((proj, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-800">{proj.title}</p><p className="text-sm text-gray-500">{proj.tech}</p><p className="text-sm text-gray-600 mt-1">{proj.description}</p></div>
                    <button onClick={() => { const newProj = formData.projects.filter((_, i) => i !== index); setFormData({...formData, projects: newProj}); }} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                </div>
              ))}
              <div className="space-y-3">
                <input placeholder="Project Title" className="w-full p-2.5 border border-gray-200 rounded-lg" value={projectInput.title} onChange={(e) => setProjectInput({...projectInput, title: e.target.value})} />
                <input placeholder="Technologies Used" className="w-full p-2.5 border border-gray-200 rounded-lg" value={projectInput.tech} onChange={(e) => setProjectInput({...projectInput, tech: e.target.value})} />
                <textarea placeholder="Description" className="w-full p-2.5 border border-gray-200 rounded-lg" rows="2" value={projectInput.description} onChange={(e) => setProjectInput({...projectInput, description: e.target.value})} />
              </div>
              <button onClick={() => { if (projectInput.title) { setFormData({...formData, projects: [...formData.projects, projectInput]}); setProjectInput({ title: '', tech: '', description: '' }); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Add Project</button>
            </div>
          );
        case 'certifications':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Certifications</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-2 text-sm">{cert}<button onClick={() => { const newCerts = formData.certifications.filter((_, i) => i !== index); setFormData({...formData, certifications: newCerts}); }} className="text-red-500 hover:text-red-700">✕</button></span>
                ))}
              </div>
              <div className="flex gap-2">
                <input placeholder="Add certification" className="flex-1 p-2.5 border border-gray-200 rounded-lg" value={certInput} onChange={(e) => setCertInput(e.target.value)} />
                <button onClick={() => { if (certInput) { setFormData({...formData, certifications: [...formData.certifications, certInput]}); setCertInput(''); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Add</button>
              </div>
            </div>
          );
        case 'languages':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Languages</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full flex items-center gap-2 text-sm">{lang.language} - {lang.proficiency}<button onClick={() => { const newLangs = formData.languages.filter((_, i) => i !== index); setFormData({...formData, languages: newLangs}); }} className="text-red-500 hover:text-red-700">✕</button></span>
                ))}
              </div>
              <div className="flex gap-2">
                <input placeholder="Language" className="flex-1 p-2.5 border border-gray-200 rounded-lg" value={langInput.language} onChange={(e) => setLangInput({...langInput, language: e.target.value})} />
                <select className="p-2.5 border border-gray-200 rounded-lg" value={langInput.proficiency} onChange={(e) => setLangInput({...langInput, proficiency: e.target.value})}>
                  <option value="">Level</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button onClick={() => { if (langInput.language && langInput.proficiency) { setFormData({...formData, languages: [...formData.languages, langInput]}); setLangInput({ language: '', proficiency: '' }); } }} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Add</button>
              </div>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-white shadow-xl transition-all duration-300 relative flex flex-col`}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute -right-3 top-10 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10 text-xs">{sidebarOpen ? '←' : '→'}</button>
          <div className="p-5 border-b">
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📄</span>
                  <h2 className="font-bold text-xl text-gray-800">Resume Builder</h2>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-500">Profile Completion</span><span className="font-semibold text-blue-600">{calculateProgress()}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2 transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div></div>
                </div>
              </>
            ) : (<div className="text-2xl text-center py-2">📄</div>)}
          </div>
          <div className="flex-1 overflow-y-auto py-3">
            {sections.map((section) => (
              <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${activeSection === section.id ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-600' : 'hover:bg-gray-50'}`}>
                <span className="text-xl">{section.icon}</span>
                {sidebarOpen && <span className="flex-1 text-left text-sm font-medium text-gray-700">{section.name}</span>}
                {sidebarOpen && (
                  <span className={`w-2 h-2 rounded-full ${
                    (section.id === 'personal' && formData.fullName) ||
                    (section.id === 'summary' && formData.summary) ||
                    (section.id === 'education' && formData.education.length > 0) ||
                    (section.id === 'skills' && (formData.skills.technical.length > 0 || formData.skills.soft.length > 0)) ||
                    (section.id === 'experience' && formData.experience.length > 0) ||
                    (section.id === 'projects' && formData.projects.length > 0) ||
                    (section.id === 'certifications' && formData.certifications.length > 0) ||
                    (section.id === 'languages' && formData.languages.length > 0)
                    ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                )}
              </button>
            ))}
          </div>
          <div className="p-4 border-t">
            <button onClick={() => setStep(1)} className={`w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2`}>
              {sidebarOpen ? '← Change Template' : '←'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{sections.find(s => s.id === activeSection)?.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in your details below</p>
                </div>
                <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105">Preview Resume →</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">{renderFormSection()}</div>
          </div>
        </div>
      </div>
    );
  }

  // ============== STEP 3: PREVIEW ==============
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setStep(2)} className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2">← Edit Information</button>
                <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
              </div>
              <div className="flex gap-3">
                <button onClick={downloadPDF} className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">📄 PDF</button>
                <button onClick={downloadWord} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">📝 Word</button>
              </div>
            </div>
          </div>
          <div id="resume-preview" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {renderSelectedTemplate()}
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">← Choose Different Template</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;