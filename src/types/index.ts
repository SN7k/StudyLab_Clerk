export interface User {
  id: string;
  name: string;
  email: string;
  program: string;
  batchYear: string;
  profilePicture?: string;
  photoURL?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  program: string;
  year: string;
  semester?: string;
  description: string;
  color: string;
  icon: string;
  materialsCount: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'video' | 'image';
  category: 'study-materials' | 'ct1' | 'ct2' | 'final-exam';
  subjectId: string;
  uploadDate: string;
  size: string;
  downloadUrl: string;
  previewUrl?: string;
  tags: string[];
}

export interface Program {
  id: string;
  name: string;
  fullName: string;
  years: number[];
}