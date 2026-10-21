import 'package:flutter/material.dart';

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
                                style: TextStyle(color: Colors.white, fontSize: 13),

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
