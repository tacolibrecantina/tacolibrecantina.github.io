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
if(hv&&vb){
 const icon=vb.querySelector('.vb-icon'),txt=vb.querySelector('.vb-text');let ready=false,userStopped=false;
 const ui=p=>{icon.textContent=p?'❚❚':'▶';txt.textContent=p?'Pause':'Resume';vb.setAttribute('aria-label',p?'Pause video':'Play video');vb.setAttribute('aria-pressed',p)};
 const start=()=>{ready=true;if(userStopped){ui(false);return}hv.play().then(()=>ui(true)).catch(()=>ui(false))};
 vb.addEventListener('click',()=>{if(!ready){userStopped=!userStopped;txt.textContent=userStopped?'Autoplay off':'Loading…';return}hv.paused?(userStopped=false,hv.play()):(userStopped=true,hv.pause())});
 hv.addEventListener('play',()=>ui(true));hv.addEventListener('pause',()=>{if(ready)ui(false)});
 const src=hv.dataset.src;
 // Download the WHOLE video first, then play it from memory (no buffering stalls)
 const fallback=()=>{hv.preload='auto';hv.src=src;hv.addEventListener('canplaythrough',start,{once:true});hv.load()};
 if(location.protocol.startsWith('http')&&window.fetch&&window.ReadableStream){
  fetch(src).then(async r=>{if(!r.ok)throw 0;const total=+r.headers.get('Content-Length')||0,reader=r.body.getReader(),parts=[];let got=0;
   for(;;){const{done,value}=await reader.read();if(done)break;parts.push(value);got+=value.length;if(total&&!userStopped)txt.textContent='Loading '+Math.round(got/total*100)+'%'}
   hv.src=URL.createObjectURL(new Blob(parts,{type:'video/mp4'}));hv.addEventListener('loadeddata',start,{once:true});hv.load()}).catch(fallback);
 }else fallback();
}
