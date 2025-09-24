// effects.js
// Handles click particle effect and loading animation
const htmlEl = document.documentElement;

// Click effect (particles) honoring reduced motion
(function(){
    const colorsLight = [
        ['#ff8fab','#ffd9e8'],
        ['#c3e5f7','#ffffff'],
        ['#d8c8f8','#f8b4d9'],
        ['#c5f7e3','#ffffff']
    ];
    const colorsDark = [
        ['#8c5e3c','#b87333'],
        ['#4b3f44','#8c5e3c'],
        ['#2f4f4f','#b87333'],
        ['#3e4a5b','#8c5e3c']
    ];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReduced) return; // respect user preference
    const maxParticles = 14;
    window.addEventListener('pointerdown', (e)=>{
        if(e.button!==0) return;
        const useDark = htmlEl.classList.contains('dark');
        const palette = useDark ? colorsDark : colorsLight;
        for(let i=0;i<maxParticles;i++){
            const el = document.createElement('div');
            el.className = 'click-fx';
            const angle = (Math.PI * 2 * i)/maxParticles + Math.random()*0.5;
            const dist = 40 + Math.random()*50;
            const dx = Math.cos(angle)*dist;
            const dy = Math.sin(angle)*dist;
            const pair = palette[Math.floor(Math.random()*palette.length)];
            el.style.setProperty('--x', e.clientX+'px');
            el.style.setProperty('--y', e.clientY+'px');
            el.style.setProperty('--dx', dx+'px');
            el.style.setProperty('--dy', dy+'px');
            el.style.setProperty('--c1', pair[0]);
            el.style.setProperty('--c2', pair[1]);
            el.style.setProperty('--s', (8+Math.random()*10)+'px');
            document.body.appendChild(el);
            el.addEventListener('animationend', ()=> el.remove());
        }
    });
})();

// Loading animation
function initializeLoadingAnimation() {
    const mainCard = document.querySelector('.glass-card');
    if (mainCard) {
        setTimeout(() => {
            mainCard.classList.remove('loading');
        }, 100);
    }
}
document.addEventListener('DOMContentLoaded', initializeLoadingAnimation);
