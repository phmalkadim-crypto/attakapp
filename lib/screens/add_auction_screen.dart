import 'package:flutter/material.dart';

class AddAuctionScreen extends StatelessWidget {
  const AddAuctionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // العنوان في الأعلى
              Center(
                child: const Text(
                  'أضف خردتك للمزاد',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // اختيار نوع الخردة
              const Text('نوع الخردة', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withOpacity(0.06)),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    dropdownColor: const Color(0xFF16251E),
                    value: 'اختر القسم',
                    icon: const Icon(Icons.keyboard_arrow_down_rounded, color: Colors.grey),
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                    items: ['اختر القسم', 'قواطي ألمنيوم', 'نحاس', 'حديد', 'ألمنيوم', 'بطاريات', 'أخرى']
                        .map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value, style: TextStyle(color: value == 'اختر القسم' ? Colors.grey : Colors.white)),
                      );
                    }).toList(),
                    onChanged: (_) {},
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // صور الخردة
              const Text('أضف صورة الخردة (يمكنك إضافة أكثر من صورة)', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    width: 70,
                    height: 70,
                    decoration: BoxDecoration(
                      color: const Color(0xFF16251E),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.5)),
                    ),
                    child: const Icon(Icons.camera_alt_rounded, color: Color(0xFF04AF37), size: 28),
                  ),
                  const SizedBox(width: 10),
                  for (int i = 0; i < 4; i++)
                    Expanded(
                      child: Container(
                        height: 70,
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF16251E),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white.withOpacity(0.06)),
                        ),
                        child: const Icon(Icons.add, color: Colors.grey, size: 22),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 16),

              // الكمية التقريبية
              const Text('الكمية التقريبية (كغم)', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: InputDecoration(
                  hintText: 'مثال: 50 كغم',
                  hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),
                  filled: true,
                  fillColor: const Color(0xFF16251E),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),

              // الموقع (المحافظة والمنطقة)
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('المحافظة', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            color: const Color(0xFF16251E),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              dropdownColor: const Color(0xFF16251E),
                              value: 'اختر المحافظة',
                              style: const TextStyle(color: Colors.white, fontSize: 13),
                              items: ['اختر المحافظة', 'الديوانية', 'بغداد', 'البصرة', 'النجف']
                                  .map((val) => DropdownMenuItem(value: val, child: Text(val, style: TextStyle(color: val == 'اختر المحافظة' ? Colors.grey : Colors.white))))
                                  .toList(),
                              onChanged: (_) {},
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('المنطقة', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        TextField(
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: InputDecoration(
                            hintText: 'اختر المنطقة',
                            hintStyle: TextStyle(color: Colors.grey[500], fontSize: 13),
                            filled: true,
                            fillColor: const Color(0xFF16251E),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // وصف الخردة
              const Text('وصف الخردة (اختياري)', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                maxLines: 3,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: InputDecoration(
                  hintText: 'أضف وصفاً مختصرًا للخردة...',
                  hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),
                  filled: true,
                  fillColor: const Color(0xFF16251E),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 24),

              // زر نشر المزاد
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.rocket_launch_rounded, size: 18),
                  label: const Text('نشر المزاد', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF04AF37),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
