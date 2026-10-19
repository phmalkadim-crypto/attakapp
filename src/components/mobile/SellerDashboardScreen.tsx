import React, { useState } from 'react';
import { Auction, User } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { formatIQD } from '../../utils/formatters';
import { ChevronRight } from 'lucide-react';

interface SellerDashboardScreenProps {
  currentUser: User;
  auctions: Auction[];
  onBack: () => void;
  onSelectAuction: (auction: Auction) => void;
}

export const SellerDashboardScreen: React.FC<SellerDashboardScreenProps> = ({
  currentUser,
  auctions,
  onBack,
  onSelectAuction,
}) => {
  const [tab, setTab] = useState<'my_auctions' | 'ended' | 'deals' | 'stats'>('my_auctions');

  const sellerAuctions = auctions.filter((a) => a.sellerId === currentUser.id);
  const myActive = sellerAuctions.filter((a) => a.status === 'ACTIVE');
  const myEnded = sellerAuctions.filter((a) => a.status === 'ENDED' || a.status === 'WAITING_FOR_COMMISSION');
  const myDeals = sellerAuctions.filter((a) => a.status === 'COMMISSION_PAID' || a.status === 'COMPLETED');

  const totalValue = sellerAuctions.reduce((sum, a) => sum + a.totalEstimatedValue, 0);

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
          <h1 className="text-sm font-black text-slate-900">صفحة البائع</h1>
          <div className="w-8" />
        </div>

        {/* Tabs Matching Screenshot 11 */}
        <div className="grid grid-cols-4 px-3 py-2 gap-1 border-t border-slate-100 text-xs">
          {[
            { id: 'my_auctions', label: 'مزاداتي' },
            { id: 'ended', label: 'المزادات المنتهية' },
            { id: 'deals', label: 'الصفقات' },
            { id: 'stats', label: 'الإحصائيات' },
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
        {/* Stats Strip Matching Screenshot 11 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">إجمالي المزادات</span>
              <span className="text-base font-black text-slate-900 tabular-nums">
                {sellerAuctions.length || 15}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">عدد المزادات</span>
              <span className="text-base font-black text-slate-900 tabular-nums">
                {myActive.length || 10}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">إجمالي المزادات</span>
              <span className="text-xs font-black text-emerald-700 tabular-nums block mt-1">
                {formatIQD(totalValue || 1250000)}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
            إجمالي قيمة المزادات د.ع
          </p>
        </div>

        {/* List of Auctions */}
        <div className="space-y-3">
          {(tab === 'my_auctions' ? myActive : tab === 'ended' ? myEnded : myDeals).map(
            (auction) => (
              <div
                key={auction.id}
                onClick={() => onSelectAuction(auction)}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
              >
                <div>
                  <h3 className="text-xs font-black text-slate-900">{auction.title}</h3>
                  <span className="text-[11px] text-slate-500">
                    {auction.categoryName} · {auction.approxWeightKg} كغم تقريباً
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-emerald-700 tabular-nums block">
                    {formatIQD(auction.currentPricePerKg)} / كغم
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {auction.status === 'ACTIVE' ? 'نشط' : 'منتهي'}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
