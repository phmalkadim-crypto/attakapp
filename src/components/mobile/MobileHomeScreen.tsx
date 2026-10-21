import React, { useState, useMemo } from 'react';
import { Auction, Category, User } from '../../types';
import { PullToRefresh } from './PullToRefresh';
import { Bell, Moon, Sun, Search, MapPin, Eye, Trophy, Sparkles } from 'lucide-react';

interface MobileHomeScreenProps {
  categories: Category[];
  auctions: Auction[];
  currentUser: User;
  unreadCount?: number;
  onOpenNotifications: () => void;
  onEnterAuction: (auction: Auction) => void;
  onRefresh: () => Promise<void> | void;
  onAddNewAuction: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({
  categories,
  auctions,
  currentUser,
  unreadCount = 0,
  onOpenNotifications,
  onEnterAuction,
  onRefresh,
  onAddNewAuction,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatIQD = (val: number) => new Intl.NumberFormat('ar-IQ').format(val) + ' د.ع';

  const filteredAuctions = useMemo(() => {
    return auctions.filter((a) => {
      const matchCat = selectedCatId === 'all' || a.categoryId === selectedCatId;
      const matchQuery =
        !searchQuery ||
        a.title.includes(searchQuery) ||
        a.governorate.includes(searchQuery) ||
        a.categoryName.includes(searchQuery);
      return matchCat && matchQuery;
    });
  }, [auctions, selectedCatId, searchQuery]);

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-hidden transition-colors ${
        isDarkMode ? 'bg-[#0B1612]' : 'bg-[#F8FAFC]'
      }`}
    >
      {/* 1. FIXED CURVED HEADER */}
      <header
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)',
        }}
        className={`shrink-0 z-30 text-white pb-4 px-4 shadow-lg relative transition-colors rounded-b-[32px] sm:rounded-b-[36px] ${
          isDarkMode
            ? 'bg-[#04150E] border-b border-emerald-950/70 shadow-emerald-950/50'
            : 'bg-[#062016] shadow-black/20'
        }`}
      >
        <div className="relative flex items-center justify-between pt-1 pb-1">
          {/* Left: Notification Bell */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenNotifications}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors relative cursor-pointer border border-white/10"
              aria-label="الإشعارات"
            >
              <Bell className="w-4 h-4 text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#062016]" />
              )}
            </button>
          </div>

          {/* Center: Brand Name */}
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
            <span className="text-[11px] font-bold text-emerald-200/90 tracking-wide mt-0.5">
              منصة الخردة العراقية
            </span>
          </div>

          {/* Right: Dark Mode Toggle */}
          <div className="flex items-center">
            <button
              onClick={onToggleDarkMode}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
                isDarkMode
                  ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/40'
                  : 'bg-white/10 hover:bg-white/20 text-amber-300 border-white/15'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-amber-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Scrollable Body with PullToRefresh and pb-28 */}
      <PullToRefresh
        onRefresh={onRefresh}
        className={`flex-1 overflow-y-auto no-scrollbar pb-28 pt-4 px-4 space-y-4 transition-colors -mt-3.5 z-10 ${
          isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
        }`}
      >
        {/* Search Bar */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خردة: نحاس، قواطي، حديد، بطاريات..."
              className={`w-full h-11 pr-11 pl-4 rounded-2xl text-xs sm:text-sm font-medium border shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isDarkMode
                  ? 'bg-[#071F15] border-emerald-900/60 text-white placeholder-emerald-400/40'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <Search className="w-4 h-4 absolute right-3.5 text-amber-500 pointer-events-none" />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors cursor-pointer ${
              selectedCatId === 'all'
                ? 'bg-[#F5A524] text-slate-950 font-black shadow-xs'
                : isDarkMode
                ? 'bg-[#071F15] text-slate-300 hover:bg-[#0A2A1E]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🔥 الكل ({auctions.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCatId(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                selectedCatId === c.id
                  ? 'bg-[#F5A524] text-slate-950 font-black shadow-xs'
                  : isDarkMode
                  ? 'bg-[#071F15] text-slate-300 hover:bg-[#0A2A1E]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{c.icon}</span> <span>{c.nameAr}</span>
            </button>
          ))}
        </div>

        {/* Live Auctions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
              <span>🔨 المزادات الحية الجارية</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </h2>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              {filteredAuctions.length} مزاد نشط
            </span>
          </div>

          {filteredAuctions.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-3xl block mb-2">📦</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">لا توجد مزادات مطابقة حالياً</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onEnterAuction(auc)}
                  className={`rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#061F15] border-emerald-950/80 hover:border-emerald-800'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-44 w-full bg-slate-900">
                    <img
                      src={auc.images[0]}
                      alt={auc.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{auc.governorate} - {auc.area}</span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      ⚖️ {new Intl.NumberFormat('ar-IQ').format(auc.approxWeightKg)} كغم
                    </div>
                  </div>

                  <div className="p-3.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-relaxed">
                      {auc.title}
                    </h3>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-emerald-950/70 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">السعر الحالي للكيلو:</span>
                        <span className="text-sm font-black text-emerald-700 dark:text-amber-400">
                          {formatIQD(auc.currentPricePerKg)} / كغم
                        </span>
                      </div>

                      <button
                        className="px-3.5 py-1.5 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-xs shadow-xs active:scale-95 transition-transform"
                      >
                        زايد الآن 🔨
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
};
