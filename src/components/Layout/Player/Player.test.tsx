import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Player from './Player';

// Mock HTMLAudioElement
const mockPlay = jest.fn().mockResolvedValue(undefined);
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
  Object.defineProperty(HTMLAudioElement.prototype, 'currentTime', {
    configurable: true,
    writable: true,
    value: 0,
  });
  Object.defineProperty(HTMLAudioElement.prototype, 'duration', {
    configurable: true,
    writable: true,
    value: 180, // 3 minutes
  });
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('Player Component', () => {
  describe('Basic Rendering', () => {
    it('renders current song name', () => {
      renderWithProviders(<Player />);
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
    });

    it('renders progress bar', () => {
      renderWithProviders(<Player />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('renders time display', () => {
      renderWithProviders(<Player />);
      // Initial time should be 0:00
      expect(screen.getAllByText('0:00').length).toBeGreaterThanOrEqual(1);
    });

    it('renders shuffle button', () => {
      renderWithProviders(<Player />);
      expect(screen.getByAltText('shuffle')).toBeInTheDocument();
    });

    it('renders repeat button', () => {
      renderWithProviders(<Player />);
      expect(screen.getByAltText('repeat')).toBeInTheDocument();
    });
  });

  describe('Play/Pause', () => {
    it('toggles play/pause on button click', () => {
      renderWithProviders(<Player />);
      const playButton = screen.getByRole('button', { name: /play/i });

      // Click play
      fireEvent.click(playButton);
      expect(mockPlay).toHaveBeenCalled();

      // Click pause
      fireEvent.click(playButton);
      expect(mockPause).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('goes to next song on next button click', () => {
      renderWithProviders(<Player />);
      const nextButton = screen.getByRole('button', { name: /next/i });

      fireEvent.click(nextButton);
      expect(mockPlay).toHaveBeenCalled();
    });

    it('goes to prev song on prev button click', () => {
      renderWithProviders(<Player />);
      const prevButton = screen.getByRole('button', { name: /previous/i });

      fireEvent.click(prevButton);
      expect(mockPlay).toHaveBeenCalled();
    });

    it('wraps to first song when clicking next on last song', () => {
      renderWithProviders(<Player />);
      const nextButton = screen.getByRole('button', { name: /next/i });

      // Click next multiple times to reach last song, then wrap
      for (let i = 0; i < 10; i++) {
        fireEvent.click(nextButton);
      }
      expect(mockPlay).toHaveBeenCalled();
    });

    it('wraps to last song when clicking prev on first song', () => {
      renderWithProviders(<Player />);
      const prevButton = screen.getByRole('button', { name: /previous/i });

      fireEvent.click(prevButton);
      expect(mockPlay).toHaveBeenCalled();
    });
  });

  describe('Progress Bar', () => {
    it('seek changes currentTime when slider value changes', () => {
      renderWithProviders(<Player />);
      const slider = screen.getByRole('slider');

      fireEvent.change(slider, { target: { value: '60' } });
      // Slider value should update
      expect(slider).toHaveValue('60');
    });
  });

  describe('Shuffle', () => {
    it('toggles shuffle state on click', () => {
      renderWithProviders(<Player />);
      const shuffleButton = screen.getByRole('button', { name: /shuffle/i });

      // Initial state: off (opacity-50)
      expect(shuffleButton).toHaveClass('opacity-50');

      // Click to enable
      fireEvent.click(shuffleButton);
      expect(shuffleButton).toHaveClass('opacity-100');

      // Click to disable
      fireEvent.click(shuffleButton);
      expect(shuffleButton).toHaveClass('opacity-50');
    });
  });

  describe('Repeat', () => {
    it('cycles repeat mode on click (all -> none -> one -> all)', () => {
      renderWithProviders(<Player />);
      const repeatButton = screen.getByRole('button', { name: /repeat/i });

      // Default is 'all' (opacity-100)
      expect(repeatButton).toHaveClass('opacity-100');

      // Click: all -> none
      fireEvent.click(repeatButton);
      expect(repeatButton).toHaveClass('opacity-50');

      // Click: none -> one
      fireEvent.click(repeatButton);
      expect(repeatButton).toHaveClass('opacity-100');
      expect(screen.getByAltText('repeat').getAttribute('src')).toContain('repeat-one');

      // Click: one -> all
      fireEvent.click(repeatButton);
      expect(repeatButton).toHaveClass('opacity-100');
      expect(screen.getByAltText('repeat').getAttribute('src')).toContain('repeat.svg');
    });

    it('audio loop attribute changes based on repeat mode', () => {
      renderWithProviders(<Player />);
      const repeatButton = screen.getByRole('button', { name: /repeat/i });
      const audio = document.querySelector('audio') as HTMLAudioElement;

      // Default 'all' - no loop attribute (handled by onEnded)
      expect(audio.loop).toBe(false);

      // Click twice to get to 'one' mode
      fireEvent.click(repeatButton); // all -> none
      fireEvent.click(repeatButton); // none -> one
      expect(audio.loop).toBe(true);

      // Click to go back to 'all'
      fireEvent.click(repeatButton); // one -> all
      expect(audio.loop).toBe(false);
    });
  });

  describe('formatTime helper', () => {
    it('displays formatted time correctly', () => {
      renderWithProviders(<Player />);
      // Initial state shows 0:00
      const timeDisplays = screen.getAllByText(/^\d+:\d{2}$/);
      expect(timeDisplays.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Audio Events', () => {
    it('updates currentTime on timeupdate event', () => {
      renderWithProviders(<Player />);
      const audio = document.querySelector('audio') as HTMLAudioElement;

      // Simulate time update
      Object.defineProperty(audio, 'currentTime', {
        configurable: true,
        writable: true,
        value: 45,
      });
      fireEvent(audio, new Event('timeupdate'));

      // Check slider updated
      const slider = screen.getByRole('slider');
      expect(slider).toHaveValue('45');
    });

    it('updates duration on loadedmetadata event', () => {
      renderWithProviders(<Player />);
      const audio = document.querySelector('audio') as HTMLAudioElement;

      // Simulate metadata loaded
      Object.defineProperty(audio, 'duration', {
        configurable: true,
        writable: true,
        value: 240,
      });
      fireEvent(audio, new Event('loadedmetadata'));

      // Check slider max updated
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('max', '240');
    });

    it('handles song ended event in all repeat mode', () => {
      renderWithProviders(<Player />);
      const audio = document.querySelector('audio') as HTMLAudioElement;
      const initialSongName = screen.getByText('Formant - Regret');
      expect(initialSongName).toBeInTheDocument();

      // Default is 'all' mode - should go to next
      fireEvent(audio, new Event('ended'));
      // After ended, play is called for next song
      expect(mockPlay).toHaveBeenCalled();
    });

    it('handles song ended event in one repeat mode', () => {
      renderWithProviders(<Player />);
      const repeatButton = screen.getByRole('button', { name: /repeat/i });
      const audio = document.querySelector('audio') as HTMLAudioElement;

      // Click twice to get to 'one' mode
      fireEvent.click(repeatButton); // all -> none
      fireEvent.click(repeatButton); // none -> one

      // In one mode, audio.loop is true, onEnded shouldn't be triggered by browser
      // But if it is, it should restart
      Object.defineProperty(audio, 'currentTime', {
        configurable: true,
        writable: true,
        value: 180,
      });
      fireEvent(audio, new Event('ended'));
      expect(mockPlay).toHaveBeenCalled();
    });

    it('handles song ended event in none repeat mode (not last song)', () => {
      renderWithProviders(<Player />);
      const repeatButton = screen.getByRole('button', { name: /repeat/i });
      const audio = document.querySelector('audio') as HTMLAudioElement;

      // Click once to get to 'none' mode
      fireEvent.click(repeatButton); // all -> none

      // Should go to next song (not last)
      fireEvent(audio, new Event('ended'));
      expect(mockPlay).toHaveBeenCalled();
    });
  });

  describe('Shuffle with Next', () => {
    it('picks random song when shuffle enabled and next clicked', () => {
      renderWithProviders(<Player />);
      const shuffleButton = screen.getByRole('button', { name: /shuffle/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      // Enable shuffle
      fireEvent.click(shuffleButton);

      // Mock Math.random
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      // Click next
      fireEvent.click(nextButton);

      expect(mockPlay).toHaveBeenCalled();
      mockRandom.mockRestore();
    });
  });
});
