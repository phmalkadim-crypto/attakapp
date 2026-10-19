import React from 'react';
import { User } from '../types';
import { store } from '../services/store';
import {
  User as UserIcon,
  Phone,
  MapPin,
  Award,
  ShieldCheck,
  Star,
  Gavel,
  Trophy,
  SlidersHorizontal,
  LogOut,
  Info,
  FileText,
  RotateCcw,
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onUserUpdated: (user: User) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  onUserUpdated,
}) => {
  const handleToggleRole = (newRole: 'seller' | 'trader' | 'both') => {
    const updated: User = {
      ...currentUser,
      role: newRole,
    };
    store.updateUser(updated);
    onUserUpdated(updated);
  };

  const handleResetData = () => {
    if (confirm('هل تريد إعادة تعيين بيانات التجربة إلى حالتها الافتراضية؟')) {
      store.resetData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-slate-850 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">{currentUser.name}</h2>
              {currentUser.isVerifiedTrader && (
                <span className="text-xs font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/30 flex items-center gap-1">
                  <span>🔵</span>
                  <span>تاجر معتمد</span>
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <span className="font-mono" dir="ltr">
                {currentUser.phone}
              </span>
              <span>·</span>
              <span>
                {currentUser.governorate} ({currentUser.area})
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2.5 text-center pt-2 border-t border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">التقييم العام</span>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentUser.rating}</span>
              <span className="text-[10px] text-slate-500">({currentUser.ratingCount})</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">المزادات</span>
            <span className="text-sm font-bold text-white tabular-nums">
              {currentUser.totalAuctions}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">الصفقات المكتملة</span>
            <span className="text-sm font-bold text-emerald-400 tabular-nums">
              {currentUser.totalDeals}
            </span>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="p-5 rounded-3xl bg-slate-850 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300">
          نوع الحساب النشط (يمكنك التبديل في أي وقت):
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'seller' as const, label: '👤 صاحب خردة (بائع)' },
            { id: 'trader' as const, label: '🏪 تاجر خردة' },
            { id: 'both' as const, label: '🔄 بائع وتاجر معاً' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => handleToggleRole(r.id)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                currentUser.role === r.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions & Admin */}
      <div className="p-5 rounded-3xl bg-slate-850 border border-slate-800 space-y-2">
        <button
          onClick={onOpenAdmin}
          className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-xs flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>لوحة تحكم الإدارة (Admin Dashboard)</span>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            تحكم كامل
          </span>
        </button>

        <button
          onClick={onOpenAuth}
          className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-xs flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>تسجيل رقم هاتف جديد أو تبديل الحساب</span>
          </div>
          <span className="text-slate-400 text-xs">←</span>
        </button>

        <button
          onClick={handleResetData}
          className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white font-medium text-xs flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>إعادة ضبط البيانات التجريبية للمنصة</span>
          </div>
        </button>
      </div>

      {/* About & Policies */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-white font-bold">
          <Info className="w-4 h-4 text-amber-400" />
          <span>عن منصة عَتّاك | Attak</span>
        </div>
        <p className="leading-relaxed">
          عَتّاك هي المنصة الإلكترونية الأولى في جمهورية العراق لربط أصحاب الخردة والمعادن
          (ألمنيوم، نحاس، حديد، بطاريات) مع التجار المعتمدين عبر المزادات العلنية الشفافة.
        </p>
        <div className="text-[11px] text-slate-500 pt-1">
          عَتّاك لا تستلم قيمة الخردة المالية وتستلم فقط عمولة المنصة الثابتة عبر ZainCash.
        </div>
      </div>
    </div>
  );
};
