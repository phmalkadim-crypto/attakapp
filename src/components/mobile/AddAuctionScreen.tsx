import React, { useState } from 'react';
import { Category, User, Auction } from '../../types';
import { store } from '../../services/store';
import { ArrowRight, Plus, MapPin } from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/constants';

interface AddAuctionScreenProps {
  currentUser: User;
  categories: Category[];
  onBack: () => void;
  onAuctionCreated: (auction: Auction) => void;
}

export const AddAuctionScreen: React.FC<AddAuctionScreenProps> = ({
  currentUser,
  categories,
  onBack,
  onAuctionCreated,
}) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-cans');
  const [approxWeightKg, setApproxWeightKg] = useState<number>(500);
  const [startPricePerKg, setStartPricePerKg] = useState<number>(1500);
  const [governorate, setGovernorate] = useState('بغداد');
  const [area, setArea] = useState('الشورجة');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const cat = categories.find((c) => c.id === categoryId) || categories[0];
    const newAuction: Auction = {
      id: `auc-${Date.now()}`,
      title: title.trim(),
      categoryId: cat.id,
      categoryName: cat.nameAr,
      images: [cat.image],
      approxWeightKg: Number(approxWeightKg) || 100,
      governorate,
      area,
      description: description.trim(),
      startPricePerKg: Number(startPricePerKg) || 1000,
      currentPricePerKg: Number(startPricePerKg) || 1000,
      totalEstimatedValue: (Number(approxWeightKg) || 100) * (Number(startPricePerKg) || 1000),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerPhone: currentUser.phone,
      durationHours: 12,
      createdAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
      status: 'ACTIVE',
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 0,
      bids: [],
    };

    store.saveAuction(newAuction);
    onAuctionCreated(newAuction);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0B1612] overflow-y-auto pb-28 text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-[#071F15] border-b border-slate-200 dark:border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">إضافة مزاد خردة جديد</h1>
        <div className="w-5" />
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1.5">عنوان المزاد:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: بالات قواطي بيبسي مكبوسة 500 كغم"
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5">نوع الخردة:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.nameAr}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold mb-1.5">الوزن التقديري (كغم):</label>
            <input
              type="number"
              required
              value={approxWeightKg}
              onChange={(e) => setApproxWeightKg(Number(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5">سعر بدء الكيلو (د.ع):</label>
            <input
              type="number"
              required
              value={startPricePerKg}
              onChange={(e) => setStartPricePerKg(Number(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold mb-1.5">المحافظة:</label>
            <select
              value={governorate}
              onChange={(e) => {
                setGovernorate(e.target.value);
                setArea((IRAQI_GOVERNORATES[e.target.value] || ['المركز'])[0]);
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
            >
              {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5">المنطقة:</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5">التفاصيل والوصف:</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="حالة الخردة، نقاوتها، التواجد، موعد التحميل..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-emerald-950/70 bg-white dark:bg-[#071F15] text-xs font-medium focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer mt-4"
        >
          <span>نشر المزاد الآن 🚀</span>
        </button>
      </form>
    </div>
  );
};
