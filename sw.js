self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installed');
});

self.addEventListener('fetch', (e) => {
  // PWA হিসেবে কাজ করার জন্য এই fetch ইভেন্টটি থাকা জরুরি
});
