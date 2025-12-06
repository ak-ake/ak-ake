// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animations
    initTimeline();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Avatar hover effect
    initAvatarEffect();
});

// Timeline Animation
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Skill Bars Animation (if you add skill bars later)
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length === 0) {
        // Create skill bars if they don't exist
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const skillList = category.querySelector('.skill-list');
            const skills = skillList.querySelectorAll('li');
            
            skills.forEach(skill => {
                // Add a progress bar for each skill (optional)
                const skillName = skill.textContent;
                const progress = document.createElement('div');
                progress.className = 'skill-progress';
                progress.innerHTML = `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.random() * 50 + 50}%"></div>
                    </div>
                `;
                
                // Append progress bar if you want to show skill levels
                // skill.appendChild(progress);
            });
        });
    }
    
    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                const width = progressFill.style.width;
                progressFill.style.width = '0';
                
                setTimeout(() => {
                    progressFill.style.transition = 'width 1.5s ease-in-out';
                    progressFill.style.width = width;
                }, 300);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Avatar Hover Effect
function initAvatarEffect() {
    const avatar = document.querySelector('.avatar');
    const avatarGlow = document.querySelector('.avatar-glow');
    
    if (!avatar || !avatarGlow) return;
    
    avatar.addEventListener('mouseenter', () => {
        avatar.style.transform = 'scale(1.1) rotate(5deg)';
        avatarGlow.style.opacity = '0.5';
        avatarGlow.style.transform = 'translate(-50%, -50%) scale(1.15)';
    });
    
    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1) rotate(0deg)';
        avatarGlow.style.opacity = '0.3';
        avatarGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Add interactive dots animation
function initInteractiveDots() {
    const dots = document.querySelectorAll('.dot');
    const container = document.querySelector('.about-image');
    
    if (!container) return;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            const dotX = dotRect.left - rect.left + dotRect.width / 2;
            const dotY = dotRect.top - rect.top + dotRect.height / 2;
            
            const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(y - dotY, x - dotX);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                dot.style.transform = 'translate(0, 0)';
            }
        });
    });
    
    container.addEventListener('mouseleave', () => {
        dots.forEach(dot => {
            dot.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initInteractiveDots();
    
    // Add particle effect to about page
    createAboutParticles();
});

// Create particle effect for about page
function createAboutParticles() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('about-particle');
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(6, 182, 212, 0.3)'};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: 0;
            animation: float-about ${duration}s linear infinite ${delay}s;
            pointer-events: none;
            z-index: 0;
        `;
        
        aboutSection.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-about {
            0% {
                transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}