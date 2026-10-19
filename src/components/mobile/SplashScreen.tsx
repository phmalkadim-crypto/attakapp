import React from 'react';
import { QotiytiEmblem } from '../QotiytiLogo';
import { SCRAP_IMAGES } from '../../data/constants';
import { MobileStatusBar } from './MobileStatusBar';

interface SplashScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onEnterGuest: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onLogin,
  onRegister,
  onEnterGuest,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A1612] text-white select-none">
      {/* Background with compressed cans and dark industrial overlay matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={SCRAP_IMAGES.cans}
          alt="خردة معادن"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05140E] via-[#05140E]/85 to-[#082017]/75" />
      </div>

      {/* Top Status Bar */}
      <MobileStatusBar darkTheme={true} />

      {/* Center Brand Identity matching the user's uploaded image with عَتّاك | Attak and منصة الخردة العراقية */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 my-auto">
        <QotiytiEmblem size={92} />

        {/* Brand Name: عَتّاك */}
        <h1
          className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mt-3 select-none"
          style={{
            fontFamily: "'Cairo', 'Tajawal', sans-serif",
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.85))',
          }}
        >
          عَتّاك
        </h1>

        {/* Subtitle: Attak */}
        <span className="text-lg font-black tracking-wider text-white/95 font-sans -mt-0.5 drop-shadow-md">
          Attak
        </span>

        {/* Tagline: منصة الخردة العراقية (بدل بيع خردتك بأعلى سعر) */}
        <p
          className="text-sm font-bold text-slate-100 mt-2 select-none tracking-wide"
          style={{
            fontFamily: "'Cairo', 'Tajawal', sans-serif",
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.85))',
          }}
        >
          منصة الخردة العراقية
        </p>
      </div>

      {/* Bottom Action Buttons matching screenshot pill rounded-full styling */}
      <div className="relative z-10 p-6 space-y-3 pb-8">
        <button
          onClick={onLogin}
          className="w-full h-12 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          تسجيل الدخول
        </button>

        <button
          onClick={onRegister}
          className="w-full h-12 rounded-full bg-transparent border border-white/80 hover:bg-white/10 text-white font-bold text-sm flex items-center justify-center active:scale-[0.98] transition-all cursor-pointer"
        >
          إنشاء حساب جديد
        </button>

        <button
          onClick={onEnterGuest}
          className="w-full text-center text-xs text-slate-400 hover:text-white pt-1 transition-colors cursor-pointer"
        >
          تصفح التطبيق كزائر
        </button>

        {/* iPhone Home Indicator */}
        <div className="pt-2">
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
};
