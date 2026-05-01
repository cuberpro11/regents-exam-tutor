document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle Functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navButtonsGroup = document.querySelector('.nav-buttons-group');
    const navLinksGroup = document.querySelector('.nav-links-group');
    const navOverlay = document.querySelector('.nav-overlay');

    function toggleMobileMenu() {
        if (hamburgerMenu && navButtonsGroup && navLinksGroup) {
            hamburgerMenu.classList.toggle('active');
            navButtonsGroup.classList.toggle('active');
            navLinksGroup.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            // Prevent body scroll when menu is open
            document.body.style.overflow = hamburgerMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    function closeMobileMenu() {
        if (hamburgerMenu && navButtonsGroup && navLinksGroup) {
            hamburgerMenu.classList.remove('active');
            navButtonsGroup.classList.remove('active');
            navLinksGroup.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link, .nav-buttons-group .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Close menu on window resize if it goes above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.querySelector('.dark-mode-icon');
    
    // Check for saved dark mode preference or default to light mode
    const currentMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Apply dark mode if it was previously enabled
    if (currentMode) {
        document.body.classList.add('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.textContent = '☀️';
        }
    }
    
    // Toggle dark mode when button is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
            
            // Update icon
            if (darkModeIcon) {
                darkModeIcon.textContent = isDarkMode ? '☀️' : '🌙';
            }
        });
    }

    const checkoutButtons = document.querySelectorAll('.checkout-button');
    checkoutButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const courseName = button.dataset.courseName;
            fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course_name: courseName
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(session) {
                var stripe = Stripe('pk_live_51MpAI4Izs7AFWKq4fDBwXMnz91uIM1Cw5Svlpu6bdmrOGEsG7YY1hoJyaCKRVlyoyNvhjUtzVI8Zw2ZqT3g4s5Ub00JABGxYAD');
                stripe.redirectToCheckout({ sessionId: session.id });
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        });
    });

    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px" // Adjust to trigger a bit before the item is fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
