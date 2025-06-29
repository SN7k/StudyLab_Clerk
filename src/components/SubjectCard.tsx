import React from 'react';
import { FileText, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const IconComponent = (Icons as any)[subject.icon] || FileText;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full transition-colors duration-300">
          {subject.program} Sem{subject.semester}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {subject.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">{subject.code}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 transition-colors duration-300">{subject.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span>{subject.materialsCount} materials</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Updated today</span>
          </div>
        </div>
      </div>
    </div>
  );
}