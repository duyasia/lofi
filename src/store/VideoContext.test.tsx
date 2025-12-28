import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { VideoProvider, useVideo } from './VideoContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <VideoProvider>{children}</VideoProvider>
);

describe('useVideo Hook', () => {
  it('provides initial video state', () => {
    const { result } = renderHook(() => useVideo(), { wrapper });

    expect(result.current.toggled).toBe(true); // default is day
    expect(result.current.fullscreen).toBe(false);
  });

  it('setToggled updates day/night mode', () => {
    const { result } = renderHook(() => useVideo(), { wrapper });

    act(() => {
      result.current.setToggled(false);
    });

    expect(result.current.toggled).toBe(false);
  });

  it('setToggled works with function updater', () => {
    const { result } = renderHook(() => useVideo(), { wrapper });

    act(() => {
      result.current.setToggled((prev) => !prev);
    });

    expect(result.current.toggled).toBe(false);

    act(() => {
      result.current.setToggled((prev) => !prev);
    });

    expect(result.current.toggled).toBe(true);
  });

  it('setFullscreen updates fullscreen state', () => {
    const { result } = renderHook(() => useVideo(), { wrapper });

    act(() => {
      result.current.setFullscreen(true);
    });

    expect(result.current.fullscreen).toBe(true);
  });

  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      renderHook(() => useVideo());
    }).toThrow('useVideo must be used within VideoProvider');

    consoleSpy.mockRestore();
  });
});
