import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Player from './Player';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('Player Component', () => {
  it('renders current song name', () => {
    renderWithProviders(<Player />);
    // Default song is first from chill playlist
    expect(screen.getByText('Formant - Regret')).toBeInTheDocument();
  });

  it('renders prev/next buttons', () => {
    renderWithProviders(<Player />);
    expect(screen.getByAltText('prev')).toBeInTheDocument();
    expect(screen.getByAltText('next')).toBeInTheDocument();
  });

  it('renders audio element', () => {
    renderWithProviders(<Player />);
    const audio = document.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('loop');
  });
});
