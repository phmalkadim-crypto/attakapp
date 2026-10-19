import React, { useState, useMemo } from 'react';
import { Auction, Category, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { PullToRefresh } from './PullToRefresh';
import { formatIQD, formatTimeRemaining } from '../../utils/formatters';
import { IRAQI_GOVERNORATES } from '../../data/constants';
import {
  Search,
  Bell,
  MapPin,
  Clock,
  RefreshCw,
  X,
  Check,
  Plus,
  Moon,
  Sun,
} from 'lucide-react';

interface MobileHomeScreenProps {
  categories: Category[];
  auctions: Auction[];
  currentUser: User;
  unreadCount: number;
  onOpenNotifications: () => void;
  onEnterAuction: (auction: Auction) => void;
  onSelectCategory?: (categoryId: string) => void;
  onSearch?: (query: string) => void;
  onRefresh: () => Promise<void> | void;
  onAddNewAuction?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({
  categories,
  auctions,
  currentUser,
  unreadCount,
  onOpenNotifications,
  onEnterAuction,
  onRefresh,
  onAddNewAuction,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [isManualSpinning, setIsManualSpinning] = useState(false);

  const activeCategories = useMemo(
    () => categories.filter((c) => c.isActive),
    [categories]
  );
  const activeAuctions = useMemo(
    () => auctions.filter((a) => a.status === 'ACTIVE'),
    [auctions]
  );

  // List of governorates in an intuitive order
  const governoratesList = useMemo(() => {
    const defaultOrder = [
      'بغداد',
      'البصرة',
      'النجف',
      'كربلاء',
      'أربيل',
      'الديوانية',
      'بابل',
      'الموصل (نينوى)',
      'ذي قار',
      'ميسان',
      'كركوك',
      'ديالى',
      'صلاح الدين',
      'الأنبار',
      'السليمانية',
      'المثنى',
      'واسط',
      'دهوك',
    ];
    const available = Object.keys(IRAQI_GOVERNORATES);
    const combined = Array.from(new Set([...defaultOrder, ...available]));
    return combined;
  }, []);

  // Compute active auction count per governorate
  const governorateAuctionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of activeAuctions) {
      if (a.governorate) {
        counts[a.governorate] = (counts[a.governorate] || 0) + 1;
      }
    }
    return counts;
  }, [activeAuctions]);

  // Compute active auction count per category
  const categoryAuctionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of activeAuctions) {
      if (a.categoryId) {
        counts[a.categoryId] = (counts[a.categoryId] || 0) + 1;
      }
    }
    return counts;
  }, [activeAuctions]);

  // Combined instant in-place filtering
  const filteredAuctions = useMemo(() => {
    return activeAuctions.filter((auction) => {
      // 1. Category Filter
      if (selectedCategoryId && auction.categoryId !== selectedCategoryId) {
        return false;
      }

      // 2. Governorate Filter
      if (selectedGovernorate && auction.governorate !== selectedGovernorate) {
        return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = auction.title.toLowerCase().includes(q);
        const descMatch = (auction.description || '').toLowerCase().includes(q);
        const catMatch = (auction.categoryName || '').toLowerCase().includes(q);
        const govMatch = (auction.governorate || '').toLowerCase().includes(q);
        const areaMatch = (auction.area || '').toLowerCase().includes(q);
        const sellerMatch = (auction.sellerName || '').toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !catMatch && !govMatch && !areaMatch && !sellerMatch) {
          return false;
        }
      }

      return true;
    });
  }, [activeAuctions, selectedCategoryId, selectedGovernorate, searchQuery]);

  const handleManualRefresh = async () => {
    setIsManualSpinning(true);
    await Promise.resolve(onRefresh());
    setTimeout(() => setIsManualSpinning(false), 500);
  };

  const handleCategoryClick = (catId: string) => {
    if (selectedCategoryId === catId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(catId);
    }
  };

  const handleGovernorateClick = (gov: string | null) => {
    if (selectedGovernorate === gov) {
      setSelectedGovernorate(null);
    } else {
      setSelectedGovernorate(gov);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setSelectedGovernorate(null);
    setSearchQuery('');
  };

  const selectedCategoryObj = activeCategories.find((c) => c.id === selectedCategoryId);

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-hidden transition-colors ${
        isDarkMode ? 'bg-[#0B1612]' : 'bg-white'
      }`}
    >
      {/* 1. FIXED CURVED HEADER: يبقى ثابت في الأعلى عند الصعود والنزول، ومقوس من الأسفل */}
      <header
        className={`shrink-0 z-30 text-white pt-1 pb-4 px-4 shadow-lg relative transition-colors rounded-b-[32px] sm:rounded-b-[36px] ${
          isDarkMode
            ? 'bg-[#04150E] border-b border-emerald-950/70 shadow-emerald-950/50'
            : 'bg-[#062016] shadow-black/20'
        }`}
      >
        <MobileStatusBar darkTheme={true} />

        {/* Top Header Row matching the user's screenshot layout */}
        <div className="relative flex items-center justify-between pt-1 pb-1">
          {/* Left: Notification Bell with Red Dot */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenNotifications}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors relative cursor-pointer border border-white/10"
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell className="w-4 h-4 text-white" />
              {/* Notification Red Dot indicator matching the uploaded image */}
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#062016]" />
            </button>
          </div>

          {/* Center: Brand Name "عَتّاك" + "Attak" + "منصة الخردة العراقية" underneath */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1
              className="text-3xl font-black text-white leading-tight tracking-tight select-none"
              style={{
                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.75))',
              }}
            >
              عَتّاك
            </h1>
            <span className="text-xs font-black tracking-wide text-white/95 font-sans -mt-0.5">
              Attak
            </span>
            {/* منصة الخردة العراقية اسفل الاسم كما طلب المستخدم */}
            <span className="text-[11px] font-bold text-emerald-200/90 tracking-wide mt-0.5">
              منصة الخردة العراقية
            </span>
          </div>

          {/* Right: Dark Mode toggle button */}
          <div className="flex items-center">
            {/* Dark Mode Toggle Button in the exact position of the red circle */}
            <button
              onClick={onToggleDarkMode}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
                isDarkMode
                  ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/40'
                  : 'bg-white/10 hover:bg-white/20 text-amber-300 border-white/15'
              }`}
              title={isDarkMode ? 'الوضع النهاري (الفاتح)' : 'الوضع المظلم (الداكن)'}
              aria-label={isDarkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع المظلم'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-amber-300 animate-in zoom-in duration-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Scrollable White Body: ينزل من الهايدر المقوس ويسحب للتحديث ويتحرك بسلاسة عند الصعود والنزول */}
      <PullToRefresh
        onRefresh={onRefresh}
        className={`flex-1 overflow-y-auto no-scrollbar pb-8 pt-4 px-4 space-y-4 transition-colors -mt-3.5 z-10 ${
          isDarkMode
            ? 'bg-[#0B1612] text-slate-100'
            : 'bg-white text-slate-900'
        }`}
      >
        {/* Search Bar: Exactly below the curved Header */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مزاد أو نوع خردة..."
              className={`w-full h-11 text-xs font-semibold rounded-2xl pr-10 pl-9 shadow-2xs text-right transition-all focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-[#12241D] text-white placeholder:text-slate-400 border border-emerald-900/60 focus:ring-emerald-500 focus:border-emerald-500'
                  : 'bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200/90 focus:ring-emerald-600 focus:border-emerald-600'
              }`}
            />
            {/* Search Icon on the RIGHT matching screenshot */}
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />

            {/* Clear Button on the LEFT */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`w-6 h-6 rounded-full flex items-center justify-center absolute left-2.5 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Section 1: أقسام الخردة (With Real Photos & In-Place Selection) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              <h2
                className={`text-sm font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                أقسام الخردة
              </h2>
            </div>
          </div>

          {/* 6 Category Photographic Cards Grid matching Real Scrap Photos */}
          <div className="grid grid-cols-3 gap-2.5">
            {activeCategories.slice(0, 6).map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const count = categoryAuctionCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`relative rounded-2xl p-2 flex flex-col items-center justify-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-emerald-950/60 border-2 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                        : 'bg-emerald-50/90 border-2 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                      : isDarkMode
                      ? 'bg-[#12241D] hover:bg-[#162e24] border border-emerald-900/50'
                      : 'bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Selected Checkmark Badge */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -left-1.5 z-10 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-in zoom-in">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Real Photographic Scrap Image */}
                  <div
                    className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-1.5 border shadow-2xs ${
                      isDarkMode ? 'bg-slate-800 border-emerald-900/40' : 'bg-slate-100 border-slate-100'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.nameAr}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/src/assets/images/scrap_aluminum_cans_1792278298039.jpg';
                      }}
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                    {/* Auction count badge if > 0 */}
                    {count > 0 && (
                      <div className="absolute bottom-1 left-1 bg-emerald-700/90 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full tabular-nums shadow-xs">
                        {count} {count === 1 ? 'مزاد' : 'مزادات'}
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-xs font-black transition-colors block ${
                      isSelected
                        ? isDarkMode
                          ? 'text-emerald-300'
                          : 'text-emerald-800'
                        : isDarkMode
                        ? 'text-white group-hover:text-emerald-400'
                        : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {cat.nameAr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: المحافظات (Directly underneath the Categories) */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <h2
                  className={`text-sm font-black transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  المحافظات
                </h2>
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Governorates Chips with Auction Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none no-scrollbar -mx-4 px-4">
            {/* All Governorates Pill */}
            <button
              onClick={() => handleGovernorateClick(null)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                selectedGovernorate === null
                  ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-600/30'
                  : isDarkMode
                  ? 'bg-[#12241D] text-slate-300 border border-emerald-900/60 hover:border-emerald-700'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <span>🇮🇶</span>
              <span>كل المحافظات</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-semibold ${
                  selectedGovernorate === null
                    ? 'bg-emerald-800 text-white'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {activeAuctions.length}
              </span>
            </button>

            {/* Individual Iraqi Governorates */}
            {governoratesList.map((gov) => {
              const isSelected = selectedGovernorate === gov;
              const count = governorateAuctionCounts[gov] || 0;

              return (
                <button
                  key={gov}
                  onClick={() => handleGovernorateClick(gov)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-600/30'
                      : isDarkMode
                      ? 'bg-[#12241D] text-slate-300 border border-emerald-900/60 hover:border-emerald-700'
                      : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <span>{gov}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : isDarkMode
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>



        {/* Section 4: المزادات المباشرة (Matching Category + Governorate + Search) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              <h2
                className={`text-sm font-black flex items-center gap-1.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                <span>المزادات النشطة</span>
                <span>🔥</span>
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleManualRefresh}
                className={`p-1 rounded-full transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                    : 'text-slate-400 hover:text-emerald-700 hover:bg-slate-100'
                }`}
                title="تحديث لحظي للمزادات"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isManualSpinning ? 'animate-spin text-emerald-400' : ''}`}
                />
              </button>
              <span
                className={`text-[11px] font-mono font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {filteredAuctions.length} {filteredAuctions.length === 1 ? 'مزاد' : 'مزادات'}
              </span>
            </div>
          </div>

          {/* If there are matching auctions: Render List */}
          {filteredAuctions.length > 0 ? (
            <div className="space-y-3">
              {filteredAuctions.map((auction) => {
                const time = formatTimeRemaining(auction.endsAt);
                const img =
                  auction.images?.[0] || '/src/assets/images/scrap_aluminum_cans_1792278298039.jpg';

                return (
                  <div
                    key={auction.id}
                    className={`rounded-2xl p-3 shadow-xs flex items-center gap-3.5 text-right transition-all border ${
                      isDarkMode
                        ? 'bg-[#12241D] border-emerald-900/60 hover:border-emerald-600/60 shadow-md'
                        : 'bg-white border-slate-200/90 hover:border-emerald-600/40'
                    }`}
                  >
                    {/* Left: Square Photo with Red Countdown Timer Pill */}
                    <div
                      className={`relative w-24 h-24 rounded-xl overflow-hidden shrink-0 ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            '/src/assets/images/hero_scrap_yard_1792278297950.jpg';
                        }}
                      />
                      {/* Red Countdown Timer Pill */}
                      <div className="absolute bottom-1.5 right-1 left-1 bg-red-600/95 text-white text-[9px] font-bold py-0.5 px-1.5 rounded-full flex items-center justify-center gap-1 tabular-nums">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{time.formatted}</span>
                      </div>
                    </div>

                    {/* Right: Details & Action */}
                    <div className="flex-1 flex flex-col justify-between h-24 py-0.5">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            className={`text-xs sm:text-sm font-black line-clamp-1 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {auction.title}
                          </h3>
                        </div>

                        <div
                          className={`flex items-center gap-1 text-[11px] mt-0.5 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              isDarkMode ? 'text-emerald-300' : 'text-slate-700'
                            }`}
                          >
                            {auction.categoryName}
                          </span>
                          <span>•</span>
                          <span>{auction.approxWeightKg} كغم تقريباً</span>
                        </div>

                        <div
                          className={`text-sm font-black tabular-nums mt-0.5 ${
                            isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                          }`}
                        >
                          {formatIQD(auction.currentPricePerKg)} / كغم
                        </div>

                        <div
                          className={`flex items-center justify-between text-[10px] mt-0.5 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate font-semibold">
                              {auction.governorate} {auction.area ? `- ${auction.area}` : ''}
                            </span>
                          </div>
                          {auction.bidsCount > 0 && (
                            <span
                              className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                                isDarkMode
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              {auction.bidsCount} مزايدة
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 mt-1">
                        <button
                          onClick={() => onEnterAuction(auction)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-black text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer"
                        >
                          دخول المزاد
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State when no auctions match the selected filters */
            <div
              className={`rounded-2xl border border-dashed p-6 text-center shadow-xs ${
                isDarkMode
                  ? 'bg-[#12241D] border-emerald-900/60 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  isDarkMode
                    ? 'bg-amber-400/10 text-amber-300'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                <Search className="w-6 h-6" />
              </div>

              <h3
                className={`text-sm font-black mb-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                لا توجد مزادات نشطة حالياً
              </h3>

              <p
                className={`text-xs max-w-xs mx-auto mb-4 leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {selectedCategoryObj && selectedGovernorate
                  ? `لا يوجد مزاد نشط لقسم "${selectedCategoryObj.nameAr}" في محافظة "${selectedGovernorate}".`
                  : selectedCategoryObj
                  ? `لا يوجد مزاد نشط حالياً لقسم "${selectedCategoryObj.nameAr}".`
                  : selectedGovernorate
                  ? `لا توجد مزادات نشطة حالياً في محافظة "${selectedGovernorate}".`
                  : searchQuery
                  ? `لم يتم العثور على نتائج للبحث "${searchQuery}".`
                  : 'لا توجد مزادات نشطة في الوقت الحالي.'}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={clearAllFilters}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  عرض جميع المزادات
                </button>

                {onAddNewAuction && (
                  <button
                    onClick={onAddNewAuction}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>أضف أول مزاد هنا</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
};
