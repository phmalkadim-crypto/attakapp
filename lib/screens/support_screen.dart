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
              // العنوان في الأعلى
              const Center(
                child: Text(
                  'الدعم الفني والمساعدة',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // بطاقة التواصل المباشر
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF04AF37).withOpacity(0.3)),
                ),
                child: Column(
                  children: [
                    const Icon(
                      Icons.support_agent_rounded,
                      color: Color(0xFF04AF37),
                      size: 48,
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'كيف يمكننا مساعدتك اليوم؟',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'فريق الدعم في عَتّاك متواجد للإجابة على استفساراتك وحل أي مشكلة تواجهك في المزادات أو صفقات الخردة.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey[400], fontSize: 12.5),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 45,
                      child: ElevatedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.chat_rounded, size: 18),
                        label: const Text('مراسلة الإدارة عبر تيليجرام', style: TextStyle(fontSize: 14)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF04AF37),
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // الأسئلة الشائعة
              const Text(
                'الأسئلة الشائعة',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),

              _buildFAQItem(
                question: 'كيف يتم تسليم الخردة واستلام الأموال؟',
                answer: 'يتم الاتفاق مباشرة بين المشتري والبائع بعد رسو المزاد، وتتم المعاملة يدوياً أو عبر قنوات الدعم المعتمدة.',
              ),
              const SizedBox(height: 10),
              _buildFAQItem(
                question: 'ما هي نسبة عمولة التطبيق؟',
                answer: 'تعتمد العمولة على حجم الصفقة ويتم توضيحها بالكامل قبل إتمام البيع.',
              ),
              const SizedBox(height: 10),
              _buildFAQItem(
                question: 'كيف أستطيع رفع مزاد جديد؟',
                answer: 'من خلال الضغط على زر (+) في وسط شريط التنقل السفلي وملء تفاصيل الخردة.',
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFAQItem({required String question, required String answer}) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF16251E),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.04)),
      ),
      child: ExpansionTile(
        collapsedIconColor: Colors.grey,
        iconColor: const Color(0xFF04AF37),
        title: Text(
          question,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 13.5,
            fontWeight: FontWeight.bold,
          ),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Text(
              answer,
              style: TextStyle(color: Colors.grey[400], fontSize: 12.5),
            ),
          ),
        ],
      ),
    );
  }
}
