document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
const t=document.querySelector('.nav-toggle'),n=document.querySelector('.nav');
t&&t.addEventListener('click',()=>{const o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// forms -> prefilled email
document.querySelectorAll('form[data-mailto]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();
const body=[...new FormData(f)].map(([k,v])=>`${k}: ${v}`).join('\n');
location.href=`mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.subject)}&body=${encodeURIComponent(body)}`;}));
