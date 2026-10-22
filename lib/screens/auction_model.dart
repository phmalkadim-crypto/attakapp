import 'package:flutter/material.dart';
import '../models/auction_model.dart';

class AuctionDetailsScreen extends StatefulWidget {
  final AuctionModel auction;
  final bool isSellerView; // لتحديد ما إذا كان المشاهد هو البائع أو المشتري

  const AuctionDetailsScreen({
    super.key,
    required this.auction,
    this.isSellerView = false, // افتراضياً عرض المشتري
  });

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

  // دفع إجمالي العمولة للمشتري (2000 د.ع)
  void _payTotalCommissionAndUnlock() {
    setState(() {
      widget.auction.isCommissionPaid = true;
    });
    
    // إظهار نافذة تفصيلية بالدفع للبائع والمشتري
    _showFinancialDetailsDialog(context);
  }

  // نافذة تفاصيل الحسبة المالية للطرفين
  void _showFinancialDetailsDialog(BuildContext context) {
    int finalPriceForSeller = widget.auction.rawPrice - 1000;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: const Color(0xFF16251E),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Row(
            children: [
              Icon(Icons.check_circle_rounded, color: Color(0xFF04AF37), size: 24),
              SizedBox(width: 8),
              Text('التفاصيل المالية للصفقة', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'تمت عملية الدفع بنجاح وإليك الحسبة المالية للطرفين:',
                style: TextStyle(color: Colors.grey, fontSize: 12.5),
              ),
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F1A15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('👤 ما يخص المشتري:', style: TextStyle(color: Color(0xFF04AF37), fontSize: 13, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    const Text('• دفع للمنصة: 2,000 د.ع (1,000 عمولته + 1,000 عمولة البائع).', style: TextStyle(color: Colors.white, fontSize: 12)),
                    const Text('• سيدفع للبائع صافي: السعر الإجمالي ناقص 1,000 د.ع فقط.', style: TextStyle(color: Colors.white, fontSize: 12)),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F1A15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('🤝 ما يخص البائع:', style: TextStyle(color: Color(0xFF04AF37), fontSize: 13, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    const Text('• عمولته (1,000 د.ع) دُفعت بالكامل من قبل المشتري.', style: TextStyle(color: Colors.white, fontSize: 12)),
                    Text('• سيستلم من المشتري صافي مبلغ: $finalPriceForSeller د.ع.', style: const TextStyle(color: Colors.white, fontSize: 12)),
                  ],
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('حسناً، فهمت', style: TextStyle(color: Color(0xFF04AF37), fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    int finalPriceForSeller = widget.auction.rawPrice - 1000;

    return Scaffold(
      backgroundColor: const Color(0xFF0F1A15),
      appBar: AppBar(
        backgroundColor: const Color(0xFF16251E),
        elevation: 0,
        centerTitle: true,
        title: const Text(
          'تفاصيل الصفقة والعمولة',
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
            // بطاقة التنبيه للمشتري أو البائع
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF16251E),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: widget.auction.isCommissionPaid ? const Color(0xFF04AF37) : Colors.amber,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        widget.auction.isCommissionPaid ? Icons.verified_rounded : Icons.celebration_rounded,
                        color: widget.auction.isCommissionPaid ? const Color(0xFF04AF37) : Colors.amber,
                        size: 22,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        widget.auction.isCommissionPaid ? 'تم فتح بيانات التواصل' : 'مبروك! لقد كسبت المزاد 🎉',
                        style: TextStyle(
                          color: widget.auction.isCommissionPaid ? const Color(0xFF04AF37) : Colors.amber,
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    widget.auction.isCommissionPaid
                        ? 'تم دفع إجمالي العمولة. إليك تفاصيل التواصل وحسابات الدفع أدناه.'
                        : 'للحصول على معلومات البائع، يرجى دفع إجمالي عمولة المنصة (2,000 د.ع).\n\n💡 ملاحظة للمشتري: ستدفع 2,000 د.ع للمنصة (ألف منك وألف عن البائع)، وسيُخصم 1,000 د.ع من سعر المزاد لتدفع للبائع صافي ${finalPriceForSeller.toString()} د.ع فقط!',
                    style: TextStyle(color: Colors.grey[300], fontSize: 12.5, height: 1.5),
                  ),
                  const SizedBox(height: 14),

                  if (!widget.auction.isCommissionPaid) ...[
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        onPressed: _payTotalCommissionAndUnlock,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF04AF37),
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        child: const Text(
                          'ادفع إجمالي العمولة (2,000 د.ع) وأظهر الأرقام',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ] else ...[
                    Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFF04AF37).withOpacity(0.15),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('رقم هاتف البائع:', style: TextStyle(color: Colors.white, fontSize: 13)),
                              Text(
                                widget.auction.sellerPhone,
                                style: const TextStyle(color: Color(0xFF04AF37), fontSize: 14.5, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 20),

            // تفاصيل المزاد الأساسية
            Text(
              widget.auction.title,
              style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
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

            // صندوق الحسابات المالية الواضحة للطرفين
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF16251E),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('📊 ملخص الحسبة المالية للصفقة:', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Text('سعر رسو المزاد الأصلي:', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                      Text(widget.auction.priceText, style: const TextStyle(color: Colors.white, fontSize: 13, decoration: TextDecoration.lineThrough)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Text('ما يدفعه المشتري للمنصة:', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                      const Text('2,000 د.ع (عمولة الطرفين)', style: TextStyle(color: Colors.amber, fontSize: 12.5, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Text('ما يستلمه البائع صافي:', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                      Text('$finalPriceForSeller د.ع', style: const TextStyle(color: Color(0xFF04AF37), fontSize: 13.5, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 10.0),
                    child: Divider(color: Colors.white12),
                  ),
                  Text(
                    '📌 ملاحظة للتوضيح:\n• المشتري دفع 2,000 د.ع للمنصة (ألف عنه وألف عن البائع).\n• البائع ستصل كامل عمولته (1,000 د.ع مدفوعة)، وسيستلم من المشتري السعر ناقص 1,000 د.ع فقط.',
                    style: TextStyle(color: Colors.grey[400], fontSize: 11, height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
