import 'package:flutter/material.dart';
import 'constants/theme.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const AttakApp());
}

class AttakApp extends StatelessWidget {
  const AttakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عَتّاك | Attak',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const SplashScreen(),
    );
  }
}
