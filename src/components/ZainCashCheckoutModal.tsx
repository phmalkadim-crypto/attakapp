import React, { useState } from 'react';
import { Auction, PaymentOrder, User } from '../types';
import { formatIQD } from '../utils/formatters';
import { store } from '../services/store';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  QrCode,
  Smartphone,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ZainCashCheckoutModalProps {
  auction: Auction;
  currentUser: User;
  onClose: () => void;
  onPaymentSuccess: (updatedAuction: Auction) => void;
}

export const ZainCashCheckoutModal: React.FC<ZainCashCheckoutModalProps> = ({
  auction,
  currentUser,
  onClose,
  onPaymentSuccess,
}) => {
  const [order, setOrder] = useState<PaymentOrder>(() =>
    store.createPaymentOrder(auction.id, currentUser)
  );
  const [step, setStep] = useState<'details' | 'processing' | 'success' | 'failed'>('details');
  const [phone, setPhone] = useState(currentUser.phone || '07801234567');
  const [pin, setPin] = useState('••••');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalAuctionValue = auction.totalWinningAmount || auction.totalEstimatedValue;
  const directSellerAmount = totalAuctionValue - auction.commissionSeller;

  const handleConfirmPay = async () => {
    setStep('processing');
    setErrorMsg(null);

    try {
      // Backend Webhook / API verification simulation
      const result = await store.verifyZainCashPayment(order.id);
      if (result.success && result.auction) {
        setStep('success');
        onPaymentSuccess(result.auction);
      } else {
        setStep('failed');
        setErrorMsg(result.message || 'فشلت عملية الدفع عبر بوابة زين كاش.');
      }
    } catch {
      setStep('failed');
      setErrorMsg('حدث خطأ أثناء معالجة الدفع عبر خادم ZainCash.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-right">
        {/* ZainCash Official-style Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 border-b border-indigo-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              ZC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">ZainCash · زين كاش</span>
                <span className="text-[10px] bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/30">
                  بوابة الدفع الإلكتروني
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80 font-mono">
                Order ID: {order.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on Step */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-5">
              {/* Mandatory Explanation banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>توضيح مالي مهم جداً قبل الدفع:</span>
                </div>
                <p>
                  عَتّاك تستلم فقط عمولة المنصة ({formatIQD(order.amount)}) مقابل ربطك بالبائع
                  وحماية المزاد. قيمة الخردة الفعلية ({formatIQD(directSellerAmount)}) تدفعها
                  مباشرة للبائع عند الاستلام والتوزين.
                </p>
              </div>

              {/* Order breakdown */}
              <div className="bg-slate-850 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">المزاد:</span>
                  <span className="font-bold text-white max-w-[240px] truncate">
                    {auction.title}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">قيمة المزاد الإجمالية:</span>
                  <span className="font-bold text-slate-200 tabular-nums">
                    {formatIQD(totalAuctionValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">المبلغ المطلوب دفعه لـ زين كاش:</span>
                  <span className="font-black text-amber-400 text-lg tabular-nums">
                    {formatIQD(order.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>المبلغ المتبقي لصاحب الخردة مباشرة:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {formatIQD(directSellerAmount)}
                  </span>
                </div>
              </div>

              {/* ZainCash Wallet Details Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    رقم محفظة زين كاش العراقية:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl px-4 text-white text-sm font-mono text-left focus:outline-none focus:border-purple-500"
                      dir="ltr"
                    />
                    <Smartphone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الرمز السري لمحفظة ZainCash (PIN):
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl px-4 text-white text-sm font-mono tracking-widest text-center focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleConfirmPay}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>تأكيد ودفع {formatIQD(order.amount)} عبر زين كاش</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>دفع إلكتروني آمن ومشفر بمعايير البنك المركزي العراقي</span>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30 animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  جاري معالجة الدفع عبر خادم ZainCash...
                </h3>
                <p className="text-xs text-slate-400">
                  يتم التحقق من العملية عبر الـ Backend والـ Webhook الرسمي للبنك
                </p>
              </div>
              <div className="inline-block px-3 py-1 bg-slate-800 rounded-lg text-[11px] font-mono text-purple-300">
                Order ID: {order.id}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-1">
                  Payment Successful · تم الدفع بنجاح! 🎉
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  تم استلام وتأكيد عمولة عَتّاك ({formatIQD(order.amount)}) بنجاح. تم الآن فتح بيانات
                  التواصل ورقم هاتف صاحب الخردة.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-850 border border-emerald-500/30 text-right space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">صاحب الخردة:</span>
                  <span className="font-bold text-white">{auction.sellerName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">رقم الهاتف:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm" dir="ltr">
                    {auction.sellerPhone}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">الموقع:</span>
                  <span className="text-slate-200">
                    {auction.governorate} · {auction.area}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>الانتقال للتواصل المباشر مع البائع</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          )}

          {step === 'failed' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">فشلت عملية الدفع</h3>
                <p className="text-xs text-rose-300">{errorMsg || 'يرجى المحاولة مرة أخرى لاحقاً.'}</p>
                <p className="text-[11px] text-slate-400 mt-2">
                  🔒 تبقى معلومات البائع مخفية حتى إتمام الدفع بنجاح.
                </p>
              </div>
              <button
                onClick={() => setStep('details')}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
