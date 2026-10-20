import React from 'react';
import { QotiytiEmblem } from '../QotiytiLogo';
import { SCRAP_IMAGES } from '../../data/constants';
import { MobileStatusBar } from './MobileStatusBar';

interface SplashScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onEnterGuest?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onLogin,
  onRegister,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#07130D] text-white select-none">
      {/* Background with compressed cans and dark industrial warehouse overlay matching screenshot */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={SCRAP_IMAGES.hero}
          alt="عَتّاك - منصة الخردة العراقية"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-125 saturate-[1.1] scale-105"
        />
        {/* Cinematic dark moody gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04110A]/85 via-[#030D08]/65 to-[#020A06]/95" />
      </div>

      {/* Top Safe Area Spacing */}
      <MobileStatusBar darkTheme={true} />

      {/* Center Brand Identity matching the user's uploaded image with emblem, عَتّاك | Attak and منصة الخردة العراقية */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 my-auto pt-6">
        {/* Prominent circular emblem with gold rim, recycling arrows and auction gavel */}
        <div className="filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] transform hover:scale-105 transition-transform duration-300">
          <QotiytiEmblem size={124} />
        </div>

        {/* Brand Name: عَتّاك */}
        <h1
          className="text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight mt-4 select-none"
          style={{
            fontFamily: "'Cairo', 'Tajawal', sans-serif",
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.95))',
          }}
        >
          عَتّاك
        </h1>

        {/* Subtitle: Attak */}
        <span className="text-xl sm:text-2xl font-black tracking-wide text-white/95 font-sans mt-1 drop-shadow-md select-none">
          Attak
        </span>

        {/* Tagline: منصة الخردة العراقية */}
        <p
          className="text-base sm:text-lg font-bold text-white/90 mt-2.5 select-none tracking-wide"
          style={{
            fontFamily: "'Cairo', 'Tajawal', sans-serif",
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))',
          }}
        >
          منصة الخردة العراقية
        </p>
      </div>

      {/* Bottom Action Buttons matching the uploaded screenshot pill styling */}
      <div className="relative z-10 px-6 space-y-3.5 pb-10 max-w-md w-full mx-auto">
        {/* Button 1: Solid Vibrant Orange-Gold Pill */}
        <button
          onClick={onLogin}
          className="w-full h-14 rounded-full bg-[#F5A524] hover:bg-[#E0941D] text-slate-950 font-black text-base flex items-center justify-center shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          تسجيل الدخول
        </button>

        {/* Button 2: Transparent with white outline Pill */}
        <button
          onClick={onRegister}
          className="w-full h-14 rounded-full bg-transparent border border-white/80 hover:bg-white/10 text-white font-bold text-base flex items-center justify-center active:scale-[0.98] transition-all cursor-pointer"
        >
          إنشاء حساب جديد
        </button>
      </div>
    </div>
  );
};
