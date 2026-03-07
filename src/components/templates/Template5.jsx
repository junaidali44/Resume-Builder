// Template 5: Academic Plus - COMPLETE & ENHANCED
const Template5 = () => (
  <div className="font-serif bg-stone-50 max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="bg-gradient-to-r from-emerald-800 to-teal-600 p-8 text-white">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold text-white border-2 border-white">
          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{formData.fullName || 'John Doe'}</h1>
          <p className="text-emerald-100 text-lg">{formData.email || 'john@example.com'}</p>
          {formData.phone && <p className="text-sm text-emerald-200 mt-1">{formData.phone}</p>}
          {formData.linkedin && (
            <p className="text-xs text-emerald-200 mt-2">🔗 {formData.linkedin}</p>
          )}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-8">
      {/* Summary */}
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-emerald-800 mb-3">Research Statement</h2>
          <p className="text-stone-700 italic border-l-4 border-emerald-600 pl-4 py-2 text-lg">
            {formData.summary}
          </p>
        </div>
      )}

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Education & Skills */}
        <div className="col-span-1 space-y-6">
          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Education</h2>
              <div className="space-y-4">
                {formData.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold text-stone-800">{edu.degree}</p>
                    <p className="text-sm text-stone-600">{edu.institute}</p>
                    <p className="text-xs text-stone-500 mt-1">{edu.year}</p>
                    {edu.grade && (
                      <p className="text-xs font-medium text-emerald-700 mt-1">GPA: {edu.grade}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Research Skills</h2>
              <ul className="list-disc list-inside space-y-1">
                {formData.skills.technical.map((skill, i) => (
                  <li key={i} className="text-sm text-stone-700">{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Languages</h2>
              <div className="space-y-2">
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-stone-700">{lang.language}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle Column - Experience */}
        <div className="col-span-1 space-y-6">
          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Academic Experience</h2>
              <div className="space-y-4">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-bold text-stone-800">{exp.position}</p>
                    <p className="text-sm text-emerald-700">{exp.company}</p>
                    <p className="text-xs text-stone-500 mb-2">{exp.duration}</p>
                    <p className="text-sm text-stone-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {formData.skills.soft.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Teaching & Communication</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.soft.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Projects & Certifications */}
        <div className="col-span-1 space-y-6">
          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Publications & Projects</h2>
              <div className="space-y-4">
                {formData.projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-emerald-300 pl-3">
                    <p className="font-bold text-stone-800">{proj.title}</p>
                    <p className="text-xs text-emerald-700 mb-1">{proj.tech}</p>
                    <p className="text-xs text-stone-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">Certifications</h2>
              <div className="space-y-2">
                {formData.certifications.map((cert, i) => (
                  <div key={i} className="bg-yellow-50 p-3 rounded-lg flex items-center gap-2">
                    <span className="text-yellow-600">🏅</span>
                    <span className="text-sm text-stone-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);