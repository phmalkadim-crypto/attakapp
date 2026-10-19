import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const activeCategories = categories.filter((c) => c.isActive);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <span>أقسام الخردة المتاحة</span>
          <span className="text-[11px] text-slate-400 font-normal">
            (اختر القسم للتصفية المباشرة)
          </span>
        </h2>
        {selectedCategoryId && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            عرض الكل
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* All categories pill */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
            selectedCategoryId === null
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <span>🔥</span>
          <span>كل الخردة</span>
        </button>

        {activeCategories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/10 font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0"
                />
              ) : (
                <span className="text-base">{cat.icon}</span>
              )}
              <span>{cat.nameAr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
