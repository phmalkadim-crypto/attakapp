import 'dart:math';
import 'package:flutter/material.dart';
import '../models/models.dart';

class AppState extends ChangeNotifier {
  static const String adminPhone = '07829692579';

  // Current logged in user
  User _currentUser = User(
    id: 'usr-admin-master',
    name: 'م. القديم (إدارة عَتّاك)',
    phone: adminPhone,
    governorate: 'بغداد',
    area: 'المنصور',
    role: 'admin',
    isVerifiedTrader: true,
    rating: 5.0,
    ratingCount: 120,
  );

  User get currentUser => _currentUser;
  bool get isAdmin => _currentUser.isAdmin;

  // Dynamic Scrap Categories
  final List<ScrapCategory> _categories = [
    ScrapCategory(id: 'cat-cans', nameAr: 'قواطي ألمنيوم', icon: '🥫', slug: 'cans'),
    ScrapCategory(id: 'cat-copper', nameAr: 'نحاس', icon: '🟠', slug: 'copper'),
    ScrapCategory(id: 'cat-iron', nameAr: 'حديد', icon: '🔩', slug: 'iron'),
    ScrapCategory(id: 'cat-aluminum', nameAr: 'ألمنيوم', icon: '🟡', slug: 'aluminum'),
    ScrapCategory(id: 'cat-batteries', nameAr: 'بطاريات', icon: '🔋', slug: 'batteries'),
    ScrapCategory(id: 'cat-other', nameAr: 'خردة أخرى', icon: '♻️', slug: 'other'),
  ];

  List<ScrapCategory> get categories => _categories.where((c) => c.isActive).toList();
  List<ScrapCategory> get allCategoriesForAdmin => _categories;

  String _selectedCategoryId = 'all';
  String get selectedCategoryId => _selectedCategoryId;

  void setCategory(String id) {
    _selectedCategoryId = id;
    notifyListeners();
  }

  // Active Users List (for Admin management)
  final List<User> _users = [
    User(
      id: 'usr-admin-master',
      name: 'م. القديم (إدارة عَتّاك)',
      phone: adminPhone,
      governorate: 'بغداد',
      area: 'المنصور',
      role: 'admin',
      isVerifiedTrader: true,
      rating: 5.0,
      ratingCount: 120,
    ),
    User(
      id: 'usr-seller-1',
      name: 'أبو كرار الديواني',
      phone: '07812345678',
      governorate: 'الديوانية',
      area: 'حي العروبة',
      role: 'seller',
      rating: 4.9,
      ratingCount: 34,
    ),
    User(
      id: 'usr-trader-1',
      name: 'الحاج جاسم الخفاجي',
      phone: '07709876543',
      governorate: 'النجف الأشرف',
      area: 'مجمع السكراب',
      role: 'trader',
      isVerifiedTrader: true,
      rating: 4.8,
      ratingCount: 52,
    ),
    User(
      id: 'usr-seller-2',
      name: 'أحمد التميمي',
      phone: '07733445566',
      governorate: 'بغداد',
      area: 'الشورجة',
      role: 'seller',
      rating: 4.7,
      ratingCount: 19,
    ),
    User(
      id: 'usr-trader-2',
      name: 'ريبوار كمال (تاجر الشمال)',
      phone: '07503332211',
      governorate: 'أربيل',
      area: 'الصناعية الشمالية',
      role: 'trader',
      isVerifiedTrader: true,
      rating: 5.0,
      ratingCount: 41,
    ),
  ];

  List<User> get users => _users;

  // Live Auctions Database
  final List<Auction> _auctions = [
    Auction(
      id: 'auc-1',
      title: 'بالات قواطي مشروبات غازية مكبوسة 50 كغم',
      categoryId: 'cat-cans',
      categoryName: 'قواطي ألمنيوم',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 50,
      governorate: 'الديوانية',
      area: 'حي العروبة',
      description: 'قواطي بيبسي وريدبول ألمنيوم مكبوسة بالات نظيفة، خالية من الرمل، الوزن تقريبي 50 كغم والاتفاق النهائي على القبان.',
      startPricePerKg: 1500,
      currentPricePerKg: 1700,
      totalEstimatedValue: 85000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار الديواني',
      sellerPhone: '07812345678',
      createdAt: DateTime.now().subtract(const Duration(hours: 3)),
      endsAt: DateTime.now().add(const Duration(hours: 3)),
      status: 'ACTIVE',
      bidsCount: 3,
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      bids: [
        Bid(
          id: 'b-1',
          auctionId: 'auc-1',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 1700,
          totalCalculated: 85000,
          timestamp: DateTime.now().subtract(const Duration(minutes: 12)),
        ),
        Bid(
          id: 'b-2',
          auctionId: 'auc-1',
          traderId: 'usr-trader-2',
          traderName: 'ريبوار كمال',
          traderPhone: '07503332211',
          isVerifiedTrader: true,
          pricePerKg: 1650,
          totalCalculated: 82500,
          timestamp: DateTime.now().subtract(const Duration(minutes: 45)),
        ),
        Bid(
          id: 'b-3',
          auctionId: 'auc-1',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 1600,
          totalCalculated: 80000,
          timestamp: DateTime.now().subtract(const Duration(hours: 1)),
        ),
      ],
    ),
    Auction(
      id: 'auc-2',
      title: 'كابلات وأسلاك نحاس أحمر صافي مقشر من مشاريع كهرباء',
      categoryId: 'cat-copper',
      categoryName: 'نحاس',
      imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 120,
      governorate: 'بغداد',
      area: 'الشورجة - مجمع النحاسين',
      description: 'نحاس أحمر لامع صافي 99%، مقشر خالي من العوازل والمطاط، جاهز للتحميل والتوزين الدقيق.',
      startPricePerKg: 11000,
      currentPricePerKg: 12200,
      totalEstimatedValue: 1464000,
      sellerId: 'usr-seller-2',
      sellerName: 'أحمد التميمي',
      sellerPhone: '07733445566',
      createdAt: DateTime.now().subtract(const Duration(hours: 2)),
      endsAt: DateTime.now().add(const Duration(hours: 8)),
      status: 'ACTIVE',
      bidsCount: 2,
      winnerId: 'usr-trader-1',
      winnerName: 'الحاج جاسم الخفاجي',
      winnerPhone: '07709876543',
      bids: [
        Bid(
          id: 'b-4',
          auctionId: 'auc-2',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          isVerifiedTrader: true,
          pricePerKg: 12200,
          totalCalculated: 1464000,
          timestamp: DateTime.now().subtract(const Duration(minutes: 30)),
        ),
      ],
    ),
    Auction(
      id: 'auc-3',
      title: 'شحنة حديد شيلمان وزوايا وبقايا ورشة ثقيلة',
      categoryId: 'cat-iron',
      categoryName: 'حديد',
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 3500,
      governorate: 'البصرة',
      area: 'الزبير - صناعية السكراب',
      description: 'حديد ثقيل وهياكل إنشائية نظيفة خالية من الصدأ المتآكل، البيع بالطن/كغم حسب قبان معتمد.',
      startPricePerKg: 420,
      currentPricePerKg: 480,
      totalEstimatedValue: 1680000,
      sellerId: 'usr-seller-1',
      sellerName: 'أبو كرار الديواني',
      sellerPhone: '07812345678',
      createdAt: DateTime.now().subtract(const Duration(hours: 5)),
      endsAt: DateTime.now().add(const Duration(hours: 12)),
      status: 'ACTIVE',
      bidsCount: 4,
      bids: [],
    ),
    Auction(
      id: 'auc-4',
      title: 'سكراب بطاريات سيارات وشاحنات تالفة (رصاص)',
      categoryId: 'cat-batteries',
      categoryName: 'بطاريات',
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 800,
      governorate: 'النجف الأشرف',
      area: 'طريق كربلاء',
      description: 'بطاريات جافة وسائلة مفروزة وجاهزة للصهر وإعادة التدوير واستخراج الرصاص.',
      startPricePerKg: 850,
      currentPricePerKg: 950,
      totalEstimatedValue: 760000,
      sellerId: 'usr-seller-2',
      sellerName: 'أحمد التميمي',
      sellerPhone: '07733445566',
      createdAt: DateTime.now().subtract(const Duration(hours: 6)),
      endsAt: DateTime.now().subtract(const Duration(minutes: 10)),
      status: 'WAITING_FOR_COMMISSION',
      winnerId: 'usr-admin-master',
      winnerName: 'م. القديم (إدارة عَتّاك)',
      winnerPhone: adminPhone,
      bidsCount: 5,
      bids: [],
    ),
  ];

  List<Auction> get auctions {
    if (_selectedCategoryId == 'all') {
      return _auctions;
    }
    return _auctions.where((a) => a.categoryId == _selectedCategoryId).toList();
  }

  List<Auction> get allAuctionsForAdmin => _auctions;

  // Payments / Transactions
  final List<PaymentOrder> _payments = [];
  List<PaymentOrder> get payments => _payments;

  // Ratings
  final List<Rating> _ratings = [];
  List<Rating> get ratings => _ratings;

  // Complaints
  final List<Complaint> _complaints = [
    Complaint(
      id: 'cmp-1',
      auctionId: 'auc-4',
      userId: 'usr-trader-1',
      userName: 'الحاج جاسم الخفاجي',
      userPhone: '07709876543',
      type: 'مشكلة في الوزن',
      description: 'تم الاتفاق على 800 كغم وعند الوصول للموقع كان الوزن في القبان 720 كغم فقط.',
      status: 'PENDING',
      createdAt: DateTime.now().subtract(const Duration(hours: 1)),
    ),
  ];
  List<Complaint> get complaints => _complaints;

  // Notifications
  final List<AppNotification> _notifications = [
    AppNotification(
      id: 'n-1',
      title: 'مزايدة جديدة على مزادك 🔨',
      message: 'قام التاجر الحاج جاسم بتقديم مزايدة بسعر 1,700 د.ع للكيلو على قواطي ألمنيوم.',
      timestamp: DateTime.now().subtract(const Duration(minutes: 12)),
    ),
    AppNotification(
      id: 'n-2',
      title: 'تنبيه أمان ودفع العمولة 🔐',
      message: 'عمولة عَتّاك الثابتة هي 2,000 د.ع فقط عبر زين كاش لفتح رقم البائع مباشرة.',
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
    AppNotification(
      id: 'n-3',
      title: 'توثيق تاجر معتمد 🔵',
      message: 'حصلت على شارة «تاجر معتمد» من إدارة عَتّاك لالتزامك بالمزايدات.',
      timestamp: DateTime.now().subtract(const Duration(days: 1)),
    ),
  ];

  List<AppNotification> get notifications => _notifications;

  // Authentication & Profile Setup
  void login(String phone, String password) {
    final clean = phone.trim().replaceAll(' ', '');
    final existingUser = _users.firstWhere(
      (u) => u.phone == clean,
      orElse: () {
        final isAdmin = clean == adminPhone;
        final newUser = User(
          id: isAdmin ? 'usr-admin-master' : 'usr-${DateTime.now().millisecondsSinceEpoch}',
          name: isAdmin ? 'م. القديم (إدارة عَتّاك)' : 'تاجر عَتّاك (${clean.length >= 4 ? clean.substring(clean.length - 4) : clean})',
          phone: clean,
          governorate: 'بغداد',
          area: 'المركز',
          role: isAdmin ? 'admin' : 'trader',
          isVerifiedTrader: isAdmin,
        );
        _users.add(newUser);
        return newUser;
      },
    );

    _currentUser = existingUser;
    notifyListeners();
  }

  void register({
    required String name,
    required String phone,
    required String governorate,
    required String area,
    required String role, // 'seller' | 'trader' | 'both'
  }) {
    final clean = phone.trim().replaceAll(' ', '');
    final isAdmin = clean == adminPhone;
    final newUser = User(
      id: isAdmin ? 'usr-admin-master' : 'usr-${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      phone: clean,
      governorate: governorate,
      area: area,
      role: isAdmin ? 'admin' : role,
      isVerifiedTrader: isAdmin,
    );
    _users.add(newUser);
    _currentUser = newUser;
    notifyListeners();
  }

  // Bidding Action
  String? placeBid({
    required String auctionId,
    required int newPricePerKg,
  }) {
    final idx = _auctions.indexWhere((a) => a.id == auctionId);
    if (idx == -1) return 'المزاد غير موجود';

    final a = _auctions[idx];

    // Rule: Auction must be ACTIVE
    if (a.isEnded) return 'المزاد منتهي ولا يمكن المزايدة عليه';

    // Rule: Seller cannot bid on own auction
    if (a.sellerId == _currentUser.id || a.sellerPhone == _currentUser.phone) {
      return 'لا يمكنك المزايدة على مزاد قمت بإنشائه بنفسك';
    }

    // Rule: Bid must be strictly higher than current
    if (newPricePerKg <= a.currentPricePerKg) {
      return 'يجب أن تكون مزايدتك أعلى من أعلى سعر حالي (${a.currentPricePerKg} د.ع)';
    }

    final newTotal = newPricePerKg * a.approxWeightKg;
    a.currentPricePerKg = newPricePerKg;
    a.totalEstimatedValue = newTotal;
    a.bidsCount += 1;
    a.winnerId = _currentUser.id;
    a.winnerName = _currentUser.name;
    a.winnerPhone = _currentUser.phone;

    final newBid = Bid(
      id: 'b-${DateTime.now().millisecondsSinceEpoch}',
      auctionId: auctionId,
      traderId: _currentUser.id,
      traderName: _currentUser.name,
      traderPhone: _currentUser.phone,
      isVerifiedTrader: _currentUser.isVerifiedTrader,
      pricePerKg: newPricePerKg,
      totalCalculated: newTotal,
      timestamp: DateTime.now(),
    );

    a.bids.insert(0, newBid);

    // Add notification
    _notifications.insert(
      0,
      AppNotification(
        id: 'n-${DateTime.now().millisecondsSinceEpoch}',
        title: 'مزايدة مسجلة بنجاح! 🔨',
        message: 'أصبحت أعلى مزايد في مزاد "${a.title}" بسعر $newPricePerKg د.ع/كغم (الإجمالي: $newTotal د.ع).',
        timestamp: DateTime.now(),
      ),
    );

    notifyListeners();
    return null; // Success
  }

  // Add Auction
  void addAuction({
    required String title,
    required String categoryId,
    required String categoryName,
    required int approxWeightKg,
    required int startPricePerKg,
    required String governorate,
    required String area,
    required String description,
    required int durationHours,
    String? customImageUrl,
  }) {
    final now = DateTime.now();
    final newAuction = Auction(
      id: 'auc-${now.millisecondsSinceEpoch}',
      title: title,
      categoryId: categoryId,
      categoryName: categoryName,
      imageUrl: customImageUrl ?? 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: approxWeightKg,
      governorate: governorate,
      area: area,
      description: description,
      startPricePerKg: startPricePerKg,
      currentPricePerKg: startPricePerKg,
      totalEstimatedValue: approxWeightKg * startPricePerKg,
      sellerId: _currentUser.id,
      sellerName: _currentUser.name,
      sellerPhone: _currentUser.phone,
      createdAt: now,
      endsAt: now.add(Duration(hours: durationHours)),
      status: 'ACTIVE',
      bids: [],
    );

    _auctions.insert(0, newAuction);

    _notifications.insert(
      0,
      AppNotification(
        id: 'n-${DateTime.now().millisecondsSinceEpoch}',
        title: 'تم نشر مزادك بنجاح! 🚀',
        message: 'أصبح مزاد "$title" متاحاً الآن للتجار في كل العراق لمدة $durationHours ساعة.',
        timestamp: DateTime.now(),
      ),
    );

    notifyListeners();
  }

  // ZainCash Commission Payment & Verification
  Future<bool> payZainCashCommission(String auctionId) async {
    final idx = _auctions.indexWhere((a) => a.id == auctionId);
    if (idx == -1) return false;

    final a = _auctions[idx];
    final orderId = 'ZC-${Random().nextInt(899999) + 100000}';

    // Simulate backend payment order creation and webhook verification
    final payment = PaymentOrder(
      id: orderId,
      auctionId: auctionId,
      traderId: _currentUser.id,
      amount: 2000,
      status: 'SUCCESS',
      transactionId: 'TX-${DateTime.now().millisecondsSinceEpoch}',
      createdAt: DateTime.now(),
    );

    _payments.add(payment);
    a.status = 'COMMISSION_PAID';
    a.paymentOrderId = orderId;

    _notifications.insert(
      0,
      AppNotification(
        id: 'n-${DateTime.now().millisecondsSinceEpoch}',
        title: 'تم دفع العمولة وتأكيدها! ✅',
        message: 'تم كشف رقم هاتف البائع (${a.sellerPhone}) وموقعه لمزاد "${a.title}". تواصل معه الآن للاتفاق على الاستلام والدفع المباشر.',
        timestamp: DateTime.now(),
      ),
    );

    notifyListeners();
    return true;
  }

  // Submit Rating
  void submitRating({
    required String auctionId,
    required String toUserId,
    required int stars,
    required List<String> tags,
    required String comment,
  }) {
    final rating = Rating(
      id: 'rat-${DateTime.now().millisecondsSinceEpoch}',
      auctionId: auctionId,
      fromUserId: _currentUser.id,
      toUserId: toUserId,
      stars: stars,
      tags: tags,
      comment: comment,
      createdAt: DateTime.now(),
    );
    _ratings.add(rating);

    // Update target user's rating
    final targetUser = _users.firstWhere((u) => u.id == toUserId, orElse: () => _currentUser);
    final totalStars = (targetUser.rating * targetUser.ratingCount) + stars;
    targetUser.ratingCount += 1;
    targetUser.rating = double.parse((totalStars / targetUser.ratingCount).toStringAsFixed(1));

    notifyListeners();
  }

  // Submit Complaint
  void submitComplaint({
    required String auctionId,
    required String type,
    required String description,
  }) {
    final complaint = Complaint(
      id: 'cmp-${DateTime.now().millisecondsSinceEpoch}',
      auctionId: auctionId,
      userId: _currentUser.id,
      userName: _currentUser.name,
      userPhone: _currentUser.phone,
      type: type,
      description: description,
      status: 'PENDING',
      createdAt: DateTime.now(),
    );
    _complaints.insert(0, complaint);

    _notifications.insert(
      0,
      AppNotification(
        id: 'n-${DateTime.now().millisecondsSinceEpoch}',
        title: 'تم استلام شكواك ⚠️',
        message: 'تم إرسال الشكوى لإدارة عَتّاك وسيتم مراجعتها والتواصل معك عبر الرقم ${_currentUser.phone}.',
        timestamp: DateTime.now(),
      ),
    );

    notifyListeners();
  }

  // ADMIN ACTIONS
  void adminToggleCategory(String categoryId) {
    if (!isAdmin) return;
    final cat = _categories.firstWhere((c) => c.id == categoryId);
    cat.isActive = !cat.isActive;
    notifyListeners();
  }

  void adminAddCategory({required String nameAr, required String icon, required String slug}) {
    if (!isAdmin) return;
    final newCat = ScrapCategory(
      id: 'cat-${DateTime.now().millisecondsSinceEpoch}',
      nameAr: nameAr,
      icon: icon,
      slug: slug,
      isActive: true,
    );
    _categories.add(newCat);
    notifyListeners();
  }

  void adminDeleteCategory(String categoryId) {
    if (!isAdmin) return;
    _categories.removeWhere((c) => c.id == categoryId);
    notifyListeners();
  }

  void adminVerifyTrader(String userId) {
    if (!isAdmin) return;
    final u = _users.firstWhere((user) => user.id == userId);
    u.isVerifiedTrader = !u.isVerifiedTrader;
    notifyListeners();
  }

  void adminToggleBanUser(String userId) {
    if (!isAdmin) return;
    final u = _users.firstWhere((user) => user.id == userId);
    u.isBanned = !u.isBanned;
    notifyListeners();
  }

  void adminStopAuction(String auctionId) {
    if (!isAdmin) return;
    final a = _auctions.firstWhere((auc) => auc.id == auctionId);
    a.status = 'CANCELLED';
    notifyListeners();
  }

  void adminResolveComplaint(String complaintId) {
    if (!isAdmin) return;
    final c = _complaints.firstWhere((comp) => comp.id == complaintId);
    c.status = 'RESOLVED';
    notifyListeners();
  }
}
