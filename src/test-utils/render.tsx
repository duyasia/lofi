import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import Provider from '../store/Provider';

interface WrapperProps {
  children: ReactNode;
}

const AllProviders: React.FC<WrapperProps> = ({ children }) => (
  <Provider>{children}</Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
