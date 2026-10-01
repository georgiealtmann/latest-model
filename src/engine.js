/* ===================== drawing engine ===================== */
const INK = '#2a211d';
const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round"`;
const s2 = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"`;
const s3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;

const GEO = { id: 'G', H: 432, skin: '#f0d2bf', hair: '#6b4a33', hairStyle: 'swept', beard: .2, glasses: 'dark',
  shirt: '#26324a', trousers: '#5f5e4e', shoes: '#4a2e1e', mouth: 'smile', button: '#4a5a78', dk: '#1b2436' };
const LUCA = { id: 'L', H: 368, broad: true, skin: '#e8bd9c', hair: '#4e3727', hairStyle: 'crop', beard: .34, glasses: 'silver',
  shirt: '#a9c3dd', trousers: '#c9ae80', shoes: '#3b2a20', mouth: 'flat', button: '#f4f1ea', dk: '#8fa9c4' };
const BOB = { id: 'B', H: 440, broad: true, skin: '#d9a582', hair: '#1d1714', hairStyle: 'crop', beard: .12, glasses: null,
  shirt: '#e9e2d3', trousers: '#2f3440', shoes: '#22252b', mouth: 'smile', button: '#f4f1ea', dk: '#c9c0ae' };
const rOf = o => o.H * .085;

const HAIR = {
  swept: (c, r) => `<g style="fill:${c}" ${s2}><path d="M${-r*.93} ${-r*.08} Q${-r*1.04} ${-r*1.0} ${-r*.62} ${-r*1.34} Q${-r*.2} ${-r*1.62} ${r*.3} ${-r*1.5} Q${r*.82} ${-r*1.42} ${r*.96} ${-r*.92} Q${r*1.02} ${-r*.5} ${r*.93} ${-r*.08} Q${r*.86} ${-r*.58} ${r*.5} ${-r*.66} Q${r*.08} ${-r*.56} ${-r*.3} ${-r*.7} Q${-r*.76} ${-r*.62} ${-r*.93} ${-r*.08}Z"/></g>
    <path d="M${-r*.62} ${-r*.95} Q${-r*.3} ${-r*1.38} ${r*.2} ${-r*1.28} M${-r*.2} ${-r*.9} Q${r*.15} ${-r*1.22} ${r*.62} ${-r*1.1} M${-r*.75} ${-r*.62} Q${-r*.6} ${-r*.95} ${-r*.3} ${-r*1.0}" style="fill:none;stroke:#3e2a1d;stroke-width:2.5;stroke-linecap:round;opacity:.6"/>`,
  crop: (c, r) => `<path d="M${-r*.92} ${-r*.15} Q${-r*1.02} ${-r*1.05} ${-r*.4} ${-r*1.2} Q${r*.22} ${-r*1.4} ${r*.78} ${-r*1.04} Q${r*1.0} ${-r*.78} ${r*.92} ${-r*.15} Q${r*.84} ${-r*.6} ${r*.52} ${-r*.72} Q${r*.12} ${-r*.6} ${-r*.24} ${-r*.75} Q${-r*.7} ${-r*.66} ${-r*.92} ${-r*.15}Z" style="fill:${c}" ${s2}/>
    <path d="M${-r*.45} ${-r*1.05} q${r*.3} ${-r*.2} ${r*.62} ${-r*.08} M${r*.1} ${-r*1.18} q${r*.3} ${-r*.08} ${r*.52} ${r*.12}" style="fill:none;stroke:#000;stroke-width:2;opacity:.35;stroke-linecap:round"/>`
};

function face(o, r) {
  const ex = r * .37, ey = -r * .02, er = r * .2, m = r * .56;
  const eye = x => `<ellipse cx="${x}" cy="${ey}" rx="${er}" ry="${er*.8}" style="fill:#fff" ${s2}/>`;
  const brow = (x, side) => `<g transform="translate(${x} ${ey - r*.37})"><g class="brow${side}" transform="translate(0 0) rotate(0)"><path d="M${-r*.21} ${r*.02} Q0 ${-r*.09} ${r*.21} ${r*.02}" style="fill:none;stroke:${o.hair};stroke-width:${r*.12};stroke-linecap:round"/></g></g>`;
  let glasses = '';
  if (o.glasses === 'dark') glasses = `
    <g style="fill:#ffffff14;stroke:#24150d;stroke-width:${r*.11}"><circle cx="${-ex}" cy="${ey}" r="${r*.3}"/><circle cx="${ex}" cy="${ey}" r="${r*.3}"/></g>
    <path d="M${-ex+r*.29} ${ey-r*.06} Q0 ${ey-r*.16} ${ex-r*.29} ${ey-r*.06} M${-ex-r*.3} ${ey-r*.06} L${-r*.88} ${ey-r*.12} M${ex+r*.3} ${ey-r*.06} L${r*.88} ${ey-r*.12}" style="fill:none;stroke:#24150d;stroke-width:${r*.09};stroke-linecap:round"/>`;
  if (o.glasses === 'silver') glasses = `
    <g style="fill:#ffffff18;stroke:#aeb7c0;stroke-width:${r*.045}"><circle cx="${-ex}" cy="${ey}" r="${r*.3}"/><circle cx="${ex}" cy="${ey}" r="${r*.3}"/></g>
    <path d="M${-ex+r*.3} ${ey-r*.1} Q0 ${ey-r*.18} ${ex-r*.3} ${ey-r*.1} M${-ex-r*.3} ${ey-r*.06} L${-r*.88} ${ey-r*.12} M${ex+r*.3} ${ey-r*.06} L${r*.88} ${ey-r*.12}" style="fill:none;stroke:#aeb7c0;stroke-width:${r*.045};stroke-linecap:round"/>`;
  const lw = r * .08;
  const mouths = {
    smile: `<path d="M${-r*.25} ${m} Q0 ${m + r*.2} ${r*.25} ${m}" style="fill:none;stroke:${INK};stroke-width:${lw};stroke-linecap:round"/>`,
    grin: `<path d="M${-r*.3} ${m - r*.02} Q0 ${m + r*.34} ${r*.3} ${m - r*.02} Z" style="fill:#fff;stroke:${INK};stroke-width:${lw*.8};stroke-linejoin:round"/>`,
    flat: `<path d="M${-r*.18} ${m + r*.07} L${r*.18} ${m + r*.07}" style="fill:none;stroke:${INK};stroke-width:${lw};stroke-linecap:round"/>`,
    smirk: `<path d="M${-r*.2} ${m + r*.09} Q${r*.05} ${m + r*.12} ${r*.25} ${m - r*.03}" style="fill:none;stroke:${INK};stroke-width:${lw};stroke-linecap:round"/>`,
    sheep: `<path d="M${-r*.22} ${m + r*.1} q${r*.11} ${-r*.08} ${r*.22} 0 q${r*.11} ${r*.08} ${r*.22} 0" style="fill:none;stroke:${INK};stroke-width:${lw};stroke-linecap:round"/>`,
    o: `<ellipse cx="0" cy="${m + r*.08}" rx="${r*.08}" ry="${r*.1}" style="fill:#5d2b2b;stroke:${INK};stroke-width:${lw*.7}"/>`,
    laugh: `<path d="M${-r*.27} ${m - r*.02} Q0 ${m + r*.4} ${r*.27} ${m - r*.02} Z" style="fill:#7a3434;stroke:${INK};stroke-width:${lw*.8};stroke-linejoin:round"/>`,
    open: `<ellipse cx="0" cy="${m + r*.1}" rx="${r*.15}" ry="${r*.13}" style="fill:#5d2b2b;stroke:${INK};stroke-width:${lw*.7}"/>`,
    chew: `<path d="M${-r*.16} ${m + r*.06} Q0 ${m + r*.14} ${r*.16} ${m + r*.06}" style="fill:none;stroke:${INK};stroke-width:${lw};stroke-linecap:round"/>`
  };
  const mouth = Object.entries(mouths).map(([k, d]) => `<g class="mth m-${k}" opacity="${k === o.mouth ? 1 : 0}">${d}</g>`).join('');
  return `
    <ellipse cx="${-r*.9}" cy="${r*.06}" rx="${r*.17}" ry="${r*.26}" style="fill:${o.skin}" ${s2}/>
    <ellipse cx="${r*.9}" cy="${r*.06}" rx="${r*.17}" ry="${r*.26}" style="fill:${o.skin}" ${s2}/>
    <ellipse cx="0" cy="0" rx="${r*.9}" ry="${r*1.03}" style="fill:${o.skin}" ${S}/>
    <path d="M${-r*.86} ${r*.18} Q${-r*.8} ${r*1.02} 0 ${r*1.03} Q${r*.8} ${r*1.02} ${r*.86} ${r*.18} Q${r*.6} ${r*.64} 0 ${r*.68} Q${-r*.6} ${r*.64} ${-r*.86} ${r*.18}Z" style="fill:${o.hair};opacity:${o.beard}"/>
    <path d="M${-r*.22} ${m - r*.06} Q0 ${m - r*.16} ${r*.22} ${m - r*.06}" style="fill:none;stroke:${o.hair};stroke-width:${r*.1};opacity:${o.beard};stroke-linecap:round"/>
    ${HAIR[o.hairStyle](o.hair, r)}
    ${eye(-ex)}${eye(ex)}
    <g class="pup" transform="translate(0 0)"><circle cx="${-ex}" cy="${ey}" r="${er*.5}" style="fill:${INK}"/><circle cx="${ex}" cy="${ey}" r="${er*.5}" style="fill:${INK}"/><circle cx="${-ex + er*.18}" cy="${ey - er*.2}" r="${er*.14}" style="fill:#fff"/><circle cx="${ex + er*.18}" cy="${ey - er*.2}" r="${er*.14}" style="fill:#fff"/></g>
    <g class="lids" opacity="0"><ellipse cx="${-ex}" cy="${ey}" rx="${er*1.1}" ry="${er*.92}" style="fill:${o.skin}"/><ellipse cx="${ex}" cy="${ey}" rx="${er*1.1}" ry="${er*.92}" style="fill:${o.skin}"/><path d="M${-ex-er} ${ey+er*.15} Q${-ex} ${ey+er*.45} ${-ex+er} ${ey+er*.15} M${ex-er} ${ey+er*.15} Q${ex} ${ey+er*.45} ${ex+er} ${ey+er*.15}" style="fill:none;stroke:${INK};stroke-width:2.5"/></g>
    <g class="half" opacity="0"><path d="M${-ex-er*1.1} ${ey} A${er*1.1} ${er*.95} 0 0 1 ${-ex+er*1.1} ${ey} Z M${ex-er*1.1} ${ey} A${er*1.1} ${er*.95} 0 0 1 ${ex+er*1.1} ${ey} Z" style="fill:${o.skin}"/><path d="M${-ex-er} ${ey} L${-ex+er} ${ey} M${ex-er} ${ey} L${ex+er} ${ey}" style="stroke:${INK};stroke-width:2.5"/></g>
    ${brow(-ex, 'L')}${brow(ex, 'R')}
    <path d="M${r*.03} ${r*.06} Q${r*.15} ${r*.32} ${-r*.04} ${r*.35}" style="fill:none;stroke:${INK};stroke-width:2.5;stroke-linecap:round;opacity:.55"/>
    <g class="blush" opacity="0"><ellipse cx="${-r*.5}" cy="${r*.35}" rx="${r*.16}" ry="${r*.08}" style="fill:#e8857a;opacity:.5"/><ellipse cx="${r*.5}" cy="${r*.35}" rx="${r*.16}" ry="${r*.08}" style="fill:#e8857a;opacity:.5"/></g>
    ${o.drool ? `<g class="drool" opacity="0"><g transform="translate(${r*.2} ${m + r*.04}) scale(1.8) translate(${-r*.2} ${-(m + r*.04)})"><path d="M${r*.2} ${m + r*.04} C${r*.24} ${m + r*.2} ${r*.17} ${m + r*.32} ${r*.21} ${m + r*.48}" style="fill:none;stroke:#9fd3ee;stroke-width:${r*.06};stroke-linecap:round"/><circle cx="${r*.21}" cy="${m + r*.53}" r="${r*.08}" style="fill:#bfe3f5;stroke:#5a9cc0;stroke-width:${r*.025}"/><circle cx="${r*.18}" cy="${m + r*.5}" r="${r*.025}" style="fill:#fff"/></g></g>` : ''}
    ${mouth}${glasses}`;
}

/* A person, feet at (0,0). Parts that animate are <g class=…> with transform="rotate(0)". */
function person(o) {
  const H = o.H, r = rOf(o);
  const hc = -H + r * 1.25, sh = hc + r * 1.62, hip = -H * .47;
  const sw = r * (o.broad ? 1.95 : 1.62), hw = r * 1.3, aw = r * .56, up = H * .175, fo = H * .165;
  const legW = r * .66, legLen = -hip - r * .3;
  const sleeveF = o.rolled ? o.skin : o.shirt;
  const leg = side => {
    const x = side === 'L' ? -hw + 3 + legW / 2 : hw - 3 - legW / 2;
    return `<g transform="translate(${x} ${hip - 4})"><g class="leg${side}" transform="translate(0 0) rotate(0)"><rect x="${-legW/2}" y="0" width="${legW}" height="${legLen}" rx="${legW*.4}" style="fill:${o.trousers}" ${S}/><ellipse cx="${side === 'L' ? -legW*.12 : legW*.12}" cy="${legLen}" rx="${legW*.85}" ry="${r*.28}" style="fill:${o.shoes}" ${S}/></g></g>`;
  };
  const torso = `M${-sw} ${sh + r*.45} Q${-sw} ${sh} ${-sw + r*.55} ${sh} L${sw - r*.55} ${sh} Q${sw} ${sh} ${sw} ${sh + r*.45} L${hw + 2} ${hip + r*.3} Q${hw} ${hip + r*.5} ${hw - r*.3} ${hip + r*.5} L${-hw + r*.3} ${hip + r*.5} Q${-hw} ${hip + r*.5} ${-hw - 2} ${hip + r*.3} Z`;
  const collar = `<path d="M${-r*.34} ${sh - 2} L0 ${sh + r*.5} L${r*.34} ${sh - 2} Z" style="fill:${o.skin}" ${s2}/>
    <path d="M${-r*.38} ${sh - 4} L${-r*.62} ${sh + r*.42} L${-r*.04} ${sh + r*.52} Z M${r*.38} ${sh - 4} L${r*.62} ${sh + r*.42} L${r*.04} ${sh + r*.52} Z" style="fill:${o.shirt}" ${s2}/>`;
  const placket = `<path d="M0 ${sh + r*.55} L0 ${hip + r*.4}" style="stroke:${o.dk};stroke-width:3"/>${[1.1, 1.9, 2.7].map(k => `<circle cx="${r*.12}" cy="${sh + r*k}" r="${r*.07}" style="fill:${o.button}"/>`).join('')}${o.id === 'G' ? `<rect x="${r*.25}" y="${sh + r*.9}" width="${r*.6}" height="${r*.55}" rx="2" style="fill:none;stroke:${o.dk};stroke-width:2.5"/>` : ''}`;
  const belt = `<rect x="${-hw - 1}" y="${hip + r*.18}" width="${hw*2 + 2}" height="${r*.22}" style="fill:#3a2a20"/>`;
  const towel = o.towel ? `<path d="M${sw*.2} ${sh - 4} L${sw*.95} ${sh + 2} L${sw*.9} ${sh + r*1.8} L${sw*.45} ${sh + r*1.7} Z" style="fill:#f3ead8" ${s2}/><path d="M${sw*.5} ${sh + r*.4} L${sw*.88} ${sh + r*.45} M${sw*.48} ${sh + r*.7} L${sw*.88} ${sh + r*.75}" style="stroke:#7b2d2d;stroke-width:3"/>` : '';
  const coat = `<g class="coat" opacity="0">
      <path d="M${-sw - 5} ${sh + r*.45} Q${-sw - 5} ${sh - 4} ${-sw + r*.55} ${sh - 4} L${sw - r*.55} ${sh - 4} Q${sw + 5} ${sh - 4} ${sw + 5} ${sh + r*.45} L${sw + r*.3} ${-H*.17} L${-sw - r*.3} ${-H*.17} Z" style="fill:#fbf9f4" ${S}/>
      <path d="M${-r*.5} ${sh} L${-r*.12} ${-H*.36} L${-r*.12} ${-H*.17} M${r*.5} ${sh} L${r*.12} ${-H*.36} L${r*.12} ${-H*.17}" style="fill:none;stroke:${INK};stroke-width:3"/>
      <rect x="${sw*.3}" y="${sh + r*1.2}" width="${r*.6}" height="${r*.5}" rx="3" style="fill:#fbf9f4" ${s2}/><rect x="${sw*.3 + r*.12}" y="${sh + r*.95}" width="${r*.08}" height="${r*.5}" style="fill:#2c3e5c"/>
      <rect x="${-sw*.75}" y="${sh + r*.9}" width="${r*.5}" height="${r*.16}" rx="3" style="fill:#2c3e5c"/></g>`;
  const arm = side => {
    const x = side === 'L' ? -sw + aw * .45 : sw - aw * .45;
    const prop = side === 'R' ? (o.handR || '') : (o.handL || '');
    return `<g transform="translate(${x} ${sh + r*.25})"><g class="arm${side}" transform="rotate(0)">
      <rect x="${-aw/2}" y="0" width="${aw}" height="${up}" rx="${aw/2}" style="fill:${o.shirt}" ${S}/>
      <rect class="cS" opacity="0" x="${-aw/2 - 3}" y="-3" width="${aw + 6}" height="${up + 3}" rx="${aw/2}" style="fill:#fbf9f4" ${S}/>
      <g transform="translate(0 ${up - aw*.35})"><g class="fore${side}" transform="rotate(0)">
        <rect x="${-aw/2}" y="0" width="${aw}" height="${fo}" rx="${aw/2}" style="fill:${sleeveF}" ${S}/>
        ${o.rolled ? `<rect x="${-aw/2 - 1}" y="0" width="${aw + 2}" height="${aw*.7}" rx="${aw*.3}" style="fill:${o.shirt}" ${S}/>` : ''}
        <rect class="cS" opacity="0" x="${-aw/2 - 3}" y="0" width="${aw + 6}" height="${fo*.82}" rx="${aw/2}" style="fill:#fbf9f4" ${S}/>
        <g class="hand${side}"><circle cx="0" cy="${fo}" r="${aw*.62}" style="fill:${o.skin}" ${S}/></g>${prop}
      </g></g></g></g>`;
  };
  return `${o.seated ? '' : leg('L') + leg('R')}
    <rect x="${-r*.33}" y="${hc + r*.7}" width="${r*.66}" height="${sh - hc - r*.4}" style="fill:${o.skin}" ${s2}/>
    <path d="${torso}" style="fill:${o.shirt}" ${S}/>${collar}${placket}${belt}${towel}${coat}
    <g transform="translate(0 ${hc + r})"><g class="head" transform="rotate(0)"><g transform="translate(0 ${-r})">${face(o, r)}</g></g></g>
    ${arm('L')}${arm('R')}`;
}
/* forearm length helper for props held in a hand (hand centre is at (0, fo) in forearm space) */
const FO = o => o.H * .165;

function char(id, o, x, y, extra = {}, scale = 1) {
  return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${scale} ${scale})"><g class="lean" transform="rotate(0)">${person({ ...o, ...extra })}</g></g></g>`;
}
/* just a head (for windows, inserts) */
function headOnly(id, o, x, y, scale = 1, extra = {}) {
  const r = rOf(o);
  return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${scale} ${scale})"><g class="head" transform="rotate(0)">${face({ ...o, ...extra }, r)}</g></g></g>`;
}
/* head + shoulders bust for close inserts */
function bust(id, o, x, y, scale = 1, extra = {}) {
  const r = rOf(o), p = { ...o, ...extra };
  return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${scale} ${scale})">
    <rect x="${-r*.33}" y="${r*.6}" width="${r*.66}" height="${r*1.1}" style="fill:${p.skin}" ${s2}/>
    <path d="M${-r*2.1} ${r*3.6} Q${-r*2.1} ${r*1.55} ${-r*1.2} ${r*1.5} L${r*1.2} ${r*1.5} Q${r*2.1} ${r*1.55} ${r*2.1} ${r*3.6} Z" style="fill:${p.shirt}" ${s2}/>
    <path d="M${-r*.34} ${r*1.48} L0 ${r*1.95} L${r*.34} ${r*1.48} Z" style="fill:${p.skin}" ${s2}/>
    <path d="M${-r*.38} ${r*1.46} L${-r*.6} ${r*1.9} L${-r*.04} ${r*1.98} Z M${r*.38} ${r*1.46} L${r*.6} ${r*1.9} L${r*.04} ${r*1.98} Z" style="fill:${p.shirt}" ${s2}/>
    <g class="head" transform="rotate(0)">${face(p, r)}</g></g></g>`;
}

/* ===================== props ===================== */
const PROP = {
  clipboard: (fo, open = true) => `<g class="pClip" opacity="0" transform="translate(-4 ${fo - 8}) rotate(-10) scale(1 1)"><rect x="-40" y="-8" width="80" height="102" rx="5" style="fill:#9a6b3f" ${s2}/><rect x="-33" y="4" width="66" height="84" style="fill:#f7f2e6"/><rect x="-15" y="-14" width="30" height="12" rx="3" style="fill:#aeb6bd" ${s2}/><path class="pcl1" d="M-24 22 h44" style="stroke:#2c3e5c;stroke-width:3" opacity="0"/><path class="pcl2" d="M-24 36 h38" style="stroke:#2c3e5c;stroke-width:3" opacity="0"/><path class="pcl3" d="M-24 50 h34" style="stroke:#2c3e5c;stroke-width:3" opacity="0"/></g>`,
  pen: fo => `<g class="pPen" opacity="0" transform="translate(4 ${fo - 4}) rotate(30)"><rect x="-4" y="-46" width="8" height="46" rx="3" style="fill:#2c3e5c" ${s2}/><path d="M-4 0 L0 9 L4 0Z" style="fill:#d9b77e"/></g>`,
  tissue: fo => `<g class="pTissue" opacity="0" transform="translate(0 ${fo + 6}) scale(1)"><path d="M-16 -6 Q-10 -20 0 -14 Q10 -22 16 -8 Q18 8 4 12 Q-12 14 -16 -6Z" style="fill:#fff" ${s2}/></g>`,
  phone: fo => `<g class="pPhone" opacity="0" transform="translate(6 ${fo - 22}) rotate(-8)"><rect x="-14" y="-26" width="28" height="50" rx="5" style="fill:#1b1d22" ${s2}/><rect class="pPhoneScr" x="-11" y="-22" width="22" height="40" rx="3" style="fill:#3a4d6e"/></g>`,
  map: fo => `<g class="pMap" opacity="0" transform="translate(0 ${fo - 30})"><path d="M-60 -40 L-20 -50 L20 -40 L60 -50 L60 30 L20 40 L-20 30 L-60 40Z" style="fill:#efe4c4" ${s2}/><path d="M-20 -50 L-20 30 M20 -40 L20 40" style="stroke:#b9a27a;stroke-width:2"/><path d="M-44 20 Q-20 -10 10 -6 Q30 -4 40 -26" style="fill:none;stroke:#c84a3a;stroke-width:4;stroke-dasharray:7 5"/><path d="M30 -24 L40 -40 L50 -24Z" style="fill:#7d8f6a"/><text x="0" y="34" text-anchor="middle" style="font:700 9px var(--ui);fill:#7b2d2d">ARTHUR'S SEAT</text></g>`,
  vase: fo => `<g class="pVase" opacity="0" transform="translate(-34 ${fo - 30}) scale(1.7)"><path d="M-9 -26 L9 -26 L7 -20 Q16 -10 13 4 Q10 12 0 12 Q-10 12 -13 4 Q-16 -10 -7 -20Z" style="fill:#5b84a8" ${s2}/><path d="M-11 -4 Q0 2 11 -4" style="fill:none;stroke:#f3ead8;stroke-width:2.5"/></g>`,
  spoon: fo => `<g class="pSpoon" opacity="0" transform="translate(0 ${fo})"><rect x="-4" y="0" width="8" height="70" rx="3" style="fill:#a27b45" ${s2}/><ellipse cx="0" cy="76" rx="10" ry="13" style="fill:#a27b45" ${s2}/></g>`
};

/* stickers: cartoon versions (deliberately not the original photos) */
function stickerStraw(id, x, y, s = 1) {
  return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${s})">
    <path d="M-92 -10 Q-96 -100 -10 -104 Q86 -104 92 -16 Q100 78 0 92 Q-96 90 -92 -10Z" style="fill:#fff;stroke:#d9d4ca;stroke-width:3"/>
    <ellipse cx="0" cy="-6" rx="70" ry="72" style="fill:#8a5a3c" ${s2}/>
    <path d="M-62 -36 Q-50 -86 0 -84 Q52 -86 62 -34 Q40 -60 0 -58 Q-40 -60 -62 -36Z" style="fill:#2a1b14" ${s2}/>
    ${[-50, -30, -10, 10, 30, 50].map((cx, i) => `<circle cx="${cx}" cy="${-74 + (i % 2) * 6}" r="11" style="fill:#2a1b14"/>`).join('')}
    <ellipse cx="-24" cy="-14" rx="13" ry="9" style="fill:#fff" ${s2}/><ellipse cx="24" cy="-14" rx="13" ry="9" style="fill:#fff" ${s2}/>
    <circle class="sPup" cx="-31" cy="-13" r="6" style="fill:${INK}"/><circle class="sPup" cx="17" cy="-13" r="6" style="fill:${INK}"/>
    <path d="M-38 -24 L-10 -22 M10 -22 L38 -26" style="stroke:#2a1b14;stroke-width:5;stroke-linecap:round"/>
    <path d="M-38 -16 L-10 -16 M10 -16 L38 -16" style="stroke:#8a5a3c;stroke-width:7" opacity=".9"/>
    <path d="M-8 12 Q0 18 8 12" style="fill:none;stroke:#5a3a28;stroke-width:3"/>
    <rect x="-2" y="18" width="10" height="60" rx="3" transform="rotate(-8 3 48)" style="fill:#ff6f9c" ${s2}/>
    <path d="M-34 44 L40 44 L32 100 L-26 100Z" style="fill:#f3ead8" ${s2}/><path d="M-30 62 L36 62" style="stroke:#c9b48a;stroke-width:6"/>
    <ellipse cx="0" cy="30" rx="12" ry="8" style="fill:#c9806a" ${s2}/>
  </g></g>`;
}
function stickerHand(id, x, y, s = 1) {
  return `<g id="${id}" transform="translate(${x} ${y})"><g class="sc" transform="scale(${s})">
    <path d="M-92 -10 Q-96 -110 -10 -112 Q86 -110 92 -16 Q100 78 0 92 Q-96 90 -92 -10Z" style="fill:#fff;stroke:#d9d4ca;stroke-width:3"/>
    <ellipse cx="-10" cy="10" rx="62" ry="64" style="fill:#e3b08f" ${s2}/>
    <path d="M-70 -16 Q-60 -64 -10 -62 Q40 -64 52 -16 Q30 -40 -10 -40 Q-50 -40 -70 -16Z" style="fill:#c79a5a" ${s2}/>
    <circle cx="-30" cy="4" r="7" style="fill:${INK}"/><circle cx="10" cy="4" r="7" style="fill:${INK}"/>
    <path d="M-26 34 Q-10 46 6 34" style="fill:none;stroke:${INK};stroke-width:4;stroke-linecap:round"/>
    <rect x="44" y="-96" width="26" height="80" rx="12" style="fill:#e3b08f" ${s2}/>
    <path d="M40 -96 Q42 -118 50 -112 M52 -102 Q54 -124 60 -116 M62 -100 Q66 -120 72 -110" style="fill:none;stroke:${INK};stroke-width:3;stroke-linecap:round"/>
  </g></g>`;
}

/* the Golf, facing left; identical everywhere */
function golf(id, driverExtra = '') {
  const R = 52, wheel = cx => `<g class="wheel" transform="rotate(0 ${cx} -45)"><circle cx="${cx}" cy="-45" r="${R}" style="fill:#25262b" ${S}/><circle cx="${cx}" cy="-45" r="${R*.55}" style="fill:#c9ced3" ${s2}/>${[0, 72, 144, 216, 288].map(a => `<line x1="${cx}" y1="-45" x2="${cx + Math.cos(a*Math.PI/180)*R*.5}" y2="${-45 + Math.sin(a*Math.PI/180)*R*.5}" style="stroke:#7d858c;stroke-width:5"/>`).join('')}<circle cx="${cx}" cy="-45" r="7" style="fill:#7d858c"/></g>`;
  return `<g id="${id}" transform="translate(0 0)"><g class="body" transform="translate(0 0)">
    <ellipse cx="0" cy="8" rx="310" ry="16" style="fill:#00000033"/>
    <path d="M-300 -62 Q-306 -112 -268 -120 L-172 -134 L-96 -232 Q-86 -244 -62 -244 L186 -244 Q222 -244 238 -218 L286 -134 Q302 -124 302 -98 L302 -62 Q302 -44 284 -44 L-284 -44 Q-300 -44 -300 -62 Z" style="fill:#5f7f9e" ${S}/>
    <path d="M-296 -80 L298 -80" style="stroke:#4e6b86;stroke-width:6"/>
    <path d="M-160 -138 L-88 -226 L36 -226 L36 -138 Z" style="fill:#2f3a44" ${s2}/>
    <g class="driver" opacity="0">${headOnly(id + 'D', LUCA, -50, -178, 1)}${driverExtra}</g>
    <path d="M58 -138 L58 -226 L182 -226 Q202 -226 212 -206 L246 -138 Z" style="fill:#bcd3e0" ${s2}/>
    <path d="M58 -138 L58 -226 L120 -226 L80 -138 Z" style="fill:#ffffff40"/>
    <rect x="36" y="-232" width="22" height="100" style="fill:#5f7f9e" ${s2}/>
    <g class="mirror" transform="rotate(0 -20 -206)"><rect x="-34" y="-214" width="28" height="12" rx="4" style="fill:#3a3d44"/></g>
    <path d="M-170 -134 L-170 -50 M44 -134 L44 -50" style="stroke:#4e6b86;stroke-width:4"/>
    <rect x="-60" y="-118" width="34" height="9" rx="4" style="fill:#3f566c"/><rect x="140" y="-118" width="34" height="9" rx="4" style="fill:#3f566c"/>
    <path d="M-298 -104 Q-286 -122 -262 -118 L-262 -98 Z" style="fill:#fff6d6" ${s2}/>
    <rect x="290" y="-126" width="12" height="40" rx="3" style="fill:#c84a3a" ${s2}/>
    <rect x="-306" y="-66" width="38" height="18" rx="6" style="fill:#3a3d44"/><rect x="270" y="-66" width="36" height="18" rx="6" style="fill:#3a3d44"/>
    <rect x="-24" y="-60" width="56" height="14" rx="3" style="fill:#f3ead8" ${s2}/>
    </g>${wheel(-190)}${wheel(190)}</g>`;
}

/* phone UI for close inserts. returns markup; messages are added with chatMsg() */
function phoneUI(id, x, y, title, w = 520, h = 900) {
  return `<g id="${id}" data-w="${w}" data-h="${h}" transform="translate(${x} ${y})"><clipPath id="clip${id}"><rect x="${-w/2 + 22}" y="${-h/2 + 120}" width="${w - 44}" height="${h - 142}" rx="20"/></clipPath>
    <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="60" style="fill:#16181c" ${S}/>
    <rect x="${-w/2 + 22}" y="${-h/2 + 22}" width="${w - 44}" height="${h - 44}" rx="42" style="fill:#f4f1ea"/>
    <rect x="${-w/2 + 22}" y="${-h/2 + 22}" width="${w - 44}" height="96" rx="42" style="fill:#e7e2d8"/>
    <rect x="${-w/2 + 22}" y="${-h/2 + 80}" width="${w - 44}" height="38" style="fill:#e7e2d8"/>
    <rect x="-60" y="${-h/2 + 34}" width="120" height="20" rx="10" style="fill:#16181c"/>
    <text x="0" y="${-h/2 + 104}" text-anchor="middle" style="font:700 ${w > 600 ? 40 : 34}px var(--ui);fill:#2a211d">${title}</text>
    <g clip-path="url(#clip${id})"><g class="msgs" transform="translate(0 0)"></g></g>
  </g>`;
}
