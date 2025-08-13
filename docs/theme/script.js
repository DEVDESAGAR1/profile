// ---------- Particle Background ----------
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const colors = ['#00e0ff', '#00ffd5', '#ffffff'];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if(this.x<0||this.x>canvas.width)this.speedX*=-1;
    if(this.y<0||this.y>canvas.height)this.speedY*=-1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}
function initParticles(num=150){ for(let i=0;i<num;i++){ particlesArray.push(new Particle()); }}
function animateParticles(){ ctx.clearRect(0,0,canvas.width,canvas.height); particlesArray.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animateParticles);}
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
initParticles(); animateParticles();

// ---------- Skills Data ----------
const skillsData = [
  { name: "AWS Cloud", level: "90%" },
  { name: "Terraform / IaC", level: "85%" },
  { name: "Kubernetes / Docker", level: "80%" },
  { name: "CI/CD Pipelines", level: "90%" },
  { name: "Scripting (Python/Bash)", level: "85%" },
  { name: "Monitoring & Observability", level: "80%" }
];

// ---------- Typing Effect ----------
function typeText(element,text,speed=50,prefix='> ',callback=null){
  let i=0; element.textContent=prefix;
  const cursor=document.createElement('span'); cursor.classList.add('cursor'); element.appendChild(cursor);
  const timer=setInterval(()=>{
    element.textContent=prefix+text.substring(0,i+1);
    element.appendChild(cursor);
    i++; if(i>=text.length){ clearInterval(timer); if(callback) callback(); }
  },speed);
}

// ---------- Render Skills ----------
const skillsContainer = document.getElementById('skills-container');
skillsData.forEach(skill=>{
  const div=document.createElement('div'); div.classList.add('skill');
  div.innerHTML=`<h3>${skill.name}</h3><div class="skill-bar"><div style="width:0;"></div></div><span class="skill-text"></span>`;
  skillsContainer.appendChild(div);
  setTimeout(()=>{ div.querySelector('.skill-bar div').style.width=skill.level; typeText(div.querySelector('.skill-text'),skill.level,50,'> '); },200);
});

// ---------- Load Projects ----------
fetch('data/projects.json')
.then(res=>res.json())
.then(projects=>{
  const container=document.getElementById('projects-container');
  projects.forEach((proj,index)=>{
    const div=document.createElement('div'); div.classList.add('project');
    div.innerHTML=`<h3>${proj.title}</h3><p class="project-text"></p><p class="project-describe">${proj.describe}</p><p><a href="${proj.link}" target="_blank">View Project</a></p>`;
    container.appendChild(div);
    setTimeout(()=>{
      const p=div.querySelector('.project-text');
      typeText(p,proj.description,30,'> ');
    }, index*400);
  });
});

// ---------- Load Certifications ----------
fetch('data/certifications.json')
.then(res=>res.json())
.then(certs=>{
  const container=document.getElementById('certifications-container');
  certs.forEach(cert=>{ const div=document.createElement('div'); div.classList.add('cert'); div.textContent=cert.name; container.appendChild(div); });
});
