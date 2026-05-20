import React, { useContext } from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ResourceCard = ({ resource, onDelete }) => {
  const { user } = useContext(AuthContext);

  const isOwnerOrAdmin = user?.role === 'admin' || user?._id === resource.uploadedBy?._id;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1" title={resource.title}>
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500">{resource.subjectCode} - {resource.subjectName}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
        <div className="flex justify-between">
          <span>Type:</span>
          <span className="font-medium text-gray-900">{resource.resourceType}</span>
        </div>
        <div className="flex justify-between">
          <span>Year/Sem:</span>
          <span className="font-medium text-gray-900">{resource.academicYear} / {resource.semester}</span>
        </div>
        {resource.description && (
          <p className="text-gray-500 text-xs mt-2 line-clamp-2">{resource.description}</p>
        )}
      </div>

      <div className="mt-auto pt-4 border-t flex justify-between items-center">
        <div className="text-xs text-gray-400">
          By {resource.uploadedBy?.name || 'Unknown'}
        </div>
        <div className="flex items-center gap-2">
          {isOwnerOrAdmin && (
            <button 
              onClick={() => onDelete(resource._id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          )}
          <a
            href={resource.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
