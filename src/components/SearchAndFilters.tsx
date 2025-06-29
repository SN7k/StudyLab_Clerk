import React from 'react';
import { semesters, years } from '../data/mockData';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSemester: string;
  onSemesterChange: (semester: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedSemester,
  onSemesterChange,
  selectedYear,
  onYearChange,
  selectedSubject,
  onSubjectChange
}: SearchAndFiltersProps) {
  const subjects = ['All Subjects', 'Data Structures', 'Web Development', 'Database Management', 'Software Engineering', 'Machine Learning', 'Computer Networks'];
  
  // Filter semesters based on selected year
  const filteredSemesters = selectedYear 
    ? semesters.filter(sem => sem.year === parseInt(selectedYear))
    : [];

  // Reset semester when year changes
  const handleYearChange = (year: string) => {
    onYearChange(year);
    onSemesterChange('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6 transition-colors duration-300">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                Year {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={!selectedYear}
          >
            <option value="">Select Semester</option>
            {filteredSemesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject === 'All Subjects' ? '' : subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}