// Projects Page Specific JavaScript

// Sample projects data - In a real app, this would come from an API/database
const projectsData = [
    {
        id: 1,
        title: "2D Platformer Adventure",
        category: "game",
        description: "A JavaScript-based 2D platformer game with HTML5 Canvas featuring multiple levels, enemies, and power-ups.",
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3"],
        github: "https://github.com/ak-ake/platformer-game",
        liveDemo: "https://ak-ake.github.io/platformer-game",
        icon: "gamepad",
        featured: true,
        details: "This game features smooth animations, collision detection, and a level editor. Built with vanilla JavaScript for optimal performance."
    },
    {
        id: 2,
        title: "CLI Task Manager",
        category: "cli",
        description: "A Python command-line interface application for managing tasks with categories, priorities, and deadlines.",
        technologies: ["Python", "SQLite", "Click"],
        github: "https://github.com/ak-ake/cli-task-manager",
        liveDemo: null,
        icon: "terminal",
        featured: true,
        details: "Features include task categorization, priority levels, deadline tracking, and data persistence with SQLite."
    },
    {
        id: 3,
        title: "Portfolio Website",
        category: "web",
        description: "A responsive portfolio website with 3D animations and dark theme. Built with modern CSS and JavaScript.",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        github: "https://github.com/ak-ake/portfolio",
        liveDemo: "https://akake.dev",
        icon: "globe",
        featured: true,
        details: "This portfolio features 3D animations, responsive design, and interactive elements using vanilla JavaScript."
    },
    {
        id: 4,
        title: "Weather CLI App",
        category: "cli",
        description: "A Node.js command-line application that fetches and displays weather information for any city.",
        technologies: ["Node.js", "Axios", "Chalk"],
        github: "https://github.com/ak-ake/weather-cli",
        liveDemo: null,
        icon: "cloud-sun",
        featured: false,
        details: "Uses OpenWeatherMap API to fetch real-time weather data with colorful CLI output using Chalk library."
    },
    {
        id: 5,
        title: "E-commerce Dashboard",
        category: "web",
        description: "A full-stack e-commerce dashboard with product management, orders, and analytics.",
        technologies: ["Node.js", "Express", "MongoDB", "React"],
        github: "https://github.com/ak-ake/ecommerce-dashboard",
        liveDemo: "https://dashboard.akake.dev",
        icon: "shopping-cart",
        featured: false,
        details: "Complete admin dashboard with real-time analytics, product management, and order processing system."
    },
    {
        id: 6,
        title: "Puzzle Game Collection",
        category: "game",
        description: "A collection of classic puzzle games including Sudoku, Minesweeper, and 2048.",
        technologies: ["JavaScript", "HTML5", "CSS3"],
        github: "https://github.com/ak-ake/puzzle-games",
        liveDemo: "https://ak-ake.github.io/puzzle-games",
        icon: "puzzle-piece",
        featured: false,
        details: "Collection of three classic puzzle games with responsive design and touch support for mobile devices."
    },
    {
        id: 7,
        title: "Desktop Note Taking App",
        category: "app",
        description: "A cross-platform desktop application for note-taking with markdown support and cloud sync.",
        technologies: ["Electron", "React", "Node.js"],
        github: "https://github.com/ak-ake/notes-app",
        liveDemo: null,
        icon: "sticky-note",
        featured: false,
        details: "Markdown editor with real-time preview, tag system, and optional cloud synchronization."
    },
    {
        id: 8,
        title: "API Rate Limiter",
        category: "cli",
        description: "A Node.js middleware for rate limiting API requests with Redis backend.",
        technologies: ["Node.js", "Redis", "Express"],
        github: "https://github.com/ak-ake/api-rate-limiter",
        liveDemo: null,
        icon: "tachometer-alt",
        featured: false,
        details: "Production-ready rate limiter with sliding window algorithm and Redis for distributed systems."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects
    initProjects();
    
    // Initialize filter buttons
    initProjectFilters();
    
    // Initialize modal
    initProjectModal();
    
    // Initialize add project button (demo)
    initAddProjectDemo();
});

// Initialize Projects Grid
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Render all projects initially
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create Project Card Element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.featured ? 'featured' : ''}`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);
    
    // Get icon class based on project category
    let iconClass = 'fas fa-code';
    if (project.icon === 'gamepad') iconClass = 'fas fa-gamepad';
    else if (project.icon === 'terminal') iconClass = 'fas fa-terminal';
    else if (project.icon === 'globe') iconClass = 'fas fa-globe';
    else if (project.icon === 'cloud-sun') iconClass = 'fas fa-cloud-sun';
    else if (project.icon === 'shopping-cart') iconClass = 'fas fa-shopping-cart';
    else if (project.icon === 'puzzle-piece') iconClass = 'fas fa-puzzle-piece';
    else if (project.icon === 'sticky-note') iconClass = 'fas fa-sticky-note';
    else if (project.icon === 'tachometer-alt') iconClass = 'fas fa-tachometer-alt';
    
    // Get category display name
    let categoryName = 'Web Development';
    if (project.category === 'game') categoryName = 'Game Development';
    else if (project.category === 'app') categoryName = 'App Development';
    else if (project.category === 'cli') categoryName = 'CLI Tools';
    
    card.innerHTML = `
        <div class="project-image">
            <i class="${iconClass}"></i>
            <div class="image-overlay"></div>
        </div>
        <div class="project-content">
            <div class="project-header">
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${categoryName}</span>
                </div>
                ${project.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-actions">
                <button class="project-btn btn-view view-details" data-id="${project.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                ${project.github ? `
                    <a href="${project.github}" target="_blank" class="project-btn btn-github">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Initialize Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!filterButtons.length || !projectsGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

// Filter Projects by Category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectCards.length || !projectsGrid) return;
    
    // Reorder projects grid to show filtered projects first
    const filteredProjects = [];
    const otherProjects = [];
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            filteredProjects.push(card);
        } else {
            otherProjects.push(card);
        }
    });
    
    // Clear grid
    projectsGrid.innerHTML = '';
    
    // Add filtered projects first
    filteredProjects.forEach(card => {
        projectsGrid.appendChild(card);
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    // Add other projects (hidden)
    otherProjects.forEach(card => {
        card.style.display = 'none';
    });
}

// Initialize Project Modal
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalClose) return;
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle view details button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.view-details')) {
            const projectId = e.target.closest('.view-details').getAttribute('data-id');
            const project = projectsData.find(p => p.id == projectId);
            
            if (project) {
                showProjectModal(project);
            }
        }
    });
}

// Show Project Modal with Details
function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    // Get category display name
    let categoryName = 'Web Development';
    if (project.category === 'game') categoryName = 'Game Development';
    else if (project.category === 'app') categoryName = 'App Development';
    else if (project.category === 'cli') categoryName = 'CLI Tools';
    
    // Get icon class
    let iconClass = 'fas fa-code';
    if (project.icon === 'gamepad') iconClass = 'fas fa-gamepad';
    else if (project.icon === 'terminal') iconClass = 'fas fa-terminal';
    else if (project.icon === 'globe') iconClass = 'fas fa-globe';
    else if (project.icon === 'cloud-sun') iconClass = 'fas fa-cloud-sun';
    else if (project.icon === 'shopping-cart') iconClass = 'fas fa-shopping-cart';
    else if (project.icon === 'puzzle-piece') iconClass = 'fas fa-puzzle-piece';
    else if (project.icon === 'sticky-note') iconClass = 'fas fa-sticky-note';
    else if (project.icon === 'tachometer-alt') iconClass = 'fas fa-tachometer-alt';
    
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
        <div class="modal-project-content">
            <div class="modal-project-header" style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 3rem; color: var(--primary);">
                    <i class="${iconClass}"></i>
                </div>
                <div>
                    <h4 style="margin: 0 0 5px 0;">${project.title}</h4>
                    <span style="color: var(--secondary); font-weight: 500;">${categoryName}</span>
                </div>
            </div>
            
            <p>${project.details}</p>
            
            <h4>Technologies Used</h4>
            <div class="modal-tech-stack">
                ${project.technologies.map(tech => `
                    <span style="background: rgba(124, 58, 237, 0.1); color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">
                        ${tech}
                    </span>
                `).join('')}
            </div>
            
            <div class="modal-links">
                ${project.liveDemo ? `
                    <a href="${project.liveDemo}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
                
                ${project.github ? `
                    <a href="${project.github}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Initialize Add Project Demo
function initAddProjectDemo() {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!addProjectBtn || !projectsGrid) return;
    
    let projectCounter = projectsData.length;
    
    addProjectBtn.addEventListener('click', function() {
        // Create a new project object
        const newProject = {
            id: ++projectCounter,
            title: "New Project " + projectCounter,
            category: ["game", "web", "app", "cli"][Math.floor(Math.random() * 4)],
            description: "This is a demo project added dynamically. In a real application, you would add projects through a CMS or admin panel.",
            technologies: ["HTML", "CSS", "JavaScript"].sort(() => Math.random() - 0.5).slice(0, 2),
            github: "https://github.com/ak-ake",
            liveDemo: null,
            icon: ["gamepad", "terminal", "globe", "code"][Math.floor(Math.random() * 4)],
            featured: false,
            details: "This project was added dynamically to demonstrate how new projects can be added to the portfolio."
        };
        
        // Add to projects data
        projectsData.push(newProject);
        
        // Create and add project card
        const projectCard = createProjectCard(newProject);
        projectsGrid.appendChild(projectCard);
        
        // Add animation
        projectCard.style.animation = 'fadeInUp 0.6s ease forwards';
        projectCard.style.opacity = '0';
        
        // Scroll to the new project
        setTimeout(() => {
            projectCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Show success message
        showNotification('New project added successfully!', 'success');
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        box-shadow: var(--shadow);
        z-index: 1002;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button event
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize project cards hover effect
function initProjectCardsHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initProjectCardsHover();
    
    // Add some visual effects to project cards
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(image => {
        // Add gradient animation
        image.style.background = `
            linear-gradient(
                135deg,
                var(--dark-light) 0%,
                var(--darker) 50%,
                rgba(124, 58, 237, 0.1) 100%
            )
        `;
        
        // Add pulsing animation to icons
        const icon = image.querySelector('i');
        if (icon) {
            icon.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
});