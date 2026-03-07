// Template 1: Executive Pro - COMPLETE & ENHANCED
const Template1 = () => (
  <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-3xl font-bold text-slate-900">
          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{formData.fullName || 'John Doe'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-amber-200">
            <span>✉️ {formData.email || 'john.doe@email.com'}</span>
            {formData.phone && <span>📞 {formData.phone}</span>}
          </div>
          {formData.linkedin && (
            <p className="text-sm mt-2 text-amber-300">🔗 {formData.linkedin}</p>
          )}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-8">
      {/* Summary */}
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 border-b-2 border-amber-500 pb-2 mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Technical Skills */}
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Technical Skills</h2>
              <div className="space-y-3">
                {formData.skills.technical.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{skill}</span>
                      <span className="text-amber-600">★★★★☆</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {formData.skills.soft.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Soft Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.soft.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium shadow-sm">
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Languages</h2>
              <div className="space-y-2">
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Work Experience</h2>
              <div className="space-y-4">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="border-l-4 border-amber-500 pl-4">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-amber-600 text-sm font-medium">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Education</h2>
              <div className="grid grid-cols-2 gap-4">
                {formData.education.map((edu, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institute}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.year} • Grade: {edu.grade || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Projects</h2>
              <div className="space-y-3">
                {formData.projects.map((proj, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                    <p className="text-sm text-amber-600 mb-2">{proj.tech}</p>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, i) => (
                  <span key={i} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
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