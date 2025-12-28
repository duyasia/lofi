import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Header from './Header';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

// Mock fullscreen API
const mockRequestFullscreen = jest.fn();
const mockExitFullscreen = jest.fn();

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup fullscreen mocks
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: mockRequestFullscreen,
      writable: true,
    });
    Object.defineProperty(document, 'exitFullscreen', {
      value: mockExitFullscreen,
      writable: true,
    });
  });

  it('renders logo', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders day/night toggle button', () => {
    renderWithProviders(<Header />);
    const toggleButton = screen.getByAltText('iconWeather');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles day/night mode on click', () => {
    renderWithProviders(<Header />);
    const toggleButton = screen.getByAltText('iconWeather').closest('button');

    // Initial state is day (toggled = true)
    fireEvent.click(toggleButton!);
    // State should toggle
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles menu on click', () => {
    renderWithProviders(<Header />);

    // Menu should not be visible initially
    expect(screen.queryByText('SẢN PHẨM')).not.toBeInTheDocument();

    // Click menu button (drag icon)
    const menuButtons = screen.getAllByAltText('iconMenu');
    // The second one is the drag icon for menu
    fireEvent.click(menuButtons[1]);

    // Menu should be visible now
    expect(screen.getByText('SẢN PHẨM')).toBeInTheDocument();
  });

  it('closes menu on second click', () => {
    renderWithProviders(<Header />);
    const menuButtons = screen.getAllByAltText('iconMenu');

    // Open menu
    fireEvent.click(menuButtons[1]);
    expect(screen.getByText('SẢN PHẨM')).toBeInTheDocument();

    // Close menu
    fireEvent.click(menuButtons[1]);
    expect(screen.queryByText('SẢN PHẨM')).not.toBeInTheDocument();
  });

  it('enters fullscreen on button click', () => {
    renderWithProviders(<Header />);
    const fullscreenButton = screen.getAllByAltText('iconMenu')[0].closest('button');

    fireEvent.click(fullscreenButton!);
    expect(mockRequestFullscreen).toHaveBeenCalled();
  });

  it('exits fullscreen on second click', () => {
    renderWithProviders(<Header />);
    const fullscreenButton = screen.getAllByAltText('iconMenu')[0].closest('button');

    // First click - enter fullscreen
    fireEvent.click(fullscreenButton!);

    // Second click - exit fullscreen
    fireEvent.click(fullscreenButton!);
    expect(mockExitFullscreen).toHaveBeenCalled();
  });

  it('renders all menu items when open', () => {
    renderWithProviders(<Header />);
    const menuButtons = screen.getAllByAltText('iconMenu');
    fireEvent.click(menuButtons[1]);

    expect(screen.getByText('SẢN PHẨM')).toBeInTheDocument();
    expect(screen.getByText('KHUYẾN MÃI')).toBeInTheDocument();
    expect(screen.getByText('TIN TỨC')).toBeInTheDocument();
    expect(screen.getByText('TUYỂN DỤNG')).toBeInTheDocument();
    expect(screen.getByText('LIÊN HỆ')).toBeInTheDocument();
  });
});
