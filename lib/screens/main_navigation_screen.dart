import 'package:flutter/material.dart';
import 'home_screen.dart';
import 'add_auction_screen.dart';
import 'deals_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  // قائمة الشاشات المرتبطة بالتنقل السفلي بالترتيب الصحيح
  final List<Widget> _screens = [
    const HomeScreen(),
    const Center(child: Text('الدعم', style: TextStyle(color: Colors.white, fontSize: 22))),
    const AddAuctionScreen(),
    const DealsScreen(),
    const Center(child: Text('حسابي', style: TextStyle(color: Colors.white, fontSize: 22))),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      body: _screens[_currentIndex],
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
