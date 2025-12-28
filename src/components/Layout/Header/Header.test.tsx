import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Header from './Header';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('Header Component', () => {
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
});
