import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand Dark Green (#0B3022)
  static const Color primaryDark = Color(0xFF0B3022);

  // Brand Gold Accent (#D4AF37)
  static const Color goldAccent = Color(0xFFD4AF37);

  // Supporting Dark Tones
  static const Color bgDark = Color(0xFF061811);
  static const Color surfaceDark = Color(0xFF0E3828);
  static const Color cardDark = Color(0xFF114230);
  static const Color successGreen = Color(0xFF10B981);

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
      textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.cairo(fontWeight: FontWeight.w900, color: Colors.white),
        displayMedium: GoogleFonts.cairo(fontWeight: FontWeight.w800, color: Colors.white),
        bodyLarge: GoogleFonts.tajawal(fontWeight: FontWeight.w500, color: Colors.white),
        bodyMedium: GoogleFonts.tajawal(fontWeight: FontWeight.w400, color: const Color(0xFFCBD5E1)),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryDark,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }
}
