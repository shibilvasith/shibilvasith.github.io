(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  /* ------------------------------------------------------------------------
     Inline Lucide-style SVG Icon Helper (24x24, 1.8 stroke)
     ------------------------------------------------------------------------ */
  const ICONS = {
    workflow: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>`,
    brain: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h6"/></svg>`,
    activity: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`,
    radar: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/></svg>`,
    terminal: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    server: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
    cloud: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  };

  /* ------------------------------------------------------------------------
     Theme Toggle (Light / Dark)
     ------------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("theme-icon-moon");
  const sunIcon = document.getElementById("theme-icon-sun");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try {
      localStorage.setItem("sv-portfolio-theme", theme);
    } catch (_) {
      /* ignore storage restrictions */
    }
    const isDark = theme === "dark";
    if (moonIcon && sunIcon) {
      moonIcon.style.display = isDark ? "none" : "block";
      sunIcon.style.display = isDark ? "block" : "none";
    }
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      themeBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  let initialTheme = "light";
  try {
    const saved = localStorage.getItem("sv-portfolio-theme");
    if (saved === "dark" || saved === "light") initialTheme = saved;
  } catch (_) {
    /* ignore */
  }
  applyTheme(initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  /* ------------------------------------------------------------------------
     Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("primary-nav");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  function setMenuOpen(isOpen) {
    if (!navLinks || !menuBtn) return;
    navLinks.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    if (menuIconOpen && menuIconClose) {
      menuIconOpen.style.display = isOpen ? "none" : "block";
      menuIconClose.style.display = isOpen ? "block" : "none";
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      setMenuOpen(!navLinks.classList.contains("open"));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }

  /* ------------------------------------------------------------------------
     Projects Rendering & Category Filtering
     ------------------------------------------------------------------------ */
  const projectsGrid = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let activeFilter = "All";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function observeProjectCards() {
    const cards = document.querySelectorAll(".project");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  function renderProjects(category) {
    if (!projectsGrid) return;
    const filtered =
      category === "All"
        ? data.projects
        : data.projects.filter((p) => p.category === category);

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <article class="project featured in-view">
          <div class="project-visual">
            <span class="project-visual-num">FUTURE SLOT / ${escapeHtml(category)}</span>
            <div class="project-visual-title">
              <span>CLOUD &amp;</span>
              <span class="indent"><em>LINUX</em></span>
            </div>
            <div class="mini-dashboard">
              <div class="mini-dashboard-row"><span>STATUS</span><span>READY TO ADD</span></div>
              <div class="mini-dashboard-row"><span>FILE</span><span>ASSETS/JS/DATA.JS</span></div>
            </div>
          </div>
          <div class="project-info">
            <div>
              <div class="project-kicker">EXTENSIBLE PROJECT SLOT</div>
              <h3>Upcoming ${escapeHtml(category)} Projects</h3>
              <p>Currently pursuing a Skill Diploma in Cloud Computing alongside hands-on Linux and networking practice. New infrastructure and cloud lab projects can be added directly in <code>assets/js/data.js</code>.</p>
            </div>
            <div class="tag-row">
              <span>LINUX ADMINISTRATION</span>
              <span>CLOUD INFRASTRUCTURE</span>
              <span>NETWORKING</span>
            </div>
          </div>
        </article>`;
      return;
    }

    projectsGrid.innerHTML = filtered
      .map((project, idx) => {
        const isFeatured = Boolean(project.featured) && category === "All";
        const tagsHtml = project.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("");

        const visualContent = isFeatured
          ? `
            <span class="project-visual-num">${escapeHtml(project.num)}</span>
            <div class="project-visual-title">
              <span>${escapeHtml(project.visualLines ? project.visualLines[0] : project.title)}</span>
              <span class="indent"><em>${escapeHtml(project.visualLines ? project.visualLines[1] : "")}</em></span>
            </div>
            <div class="mini-dashboard">
              ${(project.dashboardRows || [])
                .map(
                  (row) =>
                    `<div class="mini-dashboard-row"><span>${escapeHtml(row.label)}</span><span>${escapeHtml(row.value)}</span></div>`
                )
                .join("")}
            </div>`
          : `
            <span class="project-visual-num">${escapeHtml(project.num)}</span>
            <div class="project-glyph-wrap">
              <div class="project-glyph">${ICONS[project.icon] || ICONS.terminal}</div>
            </div>`;

        const repoLinkHtml = project.githubUrl
          ? `<a class="text-link" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub Repo ↗</a>`
          : `<a class="text-link" href="${escapeHtml(data.profile.github)}" target="_blank" rel="noopener noreferrer">GitHub Profile ↗</a>`;

        return `
          <article class="project ${isFeatured ? "featured" : ""}" style="transition-delay: ${Math.min(idx * 45, 180)}ms;">
            <div class="project-visual">${visualContent}</div>
            <div class="project-info">
              <div>
                <div class="project-kicker">${escapeHtml(project.kicker)}</div>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.shortDesc)}</p>
              </div>
              <div class="tag-row">${tagsHtml}</div>
              <div class="project-links">
                <button type="button" class="project-action-btn" data-project-id="${escapeHtml(project.id)}">
                  Project Details ↗
                </button>
                ${repoLinkHtml}
              </div>
            </div>
          </article>`;
      })
      .join("");

    observeProjectCards();

    projectsGrid.querySelectorAll("[data-project-id]").forEach((btn) => {
      btn.addEventListener("click", () => openProjectModal(btn.getAttribute("data-project-id")));
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "All";
      filterBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("active", isCurrent);
        b.setAttribute("aria-pressed", String(isCurrent));
      });
      renderProjects(activeFilter);
    });
  });

  renderProjects(activeFilter);

  /* ------------------------------------------------------------------------
     Project Detail Modal
     ------------------------------------------------------------------------ */
  const modal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const modalKicker = document.getElementById("modal-kicker");
  const modalTitle = document.getElementById("modal-title");
  const modalScreenshot = document.getElementById("modal-screenshot");
  const modalDesc = document.getElementById("modal-desc");
  const modalBullets = document.getElementById("modal-bullets");
  const modalTags = document.getElementById("modal-tags");
  const modalActions = document.getElementById("modal-actions");
  let lastFocusedEl = null;

  function openProjectModal(projectId) {
    const project = data.projects.find((p) => p.id === projectId);
    if (!project || !modal) return;
    lastFocusedEl = document.activeElement;

    modalKicker.textContent = project.kicker;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.shortDesc;
    modalBullets.innerHTML = project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("");
    modalTags.innerHTML = project.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("");

    if (project.screenshot) {
      modalScreenshot.innerHTML = `<img src="${escapeHtml(project.screenshot)}" alt="${escapeHtml(project.title)} screenshot">`;
    } else {
      modalScreenshot.innerHTML = `
        <span class="mono" style="color: var(--red); margin-bottom: 6px;">SCREENSHOT SLOT READY</span>
        <span style="color: var(--muted); font-size: 0.9rem;">Add an image path to <code>screenshot</code> for <strong>${escapeHtml(project.title)}</strong> in <code>assets/js/data.js</code> to display a preview here.</span>`;
    }

    const repoButton = project.githubUrl
      ? `<a class="btn-accent" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">Open GitHub Repository ↗</a>`
      : `<a class="btn-outline" href="${escapeHtml(data.profile.github)}" target="_blank" rel="noopener noreferrer">GitHub Profile (Repo Link Slot Ready) ↗</a>`;

    modalActions.innerHTML = `${repoButton}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      setMenuOpen(false);
    }
  });

  /* ------------------------------------------------------------------------
     Certifications Rendering
     ------------------------------------------------------------------------ */
  const certsGrid = document.getElementById("certs-grid");
  if (certsGrid) {
    certsGrid.innerHTML = data.certifications
      .map((cert) => {
        const footerHtml = cert.credentialUrl
          ? `<div class="cert-footer">
              <span class="cert-slot-label">${cert.imageUrl ? "Certificate Attached" : "Verified"}</span>
              <a class="text-link" href="${escapeHtml(cert.credentialUrl)}" target="_blank" rel="noopener noreferrer">View Credential ↗</a>
            </div>`
          : "";

        return `
          <article class="cert-card">
            <div>
              <div class="cert-top">
                <span class="cert-idx">${escapeHtml(cert.num)}</span>
                <span class="cert-date">${escapeHtml(cert.date)}</span>
              </div>
              <h3>${escapeHtml(cert.title)}</h3>
              <p class="cert-issuer">${escapeHtml(cert.issuer)}</p>
            </div>
            ${footerHtml}
          </article>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     Active Nav Link Highlight & Sticky Header State on Scroll
     ------------------------------------------------------------------------ */
  const headerNav = document.querySelector(".nav");
  if (headerNav) {
    const syncNavScroll = () => {
      headerNav.classList.toggle("scrolled", window.scrollY > 24);
    };
    syncNavScroll();
    window.addEventListener("scroll", syncNavScroll, { passive: true });
  }

  const navAnchors = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((sec) => navObserver.observe(sec));
  }
})();
