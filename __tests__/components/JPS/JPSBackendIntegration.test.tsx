// Roman Urdu: JPS Backend Integration Component Tests
// React component testing with React Testing Library

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JPSBackendIntegration from '@/components/JPS/JPSBackendIntegration';

// Roman Urdu: Mock fetch
global.fetch = jest.fn();

// Roman Urdu: Mock toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Roman Urdu: Mock API responses
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'Karachi, Pakistan',
    salary: 150000,
    description: 'We are seeking a talented Senior React Developer.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Solutions',
    location: 'Lahore, Pakistan',
    salary: 120000,
    description: 'Join our innovative team as a Full Stack Developer.',
    requirements: ['JavaScript', 'Python', 'Django', '3+ years experience'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
];

const mockCandidates = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    sqlLevel: 3,
    experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+92-301-2345678',
    sqlLevel: 2,
    experience: 3,
    skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
];

const mockCompatibilityScore = {
  jobId: '1',
  candidateId: '1',
  overallScore: 85,
  breakdown: {
    skills: 90,
    experience: 100,
    location: 100,
    salary: 80,
    sqlLevel: 95,
  },
  details: {
    matchingSkills: ['React', 'TypeScript', 'Node.js'],
    missingSkills: ['MongoDB'],
    recommendations: [
      'Excellent match! Strongly recommend for immediate interview.',
      'Consider additional training in required skills.',
    ],
  },
};

describe('JPS Backend Integration Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Roman Urdu: Component Rendering Tests
  describe('Component Rendering', () => {
    test('Should render main heading', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByText('JPS Backend Integration')).toBeInTheDocument();
      expect(screen.getByText('API calls aur data management system')).toBeInTheDocument();
    });

    test('Should render jobs and candidates sections', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByText('Jobs Management')).toBeInTheDocument();
      expect(screen.getByText('Candidates Management')).toBeInTheDocument();
      expect(screen.getByText('AI Matching System')).toBeInTheDocument();
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    });

    test('Should render select dropdowns', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByLabelText('Select Job')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Candidate')).toBeInTheDocument();
    });

    test('Should render action buttons', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByText('Check Compatibility')).toBeInTheDocument();
      expect(screen.getByText('Send Interview Notification')).toBeInTheDocument();
      expect(screen.getByText('Get Payment Report')).toBeInTheDocument();
    });
  });

  // Roman Urdu: Data Loading Tests
  describe('Data Loading', () => {
    test('Should load jobs on component mount', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockJobs,
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/jps?type=jobs');
      });
    });

    test('Should load candidates on component mount', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCandidates,
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/jps?type=candidates');
      });
    });

    test('Should handle loading state', async () => {
      (fetch as jest.Mock).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => mockJobs,
                }),
              100
            )
          )
      );

      render(<JPSBackendIntegration />);

      // Roman Urdu: Check if loading indicator appears
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  // Roman Urdu: Dropdown Selection Tests
  describe('Dropdown Selection', () => {
    beforeEach(() => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJobs,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCandidates,
        });
    });

    test('Should populate job dropdown with loaded data', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        expect(jobSelect).toHaveValue('');
      });

      // Roman Urdu: Check if options are populated
      const jobSelect = screen.getByLabelText('Select Job');
      fireEvent.click(jobSelect);

      await waitFor(() => {
        expect(screen.getByText('Senior React Developer - TechCorp Solutions')).toBeInTheDocument();
        expect(screen.getByText('Full Stack Developer - Digital Solutions')).toBeInTheDocument();
      });
    });

    test('Should populate candidate dropdown with loaded data', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const candidateSelect = screen.getByLabelText('Select Candidate');
        expect(candidateSelect).toHaveValue('');
      });

      // Roman Urdu: Check if options are populated
      const candidateSelect = screen.getByLabelText('Select Candidate');
      fireEvent.click(candidateSelect);

      await waitFor(() => {
        expect(screen.getByText('Ahmed Khan - SQL Level 3')).toBeInTheDocument();
        expect(screen.getByText('Sarah Ahmed - SQL Level 2')).toBeInTheDocument();
      });
    });

    test('Should update selected values when dropdowns change', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });

        expect(jobSelect).toHaveValue('1');
        expect(candidateSelect).toHaveValue('1');
      });
    });
  });

  // Roman Urdu: AI Matching Tests
  describe('AI Matching', () => {
    beforeEach(() => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJobs,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCandidates,
        });
    });

    test('Should enable Check Compatibility button when both selections are made', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const checkButton = screen.getByText('Check Compatibility');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });

        expect(checkButton).not.toBeDisabled();
      });
    });

    test('Should disable Check Compatibility button when selections are missing', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const checkButton = screen.getByText('Check Compatibility');
        expect(checkButton).toBeDisabled();
      });
    });

    test('Should call AI matching API when Check Compatibility is clicked', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCompatibilityScore,
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const checkButton = screen.getByText('Check Compatibility');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });
        fireEvent.click(checkButton);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/jps/ai-matching?jobId=1&candidateId=1');
      });
    });

    test('Should display compatibility score when received', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCompatibilityScore,
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const checkButton = screen.getByText('Check Compatibility');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });
        fireEvent.click(checkButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Compatibility Score: 85%')).toBeInTheDocument();
        expect(screen.getByText('90%')).toBeInTheDocument(); // Skills
        expect(screen.getByText('100%')).toBeInTheDocument(); // Experience
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
      });
    });

    test('Should display recommendations when compatibility score is shown', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCompatibilityScore,
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const checkButton = screen.getByText('Check Compatibility');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });
        fireEvent.click(checkButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Recommendations:')).toBeInTheDocument();
        expect(
          screen.getByText('Excellent match! Strongly recommend for immediate interview.')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Consider additional training in required skills.')
        ).toBeInTheDocument();
      });
    });
  });

  // Roman Urdu: Error Handling Tests
  describe('Error Handling', () => {
    test('Should handle API errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    test('Should show error toast when API fails', async () => {
      const { toast } = require('react-hot-toast');
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('API Error: API Error');
      });
    });

    test('Should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });
  });

  // Roman Urdu: Action Buttons Tests
  describe('Action Buttons', () => {
    beforeEach(() => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJobs,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCandidates,
        });
    });

    test('Should enable Send Interview Notification when both selections are made', async () => {
      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const sendButton = screen.getByText('Send Interview Notification');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });

        expect(sendButton).not.toBeDisabled();
      });
    });

    test('Should call notification API when Send Interview Notification is clicked', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        const jobSelect = screen.getByLabelText('Select Job');
        const candidateSelect = screen.getByLabelText('Select Candidate');
        const sendButton = screen.getByText('Send Interview Notification');

        fireEvent.change(jobSelect, { target: { value: '1' } });
        fireEvent.change(candidateSelect, { target: { value: '1' } });
        fireEvent.click(sendButton);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/jps/notifications', expect.any(Object));
      });
    });

    test('Should call payment report API when Get Payment Report is clicked', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ payments: [], summary: {} }),
      });

      render(<JPSBackendIntegration />);

      const reportButton = screen.getByText('Get Payment Report');
      fireEvent.click(reportButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/jps/payments?type=payments');
      });
    });
  });

  // Roman Urdu: Statistics Display Tests
  describe('Statistics Display', () => {
    test('Should display job and candidate counts', async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJobs,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCandidates,
        });

      render(<JPSBackendIntegration />);

      await waitFor(() => {
        expect(screen.getByText('Total Jobs: 2')).toBeInTheDocument();
        expect(screen.getByText('Total Candidates: 2')).toBeInTheDocument();
      });
    });
  });

  // Roman Urdu: Accessibility Tests
  describe('Accessibility', () => {
    test('Should have proper labels for form elements', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByLabelText('Select Job')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Candidate')).toBeInTheDocument();
    });

    test('Should have proper button roles', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByRole('button', { name: 'Check Compatibility' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Send Interview Notification' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get Payment Report' })).toBeInTheDocument();
    });

    test('Should have proper heading structure', () => {
      render(<JPSBackendIntegration />);

      expect(screen.getByRole('heading', { name: 'JPS Backend Integration' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Jobs Management' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Candidates Management' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'AI Matching System' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument();
    });
  });

  // Roman Urdu: Responsive Design Tests
  describe('Responsive Design', () => {
    test('Should render on different screen sizes', () => {
      const { container } = render(<JPSBackendIntegration />);

      // Roman Urdu: Check if grid classes are applied
      expect(container.querySelector('.grid')).toBeInTheDocument();
      expect(container.querySelector('.lg\\:grid-cols-2')).toBeInTheDocument();
    });

    test('Should have responsive text sizes', () => {
      render(<JPSBackendIntegration />);

      const mainHeading = screen.getByText('JPS Backend Integration');
      expect(mainHeading).toHaveClass('text-4xl');
    });
  });
});
