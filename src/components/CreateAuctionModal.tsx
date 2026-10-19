import React, { useState } from 'react';
import { Category, Auction, User } from '../types';
import { IRAQI_GOVERNORATES, SCRAP_IMAGES } from '../data/constants';
import { formatIQD } from '../utils/formatters';
import { X, UploadCloud, Info, Check, Plus, AlertCircle } from 'lucide-react';
import { store } from '../services/store';

interface CreateAuctionModalProps {
  currentUser: User;
  categories: Category[];
  onClose: () => void;
  onAuctionCreated: (auction: Auction) => void;
}

export const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  currentUser,
  categories,
  onClose,
  onAuctionCreated,
}) => {
  const activeCats = categories.filter((c) => c.isActive);

  const [selectedCatId, setSelectedCatId] = useState<string>(activeCats[0]?.id || 'cat-cans');
  const [title, setTitle] = useState('');
  const [approxWeight, setApproxWeight] = useState<number>(50);
  const [governorate, setGovernorate] = useState<string>(currentUser.governorate || 'الديوانية');
  const [area, setArea] = useState<string>(
    currentUser.area || IRAQI_GOVERNORATES[currentUser.governorate || 'الديوانية']?.[0] || 'مركز الديوانية'
  );
  const [startPricePerKg, setStartPricePerKg] = useState<number>(1500);
  const [durationHours, setDurationHours] = useState<number>(6);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(SCRAP_IMAGES.cans);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [showCustomImageInput, setShowCustomImageInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available sample photos for Iraqi scrap lots
  const presetPhotos = [
    { label: 'قواطي ألمنيوم مكبوسة', url: SCRAP_IMAGES.cans },
    { label: 'نحاس أحمر وأسلاك', url: SCRAP_IMAGES.copper },
    { label: 'حديد تسليح وسكراب', url: SCRAP_IMAGES.iron },
    { label: 'بطاريات سيارات تالفة', url: SCRAP_IMAGES.batteries },
    { label: 'ساحة خردة متكاملة', url: SCRAP_IMAGES.hero },
  ];

  const handleGovernorateChange = (gov: string) => {
    setGovernorate(gov);
    const areas = IRAQI_GOVERNORATES[gov] || [];
    setArea(areas[0] || 'المركز');
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCatId(catId);
    const cat = activeCats.find((c) => c.id === catId);
    if (cat) {
      if (cat.slug === 'cans') setSelectedImage(SCRAP_IMAGES.cans);
      else if (cat.slug === 'copper') setSelectedImage(SCRAP_IMAGES.copper);
      else if (cat.slug === 'iron') setSelectedImage(SCRAP_IMAGES.iron);
      else if (cat.slug === 'batteries') setSelectedImage(SCRAP_IMAGES.batteries);
      else setSelectedImage(SCRAP_IMAGES.hero);

      if (!title) {
        setTitle(`${cat.nameAr} كمية ممتازة للبيع`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('يرجى إدخال عنوان للمزاد.');
      return;
    }

    if (approxWeight <= 0) {
      setError('يرجى إدخال كمية صحيحة بالكيلوغرام.');
      return;
    }

    if (startPricePerKg <= 0) {
      setError('يرجى تحديد سعر بداية عادل للكيلوغرام.');
      return;
    }

    const cat = activeCats.find((c) => c.id === selectedCatId);
    const catName = cat?.nameAr || 'خردة';

    const now = new Date();
    const endsAt = new Date(now.getTime() + durationHours * 3600 * 1000).toISOString();
    const finalImage = showCustomImageInput && customImageUrl ? customImageUrl : selectedImage;

    const newAuction: Auction = {
      id: `auc-${Date.now()}`,
      title: title.trim(),
      categoryId: selectedCatId,
      categoryName: catName,
      images: [finalImage],
      approxWeightKg: approxWeight,
      governorate,
      area,
      description: description.trim() || undefined,
      startPricePerKg,
      currentPricePerKg: startPricePerKg,
      totalEstimatedValue: approxWeight * startPricePerKg,
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

    // Notification
    store.addNotification({
      title: 'تم نشر مزادك بنجاح! 🚀',
      message: `بدأ مزاد (${newAuction.title}) لمدة ${durationHours} ساعات. سيتلقى التجار إشعاراً للمزايدة فوراً.`,
      type: 'bid',
      auctionId: newAuction.id,
      userId: currentUser.id,
    });

    onAuctionCreated(newAuction);
  };

  const calculatedStartingTotal = approxWeight * startPricePerKg;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto shadow-2xl text-right">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">➕</span>
            <div>
              <h2 className="text-base font-bold text-white">أضف خردتك للمزاد</h2>
              <span className="text-xs text-amber-400">منصة عَتّاك للمزادات العراقية</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Category Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              1. نوع الخردة (اختر القسم):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activeCats.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
                    selectedCatId === cat.id
                      ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                      : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <span className="text-xs block">{cat.nameAr}</span>
                    <span className="text-[10px] text-slate-400">
                      يبدأ من {formatIQD(cat.minStartPrice)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              2. عنوان المزاد:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: 50 كغم قواطي ألمنيوم مشروبات غازية مكبوسة"
              className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* 3. Weight with Mandatory Note */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                3. الكمية التقريبية (كغم):
              </label>
              <span className="text-[11px] text-amber-400 font-mono font-bold">
                {approxWeight} كيلوغرام
              </span>
            </div>
            <input
              type="number"
              min="1"
              required
              value={approxWeight}
              onChange={(e) => setApproxWeight(Number(e.target.value))}
              className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-sm font-bold tabular-nums focus:outline-none focus:border-amber-400"
              placeholder="50"
            />
            <div className="mt-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-750 text-[11px] text-slate-300 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>تنويه:</strong> الكمية تقريبية ويتم الاتفاق على الوزن النهائي بقبان معتمد بين
                الطرفين عند الاستلام المباشر.
              </span>
            </div>
          </div>

          {/* 4. Location: Iraqi Governorate & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                4. المحافظة:
              </label>
              <select
                value={governorate}
                onChange={(e) => handleGovernorateChange(e.target.value)}
                className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                المنطقة / القضاء:
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                {(IRAQI_GOVERNORATES[governorate] || ['المركز']).map((ar) => (
                  <option key={ar} value={ar}>
                    {ar}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Start Price & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                5. سعر البداية للكيلوغرام (د.ع / كغم):
              </label>
              <input
                type="number"
                min="50"
                step="50"
                required
                value={startPricePerKg}
                onChange={(e) => setStartPricePerKg(Number(e.target.value))}
                className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-sm font-bold tabular-nums focus:outline-none focus:border-amber-400"
                placeholder="1500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                6. مدة المزاد:
              </label>
              <div className="grid grid-cols-5 gap-1">
                {[1, 3, 6, 12, 24].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setDurationHours(hours)}
                    className={`h-11 rounded-xl text-xs font-bold transition-all ${
                      durationHours === hours
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-850 border border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {hours}س
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Estimated Start Total */}
          <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">إجمالي سعر البداية التقريبي ({approxWeight} كغم):</span>
            <span className="font-black text-amber-400 text-sm tabular-nums">
              {formatIQD(calculatedStartingTotal)}
            </span>
          </div>

          {/* 7. Photos */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              7. صور الخردة:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
              {presetPhotos.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setSelectedImage(p.url);
                    setShowCustomImageInput(false);
                  }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === p.url && !showCustomImageInput
                      ? 'border-amber-500 scale-95 shadow-md'
                      : 'border-slate-700 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  {selectedImage === p.url && !showCustomImageInput && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowCustomImageInput(!showCustomImageInput)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
            >
              <span>+ إضافة رابط صورة مخصصة</span>
            </button>

            {showCustomImageInput && (
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/scrap.jpg"
                className="w-full h-10 mt-2 bg-slate-850 border border-slate-700 rounded-xl px-3 text-white text-xs font-mono"
              />
            )}
          </div>

          {/* 8. Description (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              8. وصف الخردة وحالتها (اختياري):
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: الخردة مفرزة وموضوعة في أكياس، بدون شوائب، متوفر قبان في الموقع..."
              className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>🚀 نشر المزاد الآن</span>
          </button>
        </form>
      </div>
    </div>
  );
};
