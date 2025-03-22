// Fix for the Pixel Playground disappearing issue
(function() {
  // Function to run when the page loads
  const fixImageGenerator = () => {
    // 1. Remove default hash change behavior
    window.addEventListener('hashchange', function(e) {
      // If we're trying to navigate away from the image generator, prevent it
      if (e.oldURL.includes('#ImageGenerator') && !e.newURL.includes('#ImageGenerator')) {
        history.pushState('', document.title, '#ImageGenerator'); 
        e.preventDefault();
        return false;
      }
    });
    
    // 2. Install a button click interceptor
    const setupButtonInterception = () => {
      const root = document.getElementById('root');
      if (!root) return false;
      
      // Try to find any React-generated button
      const buttons = root.querySelectorAll('button');
      Array.from(buttons).forEach(button => {
        // Skip buttons we've already processed
        if (button.getAttribute('data-intercepted') === 'true') return;
        
        // Mark this button as intercepted
        button.setAttribute('data-intercepted', 'true');
        
        // Add a click interceptor
        button.addEventListener('click', function(e) {
          // Let the click go through, but immediately ensure the section stays visible
          setTimeout(() => {
            const imageGenerator = document.getElementById('ImageGenerator');
            const reactRoot = document.getElementById('root');
            
            if (imageGenerator) {
              imageGenerator.style.display = 'block';
              imageGenerator.style.visibility = 'visible';
              imageGenerator.style.opacity = '1';
            }
            
            if (reactRoot) {
              reactRoot.style.display = 'block';
              reactRoot.style.visibility = 'visible';
              reactRoot.style.opacity = '1';
            }
            
            // Ensure hash is correct
            if (window.location.hash !== '#ImageGenerator') {
              window.location.hash = '#ImageGenerator';
            }
          }, 5);
        }, true); // Using capture phase to intercept early
      });
      
      return true;
    };
    
    // Try to intercept immediately and then periodically
    setupButtonInterception();
    
    // Keep checking for dynamically added buttons
    const buttonCheckInterval = setInterval(() => {
      setupButtonInterception();
    }, 500);
    
    // Stop checking after 20 seconds
    setTimeout(() => clearInterval(buttonCheckInterval), 20000);
    
    // 3. Fix form submissions that might navigate away
    document.addEventListener('submit', function(e) {
      const imageGenerator = document.getElementById('ImageGenerator');
      if (imageGenerator && window.getComputedStyle(imageGenerator).display !== 'none') {
        // Prevent form submission for forms within the image generator
        e.preventDefault();
        return false;
      }
    }, true);
  };
  
  // Execute our fix when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixImageGenerator);
  } else {
    fixImageGenerator();
  }
})();