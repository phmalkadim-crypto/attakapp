import React, { useState } from 'react';
import { Smartphone, Maximize2, Minimize2, ArrowRightLeft } from 'lucide-react';
import { User } from '../../types';

interface MobileAppContainerProps {
  children: React.ReactNode;
  currentUser: User;
  allUsers: User[];
  onSwitchUser: (user: User) => void;
  isDarkMode?: boolean;
}

export const MobileAppContainer: React.FC<MobileAppContainerProps> = ({
  children,
  currentUser,
  allUsers,
  onSwitchUser,
  isDarkMode = false,
}) => {
  const [isFrameMode, setIsFrameMode] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:py-6 selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Desktop Controller Ribbon */}
      <aside aria-label="شريط التحكم" className="hidden sm:flex items-center justify-between w-full max-w-[440px] mb-3 px-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">♻️ تطبيق عَتّاك | Attak للهاتف</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Role / User switcher for evaluator */}
          <select
            value={currentUser.id}
            onChange={(e) => {
              const u = allUsers.find((x) => x.id === e.target.value);
              if (u) onSwitchUser(u);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-amber-400 focus:outline-none"
          >
            {allUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'trader' ? 'تاجر' : u.role === 'seller' ? 'بائع' : 'إدارة'})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsFrameMode(!isFrameMode)}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300"
            title={isFrameMode ? 'تكبير ملء الشاشة' : 'وضع إطار الهاتف'}
          >
            {isFrameMode ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>

      {/* Phone Shell */}
      <div
        className={`w-full transition-all duration-300 overflow-hidden flex flex-col relative ${
          isFrameMode
            ? 'sm:max-w-[420px] sm:h-[860px] sm:rounded-[52px] sm:border-[10px] sm:border-slate-800 sm:shadow-[0_25px_65px_-12px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-slate-700/60'
            : 'max-w-md h-screen'
        } h-screen transition-colors ${isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-white text-slate-900'}`}
      >
        {children}
      </div>
    </div>
  );
};
