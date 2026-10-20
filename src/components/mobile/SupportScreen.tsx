import React, { useState } from 'react';
import { User, Complaint } from '../../types';
import { MobileStatusBar } from './MobileStatusBar';
import { store } from '../../services/store';
import { INITIAL_SETTINGS } from '../../data/constants';
import {
  Headphones,
  PhoneCall,
  MessageCircle,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  LifeBuoy,
} from 'lucide-react';

interface SupportScreenProps {
  currentUser: User;
  onBack?: () => void;
  isDarkMode?: boolean;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  currentUser,
  onBack,
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq' | 'tickets'>('contact');
  const [subjectType, setSubjectType] = useState('استفسار عن طريقة استخدام التطبيق');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Load existing complaints/tickets filed by this user
  const userTickets = store
    .getComplaints()
    .filter((c) => c.fromUserId === currentUser.id);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    store.addComplaint({
      auctionId: 'support-general',
      auctionTitle: subjectType,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      againstUserId: 'usr-admin',
      againstUserName: 'إدارة عَتّاك المركزية',
      type: 'أخرى',
      description: `[رقم التواصل: ${phone || currentUser.phone}] - ${message.trim()}`,
    });

    setSubmitted(true);
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('tickets');
    }, 1800);
  };

  const faqs = [
    {
      q: 'كيف أبيع خردتي بأعلى سعر في عَتّاك؟',
      a: 'اضغط على زر (+) في الوسط، اختر نوع الخردة المناسب (ألمنيوم، نحاس، حديد، بطاريات)، أضف الوزن التقديري وصور واضحة، وحدد محافظتك ومنطقتك. ستبدأ مزايدات التجار المعتمدين فوراً ويتنافسون لرفع السعر.',
    },
    {
      q: 'من يدفع عمولة المنصة ومتى يتم دفعها؟',
      a: 'تبلغ عمولة المنصة 2,000 دينار مقسمة مناصفة (1,000 دينار على البائع و1,000 دينار على المشتري). يدفع المشتري الفائز كامل المبلغ (2,000 دينار) عبر بوابة ZainCash بعد انتهاء المزاد لفتح بيانات التواصل ورقم الهاتف. وعند الاستلام، يخصم المشتري 1,000 دينار من حساب البائع (مثال: إذا رسى المزاد على 85 ألف، يدفع المشتري للمنصة 2,000 زين كاش، ويسلم البائع 84 ألف دينار فقط عند الاستلام).',
    },
    {
      q: 'هل تستلم منصة عَتّاك قيمة الخردة المالية؟',
      a: 'كلا، منصة عَتّاك لا تستلم قيمة الخردة إطلاقاً. قيمة الخردة الفعلية تُدفع نقداً ومباشرة من التاجر للبائع في الميدان عند فحص الخردة ووزنها في القبّان.',
    },
    {
      q: 'ماذا يحدث إذا اختلف التاجر والبائع على الوزن في القبّان؟',
      a: 'المعاملة تخضع للوزن الصافي في القبّان المعتمد باتفاق الطرفين. وفي حال عدم الاتفاق، يمكن للطرفين إلغاء المعاملة أو تقديم بلاغ فوري لفريق الدعم لحل الإشكال.',
    },
    {
      q: 'كيف يتم حماية رقم هاتف البائع؟',
      a: 'رقم هاتف البائع يكون مشفراً ومخفياً عن الجميع طوال فترة المزاد، ولا يظهر إلا للتاجر الفائز رسمياً بعد تأكيد دفع عمولة المنصة عبر زين كاش.',
    },
  ];

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-y-auto no-scrollbar pb-28 select-none transition-colors ${
        isDarkMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Top Fixed Header */}
      <div
        className={`sticky top-0 z-20 border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-[#062016]/95 border-emerald-950/60'
            : 'bg-white/95 border-slate-200'
        }`}
      >
        <MobileStatusBar darkTheme={isDarkMode} />
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black leading-tight">مركز الدعم والمساعدة</h1>
              <span className="text-[10px] text-emerald-500 font-bold block">
                فريق عَتّاك في خدمتكم دائماً 🟢
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDarkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              استجابة سريعة
            </span>
          </div>
        </div>

        {/* Support Sub-tabs */}
        <div className="flex border-t border-slate-200/50 dark:border-emerald-950/50 px-3">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'contact'
                ? isDarkMode
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            تواصل وتذكرة
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'faq'
                ? isDarkMode
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            الأسئلة الشائعة
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'tickets'
                ? isDarkMode
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            طلباتي
            {userTickets.length > 0 && (
              <span className="inline-block mr-1 text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                {userTickets.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 text-right">
        {/* ================= TAB 1: CONTACT & NEW TICKET ================= */}
        {activeTab === 'contact' && (
          <>
            {/* Quick Direct Communication Channels */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Direct Phone Call */}
              <a
                href={`tel:${INITIAL_SETTINGS.supportPhone}`}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-xs transition-all active:scale-95 ${
                  isDarkMode
                    ? 'bg-[#12241D] border-emerald-900/50 hover:border-emerald-700'
                    : 'bg-white border-slate-200/90 hover:border-emerald-200'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-1.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-xs font-black">اتصال هاتفي</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  {INITIAL_SETTINGS.supportPhone}
                </span>
              </a>

              {/* WhatsApp Support */}
              <a
                href={`https://wa.me/9647800000000?text=${encodeURIComponent(
                  'مرحباً فريق عَتّاك، أحتاج مساعدة بخصوص حسابي أو مزادي في التطبيق.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-xs transition-all active:scale-95 ${
                  isDarkMode
                    ? 'bg-[#12241D] border-emerald-900/50 hover:border-emerald-700'
                    : 'bg-white border-slate-200/90 hover:border-emerald-200'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-1.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-black">محادثة واتساب</span>
                <span className="text-[10px] text-slate-400 mt-0.5">رد فوري ومباشر</span>
              </a>
            </div>

            {/* Official Support Info Banner */}
            <div
              className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs ${
                isDarkMode
                  ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
              <p className="leading-relaxed text-[11px]">
                دعم عَتّاك متاح لخدمة جميع البائعين والتجار في كافة المحافظات العراقية لحل
                أي خلاف حول المزادات والوزن والعمولة.
              </p>
            </div>

            {/* Submit Support Ticket / Complaint Form */}
            <div
              className={`p-4 rounded-2xl border shadow-xs space-y-3.5 transition-colors ${
                isDarkMode ? 'bg-[#12241D] border-emerald-900/50' : 'bg-white border-slate-200/90'
              }`}
            >
              <div className="flex items-center gap-2 pb-1 border-b border-slate-200/40 dark:border-slate-800">
                <LifeBuoy className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-black">إرسال رسالة أو طلب مساعدة للإدارة</h3>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-black text-emerald-500">تم إرسال طلبك بنجاح!</h4>
                  <p className="text-[11px] text-slate-400">
                    سيقوم فريق الدعم بمراجعة رسالتك والتواصل معك في أقرب وقت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      نوع الطلب / الاستفسار:
                    </label>
                    <select
                      value={subjectType}
                      onChange={(e) => setSubjectType(e.target.value)}
                      className={`w-full text-xs font-semibold rounded-xl p-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? 'bg-[#0B1612] border-emerald-900/60 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="استفسار عن طريقة استخدام التطبيق">
                        استفسار عن طريقة استخدام التطبيق
                      </option>
                      <option value="مشكلة في عمولة أو دفع زين كاش">
                        مشكلة في عمولة أو دفع زين كاش
                      </option>
                      <option value="شكوى بخصوص مزاد أو وزن الخردة">
                        شكوى بخصوص مزاد أو وزن الخردة
                      </option>
                      <option value="بلاغ عن مستخدم أو تاجر غير ملتزم">
                        بلاغ عن مستخدم أو تاجر غير ملتزم
                      </option>
                      <option value="اقتراح أو فكرة لتطوير منصة عَتّاك">
                        اقتراح أو فكرة لتطوير منصة عَتّاك
                      </option>
                      <option value="مشكلة تقنية أخرى">مشكلة تقنية أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      رقم هاتفك للتواصل:
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07XXXXXXXXX"
                      className={`w-full text-xs font-mono rounded-xl p-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? 'bg-[#0B1612] border-emerald-900/60 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      تفاصيل الرسالة أو المشكلة:
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب استفسارك أو تفاصيل المشكلة بالتفصيل..."
                      className={`w-full text-xs rounded-xl p-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? 'bg-[#0B1612] border-emerald-900/60 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الطلب لفريق الدعم</span>
                  </button>
                </form>
              )}
            </div>
          </>
        )}

        {/* ================= TAB 2: FAQ (الأسئلة الشائعة) ================= */}
        {activeTab === 'faq' && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pb-1 text-slate-400 text-xs">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span className="font-bold">الإجابات المباشرة عن أكثر الأسئلة شيوعاً:</span>
            </div>

            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDarkMode ? 'bg-[#12241D] border-emerald-900/50' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-3.5 flex items-center justify-between text-right text-xs font-black cursor-pointer"
                  >
                    <span className="flex-1 pr-1">{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div
                      className={`px-3.5 pb-3.5 pt-1 text-[11.5px] leading-relaxed border-t ${
                        isDarkMode
                          ? 'border-emerald-950/60 text-slate-300'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 3: USER'S TICKETS (طلباتي) ================= */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">سجل طلباتك وشكاواك السابقة</span>
              <span className="text-[10px] text-emerald-500 font-bold">
                {userTickets.length} طلب
              </span>
            </div>

            {userTickets.length === 0 ? (
              <div
                className={`p-8 rounded-2xl text-center text-xs border ${
                  isDarkMode
                    ? 'bg-[#12241D] border-emerald-900/40 text-slate-400'
                    : 'bg-white border-slate-200/90 text-slate-400'
                }`}
              >
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30 text-emerald-500" />
                <p className="font-bold">لم تقم بإرسال أي طلبات بعد</p>
                <span className="text-[11px] opacity-70 block mt-1">
                  يمكنك إرسال استفسار أو شكوى من تبويب "تواصل وتذكرة" في أي وقت.
                </span>
              </div>
            ) : (
              userTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-3.5 rounded-2xl border shadow-xs space-y-2 ${
                    isDarkMode ? 'bg-[#12241D] border-emerald-900/50' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">{ticket.auctionTitle}</span>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        ticket.status === 'RESOLVED'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {ticket.status === 'RESOLVED' ? 'تمت المعالجة ✅' : 'قيد المتابعة ⏳'}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {ticket.description}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>رقم التذكرة: {ticket.id}</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString('ar-IQ')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
