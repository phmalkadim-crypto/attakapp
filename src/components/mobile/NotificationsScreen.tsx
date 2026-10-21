import React from 'react';
import { AppNotification } from '../../types';
import { ArrowRight, Bell } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: AppNotification[];
  onBack: () => void;
  onSelectAuction?: (auctionId: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0B1612] overflow-y-auto pb-28 text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-[#071F15] border-b border-slate-200 dark:border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">الإشعارات والتنبيهات 🔔</h1>
        <div className="w-5" />
      </div>

      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-xs font-bold text-slate-500">لا توجد إشعارات جديدة حالياً</h3>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#071F15] border border-slate-200 dark:border-emerald-950/70 shadow-xs"
            >
              <h3 className="text-xs font-bold">{n.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
