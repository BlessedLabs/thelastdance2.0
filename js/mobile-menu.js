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
  
  // Force overlay styles with !important - centered content
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
  
  // Force styles for menu container - centered vertically and horizontally
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
  const menuItems = [
    { text: 'Home', url: '#Home' },
    { text: 'Services', url: '#serveme' },
    { text: 'About Us', url: '#AboutUs' },
    { text: 'Pixel Playground', url: '#ImageGenerator', isSpecial: true },
    { text: 'Contact', url: '#Contact' }
  ];
  
  // ===== COMPLETELY NEW LINK CREATION APPROACH =====
  // Using direct, immediate navigation with no delays
  
  menuItems.forEach(function(item) {
    // Create a div wrapper instead of an <a> tag to avoid browser tap behavior
    const linkDiv = document.createElement('div');
    
    // Set a data attribute for the target
    linkDiv.setAttribute('data-target', item.url);
    
    // Force link styles - centered horizontally 
    Object.assign(linkDiv.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      padding: '20px 30px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '0 auto',
      fontWeight: '500',
      width: '100%',
      maxWidth: '250px',
      boxSizing: 'border-box',
      textAlign: 'center',
      cursor: 'pointer', // Show clickable cursor
      userSelect: 'none', // Prevent text selection
      webkitTapHighlightColor: 'transparent' // Remove tap highlighting
    });
    
    // Set the inner text
    linkDiv.textContent = item.text;
    
    // Special styling for Pixel Playground
    if (item.isSpecial) {
      linkDiv.style.background = 'linear-gradient(-45deg, #3f6eff, #4a00e0, #00d4ff, #2e5ef3)';
      linkDiv.style.backgroundSize = '200% auto';
      linkDiv.style.webkitBackgroundClip = 'text';
      linkDiv.style.backgroundClip = 'text';
      linkDiv.style.webkitTextFillColor = 'transparent';
      linkDiv.style.color = 'transparent';
    }
    
    // Add an immediate-response click handler
    linkDiv.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Close the menu immediately
      mobileMenuOverlay.style.display = 'none';
      hamburgerBtn.classList.remove('w--open');
      
      // Navigate immediately
      const targetSection = document.querySelector(this.getAttribute('data-target'));
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar-logo-left-container')?.offsetHeight || 0;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
    
    // Add touch handlers specifically for mobile
    linkDiv.addEventListener('touchstart', function(e) {
      // Provide visual feedback
      this.style.opacity = '0.7';
    }, { passive: true });
    
    linkDiv.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent default behavior
      this.style.opacity = '1';
      
      // Close the menu immediately  
      mobileMenuOverlay.style.display = 'none';
      hamburgerBtn.classList.remove('w--open');
      
      // Navigate immediately
      const targetSection = document.querySelector(this.getAttribute('data-target'));
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar-logo-left-container')?.offsetHeight || 0;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, { passive: false }); // passive: false allows preventDefault
    
    menuContainer.appendChild(linkDiv);
  });
  
  // Add CTA button - this is an external link so we'll use a real <a> tag
  const ctaButton = document.createElement('a');
  ctaButton.href = "https://calendly.com/eric-blessedlabs/30min";
  ctaButton.textContent = "Talk to Expert";
  ctaButton.target = "_blank";
  ctaButton.rel = "noopener noreferrer";
  
  // Force CTA button styles - centered
  Object.assign(ctaButton.style, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
    webkitTapHighlightColor: 'transparent' // Remove tap highlighting
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
    display: 'block',
    webkitTapHighlightColor: 'transparent' // Remove tap highlighting
  });
  
  mobileMenuOverlay.appendChild(closeButton);
  
  // Append menu to the body
  document.body.appendChild(mobileMenuOverlay);
  
  console.log("Mobile menu created and added to document");
  
  // Add necessary keyframes for animation
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes blMenuGradient {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 25%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 75%; }
      100% { background-position: 0% 50%; }
    }
    
    #bl-mobile-menu-overlay [data-target="#ImageGenerator"] {
      animation: blMenuGradient 6s ease-in-out infinite;
    }
    
    /* Global styles to fix double-tap issue */
    @media (max-width: 991px) {
      * {
        -webkit-tap-highlight-color: transparent;
      }
      
      #bl-mobile-menu-overlay div[data-target] {
        touch-action: manipulation;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Toggle menu function - simplified to avoid conflicts
  function toggleMobileMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (mobileMenuOverlay.style.display === 'flex' || mobileMenuOverlay.style.display === 'block') {
      // Close the menu
      mobileMenuOverlay.style.display = 'none';
      hamburgerBtn.classList.remove('w--open');
    } else {
      // Open the menu
      const navbarHeight = document.querySelector('.navbar-logo-left-container')?.offsetHeight || 0;
      mobileMenuOverlay.style.paddingTop = navbarHeight + 'px';
      mobileMenuOverlay.style.display = 'flex';
      hamburgerBtn.classList.add('w--open');
    }
  }
  
  // Add event listeners with both click and touch handlers
  hamburgerBtn.addEventListener('click', toggleMobileMenu);
  hamburgerBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    toggleMobileMenu(e);
  }, { passive: false });
  
  closeButton.addEventListener('click', toggleMobileMenu);
  closeButton.addEventListener('touchend', function(e) {
    e.preventDefault();
    toggleMobileMenu(e);
  }, { passive: false });
  
  // Only apply mobile menu on mobile devices
  function checkMobile() {
    if (window.innerWidth <= 991) {
      // Make sure hamburger button is visible
      if (hamburgerBtn) {
        hamburgerBtn.style.display = 'block';
        hamburgerBtn.style.visibility = 'visible';
        hamburgerBtn.style.opacity = '1';
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
  
  // Disable Webflow's native touch delay if possible
  if (window.Webflow) {
    try {
      // Try to disable Webflow's tap delay if it exists
      if (window.Webflow.env && window.Webflow.env.touch) {
        window.Webflow.env.touch = 0;
      }
    } catch (e) {
      console.warn("Could not modify Webflow environment:", e);
    }
  }
  
  // Log confirmation
  console.log("Mobile menu setup complete with single-tap fix");
});