import 'package:flutter/material.dart';
import '../models/auction_model.dart';

class AddAuctionScreen extends StatefulWidget {
  final Function(AuctionModel) onAuctionAdded;

  const AddAuctionScreen({super.key, required this.onAuctionAdded});

  @override
  State<AddAuctionScreen> createState() => _AddAuctionScreenState();
}

class _AddAuctionScreenState extends State<AddAuctionScreen> {
  final _titleController = TextEditingController();
  final _weightController = TextEditingController();
  final _priceController = TextEditingController();
  
  String _selectedCategory = 'قواطي';
  String _selectedCity = 'الديوانية - مركز الديوانية';

  final List<String> _categories = ['قواطي', 'نحاس', 'حديد', 'ألمنيوم', 'بطاريات', 'أخرى'];
  final List<String> _cities = ['الديوانية - مركز الديوانية', 'بغداد - الكرادة', 'البصرة - العشار', 'النجف - المدينة القديمة'];

  @override
  void dispose() {
    _titleController.dispose();
    _weightController.dispose();
    _priceController.dispose();
    super.dispose();
  }

  void _submitAuction() {
    if (_titleController.text.isEmpty || _weightController.text.isEmpty || _priceController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('يرجى ملء جميع الحقول المطلوبة', style: TextStyle(fontFamily: 'Cairo'))),
      );
      return;
    }

    final newAuction = AuctionModel(
      title: _titleController.text,
      category: _selectedCategory,
      weight: '${_weightController.text} كغم تقريباً',
      price: '${_priceController.text} د.ع / كغم',
      city: _selectedCity,
      endTime: '24:00:00',
      bidsCount: 0,
    );

    widget.onAuctionAdded(newAuction);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم إضافة المزاد بنجاح ونشره في المنصة', style: TextStyle(fontFamily: 'Cairo'))),
    );

    // تفريغ الحقول بعد الإضافة
    _titleController.clear();
    _weightController.clear();
    _priceController.clear();
  }

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
                  'إضافة مزاد خردة جديد',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // عنوان المزاد
              const Text('عنوان المزاد', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                controller: _titleController,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: InputDecoration(
                  hintText: 'مثال: قواطي ألمنيوم مشروبات غازية مكبوسة',
                  hintStyle: TextStyle(color: Colors.grey[500], fontSize: 13),
                  filled: true,
                  fillColor: const Color(0xFF16251E),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),

              // قسم الخردة
              const Text('قسم الخردة', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedCategory,
                    dropdownColor: const Color(0xFF16251E),
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    items: _categories.map((cat) {
                      return DropdownMenuItem(value: cat, child: Text(cat));
                    }).toList(),
                    onChanged: (val) {
                      setState(() {
                        _selectedCategory = val!;
                      });
                    },
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // الوزن التقديري
              const Text('الوزن التقديري (كغم)', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                controller: _weightController,
                keyboardType: TextInputType.number,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: InputDecoration(
                  hintText: 'مثال: 50',
                  hintStyle: TextStyle(color: Colors.grey[500], fontSize: 13),
                  filled: true,
                  fillColor: const Color(0xFF16251E),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),

              // السعر الابتدائي
              const Text('السعر الابتدائي (د.ع / كغم)', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                controller: _priceController,
                keyboardType: TextInputType.number,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: InputDecoration(
                  hintText: 'مثال: 1700',
                  hintStyle: TextStyle(color: Colors.grey[500], fontSize: 13),
                  filled: true,
                  fillColor: const Color(0xFF16251E),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),

              // المحافظة والمنطقة
              const Text('المحافظة والمنطقة', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF16251E),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedCity,
                    dropdownColor: const Color(0xFF16251E),
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    items: _cities.map((city) {
                      return DropdownMenuItem(value: city, child: Text(city));
                    }).toList(),
                    onChanged: (val) {
                      setState(() {
                        _selectedCity = val!;
                      });
                    },
                  ),
                ),
              ),
              const SizedBox(height: 30),

              // زر نشر المزاد
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _submitAuction,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF04AF37),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 0,
                  ),
                  child: const Text('نشر المزاد الآن', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
