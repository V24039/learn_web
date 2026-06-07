import { ReactNode } from 'react';

export const Buttons = ({ children }: { children: ReactNode }) => {
  return <div className="inline-flex gap-1 flex-wrap">{children}</div>;
};

