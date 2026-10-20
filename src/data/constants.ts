import { Category, AppSettings, User } from '../types';

import cansImg from '../assets/images/scrap_aluminum_cans_1792278298039.jpg';
import copperImg from '../assets/images/scrap_copper_wire_1792278298829.jpg';
import ironImg from '../assets/images/scrap_iron_steel_1792278298933.jpg';
import aluminumImg from '../assets/images/scrap_aluminum_profiles_1792281776992.jpg';
import batteriesImg from '../assets/images/scrap_car_batteries_1792278299498.jpg';
import mixedMetalImg from '../assets/images/scrap_mixed_metal_1792281776907.jpg';
import heroImg from '../assets/images/hero_scrap_yard_1792278297950.jpg';

export const IRAQI_GOVERNORATES: { [key: string]: string[] } = {
  'الديوانية': ['مركز الديوانية', 'الحمزة', 'الشامية', 'عفك', 'الشافعية', 'السنية', 'الصلاحية', 'غماس'],
  'بغداد': ['الشورجة', 'الكرخ', 'الرصافة', 'الكاظمية', 'المنصور', 'الكرادة', 'مدينة الصدر', 'الدورة', 'الشعب', 'الزعفرانية', 'جميلة'],
  'البصرة': ['الزبير', 'شط العرب', 'العشار', 'الهارثة', 'أبي الخصيب', 'القرنة', 'القبلة'],
  'النجف': ['مركز النجف', 'الكوفة', 'المشخاب', 'الحيدرية', 'المناثرة'],
  'كربلاء': ['مركز كربلاء', 'الهندية', 'عين التمر', 'الحر'],
  'بابل': ['الحلة', 'المسيب', 'المحاويل', 'الهاشمية', 'القاسم'],
  'أربيل': ['المنطقة الصناعية', 'عينكاوة', 'سوران', 'شقلاوة', 'كويسنجق'],
  'السليمانية': ['السليمانية القديمة', 'بكرجو', 'جمجمال', 'رانية'],
  'الموصل (نينوى)': ['الموصل القديمة', 'الزهور', 'تلعفر', 'الحمدانية'],
  'ذي قار': ['الناصرية', 'سوق الشيوخ', 'الشطرة', 'الرفاعي'],
  'ميسان': ['العمارة', 'علي الغربي', 'الميمونة', 'المجر الكبير'],
  'ديالى': ['بعقوبة', 'المقدادية', 'الخالص', 'خانقين'],
  'صلاح الدين': ['تكريت', 'سامراء', 'بلد', 'بيجي'],
  'كركوك': ['مركز كركوك', 'الحويجة', 'دبس', 'داقوق'],
  'الأنبار': ['الرمادي', 'الفلوجة', 'هيت', 'القائم'],
  'المثنى': ['السماوة', 'الرميثة', 'الخضر', 'الوركاء'],
  'واسط': ['الكوت', 'الحي', 'الصويرة', 'النعمانية'],
  'دهوك': ['مركز دهوك', 'زاخو', 'سميل', 'العمادية']
};

export const INITIAL_CATEGORIES: (Category & { image: string })[] = [
  {
    id: 'cat-cans',
    nameAr: 'قواطي',
    nameEn: 'Aluminum Cans',
    icon: '🥫',
    slug: 'cans',
    isActive: true,
    minStartPrice: 1000,
    description: 'قواطي مشروبات غازية مكبوسة ومفرزة خالية من الشوائب',
    image: cansImg
  },
  {
    id: 'cat-copper',
    nameAr: 'نحاس',
    nameEn: 'Copper',
    icon: '🟠',
    slug: 'copper',
    isActive: true,
    minStartPrice: 8000,
    description: 'نحاس أحمر وأصفر، كابلات مقشرة، ومواسير تبريد',
    image: copperImg
  },
  {
    id: 'cat-iron',
    nameAr: 'حديد',
    nameEn: 'Iron & Steel',
    icon: '🔩',
    slug: 'iron',
    isActive: true,
    minStartPrice: 300,
    description: 'حديد تسليح، هياكل وبليت ثقيل، شيلمان وخردة مصانع',
    image: ironImg
  },
  {
    id: 'cat-aluminum',
    nameAr: 'ألمنيوم',
    nameEn: 'Aluminum Profiles',
    icon: '🟡',
    slug: 'aluminum',
    isActive: true,
    minStartPrice: 2000,
    description: 'مقاطع شبابيك، بروفايلات، ومحركات ألمنيوم',
    image: aluminumImg
  },
  {
    id: 'cat-batteries',
    nameAr: 'بطاريات',
    nameEn: 'Scrap Batteries',
    icon: '🔋',
    slug: 'batteries',
    isActive: true,
    minStartPrice: 800,
    description: 'بطاريات سيارات، شاحنات، ومنظومات طاقة شمسية مستهلكة',
    image: batteriesImg
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
    image: mixedMetalImg
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
    id: 'usr-trader-2',
    name: 'سلام الكعبي لتجارة المعادن',
    phone: '07501122334',
    governorate: 'النجف',
    area: 'الكوفة',
    role: 'trader',
    isVerifiedTrader: true,
    rating: 4.8,
    ratingCount: 19,
    totalAuctions: 2,
    totalDeals: 18,
    createdAt: '2026-08-15T14:30:00Z'
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

export const SCRAP_IMAGES = {
  hero: heroImg,
  cans: cansImg,
  copper: copperImg,
  iron: ironImg,
  aluminum: aluminumImg,
  batteries: batteriesImg,
  other: mixedMetalImg,
};
