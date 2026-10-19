import React, { useState, useEffect } from 'react';
import { Auction, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD, formatTimeRemaining, formatArabicDate } from '../../utils/formatters';
import { ChevronRight, Share2, Clock, MapPin, Scale, Gavel, CheckCircle2 } from 'lucide-react';

interface AuctionDetailsScreenProps {
  auction: Auction;
  currentUser: User;
  onBack: () => void;
  onOpenBid: () => void;
  onOpenEndedOrZainCash: () => void;
}

export const AuctionDetailsScreen: React.FC<AuctionDetailsScreenProps> = ({
  auction,
  currentUser,
  onBack,
  onOpenBid,
  onOpenEndedOrZainCash,
}) => {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeRemaining(auction.endsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeRemaining(auction.endsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endsAt]);

  const img = auction.images?.[0] || '/src/assets/images/scrap_aluminum_cans_1792278298039.jpg';
  const isEnded = timeLeft.isExpired || auction.status !== 'ACTIVE';

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-20 select-none">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <MobileStatusBar darkTheme={false} />
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-black text-slate-900">تفاصيل المزاد</h1>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: auction.title, url: window.location.href });
              }
            }}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 text-right">
        {/* Main Photo with Badges Matching Screenshot 5 */}
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
          <img src={img} alt={auction.title} className="w-full h-full object-cover" />

          {/* Top-Left: Green badge نشط */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                isEnded
                  ? 'bg-red-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {isEnded ? 'منتهي' : 'نشط'}
            </span>
          </div>

          {/* Bottom-Right: Green pill category */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 rounded-full bg-emerald-800/90 backdrop-blur-xs text-white text-xs font-bold shadow-sm">
              {auction.categoryName}
            </span>
          </div>
        </div>

        {/* Title & Info */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
          <h2 className="text-base font-black text-slate-900">{auction.title}</h2>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{auction.approxWeightKg} كغم تقريباً</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {auction.governorate} - {auction.area}
              </span>
            </div>
          </div>
        </div>

        {/* Big Red Countdown Timer Container Matching Screenshot 5 */}
        <div className="bg-white rounded-2xl p-3 border border-red-200 shadow-xs flex items-center justify-center gap-2 text-red-600">
          <Clock className="w-5 h-5 text-red-600 animate-pulse" />
          <span className="text-base font-black font-mono tracking-wider tabular-nums" dir="ltr">
            {timeLeft.formatted}
          </span>
        </div>

        {/* Pricing Card Matching Screenshot 5 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">أعلى مزايدة حالياً</span>
              <span className="text-xl font-black text-emerald-700 tabular-nums">
                {formatIQD(auction.currentPricePerKg)} / كغم
              </span>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block">ينتهي خلال:</span>
              <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                {timeLeft.formatted}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">القيمة التقريبية الإجمالية:</span>
            <span className="text-base font-black text-slate-900 tabular-nums">
              {formatIQD(auction.totalEstimatedValue)}
            </span>
          </div>
        </div>

        {/* Recent Bids Section Matching Screenshot 5 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-black text-slate-900">المزايدات الأخيرة</h3>

          <div className="space-y-2">
            {auction.bids.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-2">لا توجد مزايدات بعد</p>
            ) : (
              auction.bids.slice(0, 4).map((bid, index) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-700 tabular-nums">
                      {formatIQD(bid.pricePerKg)} / كغم
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-700 font-medium">
                      {bid.traderName} {bid.isVerifiedTrader && <span className="text-[10px]">🔵</span>}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {index === 0 ? 'قبل 5 دقائق' : index === 1 ? 'قبل 12 دقيقة' : 'قبل 20 دقيقة'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Button Matching Screenshot 5 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-white via-white to-transparent">
        {isEnded ? (
          <button
            onClick={onOpenEndedOrZainCash}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>🏆 عرض نتائج المزاد والفائز ودفع العمولة</span>
          </button>
        ) : (
          <button
            onClick={onOpenBid}
            className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Gavel className="w-4 h-4 stroke-[2.5]" />
            <span>🔨 زايد الآن</span>
          </button>
        )}
      </div>
    </div>
  );
};
