import React, { useState } from 'react';
import { User } from '../../types';
import { ArrowRight, Phone, HelpCircle, ChevronDown, MessageSquare, ShieldCheck } from 'lucide-react';

interface SupportScreenProps {
  currentUser: User;
  onBack: () => void;
  isDarkMode?: boolean;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onBack,
  isDarkMode = false,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'من يدفع عمولة المنصة ومتى يتم دفعها؟',
      a: 'تبلغ عمولة المنصة 2,000 دينار مقسمة مناصفة (1,000 دينار على البائع و1,000 دينار على المشتري). يدفع المشتري الفائز كامل المبلغ (2,000 دينار) عبر بوابة ZainCash بعد انتهاء المزاد لفتح بيانات التواصل ورقم الهاتف. وعند الاستلام، يخصم المشتري 1,000 دينار من حساب البائع (مثال: إذا رسى المزاد على 85 ألف، يدفع المشتري للمنصة 2,000 زين كاش، ويسلم البائع 84 ألف دينار فقط عند الاستلام).',
    },
    {
      q: 'كيف أبيع خردتي بأعلى سعر في عَتّاك؟',
      a: 'اضغط على زر (+) في الوسط، اختر نوع الخردة المناسب (ألمنيوم، نحاس، حديد، بطاريات)، أضف الوزن التقديري، وحدد محافظتك ومنطقتك. ستبدأ مزايدات التجار المعتمدين فوراً ويتنافسون لرفع السعر.',
    },
    {
      q: 'هل تستلم منصة عَتّاك قيمة الخردة المالية؟',
      a: 'كلا، منصة عَتّاك لا تستلم قيمة الخردة إطلاقاً. قيمة الخردة الفعلية تُدفع نقداً ومباشرة من التاجر للبائع في الميدان عند فحص الخردة ووزنها في القبّان.',
    },
    {
      q: 'ماذا يحدث إذا اختلف التاجر والبائع على الوزن في القبّان؟',
      a: 'المعاملة تخضع للوزن الصافي في القبّان المعتمد باتفاق الطرفين. وفي حال عدم الاتفاق، يمكن للطرفين إلغاء المعاملة أو التواصل الفوري مع فريق الدعم لحل الإشكال.',
    },
  ];

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-y-auto no-scrollbar pb-28 select-none transition-colors ${
        isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <div
        className={`sticky top-0 z-20 border-b backdrop-blur-md px-4 py-3 flex items-center justify-between ${
          isDarkMode ? 'bg-[#04150E]/90 border-emerald-950/70 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
        }`}
      >
        <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black">مركز الدعم والمساعدة</h1>
        <div className="w-5" />
      </div>

      <div className="p-4 space-y-4">
        {/* Contact Card */}
        <div
          className={`p-4 rounded-2xl border shadow-xs flex items-center gap-3 ${
            isDarkMode ? 'bg-[#071F15] border-emerald-900/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-black">فريق الإدارة والدعم المباشر</h3>
            <span className="text-xs font-mono font-bold text-amber-500 block mt-0.5" dir="ltr">
              07829692579
            </span>
            <span className="text-[10px] text-slate-400 block">متاح على مدار 24 ساعة عبر الاتصال وواتساب</span>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold text-slate-500 px-1">الأسئلة الشائعة والأمان</h2>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isDarkMode ? 'bg-[#071F15] border-emerald-950/80' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-right text-xs font-bold gap-2 cursor-pointer"
                >
                  <span className="flex-1">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-emerald-950/60 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
