// ---------- Skills Data ----------
const skillsData = [
  { name: "AWS Cloud", level: "90%" },
  { name: "Terraform / IaC", level: "85%" },
  { name: "Kubernetes / Docker", level: "80%" },
  { name: "CI/CD Pipelines", level: "90%" },
  { name: "Scripting (Python/Bash)", level: "85%" },
  { name: "Monitoring & Observability", level: "80%" }
];

// ---------- Typing Effect with Cursor and Prefix ----------
function typeText(element, text, speed = 50, prefix = "> ", callback = null) {
  let i = 0;
  element.textContent = prefix;
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  element.appendChild(cursor);

  const timer = setInterval(() => {
    element.textContent = prefix + text.substring(0, i + 1);
    element.appendChild(cursor);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

// ---------- Render Skills ----------
const skillsContainer = document.getElementById('skills-container');
skillsData.forEach(skill => {
  const div = document.createElement('div');
  div.classList.add('skill');
  div.innerHTML = `<h3>${skill.name}</h3><div class="skill-bar"><div style="width:0;"></div></div><span class="skill-text"></span>`;
  skillsContainer.appendChild(div);

  setTimeout(() => {
    div.querySelector('.skill-bar div').style.width = skill.level;
    typeText(div.querySelector('.skill-text'), skill.level, 50, '> ');
  }, 200);
});

// ---------- Load Projects ----------
fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    projects.forEach((proj, index) => {
      const div = document.createElement('div');
      div.classList.add('project');
      div.innerHTML = `<h3>${proj.title}</h3><p class="project-text"></p><p><a href="${proj.link}" target="_blank">View Project</a></p>`;
      container.appendChild(div);

      setTimeout(() => {
        const p = div.querySelector('.project-text');
        typeText(p, proj.description, 30, '> ');
      }, index * 400);
    });
  });

// ---------- Load Certifications ----------
fetch('data/certifications.json')
  .then(response => response.json())
  .then(certs => {
    const container = document.getElementById('certifications-container');
    certs.forEach(cert => {
      const div = document.createElement('div');
      div.classList.add('cert');
      div.textContent = cert.name;
      container.appendChild(div);
    });
  });
