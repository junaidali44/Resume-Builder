// Template 3: Modern Tech - COMPLETE & ENHANCED
const Template3 = () => (
  <div className="font-mono bg-gray-900 text-white max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="border-b border-cyan-500 p-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-cyan-500 rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900">
          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">{formData.fullName || 'John Doe'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><span className="text-cyan-400">✉️</span> {formData.email || 'john@example.com'}</span>
            {formData.phone && <span className="flex items-center gap-1"><span className="text-cyan-400">📞</span> {formData.phone}</span>}
          </div>
          {formData.linkedin && (
            <p className="text-sm mt-2 text-cyan-400">🔗 {formData.linkedin}</p>
          )}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-8">
      {/* Summary */}
      {formData.summary && (
        <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-cyan-500/30">
          <p className="text-gray-300">{formData.summary}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Technical Skills */}
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                TECH STACK
              </h2>
              <div className="space-y-2">
                {formData.skills.technical.map((skill, i) => (
                  <div key={i} className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                    <span className="text-cyan-400">▶</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {formData.skills.soft.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                SOFT SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.soft.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-xs border border-cyan-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>{lang.language}</span>
                    <span className="text-cyan-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-cyan-500 pl-4">
                    <h3 className="font-bold text-white">{exp.position}</h3>
                    <p className="text-cyan-400 text-sm">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-400 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                EDUCATION
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {formData.education.map((edu, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg">
                    <p className="font-bold text-white">{edu.degree}</p>
                    <p className="text-sm text-cyan-400">{edu.institute}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.year} • {edu.grade || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                PROJECTS
              </h2>
              <div className="space-y-3">
                {formData.projects.map((proj, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-cyan-400 mb-2">{proj.tech}</p>
                    <p className="text-sm text-gray-400">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications.length > 0 && (
            <div>
              <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400"></span>
                CERTIFICATIONS
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 text-yellow-400 rounded-full text-xs border border-yellow-500/30">
                    🏆 {cert}
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