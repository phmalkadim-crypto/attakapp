import 'package:flutter/material.dart';
import '../models/auction_model.dart';
import 'auction_details_screen.dart';

class DealsScreen extends StatelessWidget {
  final List<AuctionModel> userAuctions;

  const DealsScreen({super.key, required this.userAuctions});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Center(
                child: Text(
                  'صفقاتي ومزاداتي النشطة',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Container(width: 3, height: 14, decoration: BoxDecoration(color: const Color(0xFF04AF37), borderRadius: BorderRadius.circular(2))),
                  const SizedBox(width: 8),
                  const Text('المزادات التي قمت بنشرها', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 12),
              Expanded(
                child: userAuctions.isEmpty
                    .toString() == 'true' // Fallback check
                    ? Center(
                        child: Text(
                          'لا توجد صفقات أو مزادات نشطة حالياً',
                          style: TextStyle(color: Colors.grey[500], fontSize: 13.5),
                        ),
                      )
                    : ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        itemCount: userAuctions.length,
                        itemBuilder: (context, index) {
                          final auction = userAuctions[index];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12.0),
                            child: Container(
                              padding: const EdgeInsets.all(12),
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
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              auction.title,
                                              style: const TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            const SizedBox(height: 4),
                                            Text(
                                              '${auction.category} • ${auction.weight}',
                                              style: const TextStyle(color: Colors.grey, fontSize: 11.5),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        width: 65,
                                        height: 55,
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF22352C),
                                          borderRadius: BorderRadius.circular(10),
                                        ),
                                        child: const Icon(Icons.handshake_rounded, color: Color(0xFF04AF37), size: 24),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.between,
                                    children: [
                                      Text(
                                        auction.price,
                                        style: const TextStyle(color: Color(0xFF04AF37), fontSize: 13.5, fontWeight: FontWeight.bold),
                                      ),
                                      ElevatedButton(
                                        onPressed: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => AuctionDetailsScreen(auction: auction),
                                            ),
                                          );
                                        },
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: const Color(0xFF04AF37),
                                          foregroundColor: Colors.white,
                                          elevation: 0,
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                          minimumSize: Size.zero,
                                        ),
                                        child: const Text('إدارة الصفقة', style: TextStyle(fontSize: 11.5)),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
