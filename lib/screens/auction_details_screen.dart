import 'package:flutter/material.dart';
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
  final TextEditingController _bidController = TextEditingController();
  String? _errorMessage;
  String? _successMessage;

  @override
  void dispose() {
    _bidController.dispose();
    super.dispose();
  }

  void _showBidBottomSheet(BuildContext context, AppState state) {
    _bidController.text = (widget.auction.currentPricePerKg + 50).toString();
    _errorMessage = null;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppTheme.cardDark,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            final calculatedTotal = (int.tryParse(_bidController.text) ?? 0) * widget.auction.approxWeightKg;

            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom + 20,
                left: 16,
                right: 16,
                top: 20,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        '💰 تقديم مزايدة جديدة',
                        style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, color: Colors.white54),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Current price per kg reference
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceDark,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('أعلى سعر حالي:', style: TextStyle(color: Colors.white70, fontSize: 12)),
                        Text(
                          '${widget.auction.currentPricePerKg} د.ع / كغم',
                          style: const TextStyle(color: AppTheme.goldAccent, fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  const Text(
                    'أدخل سعرك الجديد لكل كغم (د.ع):',
                    style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),

                  TextField(
                    controller: _bidController,
                    keyboardType: TextInputType.number,
                    onChanged: (_) => setModalState(() {}),
                    style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                      hintText: 'مثال: ${widget.auction.currentPricePerKg + 50}',
                      hintStyle: const TextStyle(color: Colors.white30),
                      filled: true,
                      fillColor: AppTheme.bgDark,
                      suffixText: 'د.ع / كغم',
                      suffixStyle: const TextStyle(color: AppTheme.goldAccent),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),

                  // Quick Increment Buttons (+25, +50, +100 IQD/kg)
                  Row(
                    children: [25, 50, 100].map((inc) {
                      return Expanded(
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          child: OutlinedButton(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: AppTheme.goldAccent,
                              side: const BorderSide(color: Color(0x44D4AF37)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              padding: const EdgeInsets.symmetric(vertical: 8),
                            ),
                            onPressed: () {
                              setModalState(() {
                                final current = int.tryParse(_bidController.text) ?? widget.auction.currentPricePerKg;
                                _bidController.text = (current + inc).toString();
                              });
                            },
                            child: Text('+$inc د.ع'),
                          ),
                        ),
                      );
                    }).toList(),
                  ),

                  const SizedBox(height: 14),

                  // Total Calculated Value Preview
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryDark,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0x33D4AF37)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'القيمة الإجمالية المقدرة:\n(الكمية × السعر)',
                          style: TextStyle(color: Colors.white70, fontSize: 11),
                        ),
                        Text(
                          '${calculatedTotal.toString()} د.ع',
                          style: const TextStyle(
                            color: AppTheme.goldAccent,
                            fontSize: 16,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),

                  if (_errorMessage != null) ...[
                    const SizedBox(height: 10),
                    Text(
                      _errorMessage!,
                      style: const TextStyle(color: Colors.redAccent, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                  ],

                  const SizedBox(height: 16),

                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.goldAccent,
                        foregroundColor: AppTheme.primaryDark,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: () {
                        final enteredPrice = int.tryParse(_bidController.text);
                        if (enteredPrice == null) {
                          setModalState(() => _errorMessage = '⚠️ يرجى إدخال رقم صحيح');
                          return;
                        }

                        final err = state.placeBid(
                          auctionId: widget.auction.id,
                          newPricePerKg: enteredPrice,
                        );

                        if (err != null) {
                          setModalState(() => _errorMessage = err);
                        } else {
                          Navigator.pop(context);
                          setState(() {
                            _successMessage = '✅ تمت المزايدة بنجاح!';
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              backgroundColor: Color(0xFF10B981),
                              content: Text('✅ تمت المزايدة بنجاح وأصبحت أعلى مزايد!', textAlign: TextAlign.center),
                            ),
                          );
                        }
                      },
                      child: const Text(
                        'تأكيد المزايدة الآن 🚀',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final a = widget.auction;
    final isSeller = state.currentUser.id == a.sellerId;

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      body: CustomScrollView(
        slivers: [
          // App Bar with Image
          SliverAppBar(
            expandedHeight: 280,
            pinned: true,
            backgroundColor: AppTheme.primaryDark,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () => Navigator.pop(context),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    a.imageUrl,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      color: AppTheme.surfaceDark,
                      child: const Icon(Icons.recycling, size: 80, color: AppTheme.goldAccent),
                    ),
                  ),
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Colors.transparent, Colors.black87],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 16,
                    left: 16,
                    right: 16,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.goldAccent,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            a.categoryName,
                            style: const TextStyle(
                              color: AppTheme.primaryDark,
                              fontWeight: FontWeight.w900,
                              fontSize: 12,
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          a.title,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Main Content
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Quick Summary Card: Weight, Location, Countdown
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppTheme.cardDark,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: const Color(0x2AD4AF37)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: _buildInfoItem(
                                icon: Icons.scale_outlined,
                                title: 'الكمية التقريبية',
                                value: '${a.approxWeightKg} كغم',
                              ),
                            ),
                            Container(width: 1, height: 40, color: Colors.white12),
                            Expanded(
                              child: _buildInfoItem(
                                icon: Icons.place_outlined,
                                title: 'الموقع',
                                value: '${a.governorate} - ${a.area}',
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        const Divider(color: Colors.white10),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.timer_outlined, color: AppTheme.goldAccent, size: 16),
                                SizedBox(width: 6),
                                Text(
                                  'ينتهي المزاد خلال:',
                                  style: TextStyle(color: Colors.white70, fontSize: 12),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: a.isEnded ? Colors.redAccent.withOpacity(0.2) : const Color(0x2210B981),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                a.isEnded ? 'منتهي' : '02:45:18',
                                style: TextStyle(
                                  color: a.isEnded ? Colors.redAccent : const Color(0xFF10B981),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Current Highest Bid Banner
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [AppTheme.primaryDark, AppTheme.surfaceDark],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: AppTheme.goldAccent.withOpacity(0.4)),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          'أعلى مزايدة حالياً لكل كغم:',
                          style: TextStyle(color: Colors.white70, fontSize: 12),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${a.currentPricePerKg} د.ع / كغم',
                          style: const TextStyle(
                            color: AppTheme.goldAccent,
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.bgDark.withOpacity(0.6),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            'القيمة التقريبية الإجمالية: ${a.totalEstimatedValue} د.ع',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        if (a.winnerName != null) ...[
                          const SizedBox(height: 6),
                          Text(
                            'المتصدر الحالي: ${a.winnerName}',
                            style: const TextStyle(color: Colors.white54, fontSize: 11),
                          ),
                        ],
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Scrap Description
                  const Text(
                    'وصف الخردة وتفاصيل الشحنة:',
                    style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppTheme.cardDark,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Text(
                      a.description,
                      style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.5),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Recent Bids List
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'سجل المزايدات الأخيرة:',
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '(${a.bids.length} مزايدات)',
                        style: const TextStyle(color: AppTheme.goldAccent, fontSize: 12),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  a.bids.isEmpty
                      ? Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppTheme.cardDark,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Center(
                            child: Text(
                              'لا توجد مزايدات بعد. كن أول من يزايد!',
                              style: TextStyle(color: Colors.white54, fontSize: 12),
                            ),
                          ),
                        )
                      : Column(
                          children: a.bids.map((b) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 8),
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              decoration: BoxDecoration(
                                color: AppTheme.cardDark,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.white10),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(Icons.gavel, color: AppTheme.goldAccent, size: 14),
                                      const SizedBox(width: 8),
                                      Text(
                                        b.traderName,
                                        style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                      ),
                                      if (b.isVerifiedTrader)
                                        const Padding(
                                          padding: EdgeInsets.only(right: 4),
                                          child: Text('🔵', style: TextStyle(fontSize: 10)),
                                        ),
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        '${b.pricePerKg} د.ع / كغم',
                                        style: const TextStyle(color: AppTheme.goldAccent, fontSize: 12, fontWeight: FontWeight.bold),
                                      ),
                                      Text(
                                        '${b.totalCalculated} د.ع إجمالي',
                                        style: const TextStyle(color: Colors.white54, fontSize: 10),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        ),

                  const SizedBox(height: 20),

                  // Commission & Contact Privacy Notice
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryDark.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.goldAccent.withOpacity(0.3)),
                    ),
                    child: const Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.shield_outlined, color: AppTheme.goldAccent, size: 20),
                        SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            '🔒 رقم البائع محمي: يتم إظهار رقم هاتف صاحب الخردة ومعلومات التواصل المباشر بعد انتهاء المزاد ودفع عمولة عَتّاك (2,000 د.ع فقط) عبر زين كاش.',
                            style: TextStyle(color: Colors.white70, fontSize: 11, height: 1.4),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 80),
                ],
              ),
            ),
          ),
        ],
      ),

      // Bottom Bid Button Bar
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          color: AppTheme.primaryDark,
          border: Border(top: BorderSide(color: Color(0x33D4AF37))),
        ),
        child: SafeArea(
          child: isSeller
              ? Container(
                  height: 48,
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceDark,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Center(
                    child: Text(
                      'أنت صاحب هذا المزاد (لا يمكنك المزايدة عليه)',
                      style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                  ),
                )
              : SizedBox(
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.goldAccent,
                      foregroundColor: AppTheme.primaryDark,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      elevation: 4,
                    ),
                    onPressed: a.isEnded ? null : () => _showBidBottomSheet(context, state),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.gavel, size: 18),
                        const SizedBox(width: 8),
                        Text(
                          a.isEnded ? 'المزاد منتهي' : '💰 زايد الآن (أعلى من ${a.currentPricePerKg} د.ع)',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900),
                        ),
                      ],
                    ),
                  ),
                ),
        ),
      ),
    );
  }

  Widget _buildInfoItem({required IconData icon, required String title, required String value}) {
    return Column(
      children: [
        Icon(icon, color: AppTheme.goldAccent, size: 18),
        const SizedBox(height: 4),
        Text(title, style: const TextStyle(color: Colors.white54, fontSize: 10)),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
      ],
    );
  }
}
