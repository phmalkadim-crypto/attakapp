import 'package:flutter/material.dart';

void main() {
  runApp(const AttakApp());
}

class AttakApp extends StatelessWidget {
  const AttakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عَتّاگ | Attak',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'IQ'),
      theme: ThemeData(
        primarySwatch: Colors.green,
        scaffoldBackgroundColor: const Color(0xFFF8F9FA),
        fontFamily: 'Cairo',
      ),
      home: const HomeScreen(),
    );
  }
}

// ==================== 1. نماذج البيانات (Data Models) ====================

enum AuctionStatus { active, ended, waitingForCommission, completed, cancelled }

class Auction {
  final String id;
  final String category;
  final String title;
  final double quantityKg; // الكمية التقريبية
  final double startingPricePerKg;
  double currentHighestBid;
  final String governorate;
  final String location;
  final DateTime endTime;
  AuctionStatus status;
  bool isCommissionPaid; // قفل/فتح رقم الهاتف
  String? sellerPhone; // مخفي حتى الدفع

  Auction({
    required this.id,
    required this.category,
    required this.title,
    required this.quantityKg,
    required this.startingPricePerKg,
    required this.currentHighestBid,
    required this.governorate,
    required this.location,
    required this.endTime,
    this.status = AuctionStatus.active,
    this.isCommissionPaid = false,
    this.sellerPhone,
  });

  // حساب القيمة الإجمالية التقريبية للمزاد
  double get totalEstimatedValue => quantityKg * currentHighestBid;
}

// ==================== 2. الصفحة الرئيسية (Home Screen) ====================

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  // محاكاة لبيانات المزادات النشطة
  final List<Auction> _activeAuctions = [
    Auction(
      id: '1',
      category: 'قواطي ألمنيوم',
      title: 'قواطي مشروبات نظيفة ومضغوطة',
      quantityKg: 50.0,
      startingPricePerKg: 1500.0,
      currentHighestBid: 1700.0,
      governorate: 'الديوانية',
      location: 'الحمزة الشرقي',
      endTime: DateTime.now().add(const Duration(hours: 3)),
      sellerPhone: '07801234567',
    ),
    Auction(
      id: '2',
      category: 'نحاس',
      title: 'أسلاك نحاس صافي مقشورة',
      quantityKg: 25.0,
      startingPricePerKg: 9000.0,
      currentHighestBid: 9200.0,
      governorate: 'الديوانية',
      location: 'المركز',
      endTime: DateTime.now().add(const Duration(hours: 1)),
      sellerPhone: '07709876543',
    ),
    Auction(
      id: '3',
      category: 'حديد',
      title: 'حديد هياكل إنشائية وشيلمان ثقيل',
      quantityKg: 1200.0,
      startingPricePerKg: 450.0,
      currentHighestBid: 520.0,
      governorate: 'بغداد',
      location: 'الزعفرانية',
      endTime: DateTime.now().add(const Duration(hours: 6)),
      sellerPhone: '07829692579',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.RTL,
      child: Scaffold(
        appBar: AppBar(
          title: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('عَتّاگ | Attak', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white)),
              Text('منصة الخردة العراقية', style: TextStyle(fontSize: 12, color: Colors.white70)),
            ],
          ),
          backgroundColor: const Color(0xFF1B4D3E),
        ),
        body: _buildBody(),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          selectedItemColor: const Color(0xFF1B4D3E),
          unselectedItemColor: Colors.grey,
          type: BottomNavigationBarType.fixed,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'الرئيسية'),
            BottomNavigationBarItem(icon: Icon(Icons.support_agent), label: 'الدعم'),
            BottomNavigationBarItem(icon: Icon(Icons.add_box, size: 32), label: 'أضف مزاد'),
            BottomNavigationBarItem(icon: Icon(Icons.gavel), label: 'صفقاتي'),
            BottomNavigationBarItem(icon: Icon(Icons.person), label: 'حسابي'),
          ],
        ),
      ),
    );
  }

  Widget _buildBody() {
    if (_currentIndex == 0) {
      return Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // شريط البحث
            TextField(
              decoration: InputDecoration(
                hintText: 'ابحث عن مزاد أو نوع خردة (نحاس، قواطي...).',
                prefixIcon: const Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              '🔥 المزادات النشطة',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1B4D3E)),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: _activeAuctions.length,
                itemBuilder: (context, index) {
                  final auction = _activeAuctions[index];
                  return AuctionCard(auction: auction);
                },
              ),
            ),
          ],
        ),
      );
    } else {
      return Center(
        child: Text('صفحة تبويب رقم: $_currentIndex', style: const TextStyle(fontSize: 18)),
      );
    }
  }
}

// ==================== 3. بطاقة المزاد (Auction Card) ====================

class AuctionCard extends StatelessWidget {
  final Auction auction;

  const AuctionCard({super.key, required this.auction});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 2,
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Chip(
                  label: Text(auction.category, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                  backgroundColor: const Color(0xFF1B4D3E),
                ),
                Text(
                  '📍 ${auction.governorate} - ${auction.location}',
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(auction.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('⚖️ الكمية التقريبية: ${auction.quantityKg} كغم'),
                Text('💰 أعلى سعر: ${auction.currentHighestBid} د.ع / كغم',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
              ],
            ),
            const Divider(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('⏳ ينتهي خلال: 02:45:00', style: TextStyle(color: Colors.red, fontSize: 12)),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1B4D3E),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => AuctionDetailsScreen(auction: auction)),
                    );
                  },
                  child: const Text('دخول المزاد 🔨'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ==================== 4. صفحة تفاصيل المزاد والمزايدة ====================

class AuctionDetailsScreen extends StatefulWidget {
  final Auction auction;

  const AuctionDetailsScreen({super.key, required this.auction});

  @override
  State<AuctionDetailsScreen> createState() => _AuctionDetailsScreenState();
}

class _AuctionDetailsScreenState extends State<AuctionDetailsScreen> {
  final TextEditingController _bidController = TextEditingController();

  void _placeBid() {
    double? enteredBid = double.tryParse(_bidController.text);
    if (enteredBid == null) {
      _showMsg('يرجى إدخال رقم صحيح');
      return;
    }

    if (enteredBid <= widget.auction.currentHighestBid) {
      _showMsg('⚠️ يجب أن تكون مزايدتك أعلى من أعلى سعر حالي (${widget.auction.currentHighestBid})');
      return;
    }

    setState(() {
      widget.auction.currentHighestBid = enteredBid;
    });
    _bidController.clear();
    _showMsg('✅ تمت المزايدة بنجاح');
  }

  void _showMsg(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.RTL,
      child: Scaffold(
        appBar: AppBar(
          title: Text(widget.auction.category, style: const TextStyle(color: Colors.white)),
          backgroundColor: const Color(0xFF1B4D3E),
          iconTheme: const IconThemeData(color: Colors.white),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: ListView(
            children: [
              Container(
                height: 200,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(child: Icon(Icons.recycling, size: 80, color: Color(0xFF1B4D3E))),
              ),
              const SizedBox(height: 16),
              Text(widget.auction.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('⚖️ الكمية: ${widget.auction.quantityKg} كغم'),
                  Text('📍 الموقع: ${widget.auction.governorate} - ${widget.auction.location}', style: const TextStyle(color: Colors.grey)),
                ],
              ),
              const Divider(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('أعلى مزايدة حالية:', style: TextStyle(fontSize: 16)),
                  Text('${widget.auction.currentHighestBid} د.ع / كغم',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.green)),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'القيمة التقريبية الإجمالية: ${widget.auction.totalEstimatedValue} د.ع',
                style: const TextStyle(color: Colors.grey, fontSize: 14),
              ),
              const Divider(height: 24),
              
              // قاعدة إظهار رقم الهاتف بناءً على دفع العمولة (Backend Webhook Simulation)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: widget.auction.isCommissionPaid ? Colors.green[50] : Colors.orange[50],
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: widget.auction.isCommissionPaid ? Colors.green : Colors.orange),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.auction.isCommissionPaid ? '✅ تم دفع عمولة المنصة' : '🔒 معلومات التواصل مخفية',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: widget.auction.isCommissionPaid ? Colors.green[800] : Colors.orange[800],
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.auction.isCommissionPaid
                          ? 'رقم البائع: ${widget.auction.sellerPhone}'
                          : 'سيظهر رقم الهاتف فور تأكيد دفع عمولة عَتّاگ (2,000 د.ع) عبر زين كاش.',
                      style: const TextStyle(fontSize: 14),
                    ),
                    if (!widget.auction.isCommissionPaid) ...[
                      const SizedBox(height: 8),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: Colors.orange[800]),
                        onPressed: () {
                          setState(() {
                            widget.auction.isCommissionPaid = true;
                          });
                          _showMsg('تم التحقق من الدفع بنجاح عبر السيرفر! ظهر رقم البائع.');
                        },
                        child: const Text('💳 ادفع 2,000 د.ع لإظهار رقم البائع', style: TextStyle(color: Colors.white)),
                      ),
                    ]
                  ],
                ),
              ),
              const SizedBox(height: 24),
              
              // إدخال المزايدة
              const Text('ضع مزايدتك الجديدة (لكل كغم):', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _bidController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        hintText: 'أدخل السعر الجديد...',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF1B4D3E),
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                    ),
                    onPressed: _placeBid,
                    child: const Text('زايد الآن 🔨', style: TextStyle(color: Colors.white)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
