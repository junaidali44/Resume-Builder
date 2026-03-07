import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useResumeStore = create(
  persist(
    (set, get) => ({
      selectedTemplate: 1,
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        photo: null,
      },
      professionalSummary: '',
      education: [],
      skills: {
        technical: [],
        soft: [],
      },
      experience: [],
      projects: [],
      certifications: [],
      
      setSelectedTemplate: (templateId) => 
        set({ selectedTemplate: templateId }),
      
      updatePersonalInfo: (data) => 
        set({ personalInfo: { ...get().personalInfo, ...data } }),
      
      updateProfessionalSummary: (summary) => 
        set({ professionalSummary: summary }),
      
      addEducation: (education) => 
        set({ education: [...get().education, { id: Date.now(), ...education }] }),
      
      updateEducation: (id, data) => 
        set({
          education: get().education.map(edu => 
            edu.id === id ? { ...edu, ...data } : edu
          )
        }),
      
      removeEducation: (id) => 
        set({ education: get().education.filter(edu => edu.id !== id) }),
      
      addTechnicalSkill: (skillName) => 
        set({
          skills: {
            ...get().skills,
            technical: [...get().skills.technical, { id: Date.now(), name: skillName, level: 'Intermediate' }]
          }
        }),
      
      addSoftSkill: (skillName) => 
        set({
          skills: {
            ...get().skills,
            soft: [...get().skills.soft, { id: Date.now(), name: skillName }]
          }
        }),
      
      removeSkill: (type, id) => 
        set({
          skills: {
            ...get().skills,
            [type]: get().skills[type].filter(skill => skill.id !== id)
          }
        }),
      
      addExperience: (experience) => 
        set({ experience: [...get().experience, { id: Date.now(), ...experience }] }),
      
      updateExperience: (id, data) => 
        set({
          experience: get().experience.map(exp => 
            exp.id === id ? { ...exp, ...data } : exp
          )
        }),
      
      removeExperience: (id) => 
        set({ experience: get().experience.filter(exp => exp.id !== id) }),
      
      addProject: (project) => 
        set({ projects: [...get().projects, { id: Date.now(), ...project }] }),
      
      updateProject: (id, data) => 
        set({
          projects: get().projects.map(proj => 
            proj.id === id ? { ...proj, ...data } : proj
          )
        }),
      
      removeProject: (id) => 
        set({ projects: get().projects.filter(proj => proj.id !== id) }),
      
      addCertification: (cert) => 
        set({ certifications: [...get().certifications, { id: Date.now(), ...cert }] }),
      
      removeCertification: (id) => 
        set({ certifications: get().certifications.filter(cert => cert.id !== id) }),
      
      validateLinkedIn: () => {
        const linkedin = get().personalInfo.linkedin;
        return linkedin && linkedin.trim() !== '';
      },
      
      getCompletionPercentage: () => {
        const state = get();
        let total = 0;
        let completed = 0;
        
        if (state.personalInfo.fullName) completed++;
        if (state.personalInfo.email) completed++;
        if (state.personalInfo.linkedin) completed++;
        total += 3;
        
        if (state.education.length > 0) completed++;
        total++;
        
        if (state.skills.technical.length > 0 || state.skills.soft.length > 0) completed++;
        total++;
        
        if (state.experience.length > 0) completed++;
        total++;
        
        return Math.round((completed / total) * 100);
      },
    }),
    {
      name: 'resume-storage',
    }
  )
);

export default useResumeStore;