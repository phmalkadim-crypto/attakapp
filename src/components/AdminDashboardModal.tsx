import React, { useState } from 'react';
import {
  User,
  Auction,
  Category,
  PaymentOrder,
  Complaint,
  AppSettings,
} from '../types';
import { formatIQD, formatArabicDate } from '../utils/formatters';
import { store } from '../services/store';
import {
  X,
  Users,
  Gavel,
  FolderKanban,
  CreditCard,
  AlertTriangle,
  Settings,
  Bell,
  CheckCircle2,
  Ban,
  ShieldCheck,
  Trash2,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

interface AdminDashboardModalProps {
  onClose: () => void;
  onRefreshData: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  onClose,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'users' | 'auctions' | 'categories' | 'payments' | 'complaints' | 'settings' | 'broadcast'
  >('auctions');

  const [users, setUsers] = useState<User[]>(() => store.getUsers());
  const [auctions, setAuctions] = useState<Auction[]>(() => store.getAuctions());
  const [categories, setCategories] = useState<Category[]>(() => store.getCategories());
  const [payments, setPayments] = useState<PaymentOrder[]>(() => store.getPayments());
  const [complaints, setComplaints] = useState<Complaint[]>(() => store.getComplaints());
  const [settings, setSettings] = useState<AppSettings>(() => store.getSettings());

  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Category creation form state
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('♻️');
  const [newCatMinPrice, setNewCatMinPrice] = useState(1000);
  const [newCatDesc, setNewCatDesc] = useState('');

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const refreshAll = () => {
    setUsers(store.getUsers());
    setAuctions(store.getAuctions());
    setCategories(store.getCategories());
    setPayments(store.getPayments());
    setComplaints(store.getComplaints());
    setSettings(store.getSettings());
    onRefreshData();
  };

  const handleToggleVerified = (userId: string) => {
    store.toggleTraderVerification(userId);
    refreshAll();
    setFeedbackMsg('تم تحديث شارة التاجر المعتمد 🔵 بنجاح.');
  };

  const handleToggleBan = (userId: string) => {
    store.toggleUserBan(userId);
    refreshAll();
    setFeedbackMsg('تم تحديث حالة حظر المستخدم.');
  };

  const handleDeleteAuction = (auctionId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المزاد نهائياً من المنظومة؟')) {
      store.deleteAuction(auctionId);
      refreshAll();
      setFeedbackMsg('تم حذف المزاد بنجاح.');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameAr.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      nameAr: newCatNameAr.trim(),
      nameEn: newCatNameAr.trim(),
      icon: newCatIcon || '♻️',
      slug: `custom-${Date.now()}`,
      isActive: true,
      minStartPrice: newCatMinPrice,
      description: newCatDesc.trim() || 'قسم خردة مضاف من الإدارة',
    };

    store.saveCategory(newCat);
    setNewCatNameAr('');
    setNewCatDesc('');
    refreshAll();
    setFeedbackMsg('✅ تم إضافة قسم الخردة الجديد إلى المنصة بنجاح!');
  };

  const handleToggleCategoryActive = (cat: Category) => {
    store.saveCategory({ ...cat, isActive: !cat.isActive });
    refreshAll();
  };

  const handleDeleteCategory = (catId: string) => {
    store.deleteCategory(catId);
    refreshAll();
    setFeedbackMsg('تم حذف القسم.');
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    store.addNotification({
      title: broadcastTitle,
      message: broadcastMessage,
      type: 'admin',
    });

    setBroadcastTitle('');
    setBroadcastMessage('');
    refreshAll();
    setFeedbackMsg('📢 تم إرسال الإشعار لجميع مستخدمي عَتّاك بنجاح!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settings);
    refreshAll();
    setFeedbackMsg('✅ تم حفظ إعدادات المنظومة والعمولات بنجاح.');
  };

  const handleResolveComplaint = (id: string) => {
    store.updateComplaintStatus(id, 'RESOLVED');
    refreshAll();
    setFeedbackMsg('تم إغلاق ومعالجة الشكوى.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 text-right">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">لوحة تحكم إدارة عَتّاك</h2>
              <span className="text-xs text-slate-400">إدارة المستخدمين، المزادات، العمولات، والأقسام</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-slate-800 flex items-center gap-2 overflow-x-auto pb-3">
          {[
            { id: 'auctions', label: 'المزادات والمزايدات', icon: Gavel },
            { id: 'categories', label: 'أقسام الخردة', icon: FolderKanban },
            { id: 'users', label: 'المستخدمون والتجار', icon: Users },
            { id: 'payments', label: 'المدفوعات (ZainCash)', icon: CreditCard },
            { id: 'complaints', label: 'الشكاوى', icon: AlertTriangle },
            { id: 'broadcast', label: 'إرسال إشعار', icon: Bell },
            { id: 'settings', label: 'الإعدادات والعمولات', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setFeedbackMsg(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                    : 'bg-slate-850 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <span>{feedbackMsg}</span>
            <button onClick={() => setFeedbackMsg(null)} className="text-amber-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* --- TAB: AUCTIONS --- */}
          {activeTab === 'auctions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  جميع المزادات في المنظومة ({auctions.length})
                </h3>
              </div>

              <div className="space-y-3">
                {auctions.map((auc) => (
                  <div
                    key={auc.id}
                    className="p-4 rounded-2xl bg-slate-850 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-amber-400">{auc.categoryName}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{auc.governorate}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{auc.approxWeightKg} كغم تقريباً</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-sky-400 font-mono">حالة: {auc.status}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{auc.title}</h4>
                      <div className="text-slate-400 text-[11px] mt-1">
                        البائع: {auc.sellerName} ({auc.sellerPhone}) · أعلى مزايد:{' '}
                        {auc.winnerName || 'لا يوجد'} ({auc.bidsCount} مزايدات)
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <span className="font-black text-amber-400 text-sm block tabular-nums">
                          {formatIQD(auc.currentPricePerKg)} / كغم
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          القيمة: {formatIQD(auc.totalEstimatedValue)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteAuction(auc.id)}
                        className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/30 text-red-300 transition-colors"
                        title="حذف المزاد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB: CATEGORIES (DYNAMIC SECTION MANAGEMENT) --- */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              {/* Add Category Form */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>إضافة قسم خردة جديد للمنصة</span>
                </h3>

                <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">اسم القسم (عربي):</label>
                    <input
                      type="text"
                      required
                      value={newCatNameAr}
                      onChange={(e) => setNewCatNameAr(e.target.value)}
                      placeholder="مثال: رصاص وسبائك"
                      className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl px-3 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">الأيقونة (Emoji):</label>
                    <input
                      type="text"
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      placeholder="♻️ أو 🟠"
                      className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl px-3 text-white text-xs text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">أدنى سعر بداية (د.ع):</label>
                    <input
                      type="number"
                      value={newCatMinPrice}
                      onChange={(e) => setNewCatMinPrice(Number(e.target.value))}
                      className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl px-3 text-white text-xs tabular-nums"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      + حفظ وإضافة القسم
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400">الأقسام الحالية</h4>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{cat.nameAr}</span>
                          {!cat.isActive && (
                            <span className="text-[10px] bg-red-900/60 text-red-300 px-1.5 py-0.2 rounded">
                              معطل
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          أدنى سعر: {formatIQD(cat.minStartPrice)} / كغم
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleCategoryActive(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          cat.isActive
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        }`}
                      >
                        {cat.isActive ? 'تعطيل مؤقت' : 'تفعيل'}
                      </button>

                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 rounded-lg bg-red-950 text-red-400 hover:text-red-300"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB: USERS & CERTIFIED TRADERS --- */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">إدارة الحسابات والتجار المعتمدين</h3>
              </div>

              <div className="space-y-2">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-amber-400">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{u.name}</span>
                          {u.isVerifiedTrader && (
                            <span className="text-sky-400 font-bold" title="تاجر معتمد">
                              🔵 تاجر معتمد
                            </span>
                          )}
                          {u.isBanned && (
                            <span className="text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded text-[10px]">
                              محظور
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="font-mono" dir="ltr">
                            {u.phone}
                          </span>
                          <span>·</span>
                          <span>
                            {u.governorate} - {u.area}
                          </span>
                          <span>·</span>
                          <span>⭐ {u.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleVerified(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                          u.isVerifiedTrader
                            ? 'bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{u.isVerifiedTrader ? 'إلغاء التوثيق' : 'توثيق كتاجر معتمد 🔵'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleBan(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                          u.isBanned
                            ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                            : 'bg-red-950 border border-red-500/40 text-red-300'
                        }`}
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>{u.isBanned ? 'فك الحظر' : 'حظر الحساب'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB: PAYMENTS (ZAINCASH TRANSACTIONS) --- */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">
                سجل عمليات الدفع والعمولات عبر ZainCash ({payments.length})
              </h3>

              <div className="space-y-2">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-purple-400">{p.id}</span>
                        <span className="text-slate-500">·</span>
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            p.status === 'SUCCESS'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold">{p.auctionTitle}</h4>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        الدافع: {p.payerName} ({p.payerPhone}) · المرجع: {p.referenceNumber}
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="font-black text-amber-400 text-sm block tabular-nums">
                        {formatIQD(p.amount)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatArabicDate(p.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB: COMPLAINTS --- */}
          {activeTab === 'complaints' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">إدارة الشكاوى والملاحظات ({complaints.length})</h3>

              {complaints.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">لا توجد شكاوى مسجلة حالياً</p>
              ) : (
                <div className="space-y-3">
                  {complaints.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded">
                          {c.type}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {formatArabicDate(c.createdAt)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white">بخصوص المزاد: {c.auctionTitle}</h4>
                      <p className="text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        "{c.description}"
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-400 text-[11px]">
                          من: {c.fromUserName} | ضد: {c.againstUserName}
                        </span>
                        {c.status === 'OPEN' && (
                          <button
                            onClick={() => handleResolveComplaint(c.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                          >
                            معالجة وإغلاق الشكوى
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- TAB: BROADCAST NOTIFICATION --- */}
          {activeTab === 'broadcast' && (
            <form onSubmit={handleBroadcast} className="space-y-4 max-w-lg">
              <h3 className="text-sm font-bold text-white">إرسال إشعار عام لجميع مستخدمي المنصة</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  عنوان الإشعار:
                </label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="مثال: تحديث أسعار النحاس والألمنيوم اليوم 📢"
                  className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  نص الرسالة:
                </label>
                <textarea
                  rows={3}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="اكتب التنبيه أو التوجيه للمستخدمين والتجار..."
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs"
              >
                إرسال الإشعار فوراً 🚀
              </button>
            </form>
          )}

          {/* --- TAB: SETTINGS & COMMISSIONS --- */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-xl">
              <h3 className="text-sm font-bold text-white">إعدادات العمولات والمنظومة</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    عمولة التاجر (د.ع):
                  </label>
                  <input
                    type="number"
                    value={settings.traderCommission}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        traderCommission: Number(e.target.value),
                        totalCommission: Number(e.target.value) + settings.sellerCommission,
                      })
                    }
                    className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    عمولة البائع (د.ع):
                  </label>
                  <input
                    type="number"
                    value={settings.sellerCommission}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sellerCommission: Number(e.target.value),
                        totalCommission: settings.traderCommission + Number(e.target.value),
                      })
                    }
                    className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                <span>إجمالي العمولة المستقطعة عبر زين كاش:</span>
                <span className="font-bold text-base tabular-nums">
                  {formatIQD(settings.totalCommission)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  معرّف تاجر ZainCash (Merchant ID):
                </label>
                <input
                  type="text"
                  value={settings.zainCashMerchantId}
                  onChange={(e) =>
                    setSettings({ ...settings, zainCashMerchantId: e.target.value })
                  }
                  className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs font-mono"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs"
              >
                حفظ الإعدادات
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
