import 'package:flutter/material.dart';
import '../constants/theme.dart';
import 'home_screen.dart';
import 'deals_screen.dart';
import 'add_auction_screen.dart';
import 'support_screen.dart';
import 'profile_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    DealsScreen(),
    AddAuctionScreen(),
    SupportScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        body: IndexedStack(
          index: _currentIndex,
          children: _screens,
        ),
        bottomNavigationBar: Container(
          decoration: BoxDecoration(
            color: const Color(0xFF071D15),
            border: Border(top: BorderSide(color: Colors.white.withOpacity(0.08))),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.3),
                blurRadius: 10,
                offset: const Offset(0, -3),
              ),
            ],
          ),
          child: SafeArea(
            child: SizedBox(
              height: 64,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _navItem(0, Icons.home_filled, 'الرئيسية'),
                  _navItem(1, Icons.emoji_events_outlined, 'صفقاتي'),
                  _addAuctionButton(),
                  _navItem(3, Icons.headset_mic_outlined, 'الدعم'),
                  _navItem(4, Icons.person_outline, 'حسابي'),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 22,
              color: isSelected ? AppTheme.goldAccent : Colors.white60,
            ),
            const SizedBox(height: 3),
            Text(
              label,
              style: TextStyle(
                fontFamily: 'Tajawal',
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                color: isSelected ? AppTheme.goldAccent : Colors.white60,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _addAuctionButton() {
    return Transform.translate(
      offset: const Offset(0, -12),
      child: GestureDetector(
        onTap: () => setState(() => _currentIndex = 2),
        child: Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF15803D), // emerald 700
            border: Border.all(color: const Color(0xFF071D15), width: 4),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF15803D).withOpacity(0.4),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: const Center(
            child: Icon(Icons.add, color: Colors.white, size: 28),
          ),
        ),
      ),
    );
  }
}
