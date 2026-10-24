document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
const t=document.querySelector('.nav-toggle'),n=document.querySelector('.nav');
t&&t.addEventListener('click',()=>{const o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// forms -> prefilled email
document.querySelectorAll('form[data-mailto]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();
const body=[...new FormData(f)].map(([k,v])=>`${k}: ${v}`).join('\n');
location.href=`mailto:${f.dataset.mailto}?subject=${encodeURIComponent(f.dataset.subject)}&body=${encodeURIComponent(body)}`;}));
n&&n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');t.setAttribute('aria-expanded','false')}));
document.addEventListener('click',e=>{if(n&&n.classList.contains('open')&&!e.target.closest('.site-header')){n.classList.remove('open');t.setAttribute('aria-expanded','false')}});
const hv=document.getElementById('heroVideo'),vb=document.getElementById('videoBtn');
if(hv&&vb){const icon=vb.querySelector('.vb-icon'),txt=vb.querySelector('.vb-text');
 const ui=p=>{icon.textContent=p?'❚❚':'▶';txt.textContent=p?'Pause':'Resume';vb.setAttribute('aria-label',p?'Pause video':'Play video');vb.setAttribute('aria-pressed',p)};
 vb.addEventListener('click',()=>hv.paused?hv.play():hv.pause());
 hv.addEventListener('play',()=>ui(true));hv.addEventListener('pause',()=>ui(false));
 const p=hv.play();if(p)p.catch(()=>ui(false));}
