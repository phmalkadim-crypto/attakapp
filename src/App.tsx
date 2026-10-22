import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Home, 
  Trophy, 
  Plus, 
  Headphones, 
  User as UserIcon, 
  Moon, 
  Sun, 
  Bell, 
  MapPin, 
  Scale, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  CreditCard, 
  Phone, 
  ChevronDown, 
  Maximize2,
  Minimize2,
  RotateCw,
  Gavel,
  X,
  MessageCircle,
  HelpCircle,
  Wallet,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Send,
  Check
} from 'lucide-react';

interface CategoryCard {
  id: string;
  name: string;
  countBadge?: string;
  image: string;
}

interface BidRecord {
  id: string;
  bidderName: string;
  amountPerKg: number;
  timeAgo: string;
}

interface AuctionItem {
  id: string;
  category: string;
  title: string;
  approxWeight: string;
  approxWeightKg: number;
  pricePerKg: number;
  startingPrice: number;
  totalEstimated: number;
  bidsCount: number;
  governorate: string;
  area: string;
  timeLeft: string;
  secondsRemaining: number;
  image: string;
  sellerPhone: string;
  sellerName: string;
  isPaid: boolean;
  bidsHistory: BidRecord[];
  notes?: string;
}

interface AppNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
  type: 'bid' | 'win' | 'payment' | 'new';
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'cans',
    name: 'قواطي',
    countBadge: '1 مزاد',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'copper',
    name: 'نحاس',
    countBadge: '1 مزاد',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'iron',
    name: 'حديد',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'aluminum',
    name: 'ألمنيوم',
    countBadge: '1 مزاد',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'batteries',
    name: 'بطاريات',
    countBadge: '1 مزاد',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'other',
    name: 'أخرى',
    countBadge: '1 مزاد',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
  },
];

const INITIAL_AUCTIONS: AuctionItem[] = [
  {
    id: '1',
    category: 'قواطي ألمنيوم',
    title: 'قواطي ألمنيوم مشروبات غازية مكبوسة...',
    approxWeight: '50 كغم تقريباً',
    approxWeightKg: 50,
    startingPrice: 1500,
    pricePerKg: 1700,
    totalEstimated: 85000,
    bidsCount: 3,
    governorate: 'الديوانية',
    area: 'مركز الديوانية',
    timeLeft: '01:17:55',
    secondsRemaining: 4675,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07801234567',
    sellerName: 'أبو أحمد البديري',
    isPaid: false,
    notes: 'خردة قواطي بيبسي وسفن مكبوسة بالات نظيفة خالية من الشوائب والتراب.',
    bidsHistory: [
      { id: 'b1', bidderName: 'حيدر الكعبي', amountPerKg: 1700, timeAgo: 'منذ دقيقة' },
      { id: 'b2', bidderName: 'شركة بابل للسكراب', amountPerKg: 1650, timeAgo: 'منذ 10 دقائق' },
      { id: 'b3', bidderName: 'أبو مصطفى', amountPerKg: 1550, timeAgo: 'منذ 25 دقيقة' },
    ],
  },
  {
    id: '2',
    category: 'نحاس',
    title: 'كابلات نحاس أحمر صافي مقشر من مشاريع كهرباء',
    approxWeight: '120 كغم تقريباً',
    approxWeightKg: 120,
    startingPrice: 11000,
    pricePerKg: 12200,
    totalEstimated: 1464000,
    bidsCount: 4,
    governorate: 'بغداد',
    area: 'الشورجة',
    timeLeft: '03:42:10',
    secondsRemaining: 13330,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07709876543',
    sellerName: 'سعد العزاوي',
    isPaid: false,
    notes: 'نحاس كابلات ضغط عالي مقشر ونظيف درجة أولى بضاعة مضمونة.',
    bidsHistory: [
      { id: 'b4', bidderName: 'معمل دجلة للصهر', amountPerKg: 12200, timeAgo: 'منذ 4 دقائق' },
      { id: 'b5', bidderName: 'حيدر الكعبي', amountPerKg: 12000, timeAgo: 'منذ 18 دقيقة' },
    ],
  },
  {
    id: '3',
    category: 'حديد',
    title: 'حديد هياكل إنشائية وشيلمان وزوايا ثقيلة',
    approxWeight: '1500 كغم تقريباً',
    approxWeightKg: 1500,
    startingPrice: 420,
    pricePerKg: 480,
    totalEstimated: 720000,
    bidsCount: 2,
    governorate: 'البصرة',
    area: 'الزبير',
    timeLeft: '05:10:00',
    secondsRemaining: 18600,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07812345678',
    sellerName: 'جاسم التميمي',
    isPaid: false,
    notes: 'حديد شيلمان مقصوص أطوال 3 أمتار جاهز للتحميل والوزن بالقبان.',
    bidsHistory: [
      { id: 'b6', bidderName: 'المقاول علي البصري', amountPerKg: 480, timeAgo: 'منذ ساعة' },
    ],
  },
  {
    id: '4',
    category: 'ألمنيوم',
    title: 'ألمنيوم بروفايلات وشبابيك قديمة مقطعة',
    approxWeight: '250 كغم تقريباً',
    approxWeightKg: 250,
    startingPrice: 3200,
    pricePerKg: 3600,
    totalEstimated: 900000,
    bidsCount: 3,
    governorate: 'بغداد',
    area: 'الكرادة',
    timeLeft: '04:15:20',
    secondsRemaining: 15320,
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07711223344',
    sellerName: 'أبو كرار',
    isPaid: false,
    notes: 'ألمنيوم أبيض وفضي نظيف خالي من الحديد والبراغي.',
    bidsHistory: [
      { id: 'b7', bidderName: 'حيدر الكعبي', amountPerKg: 3600, timeAgo: 'منذ 30 دقيقة' },
    ],
  },
  {
    id: '5',
    category: 'بطاريات',
    title: 'سكراب بطاريات سيارات وشاحنات تالفة (رصاص)',
    approxWeight: '800 كغم تقريباً',
    approxWeightKg: 800,
    startingPrice: 850,
    pricePerKg: 950,
    totalEstimated: 760000,
    bidsCount: 5,
    governorate: 'النجف',
    area: 'طريق كربلاء',
    timeLeft: '02:05:30',
    secondsRemaining: 7530,
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07733445566',
    sellerName: 'حسين الخزرجي',
    isPaid: false,
    notes: 'بطاريات جافة وسائل حمضية سليمة غير مكسورة جاهزة للنقل والتفريغ.',
    bidsHistory: [
      { id: 'b8', bidderName: 'شركة الرصاص الذهبي', amountPerKg: 950, timeAgo: 'منذ 5 دقائق' },
    ],
  },
  {
    id: '6',
    category: 'أخرى',
    title: 'سكراب مواسير بلاستيك صناعي ومخلفات ورش',
    approxWeight: '600 كغم تقريباً',
    approxWeightKg: 600,
    startingPrice: 200,
    pricePerKg: 280,
    totalEstimated: 168000,
    bidsCount: 2,
    governorate: 'الديوانية',
    area: 'الصناعية الجديدة',
    timeLeft: '06:30:00',
    secondsRemaining: 23400,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    sellerPhone: '07809988776',
    sellerName: 'فاضل الحمزاوي',
    isPaid: false,
    notes: 'بلاستيك صناعي مفرز ومعبأ بأكياس خيش كبيرة.',
    bidsHistory: [
      { id: 'b9', bidderName: 'معمل تدوير الفرات', amountPerKg: 280, timeAgo: 'منذ ساعتين' },
    ],
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'مزايدة جديدة على قواطي ألمنيوم! 🔥',
    desc: 'رفع التاجر حيدر الكعبي السعر إلى 1,700 د.ع/كغم في الديوانية.',
    time: 'منذ 2 دقيقة',
    isRead: false,
    type: 'bid',
  },
  {
    id: 'n2',
    title: 'مبروك! فوز بمزاد كابلات نحاس 🏆',
    desc: 'انتهى المزاد لصالحك، يمكنك الآن تسديد عمولة 2,000 د.ع للتواصل مع البائع.',
    time: 'منذ 25 دقيقة',
    isRead: false,
    type: 'win',
  },
  {
    id: 'n3',
    title: 'تأكيد دفع زين كاش بنجاح 💳',
    desc: 'تم استلام عمولة المنصة 2,000 د.ع وكشف معلومات البائع المباشرة.',
    time: 'منذ ساعة',
    isRead: true,
    type: 'payment',
  },
];

const USERS_LIST = [
  'إدارة عَتّاك المركزية (إدارة)',
  'حيدر الكعبي - تاجر سكراب (مشتري)',
  'أبو جاسم - صاحب خردة (بائع)',
  'م. القديم - تاجر معتمد 🔵',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'deals' | 'add' | 'support' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGov, setSelectedGov] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [auctionsList, setAuctionsList] = useState<AuctionItem[]>(INITIAL_AUCTIONS);
  const [currentUser, setCurrentUser] = useState('إدارة عَتّاك المركزية (إدارة)');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customBidAmount, setCustomBidAmount] = useState<string>('');
  const [zainCashPin, setZainCashPin] = useState('1234');
  const [isPayingZainCash, setIsPayingZainCash] = useState(false);

  // New Auction Form States
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('قواطي ألمنيوم');
  const [newWeight, setNewWeight] = useState('');
  const [newStartPrice, setNewStartPrice] = useState('');
  const [newGov, setNewGov] = useState('الديوانية');
  const [newArea, setNewArea] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Support Screen Ticket State
  const [supportMsg, setSupportMsg] = useState('');
  const [supportTicketSent, setSupportTicketSent] = useState(false);

  // Auto decrement timer simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionsList(prev => prev.map(auc => {
        if (auc.secondsRemaining <= 1) return auc;
        const newSecs = auc.secondsRemaining - 1;
        const hrs = Math.floor(newSecs / 3600);
        const mins = Math.floor((newSecs % 3600) / 60);
        const secs = newSecs % 60;
        const pad = (n: number) => n.toString().padStart(2, '0');
        const formatted = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
        return {
          ...auc,
          secondsRemaining: newSecs,
          timeLeft: formatted,
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handlePlaceBid = (auc: AuctionItem, addAmount: number) => {
    const newPrice = auc.pricePerKg + addAmount;
    const newTotal = auc.approxWeightKg * newPrice;
    const newBid: BidRecord = {
      id: `bid_${Date.now()}`,
      bidderName: currentUser.split(' - ')[0] || 'أنت',
      amountPerKg: newPrice,
      timeAgo: 'الآن',
    };

    const updated = auctionsList.map(a => a.id === auc.id ? {
      ...a,
      pricePerKg: newPrice,
      totalEstimated: newTotal,
      bidsCount: a.bidsCount + 1,
      bidsHistory: [newBid, ...a.bidsHistory],
    } : a);

    setAuctionsList(updated);
    if (selectedAuction && selectedAuction.id === auc.id) {
      setSelectedAuction({
        ...selectedAuction,
        pricePerKg: newPrice,
        totalEstimated: newTotal,
        bidsCount: selectedAuction.bidsCount + 1,
        bidsHistory: [newBid, ...selectedAuction.bidsHistory],
      });
    }

    // Add notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'تم تسجيل مزايدتك بنجاح ✅',
      desc: `أنت الآن صاحب أعلى سعر (${newPrice.toLocaleString()} د.ع/كغم) لمزاد ${auc.title.slice(0, 30)}...`,
      time: 'الآن',
      isRead: false,
      type: 'bid',
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`✅ تمت المزايدة بنجاح! السعر الجديد: ${newPrice.toLocaleString()} د.ع/كغم`);
  };

  const handleCustomBid = (auc: AuctionItem) => {
    const val = parseInt(customBidAmount, 10);
    if (isNaN(val) || val <= auc.pricePerKg) {
      showToast('⚠️ يرجى إدخال سعر أعلى من السعر الحالي!');
      return;
    }
    const diff = val - auc.pricePerKg;
    handlePlaceBid(auc, diff);
    setCustomBidAmount('');
  };

  const handleConfirmZainCash = (aucId: string) => {
    setIsPayingZainCash(true);
    setTimeout(() => {
      setIsPayingZainCash(false);
      setShowPaymentModal(false);
      const updated = auctionsList.map(a => a.id === aucId ? { ...a, isPaid: true } : a);
      setAuctionsList(updated);
      if (selectedAuction && selectedAuction.id === aucId) {
        setSelectedAuction({ ...selectedAuction, isPaid: true });
      }
      showToast('🎉 تم التحقق من دفع 2,000 د.ع عبر زين كاش بنجاح! تم كشف رقم هاتف البائع.');
    }, 1200);
  };

  const handleRefresh = () => {
    showToast('🔄 جارٍ تحديث أسعار المزادات والمزايدات المباشرة...');
    setTimeout(() => {
      showToast('✅ تم التحديث: جميع أسعار الخردة والعدادات متزامنة مع السوق العراقي!');
    }, 600);
  };

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newWeight || !newStartPrice) {
      showToast('⚠️ يرجى ملء الحقول المطلوبة (العنوان، الوزن، والسعر)!');
      return;
    }

    const weightKg = parseFloat(newWeight) || 50;
    const startPrice = parseFloat(newStartPrice) || 1000;

    const created: AuctionItem = {
      id: `auc_${Date.now()}`,
      category: newCategory,
      title: newTitle,
      approxWeight: `${weightKg} كغم تقريباً`,
      approxWeightKg: weightKg,
      startingPrice: startPrice,
      pricePerKg: startPrice,
      totalEstimated: weightKg * startPrice,
      bidsCount: 0,
      governorate: newGov,
      area: newArea || 'المركز',
      timeLeft: '06:00:00',
      secondsRemaining: 21600,
      image: newCategory.includes('نحاس')
        ? 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80'
        : newCategory.includes('حديد')
        ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
        : newCategory.includes('بطاريات')
        ? 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
      sellerPhone: '07829692579',
      sellerName: currentUser.split(' - ')[0],
      isPaid: false,
      notes: newNotes || 'خردة بحالة جيدة جاهزة للتحميل والوزن بالقبّان.',
      bidsHistory: [],
    };

    setAuctionsList([created, ...auctionsList]);
    setNewTitle('');
    setNewWeight('');
    setNewStartPrice('');
    setNewArea('');
    setNewNotes('');
    setActiveTab('home');
    setSelectedAuction(created);
    showToast('🚀 تم نشر المزاد بنجاح وأصبح متاحاً لجميع التجار للمزايدة!');
  };

  const filteredAuctions = auctionsList.filter(a => {
    const matchCat = selectedCategory === 'all' || a.category.includes(selectedCategory);
    const matchGov = selectedGov === 'all' || a.governorate.includes(selectedGov);
    const matchQuery = !searchQuery || 
      a.title.includes(searchQuery) || 
      a.category.includes(searchQuery) || 
      a.governorate.includes(searchQuery);
    return matchCat && matchGov && matchQuery;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 text-[#1E293B] font-sans selection:bg-[#1B4D3E] selection:text-white transition-colors duration-300 ${
      isDarkMode ? 'bg-[#030712] text-slate-100' : 'bg-[#060B14] text-[#1E293B]'
    }`} dir="rtl">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0B3022] text-[#D4AF37] px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl border border-[#D4AF37]/50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Outside Phone (Matching exact screenshot) */}
      <div className={`w-full ${isExpanded ? 'max-w-[500px]' : 'max-w-[390px]'} flex items-center justify-between text-xs py-2 px-1 text-white/90 select-none transition-all`}>
        {/* Right side in RTL: Live Green Dot + Title */}
        <div 
          onClick={() => showToast('🟢 خادم عَتّاك متصل مباشرة بنظام المزادات العراقية')}
          className="flex items-center gap-1.5 font-bold cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-500/30" />
          <span>تطبيق عَتّاگ | Attak للهاتف ♻️</span>
        </div>

        {/* Left side in RTL: User Role Selector + Fullscreen */}
        <div className="flex items-center gap-2 relative">
          <div 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] text-amber-300 border border-white/15 cursor-pointer shadow-xs"
          >
            <span className="truncate max-w-[155px] font-medium">{currentUser}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
          </div>

          <button 
            onClick={() => {
              setIsExpanded(!isExpanded);
              showToast(isExpanded ? 'تم العودة للحجم الافتراضي للهاتف' : 'تم توسيع شاشة العرض للمعاينة');
            }}
            className="p-1 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors"
            title="تكبير / تصغير"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* User Role Dropdown Menu */}
          {showUserDropdown && (
            <div className="absolute top-8 left-0 w-60 bg-[#0B3022] border border-[#D4AF37]/30 text-white rounded-xl shadow-2xl z-50 p-1.5 text-xs">
              <div className="px-2.5 py-1 text-[10px] text-amber-300 font-bold border-b border-white/10 mb-1">
                تبديل الحساب التجريبي:
              </div>
              {USERS_LIST.map((user) => (
                <div
                  key={user}
                  onClick={() => {
                    setCurrentUser(user);
                    setShowUserDropdown(false);
                    showToast(`تم التبديل إلى: ${user}`);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg flex items-center justify-between cursor-pointer hover:bg-white/15 text-[11px] ${
                    currentUser === user ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-bold' : 'text-white'
                  }`}
                >
                  <span className="truncate">{user}</span>
                  {currentUser === user && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Realistic Mobile Device Frame (Exact Replica from Screenshot) */}
      <div className={`w-full ${isExpanded ? 'max-w-[500px] h-[860px]' : 'max-w-[390px] h-[810px]'} ${
        isDarkMode ? 'bg-[#0F172A] border-[#334155]' : 'bg-white border-[#1C2638]'
      } rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden border-[6px] flex flex-col relative transition-all duration-300`}>
        
        {/* Dynamic Island & Phone Top Status Bar */}
        <div className="bg-[#0B3022] text-white pt-2.5 pb-1 px-6 flex items-center justify-between text-[11px] font-bold select-none relative z-30">
          <span className="cursor-default tracking-wide">9:41</span>
          
          {/* Dynamic Island Capsule */}
          <div 
            onClick={() => showToast('جزيرة عَتّاك التفاعلية: لا توجد مكالمات نشطة')}
            className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-2 -mt-1 shadow-inner cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
            <div className="w-8 h-1 rounded-full bg-neutral-800" />
          </div>

          <div className="flex items-center gap-1.5 text-white">
            <span className="text-[10px] font-black">5G</span>
            <span>📶</span>
            <span>100%</span>
          </div>
        </div>

        {/* Notifications Modal Overlay */}
        {showNotifications && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
            <div className={`${isDarkMode ? 'bg-[#1E293B] text-white' : 'bg-white text-slate-800'} rounded-t-3xl max-h-[80%] flex flex-col shadow-2xl p-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-sm">التنبيهات والإشعارات</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {unreadCount} جديد
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto no-scrollbar py-2 space-y-2 flex-1">
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      setNotifications(notifications.map(item => item.id === n.id ? { ...item, isRead: true } : item));
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      n.isRead 
                        ? (isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600')
                        : (isDarkMode ? 'bg-emerald-950/40 border-emerald-700 text-white' : 'bg-emerald-50/70 border-emerald-200 text-slate-900')
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
                    showToast('تم تحديد جميع الإشعارات كمقروءة');
                  }}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  تحديد الكل كمقروء
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="flex-1 py-2 bg-[#0B3022] text-white text-xs font-bold rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ZainCash Payment Modal */}
        {showPaymentModal && selectedAuction && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white text-slate-800 rounded-3xl p-5 w-full max-w-xs shadow-2xl border border-emerald-500/30 text-center relative animate-scaleUp">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-3 left-3 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-[#B30022] text-white rounded-2xl flex items-center justify-center font-black text-xs mx-auto mb-2 shadow">
                Zain
              </div>

              <h3 className="font-black text-base text-[#0B3022]">دفع عمولة عَتّاك عبر زين كاش</h3>
              <p className="text-xs text-slate-500 mt-1">
                المبلغ المطلوب: <strong className="text-emerald-700 font-bold text-sm">2,000 د.ع</strong>
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 my-3 text-right text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">المزاد:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[150px]">{selectedAuction.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الموقع:</span>
                  <span className="font-bold text-slate-800">{selectedAuction.governorate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الخدمة:</span>
                  <span className="font-bold text-emerald-700">كشف رقم البائع المباشر</span>
                </div>
              </div>

              <div className="text-right text-xs mb-3">
                <label className="block text-slate-700 font-bold mb-1">رمز PIN لمحفظة زين كاش:</label>
                <input 
                  type="password"
                  maxLength={4}
                  value={zainCashPin}
                  onChange={(e) => setZainCashPin(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl py-2 px-3 text-center text-base tracking-widest font-black outline-none"
                  placeholder="••••"
                />
              </div>

              <button
                disabled={isPayingZainCash}
                onClick={() => handleConfirmZainCash(selectedAuction.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                {isPayingZainCash ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>جارٍ معالجة الدفع...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>تأكيد دفع 2,000 د.ع الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Inside Viewport */}
        <div className={`flex-1 overflow-y-auto no-scrollbar flex flex-col pb-20 ${
          isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'
        }`}>
          {selectedAuction ? (
            /* Auction Detail Screen (Full Working Bidding & Contacts) */
            <div className="flex flex-col">
              {/* Back Bar */}
              <div className="bg-[#0B3022] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
                <button 
                  onClick={() => setSelectedAuction(null)}
                  className="p-1 hover:bg-white/15 rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                  <span>رجوع للرئيسية</span>
                </button>
                <span className="font-bold text-sm">{selectedAuction.category}</span>
                <div className="w-12" />
              </div>

              <div className="p-4 space-y-3.5">
                {/* Photo Gallery & Time */}
                <div className="h-52 w-full rounded-2xl overflow-hidden relative shadow-md">
                  <img src={selectedAuction.image} alt={selectedAuction.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedAuction.timeLeft}</span>
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {selectedAuction.bidsCount} مزايدة مسجلة
                  </span>
                </div>

                {/* Title & Info */}
                <div>
                  <h1 className={`font-black text-base leading-snug ${isDarkMode ? 'text-white' : 'text-[#0B3022]'}`}>
                    {selectedAuction.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {selectedAuction.governorate} - {selectedAuction.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                      {selectedAuction.approxWeight}
                    </span>
                  </div>
                  {selectedAuction.notes && (
                    <p className="mt-2 text-xs text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                      📝 {selectedAuction.notes}
                    </p>
                  )}
                </div>

                {/* Price Display */}
                <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-sm text-center`}>
                  <span className="text-xs text-slate-500 block">أعلى مزايدة حالية لكل كغم:</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1 tracking-tight">
                    {selectedAuction.pricePerKg.toLocaleString()} د.ع / كغم
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center justify-center gap-2">
                    <span>القيمة الإجمالية التقريبية:</span>
                    <strong className="text-slate-900 font-black">{selectedAuction.totalEstimated.toLocaleString()} د.ع</strong>
                  </div>
                </div>

                {/* ZainCash Commission & Phone Number Section */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed shadow-sm ${
                  selectedAuction.isPaid 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  <div className="font-bold text-sm flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {selectedAuction.isPaid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-amber-600" />
                      )}
                      <span>{selectedAuction.isPaid ? 'تم دفع عمولة المنصة بنجاح ✅' : 'معلومات التواصل المباشر مخفية 🔒'}</span>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold border border-slate-200">
                      عمولة ثابتة 2,000 د.ع
                    </span>
                  </div>

                  <p className="mt-1 text-slate-600 text-[11px]">
                    {selectedAuction.isPaid 
                      ? `تم فك قفل معلومات البائع. صاحب الخردة: ${selectedAuction.sellerName} (${selectedAuction.governorate}).` 
                      : 'ادفع عمولة عَتّاك (2,000 د.ع) عبر زين كاش لإظهار رقم هاتف صاحب الخردة وموقعه الدقيق لإتمام الشراء.'}
                  </p>

                  {selectedAuction.isPaid ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={`tel:${selectedAuction.sellerPhone}`}
                        className="flex-1 bg-[#0B3022] hover:bg-[#12402e] text-white px-3 py-2.5 rounded-xl font-bold text-xs shadow flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>اتصال ({selectedAuction.sellerPhone})</span>
                      </a>
                      <a
                        href={`https://wa.me/964${selectedAuction.sellerPhone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2.5 rounded-xl font-bold text-xs shadow flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>واتساب</span>
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>💳 ادفع 2,000 د.ع عبر زين كاش لإظهار رقم البائع</span>
                    </button>
                  )}
                </div>

                {/* Quick Bid Increment Buttons */}
                <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-sm space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Gavel className="w-3.5 h-3.5 text-emerald-700" />
                      <span>تقديم مزايدة فورية لكل كغم:</span>
                    </span>
                    <span className="text-[10px] text-slate-400">إضافة فورية</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 100, 250].map(inc => (
                      <button
                        key={inc}
                        onClick={() => handlePlaceBid(selectedAuction, inc)}
                        className="bg-emerald-50 hover:bg-emerald-100 active:scale-95 border border-emerald-200 text-emerald-800 font-bold py-2 rounded-xl text-xs transition-all flex flex-col items-center"
                      >
                        <span>+{inc}</span>
                        <span className="text-[9px] font-normal">د.ع/كغم</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Bid Input */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <input
                      type="number"
                      placeholder={`أدخل سعراً أعلى من ${selectedAuction.pricePerKg}`}
                      value={customBidAmount}
                      onChange={(e) => setCustomBidAmount(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-emerald-500 font-medium"
                    />
                    <button
                      onClick={() => handleCustomBid(selectedAuction)}
                      className="bg-[#0B3022] hover:bg-[#12402e] text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0"
                    >
                      زايد الآن
                    </button>
                  </div>
                </div>

                {/* Bidding History */}
                <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-sm space-y-2.5`}>
                  <h3 className="font-bold text-xs text-slate-800 flex items-center justify-between">
                    <span>سجل المزايدات المباشرة ({selectedAuction.bidsHistory.length})</span>
                    <span className="text-[10px] text-emerald-700 font-medium">محدث فوراً</span>
                  </h3>

                  <div className="divide-y divide-slate-100 text-xs">
                    {selectedAuction.bidsHistory.length > 0 ? (
                      selectedAuction.bidsHistory.map((b, idx) => (
                        <div key={b.id || idx} className="py-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-slate-800">{b.bidderName}</span>
                          </div>
                          <div className="text-left">
                            <span className="font-black text-emerald-700">{b.amountPerKg.toLocaleString()} د.ع</span>
                            <span className="text-[10px] text-slate-400 block">{b.timeAgo}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-center py-2 text-[11px]">لا توجد مزايدات بعد، كن أول من يزايد!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'home' ? (
            /* Home Screen (Exact Replica of User's Image) */
            <div className="flex flex-col">
              
              {/* Curved Dark Green Top Header */}
              <div className="bg-[#0B3022] rounded-b-[36px] pt-2 pb-6 px-4 shadow-lg text-white relative">
                <div className="flex items-center justify-between">
                  {/* Left: Moon Icon in circle */}
                  <button 
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      showToast(isDarkMode ? 'تم تفعيل الوضع النهاري ☀️' : 'تم تفعيل الوضع الليلي 🌙');
                    }}
                    className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/40 active:scale-95 flex items-center justify-center text-amber-300 border border-white/10 transition-all cursor-pointer"
                    title="الوضع الليلي"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
                  </button>

                  {/* Center: Brand Typography */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                      عَتّاگ
                    </h1>
                    <span className="text-[11px] font-black tracking-wide text-white/95 mt-0.5">
                      Attak
                    </span>
                    <span className="text-[10px] text-emerald-200/90 font-medium mt-0.5">
                      منصة الخردة العراقية
                    </span>
                  </div>

                  {/* Right: Bell Icon in circle with red notification */}
                  <button 
                    onClick={() => setShowNotifications(true)}
                    className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/40 active:scale-95 flex items-center justify-center text-white border border-white/10 relative transition-all cursor-pointer"
                    title="الإشعارات"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-2 right-2 ring-2 ring-[#0B3022] animate-ping" />
                    )}
                    {unreadCount > 0 && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-2 right-2 ring-1 ring-[#0B3022]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Body Content with negative margin */}
              <div className="px-3.5 -mt-3.5 space-y-3.5">
                
                {/* Search Bar Input */}
                <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200/90'} rounded-2xl p-1 shadow-sm border flex items-center transition-colors`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن مزاد أو نوع خردة..."
                    className={`w-full text-xs py-2 px-3 bg-transparent outline-none font-medium ${
                      isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-400'
                    }`}
                  />
                  {searchQuery ? (
                    <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4 ml-1" />
                    </button>
                  ) : null}
                  <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                </div>

                {/* Section 1: أقسام الخردة (3x2 Grid) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
                      <h2 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>أقسام الخردة</h2>
                    </div>
                    {selectedCategory !== 'all' && (
                      <button 
                        onClick={() => setSelectedCategory('all')}
                        className="text-[10px] text-emerald-700 font-bold hover:underline"
                      >
                        عرض الكل
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => {
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            const next = isSelected ? 'all' : cat.name;
                            setSelectedCategory(next);
                            showToast(next === 'all' ? 'عرض جميع أقسام الخردة' : `تمت التصفية حسب قسم: ${cat.name}`);
                          }}
                          className={`${
                            isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'
                          } rounded-xl p-1.5 border shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer flex flex-col items-center ${
                            isSelected ? 'ring-2 ring-emerald-600 border-emerald-600' : ''
                          }`}
                        >
                          <div className="w-full h-14 rounded-lg overflow-hidden relative">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            {cat.countBadge && (
                              <span className="absolute bottom-1 right-1 bg-emerald-700 text-white text-[8px] font-bold px-1.5 py-0.2 rounded shadow">
                                {cat.countBadge}
                              </span>
                            )}
                          </div>
                          <span className={`text-[11px] font-bold mt-1 ${
                            isSelected ? 'text-emerald-700' : (isDarkMode ? 'text-slate-200' : 'text-slate-800')
                          }`}>
                            {cat.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: المحافظات (Horizontal Pills) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <h2 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>المحافظات</h2>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    <button
                      onClick={() => {
                        setSelectedGov('all');
                        showToast('عرض المزادات في جميع محافظات العراق');
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                        selectedGov === 'all'
                          ? 'bg-[#0B3022] text-white shadow'
                          : `${isDarkMode ? 'bg-[#1E293B] text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200'} border`
                      }`}
                    >
                      <span>🇮🇶 كل المحافظات</span>
                      <span className="text-[9px] bg-white/20 px-1 rounded-full">{auctionsList.length}</span>
                    </button>

                    {['بغداد', 'البصرة', 'النجف', 'الديوانية'].map(gov => {
                      const count = auctionsList.filter(a => a.governorate.includes(gov)).length;
                      const isSelected = selectedGov === gov;
                      return (
                        <button
                          key={gov}
                          onClick={() => {
                            const next = isSelected ? 'all' : gov;
                            setSelectedGov(next);
                            showToast(next === 'all' ? 'عرض جميع المحافظات' : `عرض مزادات محافظة: ${gov}`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-[#0B3022] text-white shadow'
                              : `${isDarkMode ? 'bg-[#1E293B] text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200'} border`
                          }`}
                        >
                          <span>{gov}</span>
                          {count > 0 && (
                            <span className={`text-[9px] px-1 rounded-full font-bold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: المزادات النشطة 🔥 */}
                <div className="space-y-2 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
                      <h2 className={`text-xs font-bold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        <span>المزادات النشطة</span>
                        <span>🔥</span>
                      </h2>
                    </div>

                    <div 
                      onClick={handleRefresh}
                      className="flex items-center gap-1 text-[11px] text-slate-500 font-medium cursor-pointer hover:text-emerald-700"
                    >
                      <span>{filteredAuctions.length} مزادات</span>
                      <RotateCw className="w-3 h-3 text-slate-400 hover:rotate-180 transition-transform" />
                    </div>
                  </div>

                  {/* Auction Cards Matching Screenshot */}
                  <div className="space-y-2.5">
                    {filteredAuctions.length > 0 ? (
                      filteredAuctions.map(auc => (
                        <div
                          key={auc.id}
                          onClick={() => setSelectedAuction(auc)}
                          className={`${
                            isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'
                          } rounded-2xl p-3 border shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3`}
                        >
                          {/* Right: Info in RTL */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h3 className={`font-bold text-xs truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {auc.title}
                              </h3>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {auc.category} • {auc.approxWeight}
                              </p>
                              <div className="text-xs font-black text-emerald-700 mt-1">
                                {auc.pricePerKg.toLocaleString()} د.ع / كغم
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-0.5">
                                <span>📍 {auc.governorate} - {auc.area}</span>
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                {auc.bidsCount} مزايدة
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAuction(auc);
                                }}
                                className="bg-[#0B3022] hover:bg-[#12402e] text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-xs cursor-pointer active:scale-95 transition-transform"
                              >
                                دخول المزاد
                              </button>
                            </div>
                          </div>

                          {/* Left: Image with Red Countdown Overlay */}
                          <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0">
                            <img src={auc.image} alt={auc.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-red-600/90 backdrop-blur-xs text-white text-[9px] font-bold py-0.5 px-1 rounded flex items-center justify-center gap-1 shadow">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{auc.timeLeft}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        لا توجد مزادات تطابق معايير البحث الحالية.
                        <button 
                          onClick={() => { setSelectedCategory('all'); setSelectedGov('all'); setSearchQuery(''); }}
                          className="block mx-auto mt-2 text-emerald-700 font-bold"
                        >
                          إعادة تعيين الفلاتر
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : activeTab === 'deals' ? (
            /* Deals Tab */
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#0B3022]'}`}>
                  صفقاتي والمزادات الفائزة 🏆
                </h2>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {auctionsList.filter(a => a.isPaid).length} مكتملة
                </span>
              </div>

              <div className="space-y-3">
                {auctionsList.map(auc => (
                  <div key={auc.id} className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} p-3.5 rounded-2xl border text-xs space-y-2 shadow-xs`}>
                    <div className="flex justify-between items-center font-bold">
                      <span className="truncate max-w-[180px]">{auc.title}</span>
                      <span className={auc.isPaid ? 'text-emerald-600 text-[10px] font-bold' : 'text-amber-600 text-[10px] font-bold'}>
                        {auc.isPaid ? 'تم دفع العمولة ✅' : 'بانتظار دفع العمولة ⏳'}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>الكمية: {auc.approxWeight}</span>
                      <span>السعر: {auc.pricePerKg.toLocaleString()} د.ع/كغم</span>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                      <span className="text-slate-500">القيمة المقدرة:</span>
                      <strong className="text-emerald-700 font-black text-sm">{auc.totalEstimated.toLocaleString()} د.ع</strong>
                    </div>

                    {auc.isPaid ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-emerald-900 space-y-1">
                        <div className="font-bold flex items-center justify-between">
                          <span>👤 البائع: {auc.sellerName}</span>
                          <span className="text-[10px] text-emerald-700">موثق بالهوية</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>📞 {auc.sellerPhone}</span>
                          <a href={`tel:${auc.sellerPhone}`} className="bg-[#0B3022] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                            اتصال مباشر
                          </a>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedAuction(auc);
                          setShowPaymentModal(true);
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>ادفع عمولة 2,000 د.ع لإظهار رقم البائع</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'add' ? (
            /* Add Auction Tab */
            <div className="p-4 space-y-3 text-xs">
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#0B3022]'}`}>
                أضف مزاد خردة وسكراب جديد ➕
              </h2>
              
              <form onSubmit={handleCreateAuction} className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} p-4 rounded-2xl border space-y-3 shadow-xs`}>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نوع قسم الخردة:</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium"
                  >
                    <option value="قواطي ألمنيوم">🥫 قواطي ألمنيوم (مشروبات غازية)</option>
                    <option value="نحاس">🟠 نحاس أحمر وكابلات</option>
                    <option value="حديد">🔩 حديد وهياكل إنشائية</option>
                    <option value="ألمنيوم">🟡 ألمنيوم بروفايل وشبابيك</option>
                    <option value="بطاريات">🔋 بطاريات سيارات وشاحنات</option>
                    <option value="أخرى">♻️ خردة ومواد أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان المزاد المميّز:</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: بالات قواطي ألمنيوم مكبوسة نظيفة" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" 
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">الكمية التقديرية (كغم):</label>
                    <input 
                      type="number" 
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      placeholder="مثال: 50" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">سعر البداية / كغم (د.ع):</label>
                    <input 
                      type="number" 
                      value={newStartPrice}
                      onChange={(e) => setNewStartPrice(e.target.value)}
                      placeholder="مثال: 1500" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" 
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">المحافظة:</label>
                    <select 
                      value={newGov} 
                      onChange={(e) => setNewGov(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium"
                    >
                      <option value="الديوانية">الديوانية</option>
                      <option value="بغداد">بغداد</option>
                      <option value="البصرة">البصرة</option>
                      <option value="النجف">النجف الأشرف</option>
                      <option value="كربلاء">كربلاء المقدسة</option>
                      <option value="بابل">بابل</option>
                      <option value="ميسان">ميسان</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">المنطقة أو القضاء:</label>
                    <input 
                      type="text" 
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      placeholder="مثال: الحمزة الشرقي" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ملاحظات عن الخردة:</label>
                  <textarea 
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="ملاحظات حول طريقة الوزن، وقت الاستلام، أو النقل..." 
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium text-xs resize-none" 
                  />
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-900 leading-relaxed">
                  💡 <strong>ملاحظة للمالك:</strong> يتم بدء المزاد فوراً لمدة 6 ساعات، ويدفع المشتري الفائز 1,000 د.ع عمولة وتدفع أنت 1,000 د.ع لكشف الاتصال المباشر.
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0B3022] hover:bg-[#12402e] text-white font-bold py-2.5 rounded-xl shadow cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>🚀 نشر المزاد الآن</span>
                </button>
              </form>
            </div>
          ) : activeTab === 'support' ? (
            /* Support Tab */
            <div className="p-4 space-y-3.5 text-xs">
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#0B3022]'}`}>
                الدعم الفني ونظام عمولة المنصة 🎧
              </h2>

              <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} p-4 rounded-2xl border space-y-2.5 shadow-xs`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <p className="font-black text-emerald-800 text-sm">قاعدة العمولة الثابتة (2,000 د.ع):</p>
                </div>
                <p className="text-slate-600 leading-relaxed">• 1,000 دينار على صاحب الخردة (البائع).</p>
                <p className="text-slate-600 leading-relaxed">• 1,000 دينار على التاجر الفائز بالمزاد (المشتري).</p>
                <p className="text-slate-600 leading-relaxed">• تدفع العمولة إلكترونياً عبر زين كاش (ZainCash) لكشف أرقام الهواتف والتواصل المباشر.</p>
                <p className="text-slate-600 leading-relaxed">• ثمن الخردة الفعلي يدفع نقداً (كاش) عند الوزن بالقبان والتسليم الفعلي.</p>
              </div>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:07829692579"
                  className="bg-[#0B3022] hover:bg-[#12402e] text-white p-3 rounded-2xl font-bold flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <Phone className="w-5 h-5 mb-1" />
                  <span>اتصال بالدعم</span>
                  <span className="text-[10px] text-emerald-200">07829692579</span>
                </a>

                <a
                  href="https://wa.me/9647829692579"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-2xl font-bold flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <MessageCircle className="w-5 h-5 mb-1" />
                  <span>دعم واتساب</span>
                  <span className="text-[10px] text-emerald-100">دردشة فورية</span>
                </a>
              </div>

              {/* Support Ticket Form */}
              <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} p-4 rounded-2xl border space-y-2.5 shadow-xs`}>
                <h3 className="font-bold text-slate-800 text-xs">إرسال استفسار أو شكوى لإدارة عَتّاك:</h3>
                <textarea
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                  placeholder="اكتب رسالتك أو مشكلتك هنا..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none resize-none"
                />
                <button
                  onClick={() => {
                    if (!supportMsg.trim()) return;
                    setSupportTicketSent(true);
                    setSupportMsg('');
                    showToast('تم استلام رسالتك وسيتم الرد عليك في غضون 10 دقائق!');
                    setTimeout(() => setSupportTicketSent(false), 5000);
                  }}
                  className="w-full bg-[#0B3022] hover:bg-[#12402e] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الرسالة</span>
                </button>
                {supportTicketSent && (
                  <p className="text-emerald-700 text-[11px] font-bold text-center">
                    ✅ تم إرسال تذكرتك بنجاح برقم: #TK-{Math.floor(Math.random() * 89999 + 10000)}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Profile Tab */
            <div className="p-4 space-y-3.5 text-xs">
              <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} p-5 rounded-3xl border text-center shadow-xs`}>
                <div className="w-16 h-16 bg-[#0B3022] text-[#D4AF37] rounded-full flex items-center justify-center font-black text-2xl mx-auto mb-2 border-2 border-[#D4AF37]">
                  ع
                </div>
                <h3 className={`font-black text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentUser.split(' - ')[0]}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">07829692579 (الديوانية - العراق)</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    تاجر معتمد موثق 🔵
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ⭐⭐⭐⭐⭐ 4.9
                  </span>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="bg-gradient-to-r from-[#0B3022] to-[#144A36] text-white p-4 rounded-2xl shadow-md space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-200">رصيد محفظة عَتّاك</span>
                  <Wallet className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="text-2xl font-black text-[#D4AF37]">
                  25,000 <span className="text-xs text-white">د.ع</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => showToast('تم فتح بوابة شحن المحفظة عبر زين كاش')}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 rounded-xl text-[11px] transition-colors"
                  >
                    + شحن الرصيد
                  </button>
                  <button
                    onClick={() => showToast('كشف حساب المحفظة فارغ من العمليات المعلقة')}
                    className="flex-1 bg-black/20 hover:bg-black/30 text-emerald-200 font-bold py-1.5 rounded-xl text-[11px] transition-colors"
                  >
                    سجل العمليات
                  </button>
                </div>
              </div>

              {/* Profile Menu Actions */}
              <div className={`${isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} rounded-2xl border divide-y divide-slate-100 overflow-hidden shadow-xs text-xs`}>
                <div 
                  onClick={() => { setSelectedAuction(null); setActiveTab('deals'); }}
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                >
                  <span className="font-bold text-slate-800">مزاداتي وصفقاتي المفتوحة</span>
                  <span className="text-emerald-700 font-bold">{auctionsList.length}</span>
                </div>
                <div 
                  onClick={() => setShowNotifications(true)}
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                >
                  <span className="font-bold text-slate-800">سجل الإشعارات والتنبيهات</span>
                  <span className="text-red-600 font-bold">{unreadCount}</span>
                </div>
                <div 
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    showToast(isDarkMode ? 'تم تفعيل الوضع النهاري' : 'تم تفعيل الوضع الليلي');
                  }}
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                >
                  <span className="font-bold text-slate-800">الوضع الليلي (Dark Mode)</span>
                  <span className="text-slate-500 font-medium">{isDarkMode ? 'مفعل 🌙' : 'معطل ☀️'}</span>
                </div>
                <div 
                  onClick={() => showToast('تم تسجيل الخروج بنجاح')}
                  className="p-3 text-red-600 font-bold cursor-pointer hover:bg-red-50 text-center"
                >
                  تسجيل الخروج
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar (Exact Replica from Screenshot) */}
        <div className={`absolute bottom-0 left-0 right-0 ${
          isDarkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'
        } border-t px-3 py-2 flex items-center justify-around z-40 shadow-lg select-none`}>
          {/* 1. الرئيسية */}
          <button
            onClick={() => { setSelectedAuction(null); setActiveTab('home'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] cursor-pointer transition-colors active:scale-95 ${
              activeTab === 'home' && !selectedAuction ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>الرئيسية</span>
          </button>

          {/* 2. صفقاتي */}
          <button
            onClick={() => { setSelectedAuction(null); setActiveTab('deals'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] cursor-pointer transition-colors active:scale-95 ${
              activeTab === 'deals' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>صفقاتي</span>
          </button>

          {/* 3. Center (+) Elevated Button */}
          <button
            onClick={() => { setSelectedAuction(null); setActiveTab('add'); }}
            className="w-11 h-11 -mt-5 rounded-full bg-[#0B3022] hover:bg-[#12402e] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform border-3 border-white cursor-pointer"
            title="إضافة مزاد جديد"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
          </button>

          {/* 4. الدعم */}
          <button
            onClick={() => { setSelectedAuction(null); setActiveTab('support'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] cursor-pointer transition-colors active:scale-95 ${
              activeTab === 'support' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>الدعم</span>
          </button>

          {/* 5. حسابي */}
          <button
            onClick={() => { setSelectedAuction(null); setActiveTab('profile'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] cursor-pointer transition-colors active:scale-95 ${
              activeTab === 'profile' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>حسابي</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar at the bottom */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full pointer-events-none z-50" />

      </div>
    </div>
  );
}
