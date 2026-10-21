import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const AttakApp());
}

class AttakApp extends StatelessWidget {
  const AttakApp({super.key});

  @override
  Widget build(Widget context) {
    return MaterialApp(
      title: 'عَتّاك | Attak',
      debugShowCheckedModeBanner: false,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ar', 'IQ'),
      ],
      locale: const Locale('ar', 'IQ'),
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: const Color(0xFF04AF37),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF04AF37),
          primary: const Color(0xFF04AF37),
          secondary: const Color(0xFFB30222),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8F9FA),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF04AF37),
          foregroundColor: Colors.white,
          centerTitle: true,
          elevation: 0,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
