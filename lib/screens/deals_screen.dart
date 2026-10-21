import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';

class DealsScreen extends StatelessWidget {
  const DealsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final currencyFormat = NumberFormat('#,###');
    final wonAuctions = appState.auctions.where((a) => a.bids.any((b) => b.traderId == appState.currentUser.id)).toList();

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: const Text('صفقاتي ومزاداتي 🏆', style: TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: wonAuctions.isEmpty
            ? Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Text('📦', style: TextStyle(fontSize: 48)),
                    SizedBox(height: 12),
                    Text(
                      'لا توجد صفقات جارية حالياً',
                      style: TextStyle(fontFamily: 'Cairo', fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white70),
                    ),
                    SizedBox(height: 6),
                    Text(
                      'شارك في مزادات الخردة المباشرة لتظهر صفقاتك هنا',
                      style: TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: Colors.white38),
                    ),
                  ],
                ),
              )
            : ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: wonAuctions.length,
                itemBuilder: (context, index) {
                  final auc = wonAuctions[index];
                  final isPaid = auc.status == 'COMMISSION_PAID';

                  return Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppTheme.cardDark,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                auc.title,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontFamily: 'Cairo', fontSize: 14, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: isPaid ? const Color(0xFF15803D).withOpacity(0.3) : const Color(0xFFB45309).withOpacity(0.3),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: isPaid ? const Color(0xFF22C55E) : const Color(0xFFF59E0B)),
                              ),
                              child: Text(
                                isPaid ? 'تم دفع العمولة ✅' : 'بانتظار العمولة ⏳',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontFamily: 'Tajawal',
                                  fontWeight: FontWeight.bold,
                                  color: isPaid ? const Color(0xFF4ADE80) : const Color(0xFFFBBF24),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'الموقع: ${auc.governorate} · الوزن: ${currencyFormat.format(auc.approxWeightKg)} كغم',
                          style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: Colors.white60),
                        ),
                        const SizedBox(height: 12),
                        const Divider(color: Colors.white12),
                        const SizedBox(height: 8),

                        if (isPaid) ...[
                          Row(
                            children: [
                              const Icon(Icons.phone_in_talk, color: Color(0xFF4ADE80), size: 18),
                              const SizedBox(width: 8),
                              Text(
                                'هاتف البائع (${auc.sellerName}): ${auc.sellerPhone}',
                                style: const TextStyle(fontFamily: 'Tajawal', fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                            ],
                          ),
                        ] else ...[
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text(
                                'عمولة المنصة: 2,000 د.ع فقط',
                                style: TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: AppTheme.goldAccent, fontWeight: FontWeight.bold),
                              ),
                              ElevatedButton(
                                onPressed: () {
                                  appState.payCommission(auc.id);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('✅ تم تسديد العمولة بنجاح عبر ZainCash وتم فتح رقم هاتف البائع.'),
                                      backgroundColor: Color(0xFF15803D),
                                    ),
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFFDC2626), // ZainCash red
                                  foregroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                ),
                                child: const Text('دفع زين كاش 💳', style: TextStyle(fontFamily: 'Cairo', fontSize: 12, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  );
                },
              ),
      ),
    );
  }
}
