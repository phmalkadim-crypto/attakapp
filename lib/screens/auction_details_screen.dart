import 'package:flutter/material.dart';
import '../models/auction_model.dart';

class AuctionDetailsScreen extends StatefulWidget {
  final AuctionModel auction;

  const AuctionDetailsScreen({super.key, required this.auction});

  @override
  State<AuctionDetailsScreen> createState() => _AuctionDetailsScreenState();
}

class _AuctionDetailsScreenState extends State<AuctionDetailsScreen> {
  late int _currentBidsCount;

  @override
  void initState() {
    super.initState();
    _currentBidsCount = widget.auction.bidsCount;
  }

  void _placeBid() {
    setState(() {
      _currentBidsCount++;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم تقديم مزايدتك بنجاح وتحديث السعر الحالي', style: TextStyle(fontFamily: 'Cairo'))),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      appBar: AppBar(
        backgroundColor: const Color(0xFF16251E),
        elevation: 0,
        centerTitle: true,
        title: const Text(
          'تفاصيل المزاد',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
        ),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // صورة البانر البارزة للمزاد
            Container(
              height: 180,
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFF16251E),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.06)),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  const Icon(Icons.inventory_2_rounded, color: Color(0xFF04AF37), size: 64),
                  Positioned(
                    top: 12,
                    right: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF04AF37),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        widget.auction.category,
                        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // عنوان المزاد
            Text(
              widget.auction.title,
              style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),

            // معلومات الوزن والموقع
            Row(
              children: [
                const Icon(Icons.scale_rounded, color: Colors.grey, size: 16),
                const SizedBox(width: 6),
                Text(widget.auction.weight, style: const TextStyle(color: Colors.grey, fontSize: 13)),
                const SizedBox(width: 16),
                const Icon(Icons.location_on_rounded, color: Color(0xFF04AF37), size: 16),
                const SizedBox(width: 6),
                Text(widget.auction.city, style: const TextStyle(color: Colors.grey, fontSize: 13)),
              ],
            ),
            const SizedBox(height: 20),

            // صندوق السعر الحالي والوقت المتبقي
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF16251E),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('السعر الحالي', style: TextStyle(color: Colors.grey[400], fontSize: 11.5)),
                      const SizedBox(height: 4),
                      Text(
                        widget.auction.price,
                        style: const TextStyle(color: Color(0xFF04AF37), fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('عدد المزايدات', style: TextStyle(color: Colors.grey[400], fontSize: 11.5)),
                      const SizedBox(height: 4),
                      Text(
                        '$_currentBidsCount مزايدة',
                        style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // شروط وأحكام المزاد السريع
            const Text(
              'شروط المزاد',
              style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              '• يلتزم المشتري الفائز بإتمام المعاملة واستلام الخردة خلال 24 ساعة.\n• يتم الدفع بالطريقة المتفق عليها بين الطرفين.\n• يحق للمنصة إلغاء المزايدة في حال عدم الجدية.',
              style: TextStyle(color: Colors.grey[400], fontSize: 12.5, height: 1.5),
            ),
            const SizedBox(height: 40),

            // زر تقديم مزايدة
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                onPressed: _placeBid,
                icon: const Icon(Icons.gavel_rounded, size: 20),
                label: const Text('تقديم مزايدة جديدة', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF04AF37),
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
