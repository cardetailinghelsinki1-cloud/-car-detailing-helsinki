const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>{menuBtn.classList.toggle('open');navLinks.classList.toggle('open');});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuBtn.classList.remove('open');navLinks.classList.remove('open');}));

(function(){const t=document.getElementById('track');if(t)t.innerHTML+=t.innerHTML;})();

/* Arvostelut: "Lataa lisää" -nappi näyttää loput kortit */
(function(){var btn=document.getElementById('loadMoreReviews');if(!btn)return;btn.addEventListener('click',function(){var g=document.getElementById('reviewGrid');if(g)g.classList.add('show-all');btn.style.display='none';});})();

/* Kampanjapalkki: täytä liikkuva rata + live-laskuri (82rentals-tyyli) */
(function(){
  var bar=document.querySelector('.promobar');if(!bar)return;
  var track=bar.querySelector('.promo-track');
  if(track){
    var unit=track.innerHTML,n=1;
    while((track.scrollWidth < window.innerWidth*2 || n%2!==0) && n<24){track.innerHTML+=unit;n++;}
    track.style.animationDuration=Math.max(18,(track.scrollWidth/2)/90)+'s';
  }
  var dl=new Date(bar.getAttribute('data-deadline')).getTime();
  function p(n){return(n<10?'0':'')+n;}
  function set(cls,val){var e=bar.querySelectorAll(cls);for(var i=0;i<e.length;i++)e[i].textContent=val;}
  function tick(){
    var diff=dl-Date.now();if(diff<0)diff=0;
    set('.cd-d',p(Math.floor(diff/86400000)));
    set('.cd-h',p(Math.floor(diff%86400000/3600000)));
    set('.cd-m',p(Math.floor(diff%3600000/60000)));
    set('.cd-s',p(Math.floor(diff%60000/1000)));
  }
  tick();setInterval(tick,1000);
})();

document.querySelectorAll('.qa button').forEach(b=>{b.addEventListener('click',()=>{const qa=b.parentElement,a=qa.querySelector('.a'),open=qa.classList.contains('open');document.querySelectorAll('.qa').forEach(x=>{x.classList.remove('open');x.querySelector('.a').style.maxHeight=null;});if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});});

const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

if(!reduce){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));}

function animateCount(el){
  const target=parseFloat(el.dataset.target),dec=parseInt(el.dataset.dec||'0'),dur=1400,t0=performance.now();
  function step(now){
    let p=Math.min((now-t0)/dur,1);
    p=1-Math.pow(1-p,3);
    const val=target*p;
    el.textContent=dec?val.toFixed(dec).replace('.',','):Math.round(val).toString();
    if(p<1)requestAnimationFrame(step);
    else el.textContent=dec?target.toFixed(dec).replace('.',','):Math.round(target).toString();
  }
  requestAnimationFrame(step);
}
const counters=document.querySelectorAll('.count');
if(!reduce&&counters.length){
  const cio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});},{threshold:.5});
  counters.forEach(c=>cio.observe(c));
}else{counters.forEach(c=>{const d=parseInt(c.dataset.dec||'0');c.textContent=d?parseFloat(c.dataset.target).toFixed(d).replace('.',','):c.dataset.target;});}

/* ===== LISÄANIMAATIOT ===== */
/* Vierityksen edistymispalkki */
(function(){
  var bar=document.createElement('div');bar.className='scrollbar';document.body.appendChild(bar);
  function upd(){var h=document.documentElement,sc=h.scrollTop||document.body.scrollTop,max=h.scrollHeight-h.clientHeight;bar.style.width=(max>0?sc/max*100:0)+'%';}
  window.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
})();

if(!reduce){
  /* Kuvien pyyhkäisy-paljastus */
  document.querySelectorAll('.media').forEach(m=>m.classList.add('anim-img'));
  const mio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');mio.unobserve(e.target);}});},{threshold:.2});
  document.querySelectorAll('.media').forEach(m=>mio.observe(m));

  /* Otsikon aksenttiviiva piirtyy */
  const hio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('drawn');hio.unobserve(e.target);}});},{threshold:.6});
  document.querySelectorAll('.sec-head h2').forEach(h=>hio.observe(h));

  /* Split-osioiden teksti liukuu sivusta */
  document.querySelectorAll('.split').forEach(s=>{
    const copy=s.querySelector('.copy'),rev=s.classList.contains('rev');
    if(copy)copy.classList.add('rv',rev?'from-r':'from-l');
  });
  const sio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');sio.unobserve(e.target);}});},{threshold:.2});
  document.querySelectorAll('.rv').forEach(el=>sio.observe(el));
}else{
  document.querySelectorAll('.sec-head h2').forEach(h=>h.classList.add('drawn'));
}

/* Näin se toimii -aikajana: viivan täyttö scrollissa + solmujen aktivointi + korttien reveal */
(function(){
  var steps=document.getElementById('howitSteps');if(!steps)return;
  var fill=steps.querySelector('.howit-line-fill');
  var nodes=[].slice.call(steps.querySelectorAll('.howit-node'));
  var cards=[].slice.call(steps.querySelectorAll('.howit-card'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.25});
    cards.forEach(function(c){io.observe(c);});
  }else{cards.forEach(function(c){c.classList.add('in');});}
  function update(){
    var r=steps.getBoundingClientRect();
    var vh=window.innerHeight||document.documentElement.clientHeight;
    var anchor=vh*0.55;
    var h=Math.max(0,Math.min(r.height,anchor-r.top));
    if(fill)fill.style.height=h+'px';
    nodes.forEach(function(n){
      var nr=n.getBoundingClientRect();
      if((nr.top+nr.height/2)<=anchor)n.classList.add('active');else n.classList.remove('active');
    });
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  update();
})();
