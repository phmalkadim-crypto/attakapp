export type UserRole = 'trader' | 'seller' | 'both' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  governorate: string;
  area: string;
  role: UserRole;
  isVerifiedTrader: boolean;
  rating: number;
  ratingCount: number;
  totalAuctions?: number;
  totalDeals?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  slug: string;
  isActive: boolean;
  minStartPrice: number;
  description: string;
  image: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  traderId: string;
  traderName: string;
  traderPhone: string;
  isVerifiedTrader?: boolean;
  pricePerKg: number;
  totalCalculated: number;
  timestamp: string;
}

export type AuctionStatus = 'ACTIVE' | 'WAITING_FOR_COMMISSION' | 'COMMISSION_PAID' | 'COMPLETED' | 'CANCELLED';

export interface Auction {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  approxWeightKg: number;
  governorate: string;
  area: string;
  description: string;
  startPricePerKg: number;
  currentPricePerKg: number;
  totalEstimatedValue: number;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  durationHours: number;
  createdAt: string;
  endsAt: string;
  status: AuctionStatus;
  winnerId?: string;
  winnerName?: string;
  winnerPhone?: string;
  winnerIsVerified?: boolean;
  winningBidPerKg?: number;
  totalWinningAmount?: number;
  commissionTrader: number;
  commissionSeller: number;
  totalCommission: number;
  bidsCount: number;
  bids: Bid[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type?: 'bid' | 'outbid' | 'auction_won' | 'commission_required' | 'commission_paid' | 'deal_completed' | 'admin';
  auctionId?: string;
}

export interface AppSettings {
  traderCommission: number;
  sellerCommission: number;
  totalCommission: number;
  minDurationHours: number;
  maxDurationHours: number;
  zainCashMerchantId: string;
  supportPhone: string;
  termsAndConditionsAr: string;
  privacyPolicyAr: string;
}
