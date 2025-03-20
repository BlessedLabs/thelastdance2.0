/**
 * This script prevents the React Image Generator app from automatically
 * redirecting users to the Image Generator section on mobile devices.
 * It's designed to intercept the React initialization and ensure it 
 * doesn't hijack the default navigation behavior.
 */

(function() {
  // Function to force scroll to top
  function forceScrollToTop() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  // Run immediately to prevent any auto-scrolling
  forceScrollToTop();
  
  // Always reset to top on page refresh (highest priority)
  if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
    // Remove any hash from URL on refresh
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    forceScrollToTop();
  }
  
  // Only additional mobile-specific fixes below
  const isMobile = window.innerWidth <= 991;
  if (!isMobile) return;

  // Function to initialize our fix when the page is ready
  function initMobileNavFix() {
    // First, ensure we're on the homepage initially unless explicitly
    // navigating to the image generator
    if (!window.location.hash || 
        (window.location.hash !== '#ImageGenerator' && 
         window.location.hash.indexOf('ImageGenerator') === -1)) {
      // Force to top without hash on initial load
      history.replaceState(null, null, window.location.pathname + window.location.search);
      forceScrollToTop();
    }

    // Block default scroll restoration
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // Set up a MutationObserver to watch for changes to the root element
    // This will help us detect when React is trying to mount
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const observer = new MutationObserver(function(mutations) {
        // When React has mounted components, check if we need to
        // prevent automatic scrolling to the ImageGenerator section
        if (mutations.some(m => m.addedNodes.length > 0) && 
            window.location.hash !== '#ImageGenerator') {
          // Force scroll to top if we're not at Image Generator
          forceScrollToTop();
        }
      });
      
      // Start observing
      observer.observe(rootElement, { 
        childList: true,
        subtree: true 
      });
    }
    
    // Fix the ImageGenerator navigation to prevent jumps
    const imageGenLinks = document.querySelectorAll('a[href="#ImageGenerator"]');
    imageGenLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default hash behavior
        
        // Scroll to the ImageGenerator section smoothly
        const imageGenSection = document.getElementById('ImageGenerator');
        if (imageGenSection) {
          imageGenSection.scrollIntoView({ behavior: 'smooth' });
          // Update the hash after scrolling
          setTimeout(() => {
            history.pushState(null, null, '#ImageGenerator');
          }, 500);
        }
      });
    });
    
    // Handle all navigation links to prevent the React app from hijacking them
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
      if (!link.getAttribute('href').includes('ImageGenerator')) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Update the hash after scrolling
            setTimeout(() => {
              history.pushState(null, null, '#' + targetId);
            }, 500);
          }
        });
      }
    });
    
    // Prevent React from taking over navigation 
    window.addEventListener('hashchange', function(e) {
      // If changing to non-ImageGenerator hash, ensure we don't get redirected
      if (window.location.hash && window.location.hash !== '#ImageGenerator') {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (!window.location.hash) {
        // If no hash, go to top
        forceScrollToTop();
      }
    });
  }
  
  // Initialize our fix when the DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initMobileNavFix();
  } else {
    document.addEventListener('DOMContentLoaded', initMobileNavFix);
  }
  
  // Also run on full page load to be extra safe
  window.addEventListener('load', initMobileNavFix);
  
  // Final attempt to keep at top on refresh
  window.addEventListener('beforeunload', function() {
    // Set a session storage flag to indicate this is a refresh
    sessionStorage.setItem('pageRefreshed', 'true');
  });
  
  // Check if this page load is from a refresh
  if (sessionStorage.getItem('pageRefreshed') === 'true') {
    // Clear the flag
    sessionStorage.removeItem('pageRefreshed');
    // Remove any hash and force to top
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    forceScrollToTop();
  }
})(); 