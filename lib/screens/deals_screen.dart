import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';

class DealsScreen extends StatefulWidget {
  const DealsScreen({super.key});

  @override
  State<DealsScreen> createState() => _DealsScreenState();
}

class _DealsScreenState extends State<DealsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isProcessingPayment = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _showZainCashPaymentDialog(BuildContext context, Auction auction, AppState state) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (dialogCtx, setDialogState) {
            return AlertDialog(
              backgroundColor: AppTheme.cardDark,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
              title: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE60000), // Zain red brand color
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Center(
                      child: Text(
                        'Z',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 20),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'بوابة دفع زين كاش',
                        style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'ZainCash Gateway',
                        style: TextStyle(color: Colors.white54, fontSize: 10),
                      ),
                    ],
                  ),
                ],
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryDark,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0x33D4AF37)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('المبلغ المطلوب سداده:', style: TextStyle(color: Colors.white70, fontSize: 11)),
                            const Text(
                              '2,000 د.ع',
                              style: TextStyle(color: AppTheme.goldAccent, fontSize: 16, fontWeight: FontWeight.w900),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          '(عمولة عَتّاگ الثابتة: 1,000 تاجر + 1,000 بائع)',
                          style: TextStyle(color: Colors.white54, fontSize: 9),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  const Text(
                    'تنبيه مالي مهم جداً:',
                    style: TextStyle(color: AppTheme.goldAccent, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'منصة عَتّاگ لا تستلم قيمة الخردة الإجمالية (${auction.totalEstimatedValue} د.ع). تستلم فقط عمولة الخدمة (2,000 د.ع)، بينما يتم دفع صافي ثمن الخردة للبائع مباشرة (${auction.netSellerAmount} د.ع) عند المعاينة والاستلام.',
                    style: const TextStyle(color: Colors.white70, fontSize: 10, height: 1.4),
                  ),

                  if (_isProcessingPayment) ...[
                    const SizedBox(height: 18),
                    const Center(
                      child: Column(
                        children: [
                          CircularProgressIndicator(color: AppTheme.goldAccent),
                          SizedBox(height: 10),
                          Text(
                            'جاري الاتصال بسيرفر زين كاش والتحقق عبر Webhook...',
                            style: TextStyle(color: AppTheme.goldAccent, fontSize: 11),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
              actions: [
                if (!_isProcessingPayment) ...[
                  TextButton(
                    onPressed: () => Navigator.pop(ctx),
                    child: const Text('إلغاء', style: TextStyle(color: Colors.white54)),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.goldAccent,
                      foregroundColor: AppTheme.primaryDark,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () async {
                      setDialogState(() => _isProcessingPayment = true);
                      await Future.delayed(const Duration(seconds: 2));
                      await state.payZainCashCommission(auction.id);
                      setDialogState(() => _isProcessingPayment = false);
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          backgroundColor: Color(0xFF10B981),
                          content: Text('✅ تم تأكيد دفع العمولة بنجاح وكشف رقم البائع!', textAlign: TextAlign.center),
                        ),
                      );
                    },
                    child: const Text(
                      'تأكيد الدفع عبر زين كاش (2,000 د.ع)',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900),
                    ),
                  ),
                ],
              ],
            );
          },
        );
      },
    );
  }

  void _showRatingDialog(BuildContext context, Auction auction, AppState state) {
    int selectedStars = 5;
    final List<String> availableTags = ['تعامل جيد', 'ملتزم', 'سريع بالتواصل', 'جاد', 'دقيق في الوزن'];
    final List<String> selectedTags = ['تعامل جيد', 'سريع بالتواصل'];
    final TextEditingController commentCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (dialogCtx, setDialogState) {
            return AlertDialog(
              backgroundColor: AppTheme.cardDark,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              title: const Text(
                '⭐ تقييم التعامل مع البائع',
                style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(5, (index) {
                      return IconButton(
                        icon: Icon(
                          index < selectedStars ? Icons.star : Icons.star_border,
                          color: AppTheme.goldAccent,
                          size: 28,
                        ),
                        onPressed: () => setDialogState(() => selectedStars = index + 1),
                      );
                    }),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: availableTags.map((tag) {
                      final isSelected = selectedTags.contains(tag);
                      return FilterChip(
                        label: Text(tag, style: TextStyle(fontSize: 10, color: isSelected ? AppTheme.primaryDark : Colors.white)),
                        selected: isSelected,
                        selectedColor: AppTheme.goldAccent,
                        backgroundColor: AppTheme.surfaceDark,
                        onSelected: (selected) {
                          setDialogState(() {
                            if (selected) {
                              selectedTags.add(tag);
                            } else {
                              selectedTags.remove(tag);
                            }
                          });
                        },
                      );
                    }).toList(),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('إلغاء', style: TextStyle(color: Colors.white54)),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.goldAccent, foregroundColor: AppTheme.primaryDark),
                  onPressed: () {
                    state.submitRating(
                      auctionId: auction.id,
                      toUserId: auction.sellerId,
                      stars: selectedStars,
                      tags: selectedTags,
                      comment: commentCtrl.text,
                    );
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('✅ شكراً لك، تم حفظ تقييمك!')),
                    );
                  },
                  child: const Text('إرسال التقييم', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  void _showComplaintDialog(BuildContext context, Auction auction, AppState state) {
    String selectedType = 'مشكلة في الوزن';
    final TextEditingController descCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (dialogCtx, setDialogState) {
            return AlertDialog(
              backgroundColor: AppTheme.cardDark,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              title: const Text(
                '⚠️ تقديم شكوى إلى إدارة عَتّاگ',
                style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('نوع الشكوى:', style: TextStyle(color: Colors.white70, fontSize: 11)),
                  const SizedBox(height: 6),
                  DropdownButtonFormField<String>(
                    value: selectedType,
                    dropdownColor: AppTheme.surfaceDark,
                    style: const TextStyle(color: Colors.white, fontSize: 12),
                    items: [
                      'مشكلة مع التاجر',
                      'مشكلة مع البائع',
                      'لم يتم الاستلام',
                      'مشكلة في الوزن',
                      'مشكلة في الدفع',
                      'أخرى',
                    ].map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
                    onChanged: (val) {
                      if (val != null) setDialogState(() => selectedType = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: descCtrl,
                    maxLines: 3,
                    style: const TextStyle(color: Colors.white, fontSize: 12),
                    decoration: const InputDecoration(
                      hintText: 'اكتب تفاصيل الشكوى بدقة لمتابعتها من قبل الإدارة...',
                      hintStyle: TextStyle(color: Colors.white30, fontSize: 11),
                      filled: true,
                      fillColor: AppTheme.bgDark,
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('إلغاء', style: TextStyle(color: Colors.white54)),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent, foregroundColor: Colors.white),
                  onPressed: () {
                    state.submitComplaint(
                      auctionId: auction.id,
                      type: selectedType,
                      description: descCtrl.text.isEmpty ? 'شكوى بخصوص الصفقة' : descCtrl.text,
                    );
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('⚠️ تم إرسال الشكوى للإدارة وسيتم التواصل معك.')),
                    );
                  },
                  child: const Text('إرسال الشكوى'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final currentUserId = state.currentUser.id;

    // Auctions won by trader or waiting for payment
    final waitingCommissionAuctions = state.allAuctionsForAdmin.where((a) {
      return (a.status == 'WAITING_FOR_COMMISSION' || a.isEnded) &&
          (a.winnerId == currentUserId || a.winnerPhone == state.currentUser.phone) &&
          !a.isCommissionPaid;
    }).toList();

    final completedDeals = state.allAuctionsForAdmin.where((a) {
      return a.isCommissionPaid &&
          (a.winnerId == currentUserId || a.sellerId == currentUserId || state.isAdmin);
    }).toList();

    final myCreatedAuctions = state.allAuctionsForAdmin.where((a) {
      return a.sellerId == currentUserId || a.sellerPhone == state.currentUser.phone;
    }).toList();

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.primaryDark,
        elevation: 0,
        title: const Text(
          '🏆 صفقاتي وعمولات المزادات',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w900),
        ),
        centerTitle: true,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppTheme.goldAccent,
          labelColor: AppTheme.goldAccent,
          unselectedLabelColor: Colors.white60,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
          tabs: [
            Tab(text: '💳 بانتظار العمولة (${waitingCommissionAuctions.length})'),
            Tab(text: '✅ الصفقات الناجحة (${completedDeals.length})'),
            Tab(text: '➕ مزاداتي المنشورة (${myCreatedAuctions.length})'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Tab 1: Waiting for commission payment
          _buildWaitingCommissionList(context, waitingCommissionAuctions, state),

          // Tab 2: Completed Deals with contact info revealed
          _buildCompletedDealsList(context, completedDeals, state),

          // Tab 3: My Created Auctions (Seller view)
          _buildMyAuctionsList(context, myCreatedAuctions, state),
        ],
      ),
    );
  }

  Widget _buildWaitingCommissionList(BuildContext context, List<Auction> list, AppState state) {
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.check_circle_outline, size: 60, color: Colors.white.withOpacity(0.3)),
            const SizedBox(height: 12),
            const Text(
              'لا توجد مزادات بانتظار دفع العمولة حالياً',
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: list.length,
      itemBuilder: (ctx, i) {
        final a = list[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.cardDark,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: Colors.orangeAccent.withOpacity(0.4)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.orangeAccent.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      'مبروك! أنت الفائز بالمزاد 🎉',
                      style: TextStyle(color: Colors.orangeAccent, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                  Text(
                    '${a.currentPricePerKg} د.ع/كغم',
                    style: const TextStyle(color: AppTheme.goldAccent, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                a.title,
                style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 6),
              Text(
                'الكمية: ${a.approxWeightKg} كغم تقريباً | الموقع: ${a.governorate} (${a.area})',
                style: const TextStyle(color: Colors.white70, fontSize: 11),
              ),
              const SizedBox(height: 6),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppTheme.primaryDark,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('قيمة المزاد الإجمالية:', style: TextStyle(color: Colors.white70, fontSize: 11)),
                    Text(
                      '${a.totalEstimatedValue} د.ع',
                      style: const TextStyle(color: AppTheme.goldAccent, fontWeight: FontWeight.w900, fontSize: 14),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.goldAccent,
                    foregroundColor: AppTheme.primaryDark,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.lock_open, size: 16),
                  label: const Text(
                    '🔐 ادفع 2,000 د.ع لإظهار رقم البائع',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900),
                  ),
                  onPressed: () => _showZainCashPaymentDialog(context, a, state),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCompletedDealsList(BuildContext context, List<Auction> list, AppState state) {
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.handshake_outlined, size: 60, color: Colors.white.withOpacity(0.3)),
            const SizedBox(height: 12),
            const Text(
              'لا توجد صفقات مكتملة بعد',
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: list.length,
      itemBuilder: (ctx, i) {
        final a = list[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.cardDark,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0x2210B981),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      '✅ تم دفع العمولة وتأكيد الصفقة',
                      style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                  Text(
                    'Order: ${a.paymentOrderId ?? "ZC-928174"}',
                    style: const TextStyle(color: Colors.white38, fontSize: 10),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                a.title,
                style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),

              // REVEALED CONTACT BOX (Key specification)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.primaryDark,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.goldAccent.withOpacity(0.3)),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('صاحب الخردة (البائع):', style: TextStyle(color: Colors.white70, fontSize: 11)),
                        Text(a.sellerName, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('📞 رقم الهاتف المباشر:', style: TextStyle(color: AppTheme.goldAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                        SelectableText(
                          a.sellerPhone,
                          style: const TextStyle(color: AppTheme.goldAccent, fontWeight: FontWeight.w900, fontSize: 14),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('📍 موقع الاستلام:', style: TextStyle(color: Colors.white70, fontSize: 11)),
                        Text('${a.governorate} - ${a.area}', style: const TextStyle(color: Colors.white, fontSize: 11)),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 12),
              const Text(
                '🤝 تواصل معه واتفقوا مباشرة على الاستلام والوزن النهائي بالقبان والدفع.',
                style: TextStyle(color: Colors.white60, fontSize: 10),
              ),
              const SizedBox(height: 10),

              // Rating and Complaint Actions
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppTheme.goldAccent,
                        side: const BorderSide(color: Color(0x44D4AF37)),
                      ),
                      icon: const Icon(Icons.star, size: 14),
                      label: const Text('تقييم البائع', style: TextStyle(fontSize: 11)),
                      onPressed: () => _showRatingDialog(context, a, state),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.redAccent,
                        side: const BorderSide(color: Colors.redAccent),
                      ),
                      icon: const Icon(Icons.report_problem, size: 14),
                      label: const Text('تقديم شكوى', style: TextStyle(fontSize: 11)),
                      onPressed: () => _showComplaintDialog(context, a, state),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildMyAuctionsList(BuildContext context, List<Auction> list, AppState state) {
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inventory_outlined, size: 60, color: Colors.white.withOpacity(0.3)),
            const SizedBox(height: 12),
            const Text(
              'لم تقم بإضافة أي مزاد خردة بعد',
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: list.length,
      itemBuilder: (ctx, i) {
        final a = list[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.cardDark,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.white10),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    a.title,
                    style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: a.isEnded ? Colors.redAccent.withOpacity(0.2) : const Color(0x2210B981),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      a.isEnded ? 'منتهي' : 'نشط (${a.bidsCount} مزايدات)',
                      style: TextStyle(
                        color: a.isEnded ? Colors.redAccent : const Color(0xFF10B981),
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                'الوزن: ${a.approxWeightKg} كغم | السعر الحالي: ${a.currentPricePerKg} د.ع/كغم | القيمة: ${a.totalEstimatedValue} د.ع',
                style: const TextStyle(color: Colors.white70, fontSize: 11),
              ),
              if (a.isEnded) ...[
                const SizedBox(height: 8),
                Text(
                  'رسالة البائع: صافي المبلغ بعد خصم عمولة عَتّاگ (1,000 د.ع): ${a.netSellerAmount} د.ع تدفع من التاجر مباشرة.',
                  style: const TextStyle(color: AppTheme.goldAccent, fontSize: 10),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
