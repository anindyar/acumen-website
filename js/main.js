// Acumen Labs - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.style.transition = 'all 0.3s ease';
      });

      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  document.querySelectorAll('.service-card, .audience-card, .blog-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Terminal typing effect (optional enhancement)
  const terminalLines = document.querySelectorAll('.terminal-line, .terminal-output');
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // For now, show success message and reset form
      // In production, this would send to a backend or email service
      alert('Thank you for your message! We will get back to you within 24 hours.');
      contactForm.reset();

      // You can also construct a mailto link as fallback
      // const subject = encodeURIComponent(`Inquiry from ${data.name} - ${data.interest || 'General'}`);
      // const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nOrganization: ${data.organization || 'N/A'}\nInterest: ${data.interest || 'N/A'}\n\nMessage:\n${data.message}`);
      // window.location.href = `mailto:anindya@acumenlabs.mu?subject=${subject}&body=${body}`;
    });
  }

  // Load more blog posts (placeholder functionality)
  const loadMoreBtn = document.getElementById('loadMore');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      this.textContent = 'No more posts';
      this.disabled = true;
      this.style.opacity = '0.5';
      this.style.cursor = 'not-allowed';
    });
  }

  // Add active class to current nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Console easter egg
  console.log('%c Acumen Labs ', 'background: linear-gradient(135deg, #14b8a6, #fb923c); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
  console.log('%c AI Consultancy for Dev Teams, Organisations & Government ', 'color: #14b8a6; font-size: 12px;');
  console.log('%c anindya@acumenlabs.co ', 'color: #94a3b8; font-size: 11px;');

  // ========================================
  // Typewriter Quotes Animation
  // ========================================
  const typewriterElement = document.getElementById('typewriter');
  const currentQuoteEl = document.getElementById('current-quote');
  const totalQuotesEl = document.getElementById('total-quotes');
  const progressBar = document.getElementById('progress-bar');
  const lineNumber = document.querySelector('.line-number');

  if (typewriterElement) {
    const quotes = [
      "Technology should be an enabler, not a constraint.",
      "AI isn't about replacing humans—it's about amplifying human potential.",
      "The best AI solutions are pragmatic, scalable, and built for real-world constraints.",
      "Move fast, but with understanding. Speed without strategy is just chaos.",
      "Every organization's AI journey is unique. Cookie-cutter solutions don't work."
    ];

    let currentQuote = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typeSpeed = 40;      // Speed of typing
    const deleteSpeed = 25;    // Speed of deleting
    const pauseTime = 3000;    // Pause after typing complete
    const progressDuration = pauseTime + 500;

    // Update total quotes
    if (totalQuotesEl) totalQuotesEl.textContent = quotes.length;

    function updateLineNumber() {
      if (lineNumber) {
        lineNumber.textContent = String(currentQuote + 1).padStart(2, '0');
      }
    }

    function updateProgress() {
      if (!progressBar) return;

      let progress = 0;
      const startTime = Date.now();

      function animate() {
        const elapsed = Date.now() - startTime;
        progress = Math.min((elapsed / progressDuration) * 100, 100);
        progressBar.style.width = progress + '%';

        if (progress < 100 && !isDeleting) {
          requestAnimationFrame(animate);
        }
      }

      animate();
    }

    function type() {
      const currentText = quotes[currentQuote];

      if (!isDeleting && charIndex <= currentText.length) {
        // Typing
        typewriterElement.textContent = currentText.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentText.length) {
          // Finished typing, pause then delete
          isPaused = true;
          if (progressBar) progressBar.style.width = '0%';
          updateProgress();

          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }

        setTimeout(type, typeSpeed + Math.random() * 30); // Add slight randomness

      } else if (isDeleting && charIndex >= 0) {
        // Deleting
        typewriterElement.textContent = currentText.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
          // Finished deleting, move to next quote
          isDeleting = false;
          currentQuote = (currentQuote + 1) % quotes.length;
          charIndex = 0;

          // Update counter
          if (currentQuoteEl) currentQuoteEl.textContent = currentQuote + 1;
          updateLineNumber();

          setTimeout(type, 500); // Brief pause before next quote
          return;
        }

        setTimeout(type, deleteSpeed);
      }
    }

    // Start the animation
    updateLineNumber();
    setTimeout(type, 1000); // Initial delay
  }
});

// Add keyframe animation style dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
