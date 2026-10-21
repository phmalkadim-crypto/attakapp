import { Category, AppSettings, User } from '../types';

export const IRAQI_GOVERNORATES: Record<string, string[]> = {
  'بغداد': ['الشورجة', 'الكرادة', 'المنصور', 'الأعظمية', 'مدينة الصدر', 'الدورة', 'الكاظمية', 'الشعب', 'البياع', 'حي الجامعة', 'جميلة', 'الزعفرانية'],
  'البصرة': ['المركز', 'الزبير', 'القرنة', 'شط العرب', 'أبي الخصيب', 'الفاو'],
  'النجف': ['المركز', 'الكوفة', 'المناذرة', 'حي الحنانة', 'الحيدرية'],
  'كربلاء': ['المركز', 'الهندية', 'عين التمر', 'حي الحسين'],
  'الديوانية': ['مركز الديوانية', 'عفك', 'الشامية', 'الحمزة', 'حي العروبة'],
  'بابل': ['الحلة', 'المسيب', 'المحاويل', 'الهاشمية', 'القاسم'],
  'ذي قار': ['الناصرية', 'الشطرة', 'الرفاعي', 'سوق الشيوخ'],
  'ميسان': ['العمارة', 'علي الغربي', 'الميمونة', 'المجر الكبير'],
  'واسط': ['الكوت', 'النعمانية', 'الحي', 'الصويرة', 'العزيزية'],
  'المثنى': ['السماوة', 'الرميثة', 'الخضر', 'الوركاء'],
  'أربيل': ['المركز', 'عنكاوا', 'سوران', 'شقلاوة'],
  'السليمانية': ['المركز', 'رانية', 'دوكان', 'كلار'],
  'دهوك': ['المركز', 'زاخو', 'سميل', 'عقرة'],
  'نينوى': ['الموصل', 'تلعفر', 'الحمدانية', 'سنجار'],
  'كركوك': ['المركز', 'الحويجة', 'دبس', 'داقوق'],
  'الأنبار': ['الرمادي', 'الفلوجة', 'هيت', 'القائم'],
  'ديالى': ['بعقوبة', 'المقدادية', 'خانقين', 'الخالص'],
  'صلاح الدين': ['تكريت', 'سامراء', 'بلد', 'الدور', 'بيجي']
};

export const SCRAP_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
  cans: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60',
  copper: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60',
  iron: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60',
  aluminum: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=60',
  batteries: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60',
  other: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60',
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-cans',
    nameAr: 'قواطي مشروبات',
    nameEn: 'Aluminum Cans',
    icon: '🥫',
    slug: 'cans',
    isActive: true,
    minStartPrice: 1400,
    description: 'قواطي بيبسي ومشروبات غازية ألمنيوم مكبوسة بالات أو فلت',
    image: SCRAP_IMAGES.cans
  },
  {
    id: 'cat-copper',
    nameAr: 'نحاس أحمر وأصفر',
    nameEn: 'Copper & Brass',
    icon: '⚡',
    slug: 'copper',
    isActive: true,
    minStartPrice: 10000,
    description: 'كابلات، أسلاك، مواسير تبريد، ومحولات نحاسية مقشرة ونظيفة',
    image: SCRAP_IMAGES.copper
  },
  {
    id: 'cat-iron',
    nameAr: 'حديد وهياكل',
    nameEn: 'Iron & Steel',
    icon: '🏗️',
    slug: 'iron',
    isActive: true,
    minStartPrice: 350,
    description: 'حديد تسليح، بليت، زوايا، سيارات سكراب، وشيلمان ثقيل وخفيف',
    image: SCRAP_IMAGES.iron
  },
  {
    id: 'cat-profiles',
    nameAr: 'ألمنيوم بروفيل',
    nameEn: 'Aluminum Profiles',
    icon: '🪟',
    slug: 'aluminum-profiles',
    isActive: true,
    minStartPrice: 2200,
    description: 'مقاطع شبابيك، أبواب، مطابخ، وشفرات ألمنيوم بدون بلاستيك',
    image: SCRAP_IMAGES.aluminum
  },
  {
    id: 'cat-batteries',
    nameAr: 'بطاريات سكراب',
    nameEn: 'Lead Batteries',
    icon: '🔋',
    slug: 'batteries',
    isActive: true,
    minStartPrice: 850,
    description: 'بطاريات سيارات وشاحنات وطاقة شمسية ثقيلة مستهلكة بالوزن',
    image: SCRAP_IMAGES.batteries
  },
  {
    id: 'cat-other',
    nameAr: 'أخرى',
    nameEn: 'Other Scrap',
    icon: '♻️',
    slug: 'other',
    isActive: true,
    minStartPrice: 200,
    description: 'رصاص، ستيل، زنك، وأجهزة كهربائية سكراب',
    image: SCRAP_IMAGES.other
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  traderCommission: 1000,
  sellerCommission: 1000,
  totalCommission: 2000,
  minDurationHours: 1,
  maxDurationHours: 24,
  zainCashMerchantId: '5ff5588339c0a6470876bb06',
  supportPhone: '07829692579',
  termsAndConditionsAr: 'منصة عَتّاك منصة مزادات تربط البائعين بالتجار. تخضع المعاملات لاتفاق الطرفين على الوزن والفحص النهائي عند الاستلام. عَتّاك ليست طرفاً في قيمة البيع وتستلم العمولة المحددة فقط عند إتمام المزاد لإظهار بيانات التواصل.',
  privacyPolicyAr: 'نلتزم بحماية خصوصية بيانات أرقام الهواتف ومواقع البائعين ولا يتم إظهار رقم البائع إلا للتاجر الفائز بعد تأكيد دفع العمولة بنجاح من خلال بوابة زين كاش الرسمية.'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-seller-1',
    name: 'أبو كرار الديواني',
    phone: '07812345678',
    governorate: 'الديوانية',
    area: 'مركز الديوانية',
    role: 'seller',
    isVerifiedTrader: false,
    rating: 4.9,
    ratingCount: 14,
    totalAuctions: 6,
    totalDeals: 5,
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'usr-trader-1',
    name: 'الحاج جاسم الخفاجي',
    phone: '07709876543',
    governorate: 'بغداد',
    area: 'الشورجة',
    role: 'trader',
    isVerifiedTrader: true,
    rating: 5.0,
    ratingCount: 38,
    totalAuctions: 0,
    totalDeals: 36,
    createdAt: '2026-07-01T12:00:00Z'
  },
  {
    id: 'usr-admin',
    name: 'إدارة عَتّاك المركزية',
    phone: '07829692579',
    governorate: 'بغداد',
    area: 'المنصور',
    role: 'admin',
    isVerifiedTrader: true,
    rating: 5.0,
    ratingCount: 100,
    totalAuctions: 0,
    totalDeals: 0,
    createdAt: '2026-01-01T00:00:00Z'
  }
];
