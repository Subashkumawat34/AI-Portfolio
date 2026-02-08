// ==================== All JavaScript Combined ====================
// ==================== Loading Screen ====================

// Percentage counter animation
function animateCounter() {
    const counter = document.getElementById('loader-count');
    let count = 0;
    const target = 100;
    const duration = 1200; // 1.2 seconds for counting
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
        count += increment;
        if (count < target) {
            counter.textContent = Math.floor(count);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    requestAnimationFrame(updateCounter);
}

// Hide loader after page loads
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    // Start counter animation immediately
    animateCounter();

    // Wait for animations to complete (1.5 seconds total - much faster!)
    setTimeout(() => {
        loader.classList.add('fade-out');

        // Remove from DOM after fade out
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // Reduced from 2800ms to 1500ms
});

// Fallback: hide loader after max 3 seconds even if page hasn't fully loaded
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('fade-out')) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}, 3000); // Reduced from 5000ms to 3000ms



// ==================== Theme Toggle (Dark/Light Mode) ====================

// Theme toggle functionality with localStorage persistence
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Initialize theme on page load
function initTheme() {
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
}

// Toggle theme
function toggleTheme() {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add a subtle animation class
    html.classList.add('theme-transitioning');
    setTimeout(() => {
        html.classList.remove('theme-transitioning');
    }, 300);
}

// Event listeners
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize on load
initTheme();


// ==================== Skills Progress Animation ====================

// Animate skill circles on scroll
function animateSkills() {
    const skillCircles = document.querySelectorAll('.skill-circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const progressCircle = circle.querySelector('.progress-circle');
                const percentageValue = circle.querySelector('.percentage-value');
                const targetPercent = parseInt(circle.getAttribute('data-percent'));

                // Calculate stroke-dashoffset
                const circumference = 2 * Math.PI * 60; // r=60
                const offset = circumference - (targetPercent / 100) * circumference;

                // Animate the circle
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 100);

                // Animate the percentage counter
                let currentPercent = 0;
                const duration = 2000; // 2 seconds
                const increment = targetPercent / (duration / 16); // ~60 fps

                const counter = setInterval(() => {
                    currentPercent += increment;
                    if (currentPercent >= targetPercent) {
                        currentPercent = targetPercent;
                        clearInterval(counter);
                    }
                    percentageValue.textContent = Math.floor(currentPercent);
                }, 16);

                // Unobserve after animation starts
                observer.unobserve(circle);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCircles.forEach(circle => observer.observe(circle));
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateSkills);
} else {
    animateSkills();
}


// ==================== Testimonials Carousel ====================

// Testimonial slider functionality
class TestimonialSlider {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.testimonial-arrow.prev');
        this.nextBtn = document.querySelector('.testimonial-arrow.next');

        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (!this.track || this.totalSlides === 0) return;

        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause on hover
        const container = document.querySelector('.testimonials-container');
        container?.addEventListener('mouseenter', () => this.stopAutoPlay());
        container?.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        // Move track
        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        // Update active card
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); // Change every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TestimonialSlider());
} else {
    new TestimonialSlider();
}


// ==================== Custom Cursor Trail ====================

// Check if device supports custom cursor (not touch)
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');

    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Cursor position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow with easing
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-box, .tech-item, .skill-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Hide custom cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}


// ==================== Three.js 3D Hero Elements ====================

// Check if Three.js is loaded and device has WebGL support
if (typeof THREE !== 'undefined' && window.WebGLRenderingContext) {
    const canvas = document.getElementById('three-canvas');

    if (canvas) {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        // Create geometric shapes
        const geometry1 = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const geometry2 = new THREE.OctahedronGeometry(1);
        const geometry3 = new THREE.IcosahedronGeometry(0.7);

        // Materials with gradients - REDUCED OPACITY for subtlety
        const material1 = new THREE.MeshStandardMaterial({
            color: 0x667eea,
            metalness: 0.7,
            roughness: 0.2,
            wireframe: true,
            opacity: 0.15,  // Much more subtle
            transparent: true
        });

        const material2 = new THREE.MeshStandardMaterial({
            color: 0xf093fb,
            metalness: 0.5,
            roughness: 0.3,
            opacity: 0.12,  // Much more subtle
            transparent: true
        });

        const material3 = new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            metalness: 0.6,
            roughness: 0.2,
            wireframe: true,
            opacity: 0.12,  // Much more subtle
            transparent: true
        });

        // Create meshes - SMALLER SIZE
        const torus = new THREE.Mesh(geometry1, material1);
        const octahedron = new THREE.Mesh(geometry2, material2);
        const icosahedron = new THREE.Mesh(geometry3, material3);

        // Scale down shapes to be less prominent
        torus.scale.set(0.7, 0.7, 0.7);
        octahedron.scale.set(0.6, 0.6, 0.6);
        icosahedron.scale.set(0.6, 0.6, 0.6);

        // Position shapes - MOVED FURTHER FROM CENTER
        torus.position.set(-3, 0.5, -2);
        octahedron.position.set(3, 1.5, -3);
        icosahedron.position.set(1, -2, -3);

        scene.add(torus, octahedron, icosahedron);

        // Lights
        const pointLight = new THREE.PointLight(0x667eea, 1);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(pointLight, ambientLight);

        // Mouse parallax effect
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate shapes
            torus.rotation.x += 0.005;
            torus.rotation.y += 0.01;

            octahedron.rotation.x += 0.01;
            octahedron.rotation.y += 0.005;

            icosahedron.rotation.x += 0.008;
            icosahedron.rotation.z += 0.008;

            // Parallax effect
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}


// Enhanced Portfolio JavaScript with Modern Interactions

/* ==================== Scroll Header Enhancement ==================== */
const header = document.getElementById('header');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ==================== Menu Toggle ==================== */
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x');
});

// Close menu when clicking a menu item
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
});

/* ==================== Active Menu Highlighting ==================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

/* ==================== Smooth Scroll ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ==================== Scroll Reveal Animations ==================== */
/* DISABLED TO ENSURE CONTENT VISIBILITY - Can be re-enabled after testing */
/*
ScrollReveal({
  reset: false,
  distance: '60px',
  duration: 1500,
  delay: 150,
  mobile: true,
  opacity: null, // Don't hide elements initially
  easing: 'ease-out',
  viewFactor: 0.2
});

ScrollReveal().reveal('.left-side', { 
  origin: 'left',
  interval: 200
});

ScrollReveal().reveal('.right-side', { 
  origin: 'right',
  interval: 200
});

ScrollReveal().reveal('.top-side', { 
  origin: 'top',
  interval: 200
});

ScrollReveal().reveal('.bottom-side', { 
  origin: 'bottom',
  interval: 200
});

ScrollReveal().reveal('.heading', { 
  origin: 'top',
  distance: '30px',
  scale: 0.9
});

ScrollReveal().reveal('.timeline-item', { 
  origin: 'bottom',
  interval: 300,
  scale: 0.95
});

ScrollReveal().reveal('.portfolio-box', { 
  origin: 'bottom',
  interval: 200,
  scale: 0.9
});

ScrollReveal().reveal('.tech-item', { 
  origin: 'bottom',
  interval: 150,
  scale: 0.95
});
*/

/* ==================== Typed.js Animation ==================== */
const typed = new Typed('.text-animation span', {
  strings: [
    'Frontend Developer',
    'Backend Developer',
    'MERN Stack Developer',
    'Software Developer'
  ],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

/* ==================== Form Validation & Submission ==================== */
const form = document.querySelector('form');

// Input elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Validation functions
function validateName() {
  const name = fullNameInput.value.trim();
  return name.length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

function validateSubject() {
  return subjectInput.value.trim().length >= 3;
}

function validateMessage() {
  return messageInput.value.trim().length >= 10;
}

// Real-time validation feedback
function addValidationFeedback(input, isValid) {
  if (isValid) {
    input.style.borderColor = 'rgba(34, 197, 94, 0.5)';
  } else if (input.value.length > 0) {
    input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
  } else {
    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  }
}

fullNameInput.addEventListener('blur', () => {
  addValidationFeedback(fullNameInput, validateName());
});

emailInput.addEventListener('blur', () => {
  addValidationFeedback(emailInput, validateEmail());
});

phoneInput.addEventListener('blur', () => {
  addValidationFeedback(phoneInput, validatePhone());
});

subjectInput.addEventListener('blur', () => {
  addValidationFeedback(subjectInput, validateSubject());
});

messageInput.addEventListener('blur', () => {
  addValidationFeedback(messageInput, validateMessage());
});

// Toast notification function
function showToast(message, type = 'success') {
  const backgroundColor = type === 'success'
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      fontSize: '1.6rem',
      borderRadius: '1rem',
      padding: '1.5rem 2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  }).showToast();
}

// Email sending function
function sendEmail() {
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  const emailBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
      <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <p style="margin: 20px 0;"><strong>Full Name:</strong> ${fullName}</p>
        <p style="margin: 20px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 20px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 20px 0;"><strong>Subject:</strong> ${subject}</p>
        <p style="margin: 20px 0;"><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; margin: 10px 0;">
          ${message}
        </p>
      </div>
    </div>
  `;

  Email.send({
    SecureToken: "40b0323c-46a8-4596-a89b-ac42652648b8",
    To: "kumawatking6848@gmail.com",
    From: "kumawatking6848@gmail.com",
    Subject: `Portfolio Contact: ${subject}`,
    Body: emailBody
  }).then(response => {
    if (response === 'OK') {
      showToast('âœ¨ Message sent successfully! I\'ll get back to you soon.', 'success');

      // Reset form with animation
      setTimeout(() => {
        form.reset();
        // Reset border colors
        [fullNameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
          input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
      }, 1000);
    } else {
      showToast('âš ï¸ Failed to send message. Please try again.', 'error');
    }
  }).catch(error => {
    console.error('Email error:', error);
    showToast('âš ï¸ An error occurred. Please try again later.', 'error');
  });
}

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields
  if (!validateName()) {
    showToast('âš ï¸ Please enter a valid full name (letters only)', 'error');
    fullNameInput.focus();
    return;
  }

  if (!validateEmail()) {
    showToast('âš ï¸ Please enter a valid email address', 'error');
    emailInput.focus();
    return;
  }

  if (!validatePhone()) {
    showToast('âš ï¸ Please enter a valid 10-digit phone number', 'error');
    phoneInput.focus();
    return;
  }

  if (!validateSubject()) {
    showToast('âš ï¸ Please enter a subject (minimum 3 characters)', 'error');
    subjectInput.focus();
    return;
  }

  if (!validateMessage()) {
    showToast('âš ï¸ Please enter a message (minimum 10 characters)', 'error');
    messageInput.focus();
    return;
  }

  // All validations passed, send email
  sendEmail();
});

/* ==================== Loading Animation ==================== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

/* ==================== Enhanced Cursor Effect (Optional) ==================== */
// You can uncomment this section for a custom cursor trail effect
/*
const cursor = document.createElement('div');
cursor.classList.add('cursor-dot');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
*/

/* ==================== Console Message ==================== */
console.log(
  '%cðŸš€ Welcome to Subhash Kumawat\'s Portfolio! ',
  'color: #667eea; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
  '%cInterested in the code? Check out my GitHub: https://github.com/Subashkumawat34',
  'color: #00f2fe; font-size: 14px;'
);

/* ==================== Parallax Effect for Background ==================== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const parallaxElements = document.querySelectorAll('.home-img img');

  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

