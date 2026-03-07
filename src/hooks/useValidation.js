import { useState } from 'react';
import { validateEmail, validatePhone, validateLinkedIn, validateRequired } from '../utils/validators';

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch(name) {
      case 'email':
        return validateEmail(value) ? '' : 'Invalid email address';
      case 'phone':
        return !value || validatePhone(value) ? '' : 'Invalid phone number';
      case 'linkedin':
        return validateLinkedIn(value) ? '' : 'Invalid LinkedIn URL';
      case 'fullName':
        return validateRequired(value) ? '' : 'Full name is required';
      default:
        return '';
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach(key => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateField, validateForm, setErrors };
};