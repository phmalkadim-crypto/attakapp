import React from 'react';

interface QotiytiEmblemProps {
  size?: number;
  className?: string;
}

export const QotiytiEmblem: React.FC<QotiytiEmblemProps> = ({
  size = 54,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer gold-emerald gradient */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Emerald arc gradient */}
          <linearGradient id="emeraldArc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Amber arc gradient */}
          <linearGradient id="amberArc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Inner background radial */}
          <radialGradient id="innerGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#0F382A" />
            <stop offset="80%" stopColor="#061D14" />
            <stop offset="100%" stopColor="#03110C" />
          </radialGradient>
        </defs>

        {/* Golden Outer Decorative Ring */}
        <circle cx="50" cy="50" r="47" stroke="url(#goldRim)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="44.5" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />

        {/* Deep Forest Green Base */}
        <circle cx="50" cy="50" r="43.5" fill="url(#innerGlow)" />

        {/* 3 Recycling Curved Arrows (Continuous Eco Loop) */}
        {/* Arrow 1: Emerald Top-Right Arc */}
        <path
          d="M 50 12 A 38 38 0 0 1 85 42"
          stroke="url(#emeraldArc)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="86,34 93,43 83,48" fill="#34D399" />

        {/* Arrow 2: Gold Bottom Arc */}
        <path
          d="M 85 58 A 38 38 0 0 1 38 86"
          stroke="url(#amberArc)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="42,91 32,87 40,79" fill="#FBBF24" />

        {/* Arrow 3: Emerald Left Arc */}
        <path
          d="M 22 70 A 38 38 0 0 1 29 25"
          stroke="url(#emeraldArc)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="34,22 28,13 21,24" fill="#34D399" />

        {/* Centered Scrap Auction Hammer & Aluminum Can Icon */}
        <g transform="translate(24, 23) scale(0.53) rotate(-22 50 50)">
          {/* Hammer Head in Rich Metallic Gold */}
          <path
            d="M 28 25 L 72 25 L 76 43 L 24 43 Z"
            fill="url(#goldRim)"
            stroke="#F59E0B"
            strokeWidth="2.5"
          />
          <path d="M 24 30 L 28 25 L 28 43 L 24 43 Z" fill="#92400E" />
          <path d="M 72 25 L 76 43 L 73 45 L 68 27 Z" fill="#FEF3C7" />

          {/* Hammer Handle in Steel Finish */}
          <path
            d="M 44 43 L 44 88 A 6 6 0 0 0 56 88 L 56 43 Z"
            fill="#F3F4F6"
            stroke="#D1D5DB"
            strokeWidth="2"
          />
          {/* Grip Rings */}
          <rect x="44" y="60" width="12" height="4" fill="#061D14" rx="1" />
          <rect x="44" y="70" width="12" height="4" fill="#061D14" rx="1" />
          <rect x="44" y="80" width="12" height="4" fill="#061D14" rx="1" />

          {/* Center Star / Gavel Impact spark */}
          <circle cx="50" cy="34" r="3" fill="#FFFBEB" />
        </g>
      </svg>
    </div>
  );
};

interface QotiytiLogoProps {
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  lightText?: boolean;
  centered?: boolean;
}

export const QotiytiLogo: React.FC<QotiytiLogoProps> = ({
  size = 60,
  showText = true,
  showTagline = true,
  centered = true,
}) => {
  return (
    <div
      className={`flex flex-col ${
        centered ? 'items-center justify-center text-center' : 'items-start text-right'
      } select-none`}
    >
      {/* 1. Circular Recycling Arrow with Hammer & Can Emblem */}
      <QotiytiEmblem size={size} />

      {/* 2. Brand Name: عَتّاك | Attak in Authentic Centered Styling */}
      {showText && (
        <div className="mt-1 flex flex-col items-center justify-center">
          {/* Main Name: عَتّاك in Cairo Black 900 with Golden 3D Shimmer */}
          <span
            className="text-3xl sm:text-4xl font-black tracking-tight leading-tight select-none bg-gradient-to-b from-white via-amber-100 to-amber-400 bg-clip-text text-transparent"
            style={{
              fontFamily: "'Cairo', 'Tajawal', sans-serif",
              filter:
                'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.85)) drop-shadow(0 1px 1px rgba(0,0,0,0.95))',
              WebkitTextStroke: '0.5px rgba(255, 235, 170, 0.35)',
            }}
          >
            عَتّاك
          </span>

          {/* Subtitle: Attak */}
          <span className="text-xs sm:text-sm font-black tracking-widest text-slate-100 drop-shadow-md -mt-0.5 font-sans">
            Attak
          </span>

          {/* Sub-tagline */}
          {showTagline && (
            <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-200">
              <span>منصة الخردة العراقية</span>
              <span>🇮🇶</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AttakLogo = QotiytiLogo;
export const AttakEmblem = QotiytiEmblem;
