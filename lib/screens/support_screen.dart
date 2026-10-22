import 'package:flutter/material.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

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
              const Center(
                child: Text(
                  'الدعم الفني والخدمات',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // بطاقة ترحيبية بالدعم
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.3)),
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF04AF37).withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.support_agent_rounded, color: Color(0xFF04AF37), size: 36),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'كيف يمكننا مساعدتك اليوم؟',
                      style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'فريق منصة عَتّاك متواجد لمساعدتك في حل أي مشكلة تتعلق بالمزادات أو عمليات البيع والشراء.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey[400], fontSize: 12.5, height: 1.4),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              const Text(
                'قنوات الاتصال السريع',
                style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),

              // خيار الاتصال المباشر
              _buildSupportOption(
                icon: Icons.phone_rounded,
                title: 'الاتصال المباشر بخدمة العملاء',
                subtitle: 'متاح طيلة أيام الأسبوع خلال أوقات العمل',
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('جارٍ الاتصال بخدمة العملاء...', style: TextStyle(fontFamily: 'Cairo'))),
                  );
                },
              ),
              const SizedBox(height: 12),

              // خيار مراسلة واتساب / تلجرام
              _buildSupportOption(
                icon: Icons.chat_rounded,
                title: 'مراسلة الدعم عبر التلجرام',
                subtitle: '@AttakSupport_bot',
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('تم فتح بوت الدعم الفني', style: TextStyle(fontFamily: 'Cairo'))),
                  );
                },
              ),
              const SizedBox(height: 12),

              // خيار الإبلاغ عن مشكلة
              _buildSupportOption(
                icon: Icons.report_problem_rounded,
                title: 'الإبلاغ عن مشكلة في مزاد',
                subtitle: 'أبلغنا عن أي حالة غير جادة أو مخالفة',
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('تم إرسال طلب البلاغ للفريق المختص', style: TextStyle(fontFamily: 'Cairo'))),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSupportOption({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF16251E),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.04)),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: const Color(0xFF22352C),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: const Color(0xFF04AF37), size: 20),
        ),
        title: Text(
          title,
          style: const TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4.0),
          child: Text(
            subtitle,
            style: TextStyle(color: Colors.grey[400], fontSize: 11.5),
          ),
        ),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey, size: 14),
      ),
    );
  }
}
