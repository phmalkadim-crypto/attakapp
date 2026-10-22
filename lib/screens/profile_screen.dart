import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';
import 'admin_dashboard_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final user = state.currentUser;

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.primaryDark,
        elevation: 0,
        title: const Text(
          '👤 الملف الشخصي',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w900),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // User Header Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0x33D4AF37)),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: const LinearGradient(
                            colors: [AppTheme.goldAccent, Color(0xFF997C22)],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.goldAccent.withOpacity(0.3),
                              blurRadius: 12,
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            user.name.isNotEmpty ? user.name[0] : 'ع',
                            style: const TextStyle(
                              color: AppTheme.primaryDark,
                              fontSize: 28,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ),
                      if (user.isVerifiedTrader)
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.blueAccent,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, size: 14, color: Colors.white),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        user.name,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      if (user.isVerifiedTrader) ...[
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.blueAccent.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: Colors.blueAccent),
                          ),
                          child: const Text(
                            '🔵 تاجر معتمد',
                            style: TextStyle(color: Colors.blueAccent, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    user.phone,
                    style: const TextStyle(
                      color: AppTheme.goldAccent,
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '📍 ${user.governorate} - ${user.area}',
                    style: const TextStyle(color: Colors.white60, fontSize: 11),
                  ),

                  const SizedBox(height: 14),
                  const Divider(color: Colors.white10),
                  const SizedBox(height: 10),

                  // Rating & Role Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.star, color: AppTheme.goldAccent, size: 16),
                              const SizedBox(width: 4),
                              Text(
                                '${user.rating}',
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                            ],
                          ),
                          Text('التقييم (${user.ratingCount})', style: const TextStyle(color: Colors.white54, fontSize: 10)),
                        ],
                      ),
                      Container(width: 1, height: 30, color: Colors.white10),
                      Column(
                        children: [
                          Text(
                            user.role == 'trader' ? 'تاجر خردة' : (user.role == 'seller' ? 'بائع خردة' : 'مدير المنصة'),
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          const Text('نوع الحساب', style: TextStyle(color: Colors.white54, fontSize: 10)),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Admin Dashboard Entry (if Admin)
            if (state.isAdmin) ...[
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0E3828), Color(0xFF13523A)],
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.goldAccent.withOpacity(0.5)),
                ),
                child: ListTile(
                  leading: const Icon(Icons.admin_panel_settings, color: AppTheme.goldAccent),
                  title: const Text(
                    'لوحة تحكم الإدارة (Admin Dashboard)',
                    style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text(
                    'إدارة المستخدمين، الأقسام، الشكاوى والعمولات',
                    style: TextStyle(color: Colors.white60, fontSize: 10),
                  ),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.goldAccent),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const AdminDashboardScreen()),
                    );
                  },
                ),
              ),
              const SizedBox(height: 14),
            ],

            // Account Details List
            Container(
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: Colors.white10),
              ),
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.verified_user_outlined, color: AppTheme.goldAccent),
                    title: const Text('حالة التوثيق التجاري', style: TextStyle(color: Colors.white, fontSize: 12)),
                    trailing: Text(
                      user.isVerifiedTrader ? 'موثق رسمياً' : 'غير موثق (تواصل مع الإدارة)',
                      style: TextStyle(
                        color: user.isVerifiedTrader ? const Color(0xFF10B981) : Colors.orangeAccent,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const Divider(color: Colors.white10, height: 1),
                  const ListTile(
                    leading: Icon(Icons.payment_outlined, color: AppTheme.goldAccent),
                    title: Text('بوابة الدفع المعتمدة', style: TextStyle(color: Colors.white, fontSize: 12)),
                    trailing: Text('ZainCash (زين كاش)', style: TextStyle(color: Colors.white70, fontSize: 11)),
                  ),
                  const Divider(color: Colors.white10, height: 1),
                  const ListTile(
                    leading: Icon(Icons.language_outlined, color: AppTheme.goldAccent),
                    title: Text('اللغة والتوجيه', style: TextStyle(color: Colors.white, fontSize: 12)),
                    trailing: Text('العربية (العراق RTL)', style: TextStyle(color: Colors.white70, fontSize: 11)),
                  ),
                  const Divider(color: Colors.white10, height: 1),
                  ListTile(
                    leading: const Icon(Icons.support_agent_outlined, color: AppTheme.goldAccent),
                    title: const Text('هاتف دعم منصة عَتّاگ', style: TextStyle(color: Colors.white, fontSize: 12)),
                    trailing: const Text(
                      '07829692579',
                      style: TextStyle(color: AppTheme.goldAccent, fontWeight: FontWeight.bold, fontSize: 12),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Logout / Switch User Demo
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.redAccent,
                  side: const BorderSide(color: Colors.redAccent),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                icon: const Icon(Icons.logout, size: 18),
                label: const Text('تسجيل الخروج', style: TextStyle(fontWeight: FontWeight.bold)),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('تم تسجيل الخروج بنجاح')),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
