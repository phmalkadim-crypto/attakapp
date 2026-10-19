import React, { useState } from 'react';
import { Auction, Category, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { IRAQI_GOVERNORATES, SCRAP_IMAGES } from '../../data/constants';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight, Camera, Info, Check, Image as ImageIcon } from 'lucide-react';
import { store } from '../../services/store';

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
  const activeCategories = categories.filter((c) => c.isActive);

  const [selectedCatId, setSelectedCatId] = useState<string>(activeCategories[0]?.id || 'cat-cans');
  const [approxWeight, setApproxWeight] = useState<string>('50');
  const [governorate, setGovernorate] = useState<string>(currentUser.governorate || 'الديوانية');
  const [area, setArea] = useState<string>(
    currentUser.area || IRAQI_GOVERNORATES[currentUser.governorate || 'الديوانية']?.[0] || 'مركز الديوانية'
  );
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState<string>('1500');
  const [durationHours, setDurationHours] = useState<number>(6);
  const [selectedImage, setSelectedImage] = useState<string>(SCRAP_IMAGES.cans);
  const [error, setError] = useState<string | null>(null);

  const presetImages = [
    { label: 'قواطي', url: SCRAP_IMAGES.cans },
    { label: 'نحاس', url: SCRAP_IMAGES.copper },
    { label: 'حديد', url: SCRAP_IMAGES.iron },
    { label: 'ألمنيوم', url: SCRAP_IMAGES.aluminum },
    { label: 'بطاريات', url: SCRAP_IMAGES.batteries },
    { label: 'أخرى', url: SCRAP_IMAGES.other },
  ];

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = activeCategories.find((c) => c.id === catId);
    if (cat?.slug === 'cans') setSelectedImage(SCRAP_IMAGES.cans);
    else if (cat?.slug === 'copper') setSelectedImage(SCRAP_IMAGES.copper);
    else if (cat?.slug === 'iron') setSelectedImage(SCRAP_IMAGES.iron);
    else if (cat?.slug === 'aluminum') setSelectedImage(SCRAP_IMAGES.aluminum);
    else if (cat?.slug === 'batteries') setSelectedImage(SCRAP_IMAGES.batteries);
    else setSelectedImage(SCRAP_IMAGES.other);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const weightNum = Number(approxWeight);
    const priceNum = Number(startPrice);

    if (isNaN(weightNum) || weightNum <= 0) {
      setError('يرجى إدخال وزن صحيح بالكيلوغرام.');
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('يرجى إدخال سعر بداية صحيح.');
      return;
    }

    const cat = activeCategories.find((c) => c.id === selectedCatId);
    const catName = cat?.nameAr || 'خردة';
    const now = new Date();
    const endsAt = new Date(now.getTime() + durationHours * 3600 * 1000).toISOString();

    const newAuction: Auction = {
      id: `auc-${Date.now()}`,
      title: `${catName} ${weightNum} كغم تقريباً`,
      categoryId: selectedCatId,
      categoryName: catName,
      images: [selectedImage],
      approxWeightKg: weightNum,
      governorate,
      area,
      description: description.trim() || undefined,
      startPricePerKg: priceNum,
      currentPricePerKg: priceNum,
      totalEstimatedValue: weightNum * priceNum,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerPhone: currentUser.phone,
      durationHours,
      createdAt: now.toISOString(),
      endsAt,
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
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-4">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <MobileStatusBar darkTheme={false} />
        <div className="px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-base font-black text-slate-900">إضافة مزاد جديد</h1>
          <div className="w-8" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4 text-right">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* 1. نوع الخردة مع صور الأقسام الحقيقية */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">نوع الخردة (اختر القسم)</label>
          <div className="grid grid-cols-3 gap-2">
            {activeCategories.map((c) => {
              const isSelected = selectedCatId === c.id;
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id)}
                  className={`p-2 rounded-xl border text-right transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden mb-1 relative bg-slate-100">
                    {c.image ? (
                      <img src={c.image} alt={c.nameAr} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl flex items-center justify-center h-full">{c.icon}</span>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-700/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-emerald-800' : 'text-slate-800'}`}>
                    {c.nameAr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. الصور */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
            <span>الصور</span>
            <span className="text-[10px] text-slate-400 font-normal">اختر من صور الخردة الجاهزة</span>
          </label>

          {/* Dashed Camera upload box */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-white text-center flex flex-col items-center justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-emerald-800 flex items-center justify-center mb-1">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">رفع صورة أو أكثر</span>
            <span className="text-[10px] text-slate-400 mt-0.5">يمكنك إضافة حتى 5 صور للخردة</span>
          </div>

          {/* Preset image thumbnails */}
          <div className="grid grid-cols-5 gap-1.5">
            {presetImages.map((p, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedImage(p.url)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === p.url ? 'border-emerald-700 scale-95 shadow-sm' : 'border-slate-200'
                }`}
              >
                <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                {selectedImage === p.url && (
                  <div className="absolute inset-0 bg-emerald-700/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. الكمية التقريبية */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">الكمية التقريبية</label>
          <div className="relative">
            <input
              type="number"
              value={approxWeight}
              onChange={(e) => setApproxWeight(e.target.value)}
              placeholder="مثال: 50"
              className="w-full h-11 bg-white border border-slate-300 rounded-xl px-4 pl-12 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
            <span className="absolute left-3 top-3 text-xs text-slate-400 font-bold">كغم</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
            الكمية تقريبية ويمكن الاتفاق على الوزن النهائي بين الطرفين عند الاستلام.
          </p>
        </div>

        {/* 4. الموقع */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">الموقع</label>
          <div className="space-y-2">
            <select
              value={governorate}
              onChange={(e) => {
                setGovernorate(e.target.value);
                const areas = IRAQI_GOVERNORATES[e.target.value] || [];
                setArea(areas[0] || 'المركز');
              }}
              className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none"
            >
              <option value="">اختر المحافظة</option>
              {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none"
            >
              <option value="">اختر المنطقة</option>
              {(IRAQI_GOVERNORATES[governorate] || []).map((ar) => (
                <option key={ar} value={ar}>
                  {ar}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. وصف الخردة (اختياري) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            وصف الخردة (اختياري)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أضف أي ملاحظات عن الخردة..."
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        {/* 6. سعر البداية */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">سعر البداية</label>
          <div className="relative">
            <input
              type="number"
              step="50"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              placeholder="مثال: 1,500"
              className="w-full h-11 bg-white border border-slate-300 rounded-xl px-4 pl-16 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
            <span className="absolute left-3 top-3 text-[11px] text-slate-400 font-bold">
              د.ع/كغم
            </span>
          </div>
        </div>

        {/* 7. مدة المزاد */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">مدة المزاد</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 6, 12, 24].map((hours) => (
              <button
                type="button"
                key={hours}
                onClick={() => setDurationHours(hours)}
                className={`h-10 rounded-xl text-xs font-bold transition-all ${
                  durationHours === hours
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {hours} {hours === 1 ? 'ساعة' : 'ساعات'}
              </button>
            ))}
          </div>
        </div>

        {/* 8. Submit button matching Screenshot 4 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>🚀 نشر المزاد</span>
          </button>
        </div>
      </form>
    </div>
  );
};
