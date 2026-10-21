import 'package:flutter/material.dart';
import '../constants/theme.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final faqs = [
      {
        'q': 'من يدفع عمولة المنصة ومتى يتم دفعها؟',
        'a': 'تبلغ عمولة المنصة 2,000 دينار مقسمة مناصفة (1,000 دينار على البائع و1,000 دينار على المشتري). يدفع المشتري الفائز كامل المبلغ (2,000 دينار) عبر بوابة ZainCash بعد انتهاء المزاد لفتح بيانات التواصل ورقم الهاتف. وعند الاستلام، يخصم المشتري 1,000 دينار من حساب البائع (مثال: إذا رسى المزاد على 85 ألف، يدفع المشتري للمنصة 2,000 زين كاش، ويسلم البائع 84 ألف دينار فقط عند الاستلام).',
      },
      {
        'q': 'كيف أبيع خردتي بأعلى سعر في عَتّاك؟',
        'a': 'اضغط على زر (+) في الوسط، اختر نوع الخردة المناسب (ألمنيوم، نحاس، حديد، بطاريات)، أضف الوزن التقديري، وحدد محافظتك ومنطقتك. ستبدأ مزايدات التجار المعتمدين فوراً ويتنافسون لرفع السعر.',
      },
      {
        'q': 'هل تستلم منصة عَتّاك قيمة الخردة المالية؟',
        'a': 'كلا، منصة عَتّاك لا تستلم قيمة الخردة إطلاقاً. قيمة الخردة الفعلية تُدفع نقداً ومباشرة من التاجر للبائع في الميدان عند فحص الخردة ووزنها في القبّان.',
      },
      {
        'q': 'ماذا يحدث إذا اختلف التاجر والبائع على الوزن في القبّان؟',
        'a': 'المعاملة تخضع للوزن الصافي في القبّان المعتمد باتفاق الطرفين. وفي حال عدم الاتفاق، يمكن للطرفين إلغاء المعاملة أو التواصل الفوري مع فريق الدعم لحل الإشكال.',
      },
    ];

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: const Text('مركز الدعم والمساعدة 🎧', style: TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Contact Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surfaceDark,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppTheme.goldAccent.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 46,
                    height: 46,
                    decoration: BoxDecoration(
                      color: AppTheme.goldAccent.withOpacity(0.2),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.phone_in_talk, color: AppTheme.goldAccent),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('فريق الدعم المباشر', style: TextStyle(fontFamily: 'Cairo', fontWeight: FontWeight.bold, fontSize: 14)),
                        SizedBox(height: 2),
                        Text('هاتف الإدارة والدعم: 07829692579', style: TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: AppTheme.goldAccent)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text(
              'الأسئلة الشائعة والأمان:',
              style: TextStyle(fontFamily: 'Cairo', fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 10),

            // FAQs List
            ...faqs.map((f) {
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: AppTheme.cardDark,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Theme(
                  data: ThemeData.dark().copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    title: Text(
                      f['q']!,
                      style: const TextStyle(fontFamily: 'Cairo', fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 16, right: 16, bottom: 14),
                        child: Text(
                          f['a']!,
                          style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: Colors.white70, height: 1.5),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
