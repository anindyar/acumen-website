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

  // ========================================
  // Scroll-Triggered Animations
  // ========================================
  const scrollObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, scrollObserverOptions);

  // Apply scroll-fade to sections
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('scroll-fade');
    scrollObserver.observe(el);
  });

  // Apply staggered fade to grids
  document.querySelectorAll('.audience-grid, .services-grid, .stats-grid, .blog-grid').forEach(el => {
    el.classList.add('scroll-fade-children');
    scrollObserver.observe(el);
  });

  // Apply scroll-fade to individual cards (fallback)
  document.querySelectorAll('.service-card, .audience-card, .blog-card, .stat-card').forEach((el, index) => {
    if (!el.closest('.scroll-fade-children')) {
      el.classList.add('scroll-fade');
      el.style.transitionDelay = `${index * 0.1}s`;
      scrollObserver.observe(el);
    }
  });

  // Apply to CTA sections
  document.querySelectorAll('.cta-section .container, .contact-form').forEach(el => {
    el.classList.add('scroll-fade');
    scrollObserver.observe(el);
  });

  // Apply scale animation to featured elements
  document.querySelectorAll('.hero-content').forEach(el => {
    el.classList.add('scroll-scale');
    el.classList.add('visible'); // Hero should be visible immediately
  });

  // Apply to footer
  document.querySelectorAll('.footer-content').forEach(el => {
    el.classList.add('scroll-fade');
    scrollObserver.observe(el);
  });

  // AI diagram doesn't need scroll animation - it's in the hero section

  // Apply to page headers (for other pages)
  document.querySelectorAll('.page-header .container').forEach(el => {
    el.classList.add('scroll-fade');
    el.classList.add('visible'); // Page headers should be visible immediately
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
  console.log('%c Acumen Labs ', 'background: linear-gradient(135deg, #06b6d4, #fb923c); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
  console.log('%c AI Consultancy for Dev Teams, Organisations & Government ', 'color: #06b6d4; font-size: 12px;');
  console.log('%c anindya@acumenlabs.co ', 'color: #94a3b8; font-size: 11px;');

  // ========================================
  // AI Diagram Interactivity
  // ========================================
  const aiDiagram = document.querySelector('.ai-diagram');
  if (aiDiagram) {
    const nodes = aiDiagram.querySelectorAll('.node');
    const connections = aiDiagram.querySelector('.connections');
    const particles = aiDiagram.querySelector('.particles');

    // Node connection mapping
    const nodeConnections = {
      'data-inputs': ['flow-1', 'flow-2', 'flow-3'],
      'models': ['flow-1', 'flow-2', 'flow-3', 'flow-4', 'flow-5', 'flow-6'],
      'agents': ['flow-4', 'flow-5', 'flow-6', 'flow-7', 'flow-8', 'flow-9'],
      'outputs': ['flow-7', 'flow-8', 'flow-9']
    };

    // Simple hover effects - just highlight connections
    nodes.forEach(node => {
      node.addEventListener('mouseenter', function() {
        const column = this.closest('.diagram-column');
        if (column && connections) {
          const columnClass = column.classList[1];
          const relatedFlows = nodeConnections[columnClass] || [];

          // Subtle highlight of related flow lines
          connections.querySelectorAll('.flow-line').forEach(line => {
            const lineClasses = Array.from(line.classList);
            const isRelated = relatedFlows.some(flow => lineClasses.includes(flow));
            line.style.opacity = isRelated ? '0.6' : '0.1';
          });
        }
      });

      node.addEventListener('mouseleave', function() {
        if (connections) {
          connections.querySelectorAll('.flow-line').forEach(line => {
            line.style.opacity = '';
          });
        }
      });
    });

    // Create and manage tooltips
    const diagramWrapper = document.querySelector('.ai-diagram-wrapper');
    if (diagramWrapper) {
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'diagram-tooltip';
      diagramWrapper.appendChild(tooltip);

      nodes.forEach(node => {
        const titleElement = node.querySelector('title');
        if (titleElement) {
          const tooltipText = titleElement.textContent;

          node.addEventListener('mouseenter', function(e) {
            tooltip.textContent = tooltipText;
            tooltip.classList.add('visible');
            updateTooltipPosition(e);
          });

          node.addEventListener('mousemove', updateTooltipPosition);

          node.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
          });
        }
      });

      function updateTooltipPosition(e) {
        const wrapperRect = diagramWrapper.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let left = e.clientX - wrapperRect.left - (tooltipRect.width / 2);
        let top = e.clientY - wrapperRect.top - tooltipRect.height - 15;

        // Keep tooltip within bounds
        left = Math.max(10, Math.min(left, wrapperRect.width - tooltipRect.width - 10));
        top = Math.max(10, top);

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      }
    }

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
  @keyframes nodePulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
