import React, { useState } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Gavel,
  TrendingUp,
  Trophy,
  CreditCard,
  FolderKanban,
  Store,
  AlertTriangle,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { store } from '../../services/store';
import { formatIQD } from '../../utils/formatters';

interface AdminPanelScreenProps {
  onBack: () => void;
  onRefreshData: () => void;
}

export const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({
  onBack,
  onRefreshData,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const users = store.getUsers();
  const auctions = store.getAuctions();
  const categories = store.getCategories();
  const payments = store.getPayments();
  const complaints = store.getComplaints();

  const [newCatName, setNewCatName] = useState('');
  const [newCatMinPrice, setNewCatMinPrice] = useState(1000);

  const menuItems = [
    { id: 'users', label: 'المستخدمون', icon: Users, count: users.length },
    { id: 'auctions', label: 'المزادات', icon: Gavel, count: auctions.length },
    { id: 'bids', label: 'المزايدات', icon: TrendingUp, count: auctions.reduce((acc, a) => acc + a.bidsCount, 0) },
    { id: 'deals', label: 'الصفقات', icon: Trophy, count: auctions.filter((a) => a.status === 'COMMISSION_PAID').length },
    { id: 'payments', label: 'المدفوعات', icon: CreditCard, count: payments.length },
    { id: 'categories', label: 'الأقسام', icon: FolderKanban, count: categories.length },
    { id: 'traders', label: 'التجار', icon: Store, count: users.filter((u) => u.role === 'trader' || u.role === 'both').length },
    { id: 'complaints', label: 'الشكاوى', icon: AlertTriangle, count: complaints.length },
  ];

  const handleToggleVerified = (userId: string) => {
    store.toggleTraderVerification(userId);
    onRefreshData();
  };

  const handleToggleBan = (userId: string) => {
    store.toggleUserBan(userId);
    onRefreshData();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    store.saveCategory({
      id: `cat-${Date.now()}`,
      nameAr: newCatName.trim(),
      nameEn: newCatName.trim(),
      icon: '♻️',
      slug: `cat-${Date.now()}`,
      isActive: true,
      minStartPrice: newCatMinPrice,
      description: 'قسم خردة جديد',
    });
    setNewCatName('');
    onRefreshData();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-4 select-none">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <MobileStatusBar darkTheme={false} />
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => {
              if (activeSection) {
                setActiveSection(null);
              } else {
                onBack();
              }
            }}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-black text-slate-900">
            {activeSection
              ? menuItems.find((m) => m.id === activeSection)?.label
              : 'لوحة الإدارة'}
          </h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-3 text-right">
        {!activeSection ? (
          /* Main Menu Matching Screenshot 14 */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-right"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <Icon className="w-4 h-4 text-emerald-800" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Sub-section View */
          <div className="space-y-3">
            {activeSection === 'users' || activeSection === 'traders' ? (
              <div className="space-y-2">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleVerified(u.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          u.isVerifiedTrader
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {u.isVerifiedTrader ? '🔵 موثق' : 'توثيق تاجر'}
                      </button>
                      <button
                        onClick={() => handleToggleBan(u.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          u.isBanned ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {u.isBanned ? 'فك الحظر' : 'حظر'}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 font-bold text-slate-900 justify-end">
                        {u.isVerifiedTrader && <span>🔵</span>}
                        <span>{u.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {u.phone} · {u.governorate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeSection === 'categories' ? (
              <div className="space-y-3">
                {/* Add Category */}
                <form
                  onSubmit={handleAddCategory}
                  className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs"
                >
                  <label className="font-bold text-slate-800 block">إضافة قسم خردة جديد</label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="اسم القسم (مثال: سبائك وزنك)"
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full h-9 bg-emerald-800 text-white font-bold rounded-lg"
                  >
                    + إضافة القسم
                  </button>
                </form>

                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs"
                  >
                    <button
                      onClick={() => {
                        store.deleteCategory(c.id);
                        onRefreshData();
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-800">
                      {c.icon} {c.nameAr}
                    </span>
                  </div>
                ))}
              </div>
            ) : activeSection === 'payments' ? (
              <div className="space-y-2">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-emerald-700">{formatIQD(p.amount)}</span>
                      <span className="font-bold text-slate-900 font-mono">{p.id}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      الدافع: {p.payerName} ({p.payerPhone})
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {auctions.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs flex items-center justify-between"
                  >
                    <span className="text-emerald-700 font-bold tabular-nums">
                      {formatIQD(a.currentPricePerKg)} / كغم
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900">{a.title}</h4>
                      <span className="text-[10px] text-slate-400">
                        {a.governorate} · {a.bidsCount} مزايدات
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
