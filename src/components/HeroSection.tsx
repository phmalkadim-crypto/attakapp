import React from 'react';
import { Gavel, PlusCircle, ShieldCheck, Scale, Banknote } from 'lucide-react';
import { SCRAP_IMAGES } from '../data/constants';

interface HeroSectionProps {
  onAddAuction: () => void;
  onExploreAuctions: () => void;
  activeAuctionsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAddAuction,
  onExploreAuctions,
  activeAuctionsCount,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl mb-6">
      {/* Background with measured industrial scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={SCRAP_IMAGES.hero}
          alt="ساحة تدوير ومزادات خردة في العراق"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      <div className="relative z-10 px-5 py-7 sm:px-8 sm:py-10 max-w-4xl">
        {/* Brand headline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <span>🇮🇶 أول منصة رقمية لمزادات المعادن والخردة في العراق</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-2">
          بيع خردتك بأعلى سعر. 🔨♻️
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
          صاحب الخردة ينشر 🥫 → التجار يزايدون بأعلى سعر للكيلوغرام 💰 → أعلى مزايد يفوز 🏆 →
          دفع العمولة عبر ZainCash 🔐 → إظهار رقم البائع وإتمام البيع والوزن مباشرة.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={onAddAuction}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>➕ أضف خردتك للمزاد الآن</span>
          </button>

          <button
            onClick={onExploreAuctions}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-sm border border-slate-700 active:scale-95 transition-all"
          >
            <Gavel className="w-4 h-4 text-amber-400" />
            <span>تصفح {activeAuctionsCount} مزادات نشطة</span>
          </button>
        </div>

        {/* Trust & Guarantee strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400 shrink-0" />
            <span>الوزن نهائي بالاتفاق عند الاستلام</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>عَتّاك لا تستلم قيمة الخردة - البيع مباشر</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>حماية أرقام البائعين حتى تأكيد العمولة</span>
          </div>
        </div>
      </div>
    </div>
  );
};
