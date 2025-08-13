// Terminal typing effect
const termBody = document.querySelector(".term-body");
const cursor = document.querySelector(".cursor");
const commands = [
  "$ git clone github.com/devdesagar/portfolio",
  "$ cd infra && terraform plan",
  "✔ migrate-prod (safe)",
  "✔ deploy: k8s / helm / newrelic"
];
let i=0,j=0;
function typeCommand(){
  if(i<commands.length){
    if(j<commands[i].length){
      termBody.innerHTML += commands[i][j];
      j++;
      setTimeout(typeCommand,50);
    }else{
      termBody.innerHTML += "<br>";
      i++;
      j=0;
      setTimeout(typeCommand,300);
    }
  }else{ termBody.innerHTML += "<span class='cursor'>|</span>"; }
}
typeCommand();

// Scroll animations
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
