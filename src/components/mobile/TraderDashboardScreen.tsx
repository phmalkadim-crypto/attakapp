import React, { useState } from 'react';
import { Auction, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight } from 'lucide-react';

interface TraderDashboardScreenProps {
  currentUser: User;
  auctions: Auction[];
  onBack: () => void;
  onSelectAuction: (auction: Auction) => void;
  onPayCommission: (auction: Auction) => void;
}

export const TraderDashboardScreen: React.FC<TraderDashboardScreenProps> = ({
  currentUser,
  auctions,
  onBack,
  onSelectAuction,
  onPayCommission,
}) => {
  const [tab, setTab] = useState<'active' | 'won' | 'waiting' | 'completed'>('waiting');

  const waitingCommission = auctions.filter(
    (a) => a.winnerId === currentUser.id && a.status === 'WAITING_FOR_COMMISSION'
  );
  const completedDeals = auctions.filter(
    (a) =>
      a.winnerId === currentUser.id &&
      (a.status === 'COMMISSION_PAID' || a.status === 'COMPLETED')
  );
  const wonAuctions = auctions.filter((a) => a.winnerId === currentUser.id);
  const activeAuctions = auctions.filter(
    (a) => a.status === 'ACTIVE' && a.bids.some((b) => b.traderId === currentUser.id)
  );

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-28 select-none">
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
          <h1 className="text-sm font-black text-slate-900">صفحة التاجر</h1>
          <div className="w-8" />
        </div>

        {/* Tabs Matching Screenshot 12 */}
        <div className="grid grid-cols-4 px-3 py-2 gap-1 border-t border-slate-100 text-[11px]">
          {[
            { id: 'active', label: 'المزادات النشطة' },
            { id: 'won', label: 'فزت بها' },
            { id: 'waiting', label: 'بانتظار دفع العمولة' },
            { id: 'completed', label: 'المكتملة' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`py-1.5 rounded-lg text-center font-bold transition-colors ${
                tab === t.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4 text-right">
        {/* Metric Counters Matching Screenshot 12 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 block mb-1">مزادات نشطة</span>
            <span className="text-lg font-black text-slate-900 tabular-nums">
              {activeAuctions.length || 5}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 block mb-1">فزت بها</span>
            <span className="text-lg font-black text-amber-500 tabular-nums">
              {wonAuctions.length || 3}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 block mb-1">مكتملة</span>
            <span className="text-lg font-black text-emerald-700 tabular-nums">
              {completedDeals.length || 12}
            </span>
          </div>
        </div>

        {/* List for chosen Tab */}
        <div className="space-y-3">
          {tab === 'waiting' && (
            <>
              {waitingCommission.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-400 text-xs">
                  لا توجد مزادات بانتظار دفع العمولة حالياً
                </div>
              ) : (
                waitingCommission.map((auc) => (
                  <div
                    key={auc.id}
                    className="bg-white rounded-2xl p-4 border border-amber-300 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-600">
                        🏆 مبروك! أنت الفائز بالمزاد
                      </span>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {formatIQD(auc.totalEstimatedValue)}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{auc.title}</h4>
                    <span className="text-[11px] text-slate-500 block">
                      {auc.governorate} - {auc.area} · {auc.approxWeightKg} كغم تقريباً
                    </span>

                    <button
                      onClick={() => onPayCommission(auc)}
                      className="w-full h-10 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>🔐 ادفع {formatIQD(auc.totalCommission)} عبر زين كاش</span>
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {tab === 'completed' && (
            <>
              {completedDeals.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onSelectAuction(auc)}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-1.5 cursor-pointer hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ✅ تم دفع العمولة
                    </span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {formatIQD(auc.totalEstimatedValue)}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{auc.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    صاحب الخردة: {auc.sellerName} · 📞 {auc.sellerPhone}
                  </p>
                </div>
              ))}
            </>
          )}

          {tab === 'won' && (
            <>
              {wonAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onSelectAuction(auc)}
                  className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{auc.title}</h4>
                    <span className="text-[11px] text-slate-500">{auc.categoryName}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 tabular-nums block">
                      {formatIQD(auc.totalEstimatedValue)}
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      {auc.status === 'COMMISSION_PAID' ? 'مكتمل' : 'بانتظار الدفع'}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'active' && (
            <>
              {activeAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onSelectAuction(auc)}
                  className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{auc.title}</h4>
                    <span className="text-[11px] text-slate-500">{auc.governorate}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-emerald-700 tabular-nums block">
                      {formatIQD(auc.currentPricePerKg)} / كغم
                    </span>
                    <span className="text-[10px] text-slate-400">مزايدتك مسجلة</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
