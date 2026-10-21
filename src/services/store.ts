import { Auction, Category, User, AppNotification, AppSettings } from '../types';
import { INITIAL_USERS, INITIAL_CATEGORIES, INITIAL_SETTINGS, SCRAP_IMAGES } from '../data/constants';

const STORAGE_KEYS = {
  USERS: 'attak_users_data',
  CURRENT_USER: 'attak_current_user',
  AUCTIONS: 'attak_auctions_data',
  CATEGORIES: 'attak_categories_data',
  NOTIFICATIONS: 'attak_notifications_data',
  SETTINGS: 'attak_app_settings',
};

class Store {
  private get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }

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
      const defaultUser = this.getUsers()[1]; // الحاج جاسم الخفاجي
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
    if (!users.some((u) => u.id === updated.id)) {
      users.push(updated);
    }
    this.set(STORAGE_KEYS.USERS, users);
    const curr = this.getCurrentUser();
    if (curr.id === updated.id) {
      this.setCurrentUser(updated);
    }
  }

  getCategories(): Category[] {
    const cats = this.get<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    if (!cats || cats.length === 0) {
      this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      return INITIAL_CATEGORIES;
    }
    return cats;
  }

  getAuctions(): Auction[] {
    const auctions = this.get<Auction[]>(STORAGE_KEYS.AUCTIONS, []);
    if (!auctions || auctions.length === 0) {
      const now = new Date();
      const endsIn4Hours = new Date(now.getTime() + 4 * 3600 * 1000).toISOString();
      const endsIn8Hours = new Date(now.getTime() + 8 * 3600 * 1000).toISOString();

      const initialAuctions: Auction[] = [
        {
          id: 'auc-cans-diwaniyah-1',
          title: 'بالات قواطي مشروبات غازية مكبوسة 500 كغم جاهزة للنقل',
          categoryId: 'cat-cans',
          categoryName: 'قواطي مشروبات',
          images: [SCRAP_IMAGES.cans],
          approxWeightKg: 500,
          governorate: 'الديوانية',
          area: 'حي العروبة',
          description: 'قواطي بيبسي ومشروبات ألمنيوم مكبوسة بالات نظيفة، خالية من الشوائب ومفحوصة بالقبان.',
          startPricePerKg: 1500,
          currentPricePerKg: 1750,
          totalEstimatedValue: 875000,
          sellerId: 'usr-seller-1',
          sellerName: 'أبو كرار الديواني',
          sellerPhone: '07812345678',
          durationHours: 6,
          createdAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
          endsAt: endsIn4Hours,
          status: 'ACTIVE',
          commissionTrader: 1000,
          commissionSeller: 1000,
          totalCommission: 2000,
          bidsCount: 3,
          bids: [
            {
              id: 'bid-1',
              auctionId: 'auc-cans-diwaniyah-1',
              traderId: 'usr-trader-1',
              traderName: 'الحاج جاسم الخفاجي',
              traderPhone: '07709876543',
              pricePerKg: 1750,
              totalCalculated: 875000,
              timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
            },
          ],
        },
        {
          id: 'auc-copper-baghdad-2',
          title: 'كابلات وأسلاك نحاس أحمر صافي مقشر من محولات ومشاريع',
          categoryId: 'cat-copper',
          categoryName: 'نحاس أحمر وأصفر',
          images: [SCRAP_IMAGES.copper],
          approxWeightKg: 120,
          governorate: 'بغداد',
          area: 'الشورجة',
          description: 'نحاس أحمر لامع صافي 99%، مقشر خالي من العوازل والمحترق، جاهز للتحميل والتوزين الدقيق.',
          startPricePerKg: 11000,
          currentPricePerKg: 12200,
          totalEstimatedValue: 1464000,
          sellerId: 'usr-seller-2',
          sellerName: 'أحمد التميمي',
          sellerPhone: '07733445566',
          durationHours: 12,
          createdAt: new Date(now.getTime() - 3 * 3600 * 1000).toISOString(),
          endsAt: endsIn8Hours,
          status: 'ACTIVE',
          commissionTrader: 1000,
          commissionSeller: 1000,
          totalCommission: 2000,
          bidsCount: 2,
          bids: [],
        },
      ];
      this.set(STORAGE_KEYS.AUCTIONS, initialAuctions);
      return initialAuctions;
    }
    return auctions;
  }

  saveAuction(auction: Auction): void {
    const list = this.getAuctions();
    const idx = list.findIndex((a) => a.id === auction.id);
    if (idx >= 0) {
      list[idx] = auction;
    } else {
      list.unshift(auction);
    }
    this.set(STORAGE_KEYS.AUCTIONS, list);
  }

  getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'n-1',
        title: 'مرحباً بك في منصة عَتّاك 🔨',
        message: 'منصة مزادات وتجارة الخردة الأولى في العراق. بيع واشترِ بأعلى سعر وبأمان تام.',
        timestamp: new Date().toISOString(),
        isRead: false,
        type: 'admin',
      },
    ]);
  }

  getSettings(): AppSettings {
    return this.get<AppSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
}

export const store = new Store();
