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
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="emeraldArc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#0B3022" />
          </linearGradient>

          <radialGradient id="innerGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#124A35" />
            <stop offset="80%" stopColor="#0B3022" />
            <stop offset="100%" stopColor="#04140E" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="47" stroke="url(#goldRim)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="44.5" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="50" cy="50" r="43.5" fill="url(#innerGlow)" />

        {/* Recycling Arcs */}
        <path d="M 50 12 A 38 38 0 0 1 85 42" stroke="url(#emeraldArc)" strokeWidth="5.5" strokeLinecap="round" />
        <polygon points="86,34 93,43 83,48" fill="#34D399" />

        <path d="M 85 58 A 38 38 0 0 1 38 86" stroke="url(#goldRim)" strokeWidth="5.5" strokeLinecap="round" />
        <polygon points="42,91 32,87 40,79" fill="#D4AF37" />

        <path d="M 22 70 A 38 38 0 0 1 29 25" stroke="url(#emeraldArc)" strokeWidth="5.5" strokeLinecap="round" />
        <polygon points="34,22 28,13 21,24" fill="#34D399" />

        {/* Center Auction Hammer */}
        <g transform="translate(24, 23) scale(0.53) rotate(-22 50 50)">
          <path d="M 28 25 L 72 25 L 76 43 L 24 43 Z" fill="url(#goldRim)" stroke="#D4AF37" strokeWidth="2.5" />
          <path d="M 44 43 L 44 88 A 6 6 0 0 0 56 88 L 56 43 Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
          <rect x="44" y="60" width="12" height="4" fill="#061D14" rx="1" />
          <rect x="44" y="70" width="12" height="4" fill="#061D14" rx="1" />
          <rect x="44" y="80" width="12" height="4" fill="#061D14" rx="1" />
        </g>
      </svg>
    </div>
  );
};

export const AttakEmblem = QotiytiEmblem;
