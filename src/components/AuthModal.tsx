import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { IRAQI_GOVERNORATES } from '../data/constants';
import { store } from '../services/store';
import { QotiytiEmblem } from './QotiytiLogo';
import {
  X,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  MapPin,
  ShieldCheck,
  Crown,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const ADMIN_PHONE = '07829692579';

interface AuthModalProps {
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'login',
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  // Login Form States
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGovernorate, setRegGovernorate] = useState('بغداد');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Validation Error State
  const [error, setError] = useState<string | null>(null);

  // Clean Iraqi phone helper
  const cleanPhone = (val: string) => val.trim().replace(/\s+/g, '');

  // 1. Handle Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const phone = cleanPhone(loginPhone);
    if (!phone) {
      setError('رقم الهاتف مطلوب لتسجيل الدخول.');
      return;
    }
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي صحيح (مثال: 07801234567).');
      return;
    }
    if (!loginPassword.trim()) {
      setError('كلمة المرور مطلوبة.');
      return;
    }
    if (loginPassword.length < 4) {
      setError('كلمة المرور يجب أن تتكون من 4 خانات على الأقل.');
      return;
    }

    const allUsers = store.getUsers();
    let user = allUsers.find((u) => cleanPhone(u.phone) === phone);

    // If logging in with the designated Admin Phone:
    if (phone === ADMIN_PHONE) {
      if (!user) {
        user = {
          id: 'usr-admin-master',
          name: 'إدارة منصة عَتّاك المركزية',
          phone: ADMIN_PHONE,
          governorate: 'بغداد',
          area: 'المنصور',
          role: 'admin',
          isVerifiedTrader: true,
          rating: 5.0,
          ratingCount: 100,
          totalAuctions: 0,
          totalDeals: 0,
          createdAt: new Date().toISOString(),
        };
        store.updateUser(user);
      } else if (user.role !== 'admin') {
        user = { ...user, role: 'admin', isVerifiedTrader: true };
        store.updateUser(user);
      }
      store.setCurrentUser(user);
      onAuthSuccess(user);
      return;
    }

    // Normal User Login
    if (user) {
      store.setCurrentUser(user);
      onAuthSuccess(user);
    } else {
      // If user doesn't exist, create account smoothly
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: `مستخدم عَتّاك (${phone.slice(-4)})`,
        phone,
        governorate: 'بغداد',
        area: 'المركز',
        role: 'trader',
        isVerifiedTrader: false,
        rating: 5.0,
        ratingCount: 1,
        totalAuctions: 0,
        totalDeals: 0,
        createdAt: new Date().toISOString(),
      };
      store.updateUser(newUser);
      store.setCurrentUser(newUser);
      onAuthSuccess(newUser);
    }
  };

  // 2. Handle Register Submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = regName.trim();
    const phone = cleanPhone(regPhone);

    if (!name) {
      setError('يرجى إدخال الاسم الكامل أو اسم العمل/المكتب.');
      return;
    }
    if (!phone) {
      setError('رقم الهاتف مطلوب للتواصل.');
      return;
    }
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي صحيح يبدأ بـ 07 ويتكون من 11 رقماً.');
      return;
    }
    if (!regPassword) {
      setError('كلمة المرور مطلوبة.');
      return;
    }
    if (regPassword.length < 4) {
      setError('يجب ألا تقل كلمة المرور عن 4 خانات.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('كلمة المرور غير مطابقة. يرجى إعادة التأكد من كتابتها.');
      return;
    }

    // Determine Role: If phone is the Admin phone, grant admin role immediately
    const isAdmin = phone === ADMIN_PHONE;
    const assignedRole: UserRole = isAdmin ? 'admin' : 'trader';

    const newUser: User = {
      id: isAdmin ? 'usr-admin-master' : `usr-${Date.now()}`,
      name,
      phone,
      governorate: regGovernorate,
      area: 'المركز',
      role: assignedRole,
      isVerifiedTrader: isAdmin,
      rating: 5.0,
      ratingCount: isAdmin ? 100 : 1,
      totalAuctions: 0,
      totalDeals: 0,
      createdAt: new Date().toISOString(),
    };

    store.updateUser(newUser);
    store.setCurrentUser(newUser);
    onAuthSuccess(newUser);
  };

  // 3. Handle Forgot Password
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = cleanPhone(forgotPasswordPhone);
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي مسجل يبدأ بـ 07.');
      return;
    }
    setError(null);
    setForgotPasswordSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right selection:bg-amber-500 selection:text-slate-950">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <QotiytiEmblem size={40} />
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span>عَتّاك</span>
                <span className="text-[10px] font-sans font-bold bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  Attak
                </span>
              </h2>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                منصة الخردة العراقية
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-700 active:scale-95"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {!showForgotPassword && (
          <div className="grid grid-cols-2 p-1.5 m-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#F5A524] text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#F5A524] text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              إنشاء حساب جديد
            </button>
          </div>
        )}

        <div className="px-5 pb-6 pt-1">
          {/* Error Alert Box */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 shadow-sm animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* ---------------- 1. LOGIN MODE ---------------- */}
          {mode === 'login' && !showForgotPassword && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الهاتف:
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="07XXXXXXXXX"
                    className="w-full h-12 bg-slate-950 border border-slate-700 rounded-2xl pr-11 pl-4 text-white text-sm font-mono text-left focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                    dir="ltr"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                </div>
                <span className="text-[10.5px] text-slate-400 block mt-1">
                  مثال: 07801234567
                </span>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    كلمة المرور:
                  </label>
                  {/* Forgot Password Link */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setForgotPasswordPhone(loginPhone);
                      setError(null);
                    }}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 bg-slate-950 border border-slate-700 rounded-2xl pr-11 pl-11 text-white text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left"
                    dir="ltr"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white absolute left-2 cursor-pointer transition-colors"
                    title={showLoginPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Main Submit Button: Orange "دخول" */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer mt-2"
              >
                <span>دخول</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Switch to Register link */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">ليس لديك حساب؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </form>
          )}

          {/* ---------------- 2. REGISTER MODE ---------------- */}
          {mode === 'register' && !showForgotPassword && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Full Name / Business Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الاسم الكامل أو اسم العمل / المكتب:
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="مثال: حيدر السعدي لتجارة الخردة"
                    className="w-full h-11 bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الهاتف للتواصل:
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="07XXXXXXXXX"
                    className="w-full h-11 bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm font-mono text-left focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                    dir="ltr"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Province / Governorate Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  المحافظة:
                </label>
                <div className="relative flex items-center">
                  <select
                    value={regGovernorate}
                    onChange={(e) => setRegGovernorate(e.target.value)}
                    className="w-full h-11 bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
                  >
                    {Object.keys(IRAQI_GOVERNORATES).map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كلمة المرور:
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left"
                    dir="ltr"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white absolute left-2 cursor-pointer transition-colors"
                  >
                    {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  تأكيد كلمة المرور:
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showRegConfirmPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left"
                    dir="ltr"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white absolute left-2 cursor-pointer transition-colors"
                  >
                    {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Main Submit Button: Orange "إنشاء الحساب" */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer mt-3"
              >
                <span>إنشاء الحساب</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              {/* Switch to Login link */}
              <div className="text-center pt-1.5">
                <span className="text-xs text-slate-400">لديك حساب بالفعل؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
          )}

          {/* ---------------- 3. FORGOT PASSWORD VIEW ---------------- */}
          {showForgotPassword && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordSuccess(false);
                    setError(null);
                  }}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-black text-white">استعادة كلمة المرور</h3>
              </div>

              {forgotPasswordSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>تم إرسال رابط ورمز التحقق بنجاح!</span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed">
                    تم إرسال رسالة SMS تحتوي على رمز إعادة التعيين إلى هاتفك ({forgotPasswordPhone}).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordSuccess(false);
                    }}
                    className="w-full mt-2 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    العودة لتسجيل الدخول
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    أدخل رقم هاتفك المسجل وسنرسل لك رمزاً للتحقق واستعادة كلمة المرور عبر SMS:
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      رقم الهاتف:
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        required
                        value={forgotPasswordPhone}
                        onChange={(e) => setForgotPasswordPhone(e.target.value)}
                        placeholder="07XXXXXXXXX"
                        className="w-full h-12 bg-slate-950 border border-slate-700 rounded-2xl pr-11 pl-4 text-white text-sm font-mono text-left focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                        dir="ltr"
                      />
                      <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    إرسال رمز الاستعادة
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
