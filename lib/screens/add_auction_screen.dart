import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/app_state.dart';

class AddAuctionScreen extends StatefulWidget {
  const AddAuctionScreen({super.key});

  @override
  State<AddAuctionScreen> createState() => _AddAuctionScreenState();
}

class _AddAuctionScreenState extends State<AddAuctionScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _startPriceController = TextEditingController();
  final TextEditingController _areaController = TextEditingController();
  final TextEditingController _descController = TextEditingController();

  String _selectedCategoryId = 'cat-cans';
  String _selectedGov = 'الديوانية';
  int _selectedDurationHours = 6;
  String _selectedImageUrl = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60';

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

  final List<int> _durations = [1, 3, 6, 12, 24];

  final List<Map<String, String>> _sampleScrapImages = [
    {'title': 'قواطي مكبوسة', 'url': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60'},
    {'title': 'نحاس أحمر', 'url': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=60'},
    {'title': 'حديد شيلمان', 'url': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60'},
    {'title': 'بطاريات سكراب', 'url': 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=60'},
    {'title': 'ألمنيوم بروفايل', 'url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60'},
  ];

  @override
  void dispose() {
    _titleController.dispose();
    _weightController.dispose();
    _startPriceController.dispose();
    _areaController.dispose();
    _descController.dispose();
    super.dispose();
  }

  void _submitAuction(AppState state) {
    if (!_formKey.currentState!.validate()) return;

    final weight = int.tryParse(_weightController.text) ?? 50;
    final startPrice = int.tryParse(_startPriceController.text) ?? 1500;
    final category = state.categories.firstWhere(
      (c) => c.id == _selectedCategoryId,
      orElse: () => state.categories.first,
    );

    state.addAuction(
      title: _titleController.text.trim(),
      categoryId: category.id,
      categoryName: category.nameAr,
      approxWeightKg: weight,
      startPricePerKg: startPrice,
      governorate: _selectedGov,
      area: _areaController.text.trim().isEmpty ? 'المركز الصناعي' : _areaController.text.trim(),
      description: _descController.text.trim().isEmpty
          ? 'خردة نظيفة ومفروزة، والوزن خاضع للوزن الدقيق بالقبان عند الاستلام.'
          : _descController.text.trim(),
      durationHours: _selectedDurationHours,
      customImageUrl: _selectedImageUrl,
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFF10B981),
        content: Text('🚀 تم نشر مزادك بنجاح في عَتّاگ!', textAlign: TextAlign.center),
      ),
    );

    // Reset fields
    _titleController.clear();
    _weightController.clear();
    _startPriceController.clear();
    _areaController.clear();
    _descController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final categories = state.categories;

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.primaryDark,
        elevation: 0,
        title: const Text(
          '➕ أضف خردتك للمزاد',
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w900),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Guidelines Box
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.primaryDark,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: const Color(0x33D4AF37)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.info_outline, color: AppTheme.goldAccent, size: 20),
                    SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        'انشر خردتك ليصل إشعارك لآلاف التجار في كل محافظات العراق. المزايدة تتم بسعر الكيلوغرام والتنافس علني ومباشر.',
                        style: TextStyle(color: Colors.white70, fontSize: 11, height: 1.4),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // Title
              const Text('عنوان المزاد (اسم المادة):', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _titleController,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: _inputDecoration('مثال: بالات قواطي ألمنيوم مكبوسة أو كابلات نحاس'),
                validator: (val) => val == null || val.trim().isEmpty ? 'يرجى كتابة عنوان المزاد' : null,
              ),

              const SizedBox(height: 16),

              // Category Selector
              const Text('نوع وقسم الخردة:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceDark,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white12),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedCategoryId,
                    dropdownColor: AppTheme.cardDark,
                    isExpanded: true,
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    items: categories.map((cat) {
                      return DropdownMenuItem(
                        value: cat.id,
                        child: Row(
                          children: [
                            Text(cat.icon, style: const TextStyle(fontSize: 16)),
                            const SizedBox(width: 8),
                            Text(cat.nameAr),
                          ],
                        ),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedCategoryId = val);
                    },
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Scrap Photos Picker (Presets simulation)
              const Text('صور الخردة:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _sampleScrapImages.map((img) {
                    final isSelected = _selectedImageUrl == img['url'];
                    return GestureDetector(
                      onTap: () => setState(() => _selectedImageUrl = img['url']!),
                      child: Container(
                        margin: const EdgeInsets.only(left: 8),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: isSelected ? AppTheme.goldAccent : Colors.transparent,
                            width: 2,
                          ),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Stack(
                            children: [
                              Image.network(img['url']!, width: 75, height: 75, fit: BoxFit.cover),
                              if (isSelected)
                                Positioned(
                                  top: 4,
                                  right: 4,
                                  child: Container(
                                    padding: const EdgeInsets.all(2),
                                    decoration: const BoxDecoration(color: AppTheme.goldAccent, shape: BoxShape.circle),
                                    child: const Icon(Icons.check, size: 12, color: AppTheme.primaryDark),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),

              const SizedBox(height: 16),

              // Approx Weight & Clarification
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('الكمية والوزن (كغم):', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _weightController,
                          keyboardType: TextInputType.number,
                          style: const TextStyle(color: Colors.white, fontSize: 13),
                          decoration: _inputDecoration('مثال: 50'),
                          validator: (val) => val == null || val.trim().isEmpty ? 'أدخل الوزن' : null,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('سعر البداية / كغم (د.ع):', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _startPriceController,
                          keyboardType: TextInputType.number,
                          style: const TextStyle(color: Colors.white, fontSize: 13),
                          decoration: _inputDecoration('مثال: 1500'),
                          validator: (val) => val == null || val.trim().isEmpty ? 'أدخل السعر' : null,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              const Text(
                '⚖️ ملاحظة: الكمية تقريبية ويتم الاتفاق على الوزن النهائي مع التاجر الفائز على القبان عند الاستلام.',
                style: TextStyle(color: Colors.white54, fontSize: 10),
              ),

              const SizedBox(height: 16),

              // Location: Governorate & Area
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('المحافظة:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          decoration: BoxDecoration(
                            color: AppTheme.surfaceDark,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.white12),
                          ),
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              value: _selectedGov,
                              dropdownColor: AppTheme.cardDark,
                              isExpanded: true,
                              style: const TextStyle(color: Colors.white, fontSize: 13),
                              items: _governorates.map((gov) {
                                return DropdownMenuItem(value: gov, child: Text(gov));
                              }).toList(),
                              onChanged: (val) {
                                if (val != null) setState(() => _selectedGov = val);
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('المنطقة أو الحي:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _areaController,
                          style: const TextStyle(color: Colors.white, fontSize: 13),
                          decoration: _inputDecoration('مثال: حي العروبة / الصناعي'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // Duration Picker (1, 3, 6, 12, 24 hours)
              const Text('مدة المزاد:', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              Row(
                children: _durations.map((hrs) {
                  final isSelected = _selectedDurationHours == hrs;
                  return Expanded(
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      child: InkWell(
                        onTap: () => setState(() => _selectedDurationHours = hrs),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          decoration: BoxDecoration(
                            color: isSelected ? AppTheme.goldAccent : AppTheme.surfaceDark,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                              color: isSelected ? AppTheme.goldAccent : Colors.white12,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              '$hrs س',
                              style: TextStyle(
                                color: isSelected ? AppTheme.primaryDark : Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 11,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),

              const SizedBox(height: 16),

              // Optional Description
              const Text('وصف الخردة وحالتها (اختياري):', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _descController,
                maxLines: 3,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: _inputDecoration('أدخل أي تفاصيل إضافية عن النقاوة، وسيلة الرفع أو النقل...'),
              ),

              const SizedBox(height: 24),

              // Publish Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.goldAccent,
                    foregroundColor: AppTheme.primaryDark,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    elevation: 5,
                  ),
                  icon: const Icon(Icons.rocket_launch, size: 20),
                  label: const Text(
                    '🚀 نشر المزاد الآن في عَتّاگ',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
                  ),
                  onPressed: () => _submitAuction(state),
                ),
              ),

              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String hint) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(color: Colors.white30, fontSize: 12),
      filled: true,
      fillColor: AppTheme.surfaceDark,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Colors.white12),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Colors.white12),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: AppTheme.goldAccent),
      ),
    );
  }
}
