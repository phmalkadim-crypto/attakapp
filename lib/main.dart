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
}
