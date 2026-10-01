/* ===================== player ===================== */
q = s => svg.querySelectorAll(s);
svg.innerHTML = `<defs>${grainDef}</defs>${setA()}${setB()}${setC()}${setD()}${setE()}${setF()}${setG()}${setH()}${setI()}${clipInsert()}${pagerInsert()}${phoneInsert()}${msgInsert()}${kitchenPhoneInsert()}${overlays()}`;
q('.set').forEach(el => { if (el.id !== 'setA') { el.style.visibility = 'hidden'; el.style.opacity = 0; } });
const subsEl = document.getElementById('subs'), scrub = document.getElementById('scrub'), clock = document.getElementById('clock'), chap = document.getElementById('chap');
const playBtn = document.getElementById('play'), cover = document.getElementById('cover');
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
let DUR = 0, lastSub = '', dragging = false, wasPlaying = false, schedTimer = 0;
const CHAPTERS = [];
function tick() {
  const t = tl.time();
  const s = SUBS.find(([a, b]) => t >= a && t < b), txt = s ? s[2] : '';
  if (txt !== lastSub) { subsEl.innerHTML = txt ? `<span>${txt}</span>` : ''; lastSub = txt; }
  if (!dragging) scrub.value = t;
  clock.textContent = `${fmt(t)} / ${fmt(DUR)}`;
  const c = CHAPTERS.filter(c => t >= c[0]).pop(); chap.textContent = c ? c[1] : '';
}
function setPlaying(p) {
  playBtn.textContent = p ? '❚❚' : '▶'; playBtn.setAttribute('aria-label', p ? 'Pause' : 'Play');
  clearInterval(schedTimer);
  if (p) { resetMusic(tl.time()); schedTimer = setInterval(() => scheduleMusic(tl.time()), 40); }
}
let waiting = null, ringTw = null;
const hintEl = document.getElementById('hint');
function startWait(label) {
  waiting = label; hintEl.textContent = label; hintEl.hidden = false;
  const r = svg.querySelector('#setB .tapRing'); r.setAttribute('opacity', 1);
  ringTw = gsap.to(r.querySelector('.rr'), { attr: { r: 128 }, duration: .6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  ringSnd = setInterval(() => { if (soundOn && ac) tone(1320, ac.currentTime, { vol: .03, dur: .12 }); }, 1600);
}
let ringSnd = 0;
function endWait() {
  waiting = null; hintEl.hidden = true; clearInterval(ringSnd);
  if (ringTw) { ringTw.kill(); ringTw = null; } svg.querySelector('#setB .tapRing').setAttribute('opacity', 0);
  try { actx().resume(); } catch (e) {}
  SFX.pop(); tl.play(); setPlaying(true);
}
/* wipe interaction */
let wipedAt = 0, wiping = false, wipeLeft = 0, lastPt = null, down = false;
const tcur = () => svg.querySelector('#tissueCur');
function toSvg(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
function startWipe(label) {
  waiting = 'wipe'; wiping = true; wipeLeft = 1;
  hintEl.textContent = label; hintEl.hidden = false;
  const d = svg.querySelector('#G4 .drool').getBoundingClientRect(), p = toSvg({ clientX: d.left + d.width / 2, clientY: d.top + d.height / 2 });
  const t = tcur(); t.setAttribute('opacity', 1); t.setAttribute('transform', `translate(${p.x + 160} ${p.y + 40})`);
  gsap.fromTo(t.querySelector('.tc'), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(-60 -10)' }, duration: .6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}
function wipeMove(e) {
  if (!wiping) return;
  const p = toSvg(e), t = tcur();
  gsap.killTweensOf(t.querySelector('.tc')); t.querySelector('.tc').setAttribute('transform', 'translate(0 0)');
  t.setAttribute('transform', `translate(${p.x} ${p.y})`);
  if (!down && e.pointerType !== 'mouse') return;
  if (lastPt && (down || e.pointerType === 'mouse')) {
    const d = Math.hypot(p.x - lastPt.x, p.y - lastPt.y);
    const dr = svg.querySelector('#G4 .drool').getBoundingClientRect(), c = toSvg({ clientX: dr.left + dr.width / 2, clientY: dr.top + dr.height / 2 });
    if (Math.hypot(p.x - c.x, p.y - c.y) < 260) { wipeLeft -= d / 900; if (Math.random() < .25) SFX.swish(); }
    svg.querySelector('#G4 .drool').setAttribute('opacity', Math.max(0, wipeLeft));
    if (wipeLeft <= 0) finishWipe();
  }
  lastPt = p;
}
function finishWipe() {
  wiping = false; const t = tcur();
  gsap.to(t, { attr: { transform: 'translate(2300 700)' }, duration: .5, ease: 'power2.in', onComplete: () => t.setAttribute('opacity', 0) });
  SFX.pop(); wipedAt = Date.now(); setTimeout(endWait, 350);
}
const pl$ = document.getElementById('player');
pl$.addEventListener('pointerdown', e => { down = true; lastPt = toSvg(e); if (wiping) { wipeLeft -= .2; svg.querySelector('#G4 .drool').setAttribute('opacity', Math.max(0, wipeLeft)); SFX.swish(); if (wipeLeft <= 0) finishWipe(); } });
pl$.addEventListener('pointerup', () => { down = false; });
pl$.addEventListener('pointermove', wipeMove);
/* the ask: Yes / runaway No */
const askEl = document.getElementById('ask'), yesB = document.getElementById('yes'), noB = document.getElementById('no'), teaseEl = document.getElementById('tease');
const TEASES = ['Nein.', 'DENIED', 'Can we go back to WhatsApp?', 'Georgie doesn’t respond well to threats', 'Absolutely not', 'Chances of this button working are almost 0'];
let dodges = 0;
let askReady = 0;
function startAsk() {
  waiting = 'ask'; dodges = 0; teaseEl.textContent = ''; askEl.hidden = false;
  yesB.style.setProperty('--s', 1); noB.style.left = '58%'; noB.style.top = '40%'; noB.style.transform = '';
  askReady = Date.now() + 1800;
  yesB.classList.add('wait'); noB.classList.add('wiggle');
  setTimeout(() => { yesB.classList.remove('wait'); noB.classList.remove('wiggle'); }, 1800);
}
function dodge(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  if (Date.now() < askReady && !e) return;
  dodges++; SFX.pop();
  const W = askEl.clientWidth, H = askEl.clientHeight, nw = noB.offsetWidth, nh = noB.offsetHeight;
  const a = askEl.getBoundingClientRect(), y = yesB.getBoundingClientRect();
  let x, t, tries = 0;
  do { x = Math.random() * (W - nw); t = Math.random() * (H - nh); tries++; }
  while (tries < 40 && x < y.right - a.left + 12 && x + nw > y.left - a.left - 12 && t < y.bottom - a.top + 12 && t + nh > y.top - a.top - 12);
  noB.style.left = x + 'px'; noB.style.top = t + 'px';
  noB.style.transform = `scale(${Math.max(.55, 1 - dodges * .06)}) rotate(${(Math.random() - .5) * 24}deg)`;
  yesB.style.setProperty('--s', Math.min(1.8, 1 + dodges * .1));
  teaseEl.textContent = TEASES[(dodges - 1) % TEASES.length];
}
noB.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') dodge(); });
noB.addEventListener('pointerdown', dodge);
noB.addEventListener('click', dodge);
askEl.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const r = noB.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  if (Math.hypot(e.clientX - cx, e.clientY - cy) < Math.max(r.width, r.height) * .9) dodge();
});
yesB.addEventListener('click', e => { e.stopPropagation(); if (Date.now() < askReady) return; askEl.hidden = true; wipedAt = Date.now(); SFX.ding(); waiting = null; try { actx().resume(); } catch (x) {} tl.play(); setPlaying(true); });
function play() { try { actx().resume(); } catch (e) {} cover.hidden = true; if (tl.progress() >= 1) tl.time(0, true); tl.play(); setPlaying(true); }
function pause() { tl.pause(); setPlaying(false); }
function boot() {
  TW = [0, 1, 2, 3].map(n => n ? q('.tl' + n)[0].getComputedTextLength() : 0);
  tl = gsap.timeline({ paused: true, onUpdate: tick, onComplete: () => setPlaying(false) });
  buildFilm();
  DUR = tl.duration(); scrub.max = DUR.toFixed(2);
  CHAPTERS.push([0, 'Scene 1 · Latest-generation Golf']); CHAPTERS.push([38.4, 'Scene 2 · A quiet year at Oxford']); CHAPTERS.push([116.5, 'Scene 3 · Bob']); CHAPTERS.push([134.9, 'Scene 4 · Protecting humankind']); CHAPTERS.push([154.6, 'Scene 5 · Your seat']);
  playBtn.onclick = () => (waiting === 'ask' ? null : waiting === 'wipe' ? finishWipe() : waiting ? endWait() : tl.isActive() ? pause() : play());
  cover.onclick = play;
  document.getElementById('player').addEventListener('click', e => { if (cover.contains(e.target)) return; if (waiting === 'wipe' || waiting === 'ask' || Date.now() - wipedAt < 1500) return; if (waiting) { endWait(); return; } tl.isActive() ? pause() : play(); });
  document.getElementById('restart').onclick = () => { tl.time(0, true); play(); };
  scrub.addEventListener('pointerdown', () => { if (waiting) { askEl.hidden = true; waiting = null; wiping = false; tcur().setAttribute('opacity', 0); hintEl.hidden = true; clearInterval(ringSnd); if (ringTw) ringTw.kill(); svg.querySelector('#setB .tapRing').setAttribute('opacity', 0); } dragging = true; wasPlaying = tl.isActive(); tl.pause(); });
  scrub.addEventListener('input', () => { tl.time(+scrub.value, true); tick(); });
  scrub.addEventListener('change', () => { dragging = false; cover.hidden = true; if (wasPlaying) play(); else setPlaying(false); });
  const cc = document.getElementById('cc'), snd = document.getElementById('snd');
  cc.onclick = () => { const on = cc.getAttribute('aria-pressed') !== 'true'; cc.setAttribute('aria-pressed', on); subsEl.hidden = !on; };
  snd.onclick = () => { soundOn = snd.getAttribute('aria-pressed') !== 'true'; snd.setAttribute('aria-pressed', soundOn); if (soundOn && tl.isActive()) resetMusic(tl.time()); };
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === ' ' || e.key === 'k' || e.key === 'Enter') { e.preventDefault(); waiting === 'ask' ? null : waiting === 'wipe' ? finishWipe() : waiting ? endWait() : tl.isActive() ? pause() : play(); }
    if (e.key === 'ArrowRight') { tl.time(Math.min(DUR, tl.time() + 5), true); resetMusic(tl.time()); tick(); }
    if (e.key === 'ArrowLeft') { tl.time(Math.max(0, tl.time() - 5), true); resetMusic(tl.time()); tick(); }
  });
  tl.time(.5, true); tl.time(0, true); tick();
  window.__tl = tl; window.__boot = true;
}
Promise.race([Promise.all([document.fonts.load('600 64px Caveat'), document.fonts.load('600 30px Fredoka'), document.fonts.load('170px VT323')]), new Promise(r => setTimeout(r, 3000))]).then(boot);
