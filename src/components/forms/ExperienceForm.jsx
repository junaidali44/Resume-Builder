import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPlus, FaTrash, FaBriefcase } from 'react-icons/fa';

const ExperienceForm = () => {
  const experience = useResumeStore((state) => state.experience);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  const handleAdd = () => {
    addExperience({
      company: '',
      position: '',
      duration: '',
      description: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaBriefcase className="text-purple-600" />
        Work Experience
      </h3>

      <AnimatePresence>
        {experience.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg relative"
          >
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company || ''}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Job Title"
                value={exp.position || ''}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2020-2023)"
                value={exp.duration || ''}
                onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Responsibilities / Description"
                value={exp.description || ''}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows="3"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={handleAdd}
        className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
      >
        <FaPlus /> Add Experience
      </button>
    </motion.div>
  );
};

export default ExperienceForm;