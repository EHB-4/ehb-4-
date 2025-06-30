import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedSearch from '@/components/search/EnhancedSearch';

/**
 * Enhanced Search Component Tests
 * Tests for search functionality, autocomplete, and user interactions
 */
describe('EnhancedSearch Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('shows search icon', () => {
    render(<EnhancedSearch />);

    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('opens dropdown when typing more than 2 characters', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/filter by category/i)).toBeInTheDocument();
    });
  });

  it('shows category filters in dropdown', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/all/i)).toBeInTheDocument();
      expect(screen.getByText(/products/i)).toBeInTheDocument();
      expect(screen.getByText(/services/i)).toBeInTheDocument();
    });
  });

  it('shows trending searches when dropdown is open', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/trending searches/i)).toBeInTheDocument();
      expect(screen.getByText(/ai tools/i)).toBeInTheDocument();
    });
  });

  it('clears search input when clear button is clicked', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear/i });
      fireEvent.click(clearButton);
    });

    expect(searchInput).toHaveValue('');
  });

  it('filters search results by category', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'analytics' } });

    await waitFor(() => {
      const productsFilter = screen.getByText(/products/i);
      fireEvent.click(productsFilter);
    });

    // Verify that the products filter is selected
    await waitFor(() => {
      expect(screen.getByText(/products/i)).toHaveClass(/bg-blue-100/);
    });
  });

  it('shows loading state during search', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Should show loading spinner initially
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  it('displays search results correctly', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'analytics' } });

    await waitFor(() => {
      expect(screen.getByText(/ai-powered analytics dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/advanced analytics platform/i)).toBeInTheDocument();
    });
  });

  it('shows no results message when no matches found', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  it('handles form submission correctly', async () => {
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(window.location.href).toContain('/search?q=test%20search');
    });
  });

  it('loads recent searches from localStorage', () => {
    const mockRecentSearches = ['recent search 1', 'recent search 2'];
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(mockRecentSearches));

    render(<EnhancedSearch />);

    expect(localStorage.getItem).toHaveBeenCalledWith('recentSearches');
  });

  it('saves search to recent searches on submission', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recentSearches',
        JSON.stringify(['new search'])
      );
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/filter by category/i)).toBeInTheDocument();
    });

    // Click outside the search component
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText(/filter by category/i)).not.toBeInTheDocument();
    });
  });

  it('displays trending search suggestions', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/ai tools/i)).toBeInTheDocument();
      expect(screen.getByText(/e-commerce/i)).toBeInTheDocument();
      expect(screen.getByText(/healthcare/i)).toBeInTheDocument();
    });
  });

  it('applies search when clicking on trending search', async () => {
    render(<EnhancedSearch />);

    const searchInput = screen.getByPlaceholderText(/search for products, services, users/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      const trendingSearch = screen.getByText(/ai tools/i);
      fireEvent.click(trendingSearch);
    });

    expect(searchInput).toHaveValue('AI tools');
  });
});
