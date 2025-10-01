// utils.js
// Utility functions: performance, smooth scroll, analytics, error handling

// Performance optimizations (modern + advanced)
function optimizePerformance() {
    // Lazy load images with IntersectionObserver, fallback to eager if unsupported
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
        });
    }

    // Async font loading (FontFaceSet API)
    if (document.fonts && document.fonts.load) {
        document.fonts.load('1em Inter').then(()=>{
            document.body.classList.add('fonts-loaded');
        });
    }

    // Preconnect to font CDN during idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = 'https://fonts.gstatic.com';
            preconnect.crossOrigin = 'anonymous';
            document.head.appendChild(preconnect);
        });
    }

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);

    // Reduce data usage for users with prefers-reduced-data
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
        document.body.classList.add('reduced-data');
        // Optionally, pause animations, avoid loading heavy assets, etc.
    }
}

// Use requestIdleCallback for non-critical work
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => optimizePerformance());
} else {
    window.addEventListener('DOMContentLoaded', optimizePerformance);
}

// PWA: Show offline/online status
function showNetworkStatus() {
    let statusBar = document.getElementById('network-status-bar');
    if (!statusBar) {
        statusBar = document.createElement('div');
        statusBar.id = 'network-status-bar';
        statusBar.style.position = 'fixed';
        statusBar.style.top = '0';
        statusBar.style.left = '0';
        statusBar.style.width = '100vw';
        statusBar.style.zIndex = '9999';
        statusBar.style.textAlign = 'center';
        statusBar.style.fontSize = '1rem';
        statusBar.style.fontWeight = 'bold';
        statusBar.style.padding = '0.3em 0';
        statusBar.style.transition = 'background 0.3s';
        document.body.appendChild(statusBar);
    }
    function updateStatus() {
        if (navigator.onLine) {
            statusBar.textContent = 'Đã kết nối Internet';
            statusBar.style.background = 'rgba(0,200,100,0.8)';
            statusBar.style.color = '#fff';
            setTimeout(()=>statusBar.style.display='none', 1200);
        } else {
            statusBar.textContent = 'Mất kết nối. Đang dùng offline.';
            statusBar.style.background = 'rgba(200,0,60,0.85)';
            statusBar.style.color = '#fff';
            statusBar.style.display = 'block';
        }
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
}
window.addEventListener('DOMContentLoaded', showNetworkStatus);

// Smooth scrolling for anchor links (native, fallback)
function enableSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                if ('scrollBehavior' in document.documentElement.style) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    target.scrollIntoView();
                }
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', enableSmoothScrolling);


// Web Vitals reporting (modern analytics, async import)
if (window.fetch && window.Promise) {
    import('https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js').then(({webVitals}) => {
        if (window.webVitals) {
            webVitals.getCLS(console.log);
            webVitals.getFID(console.log);
            webVitals.getLCP(console.log);
            webVitals.getINP && webVitals.getINP(console.log);
            webVitals.getTTFB(console.log);
        }
    }).catch(()=>{});
}

// Analytics and performance monitoring (placeholder)
function trackPageView() {
    // Add your analytics code here (e.g., Plausible, Fathom, GA4, etc.)
    if (window.plausible) plausible('pageview');
    console.log('Page view tracked');
}
trackPageView();

// CSP nonce support for dynamic scripts (progressive enhancement)
function addScriptWithNonce(src) {
    const script = document.createElement('script');
    script.src = src;
    if (window.cspNonce) script.nonce = window.cspNonce;
    script.defer = true;
    document.head.appendChild(script);
}

// Progressive enhancement: reduce JS footprint for static users
if (!('fetch' in window && 'Promise' in window)) {
    document.body.classList.add('no-js-features');
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
