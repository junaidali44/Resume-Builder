import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    education: [],
    skills: [],
    experience: []
  });
  const [eduInput, setEduInput] = useState({ degree: '', institute: '', year: '' });
  const [skillInput, setSkillInput] = useState('');
  const [expInput, setExpInput] = useState({ company: '', position: '', duration: '' });

  const templates = [
    { id: 1, name: 'Modern Professional', color: 'bg-blue-600', icon: '💼' },
    { id: 2, name: 'Classic Executive', color: 'bg-gray-800', icon: '👔' },
    { id: 3, name: 'Creative Portfolio', color: 'bg-pink-600', icon: '🎨' },
    { id: 4, name: 'Minimalist Clean', color: 'bg-teal-600', icon: '✨' },
    { id: 5, name: 'Academic Research', color: 'bg-red-600', icon: '📚' }
  ];

  // PDF Download Function
  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width * 0.75, canvas.height * 0.75]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75);
    pdf.save('resume.pdf');
  };

  // Word Download Function
  const downloadWord = () => {
    const content = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>${formData.fullName || 'Your Name'}</h1>
          <p>Email: ${formData.email}</p>
          <p>Phone: ${formData.phone}</p>
          <p>LinkedIn: ${formData.linkedin}</p>
          <p>Summary: ${formData.summary}</p>
          
          <h2>Education</h2>
          ${formData.education.map(edu => `<p>${edu.degree} - ${edu.institute} (${edu.year})</p>`).join('')}
          
          <h2>Skills</h2>
          <p>${formData.skills.join(', ')}</p>
          
          <h2>Experience</h2>
          ${formData.experience.map(exp => `<p>${exp.position} at ${exp.company} (${exp.duration})</p>`).join('')}
        </body>
      </html>
    `;
    
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, 'resume.doc');
  };

  // Step 1: Template Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Resume Builder</h1>
          <p className="text-center text-gray-600 mb-8">Choose a template to get started</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setTemplate(t.id);
                  setStep(2);
                }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all p-6 border-2 border-transparent hover:border-blue-500"
              >
                <div className={`${t.color} h-32 rounded-lg mb-4 flex items-center justify-center text-4xl text-white`}>
                  {t.icon}
                </div>
                <h3 className="font-semibold text-center">{t.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Form
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
          
          {/* Personal Info */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full p-3 border rounded-lg"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 border rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <input
              type="url"
              placeholder="LinkedIn URL *"
              className="w-full p-3 border rounded-lg"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
            />
            <textarea
              placeholder="Professional Summary"
              className="w-full p-3 border rounded-lg h-24"
              value={formData.summary}
              onChange={(e) => setFormData({...formData, summary: e.target.value})}
            />
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2 flex justify-between">
                <span>{edu.degree} - {edu.institute} ({edu.year})</span>
                <button 
                  onClick={() => {
                    const newEdu = formData.education.filter((_, i) => i !== index);
                    setFormData({...formData, education: newEdu});
                  }}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 mt-2">
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
            </div>
            <button
              onClick={() => {
                if (eduInput.degree && eduInput.institute) {
                  setFormData({...formData, education: [...formData.education, eduInput]});
                  setEduInput({ degree: '', institute: '', year: '' });
                }
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
                  {skill}
                  <button 
                    onClick={() => {
                      const newSkills = formData.skills.filter((_, i) => i !== index);
                      setFormData({...formData, skills: newSkills});
                    }}
                    className="text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                placeholder="Add a skill"
                className="flex-1 p-2 border rounded"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button
                onClick={() => {
                  if (skillInput) {
                    setFormData({...formData, skills: [...formData.skills, skillInput]});
                    setSkillInput('');
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2 flex justify-between">
                <span>{exp.position} at {exp.company} ({exp.duration})</span>
                <button 
                  onClick={() => {
                    const newExp = formData.experience.filter((_, i) => i !== index);
                    setFormData({...formData, experience: newExp});
                  }}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input
                placeholder="Company"
                className="p-2 border rounded"
                value={expInput.company}
                onChange={(e) => setExpInput({...expInput, company: e.target.value})}
              />
              <input
                placeholder="Position"
                className="p-2 border rounded"
                value={expInput.position}
                onChange={(e) => setExpInput({...expInput, position: e.target.value})}
              />
              <input
                placeholder="Duration"
                className="p-2 border rounded"
                value={expInput.duration}
                onChange={(e) => setExpInput({...expInput, duration: e.target.value})}
              />
            </div>
            <button
              onClick={() => {
                if (expInput.company && expInput.position) {
                  setFormData({...formData, experience: [...formData.experience, expInput]});
                  setExpInput({ company: '', position: '', duration: '' });
                }
              }}
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              Add Experience
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!formData.linkedin) {
                  alert('LinkedIn URL is required!');
                  return;
                }
                setStep(3);
              }}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Preview with Download Buttons
  const getResumePreview = () => {
    const data = formData;
    
    switch(template) {
      case 1:
        return (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <h1 className="text-3xl font-bold">{data.fullName || 'Your Name'}</h1>
              <p className="mt-2">{data.email}</p>
              <p>{data.phone}</p>
              <a href={data.linkedin} className="text-blue-200 underline text-sm">LinkedIn</a>
            </div>
            <div className="p-6">
              {data.summary && <p className="mb-4">{data.summary}</p>}
              
              {data.education.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">Education</h2>
                  {data.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institute} - {edu.year}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {data.skills.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.experience.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Experience</h2>
                  {data.experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-semibold">{exp.position} at {exp.company}</p>
                      <p className="text-gray-600">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-white p-6">
            <h1 className="text-2xl font-bold">{data.fullName || 'Your Name'}</h1>
            <p>{data.email}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Your Resume</h1>
        
        <div id="resume-preview" className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {getResumePreview()}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep(2)}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Information
          </button>
          <button
            onClick={downloadPDF}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Download PDF
          </button>
          <button
            onClick={downloadWord}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download DOC
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;