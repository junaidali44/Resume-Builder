import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState(null);
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

  const templates = [
    { id: 1, name: 'Executive Pro', color: 'from-slate-900 to-slate-700', icon: '👔', bg: 'bg-slate-900' },
    { id: 2, name: 'Creative Edge', color: 'from-purple-600 to-pink-600', icon: '🎨', bg: 'bg-purple-600' },
    { id: 3, name: 'Modern Tech', color: 'from-cyan-600 to-blue-600', icon: '💻', bg: 'bg-cyan-600' },
    { id: 4, name: 'Minimal Luxe', color: 'from-stone-800 to-stone-600', icon: '✨', bg: 'bg-stone-800' },
    { id: 5, name: 'Academic Plus', color: 'from-emerald-800 to-teal-600', icon: '📚', bg: 'bg-emerald-800' }
  ];

  // FIXED PDF Download with Perfect Alignment
  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    try {
      // Create a clone for PDF generation
      const clone = element.cloneNode(true);
      clone.style.width = '800px';
      clone.style.padding = '20px';
      clone.style.margin = '0';
      clone.style.backgroundColor = '#ffffff';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      document.body.removeChild(clone);
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit PDF
      const imgWidth = pdfWidth - 20; // 10mm margins on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let position = 10; // Top margin
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
      
      pdf.save(`${formData.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      // Fallback: simple text PDF
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text(formData.fullName || 'Resume', 20, 20);
      pdf.setFontSize(12);
      pdf.text(formData.email || '', 20, 30);
      pdf.save(`${formData.fullName || 'Resume'}.pdf`);
    }
  };

  // Word Download
  const downloadWord = () => {
    const content = generateWordContent();
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, `${formData.fullName || 'Resume'}.doc`);
  };

  const generateWordContent = () => {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1a1a1a; font-size: 32px; }
            .section { margin: 20px 0; }
            .skill-tag { background: #f0f0f0; padding: 5px 12px; border-radius: 20px; display: inline-block; margin: 5px; }
          </style>
        </head>
        <body>
          <h1>${formData.fullName || 'Your Name'}</h1>
          <p>${formData.email || 'email@example.com'} | ${formData.phone || ''}</p>
          ${formData.linkedin ? `<p>LinkedIn: ${formData.linkedin}</p>` : ''}
          ${formData.summary ? `<div class="section"><h3>Summary</h3><p>${formData.summary}</p></div>` : ''}
          
          ${formData.education.length > 0 ? `
            <div class="section">
              <h3>Education</h3>
              ${formData.education.map(edu => `
                <div>
                  <strong>${edu.degree}</strong> - ${edu.institute} (${edu.year})
                  ${edu.grade ? `<br>Grade: ${edu.grade}` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${formData.skills.technical.length > 0 || formData.skills.soft.length > 0 ? `
            <div class="section">
              <h3>Skills</h3>
              ${formData.skills.technical.map(s => `<span class="skill-tag">${s}</span>`).join('')}
              ${formData.skills.soft.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  // Progress Calculation
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    
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

  // Template 1: Executive Pro
  const Template1 = () => (
    <div className="font-sans bg-white p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8 -m-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{formData.fullName || 'John Doe'}</h1>
        <p className="text-lg opacity-90">{formData.email || 'john.doe@email.com'}</p>
        {formData.phone && <p className="text-sm opacity-75 mt-1">{formData.phone}</p>}
        {formData.linkedin && (
          <p className="text-sm mt-2">
            <a href={formData.linkedin} className="text-amber-400 hover:underline">LinkedIn Profile</a>
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        {formData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b-2 border-amber-500 pb-2 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1">
            {formData.skills.technical.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Technical Skills</h2>
                <div className="space-y-2">
                  {formData.skills.technical.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{skill}</span>
                        <span className="text-amber-600">●●●○○</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.skills.soft.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3">Education</h2>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institute}</p>
                    <p className="text-xs text-gray-500">{edu.year} {edu.grade && `• ${edu.grade}`}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            {formData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Experience</h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-amber-600 text-sm">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Projects</h2>
                {formData.projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-semibold text-gray-800">{proj.title}</h3>
                    <p className="text-sm text-amber-600">{proj.tech}</p>
                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.certifications.length > 0 && (
              <div className="mb-3">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      🏅 {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {lang.language} - {lang.proficiency}
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

  // Template 2: Creative Edge
  const Template2 = () => (
    <div className="font-sans bg-white p-8">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 p-8 -m-8 mb-8 text-white">
        <h1 className="text-5xl font-black mb-2">{formData.fullName || 'John Doe'}</h1>
        <p className="text-xl opacity-90">{formData.email || 'john@example.com'}</p>
        {formData.phone && <p className="text-sm opacity-75 mt-1">{formData.phone}</p>}
      </div>
      
      <div>
        {formData.summary && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <p className="text-gray-700 italic">{formData.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            {formData.skills.technical.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.technical.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm">
                      💻 {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.skills.soft.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      🤝 {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">Education</h2>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institute}</p>
                    <p className="text-xs text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {formData.experience.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Experience</h2>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-4 border-l-4 border-pink-400 pl-3">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-pink-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                    <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.projects.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Projects</h2>
                {formData.projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                    <p className="text-sm text-purple-600">{proj.tech}</p>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {(formData.certifications.length > 0 || formData.languages.length > 0) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              {formData.certifications.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-gray-800 mb-2">Certifications</h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                        🏆 {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {formData.languages.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-gray-800 mb-2">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.languages.map((lang, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {lang.language} - {lang.proficiency}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 3: Modern Tech
  const Template3 = () => (
    <div className="font-mono bg-gray-900 text-white p-8">
      <div className="border-b border-cyan-500 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-cyan-400">{formData.fullName || 'John Doe'}</h1>
        <p className="text-gray-400 mt-1">{formData.email || 'john@example.com'}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-2">Tech Stack</h2>
              <div className="space-y-1">
                {formData.skills.technical.map((skill, i) => (
                  <div key={i} className="bg-gray-800 px-3 py-1 rounded text-sm flex items-center gap-2">
                    <span className="text-cyan-400">▶</span> {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-2">Education</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="text-sm mb-2">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-gray-400">{edu.institute}</p>
                  <p className="text-gray-500 text-xs">{edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          {formData.summary && (
            <div className="mb-4 p-3 bg-gray-800 rounded">
              <p className="text-sm text-gray-300">{formData.summary}</p>
            </div>
          )}
          
          {formData.experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-cyan-400 font-bold mb-2">Experience</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <p className="font-bold">{exp.position} <span className="text-cyan-400">@</span> {exp.company}</p>
                  <p className="text-xs text-cyan-400">{exp.duration}</p>
                  <p className="text-sm text-gray-400 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-2">Projects</h2>
              {formData.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold">{proj.title}</p>
                  <p className="text-xs text-cyan-400">{proj.tech}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Template 4: Minimal Luxe
  const Template4 = () => (
    <div className="font-sans bg-white p-12">
      <div className="text-center border-b border-stone-200 pb-8 mb-8">
        <h1 className="text-5xl font-light text-stone-800">{formData.fullName || 'John Doe'}</h1>
        <div className="w-16 h-0.5 bg-stone-300 mx-auto my-4"></div>
        <p className="text-stone-500">{formData.email || 'john@example.com'}</p>
      </div>
      
      <div>
        {formData.summary && (
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-8 italic">{formData.summary}</p>
        )}

        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Education</h2>
            {formData.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <p className="font-medium text-stone-800">{edu.degree}</p>
                <p className="text-sm text-stone-500">{edu.institute}</p>
                <p className="text-xs text-stone-400">{edu.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Experience</h2>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <p className="font-medium text-stone-800">{exp.position}</p>
                <p className="text-sm text-stone-500">{exp.company}</p>
                <p className="text-xs text-stone-400">{exp.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {formData.skills.technical.length > 0 && (
          <div className="mt-8 pt-8 border-t border-stone-200">
            <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.technical.map((skill, i) => (
                <span key={i} className="text-sm text-stone-600 border border-stone-300 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 5: Academic Plus
  const Template5 = () => (
    <div className="font-serif bg-stone-50 p-8">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-600 p-6 -m-8 mb-8 text-white">
        <h1 className="text-4xl font-bold">{formData.fullName || 'John Doe'}</h1>
        <p className="text-emerald-100 mt-1">{formData.email || 'john@example.com'}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 border-r border-stone-200 pr-4">
          {formData.education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-emerald-800 mb-3">Education</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-bold text-stone-800">{edu.degree}</p>
                  <p className="text-sm text-stone-600">{edu.institute}</p>
                  <p className="text-xs text-stone-500">{edu.year}</p>
                </div>
              ))}
            </div>
          )}
          
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-3">Research Skills</h2>
              <ul className="list-disc list-inside">
                {formData.skills.technical.map((skill, i) => (
                  <li key={i} className="text-sm text-stone-700 mb-1">{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-2">
          {formData.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-emerald-800 mb-2">Research Interests</h2>
              <p className="text-stone-700 italic border-l-4 border-emerald-600 pl-3">{formData.summary}</p>
            </div>
          )}
          
          {formData.experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-emerald-800 mb-3">Academic Experience</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <p className="font-bold text-stone-800">{exp.position}</p>
                  <p className="text-sm text-emerald-700">{exp.company}</p>
                  <p className="text-xs text-stone-500">{exp.duration}</p>
                  <p className="text-sm text-stone-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {formData.projects.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold text-emerald-800 mb-3">Publications & Projects</h2>
              {formData.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{proj.title}</p>
                  <p className="text-xs text-emerald-600">{proj.tech}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ============== RENDER LOGIC ==============

  // Step 1: Template Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Template
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">Select a design that matches your professional style</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setTemplate(t.id);
                  setStep(2);
                }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${t.color} rounded-2xl p-6 h-64 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="text-6xl mb-4">{t.icon}</div>
                  <h3 className="text-white text-xl font-bold">{t.name}</h3>
                  <div className="absolute bottom-4 right-4 text-white opacity-50 group-hover:opacity-100 transition-opacity">
                    Select →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Form with Sidebar
  if (step === 2) {
    const sections = [
      { id: 'personal', name: 'Personal Info', icon: '👤' },
      { id: 'summary', name: 'Summary', icon: '📝' },
      { id: 'education', name: 'Education', icon: '🎓' },
      { id: 'skills', name: 'Skills', icon: '⚡' },
      { id: 'experience', name: 'Experience', icon: '💼' },
      { id: 'projects', name: 'Projects', icon: '🚀' },
      { id: 'certifications', name: 'Certifications', icon: '🏆' },
      { id: 'languages', name: 'Languages', icon: '🌐' },
    ];

    const renderFormSection = () => {
      switch(activeSection) {
        case 'personal':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full p-3 border rounded-xl"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full p-3 border rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input
                type="url"
                placeholder="LinkedIn URL *"
                className="w-full p-3 border rounded-xl"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              />
            </div>
          );

        case 'summary':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Summary</h3>
              <textarea
                placeholder="Write your professional summary..."
                rows="6"
                className="w-full p-4 border rounded-xl"
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
              />
            </div>
          );

        case 'education':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institute} • {edu.year}</p>
                  </div>
                  <button onClick={() => {
                    const newEdu = formData.education.filter((_, i) => i !== index);
                    setFormData({...formData, education: newEdu});
                  }} className="text-red-500">✕</button>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Degree"
                  className="p-2 border rounded"
                  value={eduInput.degree}
                  onChange={(e) => setEduInput({...eduInput, degree: e.target.value})}
                />
                <input
                  placeholder="Institute"
                  className="p-2 border rounded"
                  value={eduInput.institute}
                  onChange={(e) => setEduInput({...eduInput, institute: e.target.value})}
                />
                <input
                  placeholder="Year"
                  className="p-2 border rounded"
                  value={eduInput.year}
                  onChange={(e) => setEduInput({...eduInput, year: e.target.value})}
                />
                <input
                  placeholder="Grade"
                  className="p-2 border rounded"
                  value={eduInput.grade}
                  onChange={(e) => setEduInput({...eduInput, grade: e.target.value})}
                />
              </div>
              <button
                onClick={() => {
                  if (eduInput.degree && eduInput.institute) {
                    setFormData({...formData, education: [...formData.education, eduInput]});
                    setEduInput({ degree: '', institute: '', year: '', grade: '' });
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                + Add Education
              </button>
            </div>
          );

        case 'skills':
          return (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Skills</h3>
              
              {/* Technical Skills */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold mb-3">Technical Skills</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.technical.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
                      {skill}
                      <button onClick={() => {
                        const newSkills = formData.skills.technical.filter((_, i) => i !== index);
                        setFormData({...formData, skills: {...formData.skills, technical: newSkills}});
                      }} className="text-red-500">✕</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="Add technical skill"
                    className="flex-1 p-2 border rounded"
                    value={techSkillInput}
                    onChange={(e) => setTechSkillInput(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (techSkillInput) {
                        setFormData({
                          ...formData, 
                          skills: {
                            ...formData.skills,
                            technical: [...formData.skills.technical, techSkillInput]
                          }
                        });
                        setTechSkillInput('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold mb-3">Soft Skills</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.soft.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
                      {skill}
                      <button onClick={() => {
                        const newSkills = formData.skills.soft.filter((_, i) => i !== index);
                        setFormData({...formData, skills: {...formData.skills, soft: newSkills}});
                      }} className="text-red-500">✕</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="Add soft skill"
                    className="flex-1 p-2 border rounded"
                    value={softSkillInput}
                    onChange={(e) => setSoftSkillInput(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (softSkillInput) {
                        setFormData({
                          ...formData, 
                          skills: {
                            ...formData.skills,
                            soft: [...formData.skills.soft, softSkillInput]
                          }
                        });
                        setSoftSkillInput('');
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          );

        case 'experience':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between">
                  <div>
                    <p className="font-semibold">{exp.position} at {exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.duration}</p>
                  </div>
                  <button onClick={() => {
                    const newExp = formData.experience.filter((_, i) => i !== index);
                    setFormData({...formData, experience: newExp});
                  }} className="text-red-500">✕</button>
                </div>
              ))}
              <div className="space-y-3">
                <input
                  placeholder="Company"
                  className="w-full p-2 border rounded"
                  value={expInput.company}
                  onChange={(e) => setExpInput({...expInput, company: e.target.value})}
                />
                <input
                  placeholder="Position"
                  className="w-full p-2 border rounded"
                  value={expInput.position}
                  onChange={(e) => setExpInput({...expInput, position: e.target.value})}
                />
                <input
                  placeholder="Duration"
                  className="w-full p-2 border rounded"
                  value={expInput.duration}
                  onChange={(e) => setExpInput({...expInput, duration: e.target.value})}
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  rows="2"
                  value={expInput.description}
                  onChange={(e) => setExpInput({...expInput, description: e.target.value})}
                />
              </div>
              <button
                onClick={() => {
                  if (expInput.company && expInput.position) {
                    setFormData({...formData, experience: [...formData.experience, expInput]});
                    setExpInput({ company: '', position: '', duration: '', description: '' });
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                + Add Experience
              </button>
            </div>
          );

        case 'projects':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Projects</h3>
              {formData.projects.map((proj, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between">
                  <div>
                    <p className="font-semibold">{proj.title}</p>
                    <p className="text-sm text-gray-600">{proj.tech}</p>
                  </div>
                  <button onClick={() => {
                    const newProj = formData.projects.filter((_, i) => i !== index);
                    setFormData({...formData, projects: newProj});
                  }} className="text-red-500">✕</button>
                </div>
              ))}
              <div className="space-y-3">
                <input
                  placeholder="Project Title"
                  className="w-full p-2 border rounded"
                  value={projectInput.title}
                  onChange={(e) => setProjectInput({...projectInput, title: e.target.value})}
                />
                <input
                  placeholder="Technologies Used"
                  className="w-full p-2 border rounded"
                  value={projectInput.tech}
                  onChange={(e) => setProjectInput({...projectInput, tech: e.target.value})}
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  rows="2"
                  value={projectInput.description}
                  onChange={(e) => setProjectInput({...projectInput, description: e.target.value})}
                />
              </div>
              <button
                onClick={() => {
                  if (projectInput.title) {
                    setFormData({...formData, projects: [...formData.projects, projectInput]});
                    setProjectInput({ title: '', tech: '', description: '' });
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                + Add Project
              </button>
            </div>
          );

        case 'certifications':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2">
                    {cert}
                    <button onClick={() => {
                      const newCerts = formData.certifications.filter((_, i) => i !== index);
                      setFormData({...formData, certifications: newCerts});
                    }} className="text-red-500">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Add certification"
                  className="flex-1 p-2 border rounded"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (certInput) {
                      setFormData({...formData, certifications: [...formData.certifications, certInput]});
                      setCertInput('');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          );

        case 'languages':
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2">
                    {lang.language} - {lang.proficiency}
                    <button onClick={() => {
                      const newLangs = formData.languages.filter((_, i) => i !== index);
                      setFormData({...formData, languages: newLangs});
                    }} className="text-red-500">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Language"
                  className="flex-1 p-2 border rounded"
                  value={langInput.language}
                  onChange={(e) => setLangInput({...langInput, language: e.target.value})}
                />
                <select
                  className="p-2 border rounded"
                  value={langInput.proficiency}
                  onChange={(e) => setLangInput({...langInput, proficiency: e.target.value})}
                >
                  <option value="">Level</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  onClick={() => {
                    if (langInput.language && langInput.proficiency) {
                      setFormData({...formData, languages: [...formData.languages, langInput]});
                      setLangInput({ language: '', proficiency: '' });
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-2xl transition-all duration-300 relative flex flex-col`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-10 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
          >
            {sidebarOpen ? '←' : '→'}
          </button>

          <div className="p-4 border-b">
            {sidebarOpen ? (
              <>
                <h2 className="font-bold text-xl text-gray-800">Resume Builder</h2>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-indigo-600">{calculateProgress()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 rounded-full h-2" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-2xl text-center">📋</div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-indigo-50 ${
                  activeSection === section.id ? 'bg-indigo-50 border-r-4 border-indigo-600' : ''
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">{section.name}</span>
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
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={() => setStep(1)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              {sidebarOpen ? '← Templates' : '←'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {sections.find(s => s.id === activeSection)?.name}
                </h2>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Preview Resume
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              {renderFormSection()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Preview with ALL data rendering
  if (step === 3) {
    const renderTemplate = () => {
      switch(template) {
        case 1: return <Template1 />;
        case 2: return <Template2 />;
        case 3: return <Template3 />;
        case 4: return <Template4 />;
        case 5: return <Template5 />;
        default: return <Template1 />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  ← Edit
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
              </div>
              <div className="flex gap-3">
                <button onClick={downloadPDF} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  📄 PDF
                </button>
                <button onClick={downloadWord} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  📝 Word
                </button>
              </div>
            </div>
          </div>

          <div id="resume-preview" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {renderTemplate()}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-4 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            ← Choose Different Template
          </button>
        </div>
      </div>
    );
  }
}

export default App;