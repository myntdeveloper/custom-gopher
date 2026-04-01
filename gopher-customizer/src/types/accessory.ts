import type { ReactNode } from 'react';

export type AccessoryPlacement = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
};

export type AccessoryItem = {
  id: string;
  name: string;
  preview: ReactNode;
  render: ReactNode;
  placement?: AccessoryPlacement;
};
