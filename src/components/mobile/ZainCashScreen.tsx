import React, { useState } from 'react';
import { Auction, User, PaymentOrder } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight, Loader2, Info, ShieldCheck } from 'lucide-react';
import { store } from '../../services/store';

interface ZainCashScreenProps {
  auction: Auction;
  currentUser: User;
  onBack: () => void;
  onPaymentSuccess: (updated: Auction) => void;
}

export const ZainCashScreen: React.FC<ZainCashScreenProps> = ({
  auction,
  currentUser,
  onBack,
  onPaymentSuccess,
}) => {
  const [order] = useState<PaymentOrder>(() =>
    store.createPaymentOrder(auction.id, currentUser)
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAuctionValue = auction.totalWinningAmount || auction.totalEstimatedValue;
  const directSellerAmount = totalAuctionValue - auction.commissionSeller;

  const handlePay = async () => {
    setIsProcessing(true);
    const result = await store.verifyZainCashPayment(order.id);
    setIsProcessing(false);
    if (result.success && result.auction) {
      onPaymentSuccess(result.auction);
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
          <h1 className="text-sm font-black text-slate-900">الدفع عبر ZainCash</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-4 text-right">
        {/* ZainCash Official Style Logo & Branding Matching Screenshot 8 */}
        <div className="bg-[#1C1F2E] rounded-2xl p-4 text-center text-white shadow-xs">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full border-2 border-emerald-400 flex items-center justify-center text-xs font-black text-emerald-400">
              ZC
            </div>
            <span className="text-lg font-black tracking-tight">zain cash</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Order Reference: {order.id}
          </span>
        </div>

        {/* Payment Details Card Matching Screenshot 8 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-2">
            تفاصيل الدفع
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">المبلغ المطلوب دفعه:</span>
            <div className="text-left">
              <span className="text-lg font-black text-emerald-700 tabular-nums">
                {formatIQD(auction.totalCommission)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                إلى عَتّاك (عمولة المنصة)
              </span>
            </div>
          </div>
        </div>

        {/* Blue Callout Box Matching Screenshot 8 */}
        <div className="bg-[#EBF3FC] rounded-2xl p-4 border border-[#BFDBFE] space-y-2 text-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-black text-[#1E40AF]">
            <Info className="w-4 h-4 shrink-0" />
            <span>مهم جداً</span>
          </div>

          <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-700">
            <li>• عَتّاك لا تستلم قيمة الخردة نفسها.</li>
            <li>
              • المبلغ الذي يدفعه التاجر للبائع مباشرة:{' '}
              <strong className="text-slate-900">{formatIQD(directSellerAmount)}</strong>
            </li>
            <li>• قيمة المزاد: {formatIQD(totalAuctionValue)}</li>
            <li>• عمولة عَتّاك: {formatIQD(auction.totalCommission)}</li>
          </ul>
        </div>

        {/* Action Button & Backend Webhook Note Matching Screenshot 8 */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-75 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري معالجة الدفع عبر زين كاش...</span>
              </>
            ) : (
              <span>متابعة الدفع</span>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center font-mono">
            سيتم التحقق من الدفع عبر API / Webhook من ZainCash.
          </p>
        </div>
      </div>
    </div>
  );
};
