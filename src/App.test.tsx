import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from './store/Provider';
import App from './App';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('App Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
    // Check that the app renders
    expect(document.querySelector('.App')).toBeInTheDocument();
  });

  it('renders header with logo', () => {
    renderWithProviders(<App />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('renders player with song name', () => {
    renderWithProviders(<App />);
    // Default song from chill playlist
    expect(screen.getByText('Formant - Regret')).toBeInTheDocument();
  });

  it('renders lateral menu', () => {
    renderWithProviders(<App />);
    // Lateral menu has mood icon
    expect(screen.getByAltText('mood')).toBeInTheDocument();
  });
});
