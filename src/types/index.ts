export type UserRole = 'seller' | 'trader' | 'both' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  governorate: string;
  area: string;
  role: UserRole;
  isVerifiedTrader: boolean;
  avatar?: string;
  rating: number;
  ratingCount: number;
  totalAuctions: number;
  totalDeals: number;
  isBanned?: boolean;
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
  image?: string;
}

export type AuctionStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'ENDED'
  | 'WAITING_FOR_COMMISSION'
  | 'COMMISSION_PAID'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Bid {
  id: string;
  auctionId: string;
  traderId: string;
  traderName: string;
  traderPhone: string;
  isVerifiedTrader: boolean;
  pricePerKg: number;
  totalCalculated: number;
  timestamp: string;
}

export interface Auction {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  approxWeightKg: number;
  governorate: string;
  area: string;
  description?: string;
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
  paymentOrderId?: string;
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED' | 'REFUNDED';
  paymentPaidAt?: string;
  bidsCount: number;
  bids: Bid[];
}

export interface PaymentOrder {
  id: string;
  auctionId: string;
  auctionTitle: string;
  payerId: string;
  payerName: string;
  payerPhone: string;
  amount: number;
  currency: 'IQD';
  gateway: 'ZainCash';
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';
  referenceNumber: string;
  createdAt: string;
  completedAt?: string;
}

export interface Rating {
  id: string;
  auctionId: string;
  fromUserId: string;
  toUserId: string;
  stars: number;
  tags: string[];
  comment?: string;
  createdAt: string;
}

export type ComplaintType =
  | 'مشكلة مع التاجر'
  | 'مشكلة مع البائع'
  | 'لم يتم الاستلام'
  | 'مشكلة في الوزن'
  | 'مشكلة في الدفع'
  | 'أخرى';

export interface Complaint {
  id: string;
  auctionId: string;
  auctionTitle: string;
  fromUserId: string;
  fromUserName: string;
  againstUserId: string;
  againstUserName: string;
  type: ComplaintType;
  description: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'bid' | 'outbid' | 'auction_end' | 'win' | 'payment_required' | 'payment_success' | 'admin';
  auctionId?: string;
  isRead: boolean;
  createdAt: string;
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
