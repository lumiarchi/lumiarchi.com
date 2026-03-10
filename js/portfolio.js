// ===========================
// Portfolio Filter Functionality
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all items
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Check if item has the selected category
                    if (categories.includes(filterValue)) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
            
            // Re-layout grid after filtering
            setTimeout(rearrangeGrid, 400);
        });
    });
    
    // Rearrange grid after filtering
    function rearrangeGrid() {
        const grid = document.querySelector('.portfolio-grid');
        const visibleItems = Array.from(portfolioItems).filter(item => 
            !item.classList.contains('hidden')
        );
        
        // Reset grid
        grid.style.height = 'auto';
    }
    
    // Click on portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('h3').textContent;
            console.log('Clicked on project:', projectName);
            // You can add modal or navigation logic here
            // For now, it just logs to console
        });
    });
    
    // Smooth scroll to portfolio section if coming from home
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('scrollTo')) {
        const section = document.querySelector('.portfolio-section');
        if (section) {
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// ===========================
// Navbar Scroll Effect
// ===========================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// ===========================
// Counter Animation on Scroll
// ===========================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all portfolio items for scroll animation
document.querySelectorAll('.portfolio-item').forEach(item => {
    observer.observe(item);
});
