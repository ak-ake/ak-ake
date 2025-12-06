// Blog Page Specific JavaScript

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Building 2D Games with HTML5 Canvas",
        category: "game",
        date: "March 15, 2023",
        excerpt: "Learn how to create engaging 2D games using HTML5 Canvas and vanilla JavaScript without any game engines.",
        readTime: "8 min",
        tags: ["JavaScript", "Game Dev", "Canvas"],
        icon: "gamepad",
        featured: true,
        content: "Full article content about building 2D games with HTML5 Canvas..."
    },
    {
        id: 2,
        title: "Creating CLI Applications with Node.js",
        category: "tutorial",
        date: "February 28, 2023",
        excerpt: "A guide to building command-line interface applications using Node.js with interactive prompts and commands.",
        readTime: "10 min",
        tags: ["Node.js", "CLI", "JavaScript"],
        icon: "terminal",
        featured: false,
        content: "Full article content about creating CLI applications with Node.js..."
    },
    {
        id: 3,
        title: "Python for Game Development",
        category: "game",
        date: "January 10, 2023",
        excerpt: "Exploring how Python can be used for game development, from text-based adventures to 2D games with Pygame.",
        readTime: "12 min",
        tags: ["Python", "Game Dev", "Pygame"],
        icon: "python",
        featured: false,
        content: "Full article content about Python for game development..."
    },
    {
        id: 4,
        title: "Modern CSS Techniques for Dark Themes",
        category: "web",
        date: "December 5, 2022",
        excerpt: "Advanced CSS techniques for creating beautiful and accessible dark themes in web applications.",
        readTime: "7 min",
        tags: ["CSS", "Web Dev", "Design"],
        icon: "palette",
        featured: false,
        content: "Full article content about modern CSS techniques..."
    },
    {
        id: 5,
        title: "Optimizing JavaScript Game Performance",
        category: "tips",
        date: "November 20, 2022",
        excerpt: "Tips and techniques for optimizing JavaScript game performance for smooth 60fps gameplay.",
        readTime: "9 min",
        tags: ["JavaScript", "Performance", "Game Dev"],
        icon: "tachometer-alt",
        featured: false,
        content: "Full article content about optimizing JavaScript game performance..."
    },
    {
        id: 6,
        title: "Building RESTful APIs with Node.js and Express",
        category: "web",
        date: "October 15, 2022",
        excerpt: "A comprehensive guide to building robust RESTful APIs using Node.js, Express, and MongoDB.",
        readTime: "15 min",
        tags: ["Node.js", "Express", "API", "MongoDB"],
        icon: "server",
        featured: false,
        content: "Full article content about building RESTful APIs..."
    },
    {
        id: 7,
        title: "Version Control Best Practices for Game Developers",
        category: "tips",
        date: "September 8, 2022",
        excerpt: "Essential Git practices and workflows tailored for game development projects.",
        readTime: "6 min",
        tags: ["Git", "Game Dev", "Best Practices"],
        icon: "code-branch",
        featured: false,
        content: "Full article content about version control best practices..."
    },
    {
        id: 8,
        title: "Building a Portfolio Website from Scratch",
        category: "tutorial",
        date: "August 22, 2022",
        excerpt: "Step-by-step guide to building a responsive portfolio website with modern design and animations.",
        readTime: "11 min",
        tags: ["HTML", "CSS", "JavaScript", "Portfolio"],
        icon: "laptop-code",
        featured: false,
        content: "Full article content about building a portfolio website..."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog posts
    initBlogPosts();
    
    // Initialize filter buttons
    initBlogFilters();
    
    // Initialize load more button
    initLoadMore();
    
    // Initialize blog card animations
    initBlogCardAnimations();
});

// Initialize Blog Posts
function initBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    // Clear existing content
    blogGrid.innerHTML = '';
    
    // Show first 6 posts initially
    const initialPosts = blogPosts.slice(0, 6);
    
    // Render initial posts
    initialPosts.forEach(post => {
        if (!post.featured) { // Don't render featured post in grid (it's already displayed)
            const blogCard = createBlogCard(post);
            blogGrid.appendChild(blogCard);
        }
    });
}

// Create Blog Card Element
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.setAttribute('data-category', post.category);
    card.setAttribute('data-id', post.id);
    
    // Get icon class based on post category
    let iconClass = 'fas fa-file-alt';
    if (post.icon === 'gamepad') iconClass = 'fas fa-gamepad';
    else if (post.icon === 'terminal') iconClass = 'fas fa-terminal';
    else if (post.icon === 'python') iconClass = 'fab fa-python';
    else if (post.icon === 'palette') iconClass = 'fas fa-palette';
    else if (post.icon === 'tachometer-alt') iconClass = 'fas fa-tachometer-alt';
    else if (post.icon === 'server') iconClass = 'fas fa-server';
    else if (post.icon === 'code-branch') iconClass = 'fas fa-code-branch';
    else if (post.icon === 'laptop-code') iconClass = 'fas fa-laptop-code';
    
    // Get category display name
    let categoryName = 'Web Development';
    if (post.category === 'game') categoryName = 'Game Development';
    else if (post.category === 'tutorial') categoryName = 'Tutorial';
    else if (post.category === 'tips') categoryName = 'Tips & Tricks';
    
    card.innerHTML = `
        <div class="blog-image">
            <i class="${iconClass}"></i>
            <div class="image-category">${categoryName}</div>
        </div>
        <div class="blog-content">
            <span class="blog-date">${post.date}</span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-footer">
                <div class="blog-meta">
                    <span class="blog-read-time">
                        <i class="far fa-clock"></i> ${post.readTime} read
                    </span>
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <a href="#" class="blog-read-btn read-article" data-id="${post.id}">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize Blog Filters
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const blogGrid = document.getElementById('blog-grid');
    
    if (!filterButtons.length || !blogGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter blog posts
            filterBlogPosts(filterValue);
        });
    });
}

// Filter Blog Posts by Category
function filterBlogPosts(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    const blogGrid = document.getElementById('blog-grid');
    
    if (!blogCards.length || !blogGrid) return;
    
    // Clear grid
    blogGrid.innerHTML = '';
    
    // Filter and display posts
    let visiblePosts = 0;
    
    blogPosts.forEach(post => {
        if (!post.featured && (category === 'all' || post.category === category)) {
            const blogCard = createBlogCard(post);
            blogGrid.appendChild(blogCard);
            visiblePosts++;
            
            // Add animation with delay
            blogCard.style.animationDelay = `${(visiblePosts % 6) * 0.1}s`;
        }
    });
    
    // Update load more note
    updateLoadMoreNote(visiblePosts, category);
}

// Initialize Load More Button
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreNote = document.querySelector('.load-more-note');
    
    if (!loadMoreBtn || !loadMoreNote) return;
    
    let visiblePosts = 6; // Start with 6 posts visible
    const totalPosts = blogPosts.length - 1; // Subtract featured post
    
    // Update initial note
    loadMoreNote.textContent = `Showing ${visiblePosts} of ${totalPosts} articles`;
    
    loadMoreBtn.addEventListener('click', function() {
        const blogGrid = document.getElementById('blog-grid');
        const activeFilter = document.querySelector('.blog-filters .filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        // Calculate how many more posts to show
        const postsToAdd = Math.min(3, totalPosts - visiblePosts);
        
        if (postsToAdd > 0) {
            // Get posts to add based on current filter
            const filteredPosts = blogPosts.filter(post => {
                if (post.featured) return false;
                if (filterValue === 'all') return true;
                return post.category === filterValue;
            });
            
            // Add next batch of posts
            for (let i = visiblePosts; i < visiblePosts + postsToAdd && i < filteredPosts.length; i++) {
                const post = filteredPosts[i];
                const blogCard = createBlogCard(post);
                blogGrid.appendChild(blogCard);
                
                // Add animation
                blogCard.style.animation = 'fadeInUp 0.6s ease forwards';
                blogCard.style.opacity = '0';
                blogCard.style.animationDelay = '0.1s';
            }
            
            // Update counters
            visiblePosts += postsToAdd;
            
            // Update note
            if (filterValue === 'all') {
                loadMoreNote.textContent = `Showing ${Math.min(visiblePosts, totalPosts)} of ${totalPosts} articles`;
            } else {
                const filteredTotal = blogPosts.filter(post => 
                    !post.featured && post.category === filterValue
                ).length;
                loadMoreNote.textContent = `Showing ${Math.min(visiblePosts, filteredTotal)} of ${filteredTotal} articles`;
            }
            
            // Disable button if all posts are shown
            if (visiblePosts >= totalPosts || 
                (filterValue !== 'all' && visiblePosts >= blogPosts.filter(post => 
                    !post.featured && post.category === filterValue).length)) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Articles Loaded';
                loadMoreBtn.style.opacity = '0.7';
                loadMoreBtn.style.cursor = 'not-allowed';
            }
            
            // Scroll to newly added posts
            setTimeout(() => {
                const lastCard = blogGrid.lastElementChild;
                if (lastCard) {
                    lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        }
    });
}

// Update Load More Note
function updateLoadMoreNote(visibleCount, category) {
    const loadMoreNote = document.querySelector('.load-more-note');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!loadMoreNote || !loadMoreBtn) return;
    
    if (category === 'all') {
        const totalPosts = blogPosts.length - 1; // Subtract featured post
        loadMoreNote.textContent = `Showing ${visibleCount} of ${totalPosts} articles`;
        
        // Reset button state
        loadMoreBtn.disabled = visibleCount >= totalPosts;
        loadMoreBtn.innerHTML = visibleCount >= totalPosts ? 
            '<i class="fas fa-check"></i> All Articles Loaded' : 
            '<i class="fas fa-sync-alt"></i> Load More Articles';
        loadMoreBtn.style.opacity = visibleCount >= totalPosts ? '0.7' : '1';
        loadMoreBtn.style.cursor = visibleCount >= totalPosts ? 'not-allowed' : 'pointer';
    } else {
        const filteredTotal = blogPosts.filter(post => 
            !post.featured && post.category === category
        ).length;
        loadMoreNote.textContent = `Showing ${visibleCount} of ${filteredTotal} articles`;
        
        // Reset button state
        loadMoreBtn.disabled = visibleCount >= filteredTotal;
        loadMoreBtn.innerHTML = visibleCount >= filteredTotal ? 
            '<i class="fas fa-check"></i> All Articles Loaded' : 
            '<i class="fas fa-sync-alt"></i> Load More Articles';
        loadMoreBtn.style.opacity = visibleCount >= filteredTotal ? '0.7' : '1';
        loadMoreBtn.style.cursor = visibleCount >= filteredTotal ? 'not-allowed' : 'pointer';
    }
}

// Initialize Blog Card Animations
function initBlogCardAnimations() {
    // Handle read article button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.read-article')) {
            e.preventDefault();
            const postId = e.target.closest('.read-article').getAttribute('data-id');
            const post = blogPosts.find(p => p.id == postId);
            
            if (post) {
                showArticleModal(post);
            }
        }
    });
    
    // Add hover effect to blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
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
                perspective(1000px)
            `;
            
            // Add glow effect
            const image = card.querySelector('.blog-image');
            if (image) {
                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                image.style.background = `
                    radial-gradient(
                        circle at ${glowX}% ${glowY}%,
                        rgba(124, 58, 237, 0.3),
                        var(--dark-light) 70%
                    )
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
            
            // Reset background
            const image = card.querySelector('.blog-image');
            if (image) {
                image.style.background = 'linear-gradient(135deg, var(--dark-light), var(--darker))';
            }
        });
    });
}

// Show Article Modal
function showArticleModal(post) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('article-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'article-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="article-modal-title"></h3>
                    <button class="modal-close" id="article-modal-close">&times;</button>
                </div>
                <div class="modal-body" id="article-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles if not already present
        if (!document.querySelector('#article-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'article-modal-styles';
            style.textContent = `
                #article-modal .modal-content {
                    max-width: 900px;
                }
                
                .article-content {
                    line-height: 1.8;
                }
                
                .article-content h2 {
                    margin: 30px 0 15px;
                    color: var(--light);
                }
                
                .article-content p {
                    margin-bottom: 20px;
                    color: var(--gray);
                }
                
                .article-content code {
                    background: rgba(30, 41, 59, 0.8);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.9rem;
                    color: var(--secondary);
                }
                
                .article-content pre {
                    background: var(--darker);
                    padding: 20px;
                    border-radius: var(--border-radius);
                    overflow-x: auto;
                    margin: 20px 0;
                    border: 1px solid rgba(124, 58, 237, 0.2);
                }
                
                .article-meta-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Initialize modal close functionality
        const modalClose = document.getElementById('article-modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Get modal elements
    const modalTitle = document.getElementById('article-modal-title');
    const modalBody = document.getElementById('article-modal-body');
    
    // Get category display name
    let categoryName = 'Web Development';
    if (post.category === 'game') categoryName = 'Game Development';
    else if (post.category === 'tutorial') categoryName = 'Tutorial';
    else if (post.category === 'tips') categoryName = 'Tips & Tricks';
    
    // Set modal content
    modalTitle.textContent = post.title;
    
    modalBody.innerHTML = `
        <div class="article-content">
            <div class="article-header" style="margin-bottom: 30px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 15px;">
                    <span style="background: rgba(124, 58, 237, 0.1); color: var(--primary); padding: 8px 16px; border-radius: 30px; font-size: 0.9rem; font-weight: 600;">
                        ${categoryName}
                    </span>
                    <span style="color: var(--secondary); font-family: 'JetBrains Mono', monospace;">
                        ${post.date}
                    </span>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    ${post.tags.map(tag => `
                        <span style="background: rgba(30, 41, 59, 0.8); color: var(--gray); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <p style="font-size: 1.1rem; color: var(--light); margin-bottom: 30px;">
                ${post.excerpt}
            </p>
            
            <h2>Introduction</h2>
            <p>This is a sample article content. In a real blog application, this would contain the full article text, images, code examples, and other content.</p>
            
            <h2>Main Content</h2>
            <p>Here's an example of a code block that might appear in a technical article:</p>
            
            <pre><code>
// Example JavaScript code for game loop
function gameLoop(timestamp) {
    // Calculate delta time
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Update game state
    update(deltaTime);
    
    // Render game
    render();
    
    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
            </code></pre>
            
            <p>This article would continue with more detailed explanations, examples, and best practices related to the topic.</p>
            
            <div class="article-meta-footer">
                <div>
                    <span style="color: var(--gray); font-size: 0.9rem;">
                        <i class="far fa-clock"></i> ${post.readTime} read
                    </span>
                </div>
                <div>
                    <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">
                        <i class="far fa-bookmark"></i> Bookmark
                    </button>
                    <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem; margin-left: 10px;">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Add search functionality (optional)
function initBlogSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search articles...';
    searchInput.id = 'blog-search';
    
    // Add styles
    searchInput.style.cssText = `
        display: block;
        width: 100%;
        max-width: 400px;
        margin: 0 auto 40px;
        padding: 12px 20px;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(124, 58, 237, 0.2);
        border-radius: 30px;
        color: var(--light);
        font-size: 1rem;
        outline: none;
        transition: var(--transition);
    `;
    
    // Insert after blog filters
    const blogFilters = document.querySelector('.blog-filters');
    if (blogFilters) {
        blogFilters.parentNode.insertBefore(searchInput, blogFilters.nextSibling);
    }
    
    // Add search functionality
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        const blogGrid = document.getElementById('blog-grid');
        
        if (!blogGrid || !searchTerm) {
            // Reset to filtered view
            const activeFilter = document.querySelector('.blog-filters .filter-btn.active');
            const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            filterBlogPosts(filterValue);
            return;
        }
        
        // Clear grid
        blogGrid.innerHTML = '';
        
        // Search in posts
        let visiblePosts = 0;
        
        blogPosts.forEach(post => {
            if (!post.featured) {
                const searchContent = post.title.toLowerCase() + ' ' + 
                                     post.excerpt.toLowerCase() + ' ' + 
                                     post.tags.join(' ').toLowerCase();
                
                if (searchContent.includes(searchTerm)) {
                    const blogCard = createBlogCard(post);
                    blogGrid.appendChild(blogCard);
                    visiblePosts++;
                    
                    // Add animation with delay
                    blogCard.style.animationDelay = `${(visiblePosts % 6) * 0.1}s`;
                }
            }
        });
        
        // Update load more note
        const loadMoreNote = document.querySelector('.load-more-note');
        if (loadMoreNote) {
            loadMoreNote.textContent = `Found ${visiblePosts} articles matching "${searchTerm}"`;
        }
        
        // Hide load more button during search
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }, 300));
    
    // Clear search and show load more button when empty
    searchInput.addEventListener('search', function() {
        if (!this.value) {
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'block';
            }
            
            // Reset to filtered view
            const activeFilter = document.querySelector('.blog-filters .filter-btn.active');
            const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            filterBlogPosts(filterValue);
        }
    });
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize search on load (optional)
window.addEventListener('load', () => {
    // Uncomment to enable search
    // initBlogSearch();
    
    // Add floating animation to featured article icon
    const featuredIcon = document.querySelector('.featured-image i');
    if (featuredIcon) {
        featuredIcon.style.animation = 'float 6s ease-in-out infinite';
    }
});