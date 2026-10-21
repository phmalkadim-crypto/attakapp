import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  PlusCircle, 
  Phone, 
  User, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Scale, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Smartphone, 
  Layers, 
  Search, 
  LogOut, 
  CreditCard, 
  Download,
  Copy,
  ChevronRight,
  Send,
  Eye,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface Auction {
  id: string;
  title: string;
  category: string;
  weight: string;
  startPrice: number;
  currentBid: number;
  bidsCount: number;
  governorate: string;
  area: string;
  sellerName: string;
  sellerPhone: string;
  timeLeft: string;
  description: string;
  imageUrl: string;
  status: 'active' | 'ended';
  highestBidder?: string;
}

const INITIAL_AUCTIONS: Auction[] = [
  {
    id: 'auc-1',
    title: 'خردة هياكل حديد ثقيل وجسور إنشائية',
    category: 'حديد',
    weight: '14.5 طن',
    startPrice: 4200000,
    currentBid: 5650000,
    bidsCount: 18,
    governorate: 'بغداد',
    area: 'الزعفرانية - الحي الصناعي',
    sellerName: 'أبو كرار الساعدي',
    sellerPhone: '07701234567',
    timeLeft: '03:45:12',
    description: 'حديد شلمان وجسور بناء ثقيلة مفككة، خالية من الرمل والشوائب، محملة على أرض الموقع وجاهزة للنقل الفوري.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    status: 'active',
    highestBidder: 'شركة الرافدين للتدوير'
  },
  {
    id: 'auc-2',
    title: 'نحاس أحمر نقي (كابلات كهربائية معزولة ومقشرة)',
    category: 'نحاس',
    weight: '850 كغم',
    startPrice: 6500000,
    currentBid: 7850000,
    bidsCount: 24,
    governorate: 'البصرة',
    area: 'ميناء المعقل',
    sellerName: 'حسين الخفاجي',
    sellerPhone: '07809876543',
    timeLeft: '01:15:30',
    description: 'نحاس لمعة درجة أولى من كابلات ضغط عالي، نقاوة تفوق 99%، مفروز ومعبأ بأكياس متينة.',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    status: 'active',
    highestBidder: 'مسبك الجنوب الحديث'
  },
  {
    id: 'auc-3',
    title: 'بطاريات سيارات وشاحنات تالفة (سكراب رصاص)',
    category: 'بطاريات',
    weight: '3.2 طن',
    startPrice: 2100000,
    currentBid: 2750000,
    bidsCount: 9,
    governorate: 'النجف الأشرف',
    area: 'طريق كربلاء - مجمع السكراب',
    sellerName: 'علي البصري',
    sellerPhone: '07715554433',
    timeLeft: '05:22:10',
    description: 'بطاريات سائلة وجافة مفروزة، لم يتم تفريغ الأحماض، صالحة لاستخلاص الرصاص وإعادة التدوير.',
    imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80',
    status: 'active',
    highestBidder: 'معمل دجلة للبطاريات'
  },
  {
    id: 'auc-4',
    title: 'بروفايل وشبابيك ألمنيوم مقطعة',
    category: 'ألمنيوم',
    weight: '1.8 طن',
    startPrice: 3200000,
    currentBid: 3850000,
    bidsCount: 12,
    governorate: 'أربيل',
    area: 'شارع 100 الصناعي',
    sellerName: 'ريبوار كمال',
    sellerPhone: '07503332211',
    timeLeft: '08:10:00',
    description: 'سكراب مقاطع ألمنيوم بيضاء وملونة نظيفة خالية من البراغي والمطاط، نخب أول للصهر.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    status: 'active',
    highestBidder: 'ورشة الهدى للألمنيوم'
  }
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'home' | 'deals' | 'add' | 'support' | 'profile'>('home');
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [userPhone, setUserPhone] = useState('07829692579');
  const [userName, setUserName] = useState('م. القديم (مدير عَتّاك)');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMode, setPreviewMode] = useState<'app' | 'code'>('app');
  const [selectedCodeFile, setSelectedCodeFile] = useState<'pubspec' | 'main' | 'theme' | 'home' | 'workflow'>('pubspec');
  const [copied, setCopied] = useState(false);

  // Auctions & bidding state
  const [auctions, setAuctions] = useState<Auction[]>(INITIAL_AUCTIONS);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bidSuccessMessage, setBidSuccessMessage] = useState('');

  // Deals settlement state (commission: 2,000 IQD split 1000 seller / 1000 buyer)
  const [settledAuctions, setSettledAuctions] = useState<string[]>([]);
  const [payingCommission, setPayingCommission] = useState(false);

  // New auction form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('حديد');
  const [newWeight, setNewWeight] = useState('');
  const [newStartPrice, setNewStartPrice] = useState('');
  const [newGov, setNewGov] = useState('بغداد');
  const [newArea, setNewArea] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Auto-dismiss splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isAdmin = userPhone === '07829692579';

  const categories = ['الكل', 'حديد', 'نحاس', 'ألمنيوم', 'بطاريات', 'بلاستيك', 'مشكل'];

  const filteredAuctions = auctions.filter(a => {
    const matchCat = selectedCategory === 'الكل' || a.category === selectedCategory;
    const matchSearch = a.title.includes(searchQuery) || a.governorate.includes(searchQuery) || a.area.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const handlePlaceBid = (addAmount: number) => {
    if (!selectedAuction) return;
    const newPrice = selectedAuction.currentBid + addAmount;
    const updated = auctions.map(a => {
      if (a.id === selectedAuction.id) {
        return {
          ...a,
          currentBid: newPrice,
          bidsCount: a.bidsCount + 1,
          highestBidder: userName
        };
      }
      return a;
    });
    setAuctions(updated);
    setSelectedAuction(prev => prev ? {
      ...prev,
      currentBid: newPrice,
      bidsCount: prev.bidsCount + 1,
      highestBidder: userName
    } : null);
    setBidSuccessMessage(`تم تسجيل مزايدتك بنجاح بمبلغ ${newPrice.toLocaleString()} د.ع!`);
    setTimeout(() => setBidSuccessMessage(''), 3500);
  };

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newWeight || !newStartPrice) return;
    const price = parseInt(newStartPrice) || 500000;
    const created: Auction = {
      id: `auc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      weight: newWeight,
      startPrice: price,
      currentBid: price,
      bidsCount: 0,
      governorate: newGov,
      area: newArea || 'المنطقة الصناعية',
      sellerName: userName,
      sellerPhone: userPhone,
      timeLeft: '24:00:00',
      description: newDesc || 'شحنة سكراب ممتازة جاهزة للمعاينة والنقل الفوري.',
      imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
      status: 'active'
    };
    setAuctions([created, ...auctions]);
    setNewTitle('');
    setNewWeight('');
    setNewStartPrice('');
    setNewArea('');
    setNewDesc('');
    setActiveTab('home');
  };

  const handlePayCommission = (auctionId: string) => {
    setPayingCommission(true);
    setTimeout(() => {
      setSettledAuctions(prev => [...prev, auctionId]);
      setPayingCommission(false);
    }, 1200);
  };

  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets = {
    pubspec: `name: attak_app
description: منصة عَتّاك | Attak - منصة مزادات وتجارة الخردة في العراق
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  google_fonts: ^6.1.0
  intl: ^0.19.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`,

    main: `import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'constants/theme.dart';
import 'services/app_state.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppState(),
      child: const AttakApp(),
    ),
  );
}

class AttakApp extends StatelessWidget {
  const AttakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عَتّاك | Attak',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ar', 'IQ'),
        Locale('ar', ''),
      ],
      locale: const Locale('ar', 'IQ'),
      home: const SplashScreen(),
    );
  }
}`,

    theme: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Primary Dark Green (#0B3022)
  static const Color primaryDark = Color(0xFF0B3022);
  
  // Gold Accent (#D4AF37)
  static const Color goldAccent = Color(0xFFD4AF37);
  
  // Deep Background
  static const Color bgDark = Color(0xFF061811);
  static const Color surfaceDark = Color(0xFF0E3828);
  static const Color cardDark = Color(0xFF114230);
  
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: primaryDark,
      scaffoldBackgroundColor: bgDark,
      colorScheme: const ColorScheme.dark(
        primary: goldAccent,
        secondary: goldAccent,
        surface: surfaceDark,
      ),
      textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryDark,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }
}`,

    home: `// lib/screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';
import 'auction_details_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('عَتّاك | مزادات الخردة'),
        backgroundColor: AppTheme.primaryDark,
      ),
      body: Column(
        children: [
          // Curved Header & Search Bar
          // Horizontal Category List
          // Live Auctions ListView with Timer & Bid Cards
        ],
      ),
    );
  }
}`,

    workflow: `# .github/workflows/build_apk.yml
name: Build Flutter APK

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.22.x'
          channel: 'stable'
      - run: flutter pub get
      - run: flutter build apk --release
      - uses: actions/upload-artifact@v4
        with:
          name: attak-release-apk
          path: build/app/outputs/flutter-apk/app-release.apk`
  };

  return (
    <div className="min-h-screen bg-[#061811] text-white flex flex-col font-sans">
      {/* Top Universal Bar */}
      <header className="bg-[#0B3022] border-b border-[#D4AF37]/20 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8F741E] flex items-center justify-center font-cairo font-black text-[#0B3022] text-xl shadow-lg shadow-[#D4AF37]/20">
            ع
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cairo font-black text-xl text-white tracking-wide">عَتّاك</span>
              <span className="text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 px-2 py-0.5 rounded-full bg-[#D4AF37]/10">
                Flutter (Dart)
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">منصة مزادات وتجارة الخردة والسكراب في العراق</p>
          </div>
        </div>

        {/* View Switcher: Interactive App Preview vs Flutter Source Code */}
        <div className="flex items-center gap-2 bg-[#061811]/70 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setPreviewMode('app')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-cairo font-bold transition-all ${
              previewMode === 'app'
                ? 'bg-[#D4AF37] text-[#0B3022] shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            المعاينة الحية للتطبيق
          </button>
          <button
            onClick={() => setPreviewMode('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-cairo font-bold transition-all ${
              previewMode === 'code'
                ? 'bg-[#D4AF37] text-[#0B3022] shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            أكواد فلاتر (pubspec & lib)
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {previewMode === 'code' ? (
          /* Flutter Code Explorer View */
          <div className="w-full max-w-5xl bg-[#0B3022]/40 border border-[#D4AF37]/20 rounded-2xl p-4 md:p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-cairo font-bold text-lg text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                  هيكلية مشروع Flutter الموجودة في جذر المستودع (Root)
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  المشروع يحتوي على <code className="text-[#D4AF37] bg-black/40 px-1 py-0.5 rounded">pubspec.yaml</code> ومجلد <code className="text-[#D4AF37] bg-black/40 px-1 py-0.5 rounded">lib/</code> بجميع الشاشات ونماذج الألوان <span className="text-[#D4AF37]">#0B3022</span> و <span className="text-[#D4AF37]">#D4AF37</span>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyCode(codeSnippets[selectedCodeFile])}
                  className="flex items-center gap-1.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#D4AF37]/30 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'تم النسخ!' : 'نسخ الكود'}
                </button>
              </div>
            </div>

            {/* Code Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'pubspec', label: 'pubspec.yaml', icon: FileText },
                { id: 'main', label: 'lib/main.dart', icon: Code2 },
                { id: 'theme', label: 'lib/constants/theme.dart', icon: Layers },
                { id: 'home', label: 'lib/screens/home_screen.dart', icon: Smartphone },
                { id: 'workflow', label: '.github/workflows/build_apk.yml', icon: Download },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCodeFile(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-cairo font-semibold transition-all ${
                      selectedCodeFile === tab.id
                        ? 'bg-[#0B3022] text-[#D4AF37] border border-[#D4AF37]/50 shadow'
                        : 'bg-black/30 text-gray-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Code Content Display */}
            <div className="relative bg-[#040E0A] rounded-xl border border-white/10 p-4 overflow-x-auto text-left font-mono text-xs sm:text-sm text-green-300 max-h-[500px]">
              <pre>{codeSnippets[selectedCodeFile]}</pre>
            </div>

            {/* Build APK Instructions Card */}
            <div className="bg-[#0B3022]/80 border border-[#D4AF37]/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-cairo font-bold text-white text-sm">بناء ملف APK للأندرويد آلياً</h4>
                  <p className="text-xs text-gray-300">
                    ملف <code className="text-[#D4AF37]">build_apk.yml</code> مضاف وجاهز. عند رفع المشروع إلى مستودعك، سيبدأ البناء تلقائياً في GitHub Actions لتنزيل ملف <code className="text-[#D4AF37]">app-release.apk</code>.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewMode('app')}
                className="whitespace-nowrap bg-[#D4AF37] text-[#0B3022] px-4 py-2 rounded-xl font-cairo font-bold text-xs hover:bg-[#bfa02f] transition-all"
              >
                تجربة المعاينة التفاعلية الآن &larr;
              </button>
            </div>
          </div>
        ) : (
          /* Mobile Device Simulation Frame */
          <div className="w-full max-w-[420px] bg-[#061811] rounded-[40px] border-4 border-[#0B3022] shadow-2xl shadow-black/80 overflow-hidden flex flex-col h-[780px] relative ring-1 ring-[#D4AF37]/30">
            {/* Phone Speaker & Camera Notch */}
            <div className="bg-[#061811] h-6 w-full flex items-center justify-center relative z-40 border-b border-white/5">
              <div className="w-20 h-3 bg-black rounded-full flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
                <div className="w-8 h-1 rounded-full bg-neutral-800" />
              </div>
            </div>

            {/* Phone Screen Viewport */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {/* 2-Second Splash Screen Simulation */}
              {showSplash ? (
                <div className="absolute inset-0 z-50 bg-[#0B3022] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#997C22] flex items-center justify-center text-[#0B3022] font-cairo font-black text-5xl shadow-2xl shadow-[#D4AF37]/40 mb-6">
                    ع
                  </div>
                  <h1 className="font-cairo font-black text-3xl text-white tracking-wider mb-2">عَتّاك</h1>
                  <p className="text-[#D4AF37] font-medium text-sm">منصة مزادات وتجارة الخردة في العراق</p>
                  
                  <div className="mt-8 flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                    <span>جاري تحميل أحدث المزادات العراقية...</span>
                  </div>

                  <button
                    onClick={() => setShowSplash(false)}
                    className="mt-6 text-xs text-[#D4AF37] underline hover:text-white"
                  >
                    تخطي الشاشة والبدء فوراً
                  </button>
                </div>
              ) : null}

              {/* In-App Screen Content */}
              {selectedAuction ? (
                /* Auction Details Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto">
                  <div className="relative h-56 bg-black">
                    <img 
                      src={selectedAuction.imageUrl} 
                      alt={selectedAuction.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061811] via-transparent to-black/60" />
                    
                    <button
                      onClick={() => setSelectedAuction(null)}
                      className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/80"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                      <span className="bg-[#D4AF37] text-[#0B3022] font-cairo font-black text-xs px-3 py-1 rounded-full shadow">
                        {selectedAuction.category}
                      </span>
                      <div className="flex items-center gap-1 bg-[#0B3022]/90 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>متبقي: {selectedAuction.timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-4">
                    <div>
                      <h2 className="font-cairo font-black text-lg text-white leading-tight">
                        {selectedAuction.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{selectedAuction.governorate} - {selectedAuction.area}</span>
                      </div>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-[#0B3022]/40 border border-[#D4AF37]/20 p-3 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#D4AF37]" />
                        <div>
                          <p className="text-gray-400">الوزن التقديري</p>
                          <p className="font-bold text-white">{selectedAuction.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                        <div>
                          <p className="text-gray-400">سعر البدء</p>
                          <p className="font-bold text-white">{selectedAuction.startPrice.toLocaleString()} د.ع</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Bid Box */}
                    <div className="bg-gradient-to-r from-[#0B3022] to-[#114230] border border-[#D4AF37]/50 rounded-2xl p-4 text-center">
                      <p className="text-xs text-[#D4AF37] font-semibold">أعلى مزايدة حالية ({selectedAuction.bidsCount} مزايدات)</p>
                      <h3 className="font-cairo font-black text-2xl text-white mt-1 text-[#D4AF37]">
                        {selectedAuction.currentBid.toLocaleString()} <span className="text-xs text-white">دينار عراقي</span>
                      </h3>
                      {selectedAuction.highestBidder && (
                        <p className="text-xs text-gray-300 mt-1">المتصدر: {selectedAuction.highestBidder}</p>
                      )}
                    </div>

                    {/* Bid Action Form */}
                    <div className="bg-[#0E3828] p-3 rounded-2xl border border-white/10 flex flex-col gap-2">
                      <p className="text-xs font-bold text-white text-center">رفع المزايدة الفورية بمقدار:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handlePlaceBid(25000)}
                          className="bg-[#0B3022] hover:bg-[#D4AF37] hover:text-[#0B3022] border border-[#D4AF37]/40 text-[#D4AF37] font-cairo font-bold text-xs py-2 rounded-xl transition-all"
                        >
                          + 25,000 د.ع
                        </button>
                        <button
                          onClick={() => handlePlaceBid(50000)}
                          className="bg-[#0B3022] hover:bg-[#D4AF37] hover:text-[#0B3022] border border-[#D4AF37]/40 text-[#D4AF37] font-cairo font-bold text-xs py-2 rounded-xl transition-all"
                        >
                          + 50,000 د.ع
                        </button>
                        <button
                          onClick={() => handlePlaceBid(100000)}
                          className="bg-[#D4AF37] text-[#0B3022] font-cairo font-bold text-xs py-2 rounded-xl hover:bg-[#c4a132] transition-all"
                        >
                          + 100,000 د.ع
                        </button>
                      </div>

                      {bidSuccessMessage && (
                        <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-xs text-center font-bold">
                          {bidSuccessMessage}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-cairo font-bold text-sm text-white mb-1">تفاصيل الشحنة والموقع:</h4>
                      <p className="text-xs text-gray-300 leading-relaxed bg-[#0B3022]/30 p-3 rounded-xl border border-white/5">
                        {selectedAuction.description}
                      </p>
                    </div>

                    {/* Seller Information & Commission Policy */}
                    <div className="bg-[#0B3022]/50 border border-yellow-500/30 p-3 rounded-xl text-xs text-gray-300 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white">نظام حماية وسرية العَتّاك:</span>
                        <p className="mt-0.5">
                          يتم حجب رقم هاتف البائع حتى انتهاء المزاد لتفادي التلاعب. بعد الفوز، تُسدد عمولة المنصة الرمزية (2,000 د.ع مقسومة مناصفة 1,000 د.ع) عبر زين كاش ليظهر الرقم والموقع الجغرافي فوراً.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'home' ? (
                /* Home Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto">
                  {/* Curved Primary Dark Green Header */}
                  <div className="bg-[#0B3022] px-4 pt-3 pb-5 rounded-b-[28px] border-b border-[#D4AF37]/30 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center font-cairo font-black text-[#0B3022] text-sm">
                          ع
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-300">أهلاً بك في العراق</p>
                          <h2 className="font-cairo font-bold text-sm text-white">{userName}</h2>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#061811]/60 px-2.5 py-1 rounded-full border border-[#D4AF37]/30 text-xs text-[#D4AF37]">
                        <Gavel className="w-3.5 h-3.5" />
                        <span>مزادات نشطة: {auctions.length}</span>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="ابحث عن حديد، نحاس، بطاريات، المحافظة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#061811] text-xs text-white placeholder-gray-400 pl-3 pr-9 py-2.5 rounded-xl border border-white/10 focus:border-[#D4AF37] outline-none"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  {/* Horizontal Category Selector */}
                  <div className="px-3 py-3 overflow-x-auto flex gap-2 no-scrollbar">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-cairo font-bold transition-all ${
                          selectedCategory === cat
                            ? 'bg-[#D4AF37] text-[#0B3022] shadow-md shadow-[#D4AF37]/20 font-black'
                            : 'bg-[#0B3022]/60 text-gray-300 border border-white/5 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Auction Cards List */}
                  <div className="p-3 flex flex-col gap-3">
                    {filteredAuctions.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 text-xs">
                        لا توجد مزادات مطابقة للتصفية الحالية.
                      </div>
                    ) : (
                      filteredAuctions.map(item => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedAuction(item)}
                          className="bg-[#0B3022]/50 hover:bg-[#0B3022]/80 border border-[#D4AF37]/20 rounded-2xl p-3 flex flex-col gap-2.5 cursor-pointer transition-all hover:scale-[1.01] shadow-md"
                        >
                          <div className="flex gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {item.category}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                                  {item.timeLeft}
                                </span>
                              </div>
                              <h3 className="font-cairo font-bold text-xs text-white truncate mt-1">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                                {item.governorate} - {item.area}
                              </p>
                              <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                                <Scale className="w-3 h-3 text-[#D4AF37]" />
                                وزن: {item.weight}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/5 pt-2">
                            <div>
                              <p className="text-[10px] text-gray-400">أعلى مزايدة ({item.bidsCount})</p>
                              <p className="font-cairo font-black text-sm text-[#D4AF37]">
                                {item.currentBid.toLocaleString()} د.ع
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAuction(item);
                              }}
                              className="bg-[#0E3828] hover:bg-[#D4AF37] hover:text-[#0B3022] border border-[#D4AF37]/40 text-[#D4AF37] font-cairo font-bold text-xs px-3 py-1.5 rounded-xl transition-all"
                            >
                              مزايدة الآن &larr;
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : activeTab === 'deals' ? (
                /* Deals & Commission Settlement Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto p-4">
                  <div className="bg-[#0B3022] p-4 rounded-2xl border border-[#D4AF37]/30 mb-4">
                    <h2 className="font-cairo font-bold text-sm text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      صفقاتي والعمولة الرسمية (زين كاش)
                    </h2>
                    <p className="text-xs text-gray-300 mt-1">
                      عمولة المنصة الرمزية <strong className="text-[#D4AF37]">2,000 دينار فقط</strong> مقسمة بالتساوي (1,000 على البائع و 1,000 على المشتري). بعد التسديد يتم كشف الهاتف والموقع فوراً.
                    </p>
                  </div>

                  <h3 className="font-cairo font-bold text-xs text-gray-400 mb-2">المزادات المنتهية بانتظار إتمام الصفقة:</h3>

                  {auctions.slice(0, 2).map((item) => {
                    const isSettled = settledAuctions.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        className="bg-[#0B3022]/40 border border-[#D4AF37]/20 rounded-2xl p-4 mb-3 flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-cairo font-bold text-xs text-white">{item.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isSettled ? 'bg-green-500/20 text-green-300 border border-green-500/40' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                          }`}>
                            {isSettled ? 'تم تسديد العمولة' : 'بانتظار تسديد 1,000 د.ع'}
                          </span>
                        </div>

                        <div className="text-xs text-gray-300 flex justify-between bg-black/30 p-2 rounded-lg">
                          <span>سعر الترسية النهائي:</span>
                          <span className="font-bold text-[#D4AF37]">{item.currentBid.toLocaleString()} د.ع</span>
                        </div>

                        {isSettled ? (
                          <div className="bg-green-950/40 border border-green-500/30 p-3 rounded-xl flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>بيانات البائع متاحة بالكامل:</span>
                            </div>
                            <div className="text-xs text-white flex items-center justify-between">
                              <span>اسم البائع: {item.sellerName}</span>
                              <a 
                                href={`tel:${item.sellerPhone}`}
                                className="bg-[#D4AF37] text-[#0B3022] font-cairo font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {item.sellerPhone}
                              </a>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handlePayCommission(item.id)}
                            disabled={payingCommission}
                            className="bg-gradient-to-r from-[#D4AF37] to-[#b39129] text-[#0B3022] font-cairo font-black text-xs py-2 rounded-xl flex items-center justify-center gap-2 shadow hover:opacity-95 disabled:opacity-50"
                          >
                            <CreditCard className="w-4 h-4" />
                            {payingCommission ? 'جاري التحقق عبر زين كاش...' : 'تسديد عمولة المشتري (1,000 د.ع) عبر زين كاش'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : activeTab === 'add' ? (
                /* Add Auction Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto p-4">
                  <div className="bg-[#0B3022] p-3 rounded-2xl border border-[#D4AF37]/30 mb-3">
                    <h2 className="font-cairo font-bold text-sm text-white flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                      إضافة مزاد خردة جديد
                    </h2>
                    <p className="text-[11px] text-gray-300">اعرض شحنة السكراب لتصل لآلاف التجار في كل محافظات العراق.</p>
                  </div>

                  <form onSubmit={handleCreateAuction} className="flex flex-col gap-3 text-xs">
                    <div>
                      <label className="text-gray-300 font-bold block mb-1">عنوان المزاد (نوع المادة):</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: خردة ألمنيوم مقطعة أو شلمان حديد"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-300 font-bold block mb-1">القسم / التصنيف:</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                        >
                          {categories.filter(c => c !== 'الكل').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-300 font-bold block mb-1">الوزن التقديري:</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: 5 طن أو 800 كغم"
                          value={newWeight}
                          onChange={(e) => setNewWeight(e.target.value)}
                          className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-300 font-bold block mb-1">سعر البدء (د.ع):</label>
                        <input
                          type="number"
                          required
                          placeholder="مثال: 1500000"
                          value={newStartPrice}
                          onChange={(e) => setNewStartPrice(e.target.value)}
                          className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="text-gray-300 font-bold block mb-1">المحافظة:</label>
                        <select
                          value={newGov}
                          onChange={(e) => setNewGov(e.target.value)}
                          className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                        >
                          {['بغداد', 'البصرة', 'النجف', 'كربلاء', 'أربيل', 'الموصل', 'بابل', 'ذي قار', 'كركوك', 'ديالى'].map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 font-bold block mb-1">المنطقة أو الحي الصناعي:</label>
                      <input
                        type="text"
                        placeholder="مثال: صناعية الطالبية / الزعفرانية"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-bold block mb-1">وصف الشحنة وحالتها:</label>
                      <textarea
                        rows={3}
                        placeholder="أدخل تفاصيل النقاوة، إمكانية المعاينة، وسيلة التحميل..."
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="w-full bg-[#0E3828] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 bg-[#D4AF37] hover:bg-[#bfa02f] text-[#0B3022] font-cairo font-black py-3 rounded-xl transition-all shadow-lg"
                    >
                      نشر المزاد الآن في منصة عَتّاك
                    </button>
                  </form>
                </div>
              ) : activeTab === 'support' ? (
                /* Support & Commission Policy Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto p-4">
                  <div className="bg-[#0B3022] p-4 rounded-2xl border border-[#D4AF37]/30 mb-4">
                    <h2 className="font-cairo font-bold text-sm text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                      مركز الدعم ونظام العمولة المعتمد
                    </h2>
                    <p className="text-xs text-gray-300 mt-1">
                      منصة عَتّاك تضمن حقوق التجار العراقيين ونزاهة المزايدة بأبسط تكلفة.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 text-xs">
                    <div className="bg-[#0B3022]/40 border border-[#D4AF37]/20 p-3 rounded-xl">
                      <h4 className="font-cairo font-bold text-[#D4AF37] mb-1">قاعدة العمولة الثابتة:</h4>
                      <p className="text-gray-300 leading-relaxed">
                        العمولة الإجمالية لكل صفقة ناجحة هي <strong className="text-white">2,000 دينار عراقي فقط</strong>:
                      </p>
                      <ul className="list-disc list-inside mt-1 text-gray-300 space-y-0.5">
                        <li>1,000 دينار عراقي يتحملها البائع.</li>
                        <li>1,000 دينار عراقي يتحملها المشتري الفائز.</li>
                        <li>يتم الدفع إلكترونياً وبأمان عبر محفظة <strong className="text-[#D4AF37]">زين كاش</strong>.</li>
                      </ul>
                    </div>

                    <div className="bg-[#0B3022]/40 border border-[#D4AF37]/20 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-cairo font-bold text-white mb-0.5">هاتف الإدارة والدعم الميداني:</h4>
                        <p className="text-[#D4AF37] font-bold">07829692579</p>
                      </div>
                      <a
                        href="tel:07829692579"
                        className="bg-[#D4AF37] text-[#0B3022] font-cairo font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        اتصال
                      </a>
                    </div>

                    <div className="bg-[#0B3022]/40 border border-[#D4AF37]/20 p-3 rounded-xl">
                      <h4 className="font-cairo font-bold text-[#D4AF37] mb-1">إجراءات المزايدة والمصداقية:</h4>
                      <p className="text-gray-300 leading-relaxed">
                        كل مزايدة مسجلة تعد التزاماً حقيقياً بالشراء. أي تاجر يتخلف عن إتمام الصفقة بعد انتهاء المزاد يتم تعليق حسابه وحظر رقمه في قاعدة بيانات عَتّاك.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Profile Screen */
                <div className="flex-1 flex flex-col bg-[#061811] overflow-y-auto p-4">
                  <div className="bg-[#0B3022] p-4 rounded-2xl border border-[#D4AF37]/30 text-center flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#0B3022] flex items-center justify-center font-cairo font-black text-2xl shadow-lg mb-2">
                      م
                    </div>
                    <h2 className="font-cairo font-bold text-base text-white">{userName}</h2>
                    <p className="text-xs text-[#D4AF37] font-semibold">{userPhone}</p>
                    
                    {isAdmin && (
                      <span className="mt-2 bg-[#D4AF37] text-[#0B3022] text-[10px] font-black px-3 py-0.5 rounded-full shadow">
                        مدير نظام عَتّاك (Admin Privileges)
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="bg-[#0E3828] border border-[#D4AF37]/40 rounded-2xl p-4 mb-4">
                      <h3 className="font-cairo font-bold text-xs text-[#D4AF37] mb-2 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" />
                        لوحة تحكم إدارة عَتّاك
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="bg-black/30 p-2 rounded-xl">
                          <p className="text-gray-400">إجمالي المزادات</p>
                          <p className="font-bold text-white mt-0.5">{auctions.length}</p>
                        </div>
                        <div className="bg-black/30 p-2 rounded-xl">
                          <p className="text-gray-400">عمولات محصلة</p>
                          <p className="font-bold text-[#D4AF37] mt-0.5">
                            {(settledAuctions.length * 2000).toLocaleString()} د.ع
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#0B3022]/40 rounded-2xl border border-white/5 divide-y divide-white/5 text-xs text-gray-300">
                    <div className="p-3 flex items-center justify-between">
                      <span>حالة الحساب</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        موثق بهوية تجارية
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span>محفظة زين كاش المرتبطة</span>
                      <span className="text-white font-bold">{userPhone}</span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span>لغة التطبيق</span>
                      <span className="text-white font-bold">العربية (العراق)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Bar with 5 items + center Add button */}
              <nav className="bg-[#0B3022] border-t border-[#D4AF37]/30 px-2 py-2 flex items-center justify-around relative z-30">
                <button
                  onClick={() => { setSelectedAuction(null); setActiveTab('home'); }}
                  className={`flex flex-col items-center gap-1 text-[10px] font-cairo transition-all ${
                    activeTab === 'home' && !selectedAuction ? 'text-[#D4AF37] font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Gavel className="w-4 h-4" />
                  <span>الرئيسية</span>
                </button>

                <button
                  onClick={() => { setSelectedAuction(null); setActiveTab('deals'); }}
                  className={`flex flex-col items-center gap-1 text-[10px] font-cairo transition-all ${
                    activeTab === 'deals' ? 'text-[#D4AF37] font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>صفقاتي</span>
                </button>

                {/* Central Floating Plus Button */}
                <button
                  onClick={() => { setSelectedAuction(null); setActiveTab('add'); }}
                  className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8a7226] text-[#0B3022] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:scale-105 active:scale-95 transition-all border-2 border-[#0B3022]"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>

                <button
                  onClick={() => { setSelectedAuction(null); setActiveTab('support'); }}
                  className={`flex flex-col items-center gap-1 text-[10px] font-cairo transition-all ${
                    activeTab === 'support' ? 'text-[#D4AF37] font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>العمولة</span>
                </button>

                <button
                  onClick={() => { setSelectedAuction(null); setActiveTab('profile'); }}
                  className={`flex flex-col items-center gap-1 text-[10px] font-cairo transition-all ${
                    activeTab === 'profile' ? 'text-[#D4AF37] font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>حسابي</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
