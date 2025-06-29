import React, { useState, useMemo } from 'react';
import { User, Subject } from '../types';
import { subjects, semesters } from '../data/mockData';
import SearchAndFilters from './SearchAndFilters';
import SubjectCard from './SubjectCard';
import SubjectDetail from './SubjectDetail';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [viewingSubject, setViewingSubject] = useState<Subject | null>(null);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      // Filter by year if selected
      const matchesYear = !selectedYear || subject.year === selectedYear;
      
      // Filter by semester if selected
      const matchesSemester = !selectedSemester || subject.semester === selectedSemester;
      
      // Filter by subject name if selected
      const matchesSubject = !selectedSubject || subject.name === selectedSubject;

      return matchesYear && matchesSemester && matchesSubject;
    });
  }, [selectedYear, selectedSemester, selectedSubject]);

  if (viewingSubject) {
    return (
      <SubjectDetail
        subject={viewingSubject}
        onBack={() => setViewingSubject(null)}
      />
    );
  }

  // Get the semester name if selected
  const selectedSemesterName = selectedSemester ? 
    semesters.find(s => s.id === selectedSemester)?.name : '';

  // Create a descriptive message based on filters
  let filterDescription = '';
  if (selectedYear && selectedSemesterName) {
    filterDescription = ` for Year ${selectedYear}, ${selectedSemesterName}`;
  } else if (selectedSemesterName) {
    filterDescription = ` for ${selectedSemesterName}`;
  } else if (selectedYear) {
    filterDescription = ` for Year ${selectedYear}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Filters */}
      <SearchAndFilters
        searchQuery=""
        onSearchChange={() => {}}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
      />

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Showing {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''}
          {filterDescription}
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={() => setViewingSubject(subject)}
          />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">No subjects found</h3>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Try adjusting your filter criteria to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}