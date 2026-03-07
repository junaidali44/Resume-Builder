import React from 'react';
import { motion } from 'framer-motion';

const FormSection = ({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

export default FormSection;