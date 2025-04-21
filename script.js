document.addEventListener('DOMContentLoaded', () => {
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
        } else {
            body.classList.remove('dark');
            if (themeToggle) themeToggle.checked = false;
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
        });
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
        const text = typewriterElement.getAttribute("data-text") || "";
        let i = 0;
        typewriterElement.textContent = '';

        function type() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 300); // Start after a brief delay
    }

    // --- ParticlesJS Initialization (Always attempts to load) ---
    const particlesElement = document.getElementById('particles-js');

    if (particlesElement && typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            fullScreen: { enable: false },
            background: { color: { value: "transparent" } },
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
                },
                size: { value: { min: 1, max: 3 }, random: true },
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
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    resize: true
                },
                modes: {
                    repulse: { distance: 80, duration: 0.4 }
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

}); // End of DOMContentLoaded