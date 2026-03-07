// Template 2: Creative Edge - COMPLETE & ENHANCED
const Template2 = () => (
  <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 p-8 text-white">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'JD'}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{formData.fullName || 'John Doe'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/90">
            <span>✉️ {formData.email || 'john@example.com'}</span>
            {formData.phone && <span>📞 {formData.phone}</span>}
          </div>
          {formData.linkedin && (
            <p className="text-sm mt-2 text-white/80">🔗 {formData.linkedin}</p>
          )}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-8">
      {/* Summary */}
      {formData.summary && (
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <p className="text-gray-700 italic text-lg">{formData.summary}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Technical Skills */}
          {formData.skills.technical.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.technical.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium shadow-sm">
                    💻 {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {formData.skills.soft.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.soft.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
                    🤝 {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Education
              </h2>
              <div className="space-y-3">
                {formData.education.map((edu, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institute}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.year} • GPA: {edu.grade || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Languages
              </h2>
              <div className="space-y-2">
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-20 font-medium text-gray-700">{lang.language}:</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: lang.proficiency === 'Native' ? '100%' : lang.proficiency === 'Fluent' ? '90%' : lang.proficiency === 'Intermediate' ? '70%' : '50%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Experience
              </h2>
              <div className="space-y-4">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-pink-600 text-sm font-medium">{exp.company}</p>
                    <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Projects
              </h2>
              <div className="space-y-3">
                {formData.projects.map((proj, i) => (
                  <div key={i} className="border-l-4 border-pink-400 pl-4">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                    <p className="text-sm text-purple-600 mb-1">{proj.tech}</p>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, i) => (
                  <span key={i} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
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