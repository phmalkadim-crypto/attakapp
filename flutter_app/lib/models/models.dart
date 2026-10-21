class User {
  final String id;
  final String name;
  final String phone;
  final String governorate;
  final String area;
  final String role; // 'trader' | 'seller' | 'admin'
  final bool isVerifiedTrader;
  final double rating;
  final int ratingCount;

  User({
    required this.id,
    required this.name,
    required this.phone,
    required this.governorate,
    required this.area,
    required this.role,
    this.isVerifiedTrader = false,
    this.rating = 5.0,
    this.ratingCount = 1,
  });
}

class Category {
  final String id;
  final String nameAr;
  final String icon;
  final String slug;

  Category({
    required this.id,
    required this.nameAr,
    required this.icon,
    required this.slug,
  });
}

class Bid {
  final String id;
  final String auctionId;
  final String traderId;
  final String traderName;
  final String traderPhone;
  final int pricePerKg;
  final int totalCalculated;
  final DateTime timestamp;

  Bid({
    required this.id,
    required this.auctionId,
    required this.traderId,
    required this.traderName,
    required this.traderPhone,
    required this.pricePerKg,
    required this.totalCalculated,
    required this.timestamp,
  });
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
  final DateTime endsAt;
  String status; // 'ACTIVE' | 'WAITING_FOR_COMMISSION' | 'COMMISSION_PAID'
  String? winnerId;
  String? winnerName;
  String? winnerPhone;
  int bidsCount;
  List<Bid> bids;

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
    required this.endsAt,
    this.status = 'ACTIVE',
    this.winnerId,
    this.winnerName,
    this.winnerPhone,
    this.bidsCount = 0,
    required this.bids,
  });

  bool get isEnded => DateTime.now().isAfter(endsAt) || status != 'ACTIVE';
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
