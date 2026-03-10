// ===========================
// Contact Form Handling
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the data to a server
                console.log('Form submitted with data:', formData);
                
                // Example: Send to server
                // sendFormData(formData);
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        if (!data.firstName || !data.lastName) {
            alert('Veuillez renseigner votre nom et prénom');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            alert('Veuillez renseigner une adresse email valide');
            return false;
        }
        
        if (!data.service) {
            alert('Veuillez sélectionner un service');
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            alert('Veuillez rédiger un message d\'au moins 10 caractères');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success message
    function showSuccessMessage() {
        // Create success message element if it doesn't exist
        let successMsg = document.querySelector('.success-message');
        
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <strong>✓ Message envoyé avec succès!</strong><br>
                Nous vous répondrons dans les plus brefs délais.
            `;
            contactForm.insertBefore(successMsg, contactForm.firstChild);
        }
        
        successMsg.classList.add('show');
        
        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
    
    // Example function to send data to server
    /*
    async function sendFormData(data) {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showSuccessMessage();
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    }
    */
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
// Input Focus Effects
// ===========================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
});
