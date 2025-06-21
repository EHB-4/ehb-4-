'use client';

import React, { useState } from 'react';
import { FiEye, FiFilter, FiSearch, FiTruck, FiUser, FiX, FiMoreVertical } from 'react-icons/fi';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { name: string; quantity: number }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Ali Raza',
    customerEmail: 'ali@example.com',
    date: '2023-10-27',
    status: 'Delivered',
    total: 250.0,
    items: [{ name: 'Wireless Headphones', quantity: 1 }],
  },
  {
    id: 'ORD-002',
    customerName: 'Sara Ahmed',
    customerEmail: 'sara@example.com',
    date: '2023-10-26',
    status: 'Shipped',
    total: 95.5,
    items: [{ name: 'Leather Bag', quantity: 1 }],
  },
  {
    id: 'ORD-003',
    customerName: 'Zainab Khan',
    customerEmail: 'zainab@example.com',
    date: '2023-10-25',
    status: 'Processing',
    total: 45.0,
    items: [
      { name: 'Green Tea', quantity: 2 },
      { name: 'Yoga Mat', quantity: 1 },
    ],
  },
  {
    id: 'ORD-004',
    customerName: 'Bilal Chaudhry',
    customerEmail: 'bilal@example.com',
    date: '2023-10-24',
    status: 'Pending',
    total: 129.5,
    items: [{ name: 'Smart Home Hub', quantity: 1 }],
  },
  {
    id: 'ORD-005',
    customerName: 'Aisha Malik',
    customerEmail: 'aisha@example.com',
    date: '2023-10-23',
    status: 'Cancelled',
    total: 35.0,
    items: [{ name: 'Yoga Mat', quantity: 1 }],
  },
];

const OrderDetailsModal = ({ order, onClose }: { order: Order | null; onClose: () => void }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Order Details: {order.id}</h3>
          <button
            onClick={onClose}
            title="Close modal"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Customer:</strong> {order.customerName}
            </div>
            <div>
              <strong>Email:</strong> {order.customerEmail}
            </div>
            <div>
              <strong>Date:</strong> {order.date}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Total:</strong> PKR {order.total.toFixed(2)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mt-4 mb-2">Items:</h4>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrderManagementView() {
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>

      <div className="bg-white p-4 rounded-lg shadow-md border">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            title="Filter orders"
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
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">PKR {order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
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
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
