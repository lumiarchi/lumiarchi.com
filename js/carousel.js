// Carrousel 8 images - Style ancien avec flèches
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(n) {
    // Gérer le bouclage
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    
    // Masquer toutes les slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Afficher la slide actuelle
    slides[currentSlide].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-play (optionnel - enlève si tu veux seulement les flèches)
let autoPlayInterval = setInterval(() => {
    moveSlide(1);
}, 5000); // Change toutes les 5 secondes

// Pause auto-play au survol
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            moveSlide(1);
        }, 5000);
    });
}

// Navigation clavier (optionnel)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveSlide(-1);
    if (e.key === 'ArrowRight') moveSlide(1);
});
