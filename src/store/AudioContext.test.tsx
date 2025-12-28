import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { AudioProvider, useAudio } from './AudioContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AudioProvider>{children}</AudioProvider>
);

describe('useAudio Hook', () => {
  it('provides initial audio state', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    expect(result.current.rain).toBe(false);
    expect(result.current.volumeRain).toBe(0);
    expect(result.current.traffic).toBe(false);
    expect(result.current.volumeTraffic).toBe(0);
    expect(result.current.keyboard).toBe(false);
    expect(result.current.volumeKeyboard).toBe(0);
    expect(result.current.volumeSong).toBe(50);
    expect(result.current.song).toHaveLength(5); // chill has 5 songs
  });

  it('toggleRain enables rain with default volume', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.toggleRain();
    });

    expect(result.current.rain).toBe(true);
    expect(result.current.volumeRain).toBe(50);
    expect(result.current.cityRain).toBe(50);
  });

  it('toggleRain disables rain and resets volume', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    // Enable first
    act(() => {
      result.current.toggleRain();
    });

    // Then disable
    act(() => {
      result.current.toggleRain();
    });

    expect(result.current.rain).toBe(false);
    expect(result.current.volumeRain).toBe(0);
  });

  it('changeRainVolume updates volume and enables rain when > 0', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.changeRainVolume(75);
    });

    expect(result.current.rain).toBe(true);
    expect(result.current.volumeRain).toBe(75);
    expect(result.current.cityRain).toBe(75);
  });

  it('changeRainVolume disables rain when set to 0', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    // First enable
    act(() => {
      result.current.changeRainVolume(50);
    });

    // Then set to 0
    act(() => {
      result.current.changeRainVolume(0);
    });

    expect(result.current.rain).toBe(false);
    expect(result.current.volumeRain).toBe(0);
  });

  it('toggleTraffic works correctly', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.toggleTraffic();
    });

    expect(result.current.traffic).toBe(true);
    expect(result.current.volumeTraffic).toBe(50);
  });

  it('toggleKeyboard works correctly', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.toggleKeyboard();
    });

    expect(result.current.keyboard).toBe(true);
    expect(result.current.volumeKeyboard).toBe(50);
  });

  it('toggleTraffic disables traffic and resets volume', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    // Enable first
    act(() => {
      result.current.toggleTraffic();
    });

    // Then disable
    act(() => {
      result.current.toggleTraffic();
    });

    expect(result.current.traffic).toBe(false);
    expect(result.current.volumeTraffic).toBe(0);
  });

  it('toggleKeyboard disables keyboard and resets volume', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    // Enable first
    act(() => {
      result.current.toggleKeyboard();
    });

    // Then disable
    act(() => {
      result.current.toggleKeyboard();
    });

    expect(result.current.keyboard).toBe(false);
    expect(result.current.volumeKeyboard).toBe(0);
  });

  it('changeTrafficVolume updates volume and enables traffic when > 0', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.changeTrafficVolume(75);
    });

    expect(result.current.traffic).toBe(true);
    expect(result.current.volumeTraffic).toBe(75);
    expect(result.current.cityTraffic).toBe(75);
  });

  it('changeKeyboardVolume updates volume and enables keyboard when > 0', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.changeKeyboardVolume(75);
    });

    expect(result.current.keyboard).toBe(true);
    expect(result.current.volumeKeyboard).toBe(75);
    expect(result.current.soundKey).toBe(75);
  });

  it('setSong updates song list', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    const newSongs = [{ name: 'Test Song', src: '/test.mp3' }];

    act(() => {
      result.current.setSong(newSongs);
    });

    expect(result.current.song).toEqual(newSongs);
  });

  it('setVolumeSong updates song volume', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    act(() => {
      result.current.setVolumeSong(80);
    });

    expect(result.current.volumeSong).toBe(80);
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      renderHook(() => useAudio());
    }).toThrow('useAudio must be used within AudioProvider');

    consoleSpy.mockRestore();
  });
});
