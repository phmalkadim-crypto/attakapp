import React from 'react';
import { User } from '../../types';

interface MobileAppContainerProps {
  children: React.ReactNode;
  currentUser: User;
  allUsers?: User[];
  onSwitchUser?: (user: User) => void;
  isDarkMode?: boolean;
}

export const MobileAppContainer: React.FC<MobileAppContainerProps> = ({
  children,
  isDarkMode = false,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#061811] flex items-center justify-center font-sans antialiased">
      <div
        className={`w-full max-w-md h-screen overflow-hidden flex flex-col relative transition-colors ${
          isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
