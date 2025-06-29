import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Eye, Calendar, Tag } from 'lucide-react';
import { Subject, StudyMaterial } from '../types';
import { studyMaterials } from '../data/mockData';
import MaterialPreview from './MaterialPreview';

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
}

const categories = [
  { id: 'study-materials', name: 'Study Materials', color: 'bg-blue-500' },
  { id: 'ct1', name: 'CT1 Suggestions', color: 'bg-green-500' },
  { id: 'ct2', name: 'CT2 Suggestions', color: 'bg-orange-500' },
  { id: 'final-exam', name: 'Final Exam Suggestions', color: 'bg-red-500' }
];

export default function SubjectDetail({ subject, onBack }: SubjectDetailProps) {
  const [activeCategory, setActiveCategory] = useState('study-materials');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  const subjectMaterials = studyMaterials.filter(m => m.subjectId === subject.id);
  const filteredMaterials = subjectMaterials.filter(m => m.category === activeCategory);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'ppt': return '📊';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{subject.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{subject.code} • {subject.description}</p>
        </div>
      </div>

      {/* Subject Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-blue-800 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 ${subject.color} rounded-2xl flex items-center justify-center`}>
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{subject.name}</h2>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
              <span>{subject.program} • Year {subject.year}</span>
              <span>{subject.materialsCount} total materials</span>
              <span>Last updated: Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6 overflow-x-auto transition-colors duration-300">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getFileIcon(material.type)}</span>
                <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full uppercase font-medium transition-colors duration-300">
                  {material.type}
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{material.size}</div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 transition-colors duration-300">
              {material.title}
            </h3>

            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
              <Calendar className="w-3 h-3" />
              <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {material.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full flex items-center space-x-1 transition-colors duration-300"
                >
                  <Tag className="w-2 h-2" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setPreviewMaterial(material)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 transition-colors duration-300" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">No materials yet</h3>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Materials for this category will appear here once uploaded.</p>
        </div>
      )}

      {/* Material Preview Modal */}
      {previewMaterial && (
        <MaterialPreview
          material={previewMaterial}
          onClose={() => setPreviewMaterial(null)}
        />
      )}
    </div>
  );
}