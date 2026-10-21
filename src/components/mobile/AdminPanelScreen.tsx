import React from 'react';
import { ArrowRight, SlidersHorizontal, Users, ShieldAlert, DollarSign } from 'lucide-react';
import { store } from '../../services/store';

interface AdminPanelScreenProps {
  onBack: () => void;
  onRefreshData?: () => void;
}

export const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ onBack }) => {
  const users = store.getUsers();
  const auctions = store.getAuctions();

  return (
    <div className="flex-1 flex flex-col bg-[#0B1612] text-white overflow-y-auto pb-28">
      <div className="bg-[#071F15] border-b border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black flex items-center gap-1.5 text-amber-400">
          <span>لوحة تحكم الإدارة (Admin Panel) 👑</span>
        </h1>
        <div className="w-5" />
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#061F15] border border-emerald-900/50">
            <span className="text-[10px] text-slate-400 block">إجمالي المستخدمين</span>
            <span className="text-lg font-black text-white mt-1 block">{users.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#061F15] border border-emerald-900/50">
            <span className="text-[10px] text-slate-400 block">إجمالي المزادات</span>
            <span className="text-lg font-black text-amber-400 mt-1 block">{auctions.length}</span>
          </div>
        </div>

        {/* Users Management */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400">قائمة المستخدمين المسجلين:</h2>
          <div className="divide-y divide-emerald-950/60 rounded-2xl border border-emerald-950/80 bg-[#061F15] overflow-hidden">
            {users.map((u) => (
              <div key={u.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold block text-white">{u.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{u.phone}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-amber-500/20 text-amber-400'}`}>
                  {u.role === 'admin' ? 'مدير 👑' : 'مستخدم'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
