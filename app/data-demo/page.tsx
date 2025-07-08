'use client';

import { useState, useEffect } from 'react';

interface CompanyInfo {
  name: string;
  description: string;
  founded: string;
  employees: number;
  industry: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  employees: number;
  manager: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
}

export default function DataDemoPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch company info
        const companyResponse = await fetch('http://localhost:5000/api/company-info');
        const companyData = await companyResponse.json();
        setCompanyInfo(companyData);

        // Fetch departments
        const departmentsResponse = await fetch('http://localhost:5000/api/departments');
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData);

        // Fetch services
        const servicesResponse = await fetch('http://localhost:5000/api/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

      } catch (err) {
        setError('Failed to fetch data from backend API');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading data from backend...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">Connection Error</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Make sure the backend server is running on port 5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            EHB Data Demo
          </h1>
          <p className="text-xl text-gray-600">
            Frontend fetching data from Backend API
          </p>
        </div>

        {/* Company Info */}
        {companyInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Name</h3>
                <p className="text-blue-600">{companyInfo.name}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Founded</h3>
                <p className="text-green-600">{companyInfo.founded}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Employees</h3>
                <p className="text-purple-600">{companyInfo.employees}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Industry</h3>
                <p className="text-orange-600">{companyInfo.industry}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg md:col-span-2 lg:col-span-3">
                <h3 className="font-semibold text-indigo-800">Description</h3>
                <p className="text-indigo-600">{companyInfo.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Departments */}
        {departments.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{dept.name}</h3>
                  <p className="text-blue-100 mb-2">{dept.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Employees: {dept.employees}</span>
                    <span>Manager: {dept.manager}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {services.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-green-100 mb-2">{service.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="bg-green-600 px-2 py-1 rounded">{service.category}</span>
                    <span className="font-bold">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message */}
        <div className="mt-8 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>✅ Success!</strong> Frontend is successfully fetching data from Backend API
          </div>
        </div>
      </div>
    </div>
  );
} 