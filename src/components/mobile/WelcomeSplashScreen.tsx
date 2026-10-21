import React, { useState, useEffect } from 'react';

interface WelcomeSplashScreenProps {
  onComplete: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onComplete }) => {
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Fade in the bottom welcome message smoothly after 400ms
    const textTimer = setTimeout(() => {
      setShowWelcomeText(true);
    }, 400);

    // 2. Start smooth fade-out at 1650ms
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1650);

    // 3. Complete and navigate to Login/Register at exactly 2000ms (2 seconds)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer bg-[#05110A] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Full Screen Image: Exact Dark Olive Background, Emblem, and Typography */}
      <img
        src="/assets/aistudio/IMG_________________5470cc79.jpg"
        alt="عَتّاك | Attak - منصة الخردة العراقية"
        className="w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle top & bottom shadow gradients for seamless device status bar blending */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#030D07]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020A05]/95 via-[#020A05]/75 to-transparent pointer-events-none" />

      {/* 2. Elegant Bottom Welcome Message with Smooth Delayed Fade-in */}
      <div
        className={`absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-out ${
          showWelcomeText
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3'
        }`}
      >
        {/* Decorative Golden Accent Line */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400/80" />
        </div>

        {/* Welcome Text */}
        <p
          className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed tracking-wide drop-shadow-lg"
          style={{
            fontFamily: "'Cairo', 'Tajawal', sans-serif",
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.95))',
          }}
        >
          أهلاً بك في منصة <span className="text-amber-400 font-black">عَتّاك</span>
        </p>
        <span className="text-xs sm:text-[13px] font-semibold text-emerald-200/90 mt-0.5 tracking-wider">
          البوابة الأولى لتجارة ومزادات الخردة في العراق 🇮🇶
        </span>

        {/* Minimal Progress Line Indicator */}
        <div className="w-28 h-1 bg-white/15 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 animate-pulse rounded-full w-full" />
        </div>
      </div>
    </div>
  );
};
