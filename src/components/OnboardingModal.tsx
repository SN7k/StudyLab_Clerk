import React, { useState, useEffect } from 'react';
import { programs } from '../data/mockData';
import { parseUniversityEmail, calculateCurrentYear, getProgramFullName, getStudentNameFromEmail } from '../utils/emailParser';
import { GraduationCap, Sparkles } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: (program: string, year: string) => void;
  userEmail: string;
}

export default function OnboardingModal({ onComplete, userEmail }: OnboardingModalProps) {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [studentName, setStudentName] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Parse the email when component mounts
    const data = parseUniversityEmail(userEmail);
    setParsedData(data);
    
    if (data.isValid) {
      setSelectedProgram(data.program.toLowerCase());
      
      // Calculate current year based on admission year
      const currentYear = calculateCurrentYear(data.year);
      setSelectedYear(currentYear.toString());
      
      // Get student name from email
      setStudentName(getStudentNameFromEmail(userEmail));
    }

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, [userEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProgram && selectedYear) {
      onComplete(selectedProgram, selectedYear);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className={`bg-gray-900 text-white rounded-2xl max-w-sm w-full p-0 relative border border-gray-800 shadow-2xl transition-all duration-500 transform ${isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-3">
              
            </div>
            
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Welcome to StudyLab!
            </h2>
            
            <p className="text-sm text-gray-400">
              Your academic journey starts here
            </p>
          </div>
          
          {parsedData?.isValid && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-xl p-5 mb-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">
                      {studentName || `Student ${parsedData.studentId}`}
                    </p>
                    <div className="flex items-center mt-0.5">
                      <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-md font-medium">
                        {parsedData.program}
                      </span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500"></span>
                      <span className="text-gray-400 text-xs">
                        Year {calculateCurrentYear(parsedData.year)} • Batch '20{parsedData.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative overflow-hidden rounded-xl group">
              <button
                type="submit"
                disabled={!selectedProgram || !selectedYear}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-lg"
              >
                Get Started
              </button>
              <div 
                className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                style={{ 
                  width: '150%', 
                  transform: 'skewX(-20deg) translateX(-100%)'
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}