/* Grat Denise · Café — main.js
   Requiere three.js r128 cargado antes (ver index.html). */
(function(){
/* ---------- Datos editables ---------- */
const CONFIG = {
  instagram: 'denise_grat',         // usuario de Instagram, sin @
  photo: 'assets/img/denise.jpg',   // foto del inicio (vertical, 4:5); si no existe se ve el espacio vacío
  email: 'denise.a.grat@gmail.com', // correo que recibe los mensajes
  formEndpoint: ''                  // opcional: URL de Formspree (https://formspree.io/f/xxxx) para enviar sin abrir el correo
};
const COURSES = [
  {t:'Introduction to Coffee', o:'Specialty Coffee Association (SCA)', y:'2025', s:'done'},
  {t:'Barista Skills · Foundation', o:'Specialty Coffee Association (SCA)', y:'2025', s:'done'},
  {t:'Brewing · Foundation', o:'Specialty Coffee Association (SCA)', y:'2026', s:'done'},
  {t:'Brewing · Intermediate', o:'Specialty Coffee Association (SCA)', y:'2026', s:'done'},
  {t:'Green Coffee · Foundation', o:'Specialty Coffee Association (SCA)', y:'2026', s:'done'},
  {t:'Fundamentos de tueste', o:'', y:'', s:'next'},
  {t:'Brewing · Advanced', o:'Specialty Coffee Association (SCA)', y:'', s:'next'},
  {t:'Barista Skills · Intermediate', o:'Specialty Coffee Association (SCA)', y:'', s:'next'}
];
const STATUS = {done:'completado', now:'en curso', next:'próximo'};
const SERVICES = [
  {t:'Talleres', d:'Espresso, métodos filtrados o leche. Grupos chicos, mucha práctica y preguntas sin vergüenza.'},
  {t:'Catas guiadas', d:'Probamos cafés lado a lado y aprendemos a ponerle palabras a lo que sentimos.'},
  {t:'Capacitación de equipos', d:'Para cafeterías que quieren calibrar mejor, ordenar la barra y servir con más confianza.'},
  {t:'Intervenciones de barra', d:'Una barra en tu evento, con café de especialidad bien preparado y bien explicado.'},
  {t:'Asesoría para cafeterías', d:'Recetas, equipamiento y flujo de trabajo. Miramos juntos qué está pasando y por qué.'},
  {t:'Colaboraciones', d:'Tostadores, marcas, otros baristas, proyectos de contenido. Si tiene café, charlemos.'}
];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.getElementById('courses').innerHTML = COURSES.map(c =>
  `<article class="card">${c.y ? `<span class="yr">${esc(c.y)}</span>` : ''}<h3>${esc(c.t)}</h3>${c.o ? `<p>${esc(c.o)}</p>` : ''}<span class="stamp s-${c.s}">${STATUS[c.s]}</span></article>`).join('');
document.getElementById('svc').innerHTML = SERVICES.map((s,i) =>
  `<article><span class="n">0${i+1}</span><h3>${s.t}</h3><p>${s.d}</p></article>`).join('');
const igUrl = 'https://www.instagram.com/' + CONFIG.instagram + '/';
document.querySelectorAll('[data-ig]').forEach(a => a.href = igUrl);
document.querySelectorAll('[data-ig-label]').forEach(a => a.textContent = '@' + CONFIG.instagram + ' ↗');
const portrait = document.getElementById('portrait'), portraitImg = document.getElementById('portrait-img');
portrait.classList.add('is-empty');
portraitImg.addEventListener('load', () => portrait.classList.remove('is-empty'));
if (CONFIG.photo) portraitImg.src = CONFIG.photo;
document.querySelectorAll('[data-mail-text]').forEach(a => a.textContent = CONFIG.email);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Hero parallax ---------- */
const hero = document.getElementById('hero');
const layers = [...hero.querySelectorAll('[data-speed]')];
const title = document.getElementById('title');
let hmx = 0, ticking = false;
hero.addEventListener('pointermove', e => { hmx = e.clientX / window.innerWidth - .5; parallax(); });
function parallax(){
  if (reduce) return;
  const y = window.scrollY; if (y > hero.offsetHeight * 1.2) return;
  layers.forEach(l => { l.style.transform = `translate3d(${hmx * (+l.dataset.mx)}px, ${-y * (+l.dataset.speed)}px, 0)`; });
  title.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
}

/* ---------- Progreso del recorrido ---------- */
const story = document.getElementById('perfil');
const stage = document.getElementById('stage');
const railItems = [...document.querySelectorAll('#rail li')];
let target = 0, cur = 0;
function readProgress(){
  const r = story.getBoundingClientRect(), vh = window.innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
  target = p * 4;
}
function updateRail(s){
  const a = Math.round(s);
  railItems.forEach((li, i) => { li.classList.toggle('on', i === a); li.classList.toggle('past', i < a); });
}
window.addEventListener('scroll', () => {
  if (!ticking){ ticking = true; requestAnimationFrame(() => { ticking = false; parallax(); readProgress(); if (!threeOn){ cur = target; updateRail(cur); } }); }
}, {passive:true});
readProgress();

/* ---------- Tarjetas con brillo ---------- */
document.getElementById('svc').addEventListener('pointermove', e => {
  const a = e.target.closest('article'); if (!a) return;
  const r = a.getBoundingClientRect();
  a.style.setProperty('--mx', (e.clientX - r.left) + 'px'); a.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

/* ---------- Escena 3D: cafeto → cereza → verde → tostado → taza ---------- */
let threeOn = false;
(function initThree(){
  if (!window.THREE) return;
  const host = document.getElementById('canvas');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); } catch(e){ return; }
  threeOn = true;
  document.getElementById('fallback').hidden = true;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);

  const V = (x,y,z) => new THREE.Vector3(x,y,z);
  const clamp01 = x => Math.min(1, Math.max(0, x));
  const range = (s,a,b) => clamp01((s - a) / (b - a));
  const smooth = t => t * t * (3 - 2 * t);
  const lerp = (a,b,t) => a + (b - a) * t;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(34, 1, 0.05, 100);
  scene.add(new THREE.HemisphereLight(0xfff1e0, 0x1a2a20, 0.75));
  const key = new THREE.DirectionalLight(0xffe0bd, 1.2); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.PointLight(0xa9c6a0, 1.5, 20); rim.position.set(-4, 2.5, -2.5); scene.add(rim);
  const warm = new THREE.PointLight(0xff9a4a, 0.6, 10); warm.position.set(1.6, -0.6, 1.8); scene.add(warm);

  /* --- Cafeto --- */
  const plant = new THREE.Group(); scene.add(plant);
  const plantMats = [];
  const pm = o => { const m = new THREE.MeshStandardMaterial(Object.assign({transparent:true}, o)); plantMats.push(m); return m; };
  const trunkMat = pm({color:0x4A3222, roughness:.85});
  const leafA = pm({color:0x1E4A30, roughness:.35, side:THREE.DoubleSide});
  const leafB = pm({color:0x2A5C3B, roughness:.4, side:THREE.DoubleSide});
  const cherryMats = [pm({color:0xB5412F, roughness:.28}), pm({color:0x8E2F22, roughness:.28}), pm({color:0x7FA34E, roughness:.4}), pm({color:0xC95A2E, roughness:.3})];
  const unit = new THREE.SphereGeometry(1, 16, 12);
  const branchGeo = new THREE.CylinderGeometry(.6, 1, 1, 6);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.07, .13, 4.8, 10), trunkMat); trunk.position.y = -.3; plant.add(trunk);
  let heroTip = null;
  const NB = 13;
  for (let i = 0; i < NB; i++){
    const k = i / NB;
    const h = -1.7 + k * 3.3, L = (1.6 - k * .9) * (.8 + Math.random() * .4), a = i * 2.39996;
    const b = new THREE.Group(); b.position.y = h; b.rotation.y = a; plant.add(b);
    const arm = new THREE.Group(); arm.rotation.z = -0.12 - k * .12; b.add(arm);
    const br = new THREE.Mesh(branchGeo, trunkMat); br.scale.set(.04, L, .04); br.rotation.z = -Math.PI/2; br.position.x = L/2; arm.add(br);
    const nLeaves = Math.max(3, Math.round(L * 3.2));
    for (let j = 0; j < nLeaves; j++){
      const t = (j + 1) / (nLeaves + 0.4), sz = 1 - t * .35;
      for (const side of [-1, 1]){
        const lf = new THREE.Mesh(unit, (j + i) % 3 ? leafA : leafB);
        lf.scale.set(.13 * sz, .012, .3 * sz);
        lf.position.set(t * L, .01, side * .26 * sz);
        lf.rotation.set(side * (.15 + Math.random() * .3), (Math.random() - .5) * .7, (Math.random() - .5) * .3);
        arm.add(lf);
      }
      if (j > 0 && j < nLeaves - 1 && Math.random() < .7){
        const n = 3 + Math.floor(Math.random() * 4);
        for (let c = 0; c < n; c++){
          const ch = new THREE.Mesh(unit, cherryMats[Math.random() < .55 ? 0 : Math.floor(Math.random() * 4)]);
          ch.scale.setScalar(.05 + Math.random() * .012);
          ch.position.set(t * L + (Math.random() - .5) * .1, -.05 - Math.random() * .05, (Math.random() - .5) * .12);
          arm.add(ch);
        }
      }
    }
    const tip = new THREE.Mesh(unit, leafA); tip.scale.set(.25, .012, .085); tip.position.set(L + .16, 0, 0); arm.add(tip);
    if (i === 8){ heroTip = new THREE.Object3D(); heroTip.position.set(L * .55, -.1, .02); arm.add(heroTip); }
  }
  const ground = new THREE.Mesh(new THREE.CircleGeometry(1.6, 40), pm({color:0x0F1E15, roughness:1}));
  ground.rotation.x = -Math.PI/2; ground.position.y = -2.7; plant.add(ground);
  plant.updateMatrixWorld(true);
  const P0 = heroTip.getWorldPosition(new THREE.Vector3());
  const ORIGIN = V(0, 0, 0);

  /* --- Cereza protagonista --- */
  const cherryMat = new THREE.MeshStandardMaterial({color:0xB5412F, roughness:.22, transparent:true});
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(.1, 40, 28), cherryMat);
  cherry.scale.y = .92; scene.add(cherry);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(.008, .012, .06, 6), new THREE.MeshStandardMaterial({color:0x3D2A1C, transparent:true}));
  stem.position.y = .1; cherry.add(stem);

  /* --- Dos granos --- */
  const beanMat = new THREE.MeshStandardMaterial({color:0x5E7A40, roughness:.75});
  const creaseMat = new THREE.MeshStandardMaterial({color:0x2A2214, roughness:.9});
  function bean(){
    const g = new THREE.Group();
    const s = new THREE.Mesh(new THREE.SphereGeometry(.17, 36, 24), beanMat); s.scale.set(1, .72, .55); g.add(s);
    const line = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), creaseMat); line.scale.set(.12, .007, .01); line.position.z = .083; line.rotation.z = .08;
    g.add(line);
    return g;
  }
  const pair = new THREE.Group(); scene.add(pair);
  const A = bean(), B = bean();
  A.rotation.y = -Math.PI/2; B.rotation.y = Math.PI/2;
  A.position.x = .1; B.position.x = -.1;
  pair.add(A, B);
  const colStops = [0x5E7A40, 0x9C8C44, 0x84502C, 0x4E2C18, 0x331C10].map(c => new THREE.Color(c));
  const tmpC = new THREE.Color();
  function roastColor(t){
    const x = t * (colStops.length - 1), i = Math.min(colStops.length - 2, Math.floor(x));
    return tmpC.copy(colStops[i]).lerp(colStops[i + 1], x - i);
  }

  /* --- Calor del tueste --- */
  const glowC = document.createElement('canvas'); glowC.width = glowC.height = 64;
  const gg = glowC.getContext('2d'); const ggr = gg.createRadialGradient(32,32,0,32,32,32);
  ggr.addColorStop(0,'rgba(255,255,255,1)'); ggr.addColorStop(1,'rgba(255,255,255,0)'); gg.fillStyle = ggr; gg.fillRect(0,0,64,64);
  const softTex = new THREE.CanvasTexture(glowC);
  const HN = 90, hpos = new Float32Array(HN * 3), hlife = new Float32Array(HN), hang = new Float32Array(HN);
  for (let i = 0; i < HN; i++){ hlife[i] = Math.random(); hang[i] = Math.random() * Math.PI * 2; }
  const hgeo = new THREE.BufferGeometry(); hgeo.setAttribute('position', new THREE.BufferAttribute(hpos, 3));
  const heatMat = new THREE.PointsMaterial({size:.07, map:softTex, color:0xFFA057, transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending});
  scene.add(new THREE.Points(hgeo, heatMat));

  /* --- Taza --- */
  const cupG = new THREE.Group(); scene.add(cupG);
  const porcelain = new THREE.MeshStandardMaterial({color:0xEDE9E1, roughness:.28, metalness:.04, side:THREE.DoubleSide, transparent:true});
  const prof = [[0,0],[.5,0],[.6,.04],[.66,.12],[.8,.45],[.9,.85],[.95,1.18],[.97,1.22],[.92,1.22],[.87,.92],[.76,.5],[.58,.18],[0,.16]];
  const cup = new THREE.Mesh(new THREE.LatheGeometry(prof.map(p => new THREE.Vector2(p[0], p[1])), 72), porcelain);
  cup.position.y = .1; cupG.add(cup);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.27, .065, 18, 40, Math.PI * 1.25), porcelain);
  handle.position.set(1.02, .78, 0); handle.rotation.z = -Math.PI * .625; cupG.add(handle);
  const sprof = [[0,0],[1,0],[1.55,.06],[1.68,.16],[1.64,.19],[1.5,.12],[.75,.08],[0,.09]];
  cupG.add(new THREE.Mesh(new THREE.LatheGeometry(sprof.map(p => new THREE.Vector2(p[0], p[1])), 72), porcelain));
  const tc = document.createElement('canvas'); tc.width = tc.height = 512;
  const g = tc.getContext('2d');
  const rg = g.createRadialGradient(256,256,20,256,256,256);
  rg.addColorStop(0,'#D8A574'); rg.addColorStop(.5,'#A9683A'); rg.addColorStop(.86,'#6E3C1F'); rg.addColorStop(1,'#3E220F');
  g.fillStyle = rg; g.fillRect(0,0,512,512);
  g.fillStyle = 'rgba(246,236,218,.95)';
  g.beginPath(); g.moveTo(256,350); g.bezierCurveTo(130,270,150,150,256,205); g.bezierCurveTo(362,150,382,270,256,350); g.fill();
  g.strokeStyle = 'rgba(169,104,58,.9)'; g.lineWidth = 6; g.beginPath(); g.moveTo(256,180); g.lineTo(256,360); g.stroke();
  const tex = new THREE.CanvasTexture(tc);
  const coffeeMat = new THREE.MeshStandardMaterial({map:tex, roughness:.35, transparent:true});
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(1, 64), coffeeMat);
  coffee.rotation.x = -Math.PI/2; cupG.add(coffee);
  const innerR = y => y < .6 ? lerp(.58, .78, (y - .28) / .32) : y < 1.02 ? lerp(.78, .87, (y - .6) / .42) : lerp(.87, .91, (y - 1.02) / .3);
  const SN = 140, spos = new Float32Array(SN * 3), slife = new Float32Array(SN);
  for (let i = 0; i < SN; i++) slife[i] = Math.random();
  const sgeo = new THREE.BufferGeometry(); sgeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const steamMat = new THREE.PointsMaterial({size:.42, map:softTex, transparent:true, opacity:0, depthWrite:false});
  cupG.add(new THREE.Points(sgeo, steamMat));

  /* --- Polvo ambiente --- */
  const DN = 160, dpos = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++){ dpos[i*3] = (Math.random() - .5) * 12; dpos[i*3+1] = (Math.random() - .5) * 8; dpos[i*3+2] = (Math.random() - .5) * 8 - 1; }
  const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({size:.035, map:softTex, color:0xD9C9A0, transparent:true, opacity:.35, depthWrite:false}));
  scene.add(dust);

  /* --- Cámara por etapa --- */
  const K = [
    [V(0, .1, 10.2), V(0, -.25, 0)],
    [V(.3, .45, 2.9), V(0, 0, 0)],
    [V(-.4, .35, 2.2), V(0, 0, 0)],
    [V(.4, .55, 2.4), V(0, 0, 0)],
    [V(0, 4.3, 10.4), V(0, 2.15, 0)]
  ];
  // La taza: en pantallas anchas baja al tercio inferior para no tapar el texto; en vertical queda centrada
  const CUP_WIDE = K[4], CUP_TALL = [V(0, 2.6, 6.4), V(0, -.8, 0)];
  const look = V(0,0,0), tmpP = V(0,0,0);
  let distMul = 1;

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener('pointermove', e => { tmx = e.clientX / window.innerWidth - .5; tmy = e.clientY / window.innerHeight - .5; }, {passive:true});

  function apply(s, t){
    const i = Math.min(3, Math.floor(s)), f = smooth(s - i);
    tmpP.lerpVectors(K[i][0], K[i + 1][0], f); look.lerpVectors(K[i][1], K[i + 1][1], f);
    cam.position.copy(look).add(tmpP.sub(look).multiplyScalar(distMul));
    cam.position.x += mx * .5; cam.position.y -= my * .3;
    cam.lookAt(look);

    // cafeto
    const pf = smooth(range(s, .45, 1.0));
    plantMats.forEach(m => m.opacity = 1 - pf);
    plant.visible = pf < .999;
    plant.position.y = pf * 1.8;
    plant.rotation.y = Math.sin(t * .3) * .04;

    // cereza: cae y se acerca
    const ff = range(s, .18, 1.0);
    cherry.position.lerpVectors(P0, ORIGIN, ff * ff);
    cherry.scale.setScalar(lerp(1, 3.4, smooth(ff)));
    cherry.scale.y *= .92;
    cherry.rotation.y = t * .4 + s;
    cherry.rotation.z = Math.sin(ff * Math.PI) * .6;
    const co = 1 - smooth(range(s, 1.15, 1.9));
    cherryMat.opacity = co; stem.material.opacity = co * (1 - range(s, .3, .6));
    cherry.visible = co > .01;

    // granos: aparecen, se tuestan, caen a la taza
    const roast = range(s, 2.15, 3.35);
    beanMat.color.copy(roastColor(roast));
    beanMat.roughness = lerp(.78, .32, roast);
    const sep = smooth(range(s, 1.55, 2.1)) * (1 - smooth(range(s, 3.3, 3.6)));
    A.position.x = .1 + sep * .14; B.position.x = -.1 - sep * .14;
    const fall = smooth(range(s, 3.45, 3.95));
    pair.visible = s > .95 && fall < .75;
    pair.scale.setScalar((1 + .18 * smooth(roast)) * (1 - fall * .9));
    pair.position.y = lerp(0, -.75, fall);
    pair.rotation.y = (reduce ? 0 : t * .35) + s * 1.3;
    pair.rotation.x = .35 * Math.sin(t * .5) * (1 - fall);

    // calor
    const heat = Math.sin(Math.PI * range(s, 2.15, 3.4));
    heatMat.opacity = .85 * heat;
    warm.intensity = .6 + heat * 2.4;
    for (let k = 0; k < HN; k++){
      hlife[k] += .006 + (k % 5) * .0012; if (hlife[k] > 1){ hlife[k] = 0; hang[k] = Math.random() * Math.PI * 2; }
      const l = hlife[k], r = .32 + l * .25;
      hpos[k*3] = Math.cos(hang[k] + l) * r; hpos[k*3+1] = -.25 + l * 1.1; hpos[k*3+2] = Math.sin(hang[k] + l) * r;
    }
    hgeo.attributes.position.needsUpdate = true;

    // taza
    const cr = smooth(range(s, 3.35, 3.85));
    cupG.visible = cr > .01;
    cupG.position.y = lerp(-3.6, -1.4, cr);
    porcelain.opacity = cr;
    cupG.rotation.y = mx * .4 + (reduce ? 0 : t * .08) * cr;
    const fill = smooth(range(s, 3.6, 4.0));
    const fy = lerp(.5, 1.18, fill);
    coffee.position.y = fy; coffee.scale.setScalar(innerR(fy));
    coffee.visible = fill > .02; coffeeMat.opacity = Math.min(1, fill * 3);
    steamMat.opacity = .22 * range(s, 3.8, 4.0);
    for (let k = 0; k < SN; k++){
      slife[k] += .004 + (k % 7) * .0006; if (slife[k] > 1) slife[k] = 0;
      const l = slife[k], ang = k * 2.4;
      spos[k*3] = Math.cos(ang) * .32 * (1 - l) + Math.sin(t * .8 + k) * .18 * l;
      spos[k*3+1] = 1.3 + l * 2.1;
      spos[k*3+2] = Math.sin(ang) * .32 * (1 - l) + Math.cos(t * .6 + k) * .14 * l;
    }
    sgeo.attributes.position.needsUpdate = true;

    dust.rotation.y = t * .015;

    // luz de fondo
    const gA = .2 * (1 - range(s, 1, 2.4)) + .05;
    const gB = .06 + .26 * heat + .12 * range(s, 3.3, 4);
    stage.style.setProperty('--glowA', `rgba(169,198,160,${gA.toFixed(3)})`);
    stage.style.setProperty('--glowB', `rgba(205,130,70,${gB.toFixed(3)})`);
  }

  function size(){
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.clearViewOffset();
    cam.fov = 34; cam.aspect = w / h;
    K[4] = w / h < .9 ? CUP_TALL : CUP_WIDE;
    const have = Math.tan(17 * Math.PI / 180) * (w / h);
    distMul = Math.min(2.6, Math.max(1, .42 / have));
    cam.updateProjectionMatrix();
  }
  new ResizeObserver(size).observe(stage); size();

  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(story);
  const clock = new THREE.Clock();
  function loop(){
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    cur = reduce ? target : cur + (target - cur) * .09;
    mx += (tmx - mx) * .05; my += (tmy - my) * .05;
    apply(cur, t);
    updateRail(cur);
    renderer.render(scene, cam);
  }
  apply(target, 0); renderer.render(scene, cam); loop();
})();

/* ---------- Modal ---------- */
const modal = document.getElementById('chat');
const form = document.getElementById('chat-form');
const done = document.getElementById('chat-done');
let lastFocus = null;
function openChat(){ document.getElementById('chat-sent').hidden = true; if (form.hidden && done.hidden) form.hidden = false; lastFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = 'hidden'; setTimeout(() => (form.hidden ? modal.querySelector(done.hidden ? '.modal-x' : '#f-mailto') : document.getElementById('f-name')).focus(), 30); }
function closeChat(){ modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
document.addEventListener('click', e => { if (e.target.closest('[data-chat]')){ e.preventDefault(); openChat(); } });
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) closeChat(); });
document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') return closeChat();
  if (e.key !== 'Tab') return;
  // Mantiene el foco dentro de la ventana mientras está abierta
  const f = [...modal.querySelectorAll('a[href],button,input,textarea')].filter(el => !el.disabled && el.offsetParent !== null);
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get('name')||'').trim(), mail = (fd.get('email')||'').trim(), msg = (fd.get('msg')||'').trim(), tipo = fd.get('tipo');
  const err = document.getElementById('f-err');
  if (!name || !msg){ err.textContent = 'Completá tu nombre y tu mensaje para poder armarlo.'; return; }
  if (!/^\S+@\S+\.\S+$/.test(mail)){ err.textContent = 'Revisá tu correo: necesito uno válido para responderte.'; return; }
  err.textContent = '';
  const subject = 'Charlemos de café · ' + tipo;
  const body = `Hola Denise, soy ${name}.\n\n${msg}\n\nTipo de proyecto: ${tipo}\nMi correo: ${mail}`;
  document.getElementById('f-out').value = 'Asunto: ' + subject + '\n\n' + body;
  document.getElementById('f-mailto').href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  if (CONFIG.formEndpoint){
    const btn = form.querySelector('.m-submit'); btn.disabled = true; btn.textContent = 'Enviando…';
    fetch(CONFIG.formEndpoint, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({nombre:name, email:mail, tipo, mensaje:msg, _subject:subject})})
      .then(r => { if (!r.ok) throw 0; form.reset(); form.hidden = true; document.getElementById('chat-sent').hidden = false; })
      .catch(() => { err.textContent = 'No se pudo enviar. Probá de nuevo o escribime por Instagram.'; })
      .finally(() => { btn.disabled = false; btn.textContent = 'Preparar mensaje'; });
    return;
  }
  form.hidden = true; done.hidden = false;
});
document.getElementById('f-back').addEventListener('click', () => { done.hidden = true; form.hidden = false; });
document.getElementById('f-copy').addEventListener('click', function(){
  const ta = document.getElementById('f-out'), btn = this;
  const ok = () => { btn.textContent = 'Copiado'; setTimeout(() => btn.textContent = 'Copiar mensaje', 1800); };
  const fail = () => { ta.select(); btn.textContent = 'Seleccionado: copialo'; };
  try { navigator.clipboard.writeText(ta.value).then(ok, fail); } catch(e){ fail(); }
});
})();
