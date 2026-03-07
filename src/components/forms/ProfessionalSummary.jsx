import React from 'react';
import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPen } from 'react-icons/fa';

const ProfessionalSummary = () => {
  const summary = useResumeStore((state) => state.professionalSummary);
  const updateSummary = useResumeStore((state) => state.updateProfessionalSummary);

  const prompts = [
    "Experienced professional with a proven track record in...",
    "Recent graduate with a degree in... passionate about...",
    "Results-driven professional seeking opportunities in...",
    "Innovative thinker with expertise in...",
    "Dedicated professional committed to excellence in..."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaPen className="text-purple-600" />
        Professional Summary
      </h3>

      <textarea
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a short career objective or professional summary..."
        rows="6"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
      />

      <div className="text-sm text-gray-500 flex justify-between">
        <span>Tip: Highlight your key strengths and career goals</span>
        <span>{summary.length} characters</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => updateSummary(prompt)}
            className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            Prompt {index + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfessionalSummary;