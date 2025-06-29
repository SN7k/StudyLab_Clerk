import React from 'react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { StudyMaterial } from '../types';

interface MaterialPreviewProps {
  material: StudyMaterial;
  onClose: () => void;
}

export default function MaterialPreview({ material, onClose }: MaterialPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate transition-colors duration-300">
              {material.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {material.type.toUpperCase()} • {material.size}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {material.type === 'pdf' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
                  <span className="text-2xl">📄</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">PDF Preview</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Full PDF viewer would be integrated here
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-100 dark:bg-gray-700 h-3 rounded-full animate-pulse transition-colors duration-300"></div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-3 rounded-full animate-pulse transition-colors duration-300"></div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-3 rounded-full w-3/4 animate-pulse transition-colors duration-300"></div>
                </div>
              </div>
            )}
            
            {material.type === 'doc' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
                  <span className="text-2xl">📝</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Document Preview</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Document viewer would be integrated here
                </p>
              </div>
            )}
            
            {material.type === 'ppt' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Presentation Preview</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Slide viewer would be integrated here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
              <span>Page 1 of 10</span>
              <span>•</span>
              <span>Uploaded on {new Date(material.uploadDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Zoom:</span>
              <button className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                100%
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}