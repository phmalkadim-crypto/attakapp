import 'package:flutter/material.dart';
import '../constants/theme.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.primaryDark,
        elevation: 0,
        title: const Text(
          '📞 الدعم وقواعد العمولة',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w900),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Official Commission Rule Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppTheme.primaryDark,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0x44D4AF37), width: 1.5),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black38,
                    blurRadius: 10,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppTheme.goldAccent.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.account_balance_wallet, color: AppTheme.goldAccent, size: 24),
                      ),
                      const SizedBox(width: 12),
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'عمولة عَتّاگ الثابتة والرمزية',
                            style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w900),
                          ),
                          Text(
                            'أبسط وأعدل نظام عمولة في العراق',
                            style: TextStyle(color: AppTheme.goldAccent, fontSize: 11),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  const Divider(color: Colors.white12),
                  const SizedBox(height: 10),

                  _buildRuleRow('إجمالي العمولة لكل مزاد ناجح:', '2,000 د.ع فقط'),
                  const SizedBox(height: 8),
                  _buildRuleRow('حصة المشتري (التاجر الفائز):', '1,000 د.ع'),
                  const SizedBox(height: 8),
                  _buildRuleRow('حصة البائع (صاحب الخردة):', '1,000 د.ع'),
                  const SizedBox(height: 8),
                  _buildRuleRow('بوابة الدفع الإلكتروني المعتمدة:', 'زين كاش (ZainCash)'),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Crucial Financial Disclaimer Card (User Brief Point 14)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: Colors.amber.withOpacity(0.3)),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.warning_amber_rounded, color: AppTheme.goldAccent, size: 20),
                      SizedBox(width: 8),
                      Text(
                        'تنبيه قانوني ومالي مهم (عَتّاگ ليست وسيطاً مالياً):',
                        style: TextStyle(color: AppTheme.goldAccent, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Text(
                    '• منصة عَتّاگ لا تستلم ولا تحتفظ بثمن الخردة نفسه مطلقاً.\n'
                    '• عَتّاگ تستلم العمولة الرمزية (2,000 د.ع) فقط لإظهار معلومات التواصل.\n'
                    '• البائع والتاجر الفائز يتفقان ويتعاملان مباشرة وجهاً لوجه على:\n'
                    '   - الوزن النهائي الدقيق بالقبان عند التحميل.\n'
                    '   - موعد ومكان المعاينة والاستلام.\n'
                    '   - تسليم ثمن الخردة الصافي نقداً أو بالتحويل المباشر بينهما.',
                    style: TextStyle(color: Colors.white70, fontSize: 11, height: 1.6),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Direct Call Administration Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surfaceDark,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: Colors.white10),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'هاتف الإدارة والدعم الفني المباشر:',
                        style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '07829692579',
                        style: TextStyle(color: AppTheme.goldAccent, fontSize: 16, fontWeight: FontWeight.w900),
                      ),
                    ],
                  ),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.goldAccent,
                      foregroundColor: AppTheme.primaryDark,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    ),
                    icon: const Icon(Icons.phone, size: 16),
                    label: const Text('اتصال مباشر', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('الاتصال برقم إدارة عَتّاگ: 07829692579')),
                      );
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // FAQ Accordion Section
            const Text(
              'الأسئلة الشائعة والقوانين:',
              style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),

            _buildFaqItem(
              'كيف يتم حساب الفائز بالمزاد؟',
              'يفوز التاجر صاحب أعلى مزايدة مسجلة لكل كيلوغرام عند انتهاء وقت المزاد. في حال التساوي، يفوز صاحب المزايدة الأسبق زمنياً.',
            ),
            _buildFaqItem(
              'متى يظهر رقم هاتف البائع؟',
              'يبقى رقم البائع محجوباً ومشفر تماماً حتى ينتهي المزاد ويقوم التاجر الفائز بدفع عمولة المنصة (2,000 د.ع) عبر زين كاش.',
            ),
            _buildFaqItem(
              'ماذا يحدث إذا تراجع المشتري أو البائع؟',
              'المزايدة التزام جدي. أي مستخدم يرفض إتمام الصفقة بدون عذر قاهر يتم تقييم حسابه بنجمة واحدة وحظره نهائياً من منصة عَتّاگ.',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRuleRow(String label, String val) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
        Text(val, style: const TextStyle(color: AppTheme.goldAccent, fontSize: 12, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildFaqItem(String q, String a) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppTheme.cardDark,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white10),
      ),
      child: ExpansionTile(
        iconColor: AppTheme.goldAccent,
        collapsedIconColor: Colors.white54,
        title: Text(
          q,
          style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
            child: Text(
              a,
              style: const TextStyle(color: Colors.white70, fontSize: 11, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
