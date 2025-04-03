import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest, describe, beforeEach, expect, it } from '@jest/globals';
import Dashboard from '../page';

// Mock the SCSS module
jest.mock('@/styles/Dashboard.module.scss', () => ({
  dashboardContainer: 'mock-dashboard-container',
  fileOperations: 'mock-file-operations',
  administration: 'mock-administration',
}));

// Define types for mocked components
type MockComponentProps = {
    children?: React.ReactNode;
    className?: string;
  };
  
  // Define type for Button separately since it uses onClick
  type MockButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
  };

// Mock Carbon components with proper types and props handling
jest.mock('@carbon/react', () => ({
  Content: ({ children, className }: MockComponentProps) => (
    <div data-testid="content" className={className}>
      {children}
    </div>
  ),
  Grid: ({ children, className }: MockComponentProps) => (
    <div data-testid="grid" className={className}>
      {children}
    </div>
  ),
  Column: ({ children, className }: MockComponentProps) => (
    <div data-testid="column" className={className}>
      {children}
    </div>
  ),
  Button: ({ children, onClick, className }: MockComponentProps) => (
    <button data-testid="button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

// Mock Carbon icons with simple implementation
jest.mock('@carbon/icons-react', () => ({
  Archive: () => <span data-testid="archive-icon">Archive Icon</span>,
  DataRefineryReference: () => <span data-testid="extract-icon">Extract Icon</span>,
  TrashCan: () => <span data-testid="delete-icon">Delete Icon</span>,
  Compare: () => <span data-testid="compare-icon">Compare Icon</span>,
  UserAdmin: () => <span data-testid="admin-icon">Admin Icon</span>,
  Settings: () => <span data-testid="settings-icon">Settings Icon</span>,
}));

// Mock router with error handling
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dashboard layout', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('File Operations')).toBeInTheDocument();
    expect(screen.getByText('Administration')).toBeInTheDocument();
  });

  it('renders all buttons with correct text', () => {
    render(<Dashboard />);
    const buttonTexts = ['Archive', 'Extract', 'Delete', 'Convert/Compare', 'Manage Users', 'Options'];

    buttonTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('Button Navigation', () => {
    beforeEach(() => {
      mockPush.mockClear();
    });

    it('navigates to archive page', () => {
      render(<Dashboard />);
      fireEvent.click(screen.getByText('Archive'));
      expect(mockPush).toHaveBeenCalledWith('/dashboard/archive');
    });

    it('navigates to extract page', () => {
      render(<Dashboard />);
      fireEvent.click(screen.getByText('Extract'));
      expect(mockPush).toHaveBeenCalledWith('/dashboard/extract');
    });

    it('navigates to delete page', () => {
      render(<Dashboard />);
      fireEvent.click(screen.getByText('Delete'));
      expect(mockPush).toHaveBeenCalledWith('/dashboard/delete');
    });


    it('navigates to settings page', () => {
      render(<Dashboard />);
      fireEvent.click(screen.getByText('Options'));
      expect(mockPush).toHaveBeenCalledWith('/dashboard/settings');
    });
  });

  it('has proper grid structure', () => {
    const { container } = render(<Dashboard />);
    // Expect two grids - one for File Operations and one for Administration
    expect(screen.getAllByTestId('grid')).toHaveLength(2);
    // Expect 6 columns total (4 for operations + 2 for admin)
    expect(screen.getAllByTestId('column')).toHaveLength(6);
    expect(container).toBeInTheDocument();
  });

  it('renders Convert/Compare as a link', () => {
    render(<Dashboard />);
    const linkElement = screen.getByRole('link', { name: /Convert\/Compare/i });
    expect(linkElement).toHaveAttribute('href', '/dashboard/convert');
  });
});
