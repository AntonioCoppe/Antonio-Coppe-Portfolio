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