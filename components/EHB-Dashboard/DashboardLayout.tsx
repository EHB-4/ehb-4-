import React from 'react';
import { Search, Bell, User } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  serviceCount: string;
}

export function DashboardLayout({ children, title, subtitle, serviceCount }: DashboardLayoutProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-gray-50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <span className="text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">
            {subtitle}
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-2">{title}</h2>
          <p className="text-muted-foreground">{serviceCount}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="service-search"
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="button"
            aria-label="View notifications"
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
            JD
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
