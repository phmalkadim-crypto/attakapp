import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { IRAQI_GOVERNORATES } from '../data/constants';
import { store } from '../services/store';
import { X, Smartphone, KeyRound, Check, ShieldCheck, UserCheck } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('07801234567');
  const [otp, setOtp] = useState('1234');
  const [name, setName] = useState('');
  const [governorate, setGovernorate] = useState('بغداد');
  const [area, setArea] = useState('الكرادة');
  const [role, setRole] = useState<UserRole>('trader');
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي صحيح يبدأ بـ 07 ويتكون من 11 رقماً.');
      return;
    }
    setError(null);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') {
      setError('رمز التحقق غير صحيح. الرمز التجريبي هو: 1234');
      return;
    }
    setError(null);

    // Check if user already exists
    const existing = store.getUsers().find((u) => u.phone === phone);
    if (existing) {
      store.setCurrentUser(existing);
      onAuthSuccess(existing);
    } else {
      setStep('profile');
    }
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى كتابة الاسم الكامل.');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      phone,
      governorate,
      area,
      role,
      isVerifiedTrader: role === 'trader',
      rating: 5.0,
      ratingCount: 1,
      totalAuctions: 0,
      totalDeals: 0,
      createdAt: new Date().toISOString(),
    };

    store.updateUser(newUser);
    store.setCurrentUser(newUser);
    onAuthSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">♻️</span>
            <div>
              <h2 className="text-base font-bold text-white">تسجيل الدخول / إنشاء حساب</h2>
              <span className="text-xs text-emerald-400 font-bold">عَتّاك | منصة الخردة العراقية</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* STEP 1: PHONE NUMBER */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  أدخل رقم الهاتف العراقي (أثير، آسيا سيل، كورك):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XXXXXXXXX"
                    className="w-full h-12 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-base font-mono text-left focus:outline-none focus:border-amber-400"
                    dir="ltr"
                  />
                  <Smartphone className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  مثال: 07801234567 أو 07701234567
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>إرسال رمز التحقق (OTP)</span>
              </button>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center pb-2">
                <span className="text-xs text-slate-400 block">تم إرسال رمز التحقق إلى الرقم:</span>
                <span className="font-mono font-bold text-amber-400 text-sm" dir="ltr">
                  {phone}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
                  أدخل رمز التحقق (رمز الاختبار: 1234):
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-12 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xl font-mono text-center tracking-widest focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>تأكيد الرمز والدخول</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-center text-xs text-slate-400 hover:text-white"
              >
                تغيير رقم الهاتف
              </button>
            </form>
          )}

          {/* STEP 3: PROFILE COMPLETION */}
          {step === 'profile' && (
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: علي جبار السعدي"
                  className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المحافظة:</label>
                  <select
                    value={governorate}
                    onChange={(e) => {
                      setGovernorate(e.target.value);
                      const areas = IRAQI_GOVERNORATES[e.target.value] || [];
                      setArea(areas[0] || 'المركز');
                    }}
                    className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-3 text-white text-xs"
                  >
                    {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المنطقة:</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-11 bg-slate-850 border border-slate-700 rounded-xl px-3 text-white text-xs"
                  >
                    {(IRAQI_GOVERNORATES[governorate] || ['المركز']).map((ar) => (
                      <option key={ar} value={ar}>
                        {ar}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  نوع الحساب الأساسي:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'seller' as UserRole, label: '👤 بائع خردة' },
                    { id: 'trader' as UserRole, label: '🏪 تاجر خردة' },
                    { id: 'both' as UserRole, label: '🔄 كلاهما' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        role === r.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-850 text-slate-300 border-slate-850 hover:bg-slate-800'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>حفظ وبدء استخدام عَتّاك</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
