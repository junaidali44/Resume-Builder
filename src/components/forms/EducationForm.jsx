import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPlus, FaTrash, FaGraduationCap } from 'react-icons/fa';

const EducationForm = () => {
  const education = useResumeStore((state) => state.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  const handleAdd = () => {
    addEducation({
      degree: '',
      institute: '',
      year: '',
      grade: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaGraduationCap className="text-purple-600" />
        Education
      </h3>

      <AnimatePresence>
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg relative"
          >
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Degree / Qualification"
                value={edu.degree || ''}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Institute Name"
                value={edu.institute || ''}
                onChange={(e) => updateEducation(edu.id, { institute: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year || ''}
                  onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Grade / %"
                  value={edu.grade || ''}
                  onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={handleAdd}
        className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
      >
        <FaPlus /> Add Education
      </button>
    </motion.div>
  );
};

export default EducationForm;