document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize AOS Library ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: false,
            mirror: true,
            disable: 'mobile'
        });
    } else {
        console.warn("AOS library not loaded. Scroll animations disabled.");
    }

    // --- Khởi tạo Lucide Icons ---
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
    const themeToggle = document.getElementById('toggle-dark');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            if (themeToggle) themeToggle.checked = true;
            updateParticlesColor('#ffffff');
        } else {
            body.classList.remove('dark');
            if (themeToggle) themeToggle.checked = false;
            updateParticlesColor('#333333');
        }
        // Refresh AOS animations when theme changes
        if (typeof AOS !== 'undefined') {
            setTimeout(() => { AOS.refresh(); }, 300);
        }
    };

    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add theme change animation to container
            const container = document.querySelector('.container.glass');
            container.classList.add('theme-transition');
            setTimeout(() => {
                container.classList.remove('theme-transition');
            }, 500);
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
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                // Add a subtle animation after typing completes
                cursor.classList.add('blinking');
            }
        }
        setTimeout(type, 300); // Start after a brief delay
    }

    // --- ParticlesJS Initialization with theme-aware colors ---
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
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: particlesColor },
                shape: { 
                    type: "circle",
                    stroke: { width: 0, color: "#000000" }
                },
                opacity: {
                    value: 0.4,
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
                    outModes: { default: "out" },
                    attract: { enable: false }
                },
                links: {
                    enable: true,
                    distance: 140,
                    color: particlesColor,
                    opacity: 0.2,
                    width: 1,
                    triangles: { enable: false, opacity: 0.1 }
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.5 } },
                    push: { quantity: 4 },
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

    // --- Add micro-interactions to links ---
    const links = document.querySelectorAll('.links a');
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