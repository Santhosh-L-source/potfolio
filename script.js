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

  const modalImgContainer = document.getElementById('cert-modal-img-container');
  const modalPendingNotice = document.getElementById('cert-modal-pending-notice');
  const modalImgLink = document.getElementById('cert-modal-img-link');
  const modalImg = document.getElementById('cert-modal-img');
  const modalPdfLink = document.getElementById('cert-modal-pdf-link');
  const modalVerifyLink = document.getElementById('cert-modal-verify-link');

  if (!modal) return;

  const certificatesData = {
    'azure-ai': {
      org: 'Microsoft Certified',
      title: 'Microsoft Certified: Azure AI Fundamentals',
      badge: 'Official Microsoft Credential (ID: 8DCC1A32263C3FD)',
      issuer: 'Microsoft Corporation',
      date: 'Earned October 16, 2026',
      iconClass: 'azure-icon',
      iconHtml: '<i class="fa-brands fa-microsoft"></i>',
      pdfUrl: 'certificates/Azure_AI_Fundamentals_Microsoft.pdf',
      imgUrl: 'certificates/azure_ai_cert.png',
      verifyUrl: 'https://learn.microsoft.com/en-us/users/santhosh-3585/credentials/certification/azure-ai-fundamentals?tab=credentials-tab',
      desc: 'Demonstrated fundamental knowledge of machine learning workloads and core artificial intelligence concepts, computer vision, natural language processing (NLP), and generative/conversational AI on Microsoft Azure.',
      topics: ['Azure AI Workloads & Principles', 'Machine Learning Foundations', 'Computer Vision on Azure', 'Natural Language Processing (NLP)', 'Azure OpenAI & Conversational AI', 'Responsible AI Practices']
    },
    'nptel-algo': {
      org: 'IIT Kharagpur • NPTEL',
      title: 'Fundamental Algorithms: Design and Analysis',
      badge: 'Elite Silver Award • Score: 75%',
      issuer: 'NPTEL (Funded by MoE, Govt. of India)',
      date: 'Jan–Feb 2026 (Roll: NPTEL26CS42S653406569)',
      pdfUrl: 'certificates/Fundamental_Algorithms_NPTEL.pdf',
      imgUrl: 'certificates/algorithms_cert.png',
      verifyUrl: '',
      desc: 'Awarded Elite Silver distinction with a consolidated score of 75% (Assignments: 22.5/25, Proctored Exam: 52.5/75) among 1,818 certified candidates nationwide. Demonstrates high-tier algorithmic proficiency.',
      topics: ['Asymptotic Complexity & Big-O Notation', 'Divide-and-Conquer Recurrences', 'Dynamic Programming Optimization', 'Greedy Algorithmic Strategies', 'Graph Traversal (BFS, DFS, Dijkstra)', 'Theoretical Algorithmic Proofs']
    },
    'nptel-dbms': {
      org: 'IIT Kharagpur • NPTEL',
      title: 'Database Management System',
      badge: 'Top 5% Topper & Elite Award • Score: 73%',
      issuer: 'NPTEL (Funded by MoE, Govt. of India)',
      date: 'Jul–Sep 2026 (Roll: NPTEL26CS117S353501242)',
      pdfUrl: 'certificates/Database_Management_System_NPTEL.pdf',
      imgUrl: 'certificates/dbms_cert.png',
      verifyUrl: '',
      desc: 'Ranked in the prestigious Top 5% Topper bracket nationwide with an Elite distinction score of 73% (Assignments: 24.38/25, Proctored Exam: 48/75) out of 7,698 certified candidates.',
      topics: ['Relational Model & Relational Algebra', 'Advanced SQL & Complex Nested Queries', 'Schema Normalization (1NF through BCNF)', 'ACID Transactions & Serializability', 'Concurrency Control & Locking Protocols', 'B+ Tree Indexing & Query Optimization']
    },
    'nptel-python': {
      org: 'IIT Madras • NPTEL',
      title: 'Python for Data Science',
      badge: 'Elite Award • Perfect 25/25 in Assignments',
      issuer: 'NPTEL (Funded by MoE, Govt. of India)',
      date: 'Jan–Feb 2025 (Roll: NPTEL25CS60S243301973)',
      pdfUrl: 'certificates/Python_for_Data_Science_NPTEL.pdf',
      imgUrl: 'certificates/python_cert.png',
      verifyUrl: '',
      desc: 'Achieved Elite certification with a 100% score on all coursework assignments (25/25) among 15,251 candidates across India. Thoroughly covers data preprocessing, array manipulation, and statistical data visualization.',
      topics: ['NumPy Multidimensional Computing', 'Pandas DataFrame Transformations', 'Data Cleaning & Preprocessing Pipelines', 'Statistical Data Analysis', 'Exploratory Visualization (Matplotlib)', 'Predictive Modeling Foundations']
    },
    'oracle-ai': {
      org: 'Oracle University',
      title: 'AI Foundations Associate',
      badge: 'Oracle Certified Associate',
      issuer: 'Oracle Corporation',
      date: 'Certified Associate',
      iconClass: 'oracle-icon',
      iconHtml: '<i class="fa-solid fa-server"></i>',
      pdfUrl: '',
      imgUrl: '',
      verifyUrl: '',
      desc: 'Mastered foundational and architectural concepts of Artificial Intelligence, Machine Learning algorithms, deep neural network modeling, and enterprise AI workloads deployed across Oracle Cloud Infrastructure.',
      topics: ['Artificial Intelligence Foundations', 'Supervised & Unsupervised Learning', 'Deep Learning & Neural Networks', 'Oracle Cloud Infrastructure AI', 'Enterprise AI Deployment']
    },
    'infosys-java': {
      org: 'Infosys Springboard',
      title: 'Java Programming Fundamentals',
      badge: 'Infosys Certified',
      issuer: 'Infosys Springboard',
      date: 'Certified',
      iconClass: 'infosys-icon',
      iconHtml: '<i class="fa-brands fa-java"></i>',
      pdfUrl: '',
      imgUrl: '',
      verifyUrl: '',
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

    modalIcon.className = `cert-badge-icon ${data.iconClass || 'nptel-icon'}`;
    modalIcon.innerHTML = data.iconHtml || '<i class="fa-solid fa-award"></i>';

    // Image preview & pending notice handling
    if (data.imgUrl) {
      if (modalImgContainer) modalImgContainer.style.display = 'block';
      if (modalPendingNotice) modalPendingNotice.style.display = 'none';
      if (modalImg) {
        modalImg.src = data.imgUrl;
        modalImg.alt = `${data.title} Preview`;
      }
      if (modalImgLink) {
        modalImgLink.href = data.pdfUrl || data.imgUrl;
      }
    } else {
      if (modalImgContainer) modalImgContainer.style.display = 'none';
      if (modalPendingNotice) modalPendingNotice.style.display = 'flex';
      if (modalImg) modalImg.src = '';
    }

    // PDF link handling
    if (modalPdfLink) {
      if (data.pdfUrl) {
        modalPdfLink.href = data.pdfUrl;
        modalPdfLink.style.display = 'inline-flex';
      } else {
        modalPdfLink.style.display = 'none';
      }
    }

    // Verification link handling
    if (modalVerifyLink) {
      if (data.verifyUrl) {
        modalVerifyLink.href = data.verifyUrl;
        modalVerifyLink.style.display = 'inline-flex';
      } else {
        modalVerifyLink.style.display = 'none';
      }
    }

    // Topics tags
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
      card.addEventListener('click', (e) => {
        // Allow links to open normally without popping up modal
        if (e.target.closest('a')) return;
        openCertificate(certKey);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          openCertificate(certKey);
        }
      });
    }
  });

  document.querySelectorAll('.open-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const certKey = btn.getAttribute('data-cert');
      if (certKey) openCertificate(certKey);
    });
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
