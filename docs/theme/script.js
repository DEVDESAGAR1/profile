// Responsive menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = document.querySelector('.menu-icon');

  if (menuToggle && navLinks && menuIcon) {
    menuToggle.addEventListener('change', function() {
      navLinks.style.display = menuToggle.checked ? 'flex' : '';
    });
  }

  // Projects and Certifications dynamic rendering
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
          <small>Tech Stack: ${proj.tech}</small><br>
          <a href="${proj.repo}" target="_blank">GitHub Repo</a>
        `;
        projectsGrid.appendChild(card);
      });
    }

    // Render Certs
    if (certsGrid && Array.isArray(certs)) {
      certs.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<b>${cert.title}</b><br><small>${cert.issuer}</small>`;
        certsGrid.appendChild(card);
      });
    }
  });

  // Vibrant contact form: fake submit
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