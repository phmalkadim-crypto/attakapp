import React, { useState, useEffect } from 'react';
import { Auction } from '../types';
import { formatIQD, formatTimeRemaining } from '../utils/formatters';
import { MapPin, Scale, Clock, Gavel, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
  onEnterAuction: (auction: Auction) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onEnterAuction }) => {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeRemaining(auction.endsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeRemaining(auction.endsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endsAt]);

  const displayImage = auction.images?.[0] || '/src/assets/images/hero_scrap_yard_1792278297950.jpg';

  const getStatusBadge = () => {
    if (auction.status === 'WAITING_FOR_COMMISSION') {
      return (
        <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>بانتظار دفع العمولة</span>
        </span>
      );
    }
    if (auction.status === 'COMMISSION_PAID' || auction.status === 'COMPLETED') {
      return (
        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>صفقة مكتملة</span>
        </span>
      );
    }
    if (timeLeft.isExpired || auction.status === 'ENDED') {
      return (
        <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
          منتهي
        </span>
      );
    }
    return (
      <span className="text-[11px] font-bold text-amber-400 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1.5 tabular-nums">
        <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>{timeLeft.formatted}</span>
      </span>
    );
  };

  return (
    <div className="group bg-slate-850/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-black/20">
      <div>
        {/* Card Image Slot with Scrim and Time overlay */}
        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
          <img
            src={displayImage}
            alt={auction.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback container image
              (e.currentTarget as HTMLImageElement).src =
                '/src/assets/images/hero_scrap_yard_1792278297950.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Category Chip */}
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold text-white bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 shadow">
              {auction.categoryName}
            </span>
          </div>

          {/* Time Remaining / Status */}
          <div className="absolute top-3 left-3">{getStatusBadge()}</div>

          {/* Quantity banner */}
          <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">{auction.approxWeightKg} كغم تقريباً</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>
                {auction.governorate} · {auction.area}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-amber-400 transition-colors mb-2">
            {auction.title}
          </h3>

          {/* Pricing Info Box */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">💰 أعلى سعر حالياً / كغم:</span>
              <span className="font-black text-amber-400 text-sm tabular-nums">
                {formatIQD(auction.currentPricePerKg)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">القيمة التقريبية الإجمالية:</span>
              <span className="font-bold text-slate-200 tabular-nums">
                {formatIQD(auction.totalEstimatedValue)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>عدد المزايدات:</span>
              <span className="font-mono text-slate-300">{auction.bidsCount} مزايدة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onEnterAuction(auction)}
          className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Gavel className="w-4 h-4 stroke-[2.5]" />
          <span>🔨 دخول المزاد</span>
        </button>
      </div>
    </div>
  );
};
