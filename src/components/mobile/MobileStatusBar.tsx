import React from 'react';

interface MobileStatusBarProps {
  darkTheme?: boolean;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = () => {
  return (
    <div
      style={{ height: 'env(safe-area-inset-top, 0px)' }}
      className="w-full shrink-0 select-none pointer-events-none"
    />
  );
};
