'use client';

import React, { useState } from 'react';
import { Move, User, Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';

interface DragItem {
  id: string;
  title: string;
  type: 'job' | 'candidate';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  description: string;
}

interface DragAndDropProps {
  items: DragItem[];
  onStatusChange: (itemId: string, newStatus: string) => void;
}

/**
 * Roman Urdu: Drag & Drop Component
 * Visual job/candidate management provide karta hai
 */
export default function DragAndDrop({ items, onStatusChange }: DragAndDropProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [columns] = useState([
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100' },
  ]);

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedItem) {
      onStatusChange(draggedItem.id, status);
      setDraggedItem(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'job' ? <Briefcase className="h-4 w-4" /> : <User className="h-4 w-4" />;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Drag & Drop Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map(column => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg p-4 min-h-96`}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, column.id)}
          >
            <h3 className="font-semibold text-gray-900 mb-4">{column.title}</h3>

            <div className="space-y-3">
              {items
                .filter(item => item.status === column.id)
                .map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={e => handleDragStart(e, item)}
                    className="bg-white p-3 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <span className="text-sm font-medium text-gray-900">{item.title}</span>
                      </div>
                      <Move className="h-4 w-4 text-gray-400" />
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                        {item.type}
                      </span>
                      {getStatusIcon(item.status)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">How to use:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Drag items between columns to change their status</li>
          <li>• Jobs and candidates can be moved between different stages</li>
          <li>• Visual feedback shows the current status of each item</li>
        </ul>
      </div>
    </div>
  );
}
