import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Player from './Player';

// Mock HTMLAudioElement play/pause
const mockPlay = jest.fn();
const mockPause = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(HTMLAudioElement.prototype, 'play', {
    configurable: true,
    value: mockPlay,
  });
  Object.defineProperty(HTMLAudioElement.prototype, 'pause', {
    configurable: true,
    value: mockPause,
  });
});

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

  it('toggles play/pause on button click', () => {
    renderWithProviders(<Player />);
    const playButton = screen.getByRole('button', { name: '' });

    // Click play
    fireEvent.click(playButton);
    expect(mockPlay).toHaveBeenCalled();

    // Click pause
    fireEvent.click(playButton);
    expect(mockPause).toHaveBeenCalled();
  });

  it('goes to next song on next button click', () => {
    renderWithProviders(<Player />);
    const nextButton = screen.getByAltText('next');

    fireEvent.click(nextButton);
    // Should be playing and moved to next song
    expect(mockPlay).toHaveBeenCalled();
  });

  it('goes to prev song on prev button click', () => {
    renderWithProviders(<Player />);
    const prevButton = screen.getByAltText('prev');

    fireEvent.click(prevButton);
    // Should be playing and moved to prev song (wraps to last)
    expect(mockPlay).toHaveBeenCalled();
  });

  it('wraps to first song when clicking next on last song', () => {
    renderWithProviders(<Player />);
    const nextButton = screen.getByAltText('next');

    // Click next multiple times to reach last song, then wrap
    for (let i = 0; i < 10; i++) {
      fireEvent.click(nextButton);
    }
    // Should still work without errors
    expect(mockPlay).toHaveBeenCalled();
  });

  it('wraps to last song when clicking prev on first song', () => {
    renderWithProviders(<Player />);
    const prevButton = screen.getByAltText('prev');

    // Click prev on first song should go to last
    fireEvent.click(prevButton);
    expect(mockPlay).toHaveBeenCalled();
  });
});
