class User {
  final String id;
  final String name;
  final String phone;
  final String governorate;
  final String area;
  final String role; // 'trader' | 'seller' | 'both' | 'admin'
  bool isVerifiedTrader;
  bool isBanned;
  double rating;
  int ratingCount;

  User({
    required this.id,
    required this.name,
    required this.phone,
    required this.governorate,
    required this.area,
    required this.role,
    this.isVerifiedTrader = false,
    this.isBanned = false,
    this.rating = 5.0,
    this.ratingCount = 1,
  });

  bool get isAdmin => role == 'admin' || phone == '07829692579';
}

class ScrapCategory {
  final String id;
  final String nameAr;
  final String icon;
  final String slug;
  bool isActive;

  ScrapCategory({
    required this.id,
    required this.nameAr,
    required this.icon,
    required this.slug,
    this.isActive = true,
  });
}

class Bid {
  final String id;
  final String auctionId;
  final String traderId;
  final String traderName;
  final String traderPhone;
  final bool isVerifiedTrader;
  final int pricePerKg;
  final int totalCalculated;
  final DateTime timestamp;

  Bid({
    required this.id,
    required this.auctionId,
    required this.traderId,
    required this.traderName,
    required this.traderPhone,
    this.isVerifiedTrader = false,
    required this.pricePerKg,
    required this.totalCalculated,
    required this.timestamp,
  });
}

enum AuctionStatus {
  draft,
  active,
  ended,
  waitingForCommission,
  commissionPaid,
  completed,
  cancelled,
}

class Auction {
  final String id;
  final String title;
  final String categoryId;
  final String categoryName;
  final String imageUrl;
  final int approxWeightKg;
  final String governorate;
  final String area;
  final String description;
  final int startPricePerKg;
  int currentPricePerKg;
  int totalEstimatedValue;
  final String sellerId;
  final String sellerName;
  final String sellerPhone;
  final DateTime createdAt;
  final DateTime endsAt;
  String status; // 'ACTIVE' | 'WAITING_FOR_COMMISSION' | 'COMMISSION_PAID' | 'COMPLETED' | 'CANCELLED'
  String? winnerId;
  String? winnerName;
  String? winnerPhone;
  int bidsCount;
  List<Bid> bids;
  String? paymentOrderId;

  Auction({
    required this.id,
    required this.title,
    required this.categoryId,
    required this.categoryName,
    required this.imageUrl,
    required this.approxWeightKg,
    required this.governorate,
    required this.area,
    required this.description,
    required this.startPricePerKg,
    required this.currentPricePerKg,
    required this.totalEstimatedValue,
    required this.sellerId,
    required this.sellerName,
    required this.sellerPhone,
    required this.createdAt,
    required this.endsAt,
    this.status = 'ACTIVE',
    this.winnerId,
    this.winnerName,
    this.winnerPhone,
    this.bidsCount = 0,
    required this.bids,
    this.paymentOrderId,
  });

  bool get isEnded => DateTime.now().isAfter(endsAt) || status != 'ACTIVE';
  bool get isCommissionPaid => status == 'COMMISSION_PAID' || status == 'COMPLETED';

  int get netSellerAmount => totalEstimatedValue > 1000 ? totalEstimatedValue - 1000 : totalEstimatedValue;
}

class PaymentOrder {
  final String id;
  final String auctionId;
  final String traderId;
  final int amount; // 2,000 IQD
  final String status; // 'PENDING' | 'SUCCESS' | 'FAILED'
  final String transactionId;
  final DateTime createdAt;

  PaymentOrder({
    required this.id,
    required this.auctionId,
    required this.traderId,
    this.amount = 2000,
    required this.status,
    required this.transactionId,
    required this.createdAt,
  });
}

class Rating {
  final String id;
  final String auctionId;
  final String fromUserId;
  final String toUserId;
  final int stars; // 1 to 5
  final List<String> tags;
  final String comment;
  final DateTime createdAt;

  Rating({
    required this.id,
    required this.auctionId,
    required this.fromUserId,
    required this.toUserId,
    required this.stars,
    required this.tags,
    required this.comment,
    required this.createdAt,
  });
}

class Complaint {
  final String id;
  final String auctionId;
  final String userId;
  final String userName;
  final String userPhone;
  final String type; // 'مشكلة مع التاجر' | 'مشكلة مع البائع' | 'لم يتم الاستلام' | 'مشكلة في الوزن' | 'مشكلة في الدفع' | 'أخرى'
  final String description;
  String status; // 'PENDING' | 'RESOLVED'
  final DateTime createdAt;

  Complaint({
    required this.id,
    required this.auctionId,
    required this.userId,
    required this.userName,
    required this.userPhone,
    required this.type,
    required this.description,
    this.status = 'PENDING',
    required this.createdAt,
  });
}

class AppNotification {
  final String id;
  final String title;
  final String message;
  final DateTime timestamp;
  bool isRead;

  AppNotification({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    this.isRead = false,
  });
}
