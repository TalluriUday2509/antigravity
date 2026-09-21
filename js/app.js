/* ==========================================================================
   APP.JS - INTERACTIVE LOGIC & APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects();
  initNavigation();
  initModal();
  initCopyEmail();
  initContactForm();
  initMobileDrawer();
  initCounterAnimations();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or default to light
  const storedTheme = localStorage.getItem('uday_theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('uday_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Render Case Study / Project Cards
   -------------------------------------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof projectsData === 'undefined') return;

  grid.innerHTML = projectsData.map(project => `
    <article class="project-card" onclick="openProjectModal('${project.id}')" data-id="${project.id}">
      <div class="project-image-box">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <span class="project-tag-overlay">${project.category}</span>
      </div>
      <div class="project-content">
        <div class="project-category">${project.number} — ${project.category}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
        </div>
        <div class="project-link-btn">
          View Detailed Case Study <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. Modal Controller
   -------------------------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalStrategy = document.getElementById('modal-strategy');
  const modalDeliverables = document.getElementById('modal-deliverables');
  const modalTools = document.getElementById('modal-tools');

  if (modalCategory) modalCategory.textContent = `${project.number} — ${project.category}`;
  if (modalTitle) modalTitle.textContent = project.title;

  if (modalMetrics) {
    modalMetrics.innerHTML = project.metrics.map(m => `
      <div class="modal-metric-card">
        <div class="modal-metric-val">${m.value}</div>
        <div class="modal-metric-lbl">${m.label}</div>
      </div>
    `).join('');
  }

  if (modalChallenge) modalChallenge.textContent = project.challenge;

  if (modalStrategy) {
    modalStrategy.innerHTML = project.strategy.map(item => `
      <li class="modal-list-item">
        <i class="fas fa-check-circle"></i>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (modalDeliverables) {
    modalDeliverables.innerHTML = project.deliverables.map(item => `
      <li class="modal-list-item">
        <i class="fas fa-file-alt"></i>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (modalTools) {
    modalTools.innerHTML = project.tools.map(tool => `
      <span class="tool-badge">${tool}</span>
    `).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Navigation & Active Link Highlighting
   -------------------------------------------------------------------------- */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Copy Email & Toast Notification
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'shalomraj970@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Direct Email: shalomraj970@gmail.com');
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------------------------------
   6. Contact Form Email Action (Connected to shalomraj970@gmail.com)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || `Digital Marketing Inquiry from ${name}`;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.');
        return;
      }

      // Build instant prefilled mailto link directed to shalomraj970@gmail.com
      const mailBody = `Hi Uday,\n\nName: ${name}\nClient Email: ${email}\n\nMessage:\n${message}\n\n---\nSent via Talluri Uday Portfolio Contact Form`;
      const mailtoUrl = `mailto:shalomraj970@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

      // Trigger user's mail application immediately
      window.location.href = mailtoUrl;

      showToast(`Opening email app to send message to shalomraj970@gmail.com!`);
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Mobile Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('active');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Stat Counter Animations
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-num');
  let animated = false;

  window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection || animated) return;

    const top = aboutSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      counters.forEach(counter => {
        const target = counter.getAttribute('data-count');
        if (!target) return;
        
        let count = 0;
        const numTarget = parseInt(target, 10);
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 1500;
        const step = Math.ceil(numTarget / (duration / 20));

        const timer = setInterval(() => {
          count += step;
          if (count >= numTarget) {
            counter.textContent = numTarget + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = count + suffix;
          }
        }, 20);
      });
      animated = true;
    }
  });
}
