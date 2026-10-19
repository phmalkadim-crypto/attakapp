import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';

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
  pullText = 'اسحب لتحديث المزادات...',
  refreshingText = 'جاري جلب أحدث المزادات والأسعار...',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const isDraggingRef = useRef(false);

  const PULL_THRESHOLD = 70;
  const MAX_PULL = 110;

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
        // Apply resistance curve
        const distance = Math.min(diff * 0.45, MAX_PULL);
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
      setPullDistance(56); // Hold at indicator height while refreshing

      try {
        await Promise.resolve(onRefresh());
        // Minimum spinner dwell for tactile feel
        await new Promise((resolve) => setTimeout(resolve, 600));
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
      className={`relative overflow-y-auto no-scrollbar ${className}`}
    >
      {/* Pull Indicator Drawer */}
      <div
        className="w-full flex items-center justify-center pointer-events-none transition-all duration-200 select-none overflow-hidden"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 10 ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/95 border border-slate-200 shadow-md text-emerald-800 text-xs font-bold">
          {isRefreshing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
              <span>{refreshingText}</span>
            </>
          ) : (
            <>
              <ArrowDown
                className="w-4 h-4 text-emerald-700 transition-transform duration-200"
                style={{
                  transform: `rotate(${pullPercentage >= 1 ? 180 : 0}deg)`,
                }}
              />
              <span>
                {pullPercentage >= 1 ? 'أفلت للتحديث الآن ⚡' : pullText}
              </span>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
