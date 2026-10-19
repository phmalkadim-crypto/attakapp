import React from 'react';
import { Auction } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight, Trophy, Lock } from 'lucide-react';

interface AuctionEndedScreenProps {
  auction: Auction;
  onBack: () => void;
  onPayCommission: () => void;
}

export const AuctionEndedScreen: React.FC<AuctionEndedScreenProps> = ({
  auction,
  onBack,
  onPayCommission,
}) => {
  const img = auction.images?.[0] || '/src/assets/images/scrap_aluminum_cans_1792278298039.jpg';
  const totalAuctionValue = auction.totalWinningAmount || auction.totalEstimatedValue;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-4 select-none">
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
          <h1 className="text-sm font-black text-slate-900">انتهى المزاد</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-4 text-center">
        {/* Celebration Trophy & Badge Matching Screenshot 7 */}
        <div className="pt-2 pb-1">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <Trophy className="w-9 h-9 stroke-[2]" />
          </div>

          <div className="inline-block px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-xs mb-2">
            الفائز
          </div>

          <h2 className="text-lg font-black text-slate-900">
            مبروك! أنت الفائز بالمزاد 🎉
          </h2>
        </div>

        {/* Lot Card Matching Screenshot 7 */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-3 text-right">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            <img src={img} alt={auction.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900">{auction.title}</h3>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {auction.approxWeightKg} كغم تقريباً
            </span>
            <div className="text-sm font-black text-slate-900 mt-1 tabular-nums">
              سعر المزاد: {formatIQD(totalAuctionValue)}
            </div>
          </div>
        </div>

        {/* Commission Box Matching Screenshot 7 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-right">
          <h4 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-1.5">
            العمولة
          </h4>

          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>عمولة التاجر:</span>
            <span className="font-bold tabular-nums">{formatIQD(auction.commissionTrader)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>عمولة البائع:</span>
            <span className="font-bold tabular-nums">{formatIQD(auction.commissionSeller)}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100 font-black text-slate-900">
            <span>إجمالي العمولة:</span>
            <span className="text-sm text-emerald-700 tabular-nums">
              {formatIQD(auction.totalCommission)}
            </span>
          </div>
        </div>

        {/* Instruction Note */}
        <p className="text-xs text-amber-700 font-semibold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          يجب دفع العمولة أولاً لإظهار معلومات البائع.
        </p>

        {/* Action Button Matching Screenshot 7 */}
        <button
          onClick={onPayCommission}
          className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>ادفع {formatIQD(auction.totalCommission)}</span>
        </button>
      </div>
    </div>
  );
};
