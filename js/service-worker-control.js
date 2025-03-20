/**
 * Service Worker Control Script
 * 
 * This script manages service worker registration and cache control.
 * It's designed to help fix navigation issues that might be caused by
 * aggressive caching or service worker behavior.
 */

(function() {
  // Only run on mobile
  const isMobile = window.innerWidth <= 991;
  if (!isMobile) return;
  
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // First, unregister any existing service workers
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        // Only unregister service workers on mobile to avoid affecting desktop
        registration.unregister().then(function() {
          console.log('ServiceWorker unregistered to prevent caching issues');
        });
      }
    });
    
    // Clear caches that might be causing navigation issues
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            // Clear caches related to navigation or page structure
            if (cacheName.includes('navigation') || 
                cacheName.includes('page') || 
                cacheName.includes('route')) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    }
  }
  
  // Add navigation preload to improve performance
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      if (registration.navigationPreload) {
        registration.navigationPreload.enable();
      }
    });
  }
  
  // Helper function to clear session storage navigation data
  function clearNavigationStorage() {
    try {
      // Only clear specific keys related to navigation or routing
      const keysToKeep = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (
            key.includes('route') || 
            key.includes('nav') || 
            key.includes('scroll') || 
            key.includes('position'))) {
          sessionStorage.removeItem(key);
        }
      }
      
      // Also look for specific localStorage items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
            key.includes('route') || 
            key.includes('nav') || 
            key.includes('scroll') || 
            key.includes('last-path'))) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      // Ignore storage access errors
      console.warn('Could not access storage:', e);
    }
  }
  
  // Clear navigation storage on page load
  clearNavigationStorage();
  
  // Set up a listener to clear navigation storage when returning to the page
  window.addEventListener('pageshow', function(event) {
    // If the page is being loaded from the bfcache
    if (event.persisted) {
      clearNavigationStorage();
    }
  });
})(); 