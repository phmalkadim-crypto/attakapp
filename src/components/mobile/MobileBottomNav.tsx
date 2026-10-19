import React from 'react';
import { Home, Trophy, Plus, Headphones, User } from 'lucide-react';

export type MobileTab = 'home' | 'deals' | 'add' | 'support' | 'profile';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  pendingDealsBadge?: number;
  isDarkMode?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingDealsBadge = 0,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`border-t select-none z-30 shrink-0 transition-colors ${
        isDarkMode
          ? 'bg-[#0B1813] border-emerald-950/80 text-slate-300'
          : 'bg-white border-slate-200/90 text-slate-600'
      }`}
    >
      <div className="grid grid-cols-5 items-center h-16 px-2 relative">
        {/* Tab 1: الرئيسية */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'home'
              ? isDarkMode
                ? 'text-emerald-400 font-bold'
                : 'text-emerald-700 font-bold'
              : isDarkMode
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] mt-1">الرئيسية</span>
        </button>

        {/* Tab 2: صفقاتي */}
        <button
          onClick={() => onTabChange('deals')}
          className={`flex flex-col items-center justify-center transition-colors relative cursor-pointer ${
            activeTab === 'deals'
              ? isDarkMode
                ? 'text-emerald-400 font-bold'
                : 'text-emerald-700 font-bold'
              : isDarkMode
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Trophy className={`w-5 h-5 ${activeTab === 'deals' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            {pendingDealsBadge > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                {pendingDealsBadge}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1">صفقاتي</span>
        </button>

        {/* Center Tab: + (Add Auction) */}
        <div className="flex justify-center -mt-6">
          <button
            onClick={() => onTabChange('add')}
            className={`w-12 h-12 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 active:scale-95 transition-transform border-4 cursor-pointer ${
              isDarkMode ? 'border-[#0B1813]' : 'border-white'
            }`}
            aria-label="أضف مزاد"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Tab 4: الدعم */}
        <button
          onClick={() => onTabChange('support')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'support'
              ? isDarkMode
                ? 'text-emerald-400 font-bold'
                : 'text-emerald-700 font-bold'
              : isDarkMode
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Headphones className={`w-5 h-5 ${activeTab === 'support' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] mt-1">الدعم</span>
        </button>

        {/* Tab 5: حسابي */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? isDarkMode
                ? 'text-emerald-400 font-bold'
                : 'text-emerald-700 font-bold'
              : isDarkMode
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] mt-1">حسابي</span>
        </button>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-1.5 pt-0.5">
        <div
          className={`w-32 h-1 rounded-full mx-auto transition-colors ${
            isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
          }`}
        />
      </div>
    </div>
  );
};
