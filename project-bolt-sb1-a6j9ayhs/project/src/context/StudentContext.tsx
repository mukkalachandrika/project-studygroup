import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  year: string;
  gpa: string;
  studyPreferences: string[];
  availableHours: string[];
  courses: string[];
}

interface StudentContextType {
  student: Student | null;
  updateStudent: (data: Partial<Student>) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    major: 'Computer Science',
    year: 'Junior',
    gpa: '3.7',
    studyPreferences: ['Group Discussion', 'Problem-Solving', 'Visual Learning'],
    availableHours: ['Morning (9-12 PM)', 'Evening (6-9 PM)'],
    courses: ['Calculus III', 'Data Structures', 'Physics II', 'Linear Algebra']
  });

  const updateStudent = (data: Partial<Student>) => {
    setStudent(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <StudentContext.Provider value={{ student, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};