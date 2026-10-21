# ♻️ تطبيق عَتّاك | Attak - مشروع Flutter الأصلي

مشروع **Flutter (Dart)** رسمي وأصيل لمنصة مزادات وتجارة الخردة في العراق «عَتّاك | Attak».

---

## 🎨 الهوية البصرية الرسمية
- **اللون الأساسي الداكن:** `#0B3022`
- **اللون الذهبي للأزرار والتفاصيل:** `#D4AF37`
- **الخلفية العميقة:** `#061811`
- **الخطوط المعتمدة:** `Cairo` و `Tajawal`

---

## 📁 هيكلية ملفات المشروع (Project Structure)
```
flutter_app/
├── lib/
│   ├── main.dart                      # المدخل الرئيسي للتطبيق وضبط اللغة والاتجاه RTL
│   ├── constants/
│   │   └── theme.dart                 # درجات الألوان #0B3022 و #D4AF37 والخطوط
│   ├── models/
│   │   └── models.dart                # نماذج البيانات (المزادات، المزايدات، المستخدمين، الأقسام)
│   ├── services/
│   │   └── app_state.dart             # إدارة الحالة الحية والعمليات والتعرف على هاتف الأدمن
│   └── screens/
│       ├── splash_screen.dart         # شاشة البدء الترحيبية (مدتها ثانيتان)
│       ├── auth_screen.dart           # شاشة الدخول والتسجيل والتبديل السلس
│       ├── main_navigation_screen.dart# الشريط السفلي الثابت (5 أقسام + زر الإضافة الدائري)
│       ├── home_screen.dart           # الرئيسية: الهيدر المقوس، الأقسام، وبطاقات المزادات المباشرة
│       ├── auction_details_screen.dart# تفاصيل المزاد ونافذة المزايدة الفورية
│       ├── add_auction_screen.dart    # نموذج إضافة شحنة خردة جديدة مع الوزن والأسعار
│       ├── deals_screen.dart          # صفقاتي وتسديد عمولة زين كاش (2,000 د.ع) وكشف هاتف البائع
│       ├── support_screen.dart        # مركز الدعم وهاتف الإدارة والأسئلة الشائعة
│       ├── notifications_screen.dart  # مركز التنبيهات والمزايدات
│       └── profile_screen.dart        # الملف الشخصي وتوثيق التاجر ورتبة المدير
├── pubspec.yaml                       # الحزم والمكتبات المعتمدة
└── .github/workflows/build_apk.yml    # سير العمل الآلي لتوليد ملف APK على GitHub Actions
```

---

## 🚀 كيفية رفع المشروع إلى GitHub وتوليد ملف APK تلقائياً

1. تأكد من عمل Commit لكافة الملفات:
```bash
git add .
git commit -m "Add full Flutter native project for Attak with APK workflow"
git push origin main
```

2. افتح مستودعك على **GitHub**:
3. اذهب إلى تبويب **Actions**.
4. ستجد سير العمل **Build Flutter APK** يعمل تلقائياً.
5. بمجرد اكتماله (خلال 3-4 دقائق)، ستجد ملف **`attak-release-apk`** متاحاً للتحميل المباشر بصيغة **APK** جاهزة للتثبيت على هواتف الأندرويد!
