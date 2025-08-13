document.addEventListener('DOMContentLoaded', function() {
  // Responsive menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = document.querySelector('.menu-icon');
  if (menuToggle && navLinks && menuIcon) {
    menuToggle.addEventListener('change', function() {
      navLinks.style.display = menuToggle.checked ? 'flex' : '';
    });
  }

  // Dynamic Projects and Certifications (render certifications ONLY from certifications.json file)
  Promise.all([
    fetch('data/projects.json').then(r => r.json()),
    fetch('data/certifications.json').then(r => r.json())
  ]).then(([projects, certs]) => {
    const projectsGrid = document.getElementById('projects-grid');
    const certsGrid = document.getElementById('certs-grid');

    // Render Projects
    if (projectsGrid && Array.isArray(projects)) {
      projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <b>${proj.title}</b>
          <p>${proj.desc}</p>
          <small>Tech: ${proj.tech}</small><br>
          ${proj.repo && proj.repo !== "#" ? `<a href="${proj.repo}" target="_blank" style="color:var(--primary);font-size:0.97em;">GitHub Repo</a>` : ""}
        `;
        projectsGrid.appendChild(card);
      });
    }

    // Render Certifications ONLY from certifications.json file (no synthetic certs)
    if (certsGrid && Array.isArray(certs)) {
      certs.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<b>${cert.title}</b><br><small>${cert.issuer}</small>`;
        certsGrid.appendChild(card);
      });
    }
  }).catch(e => {
    document.getElementById('projects-grid').innerHTML = "<div style='color:red;'>Could not load data/projects.json or data/certifications.json. Check file paths and GitHub Pages publish settings.</div>";
    document.getElementById('certs-grid').innerHTML = "";
  });

  // Contact form interaction
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      contactForm.reset();
      contactForm.querySelector('button').textContent = "Sent!";
      setTimeout(() => {
        contactForm.querySelector('button').textContent = "Send Message";
      }, 2000);
    });
  }
});