import React from 'react';
import { Auction, User } from '../../types';
import { ArrowRight, Trophy, Phone } from 'lucide-react';

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
  const wonAuctions = auctions.filter((a) => a.winnerId === currentUser.id || a.bids.some((b) => b.traderId === currentUser.id));

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0B1612] overflow-y-auto pb-28 text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-[#071F15] border-b border-slate-200 dark:border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">صفقاتي ومزاداتي 🏆</h1>
        <div className="w-5" />
      </div>

      <div className="p-4 space-y-3">
        {wonAuctions.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-xs font-bold text-slate-500">لا توجد مزادات مشارك بها حالياً</h3>
            <p className="text-[11px] text-slate-400 mt-1">ابدأ بالمزايدة في الصفحة الرئيسية لتظهر صفقاتك هنا</p>
          </div>
        ) : (
          wonAuctions.map((auc) => {
            const isPaid = auc.status === 'COMMISSION_PAID';
            return (
              <div
                key={auc.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#071F15] border border-slate-200 dark:border-emerald-950/70 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold line-clamp-1">{auc.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPaid
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {isPaid ? 'تم دفع العمولة ✅' : 'بانتظار العمولة ⏳'}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  الموقع: {auc.governorate} · الوزن: {auc.approxWeightKg} كغم
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-emerald-950/50 flex items-center justify-between">
                  {isPaid ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Phone className="w-3.5 h-3.5" />
                      <span>هاتف البائع: {auc.sellerPhone}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onPayCommission(auc)}
                      className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold"
                    >
                      دفع العمولة عبر زين كاش (2,000 د.ع)
                    </button>
                  )}

                  <button
                    onClick={() => onSelectAuction(auc)}
                    className="text-[11px] font-bold text-slate-500 hover:text-amber-500"
                  >
                    عرض التفاصيل ←
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
