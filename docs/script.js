// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D cubes animation
    initFloatingCubes();
    
    // Code typing animation
    initCodeAnimation();
    
    // Project cards hover effect
    initProjectCards();
});

// 3D Floating Cubes Animation
function initFloatingCubes() {
    const cubes = document.querySelectorAll('.floating-cube');
    
    cubes.forEach((cube, index) => {
        // Add random rotation and scale
        cube.style.transform = `
            perspective(1000px) 
            rotateX(${Math.random() * 20 - 10}deg)
            rotateY(${Math.random() * 20 - 10}deg)
            scale(${0.8 + Math.random() * 0.4})
        `;
        
        // Add random animation delay
        cube.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect
        cube.addEventListener('mouseenter', () => {
            cube.style.transform = `
                perspective(1000px) 
                rotateX(${Math.random() * 30 - 15}deg)
                rotateY(${Math.random() * 30 - 15}deg)
                scale(${1.1})
            `;
            cube.style.transition = 'transform 0.3s ease';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.transform = `
                perspective(1000px) 
                rotateX(${Math.random() * 20 - 10}deg)
                rotateY(${Math.random() * 20 - 10}deg)
                scale(${0.8 + Math.random() * 0.4})
            `;
        });
    });
}

// Code Typing Animation
function initCodeAnimation() {
    const codeContent = document.querySelector('.code-content');
    if (!codeContent) return;
    
    const originalHTML = codeContent.innerHTML;
    codeContent.innerHTML = '';
    codeContent.style.opacity = '1';
    
    // Split the code into lines
    const lines = originalHTML.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    let typingInterval;
    
    function typeCode() {
        if (currentLine < lines.length) {
            if (currentChar < lines[currentLine].length) {
                const char = lines[currentLine].charAt(currentChar);
                const span = document.createElement('span');
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                
                // Preserve original span classes
                const match = lines[currentLine].substring(currentChar).match(/^<span class="([^"]*)">/);
                if (match) {
                    span.className = match[1];
                    currentChar += match[0].length;
                    typeCode();
                    return;
                }
                
                // Handle closing span tags
                if (lines[currentLine].substring(currentChar, currentChar + 7) === '</span>') {
                    currentChar += 7;
                    typeCode();
                    return;
                }
                
                codeContent.appendChild(span);
                currentChar++;
                
                // Random typing speed for more natural effect
                typingInterval = setTimeout(typeCode, Math.random() * 50 + 10);
            } else {
                // Move to next line
                codeContent.appendChild(document.createElement('br'));
                currentLine++;
                currentChar = 0;
                typingInterval = setTimeout(typeCode, 100);
            }
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeCode, 1000);
    
    // Pause/Resume on hover
    codeContent.parentElement.addEventListener('mouseenter', () => {
        clearTimeout(typingInterval);
    });
    
    codeContent.parentElement.addEventListener('mouseleave', () => {
        if (currentLine < lines.length) {
            typingInterval = setTimeout(typeCode, 100);
        }
    });
}

// Project Cards Animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card.featured');
    
    projectCards.forEach(card => {
        // Add parallax effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Add particle effect for hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float-particle ${duration}s linear infinite ${delay}s;
            pointer-events: none;
        `;
        
        heroSection.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: ${Math.random() * 0.3 + 0.1};
            }
            90% {
                opacity: ${Math.random() * 0.3 + 0.1};
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles on load
window.addEventListener('load', createParticles);