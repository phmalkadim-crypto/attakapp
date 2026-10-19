import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface MobileStatusBarProps {
  darkTheme?: boolean;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ darkTheme = false }) => {
  return (
    <div
      className={`h-11 px-6 flex items-center justify-between text-xs font-semibold select-none z-30 relative ${
        darkTheme ? 'text-white' : 'text-slate-900'
      }`}
      dir="ltr"
    >
      {/* Time */}
      <span className="font-semibold tracking-tight text-[13px]">9:41</span>

      {/* Dynamic Island / Speaker Pill */}
      <div className="w-24 h-4 bg-black rounded-full mx-auto" />

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 text-[12px]">
        {/* Signal */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1 bg-current rounded-full" />
          <span className="w-0.5 h-1.5 bg-current rounded-full" />
          <span className="w-0.5 h-2 bg-current rounded-full" />
          <span className="w-0.5 h-2.5 bg-current rounded-full" />
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
};
