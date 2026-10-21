# ♻️ تطبيق عَتّاك | Attak - مشروع Flutter (Dart) الأصلي

مشروع **Flutter (Dart)** رسمي وأصيل وخالص لمنصة مزادات وتجارة الخردة والسكراب في العراق «عَتّاك | Attak».

---

## 🎨 الهوية البصرية المعتمدة
* **اللون الأساسي الداكن:** `#0B3022`
* **اللون الذهبي:** `#D4AF37`
* **الخلفية الداكنة العميقة:** `#061811`
* **الخطوط المعتمدة:** `Cairo` للعناوين والأزرار، و `Tajawal` للنصوص والشروحات.

---

## 📁 هيكلية ملفات المشروع في الجذر (Root Project Structure)
```
├── pubspec.yaml                       # ملف إعدادات وحزم Flutter الرسمية
├── README.md                          # دليل المشروع الكامل
├── .github/
│   └── workflows/
│       └── build_apk.yml              # سير العمل الآلي لبناء ملف الـ APK عبر GitHub Actions
├── android/
│   ├── app/
│   │   ├── build.gradle               # إعدادات التطبيق ومعرف الحزمة com.attak.app
│   │   └── src/main/AndroidManifest.xml # الأذونات واسم التطبيق وأيقونته
│   ├── build.gradle
│   └── settings.gradle
└── lib/
    ├── main.dart                      # المدخل الرئيسي للتطبيق وضبط اللغة والاتجاه RTL
    ├── constants/
    │   └── theme.dart                 # درجات الألوان #0B3022 و #D4AF37 والخطوط
    ├── models/
    │   └── models.dart                # نماذج المزادات، المزايدات، المستخدمين، والإشعارات
    ├── services/
    │   └── app_state.dart             # إدارة الحالة الحية والتعرف التلقائي على هاتف الأدمن 07829692579
    └── screens/
        ├── splash_screen.dart         # شاشة البدء الترحيبية (مدتها 2000ms بالضبط ثم انتقال تلقائي)
        ├── auth_screen.dart           # شاشة الدخول والتسجيل والتبديل السلس
        ├── main_navigation_screen.dart# الشريط السفلي الثابت (5 أقسام + زر الإضافة الدائري)
        ├── home_screen.dart           # الرئيسية: الهيدر المقوس، الأقسام، وبطاقات المزادات المباشرة
        ├── auction_details_screen.dart# تفاصيل المزاد ونافذة المزايدة الفورية
        ├── add_auction_screen.dart    # نموذج إضافة شحنة خردة جديدة مع الوزن والأسعار
        ├── deals_screen.dart          # صفقاتي وتسديد عمولة زين كاش (2,000 د.ع) وكشف هاتف البائع
        ├── support_screen.dart        # مركز الدعم وهاتف الإدارة والأسئلة الشائعة
        ├── notifications_screen.dart  # مركز التنبيهات والمزايدات
        └── profile_screen.dart        # الملف الشخصي وتوثيق التاجر ورتبة المدير
```

---

## 🚀 كيفية بناء ملف APK لتثبيته على الأجهزة:

### الطريقة الأولى: التوليد الآلي الفوري عبر GitHub Actions
1. ارفع المشروع إلى مستودعك على GitHub:
```bash
git add .
git commit -m "Initialize pure Flutter Attak repository"
git push origin main
```
2. ادخل إلى تبويب **Actions** في مستودعك على GitHub.
3. ستجد سير العمل **Build Flutter APK** يعمل تلقائياً ويقوم بتثبيت حزم Flutter وبناء التطبيق.
4. بمجرد انتهاء البناء، يمكنك تحميل ملف **`attak-release-apk`** بصيغة **APK** مباشرة وتثبيته على أي هاتف Android.

### الطريقة الثانية: البناء محلياً على جهازك
إذا كان لديك Flutter مثبت محلياً:
```bash
flutter pub get
flutter build apk --release
```
ستجد الملف الناتج في المسار:
`build/app/outputs/flutter-apk/app-release.apk`
