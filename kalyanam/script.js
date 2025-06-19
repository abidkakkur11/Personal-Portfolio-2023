// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const rsvpForm = document.getElementById('rsvpForm');
    const secretCodeInput = document.getElementById('secretCode');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.getElementById('closeModal');
    
    // Secret code for invitation confirmation
    const SECRET_CODE = 'ABIDWEDDING';
    
    // Handle form submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredCode = secretCodeInput.value.trim().toUpperCase();
        
        if (enteredCode === SECRET_CODE) {
            // Show success modal
            showModal();
            // Clear the input
            secretCodeInput.value = '';
        } else {
            // Show error (you can customize this)
            showError();
        }
    });
    
    // Function to show modal
    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Play audio after confirmation
        var audio = document.getElementById('weddingAudio');
        audio.currentTime = 0;
        audio.play().catch(function(){});
    }
    
    // Function to hide modal
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Function to show error
    function showError() {
        // Add error styling to input
        secretCodeInput.style.borderColor = '#e74c3c';
        secretCodeInput.style.backgroundColor = '#fdf2f2';
        
        // Shake animation
        secretCodeInput.style.animation = 'shake 0.5s ease-in-out';
        
        // Show error message
        let errorMsg = document.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = `
                color: #e74c3c;
                font-size: 0.9rem;
                margin-top: 10px;
                text-align: center;
                font-weight: 500;
            `;
            rsvpForm.appendChild(errorMsg);
        }
        errorMsg.textContent = 'Invalid secret code. Please try again.';
        
        // Remove error styling after 3 seconds
        setTimeout(() => {
            secretCodeInput.style.borderColor = '#ddd';
            secretCodeInput.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            secretCodeInput.style.animation = '';
            if (errorMsg) {
                errorMsg.remove();
            }
        }, 3000);
    }
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', hideModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });
    
    // Handle video loading error
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('error', function() {
            // If video fails to load, hide the video section or show a fallback
            const videoSection = document.querySelector('.video-section');
            videoSection.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            videoSection.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: white;
                    font-size: 2rem;
                    font-family: 'Dancing Script', cursive;
                    text-align: center;
                    padding: 20px;
                ">
                    Welcome to Abid & Nihala's Wedding
                </div>
            `;
        });
    }
    
    // Smooth scrolling for any anchor links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to video section (optional enhancement)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.video-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Enable parallax on desktop only
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    // Add entrance animations observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated sections
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        observer.observe(el);
    });
    
    // Animate bride and groom images on scroll into view
    const bride = document.querySelector('.bride-image');
    const groom = document.querySelector('.groom-image');
    const imagesSection = document.querySelector('.images-section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight - 100 &&
            rect.bottom > 0
        );
    }

    function animateImages() {
        if (isInViewport(imagesSection)) {
            bride.classList.add('animate');
            groom.classList.add('animate');
            window.removeEventListener('scroll', animateImages);
        }
    }

    window.addEventListener('scroll', animateImages);
    animateImages(); // in case already in view on load

    // Animate names on scroll into view
    const namesSection = document.querySelector('.names-section');
    const brideName = document.querySelector('.bride-name');
    const groomName = document.querySelector('.groom-name');
    const ampersand = document.querySelector('.ampersand');

    function animateNames() {
        if (isInViewport(namesSection)) {
            brideName.classList.add('animate');
            ampersand.classList.add('animate');
            groomName.classList.add('animate');
            window.removeEventListener('scroll', animateNames);
        }
    }
    window.addEventListener('scroll', animateNames);
    animateNames();

    // Animate details (date, location, time) on scroll into view
    const detailsSection = document.querySelector('.details-section');
    const detailItems = document.querySelectorAll('.detail-item');

    function animateDetails() {
        if (isInViewport(detailsSection)) {
            detailItems.forEach((item, idx) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, idx * 120); // staggered effect
            });
            window.removeEventListener('scroll', animateDetails);
        }
    }
    window.addEventListener('scroll', animateDetails);
    animateDetails();
});

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);