/**
 * Mobile Text Adjuster and Star Remover
 * This script ensures the AI Image Generator text is properly positioned on mobile
 * and removes any spinning star elements near the "AI" text
 */

(function() {
  // Make sure this only runs once
  if (window.mobileTextAdjusted) return;
  window.mobileTextAdjusted = true;
  
  // Wait for DOM to be interactive
  document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust the text on mobile
    function adjustMobileText() {
      // Only run on mobile devices
      if (window.innerWidth > 767) return;
      
      // Set up a periodic check for the AI Generator elements
      const checkInterval = setInterval(function() {
        // Find the title elements
        const titleContainer = document.querySelector('#root h1');
        if (!titleContainer) return;
        
        const titleText = titleContainer.querySelector('span:not(.absolute)');
        if (!titleText) return;
        
        // Adjust title text positioning
        titleText.style.fontSize = '80%';
        titleText.style.letterSpacing = '-0.06em';
        titleText.style.textAlign = 'left';
        titleText.style.paddingLeft = '5px';
        titleText.style.margin = '0';
        titleText.style.width = 'auto';
        titleText.style.maxWidth = '100%';
        titleText.style.position = 'relative';
        titleText.style.left = '0';
        titleText.style.transform = 'scale(0.95)';
        titleText.style.transformOrigin = 'left center';
        
        // Adjust container positioning
        titleContainer.style.textAlign = 'left';
        titleContainer.style.paddingLeft = '0';
        titleContainer.style.margin = '0';
        titleContainer.style.marginBottom = '-5px';
        titleContainer.style.width = '100%';
        titleContainer.style.maxWidth = '100%';
        titleContainer.style.position = 'relative';
        titleContainer.style.left = '0';
        
        // Find subtitle text
        const subtitleText = document.querySelector('#root p.text-lg');
        if (subtitleText) {
          subtitleText.style.fontSize = '1rem';
          subtitleText.style.textAlign = 'left';
          subtitleText.style.paddingLeft = '5px';
          subtitleText.style.marginTop = '0.15rem';
          subtitleText.style.marginBottom = '0';
        }
        
        // Find and remove all star/sparkle elements
        const sparkleElements = document.querySelectorAll(
          '#root span.absolute, ' +
          '#root div > span.absolute, ' +
          '#root .rounded-full.absolute, ' +
          '#root .animate-spin, ' +
          '#root .animate-pulse, ' +
          '#root h1 + span.absolute, ' +
          '#root h1 > span.absolute, ' +
          '#root h1 ~ span.absolute'
        );
        
        sparkleElements.forEach(function(element) {
          element.style.display = 'none';
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
          element.style.pointerEvents = 'none';
          element.style.width = '0';
          element.style.height = '0';
          element.style.position = 'absolute';
          element.style.left = '-9999px';
        });
        
        // Success - clear the interval
        clearInterval(checkInterval);
      }, 100);
      
      // Stop checking after 10 seconds
      setTimeout(function() {
        clearInterval(checkInterval);
      }, 10000);
    }
    
    // Run immediately
    adjustMobileText();
    
    // Also run on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 767) {
        adjustMobileText();
      }
    });
  });
})();