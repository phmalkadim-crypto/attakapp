import {
  Auction,
  Bid,
  Category,
  Complaint,
  PaymentOrder,
  Rating,
  AppNotification,
  AppSettings,
  User,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_USERS,
  SCRAP_IMAGES,
} from '../data/constants';

const STORAGE_KEYS = {
  USERS: 'qotiyti_users_v1',
  CURRENT_USER: 'qotiyti_current_user_v1',
  CATEGORIES: 'qotiyti_categories_v1',
  AUCTIONS: 'qotiyti_auctions_v1',
  PAYMENTS: 'qotiyti_payments_v1',
  RATINGS: 'qotiyti_ratings_v1',
  COMPLAINTS: 'qotiyti_complaints_v1',
  NOTIFICATIONS: 'qotiyti_notifications_v1',
  SETTINGS: 'qotiyti_settings_v1',
};

// Initial Auctions seed
const createInitialAuctions = (): Auction[] => {
  const now = new Date();
  const endsIn3Hours = new Date(now.getTime() + 3 * 3600 * 1000).toISOString();
  const endsIn5Hours = new Date(now.getTime() + 5.5 * 3600 * 1000).toISOString();
  const endsIn1Hour = new Date(now.getTime() + 1.2 * 3600 * 1000).toISOString();
  const ended30MinAgo = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
  const completedYesterday = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();

  return [
    {
      id: 'auc-cans-diwaniyah-1',
      title: 'قواطي ألمنيوم مشروبات غازية مكبوسة ونظيفة',
      categoryId: 'cat-cans',
      categoryName: 'قواطي ألمنيوم',
      images: [SCRAP_IMAGES.cans, SCRAP_IMAGES.hero],
      approxWeightKg: 50,
      governorate: 'الديوانية',
      area: 'مركز الديوانية',
      description: 'قواطي كانز نظيفة تماماً ومفرزة داخل أكياس، جاهزة للوزن المباشر في الموقع. الوزن تقريبي 50 كغم والاتفاق النهائي عند الاستلام.',
      startPricePerKg: 1500,
      currentPricePerKg: 1700,
      totalEstimatedValue: 85000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار الديواني',
      sellerPhone: '07812345678',
      durationHours: 6,
      createdAt: new Date(now.getTime() - 2.5 * 3600 * 1000).toISOString(),
      endsAt: endsIn3Hours,
      status: 'ACTIVE',
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      winnerIsVerified: true,
      winningBidPerKg: 1700,
      totalWinningAmount: 85000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 3,
      bids: [
        {
          id: 'bid-1',
          auctionId: 'auc-cans-diwaniyah-1',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 1550,
          totalCalculated: 77500,
          timestamp: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-2',
          auctionId: 'auc-cans-diwaniyah-1',
          traderId: 'usr-trader-3',
          traderName: 'علي مظلوم للتدوير',
          traderPhone: '07712233445',
          isVerifiedTrader: false,
          pricePerKg: 1600,
          totalCalculated: 80000,
          timestamp: new Date(now.getTime() - 1.5 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-3',
          auctionId: 'auc-cans-diwaniyah-1',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 1700,
          totalCalculated: 85000,
          timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'auc-copper-baghdad-2',
      title: 'كابلات وأسلاك نحاس أحمر صافي مقشر من محولات ومشاريع',
      categoryId: 'cat-copper',
      categoryName: 'نحاس',
      images: [SCRAP_IMAGES.copper],
      approxWeightKg: 120,
      governorate: 'بغداد',
      area: 'الشورجة',
      description: 'نحاس أحمر لامع صافي 99%، مقشر خالي من العوازل والمحترق، جاهز للتحميل والتوزين الدقيق بقبان معتمد.',
      startPricePerKg: 11000,
      currentPricePerKg: 11800,
      totalEstimatedValue: 1416000,
      sellerId: 'usr-seller-2',
      sellerName: 'أحمد التميمي',
      sellerPhone: '07733445566',
      durationHours: 12,
      createdAt: new Date(now.getTime() - 6 * 3600 * 1000).toISOString(),
      endsAt: endsIn5Hours,
      status: 'ACTIVE',
      winnerId: 'usr-trader-2',
      winnerName: 'سلام الكعبي لتجارة المعادن',
      winnerPhone: '07501122334',
      winnerIsVerified: true,
      winningBidPerKg: 11800,
      totalWinningAmount: 1416000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 2,
      bids: [
        {
          id: 'bid-c1',
          auctionId: 'auc-copper-baghdad-2',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 11500,
          totalCalculated: 1380000,
          timestamp: new Date(now.getTime() - 4 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-c2',
          auctionId: 'auc-copper-baghdad-2',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 11800,
          totalCalculated: 1416000,
          timestamp: new Date(now.getTime() - 1 * 3600 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'auc-iron-basra-3',
      title: 'حديد شيلمان وبليت وهياكل ثقيلة خردة معمل',
      categoryId: 'cat-iron',
      categoryName: 'حديد',
      images: [SCRAP_IMAGES.iron],
      approxWeightKg: 850,
      governorate: 'البصرة',
      area: 'الزبير',
      description: 'حديد ثقيل مناسب لمعامل الصهر، يحتوي جسور وبليت بدون شوائب إسمنتية. التحميل برافعة متوفرة بالموقع.',
      startPricePerKg: 380,
      currentPricePerKg: 440,
      totalEstimatedValue: 374000,
      sellerId: 'usr-seller-3',
      sellerName: 'موسى البصري',
      sellerPhone: '07809988776',
      durationHours: 3,
      createdAt: new Date(now.getTime() - 1.8 * 3600 * 1000).toISOString(),
      endsAt: endsIn1Hour,
      status: 'ACTIVE',
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      winnerIsVerified: true,
      winningBidPerKg: 440,
      totalWinningAmount: 374000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 1,
      bids: [
        {
          id: 'bid-i1',
          auctionId: 'auc-iron-basra-3',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 440,
          totalCalculated: 374000,
          timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'auc-batteries-erbil-4',
      title: 'بطاريات شاحنات وسيارات سكراب غير مفرغة',
      categoryId: 'cat-batteries',
      categoryName: 'بطاريات',
      images: [SCRAP_IMAGES.batteries],
      approxWeightKg: 320,
      governorate: 'أربيل',
      area: 'المنطقة الصناعية',
      description: 'مجموعة بطاريات رصاص حامضية مستعملة مرتبة على طبالي خشبية، تباع بالكيلو مباشرة.',
      startPricePerKg: 950,
      currentPricePerKg: 1100,
      totalEstimatedValue: 352000,
      sellerId: 'usr-seller-4',
      sellerName: 'ريبوار الكردي',
      sellerPhone: '07503344556',
      durationHours: 6,
      createdAt: new Date(now.getTime() - 4 * 3600 * 1000).toISOString(),
      endsAt: endsIn3Hours,
      status: 'ACTIVE',
      winnerId: 'usr-trader-2',
      winnerName: 'سلام الكعبي لتجارة المعادن',
      winnerPhone: '07501122334',
      winnerIsVerified: true,
      winningBidPerKg: 1100,
      totalWinningAmount: 352000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 2,
      bids: [
        {
          id: 'bid-b1',
          auctionId: 'auc-batteries-erbil-4',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 1000,
          totalCalculated: 320000,
          timestamp: new Date(now.getTime() - 3 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-b2',
          auctionId: 'auc-batteries-erbil-4',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 1100,
          totalCalculated: 352000,
          timestamp: new Date(now.getTime() - 1 * 3600 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'auc-aluminum-najaf-5',
      title: 'مقاطع وشبابيك ألمنيوم مفروزة ونظيفة جاهزة للتصنيع',
      categoryId: 'cat-aluminum',
      categoryName: 'ألمنيوم',
      images: [SCRAP_IMAGES.aluminum],
      approxWeightKg: 160,
      governorate: 'النجف',
      area: 'الكوفة',
      description: 'ألمنيوم بروفيل ومقاطع نظيفة خالية من الحديد والبراغي، مفروزة بعناية وجاهزة للتحميل من الورشة مباشرة.',
      startPricePerKg: 2800,
      currentPricePerKg: 3100,
      totalEstimatedValue: 496000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار النجفي',
      sellerPhone: '07812345678',
      durationHours: 8,
      createdAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
      endsAt: endsIn5Hours,
      status: 'ACTIVE',
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      winnerIsVerified: true,
      winningBidPerKg: 3100,
      totalWinningAmount: 496000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 2,
      bids: [
        {
          id: 'bid-al1',
          auctionId: 'auc-aluminum-najaf-5',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 2950,
          totalCalculated: 472000,
          timestamp: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
        },
        {
          id: 'bid-al2',
          auctionId: 'auc-aluminum-najaf-5',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 3100,
          totalCalculated: 496000,
          timestamp: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'auc-mixed-karbala-6',
      title: 'خردة محركات ودينموات ومعادن منوعة من كراج تصليح',
      categoryId: 'cat-other',
      categoryName: 'معادن منوعة',
      images: [SCRAP_IMAGES.other],
      approxWeightKg: 240,
      governorate: 'كربلاء',
      area: 'مركز كربلاء',
      description: 'سكراب منوع يحتوي نحاس وحديد وألمنيوم من سيارات ومولدات معطلة، البيع لكامل الوجبة بسعر الكيلو.',
      startPricePerKg: 700,
      currentPricePerKg: 850,
      totalEstimatedValue: 204000,
      sellerId: 'usr-seller-3',
      sellerName: 'موسى الكربلائي',
      sellerPhone: '07809988776',
      durationHours: 6,
      createdAt: new Date(now.getTime() - 1 * 3600 * 1000).toISOString(),
      endsAt: endsIn3Hours,
      status: 'ACTIVE',
      winnerId: 'usr-trader-2',
      winnerName: 'سلام الكعبي لتجارة المعادن',
      winnerPhone: '07501122334',
      winnerIsVerified: true,
      winningBidPerKg: 850,
      totalWinningAmount: 204000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      bidsCount: 1,
      bids: [
        {
          id: 'bid-mx1',
          auctionId: 'auc-mixed-karbala-6',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 850,
          totalCalculated: 204000,
          timestamp: new Date(now.getTime() - 40 * 60 * 1000).toISOString(),
        },
      ],
    },
    // READY FOR PAYMENT TESTING AUCTION: ended auction waiting for 2,000 IQD commission
    {
      id: 'auc-waiting-payment-demo',
      title: 'قواطي ألمنيوم مكبوسة 50 كغم (مزاد منتهي - تجربة فوز التاجر)',
      categoryId: 'cat-cans',
      categoryName: 'قواطي ألمنيوم',
      images: [SCRAP_IMAGES.cans],
      approxWeightKg: 50,
      governorate: 'الديوانية',
      area: 'الحمزة',
      description: 'تم انتهاء المزاد رسمياً وفاز التاجر. ادفع العمولة الآن عبر زين كاش لإظهار رقم هاتف صاحب الخردة!',
      startPricePerKg: 1500,
      currentPricePerKg: 1700,
      totalEstimatedValue: 85000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار الديواني',
      sellerPhone: '07812345678',
      durationHours: 6,
      createdAt: new Date(now.getTime() - 7 * 3600 * 1000).toISOString(),
      endsAt: ended30MinAgo,
      status: 'WAITING_FOR_COMMISSION',
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      winnerIsVerified: true,
      winningBidPerKg: 1700,
      totalWinningAmount: 85000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      paymentOrderId: 'ZC-849204-QOT',
      paymentStatus: 'PENDING',
      bidsCount: 3,
      bids: [
        {
          id: 'bid-w1',
          auctionId: 'auc-waiting-payment-demo',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 1550,
          totalCalculated: 77500,
          timestamp: new Date(now.getTime() - 6 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-w2',
          auctionId: 'auc-waiting-payment-demo',
          traderId: 'usr-trader-3',
          traderName: 'علي مظلوم للتدوير',
          traderPhone: '07712233445',
          isVerifiedTrader: false,
          pricePerKg: 1600,
          totalCalculated: 80000,
          timestamp: new Date(now.getTime() - 4 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-w3',
          auctionId: 'auc-waiting-payment-demo',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 1700,
          totalCalculated: 85000,
          timestamp: new Date(now.getTime() - 1 * 3600 * 1000).toISOString(),
        },
      ],
    },
    // COMPLETED DEAL WITH UNLOCKED CONTACT & RATING
    {
      id: 'auc-completed-demo',
      title: 'خردة مقاطع ألمنيوم وشبابيك قديمة 75 كغم',
      categoryId: 'cat-aluminum',
      categoryName: 'ألمنيوم',
      images: [SCRAP_IMAGES.hero],
      approxWeightKg: 75,
      governorate: 'النجف',
      area: 'الكوفة',
      description: 'تم تسديد العمولة بنجاح واستلام الخردة ودفع المبلغ كاملاً للبائع مباشرة في الموقع.',
      startPricePerKg: 3000,
      currentPricePerKg: 3400,
      totalEstimatedValue: 255000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار الديواني',
      sellerPhone: '07812345678',
      durationHours: 12,
      createdAt: completedYesterday,
      endsAt: new Date(now.getTime() - 18 * 3600 * 1000).toISOString(),
      status: 'COMMISSION_PAID',
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      winnerIsVerified: true,
      winningBidPerKg: 3400,
      totalWinningAmount: 255000,
      commissionTrader: 1000,
      commissionSeller: 1000,
      totalCommission: 2000,
      paymentOrderId: 'ZC-912833-QOT',
      paymentStatus: 'SUCCESS',
      paymentPaidAt: new Date(now.getTime() - 17 * 3600 * 1000).toISOString(),
      bidsCount: 2,
      bids: [
        {
          id: 'bid-cmp1',
          auctionId: 'auc-completed-demo',
          traderId: 'usr-trader-2',
          traderName: 'سلام الكعبي لتجارة المعادن',
          traderPhone: '07501122334',
          isVerifiedTrader: true,
          pricePerKg: 3200,
          totalCalculated: 240000,
          timestamp: new Date(now.getTime() - 20 * 3600 * 1000).toISOString(),
        },
        {
          id: 'bid-cmp2',
          auctionId: 'auc-completed-demo',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 3400,
          totalCalculated: 255000,
          timestamp: new Date(now.getTime() - 19 * 3600 * 1000).toISOString(),
        },
      ],
    },
  ];
};

class StoreService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  // --- Users ---
  getUsers(): User[] {
    const users = this.get<User[]>(STORAGE_KEYS.USERS, []);
    if (!users || users.length === 0) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
      return INITIAL_USERS;
    }
    return users;
  }

  getCurrentUser(): User {
    const user = this.get<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (!user) {
      // Default initial view as Trader الحاج جاسم الخفاجي so user can immediately bid and test ZainCash
      const defaultUser = this.getUsers()[1]; // Trader 1
      this.setCurrentUser(defaultUser);
      return defaultUser;
    }
    return user;
  }

  setCurrentUser(user: User): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  updateUser(updated: User): void {
    const users = this.getUsers().map((u) => (u.id === updated.id ? updated : u));
    this.set(STORAGE_KEYS.USERS, users);
    const curr = this.getCurrentUser();
    if (curr.id === updated.id) {
      this.setCurrentUser(updated);
    }
  }

  toggleTraderVerification(userId: string): boolean {
    const users = this.getUsers().map((u) => {
      if (u.id === userId) {
        return { ...u, isVerifiedTrader: !u.isVerifiedTrader };
      }
      return u;
    });
    this.set(STORAGE_KEYS.USERS, users);
    const curr = this.getCurrentUser();
    if (curr.id === userId) {
      this.setCurrentUser({ ...curr, isVerifiedTrader: !curr.isVerifiedTrader });
    }
    return true;
  }

  toggleUserBan(userId: string): boolean {
    const users = this.getUsers().map((u) => {
      if (u.id === userId) {
        return { ...u, isBanned: !u.isBanned };
      }
      return u;
    });
    this.set(STORAGE_KEYS.USERS, users);
    return true;
  }

  // --- Categories ---
  getCategories(): Category[] {
    const cats = this.get<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    if (!cats || cats.length === 0) {
      this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      return INITIAL_CATEGORIES;
    }
    // Ensure all standard categories have their latest realistic images
    const updated = cats.map((c) => {
      const match = INITIAL_CATEGORIES.find((ic) => ic.id === c.id);
      if (match) {
        return {
          ...c,
          image: match.image,
          icon: match.icon,
          minStartPrice: c.minStartPrice || match.minStartPrice,
        };
      }
      return c;
    });
    return updated;
  }

  saveCategory(category: Category): void {
    const cats = this.getCategories();
    const existingIndex = cats.findIndex((c) => c.id === category.id);
    if (existingIndex >= 0) {
      cats[existingIndex] = category;
    } else {
      cats.push(category);
    }
    this.set(STORAGE_KEYS.CATEGORIES, cats);
  }

  deleteCategory(categoryId: string): void {
    const cats = this.getCategories().filter((c) => c.id !== categoryId);
    this.set(STORAGE_KEYS.CATEGORIES, cats);
  }

  // --- Auctions ---
  getAuctions(): Auction[] {
    const auctions = this.get<Auction[]>(STORAGE_KEYS.AUCTIONS, []);
    if (!auctions || auctions.length === 0) {
      const initial = createInitialAuctions();
      this.set(STORAGE_KEYS.AUCTIONS, initial);
      return initial;
    }
    // Check auto expiry on read
    const now = new Date();
    let updated = false;
    const refreshed = auctions.map((auc) => {
      if (auc.status === 'ACTIVE' && new Date(auc.endsAt) <= now) {
        updated = true;
        if (auc.bidsCount > 0 && auc.winnerId) {
          return {
            ...auc,
            status: 'WAITING_FOR_COMMISSION' as const,
          };
        } else {
          return {
            ...auc,
            status: 'ENDED' as const,
          };
        }
      }
      return auc;
    });

    // Ensure new initial auctions (e.g. Najaf, Karbala) exist
    const initial = createInitialAuctions();
    const missingInitial = initial.filter((ia) => !auctions.some((a) => a.id === ia.id));
    if (missingInitial.length > 0) {
      refreshed.push(...missingInitial);
      updated = true;
    }

    const withFreshImages = refreshed.map((auc) => {
      const images = (auc.images || []).map((img) => {
        if (!img || img.includes('scrap_aluminum_cans')) return SCRAP_IMAGES.cans;
        if (img.includes('scrap_copper_wire')) return SCRAP_IMAGES.copper;
        if (img.includes('scrap_iron_steel')) return SCRAP_IMAGES.iron;
        if (img.includes('scrap_aluminum_profiles')) return SCRAP_IMAGES.aluminum;
        if (img.includes('scrap_car_batteries')) return SCRAP_IMAGES.batteries;
        if (img.includes('scrap_mixed_metal')) return SCRAP_IMAGES.other;
        if (img.includes('hero_scrap_yard')) return SCRAP_IMAGES.hero;
        return img;
      });
      return {
        ...auc,
        images: images.length > 0 ? images : [SCRAP_IMAGES.cans],
      };
    });

    if (updated) {
      this.set(STORAGE_KEYS.AUCTIONS, withFreshImages);
    }
    return withFreshImages;
  }

  getAuctionById(id: string): Auction | undefined {
    return this.getAuctions().find((a) => a.id === id);
  }

  saveAuction(auction: Auction): void {
    const auctions = this.getAuctions();
    const idx = auctions.findIndex((a) => a.id === auction.id);
    if (idx >= 0) {
      auctions[idx] = auction;
    } else {
      auctions.unshift(auction);
    }
    this.set(STORAGE_KEYS.AUCTIONS, auctions);
  }

  deleteAuction(id: string): void {
    const auctions = this.getAuctions().filter((a) => a.id !== id);
    this.set(STORAGE_KEYS.AUCTIONS, auctions);
  }

  // --- Bidding Logic ---
  placeBid(
    auctionId: string,
    pricePerKg: number,
    trader: User
  ): { success: boolean; message: string; auction?: Auction } {
    const auctions = this.getAuctions();
    const auction = auctions.find((a) => a.id === auctionId);

    if (!auction) {
      return { success: false, message: 'المزاد غير موجود.' };
    }

    if (auction.status !== 'ACTIVE') {
      return { success: false, message: 'عذراً، المزاد غير نشط حالياً أو انتهى وقته.' };
    }

    if (new Date(auction.endsAt) <= new Date()) {
      return { success: false, message: 'انتهت مدة المزاد، لا يمكن قبول مزايدات جديدة.' };
    }

    if (auction.sellerId === trader.id) {
      return { success: false, message: 'لا يستطيع صاحب الخردة المزايدة على مزاده الخاص.' };
    }

    if (pricePerKg <= auction.currentPricePerKg) {
      return {
        success: false,
        message: `⚠️ يجب أن تكون مزايدتك أعلى من أعلى سعر حالي (${auction.currentPricePerKg.toLocaleString('ar-IQ')} د.ع).`,
      };
    }

    const calculatedTotal = auction.approxWeightKg * pricePerKg;

    const newBid: Bid = {
      id: `bid-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      auctionId,
      traderId: trader.id,
      traderName: trader.name,
      traderPhone: trader.phone,
      isVerifiedTrader: trader.isVerifiedTrader,
      pricePerKg,
      totalCalculated: calculatedTotal,
      timestamp: new Date().toISOString(),
    };

    const updatedAuction: Auction = {
      ...auction,
      currentPricePerKg: pricePerKg,
      totalEstimatedValue: calculatedTotal,
      winnerId: trader.id,
      winnerName: trader.name,
      winnerPhone: trader.phone,
      winnerIsVerified: trader.isVerifiedTrader,
      winningBidPerKg: pricePerKg,
      totalWinningAmount: calculatedTotal,
      bidsCount: auction.bidsCount + 1,
      bids: [newBid, ...auction.bids],
    };

    this.saveAuction(updatedAuction);

    // Notify seller
    this.addNotification({
      title: 'مزايدة جديدة على مزادك 🔨',
      message: `زايد التاجر ${trader.name} بسعر ${pricePerKg.toLocaleString('ar-IQ')} د.ع/كغم على (${auction.title}).`,
      type: 'bid',
      auctionId,
      userId: auction.sellerId,
    });

    return {
      success: true,
      message: '✅ تمت المزايدة بنجاح! أنت الآن صاحب أعلى سعر.',
      auction: updatedAuction,
    };
  }

  // --- ZainCash Payment Gateway & Backend Verification ---
  createPaymentOrder(auctionId: string, trader: User): PaymentOrder {
    const auction = this.getAuctionById(auctionId);
    const settings = this.getSettings();
    const orderId = `ZC-${Math.floor(100000 + Math.random() * 900000)}-QOT`;
    const refNum = `REF-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const order: PaymentOrder = {
      id: orderId,
      auctionId,
      auctionTitle: auction?.title || 'عمولة مزاد خردة',
      payerId: trader.id,
      payerName: trader.name,
      payerPhone: trader.phone,
      amount: settings.totalCommission, // 2,000 IQD
      currency: 'IQD',
      gateway: 'ZainCash',
      status: 'PENDING',
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
    };

    const payments = this.getPayments();
    payments.unshift(order);
    this.set(STORAGE_KEYS.PAYMENTS, payments);

    if (auction) {
      this.saveAuction({
        ...auction,
        paymentOrderId: orderId,
        paymentStatus: 'PENDING',
      });
    }

    return order;
  }

  verifyZainCashPayment(
    orderId: string
  ): Promise<{ success: boolean; message: string; auction?: Auction }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const payments = this.getPayments();
        const orderIndex = payments.findIndex((p) => p.id === orderId);

        if (orderIndex < 0) {
          resolve({ success: false, message: 'رقم العملية غير موجود بالنظام.' });
          return;
        }

        // Update payment order to SUCCESS
        payments[orderIndex].status = 'SUCCESS';
        payments[orderIndex].completedAt = new Date().toISOString();
        this.set(STORAGE_KEYS.PAYMENTS, payments);

        // Update Auction
        const auctionId = payments[orderIndex].auctionId;
        const auction = this.getAuctionById(auctionId);

        if (auction) {
          const updatedAuction: Auction = {
            ...auction,
            status: 'COMMISSION_PAID',
            paymentStatus: 'SUCCESS',
            paymentPaidAt: new Date().toISOString(),
          };
          this.saveAuction(updatedAuction);

          // Notifications
          this.addNotification({
            title: 'تم دفع عمولة عَتّاك بنجاح! 💳✅',
            message: `تم التحقق من بوابة ZainCash بنجاح. أصبح بإمكانك التواصل مع البائع (${auction.sellerName}) على رقمه الخاص الآن.`,
            type: 'payment_success',
            auctionId,
            userId: payments[orderIndex].payerId,
          });

          this.addNotification({
            title: 'تم دفع العمولة من قبل التاجر الفائز 📞🤝',
            message: `قام التاجر (${auction.winnerName}) بدفع العمولة عبر ZainCash. سيتواصل معك قريباً للاتفاق على الاستلام.`,
            type: 'payment_success',
            auctionId,
            userId: auction.sellerId,
          });

          resolve({
            success: true,
            message: 'تم تأكيد الدفع بنجاح عبر بوابة زين كاش! تم إظهار معلومات التواصل.',
            auction: updatedAuction,
          });
        } else {
          resolve({ success: false, message: 'المزاد غير موجود.' });
        }
      }, 1200);
    });
  }

  getPayments(): PaymentOrder[] {
    return this.get<PaymentOrder[]>(STORAGE_KEYS.PAYMENTS, []);
  }

  // --- Ratings ---
  getRatings(): Rating[] {
    return this.get<Rating[]>(STORAGE_KEYS.RATINGS, []);
  }

  addRating(rating: Omit<Rating, 'id' | 'createdAt'>): void {
    const ratings = this.getRatings();
    const newRating: Rating = {
      ...rating,
      id: `rat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    ratings.unshift(newRating);
    this.set(STORAGE_KEYS.RATINGS, ratings);

    // Update target user average rating
    const users = this.getUsers();
    const targetUser = users.find((u) => u.id === rating.toUserId);
    if (targetUser) {
      const userRatings = ratings.filter((r) => r.toUserId === rating.toUserId);
      const totalStars = userRatings.reduce((sum, r) => sum + r.stars, 0);
      const avg = Number((totalStars / userRatings.length).toFixed(1));
      this.updateUser({
        ...targetUser,
        rating: avg,
        ratingCount: userRatings.length,
      });
    }
  }

  // --- Complaints ---
  getComplaints(): Complaint[] {
    return this.get<Complaint[]>(STORAGE_KEYS.COMPLAINTS, []);
  }

  addComplaint(complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>): void {
    const list = this.getComplaints();
    const newComp: Complaint = {
      ...complaint,
      id: `cmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newComp);
    this.set(STORAGE_KEYS.COMPLAINTS, list);
  }

  updateComplaintStatus(id: string, status: Complaint['status']): void {
    const list = this.getComplaints().map((c) => (c.id === id ? { ...c, status } : c));
    this.set(STORAGE_KEYS.COMPLAINTS, list);
  }

  // --- Notifications ---
  getNotifications(): AppNotification[] {
    const rawNotifs = this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-pay-trader',
        title: 'تم دفع العمولة من قبل التاجر الفائز 📞🤝',
        message: 'قام التاجر (الحاج جاسم الخفاجي) بدفع العمولة عبر ZainCash. سيتواصل معك قريباً للاتفاق على الاستلام.',
        type: 'payment_success',
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: 'notif-win-example',
        title: 'مبروك! فزت بمزاد خردة ألمنيوم 50 كغم 🏆',
        message: 'تم ترسية المزاد لصالحك كأعلى مزايدة. يمكنك الآن دفع العمولة عبر زين كاش لاستلام رقم البائع.',
        type: 'win',
        isRead: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
      {
        id: 'notif-pay-success',
        title: 'تم دفع عمولة عَتّاك بنجاح! 💳✅',
        message: 'تم التحقق من بوابة ZainCash بنجاح. أصبح بإمكانك التواصل مع البائع على رقمه الخاص الآن.',
        type: 'payment_success',
        isRead: false,
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: 'notif-maint-example',
        title: 'إشعار صيانة المنظومة وتحديث الخوادم 🔧',
        message: 'تم إجراء صيانة وتحديثات على الخوادم لضمان سرعة واستقرار مزادات الخردة.',
        type: 'admin',
        isRead: false,
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      },
      {
        id: 'notif-welcome',
        title: 'أهلاً بك في عَتّاك | Attak ♻️',
        message: 'منصة مزادات الخردة الأولى في العراق. بيع خردتك بأعلى سعر 🔨♻️',
        type: 'admin',
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ]);

    // Sanitize and ensure every notification has a strictly unique ID
    const seenIds = new Set<string>();
    let hasDuplicate = false;

    const sanitizedNotifs = rawNotifs.map((notif, index) => {
      let currentId = notif.id;
      if (!currentId || seenIds.has(currentId)) {
        hasDuplicate = true;
        currentId = `${currentId || 'notif'}-${index}-${Math.random().toString(36).substring(2, 7)}`;
      }
      seenIds.add(currentId);
      return {
        ...notif,
        id: currentId,
      };
    });

    if (hasDuplicate) {
      this.set(STORAGE_KEYS.NOTIFICATIONS, sanitizedNotifs);
    }

    return sanitizedNotifs;
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>): void {
    const notifs = this.getNotifications();
    const uniqueId = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    notifs.unshift({
      ...notif,
      id: uniqueId,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  markAllNotificationsRead(): void {
    const notifs = this.getNotifications().map((n) => ({ ...n, isRead: true }));
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  // --- Settings ---
  getSettings(): AppSettings {
    return this.get<AppSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  updateSettings(settings: AppSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  // Reset to default
  resetData(): void {
    localStorage.clear();
    this.getUsers();
    this.getCategories();
    this.getAuctions();
    this.getSettings();
  }
}

export const store = new StoreService();
