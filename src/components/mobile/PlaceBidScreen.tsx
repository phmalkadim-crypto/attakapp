import React, { useState } from 'react';
import { Auction, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { store } from '../../services/store';

interface PlaceBidScreenProps {
  auction: Auction;
  currentUser: User;
  onBack: () => void;
  onBidSuccess: (updated: Auction) => void;
}

export const PlaceBidScreen: React.FC<PlaceBidScreenProps> = ({
  auction,
  currentUser,
  onBack,
  onBidSuccess,
}) => {
  const [bidPrice, setBidPrice] = useState<string>(
    String(auction.currentPricePerKg + 50)
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const img = auction.images?.[0] || '/src/assets/images/scrap_aluminum_cans_1792278298039.jpg';

  const handleConfirmBid = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const priceNum = Number(bidPrice);
    if (isNaN(priceNum) || priceNum <= auction.currentPricePerKg) {
      setError('⚠️ يجب أن تكون مزايدتك أعلى من أعلى سعر حالي.');
      return;
    }

    if (currentUser.id === auction.sellerId) {
      setError('⚠️ لا يستطيع البائع المزايدة على مزاده الخاص.');
      return;
    }

    const result = store.placeBid(auction.id, priceNum, currentUser);
    if (!result.success) {
      setError(result.message);
    } else if (result.auction) {
      setSuccess('✅ تمت المزايدة بنجاح! أنت الآن صاحب أعلى سعر.');
      setTimeout(() => {
        onBidSuccess(result.auction!);
      }, 1000);
    }
  };

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
          <h1 className="text-sm font-black text-slate-900">تقديم مزايدة</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-5 text-right">
        {/* Lot Card matching Screenshot 6 */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            <img src={img} alt={auction.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900">{auction.title}</h2>
            <span className="text-xs text-slate-500 block mt-1">أعلى سعر حالياً</span>
            <span className="text-base font-black text-emerald-700 tabular-nums">
              {formatIQD(auction.currentPricePerKg)} / كغم
            </span>
          </div>
        </div>

        {/* Input Form matching Screenshot 6 */}
        <form onSubmit={handleConfirmBid} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              سعر المزايدة الجديد
            </label>
            <div className="relative">
              <input
                type="number"
                step="25"
                min={auction.currentPricePerKg + 25}
                value={bidPrice}
                onChange={(e) => {
                  setBidPrice(e.target.value);
                  setError(null);
                }}
                className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 pl-16 text-base font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-right tabular-nums"
              />
              <span className="absolute left-3 top-3.5 text-xs text-slate-400 font-bold">
                د.ع/كغم
              </span>
            </div>
          </div>

          {/* Error Alert matching Screenshot 6 */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Confirm Button matching Screenshot 6 */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-emerald-800/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            تأكيد المزايدة
          </button>

          {/* Note matching Screenshot 6 */}
          <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed text-center">
            <p className="font-semibold text-slate-800 mb-0.5">✅ بعد المزايدة بنجاح:</p>
            <p>سيتم إشعارك فوراً عند وجود أي مزايدات جديدة من التجار الآخرين.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
