/* LumiArchi — script commun aux pages intérieures : langue FR/EN, menu mobile, filtres, copie des coordonnées.
   La clé de langue 'la_lang' est la même que sur l'accueil : le choix suit le visiteur d'une page à l'autre. */
(function(){
'use strict';
const d=document, root=d.documentElement;
const $=(s,r)=>(r||d).querySelector(s);
const $$=(s,r)=>Array.from((r||d).querySelectorAll(s));
let lang='fr';
const abonnes=[];

function traduire(scope){
  $$('[data-en]',scope).forEach(el=>{
    if(el.dataset.fr===undefined) el.dataset.fr=el.innerHTML;
    el.innerHTML=(lang==='en')?el.dataset.en:el.dataset.fr;
  });
  $$('[data-en-label]',scope).forEach(el=>{
    if(el.dataset.frLabel===undefined) el.dataset.frLabel=el.getAttribute('aria-label');
    el.setAttribute('aria-label',(lang==='en')?el.dataset.enLabel:el.dataset.frLabel);
  });
}
function setLang(l){
  lang=l; root.lang=l;
  traduire(d);
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===l)));
  abonnes.forEach(f=>f(l));
  try{localStorage.setItem('la_lang',l);}catch(e){}
}
window.LA={ get lang(){return lang;}, onLang(f){abonnes.push(f);}, traduire:traduire };
$$('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));

/* Menu mobile */
const menu=$('#menu'), menuBtn=$('#menuBtn');
if(menu&&menuBtn){
  const setMenu=open=>{ menu.hidden=!open; menuBtn.setAttribute('aria-expanded',String(open)); };
  menuBtn.addEventListener('click',()=>setMenu(menu.hidden));
  $$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  d.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!menu.hidden) setMenu(false); });
}

/* Filtres de la grille de projets */
const filtres=$$('.filtres button'), cartes=$$('[data-c]'), cpt=$('#pcpt');
filtres.forEach(b=>b.addEventListener('click',()=>{
  const f=b.dataset.f; let n=0;
  filtres.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  cartes.forEach(c=>{ const off=(f!=='all'&&c.dataset.c!==f); c.classList.toggle('off',off); if(!off) n++; });
  if(cpt) cpt.textContent=n;
}));

/* Copier les coordonnées */
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{
  const s=$('span',b);
  const ok=()=>{ s.textContent=(lang==='en')?'Copied':'Copié'; setTimeout(()=>{ s.textContent=(lang==='en')?'Copy':'Copier'; },1600); };
  const select=()=>{ const el=d.getElementById(b.dataset.for), r=d.createRange(); r.selectNodeContents(el); const sel=getSelection(); sel.removeAllRanges(); sel.addRange(r); };
  try{ navigator.clipboard.writeText(b.dataset.copy).then(ok,select); }catch(e){ select(); }
}));

/* Départ */
let saved='fr';
try{ saved=localStorage.getItem('la_lang')||'fr'; }catch(e){}
setLang(saved==='en'?'en':'fr');
})();
