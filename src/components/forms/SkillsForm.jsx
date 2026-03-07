import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPlus, FaTrash, FaCode, FaComments } from 'react-icons/fa';
import { SKILL_LEVELS } from '../../utils/constants';

const SkillsForm = () => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  
  const skills = useResumeStore((state) => state.skills);
  const addTechnicalSkill = useResumeStore((state) => state.addTechnicalSkill);
  const addSoftSkill = useResumeStore((state) => state.addSoftSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      addTechnicalSkill(newTechnicalSkill.trim());
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      addSoftSkill(newSoftSkill.trim());
      setNewSoftSkill('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaCode className="text-purple-600" />
        Skills
      </h3>

      {/* Technical Skills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Technical Skills</h4>
          <span className="text-sm text-gray-500">
            {skills.technical.length} skills added
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTechnicalSkill()}
            placeholder="e.g., React, Python, SQL"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none flex-1"
          />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-32 p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {SKILL_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button
            onClick={handleAddTechnicalSkill}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {skills.technical.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="group relative"
              >
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-4 py-2 pr-10">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="ml-2 text-xs text-purple-600">({skill.level})</span>
                  <button
                    onClick={() => removeSkill('technical', skill.id)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Soft Skills</h4>
          <span className="text-sm text-gray-500">
            {skills.soft.length} skills added
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSoftSkill()}
            placeholder="e.g., Communication, Leadership"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none flex-1"
          />
          <button
            onClick={handleAddSoftSkill}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {skills.soft.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="group relative"
              >
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg px-4 py-2 pr-10">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <button
                    onClick={() => removeSkill('soft', skill.id)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsForm;