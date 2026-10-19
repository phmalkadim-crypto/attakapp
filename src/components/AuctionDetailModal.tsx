import React, { useState, useEffect } from 'react';
import { Auction, User } from '../types';
import { formatIQD, formatTimeRemaining, maskPhone, formatArabicDate } from '../utils/formatters';
import {
  X,
  Scale,
  MapPin,
  Clock,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Phone,
  MessageCircle,
  AlertTriangle,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Calendar,
} from 'lucide-react';
import { store } from '../services/store';

interface AuctionDetailModalProps {
  auction: Auction;
  currentUser: User;
  onClose: () => void;
  onBidSuccess: (updatedAuction: Auction) => void;
  onTriggerZainCash: (auction: Auction) => void;
  onOpenComplaint: (auction: Auction) => void;
  onOpenRating: (auction: Auction) => void;
}

export const AuctionDetailModal: React.FC<AuctionDetailModalProps> = ({
  auction: initialAuction,
  currentUser,
  onClose,
  onBidSuccess,
  onTriggerZainCash,
  onOpenComplaint,
  onOpenRating,
}) => {
  const [auction, setAuction] = useState<Auction>(initialAuction);
  const [bidPrice, setBidPrice] = useState<number>(() => initialAuction.currentPricePerKg + 50);
  const [bidError, setBidError] = useState<string | null>(null);
  const [bidSuccessMsg, setBidSuccessMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => formatTimeRemaining(auction.endsAt));
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Keep countdown updated
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = formatTimeRemaining(auction.endsAt);
      setTimeLeft(remaining);

      // Auto update status if expired during viewing
      if (remaining.isExpired && auction.status === 'ACTIVE') {
        const fresh = store.getAuctionById(auction.id);
        if (fresh) setAuction(fresh);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endsAt, auction.id, auction.status]);

  const isSeller = currentUser.id === auction.sellerId;
  const isWinner = currentUser.id === auction.winnerId;
  const isCommissionPaid = auction.status === 'COMMISSION_PAID' || auction.status === 'COMPLETED';
  const isWaitingCommission = auction.status === 'WAITING_FOR_COMMISSION';
  const isEnded = timeLeft.isExpired || auction.status !== 'ACTIVE';

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidError(null);
    setBidSuccessMsg(null);

    if (isSeller) {
      setBidError('⚠️ لا يستطيع البائع المزايدة على مزاده الخاص.');
      return;
    }

    if (bidPrice <= auction.currentPricePerKg) {
      setBidError(
        `⚠️ يجب أن تكون مزايدتك أعلى من أعلى سعر حالي (${formatIQD(auction.currentPricePerKg)}).`
      );
      return;
    }

    const result = store.placeBid(auction.id, bidPrice, currentUser);
    if (!result.success) {
      setBidError(result.message);
    } else if (result.auction) {
      setAuction(result.auction);
      setBidSuccessMsg(result.message);
      setBidPrice(result.auction.currentPricePerKg + 50);
      onBidSuccess(result.auction);
    }
  };

  const images = auction.images?.length > 0 ? auction.images : ['/src/assets/images/hero_scrap_yard_1792278297950.jpg'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto shadow-2xl text-right">
        {/* Sticky Header with Back & Title */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥫</span>
            <div>
              <h2 className="text-base font-bold text-white line-clamp-1">{auction.title}</h2>
              <span className="text-xs text-amber-400 font-medium">{auction.categoryName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Photos Carousel */}
          <div>
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={images[activeImageIdx]}
                alt={auction.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/src/assets/images/hero_scrap_yard_1792278297950.jpg';
                }}
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg">
                📍 {auction.governorate} · {auction.area}
              </div>

              {/* Status timer pill */}
              <div className="absolute top-3 left-3">
                {isEnded ? (
                  <span className="bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold px-3 py-1 rounded-lg">
                    المزاد منتهي
                  </span>
                ) : (
                  <span className="bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 tabular-nums">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>ينتهي خلال: {timeLeft.formatted}</span>
                  </span>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-amber-500 scale-95' : 'border-slate-700 opacity-60'
                    }`}
                  >
                    <img src={img} alt="صورة مصغرة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">⚖️ الكمية التقريبية</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {auction.approxWeightKg} كغم
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">سعر البداية / كغم</span>
              <span className="text-sm sm:text-base font-bold text-slate-300 tabular-nums">
                {formatIQD(auction.startPricePerKg)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-850 border border-amber-500/30 bg-amber-500/5">
              <span className="text-[11px] text-amber-400 font-semibold block mb-1">
                💰 أعلى مزايدة / كغم
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400 tabular-nums">
                {formatIQD(auction.currentPricePerKg)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">القيمة التقريبية</span>
              <span className="text-sm sm:text-base font-bold text-white tabular-nums">
                {formatIQD(auction.totalEstimatedValue)}
              </span>
            </div>
          </div>

          {/* Important Notice on Weight & Direct Handover */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white">تنبيه هام للطرفين: </strong>
              الكمية المذكورة ({auction.approxWeightKg} كغم) هي كمية تقريبية. يتم فحص الخردة
              والتوزين الدقيق على قبان معتمد، والاتفاق النهائي على إجمالي المبلغ ودفع ثمن الخردة مباشرة
              بين البائع والتاجر عند الاستلام في موقع الخردة.
            </div>
          </div>

          {/* Description */}
          {auction.description && (
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 mb-1.5">وصف الخردة:</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {auction.description}
              </p>
            </div>
          )}

          {/* --- WINNER & PAYMENT BANNER (When Auction is Waiting Commission or Paid) --- */}
          {(isWaitingCommission || isCommissionPaid) && (
            <div
              className={`p-5 rounded-2xl border ${
                isCommissionPaid
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : 'bg-amber-950/40 border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award
                  className={`w-5 h-5 ${
                    isCommissionPaid ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {isWinner
                    ? 'مبروك! أنت الفائز بالمزاد 🎉'
                    : isSeller
                    ? '🥫 يم صاحب الخردة · انتهى المزاد بنجاح'
                    : 'نتائج المزاد المنتهي 🏆'}
                </h3>
              </div>

              {/* Deal Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">التاجر الفائز:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    {auction.winnerName || 'تاجر معتمد'}
                    {auction.winnerIsVerified && <span className="text-[10px]">🔵</span>}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">سعر المزاد الإجمالي:</span>
                  <span className="font-bold text-amber-400 tabular-nums">
                    {formatIQD(auction.totalWinningAmount || auction.totalEstimatedValue)}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">إجمالي عمولة عَتّاك:</span>
                  <span className="font-bold text-sky-400 tabular-nums">
                    {formatIQD(auction.totalCommission)}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    المبلغ للبائع عند الاستلام:
                  </span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {formatIQD(
                      (auction.totalWinningAmount || auction.totalEstimatedValue) -
                        auction.commissionSeller
                    )}
                  </span>
                </div>
              </div>

              {/* Explanatory note from user prompt Section 11 & 14 */}
              <div className="text-[11px] text-slate-300 leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <p>
                  <strong>مهم جداً: </strong>عَتّاك لا تستلم قيمة الخردة نفسها. عَتّاك تستلم فقط عمولة
                  المنصة ({formatIQD(auction.totalCommission)}). يدفع التاجر باقي المبلغ (
                  {formatIQD(
                    (auction.totalWinningAmount || auction.totalEstimatedValue) -
                      auction.commissionSeller
                  )}
                  ) مباشرة إلى البائع عند فحص واستلام الخردة.
                </p>
              </div>

              {/* Contact Status: UNLOCKED OR LOCKED */}
              {isCommissionPaid ? (
                /* UNLOCKED CONTACT */
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-emerald-400 block">
                          ✅ تم دفع العمولة وتأكيد العملية عبر زين كاش
                        </span>
                        <span className="text-[11px] text-slate-400">
                          بيانات التواصل مع صاحب الخردة مفتوحة الآن:
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">صاحب الخردة:</span>
                      <span className="font-bold text-white text-sm">{auction.sellerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">رقم الهاتف:</span>
                      <span className="font-mono font-bold text-amber-400 text-base" dir="ltr">
                        {auction.sellerPhone}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">الموقع:</span>
                      <span className="text-xs text-slate-300">
                        {auction.governorate} · {auction.area}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${auction.sellerPhone}`}
                      className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>اتصال هاتفي مباشر</span>
                    </a>
                    <a
                      href={`https://wa.me/964${auction.sellerPhone.replace(/^0+/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>واتساب صاحب الخردة</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onOpenRating(auction)}
                      className="text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      ⭐ تقييم الصفقة
                    </button>
                    <button
                      onClick={() => onOpenComplaint(auction)}
                      className="text-rose-400 hover:text-rose-300 font-medium"
                    >
                      ⚠️ تقديم شكوى بخصوص الصفقة
                    </button>
                  </div>
                </div>
              ) : (
                /* LOCKED CONTACT - WAITING FOR PAYMENT */
                <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      🔒 رقم هاتف صاحب الخردة مخفي حالياً ({maskPhone(auction.sellerPhone)}). يتم إظهاره
                      فور تأكيد دفع عمولة عَتّاك عبر بوابة زين كاش.
                    </span>
                  </div>

                  {isWinner ? (
                    <button
                      onClick={() => onTriggerZainCash(auction)}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>🔐 ادفع {formatIQD(auction.totalCommission)} لإظهار رقم البائع عبر ZainCash</span>
                    </button>
                  ) : isSeller ? (
                    <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
                      ⏳ حالة الصفقة: <strong>بانتظار قيام التاجر الفائز بدفع العمولة</strong>. بمجرد
                      الدفع سيصلك إشعار فوري وسيظهر رقمك للتاجر ليتواصل معك للاتفاق على الاستلام.
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      المزاد انتهى لصالح التاجر: <strong>{auction.winnerName}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- ACTIVE BIDDING SECTION (When Auction is ACTIVE) --- */}
          {!isEnded && (
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-850 sm:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>المزايدة المباشرة</span>
                </h3>
                <span className="text-xs text-slate-400">
                  أعلى سعر: <strong className="text-amber-400">{formatIQD(auction.currentPricePerKg)}</strong>
                </span>
              </div>

              {isSeller ? (
                <div className="p-3 rounded-xl bg-slate-800 text-xs text-slate-300 border border-slate-700">
                  ℹ️ أنت صاحب هذا المزاد (البائع). يمنع نظام عَتّاك مزايدة البائع على مزاده الخاص. يمكنك
                  متابعة مزايدات التجار بالأسفل.
                </div>
              ) : (
                <form onSubmit={handlePlaceBid} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      أدخل السعر الجديد لكل كغم (د.ع):
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          step="50"
                          min={auction.currentPricePerKg + 25}
                          value={bidPrice}
                          onChange={(e) => {
                            setBidPrice(Number(e.target.value));
                            setBidError(null);
                          }}
                          className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-4 text-white text-base font-bold tabular-nums focus:outline-none focus:border-amber-400"
                          placeholder={`أعلى من ${auction.currentPricePerKg}`}
                        />
                        <span className="absolute left-3 top-3.5 text-xs text-slate-400 font-medium">
                          د.ع / كغم
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all shrink-0 cursor-pointer"
                      >
                        💰 زايد الآن
                      </button>
                    </div>
                  </div>

                  {/* Live Calculation preview */}
                  <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span>القيمة الإجمالية لمزايدتك ({auction.approxWeightKg} كغم):</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {formatIQD(auction.approxWeightKg * bidPrice)}
                    </span>
                  </div>

                  {/* Feedback alerts */}
                  {bidError && (
                    <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{bidError}</span>
                    </div>
                  )}

                  {bidSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{bidSuccessMsg}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}

          {/* --- BIDDING TIMELINE HISTORY --- */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>سجل المزايدات الأخيرة ({auction.bids.length})</span>
              <span className="text-[10px] text-slate-400">تحديث فوري</span>
            </h3>

            {auction.bids.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                لا توجد مزايدات بعد. كن أول من يزايد!
              </p>
            ) : (
              <div className="space-y-2">
                {auction.bids.map((bid, index) => (
                  <div
                    key={bid.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      index === 0
                        ? 'bg-amber-500/10 border-amber-500/30 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-1 font-bold">
                          <span>{bid.traderName}</span>
                          {bid.isVerifiedTrader && (
                            <span className="text-[10px] text-sky-400" title="تاجر معتمد">
                              🔵
                            </span>
                          )}
                          {index === 0 && (
                            <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black mr-1">
                              أعلى سعر
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatArabicDate(bid.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="font-black text-amber-400 text-sm block tabular-nums">
                        {formatIQD(bid.pricePerKg)} / كغم
                      </span>
                      <span className="text-[10px] text-slate-400 tabular-nums">
                        الإجمالي: {formatIQD(bid.totalCalculated)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
