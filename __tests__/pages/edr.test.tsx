import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import CourseListing from '@/app/edr/page';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('EDR Page', () => {
  const mockSession = {
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
    },
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ courses: [] }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the EDR page with correct title', () => {
    render(<CourseListing />);

    expect(screen.getByText('EDR Course Listings')).toBeInTheDocument();
    expect(screen.getByText(/Browse and enroll in courses/)).toBeInTheDocument();
  });

  it('displays download buttons', () => {
    render(<CourseListing />);

    expect(screen.getByText('TXT')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
  });

  it('shows statistics section', () => {
    render(<CourseListing />);

    expect(screen.getByText('Total Courses')).toBeInTheDocument();
    expect(screen.getByText('Total Tutors')).toBeInTheDocument();
    expect(screen.getByText('Avg. Price')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
  });

  it('handles download button clicks', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          content: 'Test report content',
          courseCount: 5,
        }),
    });

    render(<CourseListing />);

    const txtButton = screen.getByText('TXT');
    fireEvent.click(txtButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/edr/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format: 'txt',
          filters: {
            subject: '',
            city: '',
            mode: '',
            maxFee: '',
          },
        }),
      });
    });
  });
});
