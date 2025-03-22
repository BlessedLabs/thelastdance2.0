// Prevent navigation when clicking the Generate button
(function() {
  // Run when the page is loaded
  window.addEventListener('load', function() {
    console.log('Preventing Generate button from causing navigation or refresh popups');
    
    // Function to intercept the Generate button clicks
    const setupButtonInterception = () => {
      // Try to find the React app root
      const root = document.getElementById('root');
      if (!root) return false;
      
      // Find the original button - search for the Generate button
      const generateButton = root.querySelector('button:last-of-type');
      if (!generateButton) return false;
      
      console.log('Found Generate button - adding navigation prevention');
      
      // Get the form element
      const formElement = root.querySelector('form');
      if (formElement) {
        // Prevent form submission which causes refresh
        formElement.addEventListener('submit', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Prevented form submission');
          return false;
        }, true);
      }
      
      // Create a semi-transparent overlay over the button
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 10000;
      `;
      
      // Position the overlay relative to the button
      const buttonRect = generateButton.getBoundingClientRect();
      const buttonContainer = generateButton.parentElement;
      
      // Make sure the container has relative positioning
      if (buttonContainer && window.getComputedStyle(buttonContainer).position === 'static') {
        buttonContainer.style.position = 'relative';
      }
      
      if (buttonContainer) {
        buttonContainer.appendChild(overlay);
      }
      
      // Add a clone of the button on top of the overlay
      const cloneButton = document.createElement('button');
      cloneButton.textContent = generateButton.textContent;
      cloneButton.style.cssText = `
        background: #0066ff;
        color: white;
        font-weight: ${window.getComputedStyle(generateButton).fontWeight};
        padding: ${window.getComputedStyle(generateButton).padding};
        border-radius: ${window.getComputedStyle(generateButton).borderRadius};
        border: none;
        cursor: pointer;
        font-size: ${window.getComputedStyle(generateButton).fontSize};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10001;
      `;
      
      // When our clone button is clicked
      cloneButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Simulate a click on the original button
        generateButton.click();
        
        // Immediately prevent any navigation and keep components visible
        setTimeout(() => {
          // Keep the Pixel Playground visible
          const section = document.getElementById('ImageGenerator');
          if (section) {
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
          }
          
          // Keep the root element visible
          if (root) {
            root.style.display = 'block';
            root.style.visibility = 'visible';
            root.style.opacity = '1';
          }
          
          // Keep AI container visible
          const aiContainer = document.getElementById('ai-generator-container');
          if (aiContainer) {
            aiContainer.style.display = 'block';
            aiContainer.style.visibility = 'visible';
            aiContainer.style.opacity = '1';
          }
          
          // Keep form visible if it exists
          if (formElement) {
            formElement.style.display = 'block';
            formElement.style.visibility = 'visible';
            formElement.style.opacity = '1';
          }
          
          // Center the title and subtitle
          const titleElement = root.querySelector('h1');
          const subtitleElement = root.querySelector('p.text-lg');
          
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
        }, 10);
        
        return false;
      });
      
      // Add our clone button to the overlay
      if (overlay) {
        overlay.appendChild(cloneButton);
      }
      
      // Make sure the original button doesn't get clicked directly
      generateButton.style.pointerEvents = 'none';
      
      // Set up a click handler on the clone button instead
      cloneButton.addEventListener('click', function() {
        // Set a flag that we're generating an image
        window.isGeneratorSubmitting = true;
        
        // Reset the flag after a short period
        setTimeout(function() {
          window.isGeneratorSubmitting = false;
        }, 5000);
      });
      
      return true;
    };
    
    // Try to set up immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setupButtonInterception();
    }
    
    // Also try when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Keep trying every 300ms until successful
      const interval = setInterval(() => {
        if (setupButtonInterception()) {
          clearInterval(interval);
        }
      }, 300);
      
      // Stop trying after 10 seconds
      setTimeout(() => clearInterval(interval), 10000);
    });
  });
})();