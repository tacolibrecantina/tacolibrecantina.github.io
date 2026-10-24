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
 let userPaused=false,slowPaused=false,offscreen=false,stalls=0,stallTimer=null;
 const ui=p=>{icon.textContent=p?'❚❚':'▶';txt.textContent=p?'Pause':'Resume';vb.setAttribute('aria-label',p?'Pause video':'Play video');vb.setAttribute('aria-pressed',p)};
 const tryPlay=()=>{const p=hv.play();if(p)p.catch(()=>ui(false))};
 // 1) Slow connection or Data Saver: don't autoplay
 const c=navigator.connection;
 if(c&&(c.saveData||/(^|-)2g|3g/.test(c.effectiveType||''))){slowPaused=true;hv.removeAttribute('autoplay');hv.pause();ui(false)}else tryPlay();
 // Button: user always wins
 vb.addEventListener('click',()=>{if(hv.paused){userPaused=false;slowPaused=false;stalls=0;tryPlay()}else{userPaused=true;hv.pause()}});
 hv.addEventListener('play',()=>ui(true));hv.addEventListener('pause',()=>ui(false));
 // 2) Buffering stalls: pause if it freezes 3+ seconds or stalls 3 times
 const stallPause=()=>{slowPaused=true;hv.pause()};
 hv.addEventListener('waiting',()=>{if(userPaused||offscreen)return;stalls++;clearTimeout(stallTimer);if(stalls>=3)return stallPause();stallTimer=setTimeout(()=>{if(hv.readyState<3)stallPause()},3000)});
 hv.addEventListener('playing',()=>clearTimeout(stallTimer));
 // 3) Pause when scrolled off screen or tab hidden; resume only if it wasn't paused by the user or for slowness
 const autoResume=()=>{if(!userPaused&&!slowPaused&&!offscreen&&!document.hidden)tryPlay()};
 new IntersectionObserver(([e])=>{offscreen=!e.isIntersecting;offscreen?hv.pause():autoResume()},{threshold:.15}).observe(hv);
 document.addEventListener('visibilitychange',()=>document.hidden?hv.pause():autoResume());
}
