import React, { useState } from 'react';
import { User, AppNotification } from '../types';
import {
  Gavel,
  Bell,
  ShieldCheck,
  UserCheck,
  Check,
  X,
  SlidersHorizontal,
  ArrowRightLeft,
} from 'lucide-react';
import { formatArabicDate } from '../utils/formatters';
import { QotiytiLogo } from './QotiytiLogo';

interface NavbarProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  allUsers: User[];
  notifications: AppNotification[];
  onMarkNotificationsRead: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onSelectAuction: (auctionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  allUsers,
  notifications,
  onMarkNotificationsRead,
  onOpenAdmin,
  onOpenAuth,
  onSelectAuction,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <QotiytiLogo size={38} showText={false} centered={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-['Cairo',_'Tajawal',_sans-serif]">
                عَتّاك
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                ATTAK
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              منصة مزادات الخردة في العراق · بيع خردتك بأعلى سعر 🔨♻️
            </p>
          </div>
        </div>

        {/* Center / Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Dashboard shortcut button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="لوحة تحكم الإدارة"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">لوحة الإدارة</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) {
                  onMarkNotificationsRead();
                }
              }}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="الإشعارات"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute left-0 sm:left-auto right-auto sm:right-0 mt-2 w-80 sm:w-96 bg-slate-850 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 bg-slate-900">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">الإشعارات والتنبيهات</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 text-slate-400 hover:text-white rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 text-right">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">لا توجد إشعارات حالياً</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (notif.auctionId) {
                            onSelectAuction(notif.auctionId);
                            setShowNotifications(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                          notif.isRead
                            ? 'bg-slate-800/40 border-slate-800 text-slate-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-amber-400">{notif.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {formatArabicDate(notif.createdAt)}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Current User & Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors min-h-[40px]"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white truncate max-w-[110px]">
                    {currentUser.name}
                  </span>
                  {currentUser.isVerifiedTrader && (
                    <span className="text-sky-400 text-xs" title="تاجر معتمد">
                      🔵
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>
                    {currentUser.role === 'trader'
                      ? '🏪 تاجر خردة'
                      : currentUser.role === 'seller'
                      ? '👤 صاحب خردة'
                      : '🔄 تاجر وبائع'}
                  </span>
                </div>
              </div>
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* User Switch Menu */}
            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50">
                <div className="pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block mb-1">تبديل الحساب السريع للتجربة</span>
                  <p className="text-[11px] text-slate-300">
                    يمكنك التبديل بين البائع والتاجر المعتمد لتجربة المزايدة ودفع العمولة:
                  </p>
                </div>
                <div className="space-y-1.5">
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSwitchUser(u);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-right p-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                        currentUser.id === u.id
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1 font-semibold">
                            <span>{u.name}</span>
                            {u.isVerifiedTrader && <span className="text-[10px]">🔵</span>}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {u.governorate} · {u.role === 'trader' ? 'تاجر' : u.role === 'seller' ? 'بائع' : 'إدارة'}
                          </span>
                        </div>
                      </div>
                      {currentUser.id === u.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenAuth();
                    }}
                    className="w-full py-1.5 text-center text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                  >
                    + تسجيل برقم هاتف عراقي جديد
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
