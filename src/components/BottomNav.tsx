import React from 'react';
import { Home, Gavel, PlusCircle, Trophy, User } from 'lucide-react';

export type NavTab = 'home' | 'auctions' | 'add' | 'deals' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  dealsBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  dealsBadgeCount = 0,
}) => {
  const tabs = [
    {
      id: 'home' as NavTab,
      label: 'الرئيسية',
      icon: Home,
    },
    {
      id: 'auctions' as NavTab,
      label: 'المزادات',
      icon: Gavel,
    },
    {
      id: 'add' as NavTab,
      label: 'أضف مزاد',
      icon: PlusCircle,
      highlight: true,
    },
    {
      id: 'deals' as NavTab,
      label: 'صفقاتي',
      icon: Trophy,
      badge: dealsBadgeCount,
    },
    {
      id: 'profile' as NavTab,
      label: 'حسابي',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md md:max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center min-h-[44px] relative -top-3 group transition-transform active:scale-95"
                aria-label={tab.label}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-slate-900 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-amber-400 mt-1">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors relative ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
