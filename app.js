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

const reduce=false;

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

/* Näin se toimii: mutkitteleva pallopolku (koot aaltoilevat skrollatessa) + korttien reveal */
(function(){
  var steps=document.getElementById('howitSteps');if(!steps)return;
  var cards=[].slice.call(steps.querySelectorAll('.howit-card'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.25});
    cards.forEach(function(c){io.observe(c);});
  }else{cards.forEach(function(c){c.classList.add('in');});}
  var canvas=document.getElementById('howitPath');
  var stepEls=[].slice.call(steps.querySelectorAll('.howit-step'));
  if(!canvas||!canvas.getContext)return;
  var ctx=canvas.getContext('2d');
  var dpr=Math.max(1,window.devicePixelRatio||1);
  var Wcss=78,Hcss=0;
  var SPACING=18,AMP=11,WAVELEN=300;
  var DOT_BASE=0.6,DOT_VAR=6.5;      /* pallon säde: hyvin pieni reunoilla, kohtuullinen keskellä */
  var NODE_BASE=6,NODE_VAR=10;       /* numeropallot: pieni reunalla, kasvavat keskellä */
  var nodeYs=[];
  var hoverF=cards.map(function(){return 0;});
  var hoverTarget=cards.map(function(){return 0;});
  function meander(y){return AMP*Math.sin(y/WAVELEN*Math.PI*2);}
  /* vain kapea kaista ruudun keskellä on suurimmillaan (terävä huippu) */
  function focus(screenY,vh){
    var d=Math.abs(screenY-vh/2)/(vh*0.36);
    if(d>1)d=1;
    var f=Math.cos(d*Math.PI/2);
    return f*f;
  }
  function draw(){
    if(!Hcss)return;
    var vh=window.innerHeight||document.documentElement.clientHeight;
    var top=steps.getBoundingClientRect().top;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,Wcss,Hcss);
    var cx=Wcss/2;
    for(var y=SPACING/2;y<Hcss;y+=SPACING){
      var f=focus(top+y,vh);
      var r=DOT_BASE+DOT_VAR*f;
      ctx.beginPath();
      ctx.arc(cx+meander(y),y,r,0,Math.PI*2);
      ctx.fillStyle='rgba(10,61,98,'+(0.35+0.55*f)+')';
      ctx.fill();
    }
    for(var i=0;i<nodeYs.length;i++){
      var ny=nodeYs[i];
      var nf=focus(top+ny,vh);
      var nr=(NODE_BASE+NODE_VAR*nf)*(1+0.5*(hoverF[i]||0));
      var nx=cx+meander(ny);
      ctx.beginPath();
      ctx.arc(nx,ny,nr,0,Math.PI*2);
      ctx.fillStyle='#7FB4FF';
      ctx.fill();
      ctx.fillStyle='#fff';
      ctx.font='700 '+(nr*1.05).toFixed(1)+'px Poppins, system-ui, sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(String(i+1),nx,ny+0.5);
    }
  }
  function measure(){
    var sr=steps.getBoundingClientRect();
    nodeYs=stepEls.map(function(st){var r=st.getBoundingClientRect();return (r.top-sr.top)+r.height/2;});
  }
  function resize(){
    Hcss=steps.offsetHeight;
    canvas.style.width=Wcss+'px';canvas.style.height=Hcss+'px';
    canvas.width=Math.round(Wcss*dpr);canvas.height=Math.round(Hcss*dpr);
    measure();draw();
  }
  var ticking=false;
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(function(){draw();ticking=false;});}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',resize);
  /* Kortin hover suurentaa myös vastaavan numeropallon (samaan aikaan) */
  var hoverRAF=null;
  function hoverStep(){
    var moving=false;
    for(var i=0;i<hoverF.length;i++){
      var diff=hoverTarget[i]-hoverF[i];
      if(Math.abs(diff)>0.004){hoverF[i]+=diff*0.22;moving=true;}else{hoverF[i]=hoverTarget[i];}
    }
    draw();
    hoverRAF=moving?requestAnimationFrame(hoverStep):null;
  }
  function startHover(){if(!hoverRAF)hoverStep();}
  cards.forEach(function(c,i){
    c.addEventListener('mouseenter',function(){hoverTarget[i]=1;startHover();});
    c.addEventListener('mouseleave',function(){hoverTarget[i]=0;startHover();});
  });
  resize();
  setTimeout(resize,400);
})();

/* Jokaisen osion otsikko suurenee, kun se osuu keskelle ruutua skrollatessa.
   Monirivinen otsikko jaetaan riveihin -> rivit suurenevat eri aikaan. */
(function(){
  var heads=[].slice.call(document.querySelectorAll('h1, h2'));
  if(!heads.length)return;
  var AMP=0.09;    /* enimmäissuurennos (9 %) – ei niin paljon että rivit menisivät päällekkäin */
  var lines=[];    /* kaikki .sl-rivit kaikista otsikoista */

  /* Pilko otsikko sanoihin (säilyttäen sisä-elementtien luokat kuten .hh) */
  function tokenize(h){
    var words=[];
    (function walk(node,cls){
      for(var i=0;i<node.childNodes.length;i++){
        var n=node.childNodes[i];
        if(n.nodeType===3){
          var parts=n.textContent.split(/(\s+)/);
          for(var j=0;j<parts.length;j++){
            if(parts[j]==='')continue;
            if(/^\s+$/.test(parts[j])){words.push(null);continue;}   /* väli */
            var subs=parts[j].match(/[^-]+-?|-/g)||[parts[j]];       /* pilko myös yhdyssanat tavuviivan kohdalta */
            for(var m=0;m<subs.length;m++)words.push({t:subs[m],c:cls});
          }
        }else if(n.nodeType===1){
          if(n.tagName==='BR'){words.push({br:true});continue;}   /* pakotettu rivinvaihto */
          var nc=(cls?cls+' ':'')+(n.getAttribute('class')||'');
          walk(n,nc.trim());
        }
      }
    })(h,'');
    return words;
  }

  /* Rakenna otsikko uudelleen: sanat span-elementteinä (välit säilytetään), ryhmitellään riveiksi näytöllä */
  function build(h){
    if(h.dataset.orig==null)h.dataset.orig=h.innerHTML;
    var toks=tokenize(h);
    h.classList.add('hscale');
    h.textContent='';
    var wspans=[],brBefore=[],pendingBr=false;
    for(var i=0;i<toks.length;i++){
      if(toks[i]===null){h.appendChild(document.createTextNode(' '));continue;}  /* alkuperäinen väli */
      if(toks[i].br){pendingBr=true;continue;}      /* pakotettu rivinvaihto seuraavan sanan eteen */
      var s=document.createElement('span');
      s.textContent=toks[i].t;
      if(toks[i].c)s.className=toks[i].c;           /* esim. hh (korostusväri) */
      h.appendChild(s);wspans.push(s);brBefore.push(pendingBr);pendingBr=false;
    }
    /* ryhmittele saman rivin (sama offsetTop) sanat – tai pakotettu rivinvaihto */
    var groups=[],cur=null,top=null;
    for(var k=0;k<wspans.length;k++){
      var ot=wspans[k].offsetTop;
      if(cur===null||brBefore[k]||Math.abs(ot-top)>3){cur=[];groups.push(cur);top=ot;}
      cur.push(wspans[k]);
    }
    /* kääri jokaisen rivin DOM-alue (sanat + niiden väliset välit) omaan .sl-lohkoonsa */
    var align=(getComputedStyle(h).textAlign==='center')?'center':'left';   /* origo tekstin tasauksen mukaan, ettei teksti leikkaudu reunasta */
    var sls=[];
    for(var g=0;g<groups.length;g++){
      var first=groups[g][0],last=groups[g][groups[g].length-1];
      var sl=document.createElement('span');
      sl.className='sl';
      sl.style.transformOrigin=align+' center';
      h.insertBefore(sl,first);
      var node=first;
      while(node){var next=node.nextSibling;sl.appendChild(node);if(node===last)break;node=next;}
      sls.push(sl);
    }
    return sls;
  }

  function rebuildAll(){
    lines=[];
    for(var i=0;i<heads.length;i++){
      var h=heads[i];
      if(h.dataset.orig!=null)h.innerHTML=h.dataset.orig;   /* palauta ennen uutta pilkontaa */
      lines=lines.concat(build(h));
    }
  }

  var ticking=false;
  function upd(){
    var vh=window.innerHeight||document.documentElement.clientHeight;
    var mid=vh/2;
    var narrow=(window.innerWidth||document.documentElement.clientWidth)<=760;
    var amp=narrow?0.05:AMP;                        /* puhelimella hillitympi suurennos, ettei teksti leikkaudu reunoista */
    for(var i=0;i<lines.length;i++){
      var r=lines[i].getBoundingClientRect();
      var c=r.top+r.height/2;
      var t=1-Math.abs(c-mid)/(vh*0.5);            /* 1 kun rivi keskellä, 0 kun ½ ruutua etäällä */
      if(t<0)t=0;else if(t>1)t=1;
      var e=t*t*(3-2*t);                            /* pehmeä (smoothstep) */
      lines[i].style.transform='scale('+(1+amp*e).toFixed(3)+')';
    }
    ticking=false;
  }

  var rzTimer=null,lastW=window.innerWidth;
  function onResize(){
    if(window.innerWidth===lastW){upd();return;}   /* vain korkeus muuttui -> ei tarvitse pilkkoa uudelleen */
    lastW=window.innerWidth;
    clearTimeout(rzTimer);
    rzTimer=setTimeout(function(){rebuildAll();upd();},160);
  }

  rebuildAll();
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(upd);}},{passive:true});
  window.addEventListener('resize',onResize);
  window.addEventListener('load',function(){rebuildAll();upd();});  /* fonttien latauduttua rivijako voi muuttua */
  upd();
})();

/* Logon säihkyvä kaista seuraa ruudun keskikohtaa skrollatessa (vain palvelut-sivun hero) */
(function(){
  var wrap=document.querySelector('.page-hero .hero-logo');
  if(!wrap)return;
  var ticking=false,headDoc=null;
  function upd(){
    var r=wrap.getBoundingClientRect();
    var vh=window.innerHeight||document.documentElement.clientHeight;
    if(headDoc===null){                             /* viereisen otsikon keskikohdan dokumenttisijainti (vakio) */
      var sl=document.querySelector('.page-hero h1.hscale .sl')||document.querySelector('.page-hero h1');
      if(sl){var rr=sl.getBoundingClientRect();headDoc=rr.top+rr.height/2+window.scrollY;}
    }
    var sc=window.scrollY;
    var C=vh/2-r.top;                               /* normaali keskikohta-seuranta (vanha nopeus) */
    var P=Math.max((headDoc!=null?headDoc:vh/2)-vh/2,130);  /* skrollikohta jossa otsikko suurimmillaan (väh. 130 -> yläosa ehtii säihkyä) */
    var shy;
    if(sc<P){                                       /* vaihe 1: säihke lähtee logon yläreunasta ja kiihtyy keskikohtaan */
      shy=((C-sc)+P)*(sc/P);
    }else{                                          /* vaihe 2: sama vanha keskikohta-seuranta */
      shy=C;
    }
    if(shy<0)shy=0;
    wrap.style.setProperty('--shy',shy.toFixed(1)+'px');
    if(sc>2)wrap.classList.add('shimmer-on');       /* aktivoi säihke vasta kun aletaan skrollata (aluksi piilossa) */
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(upd);}},{passive:true});
  window.addEventListener('resize',upd);
  window.addEventListener('load',upd);
  upd();
})();
