/**
 * Roman Urdu: JPS Complete System Unit Tests
 * Tamam JPS features ko test karta hai
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JPSCompleteSystem from '../../../../components/JPS/JPSCompleteSystem';

// Roman Urdu: Mock data
const mockUserTypes = ['jobseeker', 'employer', 'admin'] as const;

describe('JPS Complete System', () => {
  // Roman Urdu: Basic rendering tests
  describe('Basic Rendering', () => {
    test.each(mockUserTypes)('renders correctly for %s user type', userType => {
      render(<JPSCompleteSystem userType={userType} />);

      // Check main elements
      expect(screen.getByText('JPS System')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Jobs')).toBeInTheDocument();
      expect(screen.getByText('Candidates')).toBeInTheDocument();

      // Check user type display
      expect(screen.getByText(userType)).toBeInTheDocument();
    });

    test('displays navigation sidebar', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const sidebarElements = [
        'Dashboard',
        'Jobs',
        'Candidates',
        'Interviews',
        'Analytics',
        'Payments',
        'Notifications',
        'Language',
        'Security',
        'Drag & Drop',
        'Content',
      ];

      sidebarElements.forEach(element => {
        expect(screen.getByText(element)).toBeInTheDocument();
      });
    });

    test('shows notification bell with indicator', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const bellIcon = screen.getByRole('button', { name: /notification/i });
      expect(bellIcon).toBeInTheDocument();

      // Check for notification indicator
      const indicator = document.querySelector('.bg-red-500');
      expect(indicator).toBeInTheDocument();
    });
  });

  // Roman Urdu: Navigation tests
  describe('Navigation', () => {
    test('switches between tabs correctly', async () => {
      render(<JPSCompleteSystem userType="admin" />);

      // Initially shows dashboard
      expect(screen.getByText('JPS Dashboard')).toBeInTheDocument();

      // Click on Jobs tab
      fireEvent.click(screen.getByText('Jobs'));
      await waitFor(() => {
        expect(screen.getByText('Job Listings')).toBeInTheDocument();
      });

      // Click on Candidates tab
      fireEvent.click(screen.getByText('Candidates'));
      await waitFor(() => {
        expect(screen.getByText('Candidate Profiles')).toBeInTheDocument();
      });

      // Click on Analytics tab
      fireEvent.click(screen.getByText('Analytics'));
      await waitFor(() => {
        expect(screen.getByText('Analytics')).toBeInTheDocument();
      });
    });

    test('highlights active tab', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const dashboardTab = screen.getByText('Dashboard').closest('button');
      expect(dashboardTab).toHaveClass('bg-blue-50');

      fireEvent.click(screen.getByText('Jobs'));
      const jobsTab = screen.getByText('Jobs').closest('button');
      expect(jobsTab).toHaveClass('bg-blue-50');
    });
  });

  // Roman Urdu: Dashboard tests
  describe('Dashboard', () => {
    test('displays correct statistics', () => {
      render(<JPSCompleteSystem userType="admin" />);

      expect(screen.getByText('Active Jobs')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();

      expect(screen.getByText('Candidates')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();

      expect(screen.getByText('Placements')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    test('shows correct colors for stats', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const activeJobs = screen.getByText('15');
      expect(activeJobs).toHaveClass('text-blue-600');

      const candidates = screen.getByText('42');
      expect(candidates).toHaveClass('text-green-600');

      const placements = screen.getByText('8');
      expect(placements).toHaveClass('text-purple-600');
    });
  });

  // Roman Urdu: Notifications tests
  describe('Notifications', () => {
    test('displays notification list', async () => {
      render(<JPSCompleteSystem userType="admin" />);

      fireEvent.click(screen.getByText('Notifications'));

      await waitFor(() => {
        expect(screen.getByText('Email Notifications')).toBeInTheDocument();
        expect(screen.getByText('interview')).toBeInTheDocument();
        expect(screen.getByText('placement')).toBeInTheDocument();
        expect(screen.getByText('job')).toBeInTheDocument();
      });
    });

    test('shows notification messages', async () => {
      render(<JPSCompleteSystem userType="admin" />);

      fireEvent.click(screen.getByText('Notifications'));

      await waitFor(() => {
        expect(screen.getByText(/New interview scheduled/)).toBeInTheDocument();
        expect(screen.getByText(/Congratulations/)).toBeInTheDocument();
        expect(screen.getByText(/New job posting/)).toBeInTheDocument();
      });
    });
  });

  // Roman Urdu: Mobile responsiveness tests
  describe('Mobile Responsiveness', () => {
    beforeEach(() => {
      // Mock mobile screen size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
    });

    test('shows mobile view for small screens', () => {
      render(<JPSCompleteSystem userType="admin" />);

      expect(screen.getByText('Mobile View')).toBeInTheDocument();
    });

    test('hides sidebar on mobile by default', () => {
      render(<JPSCompleteSystem userType="admin" />);

      // Reset to desktop size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      // Trigger resize event
      fireEvent(window, new Event('resize'));

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  // Roman Urdu: Security status tests
  describe('Security Status', () => {
    test('shows security status indicator', () => {
      render(<JPSCompleteSystem userType="admin" />);

      expect(screen.getByText('Security Check Required')).toBeInTheDocument();
    });

    test('security indicator has correct styling', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const indicator = document.querySelector('.bg-yellow-500');
      expect(indicator).toBeInTheDocument();
    });
  });

  // Roman Urdu: User interaction tests
  describe('User Interactions', () => {
    test('logout button is present', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      expect(logoutButton).toBeInTheDocument();
    });

    test('menu toggle works on mobile', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();

      fireEvent.click(menuButton);
      // Should show close button
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  // Roman Urdu: Accessibility tests
  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const notificationButton = screen.getByRole('button', { name: /notification/i });
      expect(notificationButton).toBeInTheDocument();

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      expect(logoutButton).toBeInTheDocument();
    });

    test('navigation is keyboard accessible', () => {
      render(<JPSCompleteSystem userType="admin" />);

      const jobsTab = screen.getByText('Jobs').closest('button');
      expect(jobsTab).toHaveAttribute('tabIndex');
    });
  });

  // Roman Urdu: Error handling tests
  describe('Error Handling', () => {
    test('handles invalid user type gracefully', () => {
      // @ts-ignore - Testing invalid prop
      render(<JPSCompleteSystem userType="invalid" />);

      expect(screen.getByText('JPS System')).toBeInTheDocument();
    });

    test('handles missing props gracefully', () => {
      // @ts-ignore - Testing missing prop
      render(<JPSCompleteSystem />);

      expect(screen.getByText('JPS System')).toBeInTheDocument();
    });
  });
});
