import React, { useState } from 'react';
import { Auction, User } from '../types';
import { formatIQD } from '../utils/formatters';
import {
  Gavel,
  Trophy,
  CreditCard,
  CheckCircle2,
  BarChart3,
  Scale,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface MyDealsViewProps {
  currentUser: User;
  auctions: Auction[];
  onSelectAuction: (auction: Auction) => void;
  onTriggerZainCash: (auction: Auction) => void;
  onOpenCreateAuction: () => void;
}

export const MyDealsView: React.FC<MyDealsViewProps> = ({
  currentUser,
  auctions,
  onSelectAuction,
  onTriggerZainCash,
  onOpenCreateAuction,
}) => {
  // Determine role perspective
  const [perspective, setPerspective] = useState<'trader' | 'seller'>(
    currentUser.role === 'seller' ? 'seller' : 'trader'
  );

  // Trader tab states
  const [traderTab, setTraderTab] = useState<'active' | 'won' | 'waiting_commission' | 'completed'>(
    'waiting_commission'
  );

  // Seller tab states
  const [sellerTab, setSellerTab] = useState<'active' | 'ended' | 'deals' | 'stats'>('active');

  // Trader filtering
  const traderActiveBids = auctions.filter(
    (a) => a.status === 'ACTIVE' && a.bids.some((b) => b.traderId === currentUser.id)
  );

  const traderWonAll = auctions.filter((a) => a.winnerId === currentUser.id);

  const traderWaitingCommission = auctions.filter(
    (a) => a.winnerId === currentUser.id && a.status === 'WAITING_FOR_COMMISSION'
  );

  const traderCompleted = auctions.filter(
    (a) =>
      a.winnerId === currentUser.id &&
      (a.status === 'COMMISSION_PAID' || a.status === 'COMPLETED')
  );

  // Seller filtering
  const sellerMyActive = auctions.filter(
    (a) => a.sellerId === currentUser.id && a.status === 'ACTIVE'
  );

  const sellerEnded = auctions.filter(
    (a) =>
      a.sellerId === currentUser.id &&
      (a.status === 'ENDED' || a.status === 'WAITING_FOR_COMMISSION')
  );

  const sellerDealsCompleted = auctions.filter(
    (a) =>
      a.sellerId === currentUser.id &&
      (a.status === 'COMMISSION_PAID' || a.status === 'COMPLETED')
  );

  const sellerTotalValue = auctions
    .filter((a) => a.sellerId === currentUser.id)
    .reduce((sum, a) => sum + a.totalEstimatedValue, 0);

  const sellerTotalAuctions = auctions.filter((a) => a.sellerId === currentUser.id).length;
  const sellerSuccessfulAuctions = sellerDealsCompleted.length;

  return (
    <div className="space-y-6">
      {/* Top Perspective Switcher (Trader vs Seller) */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <div className="flex items-center gap-1 w-full">
          <button
            onClick={() => setPerspective('trader')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              perspective === 'trader'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏪 واجهة التاجر</span>
            {traderWaitingCommission.length > 0 && (
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {traderWaitingCommission.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setPerspective('seller')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              perspective === 'seller'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>👤 واجهة صاحب الخردة</span>
          </button>
        </div>
      </div>

      {/* ---------------- PERSPECTIVE: TRADER ---------------- */}
      {perspective === 'trader' && (
        <div className="space-y-5">
          {/* Trader Sub-tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setTraderTab('waiting_commission')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                traderTab === 'waiting_commission'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>بانتظار دفع العمولة</span>
                </span>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {traderWaitingCommission.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">ادفع لإظهار رقم البائع</span>
            </button>

            <button
              onClick={() => setTraderTab('completed')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                traderTab === 'completed'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>الصفقات المكتملة</span>
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {traderCompleted.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">تم إظهار بيانات البائع</span>
            </button>

            <button
              onClick={() => setTraderTab('won')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                traderTab === 'won'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>فزت بها</span>
                </span>
                <span className="font-mono text-xs font-bold text-white">
                  {traderWonAll.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">كافة المزادات الرابحة</span>
            </button>

            <button
              onClick={() => setTraderTab('active')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                traderTab === 'active'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <Gavel className="w-3.5 h-3.5 text-amber-400" />
                  <span>المزادات النشطة</span>
                </span>
                <span className="font-mono text-xs font-bold text-white">
                  {traderActiveBids.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">مزادات قيد المزايدة</span>
            </button>
          </div>

          {/* List for chosen Trader tab */}
          <div className="space-y-3">
            {traderTab === 'waiting_commission' && (
              <>
                {traderWaitingCommission.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">لا توجد مزادات بانتظار دفع العمولة حالياً</p>
                  </div>
                ) : (
                  traderWaitingCommission.map((auc) => (
                    <div
                      key={auc.id}
                      className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                            🏆 مبروك! أنت الفائز بالمزاد
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5">{auc.title}</h4>
                          <span className="text-xs text-slate-400">
                            {auc.governorate} · {auc.area} · {auc.approxWeightKg} كغم تقريباً
                          </span>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-xs text-slate-400 block">سعر المزاد الإجمالي:</span>
                          <span className="text-base font-black text-amber-400 tabular-nums">
                            {formatIQD(auc.totalWinningAmount || auc.totalEstimatedValue)}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
                        <div className="text-slate-300">
                          عمولة عَتّاك: <strong className="text-white">{formatIQD(auc.totalCommission)}</strong>
                          <span className="text-[11px] text-slate-400 block">
                            (المبلغ المتبقي للبائع مباشرة: {formatIQD((auc.totalWinningAmount || auc.totalEstimatedValue) - auc.commissionSeller)})
                          </span>
                        </div>

                        <button
                          onClick={() => onTriggerZainCash(auc)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                        >
                          <span>🔐 ادفع {formatIQD(auc.totalCommission)} عبر زين كاش</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {traderTab === 'completed' && (
              <>
                {traderCompleted.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <CheckCircle2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">لا توجد صفقات مكتملة بعد</p>
                  </div>
                ) : (
                  traderCompleted.map((auc) => (
                    <div
                      key={auc.id}
                      className="p-4 rounded-2xl bg-slate-850 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                            ✅ تم دفع العمولة
                          </span>
                          <span className="text-xs text-slate-400">
                            {auc.governorate} · {auc.area}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{auc.title}</h4>
                        <div className="text-xs text-emerald-300 mt-1 flex items-center gap-2">
                          <span>صاحب الخردة: {auc.sellerName}</span>
                          <span className="font-mono font-bold" dir="ltr">
                            📞 {auc.sellerPhone}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectAuction(auc)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  ))
                )}
              </>
            )}

            {traderTab === 'won' && (
              <div className="space-y-2">
                {traderWonAll.map((auc) => (
                  <div
                    key={auc.id}
                    onClick={() => onSelectAuction(auc)}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{auc.title}</h4>
                      <span className="text-[11px] text-slate-400">
                        {auc.categoryName} · {auc.approxWeightKg} كغم
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-amber-400 block tabular-nums">
                        {formatIQD(auc.totalEstimatedValue)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {auc.status === 'COMMISSION_PAID' ? 'مكتمل' : 'بانتظار الدفع'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {traderTab === 'active' && (
              <div className="space-y-2">
                {traderActiveBids.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">
                    لم تشارك بأي مزاد نشط حالياً. تصفح المزادات وزايد الآن!
                  </p>
                ) : (
                  traderActiveBids.map((auc) => (
                    <div
                      key={auc.id}
                      onClick={() => onSelectAuction(auc)}
                      className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{auc.title}</h4>
                        <span className="text-[11px] text-slate-400">
                          {auc.governorate} · {auc.approxWeightKg} كغم
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-amber-400 block tabular-nums">
                          {formatIQD(auc.currentPricePerKg)} / كغم
                        </span>
                        <span className="text-[10px] text-emerald-400">
                          {auc.winnerId === currentUser.id ? 'أنت صاحب أعلى سعر 🏆' : 'تم تجاوز مزايدتك'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- PERSPECTIVE: SELLER ---------------- */}
      {perspective === 'seller' && (
        <div className="space-y-5">
          {/* Seller Sub-tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setSellerTab('active')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                sellerTab === 'active'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span>➕ مزاداتي النشطة</span>
                <span className="font-mono text-xs font-bold text-white">
                  {sellerMyActive.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">مزادات جارية الآن</span>
            </button>

            <button
              onClick={() => setSellerTab('ended')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                sellerTab === 'ended'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span>🔨 المزادات المنتهية</span>
                <span className="font-mono text-xs font-bold text-white">{sellerEnded.length}</span>
              </div>
              <span className="text-[10px] text-slate-400">بانتظار دفع العمولة</span>
            </button>

            <button
              onClick={() => setSellerTab('deals')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                sellerTab === 'deals'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span>🏆 الصفقات الناجحة</span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {sellerDealsCompleted.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">تم البيع والتواصل</span>
            </button>

            <button
              onClick={() => setSellerTab('stats')}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                sellerTab === 'stats'
                  ? 'bg-sky-500/15 border-sky-500 text-white font-bold'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span>📊 الإحصائيات</span>
                <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <span className="text-[10px] text-slate-400">الأداء وإجمالي المبيعات</span>
            </button>
          </div>

          {/* Seller Content */}
          <div className="space-y-3">
            {sellerTab === 'active' && (
              <>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={onOpenCreateAuction}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>+ إضافة خردة جديدة للمزاد</span>
                  </button>
                </div>

                {sellerMyActive.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <p className="text-xs text-slate-400 mb-3">ليس لديك مزادات نشطة حالياً</p>
                    <button
                      onClick={onOpenCreateAuction}
                      className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      أضف خردتك للمزاد الآن 🥫
                    </button>
                  </div>
                ) : (
                  sellerMyActive.map((auc) => (
                    <div
                      key={auc.id}
                      onClick={() => onSelectAuction(auc)}
                      className="p-4 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">{auc.title}</h4>
                        <span className="text-xs text-slate-400">
                          {auc.approxWeightKg} كغم · {auc.bidsCount} مزايدات
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-amber-400 block tabular-nums">
                          {formatIQD(auc.currentPricePerKg)} / كغم
                        </span>
                        <span className="text-[10px] text-slate-400">
                          الإجمالي: {formatIQD(auc.totalEstimatedValue)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {sellerTab === 'ended' && (
              <>
                {sellerEnded.map((auc) => (
                  <div
                    key={auc.id}
                    onClick={() => onSelectAuction(auc)}
                    className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        🔨 انتهى المزاد · بانتظار دفع العمولة من التاجر
                      </span>
                      <span className="text-xs font-bold text-white tabular-nums">
                        {formatIQD(auc.totalEstimatedValue)}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200">{auc.title}</h4>
                    <p className="text-[11px] text-slate-400">
                      الفائز: {auc.winnerName || 'تاجر'} · بمجرد دفع العمولة عبر ZainCash سيظهر رقمك
                      لإتمام البيع المباشر.
                    </p>
                  </div>
                ))}
              </>
            )}

            {sellerTab === 'deals' && (
              <>
                {sellerDealsCompleted.map((auc) => (
                  <div
                    key={auc.id}
                    onClick={() => onSelectAuction(auc)}
                    className="p-4 rounded-2xl bg-slate-850 border border-emerald-500/30 space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">
                        ✅ تم دفع العمولة وإتمام الصفقة
                      </span>
                      <span className="text-xs font-bold text-emerald-300 tabular-nums">
                        صافي البيع: {formatIQD(auc.totalEstimatedValue - auc.commissionSeller)}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{auc.title}</h4>
                    <p className="text-[11px] text-slate-300">
                      التاجر الفائز: {auc.winnerName} ({auc.winnerPhone})
                    </p>
                  </div>
                ))}
              </>
            )}

            {sellerTab === 'stats' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">إجمالي المزادات المنشورة:</span>
                  <span className="text-2xl font-black text-white tabular-nums">
                    {sellerTotalAuctions}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">المزادات الناجحة:</span>
                  <span className="text-2xl font-black text-emerald-400 tabular-nums">
                    {sellerSuccessfulAuctions}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">إجمالي قيمة المزادات:</span>
                  <span className="text-2xl font-black text-amber-400 tabular-nums">
                    {formatIQD(sellerTotalValue)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
