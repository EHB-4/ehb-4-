'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { useJPSRole } from './JPSRoleContext';

/**
 * JPSNavbar - Navigation bar for Job Placement System sub-pages
 * Provides navigation links, role selection, and accessibility features.
 * @component
 * @returns {JSX.Element}
 */
const navLinks = [
  { href: '/jps', label: 'Dashboard', icon: ChartBarIcon },
  { href: '/jps/job-listings', label: 'Job Listings', icon: BriefcaseIcon },
  { href: '/jps/candidates', label: 'Candidates', icon: UserIcon },
  { href: '/jps/matching', label: 'AI Matching', icon: ShieldCheckIcon },
  { href: '/jps/assessment', label: 'Assessment', icon: AcademicCapIcon },
  { href: '/jps/interviews', label: 'Interviews', icon: CalendarIcon },
  { href: '/jps/analytics', label: 'Analytics', icon: ChartBarIcon },
  { href: '/jps/settings', label: 'Settings', icon: CogIcon },
];

const roles = [
  { value: 'jobseeker', label: 'Job Seeker' },
  { value: 'employer', label: 'Employer' },
  { value: 'admin', label: 'Admin' },
];

const JPSNavbar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole } = useJPSRole();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm" aria-label="JPS Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">JPS</span>
          <span className="text-xs text-gray-400 ml-2">Job Placement System</span>
        </div>
        <ul className="flex space-x-2" role="menubar">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} role="none">
              <Link href={href} legacyBehavior>
                <a
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    pathname === href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-current={pathname === href ? 'page' : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  <Icon className="h-5 w-5 mr-1" aria-hidden="true" />
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-2">
          <label htmlFor="role-select" className="sr-only">
            Select Role
          </label>
          <select
            id="role-select"
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            aria-label="Select user role"
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default JPSNavbar;
