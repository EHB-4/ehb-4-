// Roman Urdu: JPS Email Notification Component
'use client';

import React from 'react';
import {
  Mail,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Calendar,
  Briefcase,
  UserCheck,
} from 'lucide-react';

interface EmailNotificationProps {
  type: 'interview' | 'placement' | 'job';
  message: string;
  recipient: string;
  status: 'success' | 'info' | 'warning' | 'error';
}

// Roman Urdu: Status ke hisaab se color aur icon select karne ka function
const getStatusStyles = (status: string) => {
  switch (status) {
    case 'success':
      return {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      };
    case 'info':
      return {
        color: 'bg-blue-100 text-blue-800',
        icon: <Info className="h-5 w-5 text-blue-600" />,
      };
    case 'warning':
      return {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      };
    case 'error':
      return {
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="h-5 w-5 text-red-600" />,
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800',
        icon: <Mail className="h-5 w-5 text-gray-600" />,
      };
  }
};

// Roman Urdu: Type ke hisaab se icon select karne ka function
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'interview':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'placement':
      return <UserCheck className="h-5 w-5 text-green-500" />;
    case 'job':
      return <Briefcase className="h-5 w-5 text-purple-500" />;
    default:
      return <Mail className="h-5 w-5 text-gray-500" />;
  }
};

/**
 * Roman Urdu: JPS Email Notification UI Component
 * Interview, placement, ya job update par user ko notification dikhata hai
 */
const EmailNotification: React.FC<EmailNotificationProps> = ({
  type,
  message,
  recipient,
  status,
}) => {
  const statusStyles = getStatusStyles(status);
  const typeIcon = getTypeIcon(type);

  return (
    <div
      className={`flex items-start p-4 rounded-lg shadow-md mb-4 ${statusStyles.color} transition-all`}
    >
      <div className="mr-3">{statusStyles.icon}</div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          {typeIcon}
          <span className="ml-2 font-semibold capitalize">
            {/* Roman Urdu: Type ko readable banayein */}
            {type === 'interview' && 'Interview Notification'}
            {type === 'placement' && 'Placement Notification'}
            {type === 'job' && 'Job Notification'}
          </span>
        </div>
        <div className="text-sm mb-1">{message}</div>
        <div className="text-xs text-gray-500">Recipient: {recipient}</div>
      </div>
    </div>
  );
};

export default EmailNotification;
