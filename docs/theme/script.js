// Intersection animations
const panels=document.querySelectorAll('.panel,.project,.skill');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('animate'); }
  });
},{threshold:0.2});
panels.forEach(panel=>observer.observe(panel));

// Quick stats counter
const counters=document.querySelectorAll('.quick-stats li strong');
counters.forEach(counter=>{
  const updateCount=()=>{
    const target=+counter.getAttribute('data-target')||+counter.innerText;
    let count=0; const step=Math.ceil(target/100);
    const interval=setInterval(()=>{
      count+=step;
      if(count>=target){ count=target; clearInterval(interval); }
      counter.innerText=count;
    },20);
  };
  updateCount();
});

// Contact form placeholder
function handleForm(e){ e.preventDefault(); alert("Form submitted! We'll get in touch."); return false; }

// Footer year
document.getElementById('year').innerText = new Date().getFullYear();

// Fetch projects
fetch('data/projects.json')
.then(res => res.json())
.then(projects => {
  const projectList = document.getElementById('project-list');
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project neon-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p class="meta"><strong>Tech Stack:</strong> ${p.techStack}</p>
      <ul class="highlights">${p.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
      <a href="${p.repo}" class="btn neon-btn ghost">GitHub Repo</a>
      ${p.preview ? `<div class="preview-overlay"><img src="${p.preview}" alt="${p.title} Preview"></div>` : ''}
    `;
    projectList.appendChild(card);
  });
});

// Fetch certifications
fetch('data/certifications.json')
.then(res => res.json())
.then(certs => {
  const certList = document.getElementById('cert-list');
  certs.forEach(cert => {
    const li = document.createElement('li');
    li.className = "cert-item neon-card";
    li.innerHTML = `
      <a href="${cert.issuer.includes('AWS') ? 'https://aws.amazon.com/what-is-cloud-computing' : '#'}" target="_blank">
        <img src="${cert.image}" alt="${cert.name}" class="cert-icon">
      </a>
      <div class="cert-info">
        <strong>${cert.name}</strong>
        <p>${cert.issuer}</p>
      </div>
    `;
    certList.appendChild(li);
  });
});
