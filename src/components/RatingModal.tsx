import React, { useState } from 'react';
import { Auction, User } from '../types';
import { store } from '../services/store';
import { X, Star, Check } from 'lucide-react';

interface RatingModalProps {
  auction: Auction;
  currentUser: User;
  onClose: () => void;
  onRatingSubmitted: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  auction,
  currentUser,
  onClose,
  onRatingSubmitted,
}) => {
  const [stars, setStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['تعامل جيد', 'ملتزم']);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const targetUserId =
    currentUser.id === auction.sellerId ? (auction.winnerId || '') : auction.sellerId;
  const targetUserName =
    currentUser.id === auction.sellerId ? (auction.winnerName || 'التاجر') : auction.sellerName;

  const availableTags = [
    'تعامل جيد',
    'ملتزم بالمواعيد',
    'سريع بالتواصل',
    'جاد ومحترف',
    'دقيق في الوزن والقبان',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addRating({
      auctionId: auction.id,
      fromUserId: currentUser.id,
      toUserId: targetUserId,
      stars,
      tags: selectedTags,
      comment: comment.trim() || undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      onRatingSubmitted();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <h2 className="text-base font-bold text-white">تقييم الصفقة والطرف الآخر</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-white">شكراً لك! تم تسجيل التقييم بنجاح</h3>
              <p className="text-xs text-slate-400">يساعد تقييمك في بناء مجتمع تجار موثوق في عَتّاك.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center pb-2">
                <span className="text-xs text-slate-400 block mb-1">تقييمك لـ:</span>
                <span className="font-bold text-white text-base">{targetUserName}</span>
              </div>

              {/* Star selection */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(s)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        s <= stars
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 hover:text-slate-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Tag Badges */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  اختر انطباعك عن المعاملة:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-slate-850 border-slate-750 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Comment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ملاحظة إضافية (اختياري):
                </label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب ملاحظة مختصرة عن التزام الطرف الآخر..."
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20"
              >
                إرسال التقييم
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
