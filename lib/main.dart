import 'package:flutter/material.dart';
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
      title: 'عَتّاگ | Attak - منصة الخردة العراقية',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'IQ'),
      supportedLocales: const [
        Locale('ar', 'IQ'),
        Locale('ar', ''),
        Locale('en', ''),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: AppTheme.primaryDark,
        scaffoldBackgroundColor: AppTheme.bgDark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppTheme.primaryDark,
          primary: AppTheme.primaryDark,
          secondary: AppTheme.goldAccent,
          brightness: Brightness.dark,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
