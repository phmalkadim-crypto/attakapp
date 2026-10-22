import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _newCatNameCtrl = TextEditingController();
  final TextEditingController _newCatIconCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _newCatNameCtrl.dispose();
    _newCatIconCtrl.dispose();
    super.dispose();
  }

  void _showAddCategoryDialog(BuildContext context, AppState state) {
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: AppTheme.cardDark,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Text('إضافة قسم خردة جديد', style: TextStyle(color: Colors.white, fontSize: 14)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _newCatNameCtrl,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: const InputDecoration(
                  hintText: 'اسم القسم (مثال: بلاستيك نايلون)',
                  hintStyle: TextStyle(color: Colors.white38),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: _newCatIconCtrl,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: const InputDecoration(
                  hintText: 'الأيقونة (مثال: 📦)',
                  hintStyle: TextStyle(color: Colors.white38),
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
              style: ElevatedButton.styleFrom(backgroundColor: AppTheme.goldAccent, foregroundColor: AppTheme.primaryDark),
              onPressed: () {
                if (_newCatNameCtrl.text.isNotEmpty) {
                  state.adminAddCategory(
                    nameAr: _newCatNameCtrl.text.trim(),
                    icon: _newCatIconCtrl.text.trim().isEmpty ? '♻️' : _newCatIconCtrl.text.trim(),
                    slug: 'cat-${DateTime.now().millisecondsSinceEpoch}',
                  );
                  _newCatNameCtrl.clear();
                  _newCatIconCtrl.clear();
                  Navigator.pop(ctx);
                }
              },
              child: const Text('إضافة'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);

    final totalVolume = state.allAuctionsForAdmin.fold<int>(0, (sum, a) => sum + a.totalEstimatedValue);
    final commissionRevenue = state.payments.length * 2000;

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.primaryDark,
        title: const Text(
          '🛡️ لوحة إدارة عَتّاگ (Admin)',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppTheme.goldAccent,
          labelColor: AppTheme.goldAccent,
          unselectedLabelColor: Colors.white60,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
          tabs: [
            const Tab(text: '📊 الإحصائيات'),
            Tab(text: '👥 المستخدمون (${state.users.length})'),
            Tab(text: '🗂️ الأقسام (${state.allCategoriesForAdmin.length})'),
            Tab(text: '⚠️ الشكاوى (${state.complaints.length})'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // 1. Overview & Finances
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('نظرة مالية وتشغيلية:', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        title: 'إجمالي قيمة المزادات',
                        value: '$totalVolume د.ع',
                        icon: Icons.trending_up,
                        color: AppTheme.goldAccent,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        title: 'العمولات المحصلة',
                        value: '$commissionRevenue د.ع',
                        icon: Icons.account_balance_wallet,
                        color: const Color(0xFF10B981),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        title: 'عدد المزادات النشطة',
                        value: '${state.allAuctionsForAdmin.length}',
                        icon: Icons.gavel,
                        color: Colors.orangeAccent,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        title: 'عدد التجار المسجلين',
                        value: '${state.users.length}',
                        icon: Icons.people,
                        color: Colors.lightBlueAccent,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const Text('آخر المزادات في المنصة:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                ...state.allAuctionsForAdmin.take(5).map((a) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.cardDark,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(a.title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                              Text('${a.sellerName} | ${a.governorate} | ${a.currentPricePerKg} د.ع/كغم', style: const TextStyle(color: Colors.white54, fontSize: 10)),
                            ],
                          ),
                        ),
                        Row(
                          children: [
                            Text(a.status, style: const TextStyle(color: AppTheme.goldAccent, fontSize: 10, fontWeight: FontWeight.bold)),
                            IconButton(
                              icon: const Icon(Icons.block, color: Colors.redAccent, size: 18),
                              onPressed: () => state.adminStopAuction(a.id),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ],
            ),
          ),

          // 2. Manage Users
          ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: state.users.length,
            itemBuilder: (ctx, i) {
              final u = state.users[i];
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.cardDark,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: u.isBanned ? Colors.redAccent : Colors.white10),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(u.name, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                            if (u.isVerifiedTrader)
                              const Padding(
                                padding: EdgeInsets.only(right: 6),
                                child: Text('🔵 معتمد', style: TextStyle(color: Colors.blueAccent, fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                            if (u.isBanned)
                              const Padding(
                                padding: EdgeInsets.only(right: 6),
                                child: Text('🚫 محظور', style: TextStyle(color: Colors.redAccent, fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                          ],
                        ),
                        Text('${u.phone} | ${u.governorate} (${u.role})', style: const TextStyle(color: Colors.white54, fontSize: 11)),
                      ],
                    ),
                    Row(
                      children: [
                        IconButton(
                          tooltip: 'توثيق تاجر معتمد',
                          icon: Icon(
                            u.isVerifiedTrader ? Icons.verified : Icons.verified_outlined,
                            color: Colors.blueAccent,
                          ),
                          onPressed: () => state.adminVerifyTrader(u.id),
                        ),
                        IconButton(
                          tooltip: 'حظر / إلغاء حظر',
                          icon: Icon(
                            u.isBanned ? Icons.lock_open : Icons.lock_outline,
                            color: u.isBanned ? Colors.greenAccent : Colors.redAccent,
                          ),
                          onPressed: () => state.adminToggleBanUser(u.id),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),

          // 3. Dynamic Categories Management
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(backgroundColor: AppTheme.goldAccent, foregroundColor: AppTheme.primaryDark),
                    icon: const Icon(Icons.add),
                    label: const Text('إضافة قسم خردة جديد من الإدارة', style: TextStyle(fontWeight: FontWeight.bold)),
                    onPressed: () => _showAddCategoryDialog(context, state),
                  ),
                ),
                const SizedBox(height: 12),
                Expanded(
                  child: ListView.builder(
                    itemCount: state.allCategoriesForAdmin.length,
                    itemBuilder: (ctx, i) {
                      final cat = state.allCategoriesForAdmin[i];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: AppTheme.cardDark,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: cat.isActive ? Colors.white10 : Colors.redAccent.withOpacity(0.4)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Text(cat.icon, style: const TextStyle(fontSize: 18)),
                                const SizedBox(width: 8),
                                Text(cat.nameAr, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                  cat.isActive ? 'مفعل' : 'معطل',
                                  style: TextStyle(color: cat.isActive ? const Color(0xFF10B981) : Colors.redAccent, fontSize: 11),
                                ),
                                Switch(
                                  value: cat.isActive,
                                  activeColor: AppTheme.goldAccent,
                                  onChanged: (_) => state.adminToggleCategory(cat.id),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.delete_outline, color: Colors.white38, size: 18),
                                  onPressed: () => state.adminDeleteCategory(cat.id),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),

          // 4. Complaints Management
          ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: state.complaints.length,
            itemBuilder: (ctx, i) {
              final c = state.complaints[i];
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppTheme.cardDark,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: c.status == 'RESOLVED' ? const Color(0xFF10B981) : Colors.orangeAccent),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '⚠️ ${c.type}',
                          style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: c.status == 'RESOLVED' ? const Color(0x2210B981) : Colors.orangeAccent.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            c.status == 'RESOLVED' ? 'تم الحل ✅' : 'قيد المتابعة ⏳',
                            style: TextStyle(
                              color: c.status == 'RESOLVED' ? const Color(0xFF10B981) : Colors.orangeAccent,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text('الشاكي: ${c.userName} (${c.userPhone})', style: const TextStyle(color: AppTheme.goldAccent, fontSize: 11)),
                    const SizedBox(height: 6),
                    Text(c.description, style: const TextStyle(color: Colors.white70, fontSize: 11)),
                    const SizedBox(height: 10),
                    if (c.status != 'RESOLVED')
                      Align(
                        alignment: Alignment.centerLeft,
                        child: TextButton.icon(
                          icon: const Icon(Icons.check_circle_outline, color: Color(0xFF10B981), size: 16),
                          label: const Text('تأكيد حل الشكوى', style: TextStyle(color: Color(0xFF10B981), fontSize: 11)),
                          onPressed: () => state.adminResolveComplaint(c.id),
                        ),
                      ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildMetricCard({required String title, required String value, required IconData icon, required Color color}) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.cardDark,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(color: Colors.white60, fontSize: 11)),
          const SizedBox(height: 4),
          Text(value, style: TextStyle(color: color, fontSize: 14, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }
}
