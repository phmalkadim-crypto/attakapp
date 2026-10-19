import React from 'react';
import { Auction } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { CheckCircle2, Phone, MessageSquare, MapPin, Check } from 'lucide-react';

interface CommissionPaidScreenProps {
  auction: Auction;
  onDone: () => void;
  onOpenRating?: () => void;
}

export const CommissionPaidScreen: React.FC<CommissionPaidScreenProps> = ({
  auction,
  onDone,
  onOpenRating,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-y-auto pb-6 select-none">
      <MobileStatusBar darkTheme={false} />

      <div className="p-4 space-y-4 text-center">
        {/* Green Check Circle Matching Screenshot 9 */}
        <div className="pt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-lg font-black text-slate-900">تم دفع العمولة بنجاح</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            تم التحقق من الدفع عبر نظام ZainCash.
          </p>
        </div>

        {/* Unlocked Button Header Matching Screenshot 9 */}
        <div>
          <button
            className="w-full h-11 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-default"
          >
            <span>إظهار معلومات البائع 🔓</span>
          </button>
        </div>

        {/* Contact Info Card Matching Screenshot 9 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 text-right">
          <div>
            <span className="text-xs text-slate-400 block mb-1">رقم صاحب الخردة</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-slate-900 font-mono tracking-wider" dir="ltr">
                {auction.sellerPhone}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${auction.sellerPhone}`}
                  className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xs transition-colors"
                  title="اتصال هاتفي"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/964${auction.sellerPhone.replace(/^0+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center shadow-xs transition-colors"
                  title="مراسلة واتساب"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>الموقع:</span>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {auction.governorate} - {auction.area}
              </span>
            </div>
          </div>
        </div>

        {/* Closing Deal Checklist Matching Screenshot 9 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs text-right space-y-2">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            <span>🤝 تواصل معه واتفقوا مباشرة على:</span>
          </h4>

          <ul className="space-y-1.5 text-xs text-slate-600 pr-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>الوزن النهائي بقبان معتمد</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>موعد الاستلام</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>مكان الاستلام</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>قيمة البيع النهائية</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>طريقة الدفع المباشر</span>
            </li>
          </ul>
        </div>

        {/* Back / Rating Buttons */}
        <div className="pt-2 space-y-2">
          {onOpenRating && (
            <button
              onClick={onOpenRating}
              className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xs transition-colors"
            >
              ⭐ تقييم البائع والصفقة
            </button>
          )}

          <button
            onClick={onDone}
            className="w-full h-11 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            العودة إلى صفقاتي
          </button>
        </div>
      </div>
    </div>
  );
};
