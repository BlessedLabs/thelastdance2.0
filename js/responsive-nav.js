document.addEventListener('DOMContentLoaded', function() {
  // Define breakpoint as a constant for consistency
  const MOBILE_BREAKPOINT = 992;
  
  // Check if we're on mobile before initializing mobile navigation
  let isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  
  // Function to set the correct display mode based on screen size
  function setupNavigationMode() {
    // Get navigation elements
    const menuButton = document.querySelector('.menu-button');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    const desktopLinks = document.querySelectorAll('.link-block-2, .link-block-3, .link-block-4, .link-block');
    const navbarContainer = document.querySelector('.navbar-logo-left-container');
    const body = document.body;
    
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      // Mobile mode
      if (menuButton) menuButton.style.display = 'block';
      
      // Add mobile class to container for styling
      if (navbarContainer) navbarContainer.classList.add('mobile-nav-active');
      
      // Remove body padding since navbar now scrolls with page
      if (navbarContainer) {
        body.style.paddingTop = '0';
        // Remove the nav height CSS variable since it's no longer needed
        document.documentElement.style.removeProperty('--nav-height');
      }
      
      // Hide desktop links
      desktopLinks.forEach(link => {
        link.style.display = 'none';
      });
      
      // Initialize mobile navigation
      initMobileNavigation();
      
      // Hide mobile menu initially
      if (navMenuWrapper) {
        navMenuWrapper.classList.remove('show-mobile-menu');
        navMenuWrapper.style.display = 'none';
      }
      
      if (menuButton) {
        menuButton.classList.remove('menu-open');
      }
    } else {
      // Desktop mode
      if (menuButton) menuButton.style.display = 'none';
      
      // Remove mobile class from container
      if (navbarContainer) navbarContainer.classList.remove('mobile-nav-active');
      
      // Reset body padding
      body.style.paddingTop = '0';
      
      // Show desktop links
      desktopLinks.forEach(link => {
        link.style.display = 'flex';
      });
      
      // Show menu wrapper properly
      if (navMenuWrapper) {
        navMenuWrapper.classList.remove('show-mobile-menu');
        navMenuWrapper.style.display = 'flex';
      }
    }
  }
  
  // Run setup immediately
  setupNavigationMode();
  
  // Get navigation elements
  const menuButton = document.querySelector('.menu-button');
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  
  // Toggle mobile menu on hamburger click - only on mobile
  if (menuButton) {
    menuButton.addEventListener('click', function(e) {
      // Only handle click if on mobile
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        e.stopPropagation(); // Prevent event bubbling
        
        // Toggle menu open class
        this.classList.toggle('menu-open');
        
        // Toggle menu visibility
        if (navMenuWrapper) {
          navMenuWrapper.classList.toggle('show-mobile-menu');
          
          // Explicitly set display style based on class
          if (navMenuWrapper.classList.contains('show-mobile-menu')) {
            navMenuWrapper.style.display = 'block';
          } else {
            navMenuWrapper.style.display = 'none';
          }
        }
      }
    });
  }
  
  // Handle dropdown toggles - only on mobile
  const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only handle click if on mobile
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        
        // Toggle open class on dropdown toggle
        this.classList.toggle('open');
        
        // Toggle show class on dropdown menu
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('mobile-dropdown-menu')) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });
  
  // Close mobile menu when clicking outside - only on mobile
  document.addEventListener('click', function(event) {
    // Only handle click if on mobile
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      if (navMenuWrapper && navMenuWrapper.classList.contains('show-mobile-menu')) {
        // Check if click is outside menu and menu button
        if (!navMenuWrapper.contains(event.target) && 
            menuButton && !menuButton.contains(event.target)) {
          navMenuWrapper.classList.remove('show-mobile-menu');
          navMenuWrapper.style.display = 'none';
          menuButton.classList.remove('menu-open');
        }
      }
    }
  });
  
  // Debounce function to limit resize event handling
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
  
  // Handle window resize events with debouncing
  window.addEventListener('resize', debounce(function() {
    const wasMobile = isMobile;
    const isNowMobile = window.innerWidth < MOBILE_BREAKPOINT;
    
    // Update isMobile state
    isMobile = isNowMobile;
    
    // Setup navigation for the current mode
    setupNavigationMode();
    
  }, 100));
});

// Function to create mobile navigation elements
function initMobileNavigation() {
  // Define breakpoint as a constant for consistency
  const MOBILE_BREAKPOINT = 992;
  
  // Only proceed if we're on mobile
  if (window.innerWidth >= MOBILE_BREAKPOINT) return;
  
  // Get the navigation menu wrapper
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  
  // Get the nav-menu-two list where we'll add our mobile links
  const navMenuList = document.querySelector('.nav-menu-two');
  
  if (!navMenuWrapper || !navMenuList) return;
  
  // Check if mobile navigation is already initialized - if so, just return
  if (navMenuList.querySelector('.mobile-nav-link')) return;
  
  // First, clear any existing mobile menu items that may have been added
  const existingMobileLinks = navMenuList.querySelectorAll('.mobile-nav-link');
  existingMobileLinks.forEach(link => {
    const parentLi = link.closest('li');
    if (parentLi && !parentLi.querySelector('.button-primary')) {
      parentLi.remove();
    }
  });
  
  // Define the navigation structure to match desktop navigation
  const navItems = [
    { text: 'Home', href: '#Home' },
    { text: 'Services', href: '#serveme' },
    { text: 'About Us', href: '#AboutUs' },
    { text: 'Pixel Playground', href: '#ImageGenerator' },
    { text: 'Contact', href: '#Contact' }
  ];
  
  // Get the first list item (WORK WITH US button)
  const workWithUsItem = navMenuList.querySelector('li');
  
  // Create and insert mobile menu items
  navItems.forEach(item => {
    // Create new li element
    const li = document.createElement('li');
    
    // Create link
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'mobile-nav-link';
    a.textContent = item.text;
    
    // Add click event for smooth scrolling
    a.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior
      
      // Get the target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Close the menu when clicked
      const menuButton = document.querySelector('.menu-button');
      if (menuButton) menuButton.classList.remove('menu-open');
      if (navMenuWrapper) {
        navMenuWrapper.classList.remove('show-mobile-menu');
        navMenuWrapper.style.display = 'none';
      }
      
      // Get the stored nav height from CSS variable, or calculate if not set
      let navbarHeight;
      const cssNavHeight = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
      
      if (cssNavHeight) {
        navbarHeight = parseInt(cssNavHeight, 10) || 0;
      } else {
        navbarHeight = document.querySelector('.navbar-logo-left-container').offsetHeight || 0;
      }
      
      // Scroll to target section with offset for fixed header
      if (targetSection) {
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
    
    // Append link to li
    li.appendChild(a);
    
    // Insert before the WORK WITH US item
    if (workWithUsItem) {
      navMenuList.insertBefore(li, workWithUsItem);
    } else {
      navMenuList.appendChild(li);
    }
  });
  
  // Add span element to hamburger icon if it doesn't exist
  const menuIconContainer = document.querySelector('.w-icon-nav-menu');
  if (menuIconContainer && !menuIconContainer.querySelector('span')) {
    // Create and append the middle line span
    const middleLineSpan = document.createElement('span');
    menuIconContainer.appendChild(middleLineSpan);
  }
}