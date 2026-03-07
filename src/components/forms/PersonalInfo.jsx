import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaCamera } from 'react-icons/fa';

const PersonalInfo = () => {
  const personalInfo = useResumeStore((state) => state.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const [photoPreview, setPhotoPreview] = useState(personalInfo.photo || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        updatePersonalInfo({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaUser className="text-purple-600" />
        Personal Information
      </h3>

      {/* Photo Upload */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <FaCamera className="text-3xl text-purple-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={personalInfo.fullName || ''}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={personalInfo.email || ''}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={personalInfo.phone || ''}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              value={personalInfo.address || ''}
              onChange={handleChange}
              placeholder="New York, NY"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              name="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/johndoe"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfo;