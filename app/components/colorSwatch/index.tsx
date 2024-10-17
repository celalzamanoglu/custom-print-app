import React from 'react';
import { colors } from '@/constants';

interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  return (
    <div
      className={`w-6 h-6 rounded-full mr-2 ${
        color === colors.white ? 'ring-[0.1px] ring-gray-300' : ''
      } shadow-md`}
      style={{ backgroundColor: color }}
    />
  );
}
