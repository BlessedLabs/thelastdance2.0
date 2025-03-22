// Mobile Menu JavaScript - FORCEFUL FIX for mobile menu
document.addEventListener('DOMContentLoaded', function() {
  console.log("Mobile menu script loaded");
  
  // Find the hamburger button - try multiple possible selectors
  const hamburgerBtn = document.querySelector('.menu-button') || 
                       document.querySelector('.w-nav-button') ||
                       document.querySelector('[class*="menu"]');
  
  if (!hamburgerBtn) {
    console.error("Could not find hamburger button");
    return;
  }
  
  console.log("Found hamburger button:", hamburgerBtn);
  
  // Create the mobile menu structure ONCE and add to document
  const mobileMenuOverlay = document.createElement('div');
  mobileMenuOverlay.id = 'bl-mobile-menu-overlay';
  
  // Force overlay styles with !important
  Object.assign(mobileMenuOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: '99999',
    display: 'none',
    overflowY: 'auto',
    padding: '70px 0 20px 0', // Keep padding to provide space below the navbar
    alignItems: 'center',
    justifyContent: 'center'
  });
  
  // Create a container for the menu items
  const menuContainer = document.createElement('div');
  menuContainer.id = 'bl-mobile-menu-container';
  
  // Force styles for menu container
  Object.assign(menuContainer.style, {
    maxWidth: '100%',
    width: '100%',
    padding: '20px',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  });
  
  // Define the menu links exactly as shown in desktop
  // For mobile navigation, always use absolute URLs to ensure proper navigation
  
  // Check current page - useful for debugging
  const pathname = window.location.pathname;
  console.log("Current page path:", pathname);
  
  // Force paths to always be explicit with absolute URLs
  // This fixes navigation on sub-pages like our-story.html
  const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
  console.log("Base URL for navigation:", baseUrl);
  
  const menuItems = [
    { 
      text: 'Home', 
      url: 'index.html#Home' 
    },
    { 
      text: 'Services', 
      url: 'index.html#serveme' 
    },
    { 
      text: 'Pixel Playground', 
      url: 'index.html#ImageGenerator', 
      isSpecial: true 
    },
    { 
      text: 'Our Story', 
      url: 'our-story.html' 
    },
    { 
      text: 'Contact', 
      url: 'index.html#Contact' 
    }
  ];
  
  console.log("Menu items defined with explicit paths");
  
  // Add each menu item
  menuItems.forEach(function(item) {
    // Create button element instead of a link
    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    
    // Explicitly set the data-target attribute with the full URL
    menuButton.setAttribute('data-target', item.url);
    
    // Set ID for debugging purposes
    menuButton.id = `mobile-menu-${item.text.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Add debug info to console
    console.log(`Creating menu button: ${item.text} => ${item.url}`);
    
    menuButton.innerHTML = item.text;
    
    // Force link styles
    Object.assign(menuButton.style, {
      display: 'block',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      padding: '20px 30px',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '0 auto',
      fontWeight: '500',
      width: '100%',
      maxWidth: '250px',
      boxSizing: 'border-box',
      textAlign: 'center',
      cursor: 'pointer'
    });
    
    // Simple white styling for Pixel Playground that won't break touch events
    if (item.isSpecial) {
      menuButton.style.color = 'white';
      menuButton.style.fontWeight = '600'; // Slightly bolder than other items
    }
    
    // Use a direct, simple onclick handler - most reliable for mobile
    menuButton.setAttribute('onclick', `
      // First close the menu
      document.getElementById('bl-mobile-menu-overlay').style.display = 'none';
      document.querySelector('.menu-button, .w-nav-button').classList.remove('w--open');
      document.body.style.overflow = '';
      
      // Then navigate
      window.location.href = '${item.url}';
    `);
    
    // Make sure buttons are visibly clickable
    menuButton.style.cursor = 'pointer';
    
    menuContainer.appendChild(menuButton);
  });
  
  // Add CTA button as an anchor
  const ctaButton = document.createElement('a');
  ctaButton.href = "https://calendly.com/eric-blessedlabs/30min";
  ctaButton.textContent = "Let's Build Together";
  ctaButton.target = "_blank";
  
  // Force CTA button styles
  Object.assign(ctaButton.style, {
    display: 'block',
    backgroundColor: '#1e5ef3',
    color: 'white',
    fontSize: '18px',
    padding: '15px 30px',
    margin: '40px auto',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '100px',
    fontWeight: '600',
    boxShadow: '0 4px 10px rgba(30, 94, 243, 0.3)',
    border: 'none',
    maxWidth: '250px',
    width: '80%'
  });
  
  menuContainer.appendChild(ctaButton);
  mobileMenuOverlay.appendChild(menuContainer);
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  
  // Force close button styles
  Object.assign(closeButton.style, {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: '100000',
    padding: '10px',
    display: 'block'
  });
  
  // Add onclick handler to close button
  closeButton.setAttribute('onclick', `
    document.getElementById('bl-mobile-menu-overlay').style.display = 'none';
    document.querySelector('.menu-button, .w-nav-button').classList.remove('w--open');
    document.body.style.overflow = ''; // Restore scrolling on body
  `);
  
  mobileMenuOverlay.appendChild(closeButton);
  
  // Append menu to the body
  document.body.appendChild(mobileMenuOverlay);
  
  console.log("Mobile menu created and added to document");
  
  // Add necessary styles for mobile menu
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* Special styling for mobile Pixel Playground button - white text only */
    #bl-mobile-menu-overlay button#mobile-menu-pixel-playground {
      color: white !important;
      font-weight: 600 !important;
    }
    
    /* Improved mobile touch handling */
    @media (max-width: 991px) {
      /* Fix tap delay issues on mobile */
      #bl-mobile-menu-overlay button {
        -webkit-tap-highlight-color: transparent !important;
        touch-action: manipulation !important;
        cursor: pointer !important;
      }
      
      /* Additional spacing for better touch targets */
      #bl-mobile-menu-overlay button {
        padding: 20px 30px !important;
        margin: 5px auto !important;
      }
      
      /* Ensure menu is properly sized for interaction */
      #bl-mobile-menu-overlay {
        width: 100% !important;
        height: 100% !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 99999 !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Revert to simpler hamburger button handling
  // Direct onclick attribute for immediate response
  hamburgerBtn.setAttribute('onclick', `
    const overlay = document.getElementById('bl-mobile-menu-overlay');
    
    if (overlay.style.display === 'flex' || overlay.style.display === 'block') {
      overlay.style.display = 'none';
      this.classList.remove('w--open');
      document.body.style.overflow = ''; // Restore scrolling on body
    } else {
      const navbarHeight = document.querySelector('.navbar-logo-left-container')?.offsetHeight || 0;
      overlay.style.paddingTop = navbarHeight + 'px';
      overlay.style.display = 'flex';
      this.classList.add('w--open');
      document.body.style.overflow = 'hidden'; // Prevent scrolling while menu is open
    }
  `);
  
  // Make sure the button is clickable
  hamburgerBtn.style.cursor = 'pointer';
  hamburgerBtn.style.pointerEvents = 'auto';
  
  // Only apply mobile menu on mobile devices
  function checkMobile() {
    if (window.innerWidth <= 991) {
      // Make sure hamburger button is visible
      if (hamburgerBtn) {
        hamburgerBtn.style.display = 'block';
        hamburgerBtn.style.visibility = 'visible';
        hamburgerBtn.style.opacity = '1';
        hamburgerBtn.style.zIndex = '9999';
        
        // Make sure the menu is properly set up for the current page
        console.log("Current page: ", window.location.pathname);
        console.log("Mobile menu is active");
        
        // Ensure we can click the hamburger menu
        hamburgerBtn.style.pointerEvents = 'auto';
        hamburgerBtn.style.cursor = 'pointer';
      }
    } else {
      // Hide mobile menu on desktop
      mobileMenuOverlay.style.display = 'none';
      hamburgerBtn.classList.remove('w--open');
    }
  }
  
  // Check on load and resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Log confirmation
  console.log("Mobile menu setup complete");
});