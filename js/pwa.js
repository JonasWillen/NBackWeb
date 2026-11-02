/**
 * PWA — service worker registration and "Install app" prompt handling.
 * The service worker only registers over http(s)/localhost; on file://
 * the game still runs, just without offline caching and installability.
 */
export function initPWA() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  const installBtn = document.getElementById('home-install');
  if (!installBtn) return;

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = '';
  });
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
  });
}
