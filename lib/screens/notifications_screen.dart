import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../services/app_state.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final notifs = appState.notifications;
    final timeFormat = DateFormat('hh:mm a');

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: AppTheme.bgDark,
        appBar: AppBar(
          title: const Text('الإشعارات والتنبيهات 🔔', style: TextStyle(fontFamily: 'Cairo', fontSize: 16)),
          backgroundColor: AppTheme.primaryDark,
        ),
        body: notifs.isEmpty
            ? const Center(
                child: Text('لا توجد إشعارات جديدة حالياً', style: TextStyle(fontFamily: 'Tajawal', color: Colors.white60)),
              )
            : ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: notifs.length,
                itemBuilder: (context, index) {
                  final n = notifs[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppTheme.cardDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: AppTheme.goldAccent.withOpacity(0.15),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.notifications_active_outlined, color: AppTheme.goldAccent, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(n.title, style: const TextStyle(fontFamily: 'Cairo', fontSize: 13, fontWeight: FontWeight.bold)),
                                  Text(timeFormat.format(n.timestamp), style: const TextStyle(fontSize: 10, color: Colors.white38)),
                                ],
                              ),
                              const SizedBox(height: 4),
                              Text(n.message, style: const TextStyle(fontFamily: 'Tajawal', fontSize: 12, color: Colors.white70, height: 1.4)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
      ),
    );
  }
}
