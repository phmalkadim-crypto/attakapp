import 'package:flutter/foundation.dart';
import '../models/models.dart';

class AppState extends ChangeNotifier {
  static const String adminPhone = '07829692579';

  User _currentUser = User(
    id: 'usr-trader-1',
    name: 'الحاج جاسم الخفاجي',
    phone: '07709876543',
    governorate: 'بغداد',
    area: 'الشورجة',
    role: 'trader',
    isVerifiedTrader: true,
    rating: 5.0,
    ratingCount: 38,
  );

  User get currentUser => _currentUser;

  final List<Category> _categories = [
    Category(id: 'all', nameAr: 'الكل', icon: '🔥', slug: 'all'),
    Category(id: 'cat-cans', nameAr: 'قواطي ألمنيوم', icon: '🥫', slug: 'cans'),
    Category(id: 'cat-copper', nameAr: 'نحاس أحمر/أصفر', icon: '⚡', slug: 'copper'),
    Category(id: 'cat-iron', nameAr: 'حديد وهياكل', icon: '🏗️', slug: 'iron'),
    Category(id: 'cat-profiles', nameAr: 'ألمنيوم بروفيل', icon: '🪟', slug: 'profiles'),
    Category(id: 'cat-batteries', nameAr: 'بطاريات سيارات', icon: '🔋', slug: 'batteries'),
    Category(id: 'cat-other', nameAr: 'معادن أخرى', icon: '♻️', slug: 'other'),
  ];

  List<Category> get categories => _categories;

  String _selectedCategoryId = 'all';
  String get selectedCategoryId => _selectedCategoryId;

  void setCategory(String id) {
    _selectedCategoryId = id;
    notifyListeners();
  }

  final List<Auction> _auctions = [
    Auction(
      id: 'auc-1',
      title: 'بالات قواطي مشروبات غازية مكبوسة 500 كغم جاهزة للنقل',
      categoryId: 'cat-cans',
      categoryName: 'قواطي ألمنيوم',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
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
      endsAt: DateTime.now().add(const Duration(hours: 4)),
      bidsCount: 5,
      bids: [
        Bid(
          id: 'b-1',
          auctionId: 'auc-1',
          traderId: 'usr-trader-1',
          traderName: 'الحاج جاسم الخفاجي',
          traderPhone: '07709876543',
          pricePerKg: 1750,
          totalCalculated: 875000,
          timestamp: DateTime.now().subtract(const Duration(minutes: 15)),
        ),
      ],
    ),
    Auction(
      id: 'auc-2',
      title: 'كابلات وأسلاك نحاس أحمر صافي مقشر من محولات ومشاريع',
      categoryId: 'cat-copper',
      categoryName: 'نحاس أحمر/أصفر',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 120,
      governorate: 'بغداد',
      area: 'الشورجة',
      description: 'نحاس أحمر لامع صافي 99%، مقشر خالي من العوازل، جاهز للتحميل والتوزين الدقيق.',
      startPricePerKg: 11000,
      currentPricePerKg: 12200,
      totalEstimatedValue: 1464000,
      sellerId: 'usr-seller-2',
      sellerName: 'أحمد التميمي',
      sellerPhone: '07733445566',
      endsAt: DateTime.now().add(const Duration(hours: 8)),
      bidsCount: 3,
      bids: [],
    ),
    Auction(
      id: 'auc-3',
      title: 'شحنة حديد شيلمان وزوايا وبقايا ورشة حدادة ثقيلة',
      categoryId: 'cat-iron',
      categoryName: 'حديد وهياكل',
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: 3500,
      governorate: 'البصرة',
      area: 'الزبير',
      description: 'حديد ثقيل وهياكل نظيفة خالية من الصدأ المتآكل، الوزن الصافي حسب قبان معتمد.',
      startPricePerKg: 420,
      currentPricePerKg: 480,
      totalEstimatedValue: 1680000,
      sellerId: 'usr-seller-3',
      sellerName: 'فاضل الربيعي',
      sellerPhone: '07701122334',
      endsAt: DateTime.now().add(const Duration(hours: 12)),
      bidsCount: 4,
      bids: [],
    ),
  ];

  List<Auction> get auctions {
    if (_selectedCategoryId == 'all') {
      return _auctions;
    }
    return _auctions.where((a) => a.categoryId == _selectedCategoryId).toList();
  }

  final List<AppNotification> _notifications = [
    AppNotification(
      id: 'n-1',
      title: 'مزايدة جديدة على مزادك 🔨',
      message: 'قام التاجر الحاج جاسم بتقديم مزايدة بسعر 1,750 د.ع للكيلو.',
      timestamp: DateTime.now().subtract(const Duration(minutes: 10)),
    ),
    AppNotification(
      id: 'n-2',
      title: 'تنبيه أمان ودفع العمولة 🔐',
      message: 'عمولة عَتّاك الثابتة هي 2,000 د.ع فقط عبر زين كاش لفتح رقم البائع.',
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
  ];

  List<AppNotification> get notifications => _notifications;

  // Login handler
  void login(String phone, String password) {
    final clean = phone.trim().replaceAll(' ', '');
    if (clean == adminPhone) {
      _currentUser = User(
        id: 'usr-admin-master',
        name: 'إدارة منصة عَتّاك',
        phone: adminPhone,
        governorate: 'بغداد',
        area: 'المنصور',
        role: 'admin',
        isVerifiedTrader: true,
        rating: 5.0,
        ratingCount: 100,
      );
    } else {
      _currentUser = User(
        id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
        name: 'مستخدم عَتّاك (${clean.length >= 4 ? clean.substring(clean.length - 4) : clean})',
        phone: clean,
        governorate: 'بغداد',
        area: 'المركز',
        role: 'trader',
      );
    }
    notifyListeners();
  }

  // Register handler
  void register({
    required String name,
    required String phone,
    required String governorate,
    required String password,
  }) {
    final clean = phone.trim().replaceAll(' ', '');
    final isAdmin = clean == adminPhone;

    _currentUser = User(
      id: isAdmin ? 'usr-admin-master' : 'usr-${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      phone: clean,
      governorate: governorate,
      area: 'المركز',
      role: isAdmin ? 'admin' : 'trader',
      isVerifiedTrader: isAdmin,
    );
    notifyListeners();
  }

  // Place bid
  bool placeBid(String auctionId, int pricePerKg) {
    final idx = _auctions.indexKey((a) => a.id == auctionId);
    if (idx != -1) {
      final a = _auctions[idx];
      if (pricePerKg > a.currentPricePerKg) {
        a.currentPricePerKg = pricePerKg;
        a.totalEstimatedValue = pricePerKg * a.approxWeightKg;
        a.bidsCount += 1;
        a.bids.insert(
          0,
          Bid(
            id: 'b-${DateTime.now().millisecondsSinceEpoch}',
            auctionId: auctionId,
            traderId: _currentUser.id,
            traderName: _currentUser.name,
            traderPhone: _currentUser.phone,
            pricePerKg: pricePerKg,
            totalCalculated: a.totalEstimatedValue,
            timestamp: DateTime.now(),
          ),
        );
        notifyListeners();
        return true;
      }
    }
    return false;
  }

  // Add auction
  void addAuction({
    required String title,
    required String categoryId,
    required String categoryName,
    required int weight,
    required int startPrice,
    required String governorate,
    required String area,
    required String description,
  }) {
    final newAuction = Auction(
      id: 'auc-${DateTime.now().millisecondsSinceEpoch}',
      title: title,
      categoryId: categoryId,
      categoryName: categoryName,
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
      approxWeightKg: weight,
      governorate: governorate,
      area: area,
      description: description,
      startPricePerKg: startPrice,
      currentPricePerKg: startPrice,
      totalEstimatedValue: weight * startPrice,
      sellerId: _currentUser.id,
      sellerName: _currentUser.name,
      sellerPhone: _currentUser.phone,
      endsAt: DateTime.now().add(const Duration(hours: 12)),
      bids: [],
    );
    _auctions.insert(0, newAuction);
    notifyListeners();
  }

  // Pay Commission via ZainCash
  void payCommission(String auctionId) {
    final idx = _auctions.indexKey((a) => a.id == auctionId);
    if (idx != -1) {
      _auctions[idx].status = 'COMMISSION_PAID';
      notifyListeners();
    }
  }

  void switchUser(User user) {
    _currentUser = user;
    notifyListeners();
  }
}

extension ListExtensions<T> on List<T> {
  int indexKey(bool Function(T element) test) {
    for (int i = 0; i < length; i++) {
      if (test(this[i])) return i;
    }
    return -1;
  }
}
