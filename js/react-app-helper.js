/**
 * React App Helper Script
 * 
 * This script modifies the React application that powers the Image Generator
 * to ensure proper behavior on mobile devices.
 */

(function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 991;
  if (!isMobile) return;
  
  // Keep track of the original render function
  let originalRender = null;
  
  // Function to run when the module script for React is loaded
  function handleReactLoad() {
    // Wait for the React app to be loaded and rendered
    const checkForReactApp = setInterval(() => {
      // Look for the root element where React is mounted
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.children.length > 0) {
        clearInterval(checkForReactApp);
        
        // Make sure the app is always visible
        rootElement.style.opacity = '1';
        rootElement.style.height = '';
        rootElement.style.overflow = '';
        
        // Fix for links to the Image Generator
        const handleHashChange = () => {
          // Only scroll when explicitly clicking on the ImageGenerator link
          if (window.location.hash === '#ImageGenerator') {
            const imageGenSection = document.getElementById('ImageGenerator');
            if (imageGenSection) {
              imageGenSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        };
        
        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
      }
    }, 100);
  }
  
  // Intercept the module script that loads the React app
  const originalAppendChild = Element.prototype.appendChild;
  Element.prototype.appendChild = function(element) {
    if (element.tagName === 'SCRIPT' && 
        element.src && 
        element.src.includes('index-C22EvlyQ.js')) {
      // Add a listener for when the script loads
      element.addEventListener('load', handleReactLoad);
    }
    return originalAppendChild.call(this, element);
  };
  
  // Also patch React's useEffect to prevent unwanted scrolling effects
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    // If this is a script tag, we may need to intercept it
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        // If this is loading the React app's main script
        if (name === 'src' && value && value.includes('assets/index-C22EvlyQ.js')) {
          // Add a flag to indicate we're on mobile
          const mobileFlag = document.createElement('script');
          mobileFlag.textContent = `window.__MOBILE_VIEW__ = true;`;
          document.head.appendChild(mobileFlag);
          
          // Handle script load
          this.addEventListener('load', handleReactLoad);
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };
  
  // Check for direct hash navigation
  if (window.location.hash === '#ImageGenerator') {
    // Let the browser handle this normally
    setTimeout(() => {
      const imageGenSection = document.getElementById('ImageGenerator');
      if (imageGenSection) {
        imageGenSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
})(); 