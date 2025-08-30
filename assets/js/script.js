'use strict';

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

if (themeToggleBtn) {
  const setTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleIcon.setAttribute('name', 'sunny-outline');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleIcon.setAttribute('name', 'moon-outline');
    }
    localStorage.setItem('theme', theme);
  };

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}




// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items (only if modal elements exist)
if (modalContainer && modalCloseBtn && overlay) {
  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      if (modalImg) modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      if (modalImg) modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);

    // Update filter buttons to match selection
    for (let j = 0; j < filterBtn.length; j++) {
      if (filterBtn[j].innerText.toLowerCase() === selectedValue) {
        lastClickedBtn.classList.remove("active");
        lastClickedBtn.setAttribute("aria-selected", "false");
        
        filterBtn[j].classList.add("active");
        filterBtn[j].setAttribute("aria-selected", "true");
        lastClickedBtn = filterBtn[j];
        break;
      }
    }

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    // Normalize the selected value and category for comparison
    const normalizedSelected = selectedValue.replace(/[\/\s]/g, '').toLowerCase();
    const normalizedCategory = filterItems[i].dataset.category.replace(/[\/\s]/g, '').toLowerCase();

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (normalizedSelected === normalizedCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    // Update active states and ARIA attributes
    lastClickedBtn.classList.remove("active");
    lastClickedBtn.setAttribute("aria-selected", "false");
    
    this.classList.add("active");
    this.setAttribute("aria-selected", "true");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }

  });
}

// EmailJS configuration and form submission
document.addEventListener('DOMContentLoaded', function() {
  // EmailJS Configuration - Safe to include in client-side code
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your actual public key
    SERVICE_ID: 'service_zxeblsc', // Your Gmail service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID' // Replace with your template ID
  };

  // Initialize EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }

  const contactForm = document.getElementById('contact-form');
  const formMessages = document.getElementById('form-messages');
  const btnText = document.getElementById('btn-text');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check if EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        showMessage('EmailJS service is not available. Please try again later.', 'error');
        return;
      }

      // Get form data
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('from_name'),
        from_email: formData.get('from_email'),
        message: formData.get('message'),
        to_name: 'Antonio Coppe'
      };

      // Update button to show loading state
      if (formBtn) {
        formBtn.disabled = true;
        btnText.textContent = 'Sending...';
      }

      // Send email using EmailJS
      emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(function(response) {
          console.log('Email sent successfully:', response);
          showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
          contactForm.reset();
          
          // Reset button state
          if (formBtn) {
            formBtn.disabled = true; // Keep disabled until form is filled again
            btnText.textContent = 'Send Message';
          }
        })
        .catch(function(error) {
          console.error('Email sending failed:', error);
          showMessage('Sorry, there was an error sending your message. Please try again or contact me directly at antonio.coppe@gmail.com', 'error');
          
          // Reset button state
          if (formBtn) {
            formBtn.disabled = false;
            btnText.textContent = 'Send Message';
          }
        });
    });
  }

  function showMessage(message, type) {
    if (formMessages) {
      formMessages.textContent = message;
      formMessages.className = `form-messages ${type} show`;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessages.classList.remove('show');
      }, 5000);
    }
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Resume Download functionality - shared function for all resume buttons
const showResumeComingSoon = () => {
  // Create a temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--gold-gradient);
    color: var(--smoky-black);
    padding: 15px 25px;
    border-radius: 12px;
    font-weight: var(--fw-600);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  notification.textContent = 'Resume download coming soon!';
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};

// Add event listeners to all resume download buttons
const resumeButtons = [
  document.getElementById('download-full-pdf-btn'),
  document.querySelector('.sidebar-resume-btn'),
  document.querySelector('.resume-btn')
];

resumeButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showResumeComingSoon();
    });
  }
});

// Handle tech logo loading errors
document.addEventListener('DOMContentLoaded', function() {
  const techLogos = document.querySelectorAll('.tech-logo');
  
  techLogos.forEach(logo => {
    logo.addEventListener('error', function() {
      // Create a fallback icon with the first letter of the tech name
      const techName = this.nextElementSibling.textContent;
      const fallback = document.createElement('div');
      fallback.className = 'tech-logo-fallback';
      fallback.textContent = techName.charAt(0);
      fallback.style.cssText = `
        width: 20px;
        height: 20px;
        background: var(--gold-accent);
        color: var(--smoky-black);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--fw-600);
        font-size: 12px;
      `;
      
      this.parentNode.replaceChild(fallback, this);
    });
  });

  // Initialize project modal functionality
  initializeProjectModals();
});

// Project Modal System
function initializeProjectModals() {
  const projectModalContainer = document.getElementById('project-modal-container');
  const projectModalOverlay = document.getElementById('project-modal-overlay');
  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalContent = document.getElementById('project-modal-content');
  const projectViewBtns = document.querySelectorAll('[data-project-modal]');

  // Project data for modals
  const projectData = {
    electroquote: {
      title: "ElectroQuote Pro V2",
      category: "Full-Stack Development",
      status: "In Production",
      overview: "A comprehensive electrical pricing platform that revolutionizes how contractors get real-time quotes. The system scrapes multiple supplier websites to provide instant, accurate pricing for electrical components and materials.",
      techStack: ["Next.js", "Python", "Web Scraping", "APIs", "Database"],
      keyContributions: [
        "Architected real-time web scraping system processing 1000+ product queries daily",
        "Built responsive React dashboard with advanced filtering and search capabilities",
        "Implemented automated price tracking with alerts for significant price changes",
        "Deployed scalable backend infrastructure handling concurrent scraping requests"
      ],
      impact: "Reduced quote generation time from hours to minutes, enabling contractors to respond to opportunities 10x faster and increase bid conversion rates.",
      links: {
        live: "https://electro-quote-pro-v2.vercel.app/"
      }
    },
    cicd: {
      title: "CI/CD Pipeline System", 
      category: "Cloud/DevOps",
      status: "Production Ready",
      overview: "Enterprise-grade CI/CD pipeline system built with Docker and GitHub Actions, enabling zero-downtime deployments for microservices architecture on AWS ECS.",
      techStack: ["Docker", "GitHub Actions", "AWS ECS", "ECR", "Terraform", "CloudWatch"],
      keyContributions: [
        "Designed containerized microservices architecture with Docker",
        "Implemented automated testing pipeline with 95% test coverage", 
        "Built zero-downtime deployment system using blue-green strategies",
        "Configured monitoring and alerting with CloudWatch and Sentry"
      ],
      impact: "Reduced deployment time from 2 hours to 15 minutes, eliminated manual deployment errors, and increased deployment frequency by 400%."
    },
    rivadeicoz: {
      title: "Riva dei Coz Booking Platform",
      category: "Full-Stack Development", 
      status: "In Production",
      overview: "A sophisticated booking platform for an agriturismo business, featuring Stripe payment integration, Supabase backend, and seamless synchronization with Booking.com.",
      techStack: ["Next.js", "Supabase", "Stripe", "Booking.com API", "React", "TypeScript"],
      keyContributions: [
        "Built secure payment processing system with Stripe integration",
        "Implemented real-time calendar synchronization with Booking.com",
        "Designed responsive booking interface with availability checking", 
        "Created admin dashboard for booking and revenue management"
      ],
      impact: "Reduced manual workload by 60%, eliminated double-bookings, and increased direct booking revenue by 35% through reduced commission fees.",
      links: {
        live: "https://riva-dei-coz.vercel.app/"
      }
    },
    farmersaver: {
      title: "Farmers Saver IoT",
      category: "AI Development",
      status: "Prototype", 
      overview: "An AI-powered IoT system for intelligent crop protection, using computer vision to detect and deter pigeons and other pests from agricultural areas.",
      techStack: ["Python", "Computer Vision", "IoT Sensors", "Machine Learning", "Jetson Nano", "MQTT"],
      keyContributions: [
        "Trained computer vision model for bird species identification",
        "Designed IoT sensor network for field monitoring",
        "Implemented MQTT communication protocol for real-time data transfer",
        "Built automated deterrent system with selective activation"
      ],
      impact: "Prototype testing showed 80% reduction in bird-related crop damage with 24/7 autonomous monitoring capabilities."
    },
    insight311: {
      title: "311 Insight Dashboard",
      category: "Full-Stack Development",
      status: "Demo",
      overview: "Interactive data visualization platform analyzing Toronto's 311 service request data, providing insights into municipal service patterns and citizen engagement trends.",
      techStack: ["React", "D3.js", "Toronto Open Data API", "JavaScript", "CSS3", "Chart.js"],
      keyContributions: [
        "Processed and analyzed 500k+ municipal service records",
        "Built interactive visualizations with D3.js and Chart.js", 
        "Implemented geographical mapping of service request distribution",
        "Created filtering and search capabilities for deep data exploration"
      ],
      impact: "Enables data-driven decision making for municipal services, highlighting response time patterns and service distribution inequalities across Toronto neighborhoods.",
      links: {
        github: "https://github.com/AntonioCoppe/311-insight-dashboard"
      }
    },
    research: {
      title: "Hypothesis Engineering Research",
      category: "Research",
      status: "Published",
      overview: "Academic research project exploring patterns for using hypothesis engineering to manage architectural uncertainties in software development processes.",
      techStack: ["Software Architecture", "Research Methodology", "Academic Writing", "Case Studies"],
      keyContributions: [
        "Conducted comprehensive literature review on architectural uncertainty",
        "Developed novel framework for hypothesis-driven architecture decisions",
        "Analyzed real-world case studies from multiple software projects",
        "Published findings in academic conference proceedings"
      ],
      impact: "Contributing to software engineering methodology, providing practitioners with systematic approaches to manage architectural uncertainty in complex systems."
    },
    kardashev: {
      title: "Kardashev",
      category: "Game Development",
      status: "In Production",
      overview: "A space-themed factory building game available on Steam, featuring procedural generation and complex resource management systems. Demonstrates advanced C# optimization and complex systems architecture.",
      techStack: ["C#", "Unity", "Steam SDK", "Procedural Generation", "Performance Optimization"],
      keyContributions: [
        "Implemented complex resource management and factory automation systems",
        "Optimized game performance achieving 15x improvement in simulation speed",
        "Designed procedural planet generation algorithms",
        "Published game on Steam platform with positive user reviews"
      ],
      impact: "Successfully launched on Steam with thousands of players, demonstrating advanced C# programming skills, performance optimization expertise, and ability to complete complex projects from conception to production release.",
      links: {
        live: "https://store.steampowered.com/app/2385970/Kardashev/"
      }
    },
    rubiks: {
      title: "Rubik's Vision",
      category: "AI Development",
      status: "Demo",
      overview: "AI-powered mobile application using computer vision to analyze and solve Rubik's cubes, demonstrating expertise in AI/ML algorithms, mobile development and computer vision technologies.",
      techStack: ["Flutter", "Computer Vision", "AI/ML", "OpenCV", "Dart", "Camera API"],
      keyContributions: [
        "Implemented real-time cube state detection using computer vision algorithms",
        "Built AI solving algorithm with step-by-step visual guidance",
        "Created intuitive mobile interface with camera integration",
        "Optimized image processing for real-time performance on mobile devices"
      ],
      impact: "Showcases AI/computer vision capabilities and mobile development expertise, demonstrating ability to create consumer-facing applications with complex underlying AI technology.",
      links: {
        github: "https://github.com/AntonioCoppe/rubiks-vision"
      }
    }
  };

  // Modal functionality
  function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project || !projectModalContent) return;

    const modalHTML = `
      <div class="project-modal-header">
        <h2 class="project-modal-title">${project.title}</h2>
        <div class="project-modal-meta">
          <span class="project-modal-category">${project.category}</span>
          <span class="project-modal-status">${project.status}</span>
        </div>
      </div>
      
      <div class="project-modal-body">
        <div class="project-modal-section">
          <h3>Overview</h3>
          <p>${project.overview}</p>
        </div>
        
        <div class="project-modal-section">
          <h3>Tech Stack</h3>
          <div class="project-modal-tech-stack">
            ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
          </div>
        </div>
        
        <div class="project-modal-section">
          <h3>Key Contributions</h3>
          <ul class="project-modal-contributions">
            ${project.keyContributions.map(contribution => `<li>${contribution}</li>`).join('')}
          </ul>
        </div>
        
        <div class="project-modal-section">
          <h3>Impact</h3>
          <p class="project-modal-impact">${project.impact}</p>
        </div>
        
        ${project.links ? `
          <div class="project-modal-section">
            <h3>Links</h3>
            <div class="project-modal-links">
              ${project.links.live ? `<a href="${project.links.live}" target="_blank" class="project-modal-link live">
                <ion-icon name="globe-outline"></ion-icon>
                View Live
              </a>` : ''}
              ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="project-modal-link github">
                <ion-icon name="logo-github"></ion-icon>
                GitHub
              </a>` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    projectModalContent.innerHTML = modalHTML;
    projectModalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModalContainer) {
      projectModalContainer.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  // Add event listeners for modal
  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', closeProjectModal);
  }

  // Add event listeners for project view buttons
  projectViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-modal');
      openProjectModal(projectId);
    });
  });

  // Close modal with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalContainer && projectModalContainer.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

// Blog filtering functionality
function initBlogFilters() {
  const filterTabs = document.querySelectorAll('[data-blog-filter]');
  const blogItems = document.querySelectorAll('.blog-post-item[data-category]');

  if (filterTabs.length === 0 || blogItems.length === 0) return;

  // Add click events to filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filterValue = tab.dataset.blogFilter;
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter blog items
      blogItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          // Add slight animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateY(-20px)';
          
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Enhanced blog post interactions
function initBlogInteractions() {
  const blogPosts = document.querySelectorAll('.blog-post-item a[data-blog-post]');
  
  blogPosts.forEach(post => {
    post.addEventListener('click', (e) => {
      e.preventDefault();
      const postId = post.dataset.blogPost;
      
      // You can expand this to show detailed blog post content
      console.log(`Opening blog post: ${postId}`);
      
      // For now, we'll just show an alert indicating the post would open
      // In a real implementation, you'd open a modal or navigate to a detail page
      showBlogPostPlaceholder(postId);
    });
  });
}

// Global variables to store blog modal elements
let currentBlogModal = null;
let currentBlogOverlay = null;

function showBlogPostPlaceholder(postId) {
  const postTitles = {
    'c-sharp-optimization': 'How I Optimized C# Simulations by 15× (20 FPS → 300 FPS)',
    'aws-microservices': 'Scaling Microservices on AWS ECS for 20k+ Daily Requests',
    'cicd-docker': 'From Docker to Terraform: Building CI/CD Pipelines That Don\'t Break',
    'observability-sentry': 'Observability in Practice: Using Sentry for Scalable Systems',
    'booking-platform': 'Building a Booking Platform with Supabase + Stripe + ICS Sync',
    'developer-analyst-experience': 'What I Learned as a Developer Analyst Handling 20k+ Requests/Day',
    'research-publication': 'Publishing Research While Scaling Real Systems'
  };
  
  const title = postTitles[postId] || 'Blog Post';
  
  // Create a simple modal-like notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    z-index: 1000;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  `;
  
  notification.innerHTML = `
    <h3 style="color: var(--orange-yellow-crayola); margin-bottom: 15px; font-size: 1.2em;">
      ${title}
    </h3>
    <p style="color: var(--light-gray); margin-bottom: 20px; line-height: 1.6;">
      This would open the full blog post with detailed technical content, code examples, 
      and implementation insights. The post would include:
    </p>
    <ul style="color: var(--light-gray-70); text-align: left; margin-bottom: 20px; padding-left: 20px;">
      <li>Problem description and context</li>
      <li>Technical implementation details</li>
      <li>Code snippets and architecture diagrams</li>
      <li>Performance metrics and outcomes</li>
      <li>Key takeaways and lessons learned</li>
    </ul>
    <button onclick="closeBlogModal()" style="
      background: var(--orange-yellow-crayola);
      color: var(--smoky-black);
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    ">Close</button>
  `;
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
  `;
  
  // Store references globally so closeBlogModal can access them
  currentBlogModal = notification;
  currentBlogOverlay = overlay;
  
  overlay.addEventListener('click', closeBlogModal);
  
  document.body.appendChild(overlay);
  document.body.appendChild(notification);
  
  // Add keyboard support
  document.addEventListener('keydown', handleBlogModalKeydown);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    closeBlogModal();
  }, 10000);
}

// Function to properly close the blog modal
function closeBlogModal() {
  if (currentBlogModal && currentBlogModal.parentElement) {
    currentBlogModal.remove();
    currentBlogModal = null;
  }
  if (currentBlogOverlay && currentBlogOverlay.parentElement) {
    currentBlogOverlay.remove();
    currentBlogOverlay = null;
  }
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleBlogModalKeydown);
}

// Handle keyboard events for blog modal
function handleBlogModalKeydown(e) {
  if (e.key === 'Escape' && currentBlogModal) {
    closeBlogModal();
  }
}

// Newsletter functionality
function initNewsletter() {
  const newsletterBtn = document.getElementById('newsletter-submit');
  const newsletterInput = document.getElementById('newsletter-email');

  if (!newsletterBtn || !newsletterInput) return;

  newsletterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();

    if (!email) {
      showNewsletterMessage('Please enter your email address', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNewsletterMessage('Please enter a valid email address', 'error');
      return;
    }

    // Simulate newsletter signup
    newsletterBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>Subscribing...';
    newsletterBtn.disabled = true;

    setTimeout(() => {
      showNewsletterMessage('Thanks for subscribing! You\'ll receive technical insights monthly.', 'success');
      newsletterInput.value = '';
      newsletterBtn.innerHTML = '<ion-icon name="send-outline"></ion-icon>Subscribe';
      newsletterBtn.disabled = false;
    }, 1500);
  });

  // Submit on Enter key
  newsletterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      newsletterBtn.click();
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNewsletterMessage(message, type) {
  const existingMessage = document.querySelector('.newsletter-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement('div');
  messageEl.className = 'newsletter-message';
  messageEl.style.cssText = `
    margin-top: 15px;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: var(--fs-7);
    text-align: center;
    ${type === 'success' 
      ? 'background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);'
      : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
    }
  `;
  messageEl.textContent = message;

  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm.appendChild(messageEl);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageEl.parentElement) {
      messageEl.remove();
    }
  }, 5000);
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initBlogFilters();
  initBlogInteractions();
  initNewsletter();
});