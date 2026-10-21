import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';

class AddAuctionScreen extends StatefulWidget {
  const AddAuctionScreen({super.key});

  @override
  State<AddAuctionScreen> createState() => _AddAuctionScreenState();
}

class _AddAuctionScreenState extends State<AddAuctionScreen> {
  final _titleController = TextEditingController();
  final _weightController = TextEditingController();
  final _startPriceController = TextEditingController();
  final _areaController = TextEditingController();
  final _descController = TextEditingController();

  String _selectedCatId = 'cat-cans';
  String _selectedGov = 'بغداد';

  final List<String> _governorates = [
    'بغداد', 'البصرة', 'النجف', 'كربلاء', 'أربيل', 'السليمانية', 'دهوك',
    'نينوى', 'كركوك', 'الأنبار', 'ديالى', 'بابل', 'واسط', 'ميسان',
    'ذي قار', 'المثنى', 'القادسية', 'صلاح الدين'
  ];

  void _handleSubmit() {
    final title = _titleController.text.trim();
    final weight = int.tryParse(_weightController.text.trim()) ?? 0;
    final startPrice = int.tryParse(_startPriceController.text.trim()) ?? 0;
    final area = _areaController.text.trim();
    final desc = _descController.text.trim();

    if (title.isEmpty || weight <= 0 || startPrice <= 0 || area.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.'),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    final appState = Provider.of<AppState>(context, listen: false);
    final cat = appState.categories.firstWhere((c) => c.id == _selectedCatId, orElse: () => appState.categories[1]);

    appState.addAuction(
      title: title,
      categoryId: cat.id,
      categoryName: cat.nameAr,
      weight: weight,
      startPrice: startPrice,
      governorate: _selectedGov,
      area: area,
      description: desc,
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🎉 تم نشر مزاد الخردة بنجاح! وبدأت المزايدات.'),
        backgroundColor: Color(0xFF15803D),
      ),
    );

    // Clear form
    _titleController.clear();
    _weightController.clear();
    _startPriceController.clear();
    _areaController.clear();
    _descController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: const Text('أضف مزاد خردة جديد ➕', style: TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Title
              _fieldLabel('عنوان المزاد أو نوع الخردة:'),
              TextField(
                controller: _titleController,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: _inputDeco('مثال: بالات قواطي بيبسي مكبوسة 500 كغم'),
              ),
              const SizedBox(height: 14),

              // Category Picker
              _fieldLabel('قسم الخردة:'),
              Consumer<AppState>(
                builder: (_, state, __) {
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceDark,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedCatId,
                        dropdownColor: AppTheme.surfaceDark,
                        isExpanded: true,
                        style: const TextStyle(color: Colors.white, fontFamily: 'Tajawal', fontSize: 14),
                        items: state.categories.where((c) => c.id != 'all').map((c) {
                          return DropdownMenuItem(value: c.id, child: Text('${c.icon} ${c.nameAr}'));
                        }).toList(),
                        onChanged: (val) {
                          if (val != null) setState(() => _selectedCatId = val);
                        },
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 14),

              // Weight & Start price Row
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _fieldLabel('الوزن التقديري (كغم):'),
                        TextField(
                          controller: _weightController,
                          keyboardType: TextInputType.number,
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: _inputDeco('500'),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _fieldLabel('سعر بدء الكيلو (د.ع):'),
                        TextField(
                          controller: _startPriceController,
                          keyboardType: TextInputType.number,
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: _inputDeco('1500'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Location Row
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _fieldLabel('المحافظة:'),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            color: AppTheme.surfaceDark,
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              value: _selectedGov,
                              dropdownColor: AppTheme.surfaceDark,
                              isExpanded: true,
                              style: const TextStyle(color: Colors.white, fontFamily: 'Tajawal', fontSize: 13),
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
                        _fieldLabel('المنطقة أو الحي:'),
                        TextField(
                          controller: _areaController,
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: _inputDeco('الشورجة / حي العروبة'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Description
              _fieldLabel('تفاصيل إضافية عن الشحنة:'),
              TextField(
                controller: _descController,
                maxLines: 3,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: _inputDeco('حالة الخردة، نقاوتها، التواجد، موعد التحميل...'),
              ),
              const SizedBox(height: 24),

              // Submit Button
              ElevatedButton(
                onPressed: _handleSubmit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.goldAccent,
                  foregroundColor: const Color(0xFF061811),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                ),
                child: const Text('نشر المزاد الآن 🚀', style: TextStyle(fontFamily: 'Cairo', fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _fieldLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(label, style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white70)),
    );
  }

  InputDecoration _inputDeco(String hint) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(color: Colors.white38, fontSize: 12),
      filled: true,
      fillColor: AppTheme.surfaceDark,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
    );
  }
}
