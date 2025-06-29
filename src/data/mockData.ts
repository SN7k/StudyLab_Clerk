import { Subject, StudyMaterial, Program } from '../types';

// Create semesters for 4 years (8 semesters)
export const semesters = [
  { id: '1', name: 'Semester 1', year: 1 },
  { id: '2', name: 'Semester 2', year: 1 },
  { id: '3', name: 'Semester 3', year: 2 },
  { id: '4', name: 'Semester 4', year: 2 },
  { id: '5', name: 'Semester 5', year: 3 },
  { id: '6', name: 'Semester 6', year: 3 },
  { id: '7', name: 'Semester 7', year: 4 },
  { id: '8', name: 'Semester 8', year: 4 },
];

export const years = [1, 2, 3, 4];

export const programs: Program[] = [
  { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications', years: [1, 2, 3] },
  { id: 'mca', name: 'MCA', fullName: 'Master of Computer Applications', years: [1, 2] },
  { id: 'btech', name: 'B.Tech', fullName: 'Bachelor of Technology', years: [1, 2, 3, 4] },
  { id: 'mtech', name: 'M.Tech', fullName: 'Master of Technology', years: [1, 2] },
];

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS201',
    program: 'BCA',
    year: '2',
    semester: '3',
    description: 'Learn fundamental data structures and algorithms',
    color: 'bg-blue-500',
    icon: 'Database',
    materialsCount: 24
  },
  {
    id: '2',
    name: 'Web Development',
    code: 'CS301',
    program: 'BCA',
    year: '3',
    semester: '5',
    description: 'Frontend and backend web development',
    color: 'bg-green-500',
    icon: 'Globe',
    materialsCount: 31
  },
  {
    id: '3',
    name: 'Database Management',
    code: 'CS202',
    program: 'BCA',
    year: '2',
    semester: '4',
    description: 'SQL, NoSQL, and database design principles',
    color: 'bg-purple-500',
    icon: 'Server',
    materialsCount: 18
  },
  {
    id: '4',
    name: 'Software Engineering',
    code: 'CS401',
    program: 'MCA',
    year: '1',
    semester: '1',
    description: 'Software development lifecycle and methodologies',
    color: 'bg-orange-500',
    icon: 'Code',
    materialsCount: 27
  },
  {
    id: '5',
    name: 'Machine Learning',
    code: 'CS501',
    program: 'MCA',
    year: '2',
    semester: '3',
    description: 'Introduction to ML algorithms and applications',
    color: 'bg-pink-500',
    icon: 'Brain',
    materialsCount: 22
  },
  {
    id: '6',
    name: 'Computer Networks',
    code: 'CS203',
    program: 'BCA',
    year: '2',
    semester: '3',
    description: 'Network protocols, security, and architecture',
    color: 'bg-indigo-500',
    icon: 'Network',
    materialsCount: 19
  },
  {
    id: '7',
    name: 'Programming Fundamentals',
    code: 'CS101',
    program: 'BCA',
    year: '1',
    semester: '1',
    description: 'Introduction to programming concepts and logic',
    color: 'bg-blue-400',
    icon: 'Code',
    materialsCount: 32
  },
  {
    id: '8',
    name: 'Object-Oriented Programming',
    code: 'CS102',
    program: 'BCA',
    year: '1',
    semester: '2',
    description: 'Learn OOP concepts with Java programming',
    color: 'bg-red-500',
    icon: 'FileCode',
    materialsCount: 28
  }
];

export const studyMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Arrays and Linked Lists',
    type: 'pdf',
    category: 'study-materials',
    subjectId: '1',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    downloadUrl: '#',
    previewUrl: '#',
    tags: ['arrays', 'linked-lists', 'basics']
  },
  {
    id: '2',
    title: 'CT1 Sample Questions - Data Structures',
    type: 'pdf',
    category: 'ct1',
    subjectId: '1',
    uploadDate: '2024-01-20',
    size: '1.8 MB',
    downloadUrl: '#',
    previewUrl: '#',
    tags: ['ct1', 'sample-questions', 'practice']
  },
  {
    id: '3',
    title: 'Final Exam Pattern Analysis',
    type: 'doc',
    category: 'final-exam',
    subjectId: '1',
    uploadDate: '2024-01-25',
    size: '950 KB',
    downloadUrl: '#',
    previewUrl: '#',
    tags: ['final-exam', 'pattern', 'analysis']
  },
  {
    id: '4',
    title: 'HTML & CSS Fundamentals',
    type: 'pdf',
    category: 'study-materials',
    subjectId: '2',
    uploadDate: '2024-01-10',
    size: '3.2 MB',
    downloadUrl: '#',
    previewUrl: '#',
    tags: ['html', 'css', 'frontend']
  },
  {
    id: '5',
    title: 'JavaScript ES6+ Features',
    type: 'pdf',
    category: 'study-materials',
    subjectId: '2',
    uploadDate: '2024-01-12',
    size: '2.7 MB',
    downloadUrl: '#',
    previewUrl: '#',
    tags: ['javascript', 'es6', 'modern-js']
  }
];