import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';
import 'auction_details_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedGov = 'الكل';

  final List<String> _governorates = [
    'الكل',
    'الديوانية',
    'بغداد',
    'البصرة',
    'النجف الأشرف',
    'كربلاء المقدسة',
    'أربيل',
    'بابل',
    'الموصل',
    'ذي قار',
    'كركوك',
    'ديالى',
    'الأنبار',
    'ميسان',
    'واسط',
    'المثنى',
    'صلاح الدين',
    'دهوك',
    'السليمانية',
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final categories = state.categories;

    final filteredAuctions = state.auctions.where((a) {
      final matchSearch = a.title.contains(_searchQuery) ||
          a.categoryName.contains(_searchQuery) ||
          a.description.contains(_searchQuery) ||
          a.governorate.contains(_searchQuery);
      final matchGov = _selectedGov == 'الكل' || a.governorate.contains(_selectedGov);
      return matchSearch && matchGov;
    }).toList();

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Iraqi Curved App Bar with Attak branding
            SliverToBoxAdapter(
              child: Container(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
                decoration: const BoxDecoration(
                  color: AppTheme.primaryDark,
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(28),
                    bottomRight: Radius.circular(28),
                  ),
                  border: Border(
                    bottom: BorderSide(color: Color(0x33D4AF37), width: 1.5),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Brand Logo & User Welcome
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  colors: [AppTheme.goldAccent, Color(0xFF997C22)],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                                borderRadius: BorderRadius.circular(14),
                                boxShadow: const [
                                  BoxShadow(
                                    color: Color(0x40D4AF37),
                                    blurRadius: 10,
                                    offset: Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: const Center(
                                child: Text(
                                  'ع',
                                  style: TextStyle(
                                    color: AppTheme.primaryDark,
                                    fontSize: 24,
                                    fontWeight: FontWeight.w900,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const Text(
                                      'عَتّاگ | Attak',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 18,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                    const SizedBox(width: 6),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: const Color(0x22D4AF37),
                                        borderRadius: BorderRadius.circular(6),
                                        border: Border.all(color: AppTheme.goldAccent.withOpacity(0.4)),
                                      ),
                                      child: const Text(
                                        'العراق 🇮🇶',
                                        style: TextStyle(
                                          color: AppTheme.goldAccent,
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const Text(
                                  'منصة الخردة العراقية الأولى',
                                  style: TextStyle(
                                    color: AppTheme.goldAccent,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),

                        // User Role & Rating Badge
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppTheme.bgDark.withOpacity(0.6),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppTheme.goldAccent.withOpacity(0.3)),
                          ),
                          child: Row(
                            children: [
                              Text(
                                state.currentUser.isVerifiedTrader ? '🔵 تاجر معتمد' : '👤 مستخدم',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 16),

                    // Search Input
                    Container(
                      decoration: BoxDecoration(
                        color: AppTheme.bgDark,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.white12),
                      ),
                      child: TextField(
                        controller: _searchController,
                        onChanged: (val) => setState(() => _searchQuery = val),
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        decoration: InputDecoration(
                          hintText: 'ابحث عن مزاد أو نوع خردة (قواطي، نحاس، حديد...)...',
                          hintStyle: const TextStyle(color: Colors.white38, fontSize: 12),
                          prefixIcon: const Icon(Icons.search, color: AppTheme.goldAccent, size: 20),
                          suffixIcon: _searchQuery.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear, color: Colors.white54, size: 18),
                                  onPressed: () {
                                    _searchController.clear();
                                    setState(() => _searchQuery = '');
                                  },
                                )
                              : null,
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Dynamic Scrap Categories List
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'أقسام الخردة والسكراب',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      child: Row(
                        children: [
                          // "All" Category Pill
                          GestureDetector(
                            onTap: () => state.setCategory('all'),
                            child: Container(
                              margin: const EdgeInsets.only(left: 8),
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                color: state.selectedCategoryId == 'all'
                                    ? AppTheme.goldAccent
                                    : AppTheme.surfaceDark,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: state.selectedCategoryId == 'all'
                                      ? AppTheme.goldAccent
                                      : Colors.white12,
                                ),
                              ),
                              child: Text(
                                'الكل ♻️',
                                style: TextStyle(
                                  color: state.selectedCategoryId == 'all'
                                      ? AppTheme.primaryDark
                                      : Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ),
                          ...categories.map((cat) {
                            final isSelected = state.selectedCategoryId == cat.id;
                            return GestureDetector(
                              onTap: () => state.setCategory(cat.id),
                              child: Container(
                                margin: const EdgeInsets.only(left: 8),
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                decoration: BoxDecoration(
                                  color: isSelected ? AppTheme.goldAccent : AppTheme.surfaceDark,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: isSelected ? AppTheme.goldAccent : Colors.white12,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    Text(cat.icon, style: const TextStyle(fontSize: 14)),
                                    const SizedBox(width: 6),
                                    Text(
                                      cat.nameAr,
                                      style: TextStyle(
                                        color: isSelected ? AppTheme.primaryDark : Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Governorate Filter Bar
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: Row(
                  children: [
                    const Icon(Icons.location_on, color: AppTheme.goldAccent, size: 16),
                    const SizedBox(width: 6),
                    const Text(
                      'المحافظة:',
                      style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        height: 34,
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        decoration: BoxDecoration(
                          color: AppTheme.cardDark,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.white10),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: _selectedGov,
                            dropdownColor: AppTheme.cardDark,
                            icon: const Icon(Icons.arrow_drop_down, color: AppTheme.goldAccent),
                            style: const TextStyle(color: Colors.white, fontSize: 12),
                            onChanged: (val) {
                              if (val != null) setState(() => _selectedGov = val);
                            },
                            items: _governorates.map((gov) {
                              return DropdownMenuItem<String>(
                                value: gov,
                                child: Text(gov),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Active Auctions Section Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Text(
                          '🔥 المزادات النشطة',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppTheme.goldAccent.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${filteredAuctions.length} مزاد',
                            style: const TextStyle(
                              color: AppTheme.goldAccent,
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    Text(
                      'المزايدة بالكيلوغرام ⚖️',
                      style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 11),
                    ),
                  ],
                ),
              ),
            ),

            // Auction Cards List
            filteredAuctions.isEmpty
                ? SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.all(40),
                      child: Column(
                        children: [
                          Icon(Icons.inventory_2_outlined, size: 50, color: Colors.white.withOpacity(0.3)),
                          const SizedBox(height: 12),
                          const Text(
                            'لا توجد مزادات مطابقة للتصفية الحالية',
                            style: TextStyle(color: Colors.white70, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  )
                : SliverPadding(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 80),
                    sliver: SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          final auction = filteredAuctions[index];
                          return _buildAuctionCard(context, auction);
                        },
                        childCount: filteredAuctions.length,
                      ),
                    ),
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildAuctionCard(BuildContext context, Auction auction) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: AppTheme.cardDark,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0x2AD4AF37)),
        boxShadow: const [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => AuctionDetailsScreen(auction: auction),
              ),
            );
          },
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Row: Image + Details
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Scrap Image
                    ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.network(
                        auction.imageUrl,
                        width: 90,
                        height: 90,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(
                          width: 90,
                          height: 90,
                          color: AppTheme.surfaceDark,
                          child: const Icon(Icons.recycling, color: AppTheme.goldAccent),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),

                    // Main info
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.goldAccent.withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(6),
                                  border: Border.all(color: AppTheme.goldAccent.withOpacity(0.3)),
                                ),
                                child: Text(
                                  auction.categoryName,
                                  style: const TextStyle(
                                    color: AppTheme.goldAccent,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),

                              // Time remaining
                              Row(
                                children: [
                                  const Icon(Icons.timer_outlined, color: AppTheme.goldAccent, size: 13),
                                  const SizedBox(width: 3),
                                  Text(
                                    auction.isEnded ? 'منتهي' : 'نشط الآن',
                                    style: TextStyle(
                                      color: auction.isEnded ? Colors.redAccent : const Color(0xFF10B981),
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),

                          Text(
                            auction.title,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              height: 1.3,
                            ),
                          ),
                          const SizedBox(height: 6),

                          // Weight & Location
                          Row(
                            children: [
                              const Icon(Icons.scale_outlined, size: 13, color: AppTheme.goldAccent),
                              const SizedBox(width: 4),
                              Text(
                                'الكمية: ${auction.approxWeightKg} كغم تقريباً',
                                style: const TextStyle(color: Colors.white70, fontSize: 11),
                              ),
                              const SizedBox(width: 10),
                              const Icon(Icons.place_outlined, size: 13, color: AppTheme.goldAccent),
                              const SizedBox(width: 2),
                              Text(
                                '${auction.governorate}',
                                style: const TextStyle(color: Colors.white70, fontSize: 11),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 12),
                const Divider(color: Colors.white10, height: 1),
                const SizedBox(height: 10),

                // Bottom Bar: Price per kg & Total calculation & Action Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Text(
                              'أعلى سعر / كغم: ',
                              style: TextStyle(color: Colors.white60, fontSize: 11),
                            ),
                            Text(
                              '${auction.currentPricePerKg} د.ع',
                              style: const TextStyle(
                                color: AppTheme.goldAccent,
                                fontSize: 13,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          'القيمة التقريبية: ${auction.totalEstimatedValue} د.ع',
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),

                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [AppTheme.goldAccent, Color(0xFFB59325)],
                        ),
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: const [
                          BoxShadow(
                            color: Color(0x33D4AF37),
                            blurRadius: 6,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.gavel, color: AppTheme.primaryDark, size: 14),
                          SizedBox(width: 6),
                          Text(
                            'دخول المزاد',
                            style: TextStyle(
                              color: AppTheme.primaryDark,
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
