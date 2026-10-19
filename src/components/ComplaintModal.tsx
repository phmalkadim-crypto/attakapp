import React, { useState } from 'react';
import { Auction, ComplaintType, User } from '../types';
import { store } from '../services/store';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ComplaintModalProps {
  auction: Auction;
  currentUser: User;
  onClose: () => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  auction,
  currentUser,
  onClose,
}) => {
  const [complaintType, setComplaintType] = useState<ComplaintType>('مشكلة في الوزن');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const againstUserId =
    currentUser.id === auction.sellerId ? (auction.winnerId || '') : auction.sellerId;
  const againstUserName =
    currentUser.id === auction.sellerId ? (auction.winnerName || 'التاجر') : auction.sellerName;

  const complaintOptions: ComplaintType[] = [
    'مشكلة مع التاجر',
    'مشكلة مع البائع',
    'لم يتم الاستلام',
    'مشكلة في الوزن',
    'مشكلة في الدفع',
    'أخرى',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    store.addComplaint({
      auctionId: auction.id,
      auctionTitle: auction.title,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      againstUserId,
      againstUserName,
      type: complaintType,
      description: description.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-bold text-white">تقديم شكوى رسمية للإدارة</h2>
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
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">تم استلام الشكوى بنجاح</h3>
              <p className="text-xs text-slate-400">
                سيقوم فريق إدارة عَتّاك بمراجعة التفاصيل والتواصل معك لحل الإشكال.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-0.5">المزاد المعني:</span>
                <span className="font-bold text-white block">{auction.title}</span>
                <span className="text-slate-400 text-[11px]">الطرف الآخر: {againstUserName}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  نوع المشكلة:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {complaintOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setComplaintType(opt)}
                      className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                        complaintType === opt
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                          : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  شرح وتفاصيل الشكوى:
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح المشكلة بالتفصيل، مثلاً اختلاف الوزن عند القبان أو عدم الحضور..."
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-600/20"
              >
                إرسال الشكوى للإدارة
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
