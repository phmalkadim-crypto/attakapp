import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { IRAQI_GOVERNORATES } from '../../data/constants';
import { store } from '../../services/store';
import { QotiytiEmblem } from '../QotiytiLogo';
import {
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const ADMIN_PHONE = '07829692579';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onAuthSuccess: (user: User) => void;
  onEnterGuest?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGovernorate, setRegGovernorate] = useState('بغداد');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const cleanPhone = (val: string) => val.trim().replace(/\s+/g, '');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const phone = cleanPhone(loginPhone);
    if (!phone) {
      setError('يرجى إدخال رقم الهاتف.');
      return;
    }
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي يبدأ بـ 07 ويتكون من 11 رقماً.');
      return;
    }
    if (!loginPassword.trim()) {
      setError('يرجى إدخال كلمة المرور.');
      return;
    }
    if (loginPassword.length < 4) {
      setError('كلمة المرور يجب أن تتكون من 4 خانات على الأقل.');
      return;
    }

    const allUsers = store.getUsers();
    let user = allUsers.find((u) => cleanPhone(u.phone) === phone);

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

    if (user) {
      store.setCurrentUser(user);
      onAuthSuccess(user);
    } else {
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = regName.trim();
    const phone = cleanPhone(regPhone);

    if (!name) {
      setError('الاسم الكامل أو اسم العمل / المكتب مطلوب.');
      return;
    }
    if (!phone) {
      setError('رقم الهاتف للتواصل مطلوب.');
      return;
    }
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي يبدأ بـ 07 ويتكون من 11 رقماً.');
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

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = cleanPhone(forgotPasswordPhone);
    if (!phone.startsWith('07') || phone.length < 10) {
      setError('يرجى إدخال رقم هاتف عراقي يبدأ بـ 07.');
      return;
    }
    setError(null);
    setForgotPasswordSuccess(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#061A12] text-white select-none selection:bg-amber-500 selection:text-slate-950">
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-6 max-w-md w-full mx-auto">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center mb-6 pt-2">
          <div className="filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] mb-2.5">
            <QotiytiEmblem size={84} />
          </div>

          <h1
            className="text-4xl font-black text-white leading-tight tracking-tight select-none"
            style={{
              fontFamily: "'Cairo', 'Tajawal', sans-serif",
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.95))',
            }}
          >
            عَتّاك
          </h1>
          <span className="text-base font-black tracking-wide text-white/95 font-sans drop-shadow-md">
            Attak
          </span>
          <p className="text-xs font-bold text-emerald-200/90 mt-1">
            منصة الخردة العراقية
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        {!showForgotPassword && (
          <div className="grid grid-cols-2 p-1.5 mb-5 bg-slate-950/80 border border-emerald-950/80 rounded-2xl shadow-inner">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#F5A524] text-slate-950 shadow-md shadow-amber-500/20'
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
              className={`py-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#F5A524] text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              إنشاء حساب جديد
            </button>
          </div>
        )}

        {/* Validation Error Message Box */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2.5 shadow-sm animate-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="leading-relaxed font-bold">{error}</span>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && !showForgotPassword && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                رقم الهاتف:
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="07XXXXXXXXX"
                  className="w-full h-12 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-11 pl-4 text-white text-sm font-mono text-left focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 shadow-inner"
                  dir="ltr"
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-200">
                  كلمة المرور:
                </label>
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
                  className="w-full h-12 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-11 pl-11 text-white text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left shadow-inner"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white absolute left-2 cursor-pointer transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer mt-5"
            >
              <span>دخول</span>
              <ArrowRight className="w-4 h-4" />
            </button>

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

        {/* 2. REGISTER FORM */}
        {mode === 'register' && !showForgotPassword && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                الاسم الكامل أو اسم العمل / المكتب:
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="مثال: حيدر السعدي لتجارة الخردة"
                  className="w-full h-11 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 shadow-inner"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                رقم الهاتف للتواصل:
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="07XXXXXXXXX"
                  className="w-full h-11 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm font-mono text-left focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 shadow-inner"
                  dir="ltr"
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                المحافظة:
              </label>
              <div className="relative flex items-center">
                <select
                  value={regGovernorate}
                  onChange={(e) => setRegGovernorate(e.target.value)}
                  className="w-full h-11 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-10 pl-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer shadow-inner"
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

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                كلمة المرور:
              </label>
              <div className="relative flex items-center">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-10 pl-10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left shadow-inner"
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

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                تأكيد كلمة المرور:
              </label>
              <div className="relative flex items-center">
                <input
                  type={showRegConfirmPassword ? 'text' : 'password'}
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 bg-slate-950/90 border border-slate-700/80 rounded-2xl pr-10 pl-10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 text-left shadow-inner"
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

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer mt-4"
            >
              <span>إنشاء الحساب</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

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

        {/* 3. FORGOT PASSWORD */}
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
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <h3 className="text-sm font-black text-white">استعادة كلمة المرور</h3>
            </div>

            {forgotPasswordSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تم إرسال رمز التحقق بنجاح!</span>
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
                  className="w-full mt-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
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
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
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
  );
};
