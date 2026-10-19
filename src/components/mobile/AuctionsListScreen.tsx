import React, { useState } from 'react';
import { Auction, Category } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { PullToRefresh } from './PullToRefresh';
import { IRAQI_GOVERNORATES } from '../../data/constants';
import { formatIQD, formatTimeRemaining } from '../../utils/formatters';
import { Search, MapPin, Clock, Filter, ChevronDown, Check, RefreshCw } from 'lucide-react';

interface AuctionsListScreenProps {
  auctions: Auction[];
  categories: Category[];
  initialCategoryId?: string | null;
  onEnterAuction: (auction: Auction) => void;
  onRefresh: () => Promise<void> | void;
}

export const AuctionsListScreen: React.FC<AuctionsListScreenProps> = ({
  auctions,
  categories,
  initialCategoryId = null,
  onEnterAuction,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [isManualSpinning, setIsManualSpinning] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(initialCategoryId);
  const [selectedGov, setSelectedGov] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [minQty, setMinQty] = useState<string>('');
  const [endingSoonOnly, setEndingSoonOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const activeCategories = categories.filter((c) => c.isActive);

  const filteredAuctions = auctions.filter((a) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        a.title.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.governorate.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCatId && a.categoryId !== selectedCatId) return false;
    if (selectedGov !== 'all' && a.governorate !== selectedGov) return false;
    if (selectedArea !== 'all' && a.area !== selectedArea) return false;
    if (minQty && a.approxWeightKg < Number(minQty)) return false;
    return true;
  });

  const handleManualRefresh = async () => {
    setIsManualSpinning(true);
    await Promise.resolve(onRefresh());
    setTimeout(() => setIsManualSpinning(false), 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] h-full overflow-hidden">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <MobileStatusBar darkTheme={false} />

        {/* Title */}
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-xs font-semibold"
          >
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>الفلاتر</span>
          </button>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-black text-slate-900">المزادات</h1>
            <button
              onClick={handleManualRefresh}
              className="p-1 rounded-full text-slate-400 hover:text-emerald-700 transition-colors"
              title="تحديث لحظي"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isManualSpinning ? 'animate-spin text-emerald-700' : ''}`}
              />
            </button>
          </div>
          <div className="w-8" />
        </div>

        {/* Search bar */}
        <div className="px-4 pb-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مزاد أو نوع خردة..."
              className="w-full h-10 bg-slate-100 rounded-xl px-4 pl-9 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-right"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Category Horizontal Pills with Real Photos */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCatId(null)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
              selectedCatId === null
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>♻️</span>
            <span>الكل</span>
          </button>
          {activeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 border ${
                selectedCatId === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-200"
                />
              ) : (
                <span className="text-xs">{cat.icon}</span>
              )}
              <span>{cat.nameAr}</span>
            </button>
          ))}
        </div>
      </div>

      <PullToRefresh
        onRefresh={onRefresh}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        pullText="اسحب لتحديث قائمة المزادات..."
        refreshingText="جاري تحديث قائمة المزادات..."
      >
        {/* Collapsible Filter Box Matching Screenshot 3 */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3 text-right">
            {/* Governorate */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">المحافظة</label>
              <select
                value={selectedGov}
                onChange={(e) => {
                  setSelectedGov(e.target.value);
                  setSelectedArea('all');
                }}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="all">اختر المحافظة (الكل)</option>
                {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            {selectedGov !== 'all' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">المنطقة</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="all">اختر المنطقة (الكل)</option>
                  {(IRAQI_GOVERNORATES[selectedGov] || []).map((ar) => (
                    <option key={ar} value={ar}>
                      {ar}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">الكمية (كغم)</label>
              <input
                type="number"
                value={minQty}
                onChange={(e) => setMinQty(e.target.value)}
                placeholder="الحد الأدنى للوزن"
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-800"
              />
            </div>

            {/* Toggle Ending Soon */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-700">المزادات التي تنتهي قريباً</span>
              <button
                type="button"
                onClick={() => setEndingSoonOnly(!endingSoonOnly)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  endingSoonOnly ? 'bg-emerald-700' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    endingSoonOnly ? '-translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full h-11 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-800/20 active:scale-95 transition-all"
            >
              تطبيق الفلاتر
            </button>
          </div>
        )}

        {/* Auctions List */}
        <div className="space-y-3">
          {filteredAuctions.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-slate-400 text-xs">
              لا توجد مزادات مطابقة للفلاتر المحددة.
            </div>
          ) : (
            filteredAuctions.map((auction) => {
              const time = formatTimeRemaining(auction.endsAt);
              const img =
                auction.images?.[0] || '/src/assets/images/scrap_copper_wire_1792278298829.jpg';

              return (
                <div
                  key={auction.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs flex items-center gap-3.5 text-right transition-all hover:border-slate-300"
                >
                  {/* Left: Image with Red Timer */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={img} alt={auction.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-1.5 right-1 left-1 bg-red-600/95 text-white text-[9px] font-bold py-0.5 px-1.5 rounded-full flex items-center justify-center gap-1 tabular-nums">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{time.formatted}</span>
                    </div>
                  </div>

                  {/* Right Details */}
                  <div className="flex-1 flex flex-col justify-between h-24 py-0.5">
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                        {auction.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {auction.approxWeightKg} كغم تقريباً
                      </div>
                      <div className="text-sm font-black text-emerald-700 tabular-nums mt-0.5">
                        {formatIQD(auction.currentPricePerKg)} / كغم
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {auction.governorate} - {auction.area}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => onEnterAuction(auction)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer"
                      >
                        دخول المزاد
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PullToRefresh>
    </div>
  );
};
