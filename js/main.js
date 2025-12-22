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

    // Add hover effects to nodes
    nodes.forEach(node => {
      node.addEventListener('mouseenter', function() {
        // Find which column this node belongs to
        const column = this.closest('.diagram-column');
        if (column && connections) {
          const columnClass = column.classList[1]; // e.g., 'data-inputs', 'models', etc.
          const relatedFlows = nodeConnections[columnClass] || [];

          // Highlight related flow lines
          connections.querySelectorAll('.flow-line').forEach(line => {
            const lineClasses = Array.from(line.classList);
            const isRelated = relatedFlows.some(flow => lineClasses.includes(flow));
            if (isRelated) {
              line.style.opacity = '1';
              line.style.strokeWidth = '3';
            } else {
              line.style.opacity = '0.15';
            }
          });

          // Highlight related particles
          if (particles) {
            particles.querySelectorAll('.particle').forEach(particle => {
              const particleClasses = Array.from(particle.classList);
              const particleNum = particleClasses.find(c => c.startsWith('particle-'));
              if (particleNum) {
                const flowNum = 'flow-' + particleNum.split('-')[1];
                const isRelated = relatedFlows.includes(flowNum);
                particle.style.opacity = isRelated ? '1' : '0.2';
              }
            });
          }
        }

        // Dim other nodes
        nodes.forEach(otherNode => {
          if (otherNode !== this) {
            otherNode.style.opacity = '0.5';
          }
        });
      });

      node.addEventListener('mouseleave', function() {
        // Reset flow lines
        if (connections) {
          connections.querySelectorAll('.flow-line').forEach(line => {
            line.style.opacity = '';
            line.style.strokeWidth = '';
          });
        }

        // Reset particles
        if (particles) {
          particles.querySelectorAll('.particle').forEach(particle => {
            particle.style.opacity = '';
          });
        }

        // Reset other nodes
        nodes.forEach(otherNode => {
          otherNode.style.opacity = '';
        });
      });

      // Add click interaction - pulse effect
      node.addEventListener('click', function() {
        this.style.animation = 'nodePulse 0.4s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 400);
      });
    });

    // Add entrance animation for diagram
    const diagramObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger animate columns
          const columns = aiDiagram.querySelectorAll('.diagram-column');
          columns.forEach((col, index) => {
            col.style.opacity = '0';
            col.style.transform = 'translateY(20px)';
            setTimeout(() => {
              col.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              col.style.opacity = '1';
              col.style.transform = 'translateY(0)';
            }, index * 150);
          });
          diagramObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    diagramObserver.observe(aiDiagram);
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
