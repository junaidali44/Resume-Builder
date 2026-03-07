import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATES } from '../../utils/constants';

const TemplateModal = ({ onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Choose Your Template
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Select a template that best represents your professional style
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => onSelect(template.id)}
            >
              <div className={`h-48 bg-gradient-to-br ${template.color} rounded-lg p-4 relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-all`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] p-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full mb-4"></div>
                  <div className="h-4 bg-white/40 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/40 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/30 rounded w-full"></div>
                    <div className="h-3 bg-white/30 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{template.id}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-4xl">{template.icon}</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {template.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplateModal;