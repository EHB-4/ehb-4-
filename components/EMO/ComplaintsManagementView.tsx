'use client';

'use client';

import React, { useState } from 'react';
import {
  FiMessageSquare,
  FiFilter,
  FiSearch,
  FiEye,
  FiX,
  FiMoreVertical,
  FiAlertCircle,
} from 'react-icons/fi';

interface Complaint {
  id: string;
  caseNo: string;
  customerName: string;
  subject: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  details: string;
}

const mockComplaints: Complaint[] = [
  {
    id: 'cmp-001',
    caseNo: 'CS012345',
    customerName: 'Ali Raza',
    subject: 'Late Delivery',
    date: '2023-10-27',
    status: 'Resolved',
    priority: 'High',
    details: 'Order was delayed by 3 days.',
  },
  {
    id: 'cmp-002',
    caseNo: 'CS012346',
    customerName: 'Sara Ahmed',
    subject: 'Damaged Product',
    date: '2023-10-26',
    status: 'In Progress',
    priority: 'High',
    details: 'Product arrived with a cracked screen.',
  },
  {
    id: 'cmp-003',
    caseNo: 'CS012347',
    customerName: 'Zainab Khan',
    subject: 'Payment Issue',
    date: '2023-10-25',
    status: 'Open',
    priority: 'Medium',
    details: 'Payment was deducted twice.',
  },
  {
    id: 'cmp-004',
    caseNo: 'CS012348',
    customerName: 'Bilal Chaudhry',
    subject: 'Wrong Item Received',
    date: '2023-10-24',
    status: 'Closed',
    priority: 'Low',
    details: 'Received a different color.',
  },
];

const ComplaintDetailsModal = ({
  complaint,
  onClose,
}: {
  complaint: Complaint | null;
  onClose: () => void;
}) => {
  if (!complaint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Complaint Details: {complaint.caseNo}</h3>
          <button
            onClick={onClose}
            title="Close modal"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p>
            <strong>Customer:</strong> {complaint.customerName}
          </p>
          <p>
            <strong>Subject:</strong> {complaint.subject}
          </p>
          <p>
            <strong>Date:</strong> {complaint.date}
          </p>
          <p>
            <strong>Status:</strong> {complaint.status}
          </p>
          <p>
            <strong>Priority:</strong> {complaint.priority}
          </p>
          <div className="pt-2">
            <h4 className="font-semibold mb-2">Details:</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{complaint.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ComplaintsManagementView() {
  const [complaints] = useState(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
      case 'Closed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'Open':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-600';
    if (priority === 'Medium') return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Complaints Management</h2>

      <div className="bg-white p-4 rounded-lg shadow-md border">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Case No or Customer..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            title="Filter complaints"
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FiFilter />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase">
              <tr>
                <th className="p-4">Case No</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {complaints.map(complaint => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{complaint.caseNo}</td>
                  <td className="p-4">{complaint.customerName}</td>
                  <td className="p-4">{complaint.subject}</td>
                  <td className="p-4">{complaint.date}</td>
                  <td className="p-4">
                    <span className={`flex items-center ${getPriorityColor(complaint.priority)}`}>
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      title="View details"
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <FiEye className="h-5 w-5 text-gray-600" />
                    </button>
                    <button title="More actions" className="p-2 rounded-full hover:bg-gray-100">
                      <FiMoreVertical className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ComplaintDetailsModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
}
