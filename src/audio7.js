/* ===================== audio: soft piano score + clear sound effects ===================== */
let ac = null, soundOn = true, master, musicBus, sfxBus, verb;
function actx() {
  if (ac) return ac;
  ac = new (window.AudioContext || window.webkitAudioContext)();
  master = ac.createGain(); master.gain.value = .9; master.connect(ac.destination);
  musicBus = ac.createGain(); musicBus.gain.value = .55;
  sfxBus = ac.createGain(); sfxBus.gain.value = 1; sfxBus.connect(master);
  // small room reverb from generated impulse
  verb = ac.createConvolver();
  const len = ac.sampleRate * 2.6, ir = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
  verb.buffer = ir;
  const wet = ac.createGain(); wet.gain.value = .32; const dry = ac.createGain(); dry.gain.value = .8;
  musicBus.connect(dry).connect(master); musicBus.connect(verb); verb.connect(wet).connect(master);
  return ac;
}
const now = () => (ac ? ac.currentTime : 0);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

/* piano-ish tone: stacked partials, felt-soft attack, natural decay */
function piano(midi, at, vel = .5, len = 2.2) {
  if (!soundOn || !ac) return;
  const f = mtof(midi), t = Math.max(ac.currentTime, at);
  const g = ac.createGain(), lp = ac.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 1400 + vel * 2600 - Math.max(0, midi - 72) * 20;
  const decay = Math.max(.6, len * (1.25 - (midi - 48) / 70));
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16 * vel, t + .012);
  g.gain.exponentialRampToValueAtTime(.06 * vel, t + .25); g.gain.exponentialRampToValueAtTime(.0001, t + decay);
  [[1, 1], [2, .42], [3, .18], [4, .09], [5.02, .04]].forEach(([h, a], i) => {
    const o = ac.createOscillator(), og = ac.createGain();
    o.type = i ? 'sine' : 'triangle'; o.frequency.value = f * h * (1 + (i ? .0008 * i : 0)); og.gain.value = a;
    o.connect(og).connect(lp); o.start(t); o.stop(t + decay + .05);
  });
  lp.connect(g).connect(musicBus);
}
function tone(freq, at, { dur = .3, type = 'sine', vol = .1, cut = 4000, slide, bus } = {}) {
  if (!soundOn || !ac) return;
  const t = Math.max(ac.currentTime, at), o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
  o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
  f.type = 'lowpass'; f.frequency.value = cut;
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(f).connect(g).connect(bus || sfxBus); o.start(t); o.stop(t + dur + .05);
}
function noise(at, { dur = .06, vol = .08, hp, bp, lp, q = 1 } = {}) {
  if (!soundOn || !ac) return;
  const t = Math.max(ac.currentTime, at), n = Math.ceil(ac.sampleRate * dur), buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.5);
  const src = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
  src.buffer = buf; f.type = bp ? 'bandpass' : hp ? 'highpass' : 'lowpass'; f.frequency.value = bp || hp || lp || 2000; f.Q.value = q; g.gain.value = vol;
  src.connect(f).connect(g).connect(sfxBus); src.start(t);
}
const SFX = {
  fwip: () => { for (let i = 0; i < 8; i++) noise(now() + i * .025, { dur: .07, vol: .06, bp: 700 + i * 380, q: 2 }); },
  click: () => { noise(now(), { dur: .018, vol: .2, hp: 3500 }); tone(2400, now(), { dur: .03, vol: .05 }); },
  scratch: (len = 1.4) => { for (let t = 0; t < len; t += .08) noise(now() + t + Math.random() * .03, { dur: .05 + Math.random() * .05, vol: .06, bp: 2600 + Math.random() * 1800, q: 3 }); },
  tap: () => { noise(now(), { dur: .05, vol: .2, lp: 900 }); tone(180, now(), { dur: .08, vol: .12 }); },
  beepbeep: () => { tone(880, now(), { type: 'square', vol: .07, dur: .1, cut: 3000 }); tone(880, now() + .16, { type: 'square', vol: .07, dur: .12, cut: 3000 }); },
  engine: (len = 1.4) => { for (let i = 0; i < len / .08; i++) tone(62 + i * 3, now() + i * .08, { type: 'sawtooth', vol: .035, dur: .1, cut: 380 }); },
  door: () => { tone(1500, now(), { type: 'sine', vol: .04, dur: .05 }); noise(now() + .05, { dur: .18, vol: .15, lp: 500 }); },
  thud: () => { tone(120, now(), { vol: .35, dur: .25, slide: 50 }); noise(now(), { dur: .06, vol: .1, lp: 600 }); },
  thudDull: () => { tone(85, now(), { vol: .38, dur: .45, slide: 40 }); noise(now(), { dur: .1, vol: .12, lp: 400 }); },
  jangle: () => { for (let i = 0; i < 9; i++) tone(2200 + Math.random() * 2200, now() + i * .04 + Math.random() * .02, { type: 'triangle', vol: .05, dur: .22, cut: 9000 }); },
  pager: () => { for (let i = 0; i < 3; i++) tone(2350, now() + i * .17, { type: 'square', vol: .055, dur: .1, cut: 5000 }); },
  notify: () => { tone(1046, now(), { vol: .09, dur: .25 }); tone(1568, now() + .1, { vol: .08, dur: .4 }); },
  msg: () => { tone(1318, now(), { vol: .07, dur: .14 }); tone(1760, now() + .07, { vol: .06, dur: .2 }); },
  send: () => { noise(now(), { dur: .12, vol: .05, bp: 1800, q: 1.5 }); tone(990, now() + .02, { vol: .04, dur: .1, slide: 1400 }); },
  ding: () => { tone(1975, now(), { vol: .09, dur: .7 }); tone(3951, now(), { vol: .02, dur: .5 }); },
  pop: () => tone(520, now(), { vol: .08, dur: .09, slide: 900 }),
  step: () => { noise(now(), { dur: .05, vol: .09, lp: 700 }); },
  knock: () => { [0, .22, .44].forEach(d => { tone(150, now() + d, { vol: .3, dur: .08, slide: 90 }); noise(now() + d, { dur: .03, vol: .12, lp: 1200 }); }); },
  sip: (len = 1.2) => { for (let t = 0; t < len; t += .04) noise(now() + t, { dur: .06, vol: .035, bp: 2800 + Math.sin(t * 9) * 600, q: 4 }); },
  flip: () => noise(now(), { dur: .16, vol: .08, bp: 3000, q: .7 }),
  clink: () => { tone(2637, now(), { vol: .08, dur: .3 }); tone(3520, now() + .01, { vol: .05, dur: .25 }); },
  stir: (len = 1.5) => { for (let t = 0; t < len; t += .3) noise(now() + t, { dur: .2, vol: .03, bp: 900, q: .8 }); },
  plate: () => { tone(1800, now(), { vol: .05, dur: .2 }); noise(now(), { dur: .04, vol: .06, hp: 2500 }); },
  sizzle: (len = 3) => { for (let t = 0; t < len; t += .05) noise(now() + t, { dur: .06, vol: .012, hp: 4000 }); },
  swish: () => { for (let i = 0; i < 6; i++) noise(now() + i * .03, { dur: .06, vol: .04, bp: 500 + i * 300, q: 1.5 }); }
};

/* ===================== per-scene score ===================== */
const V = (m) => 440 * Math.pow(2, (m - 69) / 12);
function voice(midi, at, { type = 'triangle', dur = .3, vol = .1, atk = .01, rel, cut = 3000, q = .7, detune = 0, vib = 0, bp, bus } = {}) {
  if (!soundOn || !ac) return;
  const t = Math.max(ac.currentTime, at), f = V(midi), g = ac.createGain(), fl = ac.createBiquadFilter();
  fl.type = bp ? 'bandpass' : 'lowpass'; fl.frequency.value = bp || cut; fl.Q.value = q;
  const r = rel ?? dur;
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + atk);
  g.gain.setValueAtTime(vol, t + Math.max(atk, dur - r * .3)); g.gain.exponentialRampToValueAtTime(.0001, t + dur + r * .7);
  const oscs = detune ? [-detune, detune] : [0];
  oscs.forEach(d => {
    const o = ac.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = d;
    if (vib) { const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = 5.2; lg.gain.value = f * vib; l.connect(lg).connect(o.frequency); l.start(t); l.stop(t + dur + r + .1); }
    o.connect(fl); o.start(t); o.stop(t + dur + r + .1);
  });
  fl.connect(g).connect(bus || musicBus);
}
const INST = {
  pizz: (m, at, v = 1) => voice(m, at, { type: 'triangle', dur: .12, rel: .25, vol: .16 * v, cut: 2200 }),
  pbass: (m, at, v = 1) => voice(m, at, { type: 'triangle', dur: .18, rel: .3, vol: .28 * v, cut: 900 }),
  harp: (m, at, v = 1) => { voice(m, at, { type: 'sawtooth', dur: .05, rel: .45, vol: .05 * v, cut: 4200 }); voice(m + 12, at, { type: 'square', dur: .03, rel: .25, vol: .012 * v, cut: 6000 }); },
  str: (m, at, dur, v = 1) => voice(m, at, { type: 'sawtooth', dur, atk: .25, rel: .5, vol: .045 * v, cut: 1700, detune: 7, vib: .004 }),
  stab: (m, at, v = 1) => voice(m, at, { type: 'sawtooth', dur: .08, rel: .1, vol: .05 * v, cut: 2400, detune: 6 }),
  rhodes: (m, at, v = 1) => { voice(m, at, { type: 'sine', dur: .3, rel: 1.4, vol: .07 * v }); voice(m + 12, at, { type: 'sine', dur: .05, rel: .5, vol: .015 * v }); },
  wbass: (m, at, v = 1) => voice(m, at, { type: 'sine', dur: .3, rel: .25, vol: .3 * v, cut: 700 }),
  sax: (m, at, dur, v = 1) => voice(m, at, { type: 'sawtooth', dur, atk: .08, rel: .3, vol: .04 * v, bp: 1100, q: 1.6, vib: .006 }),
  pipe: (m, at, dur, v = 1) => { voice(m + 1, at, { type: 'sawtooth', dur: .04, rel: .03, vol: .03 * v, bp: 1500, q: 2 }); voice(m, at + .04, { type: 'sawtooth', dur, atk: .01, rel: .08, vol: .05 * v, bp: 1300, q: 2.2 }); },
  drone: (m, at, dur, v = 1) => voice(m, at, { type: 'sawtooth', dur, atk: .2, rel: .2, vol: .03 * v, cut: 700, detune: 4 }),
  oboe: (m, at, dur, v = 1) => voice(m, at, { type: 'square', dur, atk: .3, rel: .6, vol: .025 * v, bp: 1000, q: 1.2, vib: .003 }),
  hat: (at, v = 1) => noise(at, { dur: .04, vol: .03 * v, hp: 7000 }),
  thump: (at, v = 1) => { voice(36, at, { type: 'sine', dur: .1, rel: .15, vol: .35 * v, cut: 300 }); },
  beep: (at, v = 1) => voice(95, at, { type: 'square', dur: .07, rel: .02, vol: .03 * v, cut: 5000 })
};
let SECTIONS = [];
const sec = (t0, t1, beat, play, vol = 1) => SECTIONS.push({ t0, t1, beat, play, vol, next: 0 });
function scheduleMusic(tNow) {
  if (!ac || !soundOn) return;
  const horizon = tNow + .3;
  for (const s of SECTIONS) {
    if (s.t1 < tNow || s.t0 > horizon) continue;
    if (s.next * s.beat + s.t0 < tNow - .05) s.next = Math.ceil((tNow - s.t0) / s.beat);
    while (s.t0 + s.next * s.beat < Math.min(horizon, s.t1)) {
      const st = s.t0 + s.next * s.beat, lvl = musicLevel(st) * s.vol;
      if (st >= tNow - .02 && lvl > .03) s.play(s.next, ac.currentTime + (st - tNow), lvl);
      s.next++;
    }
  }
}
function resetMusic(t) { SECTIONS.forEach(s => { s.next = Math.max(0, Math.ceil((t - s.t0) / s.beat)); }); }

let SILENT = [];
function musicLevel(t) {
  for (const [a, b] of SILENT) { if (t >= a && t < b) return 0; if (t >= a - .5 && t < a) return (a - t) / .5; if (t >= b && t < b + 1.2) return (t - b) / 1.2; }
  return 1;
}
let SCORE = [];
