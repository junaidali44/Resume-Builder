export const TEMPLATES = [
  {
    id: 1,
    name: 'Modern Professional',
    description: 'Clean and contemporary design with gradient accents',
    color: 'from-blue-600 to-purple-600',
    icon: '💼',
  },
  {
    id: 2,
    name: 'Classic Executive',
    description: 'Traditional layout perfect for corporate positions',
    color: 'from-gray-700 to-gray-900',
    icon: '👔',
  },
  {
    id: 3,
    name: 'Creative Portfolio',
    description: 'Bold and artistic design for creative professionals',
    color: 'from-pink-500 to-orange-400',
    icon: '🎨',
  },
  {
    id: 4,
    name: 'Minimalist Clean',
    description: 'Simple and elegant design with plenty of white space',
    color: 'from-teal-400 to-blue-500',
    icon: '✨',
  },
  {
    id: 5,
    name: 'Academic Research',
    description: 'Structured layout for researchers and academics',
    color: 'from-red-500 to-pink-500',
    icon: '📚',
  },
];

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
export const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const PLACEHOLDERS = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  address: 'New York, NY',
  linkedin: 'https://linkedin.com/in/johndoe',
  summary: 'Experienced professional with a passion for...',
};