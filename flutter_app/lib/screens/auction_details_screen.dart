import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';

class AuctionDetailsScreen extends StatefulWidget {
  final Auction auction;
  const AuctionDetailsScreen({super.key, required this.auction});

  @override
  State<AuctionDetailsScreen> createState() => _AuctionDetailsScreenState();
}

class _AuctionDetailsScreenState extends State<AuctionDetailsScreen> {
  final _bidController = TextEditingController();

  void _showBidDialog(BuildContext context) {
    final currencyFormat = NumberFormat('#,###');
    final minBid = widget.auction.currentPricePerKg + 50;
    _bidController.text = minBid.toString();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppTheme.surfaceDark,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) {
        return Directionality(
          textDirection: TextDirection.rtl,
          child: Padding(
            padding: EdgeInsets.only(
              left: 20,
              right: 20,
              top: 20,
              bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'تقديم مزايدة رسمية 🔨',
                      style: TextStyle(fontFamily: 'Cairo', fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white70),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  'أقل سعر مزايدة مسموح: ${currencyFormat.format(minBid)} د.ع / كغم',
                  style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: AppTheme.goldAccent),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _bidController,
                  keyboardType: TextInputType.number,
                  style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  decoration: InputDecoration(
                    labelText: 'سعرك للكيلو الواحدة (د.ع)',
                    labelStyle: const TextStyle(color: Colors.white60, fontSize: 13),
                    filled: true,
                    fillColor: AppTheme.bgDark,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    final entered = int.tryParse(_bidController.text.trim());
                    if (entered != null && entered > widget.auction.currentPricePerKg) {
                      final appState = Provider.of<AppState>(context, listen: false);
                      appState.placeBid(widget.auction.id, entered);
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('✅ تم تسجيل مزايدتك بنجاح! أنت الآن صاحب أعلى مزايدة.'),
                          backgroundColor: Color(0xFF15803D),
                        ),
                      );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.goldAccent,
                    foregroundColor: const Color(0xFF061811),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                  child: const Text('تأكيد وإرسال المزايدة', style: TextStyle(fontFamily: 'Cairo', fontWeight: FontWeight.bold, fontSize: 14)),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final currencyFormat = NumberFormat('#,###');
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: Text(widget.auction.categoryName, style: const TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.only(bottom: 90),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Image.network(
                widget.auction.imageUrl,
                height: 240,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => Container(
                  height: 240,
                  color: AppTheme.surfaceDark,
                  child: const Center(child: Text('♻️', style: TextStyle(fontSize: 60))),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.auction.title,
                      style: const TextStyle(fontFamily: 'Cairo', fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    const SizedBox(height: 12),
                    // Metrics Row
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceDark,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _specItem('الوزن التقديري', '${currencyFormat.format(widget.auction.approxWeightKg)} كغم'),
                          _specItem('الموقع', '${widget.auction.governorate}'),
                          _specItem('السعر للكيلو', '${currencyFormat.format(widget.auction.currentPricePerKg)} د.ع'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text('وصف الشحنة:', style: TextStyle(fontFamily: 'Cairo', fontSize: 14, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 6),
                    Text(widget.auction.description, style: const TextStyle(fontFamily: 'Tajawal', fontSize: 13, color: Colors.white70, height: 1.5)),
                  ],
                ),
              ),
            ],
          ),
        ),
        bottomSheet: Container(
          color: AppTheme.surfaceDark,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: SafeArea(
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('إجمالي القيمة التقديرية:', style: TextStyle(fontFamily: 'Tajawal', fontSize: 10, color: Colors.white60)),
                      Text(
                        '${currencyFormat.format(widget.auction.totalEstimatedValue)} د.ع',
                        style: const TextStyle(fontFamily: 'Cairo', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.goldAccent),
                      ),
                    ],
                  ),
                ),
                ElevatedButton(
                  onPressed: () => _showBidDialog(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.goldAccent,
                    foregroundColor: const Color(0xFF061811),
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                  child: const Text('زايد الآن 🔨', style: TextStyle(fontFamily: 'Cairo', fontWeight: FontWeight.bold, fontSize: 14)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _specItem(String label, String value) {
    return Column(
      children: [
        Text(label, style: const TextStyle(fontFamily: 'Tajawal', fontSize: 10, color: Colors.white54)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(fontFamily: 'Cairo', fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
      ],
    );
  }
}
