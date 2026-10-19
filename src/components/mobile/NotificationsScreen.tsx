import React from 'react';
import { AppNotification } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import {
  ChevronRight,
  Bell,
  Trophy,
  Wallet,
  Wrench,
  Sparkles,
  Gavel,
  Clock,
  AlertTriangle,
  Megaphone,
} from 'lucide-react';

interface NotificationsScreenProps {
  notifications: AppNotification[];
  onBack: () => void;
  onSelectAuction?: (auctionId: string) => void;
  isDarkMode?: boolean;
}

// Clean old cached names if present in user's browser localStorage
const cleanText = (text: string) => text.replaceAll('قوطيتي', 'عَتّاك');

// Determine unique custom icon, colors, and badge for each notification type
const getNotificationConfig = (notif: AppNotification, isDark: boolean) => {
  const t = (notif.title || '').toLowerCase();
  const m = (notif.message || '').toLowerCase();

  // 1. Trophy for Winning an Auction (الفوز)
  if (
    notif.type === 'win' ||
    t.includes('فوز') ||
    t.includes('فزت') ||
    t.includes('مبروك') ||
    t.includes('كأس') ||
    m.includes('فوز') ||
    m.includes('فزت')
  ) {
    return {
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      bg: isDark
        ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
        : 'bg-amber-50 border-amber-200 text-amber-600',
      badge: 'فوز بالمزاد 🏆',
      badgeClass: isDark
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }

  // 2. Wallet for Payments / ZainCash / Commission (الدفع والمحفظة)
  if (
    notif.type === 'payment_required' ||
    notif.type === 'payment_success' ||
    t.includes('دفع') ||
    t.includes('عمولة') ||
    t.includes('محفظة') ||
    t.includes('zaincash') ||
    t.includes('زين كاش') ||
    m.includes('دفع') ||
    m.includes('zaincash')
  ) {
    return {
      icon: <Wallet className="w-4 h-4 text-blue-500" />,
      bg: isDark
        ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
        : 'bg-blue-50 border-blue-200 text-blue-600',
      badge: 'دفع ومحفظة 👛',
      badgeClass: isDark
        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        : 'bg-blue-50 text-blue-700 border-blue-200',
    };
  }

  // 3. Maintenance / System updates (الصيانة)
  if (
    t.includes('صيانة') ||
    t.includes('تحديث') ||
    t.includes('سيرفر') ||
    t.includes('منظومة') ||
    m.includes('صيانة') ||
    m.includes('تحديث المنظومة')
  ) {
    return {
      icon: <Wrench className="w-4 h-4 text-orange-500" />,
      bg: isDark
        ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
        : 'bg-orange-50 border-orange-200 text-orange-600',
      badge: 'صيانة وتحديث 🔧',
      badgeClass: isDark
        ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
        : 'bg-orange-50 text-orange-700 border-orange-200',
    };
  }

  // 4. Welcome / Onboarding (الترحيب)
  if (
    t.includes('أهلاً') ||
    t.includes('اهلا') ||
    t.includes('مرحباً') ||
    t.includes('مرحبا') ||
    t.includes('ترحيب') ||
    m.includes('أهلاً') ||
    m.includes('انضمامك')
  ) {
    return {
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      bg: isDark
        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
        : 'bg-emerald-50 border-emerald-200 text-emerald-600',
      badge: 'ترحيب 🎉',
      badgeClass: isDark
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }

  // 5. Bidding / Outbid (المزايدة وتغيير السعر)
  if (
    notif.type === 'bid' ||
    notif.type === 'outbid' ||
    t.includes('مزايدة') ||
    t.includes('سوم') ||
    t.includes('سعر') ||
    m.includes('مزايدة')
  ) {
    return {
      icon: <Gavel className="w-4 h-4 text-purple-500" />,
      bg: isDark
        ? 'bg-purple-500/15 border-purple-500/30 text-purple-400'
        : 'bg-purple-50 border-purple-200 text-purple-600',
      badge: 'مزايدة 🔨',
      badgeClass: isDark
        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        : 'bg-purple-50 text-purple-700 border-purple-200',
    };
  }

  // 6. Auction End (انتهاء المزاد)
  if (
    notif.type === 'auction_end' ||
    t.includes('انتهى') ||
    t.includes('إغلاق') ||
    m.includes('انتهى')
  ) {
    return {
      icon: <Clock className="w-4 h-4 text-teal-500" />,
      bg: isDark
        ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
        : 'bg-teal-50 border-teal-200 text-teal-600',
      badge: 'انتهاء مزاد ⏱️',
      badgeClass: isDark
        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        : 'bg-teal-50 text-teal-700 border-teal-200',
    };
  }

  // 7. Complaint / Alert (شكوى أو تنبيه)
  if (
    t.includes('شكوى') ||
    t.includes('تحذير') ||
    t.includes('تنبيه') ||
    t.includes('مخالفة')
  ) {
    return {
      icon: <AlertTriangle className="w-4 h-4 text-rose-500" />,
      bg: isDark
        ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
        : 'bg-rose-50 border-rose-200 text-rose-600',
      badge: 'تنبيه مهم ⚠️',
      badgeClass: isDark
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        : 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }

  // 8. General Admin Broadcast (إدارة)
  if (notif.type === 'admin') {
    return {
      icon: <Megaphone className="w-4 h-4 text-indigo-500" />,
      bg: isDark
        ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
        : 'bg-indigo-50 border-indigo-200 text-indigo-600',
      badge: 'إشعار إدارة 📢',
      badgeClass: isDark
        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
  }

  // Default fallback
  return {
    icon: <Bell className="w-4 h-4 text-slate-500" />,
    bg: isDark
      ? 'bg-slate-800 border-slate-700 text-slate-300'
      : 'bg-slate-100 border-slate-200 text-slate-600',
    badge: 'إشعار 🔔',
    badgeClass: isDark
      ? 'bg-slate-800 text-slate-300 border-slate-700'
      : 'bg-slate-100 text-slate-700 border-slate-200',
  };
};

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
  onSelectAuction,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`flex-1 flex flex-col overflow-y-auto no-scrollbar pb-6 select-none transition-colors ${
        isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Top Bar */}
      <div
        className={`sticky top-0 z-20 border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-[#062016]/95 border-emerald-950/60'
            : 'bg-white/95 border-slate-200'
        }`}
      >
        <MobileStatusBar darkTheme={isDarkMode} />
        <div className="px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isDarkMode
                ? 'hover:bg-white/10 text-slate-200'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="رجوع"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <h1
              className={`text-sm font-black ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              الإشعارات
            </h1>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isDarkMode
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {notifications.length}
            </span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-2.5 text-right">
        {notifications.length === 0 ? (
          <div
            className={`p-10 rounded-2xl text-center text-xs border ${
              isDarkMode
                ? 'bg-[#12241D] border-emerald-900/40 text-slate-400'
                : 'bg-white border-slate-200/90 text-slate-400'
            }`}
          >
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="font-bold">لا توجد إشعارات حالياً</p>
            <span className="text-[11px] opacity-70">
              ستظهر هنا إشعارات الفوز، المزادات، والدفع والتنبيهات
            </span>
          </div>
        ) : (
          notifications.map((notif, idx) => {
            const config = getNotificationConfig(notif, isDarkMode);

            return (
              <div
                key={`${notif.id || 'notif'}-${idx}`}
                onClick={() => {
                  if (notif.auctionId && onSelectAuction) {
                    onSelectAuction(notif.auctionId);
                  }
                }}
                className={`rounded-2xl p-3.5 border shadow-2xs flex items-start gap-3 transition-all ${
                  isDarkMode
                    ? 'bg-[#12241D] border-emerald-900/50 hover:border-emerald-700/60'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                } ${notif.auctionId ? 'cursor-pointer active:scale-[0.99]' : ''}`}
              >
                {/* Custom Unique Icon for this Notification Type */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 border shadow-2xs transition-transform ${config.bg}`}
                >
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4
                      className={`text-xs font-black truncate ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {cleanText(notif.title)}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {idx === 0
                        ? 'قبل 5 دقائق'
                        : idx === 1
                        ? 'قبل 12 دقيقة'
                        : idx === 2
                        ? 'قبل 30 دقيقة'
                        : 'سابقاً'}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {cleanText(notif.message)}
                  </p>

                  {/* Badge indicating notification category */}
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md border ${config.badgeClass}`}
                    >
                      {config.badge}
                    </span>
                    {notif.auctionId && (
                      <span className="text-[10px] text-emerald-500 font-bold">
                        اضغط لفتح المزاد ←
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
