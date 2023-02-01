import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };