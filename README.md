# Mohammed Shibil Vasith MK — Personal Portfolio

A static, GitHub Pages-ready personal portfolio built with HTML, CSS, and vanilla JavaScript.

## Structure
- `index.html` — Semantic page structure across Hero, About, Technical Skills, Projects, Experience, Education, Certifications, and Contact.
- `assets/css/styles.css` — Design system tokens (light & dark themes), editorial typography, brutalist hairline grid layouts, and responsive breakpoints.
- `assets/js/data.js` — Data definitions for projects and certifications.
- `assets/js/main.js` — Theme toggle, mobile navigation drawer, project filtering, modal detail view, certifications grid, and scroll-reveal animations.
- `assets/images/shibil-portrait.jpg` — Portrait photograph.
- `assets/Mohammed-Shibil-Vasith-MK-Resume.pdf` — Downloadable PDF resume.

## Adding Future Linux / Cloud Computing Projects
Open `assets/js/data.js` and append a new object to `PORTFOLIO_DATA.projects` with `category: "Cloud & Linux"`, plus optional `screenshot` and `githubUrl` fields.

## Adding Certification Links or Images
Open `assets/js/data.js` and set `credentialUrl` and/or `imageUrl` on any entry in `PORTFOLIO_DATA.certifications`.

## Deploying to GitHub Pages
1. Push this folder's contents to a GitHub repository (e.g. `portfolio`).
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**, pick `main` and `/ (root)`, and save.
