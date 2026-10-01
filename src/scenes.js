/* ===================== real stickers ===================== */
function stickerStraw(id, x, y, s = 1) { return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${s})"><image href="${STRAW_URI}" x="-110" y="-110" width="220" height="220"/></g></g>`; }
function stickerHand(id, x, y, s = 1) { return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${s})"><image href="${HAND_URI}" x="-110" y="-110" width="220" height="220"/></g></g>`; }

/* ===================== global overlays ===================== */
const overlays = () => `
  <g id="counterO" opacity="0"><g transform="translate(1600 110)"><rect x="-250" y="-50" width="500" height="96" rx="16" style="fill:#f3ead8" ${S}/><text class="c103" x="0" y="16" text-anchor="middle" style="font:700 44px var(--ui);fill:${INK};letter-spacing:1px">IMF MENTIONS: 10,001</text><text class="c104" opacity="0" x="0" y="16" text-anchor="middle" style="font:700 44px var(--ui);fill:${INK};letter-spacing:1px">IMF MENTIONS: 10,002</text></g></g>
  <g id="stickO" opacity="0" pointer-events="none" transform="translate(1700 770)">${stickerStraw('stickOi', 0, 0, 1)}</g>
  <g id="edSignO" transform="translate(2800 0)"><rect x="-24" y="-200" width="48" height="1500" style="fill:#3a3d44"/><rect x="-560" y="250" width="1120" height="360" rx="22" style="fill:#1c3f8a" ${S}/><rect x="-540" y="270" width="1080" height="320" rx="12" style="fill:none;stroke:#fff;stroke-width:6"/><text x="0" y="420" text-anchor="middle" style="font:700 110px var(--ui);fill:#fff;letter-spacing:8px">EDINBURGH</text><text x="0" y="520" text-anchor="middle" style="font:600 46px var(--ui);fill:#cfe0ff">Dùn Èideann · City Centre</text></g>
  <circle id="iris" cx="960" cy="540" r="3400" style="fill:none;stroke:#000;stroke-width:4000"/>
  ${black}`;

/* ===================== timeline helpers ===================== */
let tl, q, SUBS = [];
const charOf = who => (who[0] === 'G' ? GEO : who[0] === 'B' ? BOB : LUCA);
const fx = (name, t, arg) => tl.call(() => SFX[name] && SFX[name](arg), null, t);
const cut = (id, t) => { tl.set(q('.set'), { autoAlpha: 0 }, t); tl.set(q('#' + id), { autoAlpha: 1 }, t); };
const camTo = (set, cx, cy, z, t, d = 0, ease = 'power2.inOut') => {
  const v = { attr: { transform: `translate(${(960 - cx * z).toFixed(1)} ${(540 - cy * z).toFixed(1)}) scale(${z})` } };
  d ? tl.to(q(`#${set} > .cam`), { ...v, duration: d, ease }, t) : tl.set(q(`#${set} > .cam`), v, t);
};
const rot = (sel, deg, t, d = .4, ease = 'power2.inOut') => d ? tl.to(q(sel), { attr: { transform: `rotate(${deg})` }, duration: d, ease }, t) : tl.set(q(sel), { attr: { transform: `rotate(${deg})` } }, t);
const pos = (sel, x, y, t, d = .5, ease = 'power2.inOut') => d ? tl.to(q(sel), { attr: { transform: `translate(${x} ${y})` }, duration: d, ease }, t) : tl.set(q(sel), { attr: { transform: `translate(${x} ${y})` } }, t);
const scl = (sel, s, t, d = .3, ease = 'power2.out') => d ? tl.to(q(sel), { attr: { transform: `scale(${s})` }, duration: d, ease }, t) : tl.set(q(sel), { attr: { transform: `scale(${s})` } }, t);
const op = (sel, v, t, d = 0) => d ? tl.to(q(sel), { attr: { opacity: v }, duration: d }, t) : tl.set(q(sel), { attr: { opacity: v } }, t);
const popIn = (sel, t, from = .3) => { tl.set(q(sel), { attr: { opacity: 1 } }, t); const el = q(sel + ' > .sc')[0]; const base = el ? +((el.getAttribute('transform').match(/scale\(([\d.]+)/) || [0, 1])[1]) : 1; tl.fromTo(q(sel + ' > .sc'), { attr: { transform: `scale(${base * from} ${base * from})` } }, { attr: { transform: `scale(${base} ${base})` }, duration: .35, ease: 'back.out(2.2)' }, t); };
function look(who, dx, dy, t, d = .25) {
  const r = rOf(charOf(who)), c = v => Math.max(-1, Math.min(1, v));
  tl.to(q(`#${who} .pup`), { attr: { transform: `translate(${(c(dx) * r * .095).toFixed(2)} ${(c(dy) * r * .055).toFixed(2)})` }, duration: d, ease: 'power2.inOut' }, t);
}
function brow(who, side, v, t, d = .25) {
  const r = rOf(charOf(who)), deg = side === 'L' ? -v * 7 : v * 7;
  tl.to(q(`#${who} .brow${side}`), { attr: { transform: `translate(0 ${(-v * r * .12).toFixed(2)}) rotate(${deg.toFixed(1)})` }, duration: d, ease: 'power2.out' }, t);
}
const brows = (who, v, t, d) => { brow(who, 'L', v, t, d); brow(who, 'R', v, t, d); };
const mouth = (who, shape, t) => { tl.set(q(`#${who} .mth`), { attr: { opacity: 0 } }, t); tl.set(q(`#${who} .m-${shape}`), { attr: { opacity: 1 } }, t); };
const blink = (who, t, hold = .12) => { tl.set(q(`#${who} .lids`), { attr: { opacity: 1 } }, t); tl.set(q(`#${who} .lids`), { attr: { opacity: 0 } }, t + hold); };
const half = (who, on, t) => tl.set(q(`#${who} .half`), { attr: { opacity: on ? 1 : 0 } }, t);
const blush = (who, on, t) => tl.to(q(`#${who} .blush`), { attr: { opacity: on ? 1 : 0 }, duration: .4 }, t);
const head = (who, deg, t, d = .3, ease = 'power2.inOut') => rot(`#${who} .head`, deg, t, d, ease);
const nod = (who, t, n = 1, amp = 4) => { for (let i = 0; i < n; i++) { tl.to(q(`#${who} .head`), { attr: { transform: `rotate(${amp})` }, duration: .14, ease: 'sine.out' }, t + i * .34); tl.to(q(`#${who} .head`), { attr: { transform: 'rotate(0)' }, duration: .18, ease: 'sine.in' }, t + i * .34 + .15); tl.to(q(`#${who} > .sc`), { attr: { transform: 'scale(1 0.99)' }, duration: .14 }, t + i * .34); tl.to(q(`#${who} > .sc`), { attr: { transform: 'scale(1 1)' }, duration: .18 }, t + i * .34 + .15); } };
const lean = (who, deg, t, d = .4) => rot(`#${who} .lean`, deg, t, d);
const arm = (who, side, up, fore, t, d = .4, ease = 'power2.inOut') => { rot(`#${who} .arm${side}`, up, t, d, ease); rot(`#${who} .fore${side}`, fore, t, d, ease); };
function talk(who, t0, t1) {
  let i = 0;
  for (let t = t0; t < t1 - .1; t += .11 + (i % 4 === 3 ? .07 : 0), i++) tl.set(q(`#${who} .m-open`), { attr: { opacity: i % 2 ? 0 : 1 } }, t);
  tl.set(q(`#${who} .m-open`), { attr: { opacity: 0 } }, t1);
}
const say = (who, t0, t1, text) => { SUBS.push([t0, t1 + .25, text]); if (who) talk(who, t0, t1 - .1); };
function walkTo(who, x, y, t, d, steps = true) {
  pos('#' + who, x, y, t, d, 'sine.inOut');
  walkCycle(who, t, t + d, steps);
}
function walkCycle(who, t0, t1, steps = true, period = .5, bob = true) {
  const n = Math.max(2, Math.round((t1 - t0) / (period / 2)));
  const dt = (t1 - t0) / n;
  for (let i = 0; i < n; i++) {
    const s = i % 2 ? -1 : 1, t = t0 + i * dt;
    tl.to(q(`#${who} .legL`), { attr: { transform: s > 0 ? 'translate(0 -12) rotate(4)' : 'translate(0 0) rotate(-2)' }, duration: dt, ease: 'sine.inOut' }, t);
    tl.to(q(`#${who} .legR`), { attr: { transform: s > 0 ? 'translate(0 0) rotate(2)' : 'translate(0 -12) rotate(-4)' }, duration: dt, ease: 'sine.inOut' }, t);
    tl.to(q(`#${who} .lean`), { attr: { transform: `rotate(${1.2 * s})` }, duration: dt, ease: 'sine.inOut' }, t);
    if (bob) tl.to(q(`#${who} > .sc`), { attr: { transform: i % 2 ? 'scale(1 1)' : 'scale(1 0.985)' }, duration: dt, ease: 'sine.inOut' }, t);
    if (steps) fx('step', t + dt * .5);
  }
  ['legL', 'legR'].forEach(p => tl.to(q(`#${who} .${p}`), { attr: { transform: 'translate(0 0) rotate(0)' }, duration: .15 }, t1));
  tl.to(q(`#${who} .lean`), { attr: { transform: 'rotate(0)' }, duration: .15 }, t1);
  if (bob) tl.to(q(`#${who} > .sc`), { attr: { transform: 'scale(1 1)' }, duration: .15 }, t1);
}
function swingArms(who, t0, t1, amp = 12, period = .5) {
  const n = Math.max(2, Math.round((t1 - t0) / (period / 2))), dt = (t1 - t0) / n;
  for (let i = 0; i < n; i++) { const s = i % 2 ? -1 : 1; rot(`#${who} .armL`, -amp * s, t0 + i * dt, dt, 'sine.inOut'); rot(`#${who} .armR`, -amp * s, t0 + i * dt, dt, 'sine.inOut'); }
  rot(`#${who} .armL`, 0, t1, .2); rot(`#${who} .armR`, 0, t1, .2);
}
const music = (t0, t1, prog, opt = {}) => SCORE.push({ t0, t1, prog, vel: opt.vel || .45, mel: opt.mel, style: opt.style });
const silent = (a, b) => SILENT.push([a, b]);
const THEME = [76, 0, 0, 0, 74, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 71, 0, 72, 0, 74, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 76, 0, 0, 0, 74, 0, 72, 0, 0, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const THEME2 = [72, 0, 0, 0, 0, 0, 74, 0, 76, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 77, 0, 76, 0, 74, 0, 0, 0, 0, 0, 0, 0];

/* chat bubbles: built into a phone's .msgs group; returns selector of the message */
const measureCtx = document.createElement('canvas').getContext('2d');
const PHONE_Y = {};
function wrap(text, maxW, font) {
  measureCtx.font = font; const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (measureCtx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
  if (line) lines.push(line); return lines;
}
let msgN = 0;
function addMsg(phone, me, content) {
  const el = svg.querySelector(`#${phone}`), W = +el.dataset.w || 500, H = +el.dataset.h || 900;
  const inner = W - 44, fs = W > 700 ? 46 : 38, font = `600 ${fs}px Fredoka`, pad = 22;
  const y0 = PHONE_Y[phone] ?? (-H / 2 + 150);
  const id = `msg${++msgN}`;
  let g;
  if (content.sticker) {
    const sz = W > 700 ? 260 : 220, x = me ? inner / 2 - sz / 2 - 10 : -inner / 2 + sz / 2 + 10;
    g = `<g id="${id}" opacity="0" transform="translate(${x} ${y0 + sz / 2})"><g class="sc" transform="scale(1)"><image href="${content.sticker === 'hand' ? HAND_URI : STRAW_URI}" x="${-sz / 2}" y="${-sz / 2}" width="${sz}" height="${sz}"/></g></g>`;
    PHONE_Y[phone] = y0 + sz + 16; g = g.replace('opacity="0"', `opacity="0" data-bottom="${y0 + sz}"`);
  } else {
    const lines = wrap(content, inner * .8, font), lh = fs * 1.2;
    measureCtx.font = font; const tw = Math.max(...lines.map(l => measureCtx.measureText(l).width));
    const bw = tw + pad * 2, bh = lines.length * lh + pad * 1.4;
    const x = me ? inner / 2 - 14 - bw : -inner / 2 + 14;
    const bg = me ? '#2c3e5c' : '#e1dcd1', fg = me ? '#fff' : INK;
    g = `<g id="${id}" opacity="0" transform="translate(${x + bw / 2} ${y0 + bh / 2})"><g class="sc" transform="scale(1)"><rect x="${-bw / 2}" y="${-bh / 2}" width="${bw}" height="${bh}" rx="${Math.min(26, bh / 2)}" style="fill:${bg}"/>${lines.map((l, i) => `<text x="${-bw / 2 + pad}" y="${-bh / 2 + pad * .7 + lh * (i + .78)}" style="font:${font};fill:${fg}">${l.replace(/&/g, '&amp;')}</text>`).join('')}</g></g>`;
    PHONE_Y[phone] = y0 + bh + 14; g = g.replace('opacity="0"', `opacity="0" data-bottom="${y0 + bh}"`);
  }
  el.querySelector('.msgs').insertAdjacentHTML('beforeend', g);
  return '#' + id;
}
const showMsg = (sel, t, sound = 'msg') => {
  const el = svg.querySelector(sel), ph = el.closest('[data-w]'), lim = +ph.dataset.h / 2 - 50, bottom = +el.dataset.bottom;
  if (bottom > lim) tl.to(ph.querySelector('.msgs'), { attr: { transform: `translate(0 ${-(bottom - lim)})` }, duration: .35, ease: 'power2.out' }, t - .05);
  popIn(sel, t, .6); if (sound) fx(sound, t);
};

/* ===================== the film ===================== */
function buildFilm() {
  const T2 = 49.3, Q = T2 + 42.6, T3 = Q + 31.8;
  tl.set(q('.set:not(#setA)'), { autoAlpha: 0 }, 0);
  op('#BOB', 0, 0); op('#stI', 0, 0); tl.set(q('#setB > .cam'), { filter: 'saturate(1) brightness(1)' }, 0);
  const blinks = [];
  const B = (who, ...ts) => ts.forEach(t => blinks.push([who, t]));

  /* ---------------- SCENE 1 · Latest-generation Golf ---------------- */
  camTo('setA', 960, 560, 1, 0);
  music(0, T2, ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7'], { vel: .42, mel: THEME });
  silent(3.2, 11.4); silent(22.5, 25.0);
  // George mid-verdict: one hand in pocket, the other presenting the car
  arm('G1', 'L', 8, -20, 0, 0); op('#G1 .handL', 0, 0);
  arm('G1', 'R', -48, -36, 0, 0); look('G1', .6, .4, 0, 0); look('L1', -.2, 0, 0, 0);
  say('G1', .6, 3.0, '“…a Golf. At best.”');
  arm('G1', 'R', -62, -48, .95, .3, 'back.out(1.6)');
  mouth('G1', 'smirk', 2.1); look('G1', 1, -.2, 2.0, .2); brow('G1', 'R', .5, 2.1);
  // the stare
  camTo('setA', 1330, 560, 2.6, 3.4);
  look('L1', -1, -.1, 3.9, .45); head('L1', -5, 4.5, .5); brow('L1', 'R', 1.4, 5.3, .35);
  // closer two-shot, George reconsiders
  camTo('setA', 965, 560, 1.7, 6.0);
  look('G1', 1, 0, 6.2, .2); look('G1', -.1, .9, 6.9, .3); look('G1', 1, 0, 7.6, .3);
  mouth('G1', 'smile', 7.6); mouth('G1', 'flat', 8.1); brow('G1', 'R', 0, 8.0);
  arm('G1', 'R', 0, 0, 8.2, .6);
  say('G1', 8.9, 11.0, '“That sounded better in my head.”');
  tl.set(q('#L1 .lids'), { attr: { opacity: 1 } }, 11.3); tl.set(q('#L1 .lids'), { attr: { opacity: 0 } }, 11.75);
  brow('L1', 'R', 0, 11.3, .3); head('L1', 0, 11.3, .3);
  nod('L1', 12.1, 1, 4);
  // the consultation: coat from outside the frame
  camTo('setA', 1000, 560, 1.55, 12.7);
  arm('L1', 'R', -100, 0, 12.8, .35);
  tl.fromTo(q('.flyCoat'), { attr: { opacity: 1, transform: 'translate(2100 520)' } }, { attr: { transform: 'translate(1420 520)' }, duration: .35, ease: 'power2.out' }, 13.0);
  fx('fwip', 13.4);
  tl.to(q('#L1 .lean'), { attr: { transform: 'rotate(-12)' }, duration: .1, yoyo: true, repeat: 3 }, 13.4);
  op('.flyCoat', 0, 13.6); op('#L1 .coat, #L1 .cS', 1, 13.6);
  arm('L1', 'R', 0, 0, 13.6, .3);
  arm('L1', 'L', 20, -95, 14.1, .35); op('#L1 .pClip', 1, 14.3); fx('pop', 14.3);
  arm('L1', 'R', -20, 95, 14.6, .3); op('#L1 .pPen', 1, 14.8); fx('click', 14.9);
  look('G1', 1, .3, 13.2, .2); look('G1', 1, .6, 14.3, .2); look('G1', 1, .4, 14.8, .2); brows('G1', .5, 13.6);
  say('G1', 15.3, 16.9, '“What are you doing?”');
  look('L1', -.8, -1, 17.0, .2); brows('L1', -.3, 17.0); head('L1', 4, 17.0, .3);
  camTo('setA', 1330, 560, 2.5, 17.0);
  say('L1', 17.2, 19.0, '“Checking your eyesight.”');
  camTo('setA', 600, 530, 2.4, 19.1);
  brows('G1', 0, 19.1);
  arm('G1', 'R', 105, 108, 19.2, .35); op('#G1 .handL', 1, 19.2);
  say('G1', 19.6, 21.6, '“These glasses cost a fortune.”');
  arm('G1', 'R', 0, 0, 21.7, .35); head('G1', -5, 21.7, .4); mouth('G1', 'smile', 21.8);
  camTo('setA', 965, 560, 1.7, 21.9);
  look('L1', -.8, -.9, 22.3, .3); head('L1', 0, 22.3, .3); look('L1', -1, .1, 23.1, .3);
  camTo('setA', 1330, 560, 2.5, 23.6);
  say('L1', 23.9, 24.8, '“And yet.”');
  look('L1', -.3, 1, 25.1, .2); head('G1', 0, 25.1, .3); camTo('setA', 1000, 560, 1.55, 25.0);
  tl.to(q('#L1 .foreR'), { attr: { transform: 'rotate(102)' }, duration: .1, yoyo: true, repeat: 5 }, 25.3);
  // clipboard insert
  cut('insClip', 26.0); tl.set(q('#insClip .pen'), { attr: { transform: 'translate(401 358)' } }, 26.0);
  writeLine(1, 380, 26.4, 1.4);
  writeLine(2, 500, 28.4, 1.8);
  underline(2, 'unaffected', 30.4, .5);
  op('#L1 .pcl1, #L1 .pcl2', 1, 30.5);
  pos('.georgePeek', 1760, 560, 31.0, .6, 'power2.out'); look('GP', -1, .6, 31.2, .2);
  tl.to(q('.board'), { attr: { transform: 'translate(-90 20) rotate(-5)' }, duration: .45, ease: 'power2.inOut' }, 31.9);
  pos('.georgePeek', 1660, 590, 32.6, .5); look('GP', -1, .8, 32.7, .2);
  tl.to(q('.board'), { attr: { transform: 'translate(-200 40) rotate(-10)' }, duration: .45, ease: 'power2.inOut' }, 33.3);
  brows('GP', .4, 33.4);
  // the correction
  cut('setA', 34.2); camTo('setA', 965, 560, 1.7, 34.2);
  look('G1', 1, .2, 34.2, 0); brows('G1', 0, 34.2, 0); mouth('G1', 'flat', 34.2);
  fx('tap', 34.5); tl.to(q('#L1 .pClip'), { attr: { transform: 'translate(-4 52.7) rotate(-10) scale(1 .2)' }, duration: .15 }, 34.5);
  op('#L1 .pClip, #L1 .pPen', 0, 34.8); arm('L1', 'L', 0, 0, 34.8, .3); arm('L1', 'R', 0, 0, 34.8, .3);
  camTo('setA', 1250, 560, 1.15, 34.9, .8);
  walkTo('L1', 1690, 884, 35.0, 1.0);
  arm('L1', 'R', -150, 0, 36.1, .3); op('#L1 .coat, #L1 .cS', 0, 36.45); op('.hungCoat', 1, 36.45); fx('fwip', 36.4); arm('L1', 'R', 0, 0, 36.6, .3);
  camTo('setA', 960, 560, 1, 36.6, .6);
  walkTo('L1', 860, 884, 36.8, 1.8);
  look('G1', 1, 0, 36.8, .3); look('G1', .6, .1, 37.8, .4); head('G1', 3, 37.6, .5);
  op('#L1', 0, 38.7); op('#car1 .driver', 1, 38.7); fx('door', 38.65);
  tl.to(q('#car1 .mirror'), { attr: { transform: 'rotate(-12 -20 -206)' }, duration: .25, yoyo: true, repeat: 1 }, 39.1);
  camTo('setA', 870, 640, 1.9, 39.6);
  mouth('car1D', 'flat', 39.6);
  say('car1D', 39.8, 42.3, '“A brand-new Golf. Latest model.”');
  camTo('setA', 760, 620, 1.7, 42.4);
  nod('G1', 42.5, 1, 3); mouth('G1', 'flat', 42.4);
  say('G1', 42.9, 44.9, '“Right. Important distinction.”');
  mouth('car1D', 'smirk', 45.0);
  arm('G1', 'L', 30, -50, 45.3, .35); arm('G1', 'R', -30, 50, 45.3, .35); op('#G1 .handL', 1, 45.3);
  fx('beepbeep', 46.0); tl.to(q('#car1 .body'), { attr: { transform: 'translate(0 -6)' }, duration: .08, yoyo: true, repeat: 3 }, 46.0);
  mouth('G1', 'laugh', 46.3); mouth('G1', 'smirk', 46.6); blush('G1', true, 46.3); look('G1', -.2, .4, 46.6, .2);
  camTo('setA', 960, 560, 1, 47.2);
  arm('G1', 'L', 0, 0, 47.2, .3); arm('G1', 'R', 0, 0, 47.2, .3);
  fx('engine', 47.4, 1.6);
  tl.to(q('#car1'), { attr: { transform: 'translate(-1800 0)' }, duration: 1.7, ease: 'power2.in' }, 47.5);
  wheelSpin('car1', -1100, 47.5, 1.7);
  look('G1', -1, .2, 47.6, .5);

  /* ---------------- SCENE 2 · A quiet year at Oxford ---------------- */
  cut('setB', T2); camTo('setB', 960, 560, 1, T2);
  music(T2, T3, ['Cmaj7', 'Am7', 'Fmaj7', 'G6'], { vel: .45, mel: THEME2 });
  silent(T2 + 36.6, T2 + 41.0); silent(Q + 15.0, Q + 17.8);
  op('#car2 .driver', 1, T2); op('#L2', 0, T2); op('.bLaw', 0, T2);
  fx('engine', T2, 1.6);
  pos('#car2wrap', 0, 0, T2, 1.8, 'power2.out'); wheelSpin('car2', 1100, T2, 1.8);
  op('#car2 .driver', 0, T2 + 2.2); fx('door', T2 + 2.15);
  pos('#L2', 1000, 1010, T2 + 2.2, 0); op('#L2', 1, T2 + 2.2);
  pos('.pile', 1000, 880, T2 + 2.2, 0); op('.bLaw', 1, T2 + 2.2); op('.bPager', 1, T2 + 2.2);
  holdPile('L2', T2 + 2.2, 0);
  mouth('L2', 'smile', T2 + 2.2); brows('L2', .3, T2 + 2.2, 0);
  walkTo('L2', 820, 1010, T2 + 2.4, .9); pos('.pile', 820, 880, T2 + 2.4, .9, 'sine.inOut');
  camTo('setB', 860, 640, 1.6, T2 + 3.4);
  say('L2', T2 + 3.6, T2 + 5.8, '“This year, I’m going to focus.”');
  walkTo('L2', 740, 1010, T2 + 6.0, .5); pos('.pile', 740, 880, T2 + 6.0, .5, 'sine.inOut');
  // MDU lands
  op('.bMdu', 1, T2 + 6.8); tl.fromTo(q('.bMdu'), { attr: { transform: 'translate(0 -500)' } }, { attr: { transform: 'translate(0 0)' }, duration: .35, ease: 'power3.in' }, T2 + 6.8);
  fx('thudDull', T2 + 7.15); tl.to(q('#L2 > .sc'), { attr: { transform: 'scale(1 0.97)' }, duration: .08, yoyo: true, repeat: 1 }, T2 + 7.15);
  look('L2', 0, 1, T2 + 7.4, .25); mouth('L2', 'flat', T2 + 7.5); brows('L2', 0, T2 + 7.5);
  tl.to(q('#setB > .cam'), { filter: 'saturate(.3) brightness(.9)', duration: .35 }, T2 + 7.6);
  tl.to(q('#setB > .cam'), { filter: 'saturate(1) brightness(1)', duration: 1.2 }, T2 + 9.0);
  nose('L2', T2 + 8.2);
  // keys
  op('.bKeys', 1, T2 + 9.6); tl.fromTo(q('.bKeys'), { attr: { transform: 'translate(0 -500)' } }, { attr: { transform: 'translate(0 0)' }, duration: .3, ease: 'power3.in' }, T2 + 9.6);
  fx('jangle', T2 + 9.9); look('L2', .2, 1, T2 + 10.0, .2);
  // pager
  fx('pager', T2 + 11.4); tl.set(q('#setB .pagerScr'), { fill: '#b9d9a8' }, T2 + 11.4);
  cut('insPager', T2 + 11.8); shake('#insPager .pagerBig', T2 + 11.8); fx('pager', T2 + 12.2);
  cut('setB', T2 + 13.6); tl.set(q('#setB .pagerScr'), { fill: '#5d6b5a' }, T2 + 13.6);
  look('L2', -.4, 1, T2 + 13.7, .2); look('L2', .4, 1, T2 + 14.3, .25); look('L2', 0, 0, T2 + 14.9, .3);
  say('L2', T2 + 15.5, T2 + 17.7, '“It’s fine. I’ll figure it out.”');
  tl.to(q('.pile'), { attr: { transform: 'translate(744 876)' }, duration: .12, yoyo: true, repeat: 3 }, T2 + 17.9);
  fx('notify', T2 + 18.5);
  cut('insPhone', T2 + 18.8); tl.from(q('#insPhone .notif'), { attr: { transform: 'translate(0 -320)' }, duration: .45, ease: 'back.out(1.6)' }, T2 + 18.8);
  cut('setB', T2 + 21.0); camTo('setB', 760, 600, 1.15, T2 + 21.0);
  walkTo('G2', 470, 1010, T2 + 21.0, 1.8); swingArms('G2', T2 + 21.0, T2 + 22.8);
  look('G2', 1, .5, T2 + 22.9, .25); brows('G2', .9, T2 + 23.3, .2); mouth('G2', 'o', T2 + 23.3);
  camTo('setB', 610, 640, 1.6, T2 + 23.6);
  say('G2', T2 + 23.9, T2 + 26.2, '“Hang on. You actually invest?”');
  look('L2', -1, 0, T2 + 26.3, .25); half('L2', true, T2 + 26.9);
  say('L2', T2 + 27.3, T2 + 29.4, '“Yes, George. I’ve told you.”');
  half('L2', false, T2 + 29.6); mouth('G2', 'smile', T2 + 29.6); brows('G2', .2, T2 + 29.6);
  lean('G2', 3, T2 + 29.7, .4); tl.to(q('#G2 > .sc'), { attr: { transform: 'scale(1.03 1.03)' }, duration: .4 }, T2 + 29.7);
  arm('G2', 'R', -15, 115, T2 + 29.8, .4);
  say('G2', T2 + 30.1, T2 + 32.1, '“I worked at a hedge fund.”');
  pos('.nameplate', 150, 470, T2 + 30.6, 0); op('.nameplate', 1, T2 + 30.6); tl.from(q('.nameplate > g'), { attr: { transform: 'translate(0 40)' }, duration: .3, ease: 'back.out(2)' }, T2 + 30.6); fx('pop', T2 + 30.6);
  arm('G2', 'R', 0, 0, T2 + 32.3, .3);
  tl.to(q('.pile'), { attr: { transform: 'translate(740 872)' }, duration: .3 }, T2 + 32.4);
  say('L2', T2 + 32.6, T2 + 34.6, '“And where’s your money?”');
  mouth('G2', 'o', T2 + 35.0); mouth('G2', 'flat', T2 + 35.6); look('G2', -1, .2, T2 + 36.0, .3);
  lean('G2', -1, T2 + 36.0, .4); tl.to(q('#G2 > .sc'), { attr: { transform: 'scale(1 1)' }, duration: .5 }, T2 + 36.0);
  mouth('G2', 'sheep', T2 + 36.6); brows('G2', .6, T2 + 36.6);
  say('G2', T2 + 36.8, T2 + 38.6, '“…a savings account.”');
  pos('.nameplate', -700, 470, T2 + 39.0, .6, 'power2.in');
  look('L2', -1, .1, T2 + 39.2, .2); nod('L2', T2 + 40.0, 1, 4);
  // walking through the college quad
  cut('setC', Q); camTo('setC', 960, 720, 1.55, Q);
  const quadStop = Q + 15.3;
  tl.fromTo(q('#setC .scroll'), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(-1700 0)' }, duration: quadStop - Q, ease: 'none' }, Q);
  walkCycle('L3', Q, quadStop, true); walkCycle('G3', Q, quadStop, false);
  holdPile('L3', Q, 0, 'L');
  op('#L3 .pPhone', 1, Q); arm('L3', 'R', -18, 70, Q, 0); tl.set(q('#L3 .pPhoneScr'), { fill: '#7fb58a' }, Q);
  look('G3', 1, .5, Q + .3, .2);
  say('L3', Q + 1.0, Q + 3.6, '“Anyway. What do you think about stablecoins?”');
  mouth('G3', 'grin', Q + 3.8); brows('G3', .5, Q + 3.8);
  arm('G3', 'R', -60, -90, Q + 4.0, .3);
  say('G3', Q + 4.2, Q + 6.4, '“Well, when I was at the IMF—”');
  op('#counterO', 1, Q + 5.6); tl.from(q('#counterO > g'), { attr: { transform: 'translate(1600 70)' }, duration: .3, ease: 'back.out(2)' }, Q + 5.6); fx('pop', Q + 5.6);
  fx('ding', Q + 6.5); op('#counterO .c103', 0, Q + 6.5); op('#counterO .c104', 1, Q + 6.5);
  tl.fromTo(q('#counterO .c104'), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(0 -4)' }, duration: .1, yoyo: true, repeat: 1 }, Q + 6.5);
  look('L3', 1, -1, Q + 6.9, .2); look('L3', -1, 0, Q + 7.5, .25);
  say('L3', Q + 7.9, Q + 9.7, '“That bit I remember.”');
  arm('G3', 'R', 0, 0, Q + 9.9, .4); mouth('G3', 'smirk', Q + 9.9); blush('G3', true, Q + 9.9);
  op('#counterO', 0, Q + 10.6, .4); blush('G3', false, Q + 11.4);
  // George takes the MDU folder
  arm('G3', 'R', -72, -10, Q + 11.0, .4); look('G3', 1, .6, Q + 11.0, .2);
  op('#setC .mdu3', 0, Q + 11.4); op('#G3 .gMdu', 1, Q + 11.4); fx('swish', Q + 11.4);
  arm('G3', 'R', -30, 60, Q + 11.6, .4); look('G3', .3, 1, Q + 11.9, .3);
  say('G3', Q + 12.4, Q + 15.0, '“So remind me. This is the lawyer job?”');
  // Luca stops
  look('L3', -.5, .4, Q + 15.6, .5); look('L3', -1, 0, Q + 16.4, .6);
  op('#L3 .pPhone', 0, Q + 17.2); op('#L3 .pClip', 1, Q + 17.2); op('#L3 .pcl1, #L3 .pcl2', 1, Q + 17.2); fx('swish', Q + 17.2);
  cut('insClip', Q + 17.8);
  tl.set(q('.board'), { attr: { transform: 'translate(0 0) rotate(0)' } }, Q + 17.8); tl.set(q('#insClip .pen'), { attr: { transform: 'translate(401 598)' } }, Q + 17.8);
  pos('.georgePeek', 2200, 520, Q + 17.8, 0);
  tl.set(q('.cv1, .cv2'), { attr: { width: 0 } }, Q + 17.8);
  writeLine(3, 620, Q + 18.3, 1.3);
  pos('.georgePeek', 1700, 560, Q + 19.4, .6, 'power2.out'); look('GP', -1, .7, Q + 19.6, .2); brows('GP', -.2, Q + 20.0); mouth('GP', 'sheep', Q + 20.2);
  fx('pager', Q + 21.0);
  cut('insPager', Q + 21.3); shake('#insPager .pagerBig', Q + 21.3);
  cut('setC', Q + 22.6); camTo('setC', 960, 720, 1.55, Q + 22.6);
  look('L3', .4, 1, Q + 22.7, .2); fx('tap', Q + 23.2); op('#L3 .pClip', 0, Q + 23.4);
  look('L3', -1, 0, Q + 23.6, .2);
  say('L3', Q + 23.9, Q + 26.3, '“I’m going to see Nancy. She listens.”');
  walkTo('L3', 2300, 1010, Q + 26.6, 1.9); pos('.pile3', 2250, 880, Q + 26.6, 1.9, 'sine.inOut');
  look('G3', 1, 0, Q + 26.8, .4);
  look('G3', .3, .6, Q + 28.6, .4); blink('G3', Q + 29.0);
  pos('.reachHand', 850, 800, Q + 29.6, .45, 'power2.out');
  op('#G3 .gMdu', 0, Q + 30.1); op('.rhMdu', 1, Q + 30.1); fx('swish', Q + 30.1);
  pos('.reachHand', 2300, 800, Q + 30.3, .45, 'power2.in');
  look('G3', 1, .2, Q + 30.3, .2); arm('G3', 'R', 0, 0, Q + 30.5, .4); brows('G3', .5, Q + 30.5);
  fx('jangle', Q + 31.0);

  /* ---------------- SCENE 3 · Bob ---------------- */
  cut('setD', T3); camTo('setD', 1030, 690, 1.55, T3);
  music(T3, T3 + 29, ['Dm7', 'G6', 'Cmaj7', 'Am7'], { vel: .42 });
  const T3end = T3 + 28.6;
  tl.fromTo(q('#setD .scroll'), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(-2600 0)' }, duration: T3end - T3, ease: 'none' }, T3);
  tl.fromTo(q('#setD .bus'), { attr: { transform: 'translate(2400 0)' } }, { attr: { transform: 'translate(-900 0)' }, duration: 9, ease: 'none' }, T3 + 1);
  walkCycle('G4', T3, T3end, true); walkCycle('L4', T3, T3end, false);
  look('G4', 1, 0, T3, 0); look('L4', -1, 0, T3, 0);
  say('L4', T3 + .5, T3 + 3.1, '“…so that’s separate from the Oxford work.”');
  arm('L4', 'L', 20, -60, T3 + .5, .3); rot('#L4 .foreL', -40, T3 + 1.2, .25); rot('#L4 .foreL', -70, T3 + 1.8, .25); rot('#L4 .foreL', -50, T3 + 2.4, .25); arm('L4', 'L', 0, 0, T3 + 3.2, .3);
  nod('G4', T3 + 3.3, 3, 6);
  say('G4', T3 + 3.6, T3 + 5.8, '“Yes. Obviously. I’m listening.”');
  arm('G4', 'R', 105, 108, T3 + 6.0, .3); arm('G4', 'R', 0, 0, T3 + 6.6, .3); brows('G4', .6, T3 + 6.7); mouth('G4', 'flat', T3 + 6.7);
  look('L4', -1, .2, T3 + 7.2, .2); half('L4', true, T3 + 7.3); half('L4', false, T3 + 8.2);
  // Bob approaches from the far right
  op('#BOB', 1, T3 + 8.0);
  tl.fromTo(q('#BOB'), { attr: { transform: 'translate(1950 960)' } }, { attr: { transform: 'translate(420 1000)' }, duration: 9.5, ease: 'none' }, T3 + 8.0);
  tl.fromTo(q('#BOB > .sc'), { attr: { transform: 'scale(.62 .62)' } }, { attr: { transform: 'scale(.82 .82)' }, duration: 9.5, ease: 'none' }, T3 + 8.0);
  tl.to(q('#BOB'), { attr: { transform: 'translate(-500 1005)' }, duration: 3.5, ease: 'none' }, T3 + 17.5); walkCycle('BOB', T3 + 17.5, T3 + 21.0, false, .6, false); op('#BOB', 0, T3 + 21.0);
  walkCycle('BOB', T3 + 8.0, T3 + 17.5, false, .6, false);
  look('L4', 1, -.2, T3 + 8.8, .2);
  say('L4', T3 + 9.4, T3 + 10.2, '“Bob.”');
  look('G4', 1, -.2, T3 + 10.6, .08); head('G4', -9, T3 + 10.6, .1, 'power3.out');
  say('G4', T3 + 10.8, T3 + 11.6, '“Where?”');
  mouth('L4', 'smirk', T3 + 11.6); look('L4', -1, 0, T3 + 11.6, .2);
  // the tissue
  op('#L4 .pTissue', 1, T3 + 12.2); fx('swish', T3 + 12.2);
  pos('#L4', 1018, 1040, T3 + 12.2, .35); arm('L4', 'L', 144, 0, T3 + 12.4, .4);
  tl.to(q('#L4 .foreL'), { attr: { transform: 'rotate(-10)' }, duration: .16, yoyo: true, repeat: 5 }, T3 + 12.9);
  head('G4', 0, T3 + 14.0, .25); look('G4', 1, 0, T3 + 14.0, .2); brows('G4', -.8, T3 + 14.0); mouth('G4', 'flat', T3 + 14.0);
  pos('#L4', 1170, 1040, T3 + 14.2, .4); arm('L4', 'L', 15, -70, T3 + 14.2, .3);
  say('G4', T3 + 14.4, T3 + 16.0, '“I wasn’t staring.”');
  tl.to(q('#L4 .pTissue'), { attr: { transform: `translate(0 ${FO(LUCA) + 6}) scale(.6)` }, duration: .3 }, T3 + 16.2);
  say('L4', T3 + 16.4, T3 + 17.4, '“Of course.”');
  look('G4', 1, .3, T3 + 17.7, .3); brow('G4', 'L', -.6, T3 + 17.7); brow('G4', 'R', .6, T3 + 17.7);
  say('G4', T3 + 18.0, T3 + 19.8, '“You spotted him first.”');
  op('#L4 .pTissue', 0, T3 + 19.9); arm('L4', 'L', 0, 0, T3 + 19.9, .3);
  say('L4', T3 + 20.1, T3 + 22.2, '“I’m a doctor. I’m observant.”');
  brows('G4', 0, T3 + 22.4); look('G4', 0, 0, T3 + 22.6, .3); look('L4', 0, 0, T3 + 22.6, .3); mouth('L4', 'flat', T3 + 22.6);
  // both glance back at once
  head('G4', 8, T3 + 23.8, .25); look('G4', -1, 0, T3 + 23.8, .2); head('L4', 8, T3 + 23.8, .25); look('L4', -1, 0, T3 + 23.8, .2);
  head('G4', 0, T3 + 24.6, .2); head('L4', 0, T3 + 24.6, .2); look('G4', 1, 0, T3 + 24.6, .15); look('L4', -1, 0, T3 + 24.6, .15);
  brow('G4', 'R', 1.2, T3 + 25.0);
  say('G4', T3 + 25.2, T3 + 26.6, '“Very observant.”');
  mouth('L4', 'smirk', T3 + 26.8); mouth('G4', 'smile', T3 + 27.3); brow('G4', 'R', 0, T3 + 27.3);
  look('G4', 0, 0, T3 + 27.9, .3); look('L4', 0, 0, T3 + 27.9, .3);
  // street sign wipe to Edinburgh
  tl.fromTo(q('#edSignO'), { attr: { transform: 'translate(2800 0)' } }, { attr: { transform: 'translate(-900 0)' }, duration: 1.6, ease: 'power1.inOut' }, T3end - .4);
  fx('swish', T3end);

  /* ---------------- SCENE 4 · Protecting humankind ---------------- */
  const T4 = T3end + .45;
  cut('setE', T4); camTo('setE', 670, 690, 3.0, T4); camTo('setE', 960, 560, 1, T4 + 1.9);
  music(T4, T4 + 23, ['Am', 'Fmaj7', 'Cadd9', 'Gsus'], { vel: .4, mel: THEME2 });
  look('G5', .2, 1, T4, 0); mouth('G5', 'smile', T4);
  tl.to(q('#setE .lidR'), { attr: { transform: 'scale(1 0.06)' }, duration: .3, ease: 'power2.in' }, T4 + 2.2); fx('click', T4 + 2.5);
  mouth('G5', 'grin', T4 + 2.6);
  arm('G5', 'R', -38, -60, T4 + 2.9, .4); op('#G5 .pMap', 1, T4 + 3.0); fx('flip', T4 + 3.0);
  camTo('setE', 820, 640, 2.2, T4 + 3.2);
  look('G5', .3, .6, T4 + 3.2, .2);
  say('G5', T4 + 3.6, T4 + 4.9, '“Right. Hiking.”');
  look('G5', 1, -.3, T4 + 5.0, .25);
  camTo('setE', 1080, 600, 1.15, T4 + 5.0);
  look('L5', -1, .5, T4 + 5.2, .3); look('L5', -1, -.6, T4 + 5.9, .35); head('L5', -4, T4 + 5.9, .3); look('L5', -1, .2, T4 + 6.6, .3); head('L5', 0, T4 + 6.6, .3);
  walkTo('L5', 1000, 1000, T4 + 7.2, 1.0);
  arm('L5', 'L', 50, -40, T4 + 8.2, .35); op('#G5 .pMap', 0, T4 + 8.55); op('#L5 .pMap', 1, T4 + 8.55); fx('flip', T4 + 8.55); arm('G5', 'R', 0, 0, T4 + 8.6, .4);
  arm('L5', 'L', 20, -80, T4 + 8.7, .35);
  say('L5', T4 + 9.0, T4 + 11.4, '“No. We need to think about your safety.”');
  look('G5', 1, -.4, T4 + 11.5, .2); brows('G5', -.3, T4 + 11.5); mouth('G5', 'flat', T4 + 11.5);
  say('G5', T4 + 11.8, T4 + 13.4, '“It’s a hill, Luca.”');
  look('L5', -.3, 1, T4 + 13.6, .25); brows('L5', -.5, T4 + 13.6);
  say('L5', T4 + 13.9, T4 + 16.2, '“You’re too important for humankind.”');
  brows('G5', .7, T4 + 16.4); mouth('G5', 'smile', T4 + 16.4); lean('G5', -2, T4 + 16.4, .4); tl.to(q('#G5 > .sc'), { attr: { transform: 'scale(1.03 1.03)' }, duration: .4 }, T4 + 16.5);
  look('L5', -1, -.2, T4 + 16.8, .2); brows('L5', 0, T4 + 16.8);
  say('L5', T4 + 17.2, T4 + 19.8, '“You’re in line for a Nobel Prize, remember?”');
  mouth('G5', 'smirk', T4 + 19.9); blush('G5', true, T4 + 19.9); look('G5', -.4, .5, T4 + 19.9, .3);
  say('G5', T4 + 20.4, T4 + 21.0, '“Well—”');
  say('L5', T4 + 21.0, T4 + 21.9, '“Exactly.”');
  // the map: Arthur's Seat → café
  arm('L5', 'L', 0, 0, T4 + 22.1, .3); op('#L5 .pMap', 0, T4 + 22.3); op('#setE .mapOnDesk', 1, T4 + 22.3); fx('flip', T4 + 22.3);
  camTo('setE', 820, 760, 3.2, T4 + 22.5);
  tl.fromTo(q('#setE .mapOnDesk > g'), { attr: { transform: 'translate(820 772) rotate(-6)' } }, { attr: { transform: 'translate(820 772) rotate(20)' }, duration: .6, ease: 'power2.inOut' }, T4 + 22.7);
  op('#setE .tapF', 1, T4 + 23.4); pos('#setE .tapF', 899, 730, T4 + 23.4, 0); pos('#setE .tapF', 783, 727, T4 + 23.6, .5);
  fx('tap', T4 + 24.2); tl.to(q('#setE .tapF circle'), { attr: { r: 11 } , duration: .08, yoyo: true, repeat: 1 }, T4 + 24.2);
  fx('tap', T4 + 24.6); tl.to(q('#setE .tapF circle'), { attr: { r: 11 }, duration: .08, yoyo: true, repeat: 1 }, T4 + 24.6);
  tl.to(q('#setE .mapCafe'), { attr: { r: 14 }, duration: .2, yoyo: true, repeat: 3 }, T4 + 24.2);
  // café
  const C = T4 + 25.6;
  cut('setF', C); camTo('setF', 940, 600, 1, C);
  music(T4 + 23, C + 31.4, ['Fmaj7', 'Em7', 'Am7', 'Dm9'], { vel: .42 });
  look('G6', .5, 0, C, 0); look('L6', -.5, 0, C, 0); mouth('L6', 'smile', C); half('L6', true, C + .2);
  pos('#setF .waiter > g', 1150, 640, C + .5, .45, 'power2.out');
  op('.cupG', 1, C + .9); tl.fromTo(q('.cupG'), { attr: { transform: 'translate(0 -300)' } }, { attr: { transform: 'translate(0 0)' }, duration: .3, ease: 'power2.in' }, C + .9); fx('plate', C + 1.2);
  op('.cupL', 1, C + 1.4); tl.fromTo(q('.cupL'), { attr: { transform: 'translate(0 -300)' } }, { attr: { transform: 'translate(0 0)' }, duration: .3, ease: 'power2.in' }, C + 1.4); fx('plate', C + 1.7);
  op('.muffin', 1, C + 2.2); op('.plateG', 1, C + 2.2); tl.fromTo(q('.muffin'), { attr: { transform: 'translate(0 -300)' } }, { attr: { transform: 'translate(0 0)' }, duration: .3, ease: 'power2.in' }, C + 2.2); fx('plate', C + 2.5);
  pos('#setF .waiter > g', 2300, 640, C + 2.7, .45, 'power2.in');
  head('G6', -6, C + 3.3, .4); look('G6', -.8, -1, C + 3.3, .3);
  head('G6', 0, C + 4.4, .3); look('G6', 1, 0, C + 4.4, .3);
  camTo('setF', 940, 700, 1.6, C + 4.9);
  say('G6', C + 5.1, C + 7.2, '“You just didn’t want to hike.”');
  half('L6', false, C + 7.3);
  tl.to(q('.cupL'), { attr: { transform: 'translate(70 -110)' }, duration: .5, ease: 'power2.inOut' }, C + 7.4);
  say('L6', C + 8.0, C + 9.8, '“Two things can be true.”');
  fx('sip', C + 10.0, .8); half('L6', true, C + 10.0);
  tl.to(q('.cupL'), { attr: { transform: 'translate(0 0)' }, duration: .5 }, C + 11.0); half('L6', false, C + 11.2);
  // the muffin top
  arm('L6', 'L', 48, -30, C + 11.5, .35); op('.mhand', 1, C + 11.8); tl.to(q('.mtop'), { attr: { transform: 'translate(150 -50) rotate(10)' }, duration: .5, ease: 'back.out(1.5)' }, C + 11.8); fx('swish', C + 11.8);
  look('G6', 1, .8, C + 12.6, .3); mouth('G6', 'flat', C + 12.6);
  look('G6', 1, -.1, C + 13.4, .3); mouth('G6', 'smirk', C + 13.9); brows('G6', .5, C + 13.9);
  look('L6', -1, 0, C + 14.5, .2); look('L6', -.4, .8, C + 15.0, .25); look('L6', -1, 0, C + 15.6, .25); half('L6', true, C + 15.7);
  say('L6', C + 16.0, C + 18.2, '“Yes, George. A muffin top.”');
  half('L6', false, C + 18.3);
  arm('G6', 'L', 40, -120, C + 18.4, .35); arm('G6', 'R', -40, 120, C + 18.4, .35); brows('G6', .8, C + 18.4); mouth('G6', 'smile', C + 18.4);
  say('G6', C + 18.6, C + 20.6, '“I haven’t said anything.”');
  say('L6', C + 20.8, C + 22.2, '“You don’t need to.”');
  arm('G6', 'L', 0, 0, C + 22.4, .4); arm('G6', 'R', 0, 0, C + 22.4, .4); brows('G6', 0, C + 22.4);
  camTo('setF', 940, 700, 1.6, C + 22.6, 1.6, 'sine.inOut');
  arm('L6', 'L', 70, -10, C + 24.4, .5); tl.to(q('.mtop'), { attr: { transform: 'translate(-120 26) rotate(-4)' }, duration: .7, ease: 'power2.inOut' }, C + 24.6); op('.mhand', 0, C + 25.35); arm('L6', 'L', 0, 0, C + 25.4, .4);
  look('G6', .6, .9, C + 24.6, .3);
  arm('G6', 'R', -60, -40, C + 25.5, .35); tl.to(q('.mtop'), { attr: { transform: 'translate(-300 -110) rotate(-4)' }, duration: .45 }, C + 25.6); arm('G6', 'R', 0, 0, C + 26.2, .4);
  op('.mtop', 0, C + 26.0); fx('swish', C + 26.0);
  mouth('G6', 'chew', C + 26.0); for (let i = 0; i < 5; i++) { mouth('G6', i % 2 ? 'chew' : 'flat', C + 26 + i * .25); } mouth('G6', 'smile', C + 27.4);
  mouth('L6', 'smile', C + 26.3); half('L6', true, C + 26.4);
  tl.to(q('.cupL'), { attr: { transform: 'translate(70 -110)' }, duration: .5 }, C + 26.6); fx('sip', C + 27.2, .6); tl.to(q('.cupL'), { attr: { transform: 'translate(0 0)' }, duration: .5 }, C + 28.0);
  camTo('setF', 760, 420, 1.5, C + 28.4, 1.6, 'sine.inOut');
  // coffee cup rim → iris
  camTo('setF', 760, 740, 7, C + 30.4, .9, 'power2.in');
  tl.fromTo(q('#iris'), { attr: { r: 3400 } }, { attr: { r: 2000 }, duration: .7, ease: 'power2.in' }, C + 30.6);

  /* ---------------- SCENE 5 · Special delivery ---------------- */
  const T5 = C + 31.4;
  cut('setG', T5); camTo('setG', 880, 620, 1.3, T5);
  tl.to(q('#iris'), { attr: { r: 3400 }, duration: .9, ease: 'power2.out' }, T5 + .1);
  music(T5, T5 + 43, ['Fmaj7', 'G6', 'Em7', 'Am7'], { vel: .42, mel: THEME });
  op('#G7', 0, T5); op('#L7s', 0, T5);
  look('L7', .8, -.2, T5, 0); mouth('L7', 'flat', T5);
  fx('notify', T5 + 1.2); arm('L7', 'R', -10, 120, T5 + 1.4, .4); op('#L7 .pPhone', 1, T5 + 1.4); look('L7', .4, .6, T5 + 1.8, .2);
  const m1 = addMsg('phB', false, 'Could I have a little vase dropped off at your office?');
  const m2 = addMsg('phB', true, 'How valuable is it?');
  const m3 = addMsg('phB', false, 'Don’t freak out.');
  const m4 = addMsg('phB', true, 'That is not an answer.');
  const m5 = addMsg('phB', true, 'If it’s more than £30, I’m not touching it.');
  cut('insMsg', T5 + 2.2); showMsg(m1, T5 + 2.5);
  cut('setG', T5 + 5.6); camTo('setG', 760, 640, 1.6, T5 + 5.6);
  look('L7', .4, .9, T5 + 5.8, .2); look('L7', -.6, .9, T5 + 6.6, .3); look('L7', -.2, .4, T5 + 7.3, .3);
  cut('insMsg', T5 + 7.9); showMsg(m2, T5 + 8.3, 'send'); showMsg(m3, T5 + 10.1);
  cut('setG', T5 + 12.2); lean('L7', 4, T5 + 12.3, .4); brows('L7', .6, T5 + 12.4); look('L7', .2, .8, T5 + 12.3, .2);
  cut('insMsg', T5 + 13.6); showMsg(m4, T5 + 14.0, 'send'); showMsg(m5, T5 + 15.8, 'send');
  cut('setG', T5 + 18.6); camTo('setG', 960, 560, 1, T5 + 18.6); lean('L7', 0, T5 + 18.6, 0); brows('L7', 0, T5 + 18.6, 0);
  op('#L7 .pPhone', 0, T5 + 18.9); arm('L7', 'R', 0, 0, T5 + 18.9, .3); fx('tap', T5 + 19.0); look('L7', .8, -.2, T5 + 19.2, .3);
  fx('knock', T5 + 20.4); look('L7', 1, -.3, T5 + 21.0, .2); brows('L7', .4, T5 + 21.0);
  // up and to the door
  op('#L7', 0, T5 + 21.8); op('#L7s', 1, T5 + 21.8); look('L7s', 1, -.2, T5 + 21.8, 0); brows('L7s', .4, T5 + 21.8, 0);
  walkTo('L7s', 1340, 1000, T5 + 21.9, 1.3);
  op('#G7', 1, T5 + 23.3); arm('G7', 'L', 12, -62, T5 + 23.3, 0); arm('G7', 'R', -12, 62, T5 + 23.3, 0); mouth('G7', 'flat', T5 + 23.3); look('G7', -1, 0, T5 + 23.3, 0); op('#G7 .pVase', 1, T5 + 23.3);
  fx('door', T5 + 23.3); tl.to(q('#setG .doorLeaf'), { attr: { transform: 'scale(0.12 1)' }, duration: .5, ease: 'power2.out' }, T5 + 23.3);
  camTo('setG', 1500, 560, 1.45, T5 + 24.0);
  say('G7', T5 + 24.4, T5 + 25.3, '“Delivery.”');
  blink('L7s', T5 + 25.6, .2); look('L7s', 1, -.2, T5 + 26.0, .2); look('L7s', .8, .9, T5 + 26.6, .25); look('L7s', 1, -.2, T5 + 27.2, .25);
  say('L7s', T5 + 27.8, T5 + 30.2, '“You said a friend was bringing it.”');
  arm('G7', 'L', 16, -76, T5 + 30.4, .3); arm('G7', 'R', -16, 76, T5 + 30.4, .3);
  say('G7', T5 + 30.6, T5 + 32.4, '“It’s a very nice vase.”');
  mouth('G7', 'flat', T5 + 32.4); tl.to(q('#G7 .m-smirk'), { attr: { opacity: 1 }, duration: .05, yoyo: true, repeat: 1 }, T5 + 33.6);
  head('L7s', -6, T5 + 33.4, .18); head('L7s', 6, T5 + 33.6, .2); head('L7s', -5, T5 + 33.8, .2); head('L7s', 0, T5 + 34.0, .2);
  mouth('L7s', 'grin', T5 + 34.2); brows('L7s', .2, T5 + 34.2);
  say('L7s', T5 + 34.6, T5 + 36.0, '“You absolute idiot.”');
  mouth('L7s', 'laugh', T5 + 36.0); mouth('L7s', 'grin', T5 + 36.4);
  mouth('G7', 'grin', T5 + 36.2);
  walkTo('L7s', 1180, 1000, T5 + 36.6, .6);
  camTo('setG', 960, 560, 1, T5 + 37.3);
  walkTo('G7', 700, 940, T5 + 37.4, 1.6);
  arm('G7', 'L', 20, -50, T5 + 39.0, .3); arm('G7', 'R', -20, 50, T5 + 39.0, .3);
  op('#G7 .pVase', 0, T5 + 39.35); op('#setG .deskVase', 1, T5 + 39.35); fx('tap', T5 + 39.35);
  arm('G7', 'L', 0, 0, T5 + 39.5, .3); arm('G7', 'R', 0, 0, T5 + 39.5, .3);
  look('G7', -.3, 1, T5 + 39.7, .3); look('L7s', -1, .9, T5 + 39.7, .3);
  look('L7s', -1, 0, T5 + 40.9, .3);
  say('L7s', T5 + 41.2, T5 + 43.2, '“Does the delivery need feeding?”');
  look('G7', 1, 0, T5 + 43.2, .15);
  say('G7', T5 + 43.3, T5 + 45.0, '“Italian would be nice.”');
  walkTo('L7s', 1340, 1000, T5 + 45.2, .5); arm('L7s', 'R', -40, 0, T5 + 45.6, .3); op('#setG .jacket', 0, T5 + 45.9); fx('swish', T5 + 45.9); arm('L7s', 'R', 0, 0, T5 + 46.1, .3);
  arm('G7', 'L', 20, -60, T5 + 45.4, .3); tl.to(q('#setG .deskVase > g'), { attr: { transform: 'translate(640 776) rotate(6)' }, duration: .2, yoyo: true, repeat: 1 }, T5 + 45.7); arm('G7', 'L', 0, 0, T5 + 46.2, .3);
  walkTo('G7', 1560, 990, T5 + 46.4, 1.4); walkTo('L7s', 1600, 990, T5 + 46.6, 1.0);
  op('#L7s', 0, T5 + 47.7, .3); op('#G7', 0, T5 + 47.9, .3);
  fx('door', T5 + 48.2); tl.to(q('#setG .doorLeaf'), { attr: { transform: 'scale(1 1)' }, duration: .4 }, T5 + 48.1);
  camTo('setG', 640, 740, 3.2, T5 + 48.6, 2.2, 'sine.inOut');
  fx('notify', T5 + 51.4);
  camTo('setG', 640, 1300, 3.2, T5 + 51.6, .7, 'power2.in');

  /* ---------------- SCENE 6 · Premium access ---------------- */
  const T6 = T5 + 52.3;
  cut('setH', T6); camTo('setH', 960, 540, 1, T6);
  music(T5 + 43, T6 + 46, ['Cmaj7', 'Am7', 'Dm7', 'G6'], { vel: .4 });
  mouth('GH', 'smile', T6); mouth('LH', 'flat', T6); look('GH', 1, .5, T6, 0); look('LH', -1, .5, T6, 0);
  const pair = (fromLuca, content, t) => {
    const a = addMsg('phL', fromLuca, content), b = addMsg('phG', !fromLuca, content);
    showMsg(fromLuca ? a : b, t, 'send'); showMsg(fromLuca ? b : a, t + .3, 'msg');
  };
  pair(true, 'Can we PLEASE go back to WhatsApp?', T6 + .8);
  look('GH', 1, .6, T6 + 1.4, .2); mouth('GH', 'smirk', T6 + 2.6);
  pair(false, 'You get premium access to George here.', T6 + 3.6);
  op('#setH .badge', 1, T6 + 5.8); tl.from(q('#setH .badge > g'), { attr: { transform: 'translate(330 300)' }, duration: .35, ease: 'back.out(2)' }, T6 + 5.8); fx('ding', T6 + 5.8);
  look('GH', -.4, -1, T6 + 6.4, .3); mouth('GH', 'grin', T6 + 6.6); look('GH', 1, .5, T6 + 7.6, .3);
  op('#setH .drawer', 1, T6 + 8.2); tl.from(q('#setH .drawer'), { attr: { transform: 'translate(0 240)' }, duration: .35, ease: 'power2.out' }, T6 + 8.2); fx('swish', T6 + 8.2);
  look('LH', -.6, 1, T6 + 8.6, .3); brows('LH', -.3, T6 + 8.8);
  op('#setH .drawer', 0, T6 + 10.6);
  pair(true, 'My previous package included stickers.', T6 + 10.8);
  tl.to(q('#setH .badgeR'), { attr: { transform: 'rotate(14)' }, duration: .4, ease: 'back.out(2)' }, T6 + 13.2);
  look('GH', 1, .6, T6 + 13.6, .2);
  pair(false, { sticker: 'straw' }, T6 + 14.4);
  half('LH', true, T6 + 17.0); brows('LH', -.6, T6 + 17.0);
  pair(true, 'That’s MY sticker.', T6 + 17.6);
  mouth('GH', 'grin', T6 + 19.4); look('GH', 1, .8, T6 + 19.4, .2);
  pair(false, 'It’s a very good sticker.', T6 + 20.0);
  half('LH', false, T6 + 22.0); tl.to(q('#LH > .sc'), { attr: { transform: 'scale(2.05 2.05)' }, duration: .4 }, T6 + 22.0);
  pair(true, 'Then put it on MY phone.', T6 + 22.4);
  mouth('GH', 'smile', T6 + 24.4); brows('GH', .3, T6 + 24.4);
  pair(false, 'I’ll do it tomorrow.', T6 + 24.8);
  tl.to(q('#setH .badgeR'), { attr: { transform: 'rotate(0)' }, duration: .4 }, T6 + 26.8);
  tl.to(q('#LH > .sc'), { attr: { transform: 'scale(1.9 1.9)' }, duration: .4 }, T6 + 26.8);
  op('#setH .cal', 1, T6 + 27.4); fx('flip', T6 + 28.0); op('#setH .day1', 0, T6 + 28.0); op('#setH .day2', 1, T6 + 28.0);
  fx('flip', T6 + 28.8); op('#setH .day2', 0, T6 + 28.8); op('#setH .day3', 1, T6 + 28.8);
  op('#setH .cal', 0, T6 + 29.8, .3);
  pair(true, 'KID WITH HAND UP STICKER', T6 + 30.2);
  look('GH', 1, .6, T6 + 30.6, .2); mouth('GH', 'grin', T6 + 31.8);
  pair(false, { sticker: 'hand' }, T6 + 32.6);
  half('LH', true, T6 + 35.2); mouth('LH', 'flat', T6 + 35.2); look('LH', -1, .2, T6 + 35.2, .3);
  silent(T6 + 35.0, T6 + 37.6);
  pair(true, 'I feel vulnerable without my stickers.', T6 + 37.8);
  half('LH', false, T6 + 38.0);
  mouth('GH', 'smirk', T6 + 39.8); blush('GH', true, T6 + 39.8); tl.to(q('#GH > .sc'), { attr: { transform: 'scale(1.9 1.87)' }, duration: .1, yoyo: true, repeat: 3 }, T6 + 39.9);
  pair(true, 'KID WITH STRAW STICKER', T6 + 41.0);
  // the final reaction
  camTo('setH', 610, 640, 1.6, T6 + 43.0, .6);
  { const last = [...q('#phG .msgs > g')].pop(), b = +last.dataset.bottom, lim = 1020 / 2 - 50 - 250; tl.to(q('#phG .msgs'), { attr: { transform: `translate(0 ${-(b - lim)})` }, duration: .35 }, T6 + 43.5); }
  op('#setH .tray', 1, T6 + 43.6); tl.from(q('#setH .tray'), { attr: { transform: 'translate(0 240)' }, duration: .35 }, T6 + 43.6);
  look('GH', 1, .2, T6 + 44.2, .25); look('GH', 1, 1, T6 + 45.0, .25); look('GH', 0, 0, T6 + 45.8, .3); mouth('GH', 'flat', T6 + 45.8); blush('GH', false, T6 + 45.8);
  tl.to(q('#setH .badge > g'), { attr: { transform: 'translate(330 1400)' }, duration: .7, ease: 'power2.in' }, T6 + 46.8);
  tl.to(q('#setH .badgeR'), { attr: { transform: 'rotate(60)' }, duration: .7 }, T6 + 46.8);
  fx('clink', T6 + 47.5);

  /* ---------------- SCENE 7 · Bring your phone ---------------- */
  const T7 = T6 + 48.4;
  cut('setI', T7);
  music(T6 + 46, T7 + 38, ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7'], { vel: .38, mel: THEME, style: 'sparse' });
  op('#setI .phoneDown', 1, T7); fx('tap', T7 + .1); op('#G8 .pPhone', 0, T7); camTo('setI', 790, 730, 2.6, T7);
  camTo('setI', 700, 620, 1.45, T7 + 1.0, 1.8, 'sine.inOut');
  fx('sizzle', T7 + .5, 30);
  for (let i = 0; i < 3; i++) tl.fromTo(q(`#setI .st${i}`), { attr: { transform: 'translate(0 0)', opacity: .6 } }, { attr: { transform: 'translate(0 -60)', opacity: 0 }, duration: 2.2, repeat: 15, ease: 'none' }, T7 + i * .7);
  tl.to(q('#setI .bub'), { attr: { r: 8 }, duration: .4, yoyo: true, repeat: 50, stagger: .2 }, T7);
  op('#G8 .pSpoon', 1, T7);
  arm('G8', 'L', 80, 0, T7 + 2.6, .4);
  for (let i = 0; i < 4; i++) { rot('#G8 .foreL', -12, T7 + 3.0 + i * .5, .25, 'sine.inOut'); rot('#G8 .foreL', 12, T7 + 3.25 + i * .5, .25, 'sine.inOut'); }
  fx('stir', T7 + 3.0, 2);
  look('G8', -1, .9, T7 + 2.8, .3);
  arm('G8', 'L', 150, 127, T7 + 5.2, .5); op('#G8 .pSpoon', 0, T7 + 5.3); op('#G8 .pSpoon', 1, T7 + 7.2); look('G8', 0, -.2, T7 + 5.7, .2); mouth('G8', 'chew', T7 + 5.8); brows('G8', .3, T7 + 5.8);
  for (let i = 0; i < 3; i++) mouth('G8', i % 2 ? 'chew' : 'flat', T7 + 5.9 + i * .25);
  look('G8', .3, -.6, T7 + 6.6, .3);
  arm('G8', 'L', 80, 0, T7 + 7.2, .4);
  arm('G8', 'R', 70, 10, T7 + 7.6, .4); tl.to(q('#G8 .foreR'), { attr: { transform: 'rotate(20)' }, duration: .1, yoyo: true, repeat: 3 }, T7 + 8.0); arm('G8', 'R', 0, 0, T7 + 8.6, .4);
  arm('G8', 'L', 150, 127, T7 + 9.0, .5); op('#G8 .pSpoon', 0, T7 + 9.1); op('#G8 .pSpoon', 1, T7 + 11.0); mouth('G8', 'chew', T7 + 9.6); mouth('G8', 'flat', T7 + 9.9); mouth('G8', 'chew', T7 + 10.1);
  mouth('G8', 'smile', T7 + 10.6); nod('G8', T7 + 10.7, 1, 4); arm('G8', 'L', 80, 0, T7 + 11.0, .5);
  // the phone
  op('#setI .phoneDown', 0, T7 + 11.8); arm('G8', 'R', 30, 60, T7 + 11.8, .4); op('#G8 .pPhone', 1, T7 + 11.9); look('G8', -.2, .9, T7 + 12.2, .2);
  const k1 = addMsg('phK', true, 'Dinner sometime? I’ll cook. You can criticise the glasses.');
  const k2 = addMsg('phK', true, 'And bring your phone. We’re finally sorting the stickers.');
  cut('insKPhone', T7 + 12.6); showMsg(k1, T7 + 13.4, 'send');
  cut('setI', T7 + 17.2); camTo('setI', 700, 620, 1.45, T7 + 17.2);
  look('G8', 1, -.4, T7 + 17.5, .3); head('G8', -4, T7 + 17.5, .3);
  camTo('setI', 1870, 600, 2.5, T7 + 18.2, .8, 'power2.inOut');
  camTo('setI', 700, 600, 1.6, T7 + 21.4); head('G8', 0, T7 + 21.4, 0); look('G8', -.2, .9, T7 + 21.6, .25);
  cut('insKPhone', T7 + 22.4); showMsg(k2, T7 + 23.0, 'send');
  cut('setI', T7 + 26.8); camTo('setI', 760, 600, 1.4, T7 + 26.8); mouth('G8', 'smile', T7 + 26.8);
  popIn('#stI', T7 + 27.6); fx('sip', T7 + 27.8, 2.2);
  look('G8', 1, -.5, T7 + 30.2, .2); brows('G8', .4, T7 + 30.2); mouth('G8', 'flat', T7 + 30.2);
  say('G8', T7 + 30.8, T7 + 32.6, '“Yes. Actually this time.”');
  tl.to(q('#stI > .sc'), { attr: { transform: 'scale(.88 .88)' }, duration: .2, yoyo: true, repeat: 1 }, T7 + 33.0);
  nod('G8', T7 + 33.8, 1, 4); mouth('G8', 'sheep', T7 + 33.8);
  look('G8', -.8, .9, T7 + 34.5, .3); arm('G8', 'R', 0, 0, T7 + 34.3, .4); op('#G8 .pPhone', 0, T7 + 34.4);
  for (let i = 0; i < 3; i++) { rot('#G8 .foreL', -12, T7 + 34.8 + i * .5, .25, 'sine.inOut'); rot('#G8 .foreL', 12, T7 + 35.05 + i * .5, .25, 'sine.inOut'); }
  arm('G8', 'L', 80, 0, T7 + 34.6, .3); fx('stir', T7 + 34.8, 1.5);
  // final frame: the phone, invitation visible; plates in the background
  cut('insKPhone', T7 + 36.6); camTo('insKPhone', 960, 540, 1, T7 + 36.6); camTo('insKPhone', 960, 470, 1.18, T7 + 36.6, 4.5, 'sine.inOut');
  fx('plate', T7 + 38.2); fx('plate', T7 + 38.6);
  fx('sip', T7 + 40.0, .7);
  tl.to(q('#black'), { attr: { opacity: 1 }, duration: 2.2 }, T7 + 40.4);
  tl.call(() => { if (soundOn && ac) { const t = ac.currentTime; [41, 53, 60, 64, 67, 72].forEach((m, i) => piano(m, t + i * .09, .45, 5)); } }, null, T7 + 40.0);
  silent(T7 + 39.8, T7 + 60);
  tl.to({}, { duration: .1 }, T7 + 43.2);

  // natural blinks
  B('G1', 1.5, 5.6, 13.0, 18.0, 28.0, 41.0, 44.0); B('L1', 2.4, 10.0, 15.6, 20.4, 33.0);
  B('L2', T2 + 4.6, T2 + 12.4, T2 + 20.0, T2 + 31.0, T2 + 36.0); B('G2', T2 + 25.0, T2 + 28.0, T2 + 33.0);
  B('L3', Q + 2.0, Q + 4.8, Q + 10.4, Q + 13.0); B('G3', Q + 1.6, Q + 7.0, Q + 13.8, Q + 25.0);
  B('G4', T3 + 2.0, T3 + 8.6, T3 + 13.0, T3 + 20.6, T3 + 26.0); B('L4', T3 + 4.2, T3 + 11.0, T3 + 18.6, T3 + 25.6);
  B('G5', T4 + 2.0, T4 + 6.0, T4 + 10.0, T4 + 14.6, T4 + 18.2); B('L5', T4 + 3.0, T4 + 8.0, T4 + 12.4, T4 + 19.0);
  B('G6', C + 2.0, C + 9.0, C + 15.0, C + 21.0, C + 29.0); B('L6', C + 6.0, C + 13.2, C + 20.0);
  B('L7', T5 + 3.6, T5 + 9.0, T5 + 17.0); B('G7', T5 + 26.4, T5 + 29.0, T5 + 38.0, T5 + 42.0); B('L7s', T5 + 31.6, T5 + 38.4, T5 + 44.0);
  B('GH', T6 + 4.6, T6 + 12.0, T6 + 18.6, T6 + 27.0, T6 + 34.0, T6 + 42.0); B('LH', T6 + 6.0, T6 + 13.0, T6 + 20.4, T6 + 29.0, T6 + 40.0);
  B('G8', T7 + 4.4, T7 + 8.4, T7 + 13.0, T7 + 20.0, T7 + 29.0, T7 + 33.2);
  blinks.forEach(([w, t]) => blink(w, t));
}

/* small helper animations used above */
function wheelSpin(car, deg, t, d) { q(`#${car} .wheel`).forEach((w, i) => { const cx = i ? 190 : -190; tl.to(w, { attr: { transform: `rotate(${deg} ${cx} -45)` }, duration: d, ease: 'power1.inOut' }, t); }); }
function shake(sel, t) { tl.fromTo(q(sel), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(7 0)' }, duration: .05, repeat: 9, yoyo: true }, t); tl.set(q(sel), { attr: { transform: 'translate(0 0)' } }, t + .55); }
function holdPile(who, t, d = .4, side) { arm(who, 'L', -14, -78, t, d); arm(who, 'R', 14, 78, t, d); }
function nose(who, t) { /* exhale through the nose: a tiny puff */ const id = 'puff' + Math.round(t * 10); svg.querySelector(`#${who} .head`).insertAdjacentHTML('beforeend', `<g id="${id}" opacity="0"><path d="M-6 ${rOf(charOf(who)) * .52} q-10 6 -16 2 M6 ${rOf(charOf(who)) * .52} q10 6 16 2" transform="translate(0 ${-rOf(charOf(who))})" style="fill:none;stroke:#9aa3ab;stroke-width:3;stroke-linecap:round"/></g>`); tl.to(q('#' + id), { attr: { opacity: 1 }, duration: .1 }, t); tl.to(q('#' + id), { attr: { opacity: 0 }, duration: .5 }, t + .5); fx('swish', t); }
let TW = [0, 0, 0, 0];
function writeLine(n, y, t, d) {
  tl.set(q('#insClip .pen'), { attr: { transform: `translate(401 ${y - 22})` } }, t - .05);
  tl.fromTo(q('.cv' + n), { attr: { x: 380, width: TW[n] + 40 } }, { attr: { x: 395 + TW[n] + 20, width: 0 }, duration: d, ease: 'none', immediateRender: true }, t);
  tl.to(q('#insClip .pen'), { attr: { transform: `translate(${(401 + TW[n]).toFixed(1)} ${y - 22})` }, duration: d, ease: 'none' }, t);
  fx('scratch', t, d);
}
function underline(n, word, t, d) {
  const el = q('.tl' + n)[0], txt = el.textContent, i = txt.indexOf(word);
  const x0 = 395 + el.getSubStringLength(0, i), x1 = x0 + el.getSubStringLength(i, word.length), y = n === 2 ? 516 : 396;
  const u = q('#insClip .uline')[0]; u.setAttribute('d', `M${x0} ${y} L${x1} ${y}`);
  const len = x1 - x0; u.style.strokeDasharray = len; u.style.strokeDashoffset = len;
  tl.to(u, { strokeDashoffset: 0, duration: d, ease: 'none' }, t);
  tl.fromTo(q('#insClip .pen'), { attr: { transform: `translate(${x0 + 6} ${y - 18})` } }, { attr: { transform: `translate(${x1 + 6} ${y - 18})` }, duration: d, ease: 'none' }, t);
  fx('scratch', t, d);
  tl.to(q('#insClip .pen'), { attr: { transform: 'translate(1500 760)' }, duration: .4 }, t + d + .3);
}
