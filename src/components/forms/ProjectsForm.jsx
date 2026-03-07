import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPlus, FaTrash, FaProjectDiagram } from 'react-icons/fa';

const ProjectsForm = () => {
  const projects = useResumeStore((state) => state.projects);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  const handleAdd = () => {
    addProject({
      title: '',
      technologies: '',
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
        <FaProjectDiagram className="text-purple-600" />
        Projects
      </h3>

      <AnimatePresence>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg relative"
          >
            <button
              onClick={() => removeProject(project.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title || ''}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies || ''}
                onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Project Description"
                value={project.description || ''}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
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
        <FaPlus /> Add Project
      </button>
    </motion.div>
  );
};

export default ProjectsForm;