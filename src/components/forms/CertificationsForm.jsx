import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaPlus, FaTrash, FaAward } from 'react-icons/fa';

const CertificationsForm = () => {
  const certifications = useResumeStore((state) => state.certifications);
  const addCertification = useResumeStore((state) => state.addCertification);
  const removeCertification = useResumeStore((state) => state.removeCertification);
  const [newCert, setNewCert] = useState('');

  const handleAdd = () => {
    if (newCert.trim()) {
      addCertification({ name: newCert.trim() });
      setNewCert('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaAward className="text-purple-600" />
        Certifications & Achievements
      </h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={newCert}
          onChange={(e) => setNewCert(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add certification or achievement"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none flex-1"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <FaPlus />
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg"
            >
              <span className="text-gray-700">{cert.name}</span>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CertificationsForm;