import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';
import 'auth_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final user = appState.currentUser;
    final isAdmin = user.role == 'admin' || user.phone == AppState.adminPhone;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: const Text('الملف الشخصي 👤', style: TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            // User Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: isAdmin ? AppTheme.goldAccent.withOpacity(0.5) : Colors.white10),
              ),
              child: Row(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isAdmin ? AppTheme.goldAccent : AppTheme.surfaceDark,
                      border: Border.all(color: AppTheme.goldAccent, width: 2),
                    ),
                    child: Center(
                      child: Text(
                        user.name.isNotEmpty ? user.name[0] : 'ع',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: isAdmin ? const Color(0xFF061811) : Colors.white,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user.name,
                          style: const TextStyle(fontFamily: 'Cairo', fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          user.phone,
                          style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: Colors.white60),
                        ),
                        const SizedBox(height: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                          decoration: BoxDecoration(
                            color: isAdmin ? const Color(0xFF7C3AED) : AppTheme.goldAccent,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            isAdmin ? '👑 مدير المنصة (Admin)' : 'تاجر خردة معتمد',
                            style: TextStyle(
                              fontFamily: 'Tajawal',
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: isAdmin ? Colors.white : const Color(0xFF061811),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Profile Options
            _profileOption(Icons.shield_outlined, 'توثيق الحساب والتاجر', 'موثق رسمياً ✅'),
            _profileOption(Icons.location_on_outlined, 'المنطقة والمحافظة', '${user.governorate} - ${user.area}'),
            if (isAdmin)
              _profileOption(Icons.admin_panel_settings_outlined, 'لوحة تحكم الإدارة (Admin Panel)', 'مفعّلة 👑', highlight: true),

            const SizedBox(height: 30),

            // Logout Button
            OutlinedButton.icon(
              onPressed: () {
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (_) => const AuthScreen()),
                  (route) => false,
                );
              },
              icon: const Icon(Icons.logout, color: Colors.redAccent, size: 20),
              label: const Text(
                'تسجيل الخروج من الحساب',
                style: TextStyle(fontFamily: 'Cairo', fontWeight: FontWeight.bold, color: Colors.redAccent),
              ),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: Colors.redAccent),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _profileOption(IconData icon, String title, String subtitle, {bool highlight = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: highlight ? AppTheme.goldAccent.withOpacity(0.12) : AppTheme.surfaceDark,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: highlight ? AppTheme.goldAccent : Colors.white10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(icon, color: highlight ? AppTheme.goldAccent : Colors.white60, size: 20),
              const SizedBox(width: 12),
              Text(title, style: const TextStyle(fontFamily: 'Tajawal', fontSize: 13, fontWeight: FontWeight.bold)),
            ],
          ),
          Text(subtitle, style: TextStyle(fontFamily: 'Tajawal', fontSize: 11, color: highlight ? AppTheme.goldAccent : Colors.white54)),
        ],
      ),
    );
  }
}
