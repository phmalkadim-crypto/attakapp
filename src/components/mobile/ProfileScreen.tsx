import React from 'react';
import { User } from '../../types';
import { ArrowRight, ShieldCheck, Phone, MapPin, Store, SlidersHorizontal, LogOut, UserCheck } from 'lucide-react';

interface ProfileScreenProps {
  currentUser: User;
  onBack: () => void;
  onOpenSellerDashboard: () => void;
  onOpenTraderDashboard: () => void;
  onOpenNotifications: () => void;
  onOpenAdmin: () => void;
  onSwitchUserPrompt: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  onBack,
  onOpenSellerDashboard,
  onOpenTraderDashboard,
  onOpenNotifications,
  onOpenAdmin,
  onSwitchUserPrompt,
  onLogout,
}) => {
  const isAdmin = currentUser.role === 'admin' || currentUser.phone === '07829692579';

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0B1612] overflow-y-auto pb-28 select-none text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-[#071F15] border-b border-slate-200 dark:border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">حسابي الشخصي</h1>
        <div className="w-5" />
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#071F15] border border-slate-200 dark:border-emerald-950/70 shadow-xs flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs">
            {currentUser.name ? currentUser.name[0] : 'ع'}
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-black">{currentUser.name}</h2>
            <span className="text-xs font-mono text-slate-400 block mt-0.5" dir="ltr">
              {currentUser.phone}
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isAdmin ? 'bg-purple-600 text-white' : 'bg-amber-500 text-slate-950'
                }`}
              >
                {isAdmin ? '👑 مدير المنصة (Admin)' : 'تاجر خردة معتمد'}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-[#071F15] rounded-2xl border border-slate-200 dark:border-emerald-950/70 divide-y divide-slate-100 dark:divide-emerald-950/50 overflow-hidden shadow-xs">
          <button
            onClick={onOpenTraderDashboard}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold hover:bg-slate-50 dark:hover:bg-emerald-950/30"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>صفحة التاجر (مزاداتي وصفقاتي)</span>
            </div>
          </button>

          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-black bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
            >
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>لوحة تحكم الإدارة (Admin Panel) 👑</span>
              </div>
            </button>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl border border-red-500/30 text-red-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 active:scale-98 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج من الحساب</span>
        </button>
      </div>
    </div>
  );
};
