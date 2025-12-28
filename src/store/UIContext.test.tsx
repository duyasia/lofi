import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { UIProvider, useUI } from './UIContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UIProvider>{children}</UIProvider>
);

describe('useUI Hook', () => {
  it('provides initial UI state', () => {
    const { result } = renderHook(() => useUI(), { wrapper });

    expect(result.current.enter).toBe(false);
  });

  it('setEnter updates navigation state', () => {
    const { result } = renderHook(() => useUI(), { wrapper });

    act(() => {
      result.current.setEnter(true);
    });

    expect(result.current.enter).toBe(true);
  });

  it('setEnter works with function updater', () => {
    const { result } = renderHook(() => useUI(), { wrapper });

    act(() => {
      result.current.setEnter((prev) => !prev);
    });

    expect(result.current.enter).toBe(true);

    act(() => {
      result.current.setEnter((prev) => !prev);
    });

    expect(result.current.enter).toBe(false);
  });

  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      renderHook(() => useUI());
    }).toThrow('useUI must be used within UIProvider');

    consoleSpy.mockRestore();
  });
});
