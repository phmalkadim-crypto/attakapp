import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';
import 'main_navigation_screen.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool _isLogin = true;
  bool _otpSent = false;

  final TextEditingController _phoneCtrl = TextEditingController(text: '07829692579');
  final TextEditingController _otpCtrl = TextEditingController(text: '1234');
  final TextEditingController _nameCtrl = TextEditingController();
  final TextEditingController _areaCtrl = TextEditingController();
  String _selectedGov = 'الديوانية';
  String _selectedRole = 'both'; // 'trader' | 'seller' | 'both'

  final List<String> _governorates = [
    'الديوانية',
    'بغداد',
    'البصرة',
    'النجف الأشرف',
    'كربلاء المقدسة',
    'أربيل',
    'بابل',
    'الموصل',
    'ذي قار',
    'كركوك',
    'ديالى',
    'الأنبار',
    'ميسان',
    'واسط',
    'المثنى',
    'صلاح الدين',
    'دهوك',
    'السليمانية',
  ];

  @override
  void dispose() {
    _phoneCtrl.dispose();
    _otpCtrl.dispose();
    _nameCtrl.dispose();
    _areaCtrl.dispose();
    super.dispose();
  }

  void _handleSendOtp() {
    final phone = _phoneCtrl.text.trim();
    if (phone.isEmpty || !phone.startsWith('07') || phone.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: Colors.redAccent,
          content: Text('يرجى إدخال رقم هاتف عراقي صحيح يبدأ بـ 07 (10-11 رقماً)', textAlign: TextAlign.center),
        ),
      );
      return;
    }

    setState(() => _otpSent = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFF10B981),
        content: Text('تم إرسال رمز التحقق OTP إلى هاتفك (الرمز التجريبي: 1234)', textAlign: TextAlign.center),
      ),
    );
  }

  void _handleAuthSubmit(AppState state) {
    final phone = _phoneCtrl.text.trim();

    if (_isLogin) {
      state.login(phone, '123456');
    } else {
      if (_nameCtrl.text.trim().isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('يرجى إدخال الاسم الكريم')),
        );
        return;
      }
      state.register(
        name: _nameCtrl.text.trim(),
        phone: phone,
        governorate: _selectedGov,
        area: _areaCtrl.text.trim().isEmpty ? 'المركز' : _areaCtrl.text.trim(),
        role: _selectedRole,
      );
    }

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const MainNavigationScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo Icon
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [AppTheme.goldAccent, Color(0xFF997C22)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x44D4AF37),
                        blurRadius: 16,
                        offset: Offset(0, 6),
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Text(
                      'ع',
                      style: TextStyle(
                        color: AppTheme.primaryDark,
                        fontSize: 44,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                const Text(
                  'عَتّاگ | Attak',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const Text(
                  'منصة الخردة العراقية الأولى',
                  style: TextStyle(
                    color: AppTheme.goldAccent,
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 28),

                // Auth Card
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: AppTheme.cardDark,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: const Color(0x33D4AF37)),
                  ),
                  child: Column(
                    children: [
                      // Toggle Login / Register
                      Row(
                        children: [
                          Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() {
                                _isLogin = true;
                                _otpSent = false;
                              }),
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                  color: _isLogin ? AppTheme.goldAccent : Colors.transparent,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Center(
                                  child: Text(
                                    'تسجيل الدخول',
                                    style: TextStyle(
                                      color: _isLogin ? AppTheme.primaryDark : Colors.white60,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() {
                                _isLogin = false;
                                _otpSent = false;
                              }),
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                  color: !_isLogin ? AppTheme.goldAccent : Colors.transparent,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Center(
                                  child: Text(
                                    'حساب جديد',
                                    style: TextStyle(
                                      color: !_isLogin ? AppTheme.primaryDark : Colors.white60,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 20),

                      // Phone Input
                      Align(
                        alignment: Alignment.centerRight,
                        child: Text(
                          'رقم الهاتف العراقي (07XXXXXXXXX):',
                          style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _phoneCtrl,
                        keyboardType: TextInputType.phone,
                        style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                        decoration: InputDecoration(
                          hintText: '078XXXXXXXX',
                          hintStyle: const TextStyle(color: Colors.white30),
                          prefixIcon: const Icon(Icons.phone_android, color: AppTheme.goldAccent, size: 20),
                          filled: true,
                          fillColor: AppTheme.surfaceDark,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                        ),
                      ),

                      const SizedBox(height: 12),

                      if (!_otpSent) ...[
                        SizedBox(
                          width: double.infinity,
                          height: 46,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.goldAccent,
                              foregroundColor: AppTheme.primaryDark,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: _handleSendOtp,
                            child: const Text('إرسال رمز التحقق OTP 📲', style: TextStyle(fontWeight: FontWeight.w900)),
                          ),
                        ),
                      ] else ...[
                        // OTP Input
                        Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            'رمز التحقق OTP (تم إرساله للرقم):',
                            style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _otpCtrl,
                          keyboardType: TextInputType.number,
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: AppTheme.goldAccent, fontSize: 18, fontWeight: FontWeight.w900, letterSpacing: 6),
                          decoration: InputDecoration(
                            hintText: '1234',
                            filled: true,
                            fillColor: AppTheme.surfaceDark,
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                          ),
                        ),

                        if (!_isLogin) ...[
                          const SizedBox(height: 14),
                          // Name Input
                          TextField(
                            controller: _nameCtrl,
                            style: const TextStyle(color: Colors.white, fontSize: 13),
                            decoration: InputDecoration(
                              hintText: 'الاسم الكامل أو اسم الورشة / المحل',
                              hintStyle: const TextStyle(color: Colors.white30),
                              filled: true,
                              fillColor: AppTheme.surfaceDark,
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                            ),
                          ),
                          const SizedBox(height: 10),

                          // Governorate Picker
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            decoration: BoxDecoration(
                              color: AppTheme.surfaceDark,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton<String>(
                                value: _selectedGov,
                                dropdownColor: AppTheme.cardDark,
                                isExpanded: true,
                                style: const TextStyle(color: Colors.white, fontSize: 13),
                                items: _governorates.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                                onChanged: (v) {
                                  if (v != null) setState(() => _selectedGov = v);
                                },
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),

                          // Role Selector
                          Row(
                            children: [
                              _buildRoleOption('trader', '🏪 تاجر'),
                              const SizedBox(width: 6),
                              _buildRoleOption('seller', '👤 بائع'),
                              const SizedBox(width: 6),
                              _buildRoleOption('both', '🔄 كلاهما'),
                            ],
                          ),
                        ],

                        const SizedBox(height: 18),

                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.goldAccent,
                              foregroundColor: AppTheme.primaryDark,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            ),
                            onPressed: () => _handleAuthSubmit(state),
                            child: Text(
                              _isLogin ? 'دخول التطبيق 🚀' : 'إنشاء الحساب والبدء 🚀',
                              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Quick Admin Demo Shortcut
                TextButton(
                  onPressed: () {
                    _phoneCtrl.text = '07829692579';
                    _otpSent = true;
                    _handleAuthSubmit(state);
                  },
                  child: const Text(
                    '⚡ دخول فوري بحساب المدير المعتمد (07829692579)',
                    style: TextStyle(color: AppTheme.goldAccent, fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRoleOption(String roleKey, String label) {
    final isSelected = _selectedRole == roleKey;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedRole = roleKey),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.goldAccent : AppTheme.surfaceDark,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: isSelected ? AppTheme.goldAccent : Colors.white12),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: isSelected ? AppTheme.primaryDark : Colors.white70,
                fontSize: 11,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
