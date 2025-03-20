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
    padding: '70px 0 20px 0' // Keep padding to provide space below the navbar
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
    boxSizing: 'border-box'
  });
  
  // Define the menu links exactly as shown in desktop
  const menuItems = [
    { text: 'Home', url: '#Home' },
    { text: 'Services', url: '#serveme' },
    { text: 'About Us', url: '#AboutUs' },
    { text: 'Pixel Playground', url: '#ImageGenerator', isSpecial: true },
    { text: 'Contact', url: '#Contact' }
  ];
  
  // Add each menu item
  menuItems.forEach(function(item) {
    const menuItem = document.createElement('a');
    menuItem.href = item.url;
    menuItem.textContent = item.text;
    
    // Force link styles
    Object.assign(menuItem.style, {
      display: 'block',
      color: 'white',
      fontSize: '24px',
      padding: '20px 30px',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '0',
      fontWeight: '500',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left'
    });
    
    // Special styling for Pixel Playground
    if (item.isSpecial) {
      menuItem.style.background = 'linear-gradient(-45deg, #3f6eff, #4a00e0, #00d4ff, #2e5ef3)';
      menuItem.style.backgroundSize = '200% auto';
      menuItem.style.webkitBackgroundClip = 'text';
      menuItem.style.backgroundClip = 'text';
      menuItem.style.webkitTextFillColor = 'transparent';
      menuItem.style.color = 'transparent';
    }
    
    menuContainer.appendChild(menuItem);
  });
  
  // Add CTA button
  const ctaButton = document.createElement('a');
  ctaButton.href = "https://calendly.com/eric-blessedlabs/30min";
  ctaButton.textContent = "Talk to Expert";
  ctaButton.target = "_blank";
  
  // Force CTA button styles
  Object.assign(ctaButton.style, {
    display: 'block',
    backgroundColor: '#1e5ef3',
    color: 'white',
    fontSize: '18px',
    padding: '15px 30px',
    margin: '40px 30px',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '100px',
    fontWeight: '600',
    boxShadow: '0 4px 10px rgba(30, 94, 243, 0.3)',
    border: 'none'
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
    
    #bl-mobile-menu-overlay a[href="#ImageGenerator"] {
      animation: blMenuGradient 6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Menu open function
  function openMobileMenu() {
    console.log("Opening mobile menu");
    hamburgerBtn.classList.add('w--open');
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Menu close function
  function closeMobileMenu() {
    console.log("Closing mobile menu");
    hamburgerBtn.classList.remove('w--open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Toggle menu function
  function toggleMobileMenu(e) {
    console.log("Toggle menu clicked");
    if (e) e.preventDefault();
    
    if (mobileMenuOverlay.style.display === 'block') {
      closeMobileMenu();
    } else {
      // Position the menu overlay appropriately for fixed navigation
      const navbarHeight = document.querySelector('.navbar-logo-left-container').offsetHeight || 0;
      
      // Set padding to account for navbar height
      mobileMenuOverlay.style.paddingTop = navbarHeight + 'px';
      
      openMobileMenu();
    }
  }
  
  // Add event listeners
  hamburgerBtn.addEventListener('click', toggleMobileMenu);
  closeButton.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking on links
  const menuLinks = mobileMenuOverlay.querySelectorAll('a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });
  
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
      closeMobileMenu();
    }
  }
  
  // Check on load and resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Log confirmation
  console.log("Mobile menu setup complete");
}); 