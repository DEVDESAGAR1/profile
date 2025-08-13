document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearElem = document.getElementById('year');
  if(yearElem) yearElem.textContent = new Date().getFullYear();

  // Animate quick stats
  const counters = document.querySelectorAll('.quick-stats strong');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 100;
    const updateCount = () => {
      if(count < target){
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else { counter.innerText = target; }
    };
    updateCount();
  });

  // Load Certifications
  fetch('data/certifications.json')
    .then(res => res.json())
    .then(certs => {
      const certList = document.getElementById('cert-list');
      certs.forEach(cert => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${cert.name}</strong> — <span>${cert.issuer}</span>`;
        certList.appendChild(li);
      });
    })
    .catch(err => console.error(err));

  // Load Projects
  fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
      const projectList = document.getElementById('project-list');
      projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <p><strong>Tech Stack:</strong> ${p.techStack}</p>
          <ul>${p.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
          <a href="${p.repo}" target="_blank">GitHub Repo</a>
        `;
        projectList.appendChild(card);
      });
    })
    .catch(err => console.error(err));

});

// Contact form placeholder
function handleForm(e){
  e.preventDefault();
  alert("Thank you! Form submission is placeholder for now.");
  return false;
}
