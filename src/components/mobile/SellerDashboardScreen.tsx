import React from 'react';
import { Auction, User } from '../../types';
import { ArrowRight, Layers, Plus } from 'lucide-react';

interface SellerDashboardScreenProps {
  currentUser: User;
  auctions: Auction[];
  onBack: () => void;
  onAddNewAuction: () => void;
  onSelectAuction: (auction: Auction) => void;
}

export const SellerDashboardScreen: React.FC<SellerDashboardScreenProps> = ({
  currentUser,
  auctions,
  onBack,
  onAddNewAuction,
  onSelectAuction,
}) => {
  const myAuctions = auctions.filter((a) => a.sellerId === currentUser.id);

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0B1612] overflow-y-auto pb-28 text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-[#071F15] border-b border-slate-200 dark:border-emerald-950/70 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">إدارة مزاداتي (البائع)</h1>
        <button onClick={onAddNewAuction} className="p-1 text-amber-500">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {myAuctions.length === 0 ? (
          <div className="text-center py-16">
            <Layers className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-xs font-bold text-slate-500">لم تقم بإضافة مزادات بعد</h3>
            <button
              onClick={onAddNewAuction}
              className="mt-3 px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs"
            >
              أضف مزاد خردة الآن ➕
            </button>
          </div>
        ) : (
          myAuctions.map((auc) => (
            <div
              key={auc.id}
              onClick={() => onSelectAuction(auc)}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#071F15] border border-slate-200 dark:border-emerald-950/70 shadow-xs cursor-pointer"
            >
              <h3 className="text-xs font-bold">{auc.title}</h3>
              <div className="mt-2 text-[11px] text-slate-400">
                السعر: {auc.currentPricePerKg} د.ع/كغم · المزايدات: {auc.bidsCount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
