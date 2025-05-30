document.addEventListener('DOMContentLoaded', () => {
    // --- Page Loading Animation ---
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
                // Run intro animations after page loads
                runIntroAnimations();
            }, 500);
        }, 1000);
    }

    // --- Initialize AOS Library ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            mirror: false,
            disable: window.innerWidth < 768 ? true : false
        });
    } else {
        console.warn("AOS library not loaded. Scroll animations disabled.");
    }

    // --- Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        try {
            lucide.createIcons();
        } catch (error) {
             console.error("Error creating Lucide icons:", error);
        }
    } else {
        console.error("Lucide library not loaded.");
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            if (themeToggle) themeToggle.querySelector('i').setAttribute('name', 'sun');
            updateParticlesColor('#ffffff');
        } else {
            body.classList.remove('dark');
            if (themeToggle) themeToggle.querySelector('i').setAttribute('name', 'moon');
            updateParticlesColor('#333333');
        }
        // Store user preference
        localStorage.setItem('theme', theme);
        
        // Refresh animations when theme changes
        if (typeof AOS !== 'undefined') {
            setTimeout(() => { AOS.refresh(); }, 300);
        }
    };

    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDark) {
        applyTheme('dark');    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Add theme change animation to container
            const container = document.querySelector('.container.glass');
            if (container) {
                container.classList.add('theme-transition');
                setTimeout(() => {
                    container.classList.remove('theme-transition');
                }, 500);
            }
            
            // Create a ripple effect on the theme toggle
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            themeToggle.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    }

    // --- Navigation Menu Logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // --- Typewriter Effect with Enhanced Blinking Cursor ---
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
        const text = typewriterElement.getAttribute("data-text") || "";
        typewriterElement.textContent = '';
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '|';
        typewriterElement.after(cursor);

        let i = 0;
        function type() {
            if (i < text.length) {                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                // Add a subtle animation after typing completes
                cursor.classList.add('blinking');
            }
        }
        setTimeout(type, 1000); // Start after a brief delay for page load
    }
    
    // --- Rotating Text Effect ---
    const rotatingItems = document.querySelectorAll('.rotating-text-item');
    if (rotatingItems.length > 1) {
        let currentIndex = 0;
        
        setInterval(() => {
            rotatingItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % rotatingItems.length;
            rotatingItems[currentIndex].classList.add('active');
        }, 3000);
    }
    
    // --- Initialize VanillaTilt for 3D effects ---
    const tiltElements = document.querySelectorAll('.tilt-element');
    if (typeof VanillaTilt !== 'undefined' && tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }
      // --- Initialize Swiper for Project Slider ---
    if (typeof Swiper !== 'undefined') {
        const projectsSwiper = new Swiper('.projects-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            grabCursor: true,            keyboard: {
                enabled: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
        
        // Notebook slider for AI learning section
        const notebookSwiper = new Swiper('.notebooks-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
    
    // --- Tab System Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Refresh AOS animations in the newly visible tab
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => {
                        AOS.refresh();
                    }, 100);
                }
                
                // Reinitialize tilt elements in the new tab
                if (typeof VanillaTilt !== 'undefined') {
                    const newTiltElements = activeContent.querySelectorAll('.tilt-element');
                    if (newTiltElements.length > 0) {
                        VanillaTilt.init(newTiltElements, {
                            max: 15,
                            speed: 400,
                            glare: true,
                            "max-glare": 0.3
                        });
                    }
                }
            }
        });
    });
    
    // --- Skills Rating Animation ---
    const skillRatings = document.querySelectorAll('.skill-rating-fill');
    
    const animateSkills = () => {
        skillRatings.forEach(rating => {
            const percent = rating.getAttribute('data-percent') || "0";
            rating.style.width = `${percent}%`;
        });
    };
    
    // Use Intersection Observer to trigger skill animations
    if ('IntersectionObserver' in window) {
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(skillsSection);
        }    } else {
        // Fallback for browsers without Intersection Observer
        setTimeout(animateSkills, 1000);
    }
    
    // --- Link Filter System ---
    const linkItems = document.querySelectorAll('.link-item');
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.getElementById('link-search');
    
    // Filter function
    function filterLinks(category) {
        linkItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Search function
    function searchLinks(term) {
        const normalizedTerm = term.toLowerCase().trim();
        
        linkItems.forEach(item => {
            const title = item.querySelector('.link-title').textContent.toLowerCase();
            const description = item.querySelector('.link-description').textContent.toLowerCase();
            
            if (title.includes(normalizedTerm) || description.includes(normalizedTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Apply filter on button click
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterLinks(button.getAttribute('data-filter'));
            
            // Clear search when filtering
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
    
    // Apply search on input
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value;
            if (searchTerm.length > 0) {
                searchLinks(searchTerm);
                filterButtons.forEach(btn => btn.classList.remove('active'));
                filterButtons[0].classList.add('active'); // 'All' button should be first
            } else {
                // If search is cleared, show all links
                filterLinks('all');
            }
        });
    }
    
    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show a success message
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // --- Toast Notification System ---
    function showToast(message, type = 'info', duration = 3000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        
        // Create content
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : 
                                         type === 'error' ? 'alert-circle' : 
                                         type === 'warning' ? 'alert-triangle' : 'info');
        
        const content = document.createElement('div');
        content.classList.add('toast-content');
        content.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('toast-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            toast.classList.add('toast-hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Assemble toast
        toast.appendChild(icon);
        toast.appendChild(content);
        toast.appendChild(closeBtn);
        
        // Add to document
        const toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.classList.add('toast-container');
            document.body.appendChild(container);
            container.appendChild(toast);
        } else {
            toastContainer.appendChild(toast);
        }
        
        // Initialize the icon
        if (typeof lucide !== 'undefined') {            lucide.createIcons({
                elements: [icon]
            });
        }
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('toast-visible');
        }, 10);
        
        // Auto dismiss
        setTimeout(() => {
            toast.classList.add('toast-hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);        }, duration);
    }
    
    // --- Tab System for AI Learning Section ---
    const setupTabs = () => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        if (tabBtns.length === 0) return;
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                
                // Update button states
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content visibility
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabName) {
                        content.classList.add('active');
                    }
                });
                
                // Refresh AOS animations
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => { AOS.refresh(); }, 100);
                }
            });
        });
    };
      setupTabs();

    // --- Newsletter Subscription Logic ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            
            if (!email || !validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just show a success message
            showToast('Thanks for subscribing!', 'success');
            newsletterForm.reset();
        });
    }
    
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Smooth scroll to element
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.nav-toggle')?.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // --- GSAP Animations ---
    if (typeof gsap !== 'undefined') {
        // Banner text reveal animation
        const homeBanner = document.querySelector('.profile');
        if (homeBanner) {
            gsap.from('.profile h1', { 
                duration: 1.2, 
                y: 30, 
                opacity: 0, 
                ease: 'power3.out',
                delay: 1.2
            });
            
            gsap.from('.profile .tagline', { 
                duration: 1.2, 
                y: 30, 
                opacity: 0, 
                ease: 'power3.out',
                delay: 1.5
            });
            
            gsap.from('.profile-actions', { 
                duration: 1, 
                y: 20, 
                opacity: 0, 
                ease: 'power3.out',
                delay: 1.8
            });
        }
        
        // ScrollTrigger animations
        if (typeof ScrollTrigger !== 'undefined') {
            // Animate section headers on scroll
            gsap.utils.toArray('section > h2').forEach(header => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out"
                });
            });
            
            // Staggered card animations
            gsap.utils.toArray('.card-container').forEach(container => {
                const cards = container.querySelectorAll('.card');
                if (cards.length > 0) {
                    gsap.from(cards, {
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        duration: 0.6,
                        y: 30,
                        opacity: 0,
                        stagger: 0.1,
                        ease: "power3.out"
                    });
                }
            });
        }
    }

    // --- ParticlesJS Initialization with theme-aware colors ---
    function initializeParticles() {
        if (typeof tsParticles !== 'undefined') {
            tsParticles.load("particles-js", {
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: document.body.classList.contains('dark') ? "#ffffff" : "#333333"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: document.body.classList.contains('dark') ? "#ffffff" : "#333333",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Initialize particles on page load
    initializeParticles();
    
    // Helper function to update particle colors
    function updateParticlesColor(color) {
        if (typeof tsParticles !== 'undefined') {
            const particles = tsParticles.domItem(0);
            if (particles) {
                particles.options.particles.color.value = color;
                particles.options.particles.line_linked.color = color;
            }
        }
    }
      // --- Scroll active nav highlight ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Throttle function to limit execution rate
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Update active nav link based on scroll position
    const highlightNavOnScroll = throttle(() => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
              if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // --- Run intro animations function ---
    function runIntroAnimations() {
        // Add entrance animations to the page
        const avatar = document.querySelector('.avatar-container');
        if (avatar) {
            avatar.classList.add('animated');
        }
        
        const profileText = document.querySelector('.profile h1');
        if (profileText) {
            profileText.classList.add('animated');
        }
    }
    
    // --- Initialize AOS on images after they load ---
    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    });
    
    // --- Handle window resize events ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        document.body.classList.add('resize-animation-stopper');
        
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
            
            // Refresh AOS on resize
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 400);
    });
    const particlesElement = document.getElementById('particles-js');

    function updateParticlesColor(color) {
        if (window.tsParticles && window.tsParticles.domItem(0)) {
            const particles = window.tsParticles.domItem(0);
            if (particles) {
                particles.options.particles.color.value = color;
                particles.options.particles.links.color = color;
                particles.refresh();
            }
        }
    }

    if (particlesElement && typeof tsParticles !== 'undefined') {
        // Set default color based on theme
        const particlesColor = body.classList.contains('dark') ? '#ffffff' : '#333333';
        
        tsParticles.load("particles-js", {
            fullScreen: { enable: false },
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: particlesColor },
                shape: { 
                    type: ["circle", "triangle", "polygon"],
                    stroke: { width: 0, color: "#000000" }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
                },
                size: { 
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: { default: "bounce" },
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: particlesColor,
                    opacity: 0.3,
                    width: 1,
                    triangles: { enable: false, opacity: 0.1 }
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: { enable: true, mode: "bubble" },
                    onClick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.5 } },
                    bubble: { 
                        distance: 150, 
                        size: 6, 
                        duration: 1, 
                        opacity: 0.8 
                    },
                    push: { quantity: 3 },
                    repulse: { distance: 100, duration: 0.4 }
                }
            },
            detectRetina: true
        }).catch(error => {
             console.error("Error loading tsParticles:", error);
        });
    } else if (!particlesElement) {
         console.error("Particles container #particles-js not found.");
    } else if (typeof tsParticles === 'undefined') {
         console.warn("tsParticles library not loaded. Skipping particle effects.");
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    
    const scrollFunction = () => {
        if (document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };
    
    // Only add event listeners if the button exists
    if (backToTopButton) {
        window.addEventListener('scroll', scrollFunction);
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Link Preview on Scroll ---
    const links = document.querySelectorAll('.links a');
    const linkPreviews = document.querySelectorAll('.link-preview');
    let currentVisiblePreview = null;
    let scrollTimeout = null;
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    
    // Show preview for link when scrolled to
    const checkLinkInView = () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Determine scroll direction
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;
        
        // Only process if we've stopped scrolling briefly
        scrollTimeout = setTimeout(() => {
            links.forEach(link => {
                const rect = link.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.top <= window.innerHeight / 2 && 
                    rect.bottom <= window.innerHeight
                );
                
                if (isVisible) {
                    // If this is a different link than the one already showing a preview
                    if (currentVisiblePreview && currentVisiblePreview.parentElement !== link) {
                        // Hide the previous preview
                        currentVisiblePreview.style.opacity = '0';
                        currentVisiblePreview.style.visibility = 'hidden';
                        currentVisiblePreview = null;
                    }
                    
                    // Show this link's preview
                    const preview = link.querySelector('.link-preview');
                    if (preview && preview !== currentVisiblePreview) {
                        preview.style.opacity = '1';
                        preview.style.visibility = 'visible';
                        preview.style.transform = 'translateX(-50%) translateY(0)';
                        currentVisiblePreview = preview;
                        
                        // Auto-hide preview after 3 seconds
                        setTimeout(() => {
                            if (currentVisiblePreview === preview) {
                                preview.style.opacity = '0';
                                preview.style.visibility = 'hidden';
                                currentVisiblePreview = null;
                            }
                        }, 3000);
                    }
                }
            });
        }, 150);
    };
    
    // Set up scroll event listener if we have links with previews
    if (links.length > 0) {
        window.addEventListener('scroll', checkLinkInView);
        
        // Add mouse enter/leave events to keep previews visible during hover
        links.forEach(link => {
            const preview = link.querySelector('.link-preview');
            
            link.addEventListener('mouseenter', () => {
                if (preview) {
                    // This will now just enhance the CSS hover effect
                    if (currentVisiblePreview && currentVisiblePreview !== preview) {
                        currentVisiblePreview.style.opacity = '0';
                        currentVisiblePreview.style.visibility = 'hidden';
                    }
                    currentVisiblePreview = preview;
                }
            });
            
            link.addEventListener('mouseleave', () => {
                // Let CSS handle the hiding on mouse leave
                // When mouse leaves, the preview will be hidden via CSS
            });
        });
        
        // Check once on page load after a brief delay
        setTimeout(checkLinkInView, 1000);
    }

    // --- Add micro-interactions to links ---
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Add a subtle animation effect
            link.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    // --- Add hover effect to project cards ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-image i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-image i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // --- Initialize Avatar Click Action ---
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            // Add a fun easter egg animation when avatar is clicked
            avatar.classList.add('spin-animation');
            setTimeout(() => {
                avatar.classList.remove('spin-animation');
            }, 1000);
        });
    }

    // --- Add nice loading effect when page loads ---
    const mainContainer = document.querySelector('.container.glass');
    if (mainContainer) {
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            mainContainer.style.opacity = '1';
            mainContainer.style.transform = 'translateY(0)';
        }, 200);
    }

}); // End of DOMContentLoaded

// --- Add custom CSS animations ---
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes spin-animation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.spin-animation {
    animation: spin-animation 0.8s ease-in-out;
}
.cursor {
    display: inline-block;
    margin-left: 3px;
    opacity: 1;
}
.blinking {
    animation: blink 1s infinite;
}
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
.theme-transition {
    animation: pulse 0.5s ease;
}
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
</style>
`);