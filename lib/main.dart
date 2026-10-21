import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const AttakApp());
}

class AttakApp extends StatelessWidget {
  const AttakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عَتّاك | Attak',
      debugShowCheckedModeBanner: false,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ar', 'IQ'),
      ],
      locale: const Locale('ar', 'IQ'),
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: const Color(0xFF04AF37),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF04AF37),
          primary: const Color(0xFF04AF37),
          secondary: const Color(0xFFB30222),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8F9FA),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF04AF37),
          foregroundColor: Colors.white,
          centerTitle: true,
          elevation: 0,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}

// ==================== شاشة الترحيب ====================
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 2500), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const MainNavigationScreen()),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF04AF37),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.recycling_rounded,
                size: 80,
                color: Color(0xFF04AF37),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'عَتّاك | Attak',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'منصة المزادات وتجارة السكراب الأولى في العراق',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white70,
              ),
            ),
            const SizedBox(height: 40),
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}

// ==================== الشاشة الرئيسية والتنقل ====================
class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomeScreen(),
    const DealsScreen(),
    const AddAuctionScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('منصة عَتّاك العراقية 🇮🇶'),
      ),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: const Color(0xFF04AF37),
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.storefront),
            label: 'المزادات',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.gavel),
            label: 'الصفقات',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle_outline),
            label: 'إضافة مزاد',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'حسابي',
          ),
        ],
      ),
    );
  }
}

// ==================== أقسام التطبيق ====================
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: const Color(0xFF04AF37),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: const Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'أهلاً بك في منصة عَتّاك',
                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 6),
                Text(
                  'تصفح أحدث مزادات حديد السكراب، النحاس، والألمنيوم المتاحة اليوم.',
                  style: TextStyle(color: Colors.white90, fontSize: 13),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'أقسام الخردة والسكراب',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildCategoryChip('حديد ثقيل', Icons.fitness_center),
            _buildCategoryChip('نحاس أصفر/أحمر', Icons.view_in_ar),
            _buildCategoryChip('ألمنيوم', Icons.grid_view),
          ],
        ),
        const SizedBox(height: 20),
        const Text(
          'المزادات المباشرة الحالية',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        _buildAuctionCard('شحنة حديد سكراب (5 طن)', 'الديوانية - الحمزة الشرقي', '2,400,000 د.ع', '12 مزايدة'),
        _buildAuctionCard('كيبلات نحاس صافي (800 كغم)', 'بغداد - جميلة', '5,100,000 د.ع', '28 مزايدة'),
      ],
    );
  }

  static Widget _buildCategoryChip(String label, IconData icon) {
    return Chip(
      avatar: Icon(icon, size: 18, color: const Color(0xFF04AF37)),
      label: Text(label, style: const TextStyle(fontSize: 12)),
      backgroundColor: Colors.white,
      elevation: 1,
    );
  }

  static Widget _buildAuctionCard(String title, String location, String price, String bids) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: Color(0xFFE8F5E9),
          child: Icon(Icons.inventory_2, color: Color(0xFF04AF37)),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text('$location • $bids'),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(price, style: const TextStyle(color: Color(0xFFB30222), fontWeight: FontWeight.bold)),
            const Text('أعلى سعر', style: TextStyle(fontSize: 10, color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}

class DealsScreen extends StatelessWidget {
  const DealsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('صفحة المزايدات والصفقات المكتملة', style: TextStyle(fontSize: 16)),
    );
  }
}

class AddAuctionScreen extends StatelessWidget {
  const AddAuctionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('صفحة إضافة شحنة سكراب جديدة', style: TextStyle(fontSize: 16)),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('الملف الشخصي وتوثيق حساب العَتّاك', style: TextStyle(fontSize: 16)),
    );
  }
}
