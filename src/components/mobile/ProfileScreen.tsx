import React from 'react';
import { User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import {
  ChevronRight,
  ChevronLeft,
  Star,
  ShieldCheck,
  UserCheck,
  Store,
  Layers,
  SlidersHorizontal,
  Bell,
  RotateCcw,
} from 'lucide-react';
import { store } from '../../services/store';

interface ProfileScreenProps {
  currentUser: User;
  onBack: () => void;
  onOpenSellerDashboard: () => void;
  onOpenTraderDashboard: () => void;
  onOpenNotifications: () => void;
  onOpenAdmin: () => void;
  onSwitchUserPrompt: () => void;
  onLogout?: () => void;
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
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-4 select-none">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <MobileStatusBar darkTheme={false} />
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-black text-slate-900">حسابي</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-4 text-right">
        {/* User Card Matching Screenshot 10 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black text-xl shrink-0 border border-slate-300">
            {currentUser.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h2 className="text-base font-black text-slate-900">{currentUser.name}</h2>
            <span className="text-xs text-slate-400 font-mono block mt-0.5" dir="ltr">
              {currentUser.phone}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {currentUser.governorate} - {currentUser.area} 📍
            </span>

            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                {currentUser.role === 'both'
                  ? 'بائع وتاجر'
                  : currentUser.role === 'trader'
                  ? 'تاجر خردة'
                  : 'صاحب خردة'}
              </span>

              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{currentUser.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({currentUser.ratingCount} تقييم)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Boxes Matching Screenshot 10 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 block mb-1">المزادات</span>
            <span className="text-lg font-black text-slate-900 tabular-nums">
              {currentUser.totalAuctions || 8}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 block mb-1">الصفقات</span>
            <span className="text-lg font-black text-emerald-700 tabular-nums">
              {currentUser.totalDeals || 12}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-col items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-0.5" />
            <span className="text-[10px] font-bold text-emerald-700">تاجر معتمد</span>
          </div>
        </div>

        {/* Action Menu List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={onOpenTraderDashboard}
            className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-emerald-700" />
              <span className="font-bold">صفحة التاجر (مزاداتي وصفقاتي)</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onOpenSellerDashboard}
            className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-amber-600" />
              <span className="font-bold">صفحة البائع (إدارة المزادات والإحصائيات)</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-rose-500" />
              <span className="font-bold">الإشعارات والتنبيهات</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onOpenAdmin}
            className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <span className="font-bold">لوحة الإدارة (Admin Panel)</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Switch / Reset */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onSwitchUserPrompt}
            className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            تبديل الحساب التجريبي / تسجيل رقم جديد
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full h-11 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer border border-rose-200/60"
            >
              تسجيل الخروج (عرض واجهة الدخول عَتّاك)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
