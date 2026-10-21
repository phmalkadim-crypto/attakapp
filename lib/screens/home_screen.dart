import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // الهوية البصرية وشعار التطبيق (مطابق للتصميم)
              Center(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFF16251E),
                        shape: BoxShape.circle,
                        border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.3), width: 1.5),
                      ),
                      child: const Icon(
                        Icons.gavel_rounded,
                        color: Color(0xFF04AF37),
                        size: 32,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'عَتّاك | Attak',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'بيع خردتك بأعلى سعر.',
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 13,
                          ),
                        ),
                        const SizedBox(width: 4),
                        const Text('🔨♻️', style: TextStyle(fontSize: 12)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // حقل البحث الاحترافي
              Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.white.withOpacity(0.06)),
                ),
                child: TextField(
                  style: const TextStyle(color: Colors.white, fontSize: 14),
                  decoration: InputDecoration(
                    hintText: 'ابحث عن مزاد أو نوع خردة...',
                    hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),
                    prefixIcon: Icon(Icons.search_rounded, color: Colors.grey[400], size: 22),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // أقسام الخردة (أفقية وبشكل أنيق)
              const Text(
                'أقسام الخردة',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 85,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _buildCategoryItem('قواطي', Icons.energy_savings_leaf_rounded, true),
                    _buildCategoryItem('نحاس', Icons.electric_bolt_rounded, false),
                    _buildCategoryItem('حديد', Icons.handyman_rounded, false),
                    _buildCategoryItem('ألمنيوم', Icons.layers_rounded, false),
                    _buildCategoryItem('بطاريات', Icons.battery_charging_full_rounded, false),
                    _buildCategoryItem('أخرى', Icons.category_rounded, false),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // عنوان المزادات النشطة مع زر "عرض الكل"
              Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  const Text(
                    '🔥 المزادات النشطة',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'عرض الكل',
                    style: TextStyle(
                      color: const Color(0xFF04AF37),
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // بطاقة المزاد الاحترافية المطابقة تماماً للصورة
              _buildAuctionCard(),
            ],
          ),
        ),
      ),
    );
  }

  // عنصر القسم الاحترافي
  Widget _buildCategoryItem(String title, IconData icon, bool isSelected) {
    return Container(
      width: 72,
      margin: const EdgeInsets.only(left: 10),
      decoration: BoxDecoration(
        color: isSelected ? const Color(0xFF04AF37).withOpacity(0.15) : const Color(0xFF16251E),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isSelected ? const Color(0xFF04AF37) : Colors.transparent,
          width: 1.2,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: isSelected ? const Color(0xFF04AF37) : Colors.grey[300],
            size: 26,
          ),
          const SizedBox(height: 6),
          Text(
            title,
            style: TextStyle(
              color: isSelected ? const Color(0xFF04AF37) : Colors.white,
              fontSize: 12,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  // بطاقة مزاد فائقة الاحترافية
  Widget _buildAuctionCard() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF16251E),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // صورة مصغرة للخردة
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: const Color(0xFF22352C),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.recycling_rounded, color: Color(0xFF04AF37), size: 32),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'قواطي ألمنيوم',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '⚖️ 50 كغم  •  📍 الديوانية',
                      style: TextStyle(color: Colors.grey[400], fontSize: 12.5),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        const Icon(Icons.access_time_rounded, color: Color(0xFF04AF37), size: 14),
                        const SizedBox(width: 4),
                        const Text(
                          'ينتهي خلال 01:24:35',
                          style: TextStyle(
                            color: Color(0xFF04AF37),
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12.0),
            child: Divider(color: Color(0xFF22352C), height: 1),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'أعلى مزايدة حالياً',
                    style: TextStyle(color: Colors.grey[500], fontSize: 11),
                  ),
                  const SizedBox(height: 2),
                  const Text(
                    '1,700 د.ع / كغم',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 14.5,
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 38,
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.gavel_rounded, size: 15),
                  label: const Text('دخول المزاد', style: TextStyle(fontSize: 13)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF04AF37),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
