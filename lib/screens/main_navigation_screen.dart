import 'package:flutter/material.dart';
import 'home_screen.dart';
import 'support_screen.dart';
import 'add_auction_screen.dart';
import 'deals_screen.dart';
import 'profile_screen.dart';
import '../models/auction_model.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  // قائمة المزادات التي تبدأ بمزاد افتراضي وتستقبل المزادات الجديدة
  final List<AuctionModel> _auctions = [
    AuctionModel(
      title: 'قواطي ألمنيوم مشروبات غازية مكبوسة...',
      category: 'قواطي',
      weight: '50 كغم تقريباً',
      price: '١,٧٠٠ د.ع / كغم',
      city: 'الديوانية - مركز الديوانية',
      endTime: '01:17:55',
      bidsCount: 3,
    ),
  ];

  void _addNewAuction(AuctionModel auction) {
    setState(() {
      _auctions.insert(0, auction); // إضافة المزاد الجديد في البداية
    });
  }

  @override
  Widget build(BuildContext context) {
    // قائمة الشاشات مع ربط البيانات الحية
    final List<Widget> screens = [
      HomeScreen(auctions: _auctions),
      const SupportScreen(),
      AddAuctionScreen(onAuctionAdded: _addNewAuction),
      DealsScreen(userAuctions: _auctions),
      const ProfileScreen(),
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      body: screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF16251E),
        selectedItemColor: const Color(0xFF04AF37),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            label: 'الرئيسية',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.support_agent_rounded),
            label: 'الدعم',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle_rounded, size: 32),
            label: 'أضف مزاد',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.handshake_rounded),
            label: 'صفقاتي',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded),
            label: 'حسابي',
          ),
        ],
      ),
    );
  }
}
