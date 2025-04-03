import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ConvertPage from '../page';
import formReducer from '@/redux/slices/formSlice';

// Mock Carbon components
jest.mock('@carbon/react', () => ({
  TextInput: ({ labelText, onChange, value, disabled, required, id, name }: any) => (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input
        type="text"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
        data-testid={`input-${id}`}
      />
    </div>
  ),
  Button: ({ children, type, onClick }: any) => (
    <button type={type} onClick={onClick} data-testid="submit-button">
      {children}
    </button>
  ),
  Form: ({ children, onSubmit }: any) => (
    <form onSubmit={onSubmit} data-testid="convert-form">
      {children}
    </form>
  ),
  Stack: ({ children }: any) => <div data-testid="stack">{children}</div>,
}));

// Mock router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ConvertPage', () => {
  const renderWithRedux = (component: React.ReactNode) => {
    const store = configureStore({
      reducer: {
        form: formReducer,
      },
    });
    return render(<Provider store={store}>{component}</Provider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all inputs', () => {
    renderWithRedux(<ConvertPage />);
    
    expect(screen.getByText('Convert Form')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    renderWithRedux(<ConvertPage />);
    
    const nameInput = screen.getByTestId('input-name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    const emailInput = screen.getByTestId('input-email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('submits form data correctly', () => {
    renderWithRedux(<ConvertPage />);
    
    const testData = {
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Test St',
      email: 'john@example.com',
    };

    // Fill out the form
    Object.entries(testData).forEach(([field, value]) => {
      fireEvent.change(screen.getByTestId(`input-${field}`), {
        target: { value },
      });
    });

    // Submit the form
    fireEvent.submit(screen.getByTestId('convert-form'));

    // Check if router.push was called
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('disables inputs when form is already submitted', () => {
    const store = configureStore({
      reducer: {
        form: formReducer,
      },
      preloadedState: {
        form: {
          name: 'John Doe',
          phone: '1234567890',
          address: '123 Test St',
          email: 'john@example.com',
          isSubmitted: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <ConvertPage />
      </Provider>
    );

    // Check if all inputs are disabled
    expect(screen.getByTestId('input-name')).toBeDisabled();
    expect(screen.getByTestId('input-phone')).toBeDisabled();
    expect(screen.getByTestId('input-address')).toBeDisabled();
    expect(screen.getByTestId('input-email')).toBeDisabled();

    // Submit button should not be visible
    expect(screen.queryByTestId('submit-button')).not.toBeInTheDocument();
  });
});
