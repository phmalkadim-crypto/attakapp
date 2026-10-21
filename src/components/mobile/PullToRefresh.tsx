import React, { useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  pullText?: string;
  refreshingText?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  className = '',
  pullText = 'اسحب لتحديث المزادات',
  refreshingText = 'جاري تحديث الأسعار والمزادات...',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const isDraggingRef = useRef(false);

  const PULL_THRESHOLD = 65;
  const MAX_PULL = 95;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isRefreshing) return;
    const container = containerRef.current;
    if (container && container.scrollTop <= 0) {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setStartY(clientY);
      isDraggingRef.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current || isRefreshing) return;
    const container = containerRef.current;
    if (container && container.scrollTop <= 0) {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const diff = clientY - startY;
      if (diff > 0) {
        const distance = Math.min(diff * 0.42, MAX_PULL);
        setPullDistance(distance);
        if (e.cancelable) {
          e.preventDefault();
        }
      } else {
        setPullDistance(0);
        isDraggingRef.current = false;
      }
    } else {
      isDraggingRef.current = false;
      setPullDistance(0);
    }
  };

  const handleTouchEnd = async () => {
    if (!isDraggingRef.current || isRefreshing) return;
    isDraggingRef.current = false;

    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(52);

      try {
        await Promise.resolve(onRefresh());
        await new Promise((resolve) => setTimeout(resolve, 650));
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  const pullPercentage = Math.min(pullDistance / PULL_THRESHOLD, 1);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      style={{
        overscrollBehaviorY: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
      className={`relative overflow-y-auto no-scrollbar ${className}`}
    >
      <div
        className="w-full flex items-center justify-center pointer-events-none transition-all duration-200 select-none overflow-hidden z-30"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 8 ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white dark:bg-[#062016] border-2 border-amber-400 shadow-xl text-emerald-800 dark:text-emerald-300 text-xs font-black transition-transform">
          {isRefreshing ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-amber-400 animate-spin" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-amber-200">
                {refreshingText}
              </span>
            </>
          ) : (
            <>
              <div
                className="w-5 h-5 rounded-full bg-emerald-700 text-amber-400 flex items-center justify-center transition-transform duration-200 shadow-xs"
                style={{
                  transform: `rotate(${pullPercentage >= 1 ? 180 : 0}deg)`,
                }}
              >
                <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                {pullPercentage >= 1 ? 'أفلت للتحديث المباشر ⚡' : pullText}
              </span>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
