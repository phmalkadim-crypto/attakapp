import 'package:flutter/material.dart';

class AppTheme {
  // Brand Dark Green (#0B3022)
  static const Color primaryDark = Color(0xFF0B3022);

  // Brand Gold Accent (#D4AF37)
  static const Color goldAccent = Color(0xFFD4AF37);

  // Background light and dark
  static const Color bgLight = Color(0xFFF8FAFC);
  static const Color bgDark = Color(0xFF0F172A);
  static const Color cardLight = Colors.white;
  static const Color cardDark = Color(0xFF1E293B);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: primaryDark,
      scaffoldBackgroundColor: bgLight,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryDark,
        primary: primaryDark,
        secondary: goldAccent,
      ),
      fontFamily: 'Cairo',
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryDark,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }
}
