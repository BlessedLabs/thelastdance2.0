/**
 * Pixel Playground Fix Script
 * Prevents the component from disappearing when Generate button is clicked
 * Ensures all UI elements remain visible and centered
 */

(function() {
  // Function that runs when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Pixel Playground fix script loaded');
    
    // Initialize a flag to prevent multiple instances
    window.pixelPlaygroundFixed = window.pixelPlaygroundFixed || false;
    
    if (window.pixelPlaygroundFixed) {
      console.log('Pixel Playground already fixed, skipping');
      return;
    }
    
    // Set up main fix function
    function applyPixelPlaygroundFix() {
      // Get key elements
      const rootElement = document.getElementById('root');
      const imageGeneratorSection = document.getElementById('ImageGenerator');
      const aiGeneratorContainer = document.getElementById('ai-generator-container');
      
      if (!rootElement) {
        console.log('Root element not found, will try again later');
        return false;
      }
      
      console.log('Found root element, applying fix');
      
      // 1. First approach: Use a MutationObserver to watch for component disappearing
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // Check if something important disappeared
          if (mutation.type === 'attributes' || 
              (mutation.type === 'childList' && mutation.removedNodes.length > 0)) {
            
            console.log('Detected DOM change, ensuring visibility');
            ensureComponentsVisible();
          }
        });
      });
      
      // Start observing the entire Pixel Playground container
      if (imageGeneratorSection) {
        observer.observe(imageGeneratorSection, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class', 'display', 'visibility', 'opacity']
        });
        console.log('Now observing the Image Generator section for changes');
      }
      
      // 2. Second approach: Directly intercept the Generate button clicks
      function findAndFixGenerateButton() {
        const generateButton = rootElement.querySelector('button:last-of-type');
        
        if (!generateButton) {
          console.log('Generate button not found, will try again');
          return false;
        }
        
        console.log('Found Generate button:', generateButton);
        
        // Add safe event listener that won't interfere with React
        generateButton.addEventListener('mousedown', function(e) {
          console.log('Generate button clicked, scheduling visibility check');
          
          // We'll check visibility multiple times after the click
          setTimeout(ensureComponentsVisible, 50);
          setTimeout(ensureComponentsVisible, 200);
          setTimeout(ensureComponentsVisible, 500);
          setTimeout(ensureComponentsVisible, 1000);
        });
        
        // Also attach to form submit events
        const formElement = rootElement.querySelector('form');
        if (formElement) {
          formElement.addEventListener('submit', function(e) {
            console.log('Form submission detected, scheduling visibility check');
            
            // We'll check visibility multiple times after form submission
            setTimeout(ensureComponentsVisible, 50);
            setTimeout(ensureComponentsVisible, 200);
            setTimeout(ensureComponentsVisible, 500);
            setTimeout(ensureComponentsVisible, 1000);
          });
          
          console.log('Form event handler attached');
        }
        
        return true;
      }
      
      // 3. Main function to ensure all components remain visible
      function ensureComponentsVisible() {
        console.log('Running visibility check');
        
        // Root element (React app container)
        if (rootElement) {
          rootElement.style.display = 'block';
          rootElement.style.visibility = 'visible';
          rootElement.style.opacity = '1';
        }
        
        // AI Generator container
        if (aiGeneratorContainer) {
          aiGeneratorContainer.style.display = 'block';
          aiGeneratorContainer.style.visibility = 'visible';
          aiGeneratorContainer.style.opacity = '1';
        }
        
        // Recreate internal DOM structure if missing
        if (rootElement && rootElement.style.display === 'none' || 
            rootElement.children.length === 0 || 
            window.getComputedStyle(rootElement).visibility === 'hidden') {
          
          console.log('Critical elements missing, refreshing container');
          
          // Try to refresh the component without a full page reload
          if (aiGeneratorContainer) {
            const savedHTML = aiGeneratorContainer.innerHTML;
            setTimeout(function() {
              aiGeneratorContainer.innerHTML = savedHTML;
            }, 10);
          }
        }
        
        // Fix title and "Powered by" text centering
        const titleElement = rootElement.querySelector('h1');
        const subtitleElement = rootElement.querySelector('p.text-lg');
        
        if (titleElement) {
          titleElement.style.textAlign = 'center';
          titleElement.style.width = '100%';
          titleElement.style.marginLeft = 'auto';
          titleElement.style.marginRight = 'auto';
        }
        
        if (subtitleElement) {
          subtitleElement.style.textAlign = 'center';
          subtitleElement.style.width = '100%';
          subtitleElement.style.marginLeft = 'auto';
          subtitleElement.style.marginRight = 'auto';
        }
        
        // Fix form element
        const formElement = rootElement.querySelector('form');
        if (formElement) {
          formElement.style.display = 'block';
          formElement.style.visibility = 'visible';
          formElement.style.opacity = '1';
        }
        
        // Ensure Generate button remains accessible
        const generateButton = rootElement.querySelector('button:last-of-type');
        if (generateButton) {
          generateButton.style.pointerEvents = 'auto';
          generateButton.style.visibility = 'visible';
          generateButton.style.opacity = '1';
          generateButton.style.display = 'inline-block';
          
          // Make sure the granite color effect remains
          generateButton.style.background = 'linear-gradient(-45deg, #0012b3, #005eff, #4a8aff, #001eff)';
          generateButton.style.backgroundSize = '200% auto';
        }
      }
      
      // Start button monitoring
      findAndFixGenerateButton();
      
      // Keep trying to find the button if it wasn't found initially
      const buttonCheckInterval = setInterval(function() {
        if (findAndFixGenerateButton()) {
          clearInterval(buttonCheckInterval);
        }
      }, 500);
      
      // Stop checking after 30 seconds regardless
      setTimeout(function() {
        clearInterval(buttonCheckInterval);
      }, 30000);
      
      // Run an initial visibility check
      ensureComponentsVisible();
      
      // Set fix as applied
      window.pixelPlaygroundFixed = true;
      
      return true;
    }
    
    // Try applying the fix immediately
    if (!applyPixelPlaygroundFix()) {
      // If not successful, try again when React finishes rendering
      const checkInterval = setInterval(function() {
        if (applyPixelPlaygroundFix()) {
          clearInterval(checkInterval);
        }
      }, 500);
      
      // Stop checking after 30 seconds
      setTimeout(function() {
        clearInterval(checkInterval);
      }, 30000);
    }
    
    // Add window load handler for extra reliability
    window.addEventListener('load', function() {
      setTimeout(applyPixelPlaygroundFix, 1000);
    });
  });
})();