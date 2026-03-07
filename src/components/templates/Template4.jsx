// Template 4: Minimal Luxe - COMPLETE & ENHANCED
const Template4 = () => (
  <div className="font-sans bg-white max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="p-12 text-center border-b border-stone-200">
      <h1 className="text-5xl font-light text-stone-800 mb-3">{formData.fullName || 'John Doe'}</h1>
      <div className="w-20 h-0.5 bg-stone-300 mx-auto my-4"></div>
      <div className="flex justify-center gap-4 text-stone-500 text-sm">
        <span>{formData.email || 'john@example.com'}</span>
        {formData.phone && <span>• {formData.phone}</span>}
      </div>
      {formData.linkedin && (
        <p className="text-xs text-stone-400 mt-2">{formData.linkedin}</p>
      )}
    </div>

    {/* Content */}
    <div className="p-12">
      {/* Summary */}
      {formData.summary && (
        <p className="text-stone-600 text-center max-w-2xl mx-auto mb-12 italic text-lg leading-relaxed">
          "{formData.summary}"
        </p>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">Education</h2>
              <div className="space-y-6">
                {formData.education.map((edu, i) => (
                  <div key={i} className="border-b border-stone-100 pb-4">
                    <p className="font-medium text-stone-800 text-lg">{edu.degree}</p>
                    <p className="text-sm text-stone-500 mt-1">{edu.institute}</p>
                    <p className="text-xs text-stone-400 mt-1">{edu.year} • {edu.grade || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">Languages</h2>
              <div className="space-y-3">
                {formData.languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-stone-700">{lang.language}</span>
                    <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">Experience</h2>
              <div className="space-y-6">
                {formData.experience.map((exp, i) => (
                  <div key={i}>
                    <p className="font-medium text-stone-800">{exp.position}</p>
                    <p className="text-sm text-stone-500 mt-1">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">Projects</h2>
              <div className="space-y-4">
                {formData.projects.map((proj, i) => (
                  <div key={i}>
                    <p className="font-medium text-stone-800">{proj.title}</p>
                    <p className="text-xs text-stone-500 mt-1">{proj.tech}</p>
                    <p className="text-sm text-stone-600 mt-2">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {(formData.skills.technical.length > 0 || formData.skills.soft.length > 0 || formData.certifications.length > 0) && (
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="grid grid-cols-3 gap-8">
            {/* Technical Skills */}
            {formData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Technical</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.technical.map((skill, i) => (
                    <span key={i} className="text-sm text-stone-600 border border-stone-300 px-4 py-2 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {formData.skills.soft.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.soft.map((skill, i) => (
                    <span key={i} className="text-sm bg-stone-100 text-stone-700 px-4 py-2 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {formData.certifications.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, i) => (
                    <span key={i} className="text-sm bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full">
                      🏅 {cert}
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