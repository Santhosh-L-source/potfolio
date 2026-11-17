/**
 * Santhosh L - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Typewriter Effect
  initTypewriter();

  // 3. Theme Toggle (Dark / Light)
  initThemeToggle();

  // 4. Navbar Scroll & ScrollSpy
  initNavbarScrollSpy();

  // 5. Mobile Menu Toggle
  initMobileMenu();

  // 6. Skills Category Filter
  initSkillsFilter();

  // 7. Projects Category Filter
  initProjectsFilter();

  // 8. Back to Top Button
  initBackToTop();

  // 9. Smooth Scrolling for Navigation & Buttons
  initSmoothScroll();

  // 10. Interactive Certificate Details Modal
  initCertificatesModal();
});

/* ==========================================================================
   Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const roles = [
    'Computer Science Student',
    'Java Full Stack Developer',
    'Spring Boot & Backend Enthusiast',
    'Problem Solver & Competitive Programmer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
    } else {
      const delay = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(type, delay);
    }
  }

  type();
}

/* ==========================================================================
   Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('santhosh_portfolio_theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    // Default is dark
    root.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('santhosh_portfolio_theme', newTheme);
    });
  }
}

/* ==========================================================================
   Navbar Scroll & Active Link Spy
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background blur/shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   Skills Filter Tabs
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Projects Filter Tabs
   ========================================================================== */
function initProjectsFilter() {
  const tabs = document.querySelectorAll('.project-tab');
  const projectCards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Global Helper: Copy to Clipboard
   ========================================================================== */
window.copyToClipboard = function(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = `Copied "${text}" to clipboard!`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }).catch(() => {
    alert(`Copied: ${text}`);
  });
};

/* ==========================================================================
   Smooth Scrolling for Anchors & Navigation Buttons
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   Interactive Certificate Credential Modal
   ========================================================================== */
function initCertificatesModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('close-cert-modal');
  const closeActionBtn = document.getElementById('close-cert-btn');
  const certCards = document.querySelectorAll('.cert-card');

  const modalOrg = document.getElementById('cert-modal-org');
  const modalIcon = document.getElementById('cert-modal-icon');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalBadge = document.getElementById('cert-modal-badge');
  const modalDesc = document.getElementById('cert-modal-desc');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalDate = document.getElementById('cert-modal-date');
  const modalTopics = document.getElementById('cert-modal-topics');

  if (!modal) return;

  const certificatesData = {
    'azure-ai': {
      org: 'Microsoft Certified',
      title: 'Microsoft Certified: Azure AI Fundamentals',
      badge: 'Official Microsoft Credential',
      issuer: 'Microsoft',
      date: 'October 2026',
      iconClass: 'azure-icon',
      iconHtml: '<i class="fa-brands fa-microsoft"></i>',
      desc: 'Demonstrated foundational knowledge of machine learning workloads, artificial intelligence concepts, computer vision, natural language processing, and conversational AI services on the Microsoft Azure cloud ecosystem.',
      topics: ['Machine Learning Foundations', 'Azure Cognitive Services', 'Computer Vision Workloads', 'Natural Language Processing (NLP)', 'Conversational AI & Bots', 'Responsible AI Framework']
    },
    'oracle-ai': {
      org: 'Oracle University',
      title: 'AI Foundations Associate',
      badge: 'Oracle Certified Associate',
      issuer: 'Oracle Corporation',
      date: 'Verified Credential',
      iconClass: 'oracle-icon',
      iconHtml: '<i class="fa-solid fa-server"></i>',
      desc: 'Mastered foundational and architectural concepts of Artificial Intelligence, Machine Learning algorithms, deep neural network modeling, and enterprise AI workloads deployed across Oracle Cloud Infrastructure.',
      topics: ['Artificial Intelligence Foundations', 'Supervised & Unsupervised Learning', 'Deep Learning & Neural Networks', 'Oracle Cloud Infrastructure AI', 'Enterprise AI Deployment']
    },
    'nptel-algo': {
      org: 'NPTEL / IIT',
      title: 'Fundamental Algorithms: Design & Analysis',
      badge: 'Elite Silver Award (Top Tier)',
      issuer: 'NPTEL (IIT Madras / Kharagpur)',
      date: 'Elite Silver Certified',
      iconClass: 'nptel-icon silver',
      iconHtml: '<i class="fa-solid fa-medal"></i>',
      desc: 'Achieved distinguished Elite Silver honors in advanced algorithm design and asymptotic analysis, covering theoretical proof structures, recurrence relations, divide-and-conquer, dynamic programming, and complex graph algorithms.',
      topics: ['Asymptotic Complexity & Big-O', 'Divide-and-Conquer Algorithms', 'Dynamic Programming Optimization', 'Greedy Algorithmic Strategies', 'Graph Traversal (BFS, DFS, Dijkstra)', 'Theoretical Algorithm Proofs']
    },
    'nptel-dbms': {
      org: 'NPTEL / IIT',
      title: 'Database Management System',
      badge: 'Elite Award',
      issuer: 'NPTEL (IIT Kharagpur)',
      date: 'Elite Certified',
      iconClass: 'nptel-icon',
      iconHtml: '<i class="fa-solid fa-database"></i>',
      desc: 'Mastered fundamental and advanced principles of database design, relational algebra, SQL optimization, schema normalization up to BCNF, concurrency control protocols, transaction management, and indexing structures.',
      topics: ['Relational Algebra & Tuple Calculus', 'Complex SQL Queries & Joins', 'Database Normalization (1NF to BCNF)', 'ACID Transactions & Recovery', 'Concurrency Control & Locking', 'B+ Tree Indexing & Query Tuning']
    },
    'nptel-python': {
      org: 'NPTEL / IIT',
      title: 'Python for Data Science',
      badge: 'Elite Award',
      issuer: 'NPTEL (IIT Madras)',
      date: 'Elite Certified',
      iconClass: 'nptel-icon',
      iconHtml: '<i class="fa-brands fa-python"></i>',
      desc: 'Completed comprehensive rigorous training on data processing pipelines, mathematical array computing with NumPy, structured data manipulation with Pandas, statistical hypothesis testing, and exploratory data visualization.',
      topics: ['NumPy Multidimensional Computing', 'Pandas DataFrame Transformations', 'Data Cleaning & Preprocessing', 'Statistical Data Analysis', 'Exploratory Visualization (Matplotlib/Seaborn)', 'Predictive Modeling Foundations']
    },
    'infosys-java': {
      org: 'Infosys Springboard',
      title: 'Java Programming Fundamentals',
      badge: 'Infosys Certified',
      issuer: 'Infosys Springboard',
      date: 'Certified',
      iconClass: 'infosys-icon',
      iconHtml: '<i class="fa-brands fa-java"></i>',
      desc: 'Rigorous deep-dive into Core Java, Object-Oriented software engineering patterns, multithreaded concurrent execution, custom exception management architectures, and the Java Collections Framework.',
      topics: ['OOP (Encapsulation, Polymorphism, Inheritance)', 'Java Collections (List, Set, Map, Queue)', 'Multithreading & Concurrency', 'Exception Handling & Custom Exceptions', 'Java Memory Management & Garbage Collection']
    }
  };

  function openCertificate(certKey) {
    const data = certificatesData[certKey];
    if (!data) return;

    modalOrg.textContent = data.org;
    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalIssuer.textContent = data.issuer;
    modalDate.textContent = data.date;
    modalDesc.textContent = data.desc;

    modalIcon.className = `cert-badge-icon ${data.iconClass}`;
    modalIcon.innerHTML = data.iconHtml;

    modalTopics.innerHTML = '';
    data.topics.forEach(topic => {
      const tag = document.createElement('span');
      tag.className = 'cert-topic-tag';
      tag.textContent = topic;
      modalTopics.appendChild(tag);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertificate() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    const certKey = card.getAttribute('data-cert');
    if (certKey) {
      card.addEventListener('click', () => {
        openCertificate(certKey);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCertificate(certKey);
        }
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCertificate);
  if (closeActionBtn) closeActionBtn.addEventListener('click', closeCertificate);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCertificate();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCertificate();
    }
  });
}
