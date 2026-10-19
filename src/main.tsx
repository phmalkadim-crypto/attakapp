import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// Register Service Worker for PWA offline capabilities and fast loading
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      // Periodic background sync registration (if supported)
      if ('periodicSync' in reg) {
        const periodicSync = (reg as unknown as { periodicSync?: { register: (tag: string, options: { minInterval: number }) => Promise<void> } }).periodicSync;
        if (periodicSync) {
          periodicSync.register('attak-auctions-sync', {
            minInterval: 12 * 60 * 60 * 1000,
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.warn('PWA service worker registration failed:', err);
    }
  });
}
