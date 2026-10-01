/* ===================== set dressing helpers ===================== */
let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const BOOKC = ['#2c3e5c', '#5b6f4f', '#7b2d2d', '#a27b45', '#3d2f28', '#6b4a5a', '#8a3a2a', '#c9b48a', '#1f2a3a', '#4f6a72'];
function shelfRow(x, y, w, h) {
  let out = '', cx = x + 4;
  while (cx < x + w - 14) {
    const bw = 12 + rnd() * 14, bh = h * (.7 + rnd() * .28), c = BOOKC[Math.floor(rnd() * BOOKC.length)];
    out += `<rect x="${cx}" y="${y + h - bh}" width="${bw}" height="${bh}" rx="2" style="fill:${c}" ${s2}/>`;
    if (bw > 18) out += `<path d="M${cx + 3} ${y + h - bh + 10} h${bw - 6} M${cx + 3} ${y + h - 14} h${bw - 6}" style="stroke:#d9b77e;stroke-width:2;opacity:.7"/>`;
    cx += bw + 1;
  }
  return out;
}
const grainDef = `<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .25  0 0 0 .07 0"/></filter>
  <pattern id="lead" width="34" height="48" patternUnits="userSpaceOnUse"><path d="M0 24 L17 0 L34 24 L17 48Z" style="fill:none;stroke:#4a4a4a;stroke-width:2;opacity:.55"/></pattern>
  <pattern id="chk" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" style="fill:#f3ead8"/><rect width="20" height="20" style="fill:#2c3e5c"/><rect x="20" y="20" width="20" height="20" style="fill:#2c3e5c"/></pattern>
  <pattern id="tiles" width="60" height="40" patternUnits="userSpaceOnUse"><rect width="60" height="40" style="fill:#e9efe9"/><path d="M0 0 H60 M0 0 V40" style="stroke:#c9d2cc;stroke-width:3"/></pattern>
  <pattern id="brick" width="80" height="40" patternUnits="userSpaceOnUse"><rect width="80" height="40" style="fill:#a5583c"/><path d="M0 0 H80 M0 20 H80 M20 0 V20 M60 20 V40" style="stroke:#c98b6a;stroke-width:3"/></pattern>
  <pattern id="ashlar" width="120" height="44" patternUnits="userSpaceOnUse"><rect width="120" height="44" style="fill:#d8b47c"/><path d="M0 0 H120 M0 22 H120 M30 0 V22 M90 22 V44" style="stroke:#c49d64;stroke-width:2.5"/></pattern>
  <pattern id="setts" width="50" height="26" patternUnits="userSpaceOnUse"><rect width="50" height="26" style="fill:#8b8f8a"/><path d="M0 0 H50 M0 13 H50 M12 0 V13 M37 13 V26" style="stroke:#6f736e;stroke-width:3"/></pattern>`;
const grain = `<rect width="1920" height="1080" filter="url(#grain)" pointer-events="none"/>`;
function gothicWin(x, y, w, h, inner, stone = '#cdb48a') {
  const arch = `M${x} ${y + h} L${x} ${y + w * .55} Q${x} ${y} ${x + w / 2} ${y - w * .15} Q${x + w} ${y} ${x + w} ${y + w * .55} L${x + w} ${y + h} Z`;
  const id = 'gw' + Math.round(x) + '_' + Math.round(y) + '_' + Math.round(rnd() * 1e5);
  return `<clipPath id="${id}"><path d="${arch}"/></clipPath>
    <g clip-path="url(#${id})">${inner || `<rect x="${x}" y="${y - w}" width="${w}" height="${h + w}" style="fill:#36486a"/><path d="M${x} ${y + h} L${x + w} ${y}" style="stroke:#ffffff22;stroke-width:${w*.25}"/>`}<rect x="${x}" y="${y - w}" width="${w}" height="${h + w}" style="fill:url(#lead)"/></g>
    <path d="M${x + w / 2} ${y - w * .1} L${x + w / 2} ${y + h} M${x} ${y + h * .55} L${x + w} ${y + h * .55}" style="stroke:${stone};stroke-width:${Math.max(6, w * .07)}"/>
    <path d="${arch}" style="fill:none;stroke:${INK};stroke-width:4"/><path d="${arch}" transform="translate(0 0)" style="fill:none;stroke:${stone};stroke-width:10;opacity:.0"/>`;
}
const spires = (dx, dy, c, sc = 1) => `<g transform="translate(${dx} ${dy}) scale(${sc})" style="fill:${c}">
    <path d="M0 300 L0 200 L40 200 L40 160 L60 60 L80 160 L80 200 L130 200 L130 300 Z"/>
    <path d="M150 300 L150 210 Q150 120 240 110 Q330 120 330 210 L330 300 Z"/><rect x="230" y="70" width="20" height="44"/><circle cx="240" cy="66" r="9"/>
    <path d="M360 300 L360 180 L380 180 L395 40 L410 180 L430 180 L430 300 Z"/>
    <path d="M460 300 L460 220 L560 220 L560 300 Z"/><path d="M480 220 L510 140 L540 220Z"/></g>`;
/* Radcliffe Camera: drum, columns, dome, lantern */
const radcam = (x, y, s = 1, c = '#d9b77e') => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-200" y="-150" width="400" height="150" style="fill:${c}" ${S}/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${-186 + i * 46}" y="-146" width="14" height="142" style="fill:#e8cfa0" ${s2}/>`).join('')}
    <rect x="-210" y="-170" width="420" height="24" style="fill:#c9a46a" ${S}/>
    <rect x="-170" y="-230" width="340" height="62" style="fill:${c}" ${S}/>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${-160 + i * 44}" y="-226" width="10" height="54" style="fill:#e8cfa0"/>`).join('')}
    <path d="M-176 -230 Q-176 -420 0 -430 Q176 -420 176 -230 Z" style="fill:#8f9a8a" ${S}/>
    ${[-120, -60, 0, 60, 120].map(k => `<path d="M${k * .95} -232 Q${k * .7} -380 0 -428" style="fill:none;stroke:#6f7a6a;stroke-width:5"/>`).join('')}
    <rect x="-34" y="-490" width="68" height="64" style="fill:${c}" ${S}/><path d="M-40 -490 Q0 -540 40 -490Z" style="fill:#8f9a8a" ${S}/><rect x="-4" y="-560" width="8" height="40" style="fill:#c9a46a"/></g>`;
/* Arthur's Seat silhouette with Salisbury Crags */
const arthursSeat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-520 0 L-430 -60 L-330 -90 L-260 -100 L-200 -140 L-120 -150 L-60 -230 L-10 -300 L30 -290 L60 -240 L110 -200 L170 -190 L260 -130 L360 -100 L470 -40 L540 0 Z" style="fill:#7d8f6a" ${S}/>
    <path d="M-330 -90 L-260 -100 L-250 -70 L-320 -64Z M-200 -140 L-120 -150 L-110 -118 L-190 -112Z" style="fill:#a29a86"/>
    <path d="M-60 -230 L-10 -300 L30 -290 L20 -260 L-30 -232Z" style="fill:#8e8a78"/>
    <path d="M-400 -40 Q-200 -70 0 -60 Q200 -50 420 -30" style="fill:none;stroke:#6b7c5a;stroke-width:4;opacity:.6"/>
    <path d="M-120 -150 Q-60 -170 -20 -250" style="fill:none;stroke:#e6dcc0;stroke-width:4;stroke-dasharray:8 8;opacity:.8"/></g>`;
/* Edinburgh old-town rooftops with chimneys */
const edRoofs = (x, y, w, c = '#6f6a62') => `<g transform="translate(${x} ${y})">${Array.from({ length: Math.ceil(w / 90) }, (_, i) => { const h = 70 + (i * 37) % 80; return `<rect x="${i * 90}" y="${-h}" width="92" height="${h + 200}" style="fill:${i % 2 ? c : '#7a746b'}" ${s2}/><path d="M${i * 90} ${-h} L${i * 90 + 46} ${-h - 40} L${i * 90 + 92} ${-h}Z" style="fill:#4f5560" ${s2}/><rect x="${i * 90 + 60}" y="${-h - 50}" width="16" height="34" style="fill:#8a6a56" ${s2}/>${[0, 1].map(k => `<rect x="${i * 90 + 14 + k * 38}" y="${-h + 24}" width="22" height="30" style="fill:${(i + k) % 3 ? '#e9c77a' : '#3a4152'}" ${s2}/>`).join('')}`; }).join('')}</g>`;
/* Atomium */
const atomium = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${[[-70, -150, 70, -10], [-70, -150, 0, -80], [70, -10, 0, -80], [-70, -10, 70, -150], [0, -220, 0, -80], [0, -80, 0, 60], [-70, -150, 0, -220], [70, -150, 0, -220], [-70, -10, 0, 60], [70, -10, 0, 60]].map(l => `<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" style="stroke:#9aa3ab;stroke-width:9"/>`).join('')}
    ${[[0, -220], [-70, -150], [70, -150], [0, -80], [-70, -10], [70, -10], [0, 60]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="24" style="fill:#c9d1d8" ${s2}/><circle cx="${p[0] - 7}" cy="${p[1] - 7}" r="7" style="fill:#fff;opacity:.7"/>`).join('')}
    <path d="M-30 60 L-50 160 M30 60 L50 160" style="stroke:#9aa3ab;stroke-width:9"/></g>`;
/* Brussels Grand-Place style gables */
const gables = (x, y) => `<g transform="translate(${x} ${y})">${[['#c9a24a', 120], ['#8a5a3c', 140], ['#d9c8a4', 110], ['#6b4a3a', 130]].map((g, i) => { const gx = i * 120; return `<path d="M${gx} 0 L${gx} -${g[1]} L${gx + 20} -${g[1]} L${gx + 20} -${g[1] + 20} L${gx + 40} -${g[1] + 20} L${gx + 40} -${g[1] + 50} L${gx + 60} -${g[1] + 70} L${gx + 80} -${g[1] + 50} L${gx + 80} -${g[1] + 20} L${gx + 100} -${g[1] + 20} L${gx + 100} -${g[1]} L${gx + 120} -${g[1]} L${gx + 120} 0Z" style="fill:${g[0]}" ${s2}/>${[0, 1].map(r => `<rect x="${gx + 22}" y="${-g[1] + 20 + r * 50}" width="24" height="34" style="fill:#3a4152" ${s2}/><rect x="${gx + 74}" y="${-g[1] + 20 + r * 50}" width="24" height="34" style="fill:#3a4152" ${s2}/>`).join('')}`; }).join('')}</g>`;
const bike = (x, y) => `<g transform="translate(${x} ${y})" style="fill:none;stroke:#2a2d33;stroke-width:6"><circle cx="-60" cy="-40" r="40"/><circle cx="60" cy="-40" r="40"/><path d="M-60 -40 L-10 -100 L40 -100 L60 -40 M-10 -100 L0 -40 L40 -100 M-20 -116 L4 -116 M40 -100 L36 -124 L56 -128"/><circle cx="0" cy="-40" r="6" style="fill:#2a2d33"/><path d="M-80 -100 L-50 -96" style="stroke:#7b2d2d;stroke-width:10"/></g>`;
const lamp = (x, y, h = 300) => `<g transform="translate(${x} ${y})"><rect x="-6" y="${-h}" width="12" height="${h}" style="fill:#2a2d33"/><path d="M-24 ${-h} L24 ${-h} L15 ${-h - 52} L-15 ${-h - 52}Z" style="fill:#f3e2b0" ${s2}/><path d="M-28 ${-h - 52} L28 ${-h - 52} L0 ${-h - 76}Z" style="fill:#2a2d33"/><rect x="-14" y="-20" width="28" height="20" style="fill:#2a2d33"/></g>`;
const plant = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 0 L-30 -80 L30 -80 L40 0Z" style="fill:#b8875a" ${S}/>${[-60, -30, 0, 30, 60].map((a, i) => `<path d="M0 -80 Q${a * 1.2} ${-170 - (i % 2) * 40} ${a * 2} ${-150 - (i % 3) * 30}" style="fill:none;stroke:#5b6f4f;stroke-width:14;stroke-linecap:round"/>`).join('')}</g>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" style="fill:#fff;opacity:.85"><ellipse cx="0" cy="0" rx="110" ry="26"/><ellipse cx="50" cy="-18" rx="60" ry="26"/><ellipse cx="-40" cy="-10" rx="50" ry="20"/></g>`;
function bookcase(x, y, w, h, rows) {
  const rh = (h - 30) / rows;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:#5a3e28" ${S}/><rect x="${x - 12}" y="${y - 22}" width="${w + 24}" height="26" style="fill:#6b4a30" ${S}/>`;
  for (let i = 0; i < rows; i++) {
    const ry = y + 14 + i * rh;
    out += `<rect x="${x + 12}" y="${ry}" width="${w - 24}" height="${rh - 12}" style="fill:#3b2819"/>` + shelfRow(x + 14, ry + 4, w - 28, rh - 18) + `<rect x="${x + 8}" y="${ry + rh - 14}" width="${w - 16}" height="10" style="fill:#6b4a30" ${s2}/>`;
  }
  return out;
}
const sashWin = (x, y, w, h, inner) => { const id = 'sw' + x + '_' + y; return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><rect x="${x - 16}" y="${y - 16}" width="${w + 32}" height="${h + 32}" style="fill:#f3ead8" ${S}/><g clip-path="url(#${id})">${inner}</g><path d="M${x} ${y + h / 2} H${x + w} M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 4} H${x + w} M${x} ${y + h * .75} H${x + w}" style="stroke:#f3ead8;stroke-width:9"/><rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:none" ${S}/><rect x="${x - 26}" y="${y + h + 10}" width="${w + 52}" height="20" style="fill:#f3ead8" ${S}/>`; };
const cam = inner => `<g class="cam" transform="translate(0 0) scale(1)">${inner}</g>`;

/* ===================== SET A · quiet residential street (neutral) ===================== */
const houseRow = () => {
  const cols = ['#efe2c8', '#dfe6d6', '#e9d6c8', '#e6e0d0', '#d9e2e6', '#efe2c8', '#dfe6d6'];
  const doors = ['#2c3e5c', '#5b6f4f', '#7b2d2d', '#2f5a43', '#1f2a3a', '#7b2d2d', '#2c3e5c'];
  return Array.from({ length: 7 }, (_, i) => { const x = -420 + i * 420; return `
    <rect x="${x}" y="120" width="420" height="520" style="fill:${cols[i]}" ${S}/>
    <path d="M${x - 10} 120 L${x + 210} 40 L${x + 430} 120 Z" style="fill:#6f6a62" ${S}/>
    <rect x="${x + 300}" y="40" width="36" height="70" style="fill:#a5583c" ${s2}/>
    ${[0, 1].map(r => [0, 1].map(c => `<rect x="${x + 50 + c * 210}" y="${170 + r * 190}" width="110" height="130" style="fill:#f3ead8" ${s3}/><rect x="${x + 58 + c * 210}" y="${178 + r * 190}" width="94" height="114" style="fill:#9fb7c9"/><path d="M${x + 105 + c * 210} ${178 + r * 190} V${292 + r * 190} M${x + 58 + c * 210} ${235 + r * 190} H${x + 152 + c * 210}" style="stroke:#f3ead8;stroke-width:6"/><rect x="${x + 42 + c * 210}" y="${300 + r * 190}" width="126" height="12" style="fill:#f3ead8" ${s2}/>`).join('')).join('')}
    <g transform="translate(${x + 260} 0)"><rect x="0" y="${450}" width="110" height="190" style="fill:${doors[i]}" ${S}/><path d="M0 450 Q55 400 110 450" style="fill:#f3ead8" ${s2}/><circle cx="92" cy="550" r="6" style="fill:#c9a24a"/><rect x="40" y="480" width="30" height="8" rx="3" style="fill:#c9a24a"/></g>
    <rect x="${x}" y="600" width="420" height="40" style="fill:#c9c3b6" ${s2}/>`; }).join('');
};
const setA = () => `<g id="setA" class="set">${cam(`
  <rect x="-500" y="-300" width="2920" height="1500" style="fill:#d6e4ea"/>
  ${cloud(300, 40, .8)}${cloud(1500, 20, 1)}
  ${houseRow()}
  <g transform="translate(1500 640)"><rect x="-10" y="-160" width="20" height="160" style="fill:#5a3e28"/><circle cx="0" cy="-230" r="110" style="fill:#7e9c6a" ${s2}/><circle cx="-70" cy="-190" r="70" style="fill:#88a874" ${s2}/><circle cx="70" cy="-200" r="76" style="fill:#7a965f" ${s2}/></g>
  ${lamp(380, 700, 380)}
  <rect x="-500" y="636" width="2920" height="64" style="fill:#e3dccd"/>
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${-500 + i * 100} 636 v64" style="stroke:#cfc6b4;stroke-width:3"/>`).join('')}
  <rect x="-500" y="696" width="2920" height="14" style="fill:#b9ae98"/>
  <rect x="-500" y="710" width="2920" height="150" style="fill:#7a7f80"/>
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${-400 + i * 200}" y="782" width="100" height="8" style="fill:#e6dccb;opacity:.8"/>`).join('')}
  <rect x="-500" y="856" width="2920" height="14" style="fill:#b9ae98"/>
  <rect x="-500" y="870" width="2920" height="600" style="fill:#e3dccd"/>
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${-500 + i * 110} 870 L${-560 + i * 130} 1400" style="stroke:#cfc6b4;stroke-width:3"/>`).join('')}
  <g transform="translate(960 812) scale(.92)">${golf('car1')}</g>
  ${char('G1', GEO, 560, 960)}
  ${char('L1', LUCA, 1380, 960, { handR: PROP.pen(FO(LUCA)), handL: PROP.clipboard(FO(LUCA)) })}
  <g class="flyCoat" opacity="0" transform="translate(2100 600)"><path d="M0 -150 L-50 -110 L-60 160 L60 160 L50 -110Z" style="fill:#fbf9f4" ${S}/></g>
`)}${grain}</g>`;

/* ===================== SET B · Oxford street (Broad Street) ===================== */
const setB = () => `<g id="setB" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#dfe7ea"/>
  ${cloud(300, 90)}${cloud(1500, 70, 1.2)}
  ${spires(-60, -40, '#e7d4ae')}${spires(1300, -30, '#e7d4ae')}
  ${radcam(1520, 470, .72)}
  <rect x="-300" y="250" width="1500" height="600" style="fill:url(#ashlar)" ${S}/>
  ${Array.from({ length: 17 }, (_, i) => `<rect x="${-300 + i * 90}" y="214" width="54" height="40" style="fill:#d8b47c" ${s2}/>`).join('')}
  <rect x="-300" y="540" width="1500" height="16" style="fill:#c9a46a" ${s2}/>
  ${[-160, 20, 200, 560, 740, 920].map(x => gothicWin(x, 330, 110, 170) + gothicWin(x, 620, 110, 160)).join('')}
  <rect x="340" y="140" width="160" height="710" style="fill:#d2ad74" ${S}/>${Array.from({ length: 4 }, (_, i) => `<rect x="${340 + i * 42}" y="110" width="30" height="34" style="fill:#d2ad74" ${s2}/>`).join('')}
  <path d="M360 850 L360 640 Q420 560 480 640 L480 850Z" style="fill:#5e4430" ${S}/>${Array.from({ length: 16 }, (_, i) => `<circle cx="${378 + (i % 4) * 28}" cy="${670 + Math.floor(i / 4) * 44}" r="4" style="fill:#2a1d14"/>`).join('')}
  <g transform="translate(420 300)"><path d="M-40 -34 L40 -34 L40 6 Q40 40 0 54 Q-40 40 -40 6Z" style="fill:#2c3e5c" ${S}/><path d="M-40 -4 L0 22 L40 -4" style="fill:none;stroke:#d9b77e;stroke-width:7"/></g>
  <path d="M1200 850 L1200 560 L2300 560 L2300 850Z" style="fill:#cfdcd6"/>
  <rect x="1200" y="700" width="1100" height="150" style="fill:#9fb48a"/>
  ${lamp(1260, 850, 320)}
  <g transform="translate(1130 520)"><rect x="-8" y="0" width="16" height="330" style="fill:#2a2d33"/><rect x="-150" y="-70" width="300" height="74" rx="6" style="fill:#fff" ${S}/><text x="0" y="-28" text-anchor="middle" style="font:700 34px var(--ui);fill:${INK};letter-spacing:2px">PUSEY STREET</text><text x="0" y="-6" text-anchor="middle" style="font:700 18px var(--ui);fill:#7b2d2d">OXFORD · OX1</text></g>
  ${bike(-120, 850)}${bike(120, 850)}${bike(880, 850)}
  <rect x="-300" y="846" width="2520" height="66" style="fill:#e6dccb"/><path d="M-300 846 L2220 846" style="stroke:#b9a27a;stroke-width:4"/>
  ${Array.from({ length: 26 }, (_, i) => `<path d="M${-300 + i * 100} 846 v66" style="stroke:#cfc3ad;stroke-width:3"/>`).join('')}
  <rect x="-300" y="906" width="2520" height="14" style="fill:#b9ab94"/>
  <rect x="-300" y="920" width="2520" height="400" style="fill:#7f8c80"/>
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${-200 + i * 170}" y="1040" width="90" height="10" style="fill:#e6dccb"/>`).join('')}
  <g transform="translate(1180 1010)"><g id="car2wrap" transform="translate(1500 0)">${golf('car2')}</g></g>
  ${char('L2', LUCA, 800, 1010, { handL: PROP.phone(FO(LUCA)), handR: PROP.clipboard(FO(LUCA)) })}
  <g class="pile" transform="translate(800 880)">
    <g class="bLaw" opacity="0"><rect x="-58" y="-24" width="116" height="40" rx="5" style="fill:#7b2d2d" ${S}/><text x="0" y="3" text-anchor="middle" style="font:700 17px var(--ui);fill:#f3ead8;letter-spacing:1px">OXFORD LAW</text></g>
    <g class="bMdu" opacity="0" transform="translate(0 -500)"><rect x="-64" y="-66" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="-36" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g>
    <g class="bKeys" opacity="0" transform="translate(0 -500)"><g transform="translate(30 -86)"><circle cx="0" cy="0" r="18" style="fill:none;stroke:#b48a35;stroke-width:6"/>${[-30, 10, 40].map((a, i) => `<rect x="-5" y="12" width="10" height="34" rx="3" transform="rotate(${a})" style="fill:${i % 2 ? '#c9a24a' : '#aeb6bd'}" ${s2}/>`).join('')}<rect x="-72" y="-14" width="78" height="24" rx="4" style="fill:#f3ead8" ${s2}/><text x="-33" y="3" text-anchor="middle" style="font:700 11px var(--ui);fill:${INK}">JUNIOR DEAN</text></g></g>
    <g class="bPager" opacity="0" transform="translate(0 -500)"><g transform="translate(-58 -20) scale(.7)"><rect x="-30" y="-18" width="60" height="34" rx="8" style="fill:#2b2e33" ${S}/><rect class="pagerScr" x="-22" y="-11" width="44" height="18" rx="3" style="fill:#5d6b5a"/></g></g>
  </g>
  ${char('G2', GEO, -300, 1010, { handR: `<g class="gMdu" opacity="0" transform="translate(0 ${FO(GEO) - 20})"><rect x="-64" y="-22" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="8" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g>` })}
  <g class="reachHand" transform="translate(2300 800)"><rect x="0" y="-16" width="700" height="32" rx="16" style="fill:#fbf9f4" ${S}/><g class="rhMdu" opacity="0"><rect x="-64" y="-22" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="8" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g><circle cx="0" cy="0" r="20" style="fill:${LUCA.skin}" ${S}/></g>
  <g class="tapRing" opacity="0" pointer-events="none"><circle class="rr" cx="740" cy="520" r="110" style="fill:none;stroke:#fff;stroke-width:8;stroke-dasharray:22 14"/><circle cx="740" cy="520" r="110" style="fill:none;stroke:#2a211d;stroke-width:3;opacity:.4"/><rect x="660" y="650" width="160" height="52" rx="26" style="fill:#ff5a8a" ${S}/><text x="740" y="686" text-anchor="middle" style="font:700 30px var(--ui);fill:#fff;letter-spacing:3px">TAP</text></g>
  <g class="nameplate" opacity="0"><g transform="translate(0 0)"><rect x="0" y="0" width="290" height="96" rx="12" style="fill:#f3ead8" ${S}/><text x="22" y="40" style="font:700 30px var(--ui);fill:${INK};letter-spacing:2px">GEORGE</text><text x="22" y="76" style="font:500 24px var(--ui);fill:#5a5a5a">Finance experience.</text></g></g>
`)}${grain}</g>`;

/* ===================== SET C · college quad (walking) ===================== */
const setC = () => `<g id="setC" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#dfe7ea"/>${cloud(500, 80)}${cloud(1500, 110, .8)}
  <g class="scroll" transform="translate(0 0)">
    <rect x="-400" y="160" width="4400" height="560" style="fill:url(#ashlar)" ${S}/>
    ${Array.from({ length: 48 }, (_, i) => `<rect x="${-400 + i * 92}" y="126" width="56" height="38" style="fill:#d8b47c" ${s2}/>`).join('')}
    <g transform="translate(1600 0)"><rect x="-130" y="-120" width="260" height="840" style="fill:#d2ad74" ${S}/><path d="M-130 -120 L0 -260 L130 -120Z" style="fill:#c9a46a" ${S}/><circle cx="0" cy="40" r="70" style="fill:#2c3e5c" ${S}/><circle cx="0" cy="40" r="56" style="fill:#f3ead8"/><path d="M0 40 L0 0 M0 40 L30 52" style="stroke:${INK};stroke-width:6;stroke-linecap:round"/>${gothicWin(-50, 180, 100, 160)}</g>
    ${Array.from({ length: 18 }, (_, i) => { const x = -300 + i * 240; return x > 1400 && x < 1800 ? '' : gothicWin(x, 250, 100, 150); }).join('')}
    <rect x="-400" y="460" width="4400" height="260" style="fill:#cba56b"/>
    ${Array.from({ length: 30 }, (_, i) => `<path d="M${-380 + i * 150} 720 L${-380 + i * 150} 540 Q${-310 + i * 150} 450 ${-240 + i * 150} 540 L${-240 + i * 150} 720Z" style="fill:#3d3328" ${s3}/><rect x="${-240 + i * 150}" y="500" width="10" height="220" style="fill:#d8b47c" ${s2}/>`).join('')}
    <rect x="-400" y="710" width="4400" height="40" style="fill:#e6dccb" ${s2}/>
    <rect x="-400" y="750" width="4400" height="200" style="fill:#7fa36a"/>
    ${Array.from({ length: 22 }, (_, i) => `<rect x="${-400 + i * 200}" y="750" width="100" height="200" style="fill:#88ac72"/>`).join('')}
    <rect x="-400" y="940" width="4400" height="400" style="fill:#e3d7bf"/>
    ${Array.from({ length: 44 }, (_, i) => `<path d="M${-400 + i * 100} 940 v400" style="stroke:#d6c8ae;stroke-width:3"/>`).join('')}
  </g>
  ${char('L3', LUCA, 1160, 1010, { handR: PROP.phone(FO(LUCA)) + PROP.clipboard(FO(LUCA)) })}
  <g class="pile3" transform="translate(1160 880)"><g transform="translate(0 0)"><rect x="-58" y="-24" width="116" height="40" rx="5" style="fill:#7b2d2d" ${S}/><text x="0" y="3" text-anchor="middle" style="font:700 17px var(--ui);fill:#f3ead8;letter-spacing:1px">OXFORD LAW</text>
    <g class="mdu3"><rect x="-64" y="-66" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="-36" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g>
    <g transform="translate(30 -86)"><circle cx="0" cy="0" r="18" style="fill:none;stroke:#b48a35;stroke-width:6"/>${[-30, 10, 40].map((a, i) => `<rect x="-5" y="12" width="10" height="34" rx="3" transform="rotate(${a})" style="fill:${i % 2 ? '#c9a24a' : '#aeb6bd'}" ${s2}/>`).join('')}</g>
    <g transform="translate(-58 -20) scale(.7)"><rect x="-30" y="-18" width="60" height="34" rx="8" style="fill:#2b2e33" ${S}/><rect class="pagerScr" x="-22" y="-11" width="44" height="18" rx="3" style="fill:#5d6b5a"/></g></g></g>
  ${char('G3', GEO, 760, 1010, { handR: `<g class="gMdu" opacity="0" transform="translate(0 ${FO(GEO) - 20})"><rect x="-64" y="-22" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="8" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g>` })}
  <g class="reachHand" transform="translate(2300 800)"><rect x="0" y="-16" width="600" height="32" rx="16" style="fill:${LUCA.shirt}" ${S}/><g class="rhMdu" opacity="0"><rect x="-64" y="-22" width="128" height="44" rx="5" style="fill:#9a9a94" ${S}/><text x="0" y="8" text-anchor="middle" style="font:700 22px var(--ui);fill:#4a4a46;letter-spacing:3px">MDU</text></g><circle cx="0" cy="0" r="20" style="fill:${LUCA.skin}" ${S}/></g>
`)}${grain}</g>`;

/* ===================== SET D · London street (Bob) ===================== */
const setD = () => `<g id="setD" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#d6e2e8"/>${cloud(400, 70)}${cloud(1400, 100, .9)}
  <g class="farScroll" transform="translate(0 0)">
    <g class="bus" transform="translate(2400 0)"><rect x="0" y="560" width="420" height="230" rx="18" style="fill:#c8322b" ${S}/><rect x="0" y="660" width="420" height="10" style="fill:#f3ead8"/>${Array.from({ length: 5 }, (_, i) => `<rect x="${20 + i * 80}" y="580" width="62" height="60" rx="6" style="fill:#3a4152" ${s2}/><rect x="${20 + i * 80}" y="690" width="62" height="56" rx="6" style="fill:#3a4152" ${s2}/>`).join('')}<circle cx="80" cy="800" r="30" style="fill:#25262b"/><circle cx="340" cy="800" r="30" style="fill:#25262b"/></g>
  </g>
  <g class="scroll" transform="translate(0 0)">
    ${Array.from({ length: 9 }, (_, i) => { const x = -400 + i * 560; return `<rect x="${x}" y="140" width="560" height="720" style="fill:url(#brick)" ${S}/><rect x="${x}" y="660" width="560" height="200" style="fill:#f1ebe0" ${s2}/>${[0, 1, 2].map(r => [0, 1, 2].map(c => r === 2 && c === 1 ? '' : `<rect x="${x + 60 + c * 170}" y="${190 + r * 160}" width="100" height="120" style="fill:#f3ead8" ${s3}/><rect x="${x + 68 + c * 170}" y="${198 + r * 160}" width="84" height="104" style="fill:#3a4152"/><path d="M${x + 110 + c * 170} ${198 + r * 160} V${302 + r * 160} M${x + 68 + c * 170} ${250 + r * 160} H${x + 152 + c * 170}" style="stroke:#f3ead8;stroke-width:6"/>`).join('')).join('')}<path d="M${x + 210} 860 L${x + 210} 640 Q${x + 280} 580 ${x + 350} 640 L${x + 350} 860Z" style="fill:${['#1f2a3a', '#2f5a43', '#7b2d2d'][i % 3]}" ${S}/><path d="M${x + 222} 640 Q${x + 280} 600 ${x + 338} 640" style="fill:#e9c77a;opacity:.7"/><circle cx="${x + 330}" cy="760" r="6" style="fill:#c9a24a"/>`; }).join('')}
    <rect x="-400" y="860" width="5000" height="16" style="fill:#2a2d33"/>
    ${Array.from({ length: 120 }, (_, i) => `<rect x="${-400 + i * 40}" y="800" width="6" height="64" style="fill:#2a2d33"/><circle cx="${-397 + i * 40}" cy="798" r="5" style="fill:#2a2d33"/>`).join('')}
    <rect x="-400" y="796" width="5000" height="8" style="fill:#2a2d33"/>
    <g transform="translate(1500 940)"><rect x="-40" y="-170" width="80" height="170" rx="18" style="fill:#c8322b" ${S}/><path d="M-44 -170 Q0 -220 44 -170Z" style="fill:#c8322b" ${S}/><rect x="-28" y="-130" width="56" height="10" style="fill:${INK}"/><text x="0" y="-60" text-anchor="middle" style="font:700 14px var(--ui);fill:#f3d36a">ROYAL MAIL</text></g>
    <g transform="translate(2700 940)"><rect x="-60" y="-300" width="120" height="300" style="fill:#c8322b" ${S}/><path d="M-64 -300 Q0 -340 64 -300Z" style="fill:#c8322b" ${S}/><rect x="-50" y="-280" width="100" height="24" style="fill:#1b1b1b"/><text x="0" y="-262" text-anchor="middle" style="font:700 16px var(--ui);fill:#fff">TELEPHONE</text>${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${-46 + c * 32}" y="${-246 + r * 50}" width="26" height="42" style="fill:#e9eef0;opacity:.9" ${s2}/>`).join('')).join('')}</g>
    <g transform="translate(600 640)"><rect x="-210" y="-60" width="420" height="96" rx="8" style="fill:#fff" ${S}/><rect x="-200" y="-50" width="400" height="76" rx="4" style="fill:none;stroke:${INK};stroke-width:2"/><text x="0" y="-2" text-anchor="middle" style="font:700 32px var(--ui);fill:${INK};letter-spacing:1px">MARYLEBONE HIGH ST</text><text x="0" y="22" text-anchor="middle" style="font:700 18px var(--ui);fill:#c8322b">W1 · CITY OF WESTMINSTER</text></g>
    ${Array.from({ length: 10 }, (_, i) => `<g transform="translate(${100 + i * 480} 960)"><rect x="-8" y="-60" width="16" height="60" style="fill:#5a3e28"/><circle cx="0" cy="-110" r="70" style="fill:#7e9c6a" ${s2}/></g>`).join('')}
    <rect x="-400" y="876" width="5000" height="200" style="fill:#c9c3b6"/>
    ${Array.from({ length: 70 }, (_, i) => `<path d="M${-400 + i * 75} 876 v200" style="stroke:#b3ac9e;stroke-width:3"/>`).join('')}
    <rect x="-400" y="1070" width="5000" height="20" style="fill:#9a948a"/>
  </g>
  ${char('BOB', BOB, 1800, 990, {}, .74)}
  ${char('G4', GEO, 880, 1040, { drool: true })}
  ${char('L4', LUCA, 1170, 1040)}
`)}${grain}</g>`;

/* ===================== SET E · Edinburgh flat ===================== */
const edView = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:#c9d8e0"/>${cloud(x + w * .3, y + 60, .7)}${arthursSeat(x + w * .55, y + h * .78, .62)}${edRoofs(x - 20, y + h + 30, w + 60)}`;
const setE = () => `<g id="setE" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#e7dfcf"/>
  <rect x="-300" y="-300" width="2520" height="260" style="fill:#efe8da"/><path d="M-300 -40 L2220 -40" style="stroke:#d6c9ae;stroke-width:12"/>
  <path d="M-300 -10 L2220 -10" style="stroke:#d6c9ae;stroke-width:6"/>
  ${sashWin(260, 120, 640, 520, edView(260, 120, 640, 520))}
  <path d="M220 100 Q250 380 230 660 L170 660 Q190 380 160 100Z M940 100 Q910 380 930 660 L990 660 Q970 380 1000 100Z" style="fill:#7b2d2d" ${S}/>
  <rect x="150" y="88" width="860" height="16" rx="6" style="fill:#8a6646" ${s2}/>
  <rect x="1280" y="140" width="360" height="560" style="fill:#5a3e28" ${S}/>${[0, 1, 2, 3].map(i => `<rect x="1292" y="${154 + i * 136}" width="336" height="120" style="fill:#3b2819"/>${shelfRow(1296, 158 + i * 136, 328, 112)}`).join('')}
  <g transform="translate(1760 300)"><rect width="180" height="230" style="fill:#a27b45" ${S}/><rect x="16" y="16" width="148" height="198" style="fill:#c9d8e0"/>${arthursSeat(90, 190, .25)}</g>
  <rect x="-300" y="700" width="2520" height="20" style="fill:#d6c9ae"/>
  <rect x="-300" y="720" width="2520" height="600" style="fill:#9a7550"/>
  ${Array.from({ length: 26 }, (_, i) => `<path d="M${-300 + i * 100} 720 L${-500 + i * 130} 1300" style="stroke:#86643f;stroke-width:3"/>`).join('')}
  <g transform="translate(1700 760)"><path d="M-80 0 Q-80 -60 -20 -70 L20 -70 Q80 -60 80 0Z" style="fill:#5b6f4f" ${S}/></g>
  ${char('G5', GEO, 760, 980, { seated: true, handR: PROP.map(FO(GEO)) })}
  <g class="mapOnDesk" opacity="0"><g transform="translate(820 772) rotate(-6)"><path d="M-90 -50 L-30 -60 L30 -50 L90 -60 L90 40 L30 50 L-30 40 L-90 50Z" style="fill:#efe4c4" ${s2}/><path d="M-30 -60 L-30 40 M30 -50 L30 50" style="stroke:#b9a27a;stroke-width:2"/><path d="M-70 30 Q-40 -10 0 -6 Q40 -2 60 -36" style="fill:none;stroke:#c84a3a;stroke-width:4;stroke-dasharray:7 5"/><circle class="mapCafe" cx="-50" cy="-30" r="9" style="fill:#2c3e5c"/><text x="-50" y="-44" text-anchor="middle" style="font:700 11px var(--ui);fill:#2c3e5c">CAFÉ</text><path d="M48 -48 L60 -66 L72 -48Z" style="fill:#7d8f6a" ${s2}/><text x="60" y="-72" text-anchor="middle" style="font:700 10px var(--ui);fill:#7b2d2d">ARTHUR'S SEAT</text></g></g>
  <path d="M380 760 L1200 760 L1240 810 L340 810Z" style="fill:#7a5236" ${S}/><rect x="350" y="808" width="880" height="40" style="fill:#5e3e26" ${S}/><rect x="380" y="846" width="24" height="230" style="fill:#5e3e26" ${s2}/><rect x="1176" y="846" width="24" height="230" style="fill:#5e3e26" ${s2}/>
  <g class="laptop"><path d="M560 760 L780 760 L800 784 L540 784Z" style="fill:#9aa3ab" ${s2}/><g class="lid" transform="translate(670 760)"><g class="lidR" transform="scale(1 1)"><rect x="-100" y="-150" width="200" height="150" rx="8" style="fill:#3a3d44" ${s2}/><rect x="-90" y="-140" width="180" height="128" rx="4" style="fill:#f4f1ea"/><text x="0" y="-118" text-anchor="middle" style="font:700 13px var(--ui);fill:${INK}">THESIS_FINAL_final_v12</text>${[0, 1, 2, 3, 4].map(k => `<path d="M-76 ${-98 + k * 16} h${120 + (k % 2) * 30}" style="stroke:#c9ced3;stroke-width:6"/>`).join('')}</g></g></g>
  <g transform="translate(900 772)"><path d="M-20 -40 L20 -40 L18 0 L-18 0Z" style="fill:#f3ead8" ${s2}/><path d="M20 -30 Q36 -26 30 -10 L19 -10" style="fill:none;stroke:${INK};stroke-width:3"/></g>
  <g transform="translate(1190 772)">${Array.from({ length: 9 }, (_, i) => `<rect x="${-60 + (i % 2) * 4}" y="${-12 - i * 13}" width="120" height="12" rx="2" style="fill:#fbf8f2" ${s2}/>`).join('')}</g>
  <g transform="translate(440 780)"><rect x="-50" y="-14" width="100" height="14" style="fill:#fff" ${s2}/><rect x="-46" y="-26" width="96" height="12" style="fill:#fbf8f2" ${s2}/></g>
  ${char('L5', LUCA, 1380, 1000, { handL: PROP.map(FO(LUCA)) })}
  <g class="tapF" opacity="0" transform="translate(0 0)"><circle cx="0" cy="0" r="14" style="fill:${LUCA.skin}" ${s2}/></g>
`)}${grain}</g>`;

/* ===================== SET F · Edinburgh café ===================== */
const setF = () => `<g id="setF" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#2f5a43"/>
  <rect x="-300" y="560" width="2520" height="300" style="fill:url(#tiles)"/>
  <rect x="140" y="80" width="1160" height="560" style="fill:#c9d8e0" ${S}/>
  <g>${cloud(400, 160, .8)}${arthursSeat(760, 520, 1)}${edRoofs(120, 650, 1200)}</g>
  <path d="M720 80 V640 M140 360 H1300" style="stroke:#1f3f2e;stroke-width:16"/><rect x="140" y="80" width="1160" height="560" style="fill:none;stroke:#1f3f2e;stroke-width:20"/>
  <text x="430" y="150" text-anchor="middle" style="font:600 46px Caveat, cursive;fill:#f3ead8;opacity:.85">Café</text>
  <g transform="translate(1440 120)"><rect width="380" height="420" rx="10" style="fill:#2a2d33" ${S}/><rect x="14" y="14" width="352" height="392" style="fill:#1f2427"/>
    <text x="190" y="80" text-anchor="middle" style="font:600 48px Caveat, cursive;fill:#f3ead8">Today</text>
    ${[['Flat white', '3.40'], ['Cappuccino', '3.60'], ['Muffins', '3.20'], ['Scones', '2.90'], ['Tablet', '1.80']].map((m, i) => `<text x="40" y="${150 + i * 54}" style="font:600 34px Caveat, cursive;fill:#e9e2d0">${m[0]}</text><text x="340" y="${150 + i * 54}" text-anchor="end" style="font:600 34px Caveat, cursive;fill:#e9c77a">${m[1]}</text>`).join('')}</g>
  <rect x="-300" y="850" width="2520" height="500" style="fill:#7a5236"/>
  ${Array.from({ length: 26 }, (_, i) => `<path d="M${-300 + i * 100} 850 L${-500 + i * 130} 1300" style="stroke:#6a4630;stroke-width:3"/>`).join('')}
  ${char('G6', GEO, 640, 1010, { seated: true })}
  ${char('L6', LUCA, 1240, 1010, { seated: true })}
  <ellipse cx="940" cy="800" rx="440" ry="60" style="fill:#f3ead8" ${S}/><ellipse cx="940" cy="792" rx="420" ry="52" style="fill:#fbf8f2"/>
  <rect x="924" y="830" width="32" height="240" style="fill:#3a3d44" ${s2}/><ellipse cx="940" cy="1070" rx="120" ry="18" style="fill:#3a3d44"/>
  <g class="bag" transform="translate(520 1040)"><path d="M-60 0 L-50 -120 Q0 -150 50 -120 L60 0Z" style="fill:#6b7a4f" ${S}/><path d="M-30 -120 Q0 -170 30 -120" style="fill:none;stroke:${INK};stroke-width:6"/><rect x="-40" y="-80" width="80" height="40" rx="6" style="fill:#5b6a42" ${s2}/></g>
  <g class="cupG" opacity="0" transform="translate(0 -300)"><g transform="translate(760 780)"><ellipse cx="0" cy="10" rx="54" ry="12" style="fill:#fff" ${s2}/><path d="M-30 -40 L30 -40 L24 8 L-24 8Z" style="fill:#fff" ${s2}/><path d="M30 -30 Q48 -24 40 -6 L26 -6" style="fill:none;stroke:${INK};stroke-width:3"/><ellipse cx="0" cy="-40" rx="30" ry="7" style="fill:#8a5a3c" ${s2}/></g></g>
  <g class="cupL" opacity="0" transform="translate(0 -300)"><g transform="translate(1120 780)"><ellipse cx="0" cy="10" rx="54" ry="12" style="fill:#fff" ${s2}/><path d="M-30 -40 L30 -40 L24 8 L-24 8Z" style="fill:#fff" ${s2}/><path d="M-30 -30 Q-48 -24 -40 -6 L-26 -6" style="fill:none;stroke:${INK};stroke-width:3"/><ellipse cx="0" cy="-40" rx="30" ry="7" style="fill:#8a5a3c" ${s2}/></g></g>
  <g class="plateG" opacity="0"><ellipse cx="840" cy="800" rx="56" ry="12" style="fill:#fff" ${s2}/></g>
  <g class="muffin" opacity="0" transform="translate(0 -300)"><g transform="translate(960 790)"><ellipse cx="0" cy="8" rx="60" ry="12" style="fill:#fff" ${s2}/><path d="M-28 6 L-34 -30 L34 -30 L28 6Z" style="fill:#c9a24a" ${s2}/><path d="M-30 -30 L-30 -22 M-15 -30 L-15 -4 M0 -30 L0 0 M15 -30 L15 -4" style="stroke:#a8822e;stroke-width:3"/>
    <g class="mtop" transform="translate(0 0) rotate(0)"><g class="mhand" opacity="0"><circle cx="18" cy="-14" r="15" style="fill:${LUCA.skin}" ${s2}/><circle cx="-18" cy="-14" r="15" style="fill:${LUCA.skin}" ${s2}/></g><path d="M-44 -26 Q-50 -76 0 -80 Q50 -76 44 -26 Q0 -16 -44 -26Z" style="fill:#7a4a2a" ${s2}/>${[[-20, -54], [8, -62], [24, -42], [-6, -40]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="5" style="fill:#3d2416"/>`).join('')}</g></g></g>
  <g class="waiter" transform="translate(0 0)"><g transform="translate(2300 640)"><rect x="0" y="-18" width="420" height="36" rx="18" style="fill:#f3ead8" ${S}/><circle cx="0" cy="0" r="22" style="fill:#d9a582" ${S}/></g></g>
`)}${grain}</g>`;

/* ===================== SET G · Brussels office ===================== */
const setG = () => `<g id="setG" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#e9eef3"/>
  <rect x="-300" y="-300" width="2520" height="250" style="fill:#dfe6ec"/>
  <rect x="120" y="100" width="820" height="560" style="fill:#cfe2ee" ${S}/>
  <g>${cloud(300, 170, .7)}${atomium(760, 470, .9)}${gables(160, 660)}</g>
  <path d="M530 100 V660 M120 380 H940" style="stroke:#f4f6f8;stroke-width:14"/><rect x="120" y="100" width="820" height="560" style="fill:none" ${S}/>
  <g transform="translate(1020 120)"><rect width="18" height="160" style="fill:#7d858c"/><rect x="18" y="0" width="54" height="36" style="fill:#2a2a2a"/><rect x="18" y="36" width="54" height="36" style="fill:#f3d23a"/><rect x="18" y="72" width="54" height="36" style="fill:#d6382f"/></g>
  <g class="door" transform="translate(1500 160)"><rect x="-10" y="-10" width="320" height="720" style="fill:#c9ced3" ${S}/><rect x="0" y="0" width="300" height="700" style="fill:#2a2d33"/>
    <g class="doorLeaf" transform="scale(1 1)"><rect x="0" y="0" width="300" height="700" style="fill:#e3e8ec" ${S}/><circle cx="260" cy="360" r="12" style="fill:#9aa3ab" ${s2}/><rect x="40" y="40" width="220" height="140" style="fill:#d0d8de"/></g></g>
  ${char('G7', GEO, 1660, 860, { handR: PROP.vase(FO(GEO)), handL: '' })}
  <rect x="-300" y="860" width="2520" height="500" style="fill:#b9c0c6"/>
  ${Array.from({ length: 26 }, (_, i) => `<path d="M${-300 + i * 100} 860 L${-500 + i * 130} 1300" style="stroke:#a7aeb4;stroke-width:3"/>`).join('')}
  ${char('L7', LUCA, 760, 1000, { seated: true, handR: PROP.phone(FO(LUCA)) })}
  ${char('L7s', LUCA, 760, 1000)}
  <rect x="300" y="780" width="1000" height="40" style="fill:#f4f6f8" ${S}/><rect x="320" y="820" width="20" height="260" style="fill:#9aa3ab"/><rect x="1260" y="820" width="20" height="260" style="fill:#9aa3ab"/>
  <g transform="translate(980 776)"><rect x="-10" y="-30" width="20" height="30" style="fill:#3a3d44"/><rect x="-170" y="-250" width="340" height="224" rx="8" style="fill:#2a2d33" ${S}/><rect x="-158" y="-238" width="316" height="200" style="fill:#fff"/>
    ${Array.from({ length: 7 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<rect x="${-156 + c * 63}" y="${-236 + r * 28}" width="63" height="28" style="fill:${r === 0 ? '#d6e6d0' : '#fff'};stroke:#c9d2da;stroke-width:1.5"/>`).join('')).join('')}</g>
  <g transform="translate(470 776)">${[0, 1, 2].map(i => `<rect x="-60" y="${-14 - i * 16}" width="120" height="14" rx="2" style="fill:${['#2c3e5c', '#9a9a94', '#f3ead8'][i]}" ${s2}/>`).join('')}</g>
  <g class="deskVase" opacity="0"><g transform="translate(640 776) rotate(0)"><path d="M-9 -26 L9 -26 L7 -20 Q16 -10 13 4 Q10 12 0 12 Q-10 12 -13 4 Q-16 -10 -7 -20Z" transform="translate(0 -12)" style="fill:#5b84a8" ${s2}/><path d="M-11 -16 Q0 -10 11 -16" style="fill:none;stroke:#f3ead8;stroke-width:2.5"/></g></g>
  <g class="jacket"><path d="M1260 300 L1220 340 L1216 540 L1304 540 L1300 340Z" style="fill:#3a4152" ${S}/><rect x="1250" y="276" width="20" height="30" rx="6" style="fill:#7d858c"/></g>
`)}${grain}</g>`;

/* ===================== SET H · split screen (phones) ===================== */
const setH = () => `<g id="setH" class="set">${cam(`
  <rect x="0" y="0" width="960" height="1080" style="fill:#e8dcc4"/><rect x="960" y="0" width="960" height="1080" style="fill:#dfe8ee"/>
  <g><rect x="40" y="620" width="600" height="300" rx="40" style="fill:#7b2d2d" ${S}/><rect x="40" y="560" width="600" height="120" rx="40" style="fill:#8a3a32" ${S}/><circle cx="120" cy="560" r="80" style="fill:#e9c77a;opacity:.4"/></g>
  <g><rect x="1340" y="700" width="560" height="40" style="fill:#c9a46a" ${S}/><rect x="1500" y="200" width="300" height="200" style="fill:#c9d8e0" ${S}/></g>
  ${bust('GH', GEO, 165, 560, 1.9)}
  ${bust('LH', LUCA, 1760, 580, 1.9, { mouth: 'flat' })}
  <g class="badge" opacity="0"><g transform="translate(170 300)"><g class="badgeR" transform="rotate(0)"><rect x="-90" y="-28" width="180" height="56" rx="28" style="fill:#e3b23c" ${S}/><text x="0" y="12" text-anchor="middle" style="font:700 30px var(--ui);fill:#5a3e10;letter-spacing:4px">PREMIUM</text></g></g></g>
  ${phoneUI('phG', 610, 540, 'Luca', 600, 1020)}
  ${phoneUI('phL', 1310, 540, 'George', 600, 1020)}
  <g class="drawer" opacity="0" transform="translate(0 0)"><rect x="1032" y="790" width="556" height="240" rx="20" style="fill:#e7e2d8" ${S}/><text x="1310" y="840" text-anchor="middle" style="font:600 32px var(--ui);fill:#7a8691">Stickers</text><text x="1310" y="930" text-anchor="middle" style="font:500 36px var(--ui);fill:#9aa3ab">No stickers yet</text></g>
  <g class="cal" opacity="0"><g transform="translate(960 160)"><rect x="-90" y="-80" width="180" height="170" rx="14" style="fill:#fff" ${S}/><rect x="-90" y="-80" width="180" height="50" rx="14" style="fill:#c84a3a"/><text class="day1" x="0" y="60" text-anchor="middle" style="font:700 80px var(--ui);fill:${INK}">14</text><text class="day2" opacity="0" x="0" y="60" text-anchor="middle" style="font:700 80px var(--ui);fill:${INK}">15</text><text class="day3" opacity="0" x="0" y="60" text-anchor="middle" style="font:700 80px var(--ui);fill:${INK}">16</text><g class="flip" opacity="0"><rect x="-90" y="-30" width="180" height="120" style="fill:#f4f1ea" ${S}/></g></g></g>
  <g class="tray" opacity="0" transform="translate(0 0)"><rect x="332" y="790" width="556" height="240" rx="20" style="fill:#e7e2d8" ${S}/><text x="610" y="834" text-anchor="middle" style="font:600 32px var(--ui);fill:#7a8691">Stickers</text>${stickerStraw('trayStraw', 610, 930, .7)}</g>
  <line x1="960" y1="-200" x2="960" y2="1280" style="stroke:${INK};stroke-width:8"/>
`)}</g>`;

/* ===================== SET I · George's kitchen ===================== */
const setI = () => `<g id="setI" class="set">${cam(`
  <rect x="-300" y="-300" width="2520" height="1500" style="fill:#e9e0cc"/>
  <rect x="-300" y="420" width="2520" height="340" style="fill:url(#tiles)"/>
  ${sashWin(1260, 120, 420, 300, `<rect x="1260" y="120" width="420" height="300" style="fill:#b9cfe0"/><rect x="1260" y="300" width="420" height="120" style="fill:#d9b88a"/>${[0, 1, 2, 3].map(i => `<rect x="${1270 + i * 100}" y="${240 - (i % 2) * 40}" width="90" height="${200}" style="fill:${i % 2 ? '#c9a07a' : '#b8875a'}" ${s2}/><rect x="${1290 + i * 100}" y="${260 - (i % 2) * 40}" width="20" height="26" style="fill:#e9c77a"/>`).join('')}`)}
  <g>${[0, 1, 2].map(i => `<rect x="${200 + i * 300}" y="80" width="260" height="200" rx="6" style="fill:#5b6f4f" ${S}/><circle cx="${330 + i * 300}" cy="180" r="10" style="fill:#c9a24a"/>`).join('')}</g>
  <rect x="200" y="330" width="840" height="14" style="fill:#8a6646" ${s2}/>${[['#c84a3a', 240], ['#e9c77a', 330], ['#7e9c6a', 420], ['#f3ead8', 520], ['#a27b45', 620]].map(j => `<rect x="${j[1]}" y="${286}" width="50" height="44" rx="6" style="fill:${j[0]}" ${s2}/><rect x="${j[1] - 3}" y="${280}" width="56" height="10" rx="3" style="fill:#5a3e28"/>`).join('')}
  <g class="fridge"><rect x="1720" y="160" width="300" height="760" rx="16" style="fill:#e9eef0" ${S}/><path d="M1720 440 H2020" style="stroke:${INK};stroke-width:4"/><rect x="1740" y="300" width="14" height="100" rx="6" style="fill:#9aa3ab"/><rect x="1740" y="480" width="14" height="140" rx="6" style="fill:#9aa3ab"/>
    <g transform="translate(1870 600) rotate(4)"><rect x="-110" y="-80" width="220" height="170" style="fill:#fff6b8" ${s2}/><circle cx="0" cy="-74" r="10" style="fill:#c84a3a" ${s2}/><text x="0" y="-26" text-anchor="middle" style="font:600 30px Caveat, cursive;fill:#22314a">PUT THE</text><text x="0" y="10" text-anchor="middle" style="font:600 34px Caveat, cursive;fill:#22314a">STICKERS</text><path d="M-62 18 H62 M-58 26 H58" style="stroke:#22314a;stroke-width:3"/><text x="0" y="58" text-anchor="middle" style="font:600 28px Caveat, cursive;fill:#22314a">ON LUCA'S PHONE</text></g></g>
  ${char('G8', GEO, 620, 1000, { rolled: true, towel: true, handL: PROP.spoon(FO(GEO)), handR: PROP.phone(FO(GEO)) })}
  <rect x="-300" y="760" width="1560" height="40" style="fill:#c9b48a" ${S}/><rect x="-300" y="800" width="1560" height="300" style="fill:#5b6f4f" ${S}/>${[0, 1, 2, 3].map(i => `<rect x="${-260 + i * 380}" y="830" width="340" height="230" rx="6" style="fill:#566a4b" ${s2}/><rect x="${-110 + i * 380}" y="850" width="40" height="10" rx="5" style="fill:#c9a24a"/>`).join('')}
  <g transform="translate(560 760)"><rect x="-170" y="-14" width="340" height="14" style="fill:#2a2d33"/><ellipse cx="-80" cy="-14" rx="60" ry="10" style="fill:#3a3d44"/><ellipse cx="80" cy="-14" rx="60" ry="10" style="fill:#3a3d44"/></g>
  <g class="pan" transform="translate(410 742)"><path d="M-80 -10 L80 -10 L70 -60 L-70 -60Z" style="fill:#3a3d44" ${S}/><rect x="80" y="-52" width="120" height="14" rx="7" style="fill:#2a2d33"/><ellipse cx="0" cy="-60" rx="70" ry="12" style="fill:#b8402e" ${s2}/>${[-30, 10, 30].map((b, i) => `<circle class="bub" cx="${b}" cy="-62" r="5" style="fill:#d9644a"/>`).join('')}</g>
  <g class="steam">${[0, 1, 2].map(i => `<path class="st${i}" d="M${380 + i * 30} 660 q-14 -30 0 -60 q14 -30 0 -60" style="fill:none;stroke:#fff;stroke-width:8;stroke-linecap:round;opacity:.6"/>`).join('')}</g>
  <g transform="translate(900 762)"><path d="M-110 0 L110 0 L104 -16 L-104 -16Z" style="fill:#c99a62" ${s2}/>${[-60, -20, 20].map(x => `<rect x="${x}" y="-30" width="30" height="14" rx="3" style="fill:#7e9c6a" ${s2}/>`).join('')}<rect x="50" y="-26" width="40" height="10" style="fill:#c9ced3"/></g>
  <g class="phoneDown" opacity="0"><g transform="translate(790 752) rotate(-4)"><rect x="-44" y="-12" width="88" height="18" rx="6" style="fill:#16181c" ${s2}/><rect x="-38" y="-9" width="76" height="11" rx="3" style="fill:#3a4d6e"/></g></g>
  <g transform="translate(1520 1000)"><rect x="-260" y="-150" width="520" height="22" style="fill:#a27b45" ${S}/><rect x="-240" y="-128" width="18" height="140" style="fill:#8a6646"/><rect x="222" y="-128" width="18" height="140" style="fill:#8a6646"/>${[-120, 120].map(x => `<ellipse cx="${x}" cy="-156" rx="70" ry="12" style="fill:#fff" ${s2}/><path d="M${x - 92} -160 V-140 M${x + 92} -160 V-140" style="stroke:#9aa3ab;stroke-width:5"/>`).join('')}</g>
  <g class="plates" opacity="0"><g transform="translate(1250 590)">${[0, 1].map(i => `<ellipse cx="0" cy="${-i * 10}" rx="60" ry="12" style="fill:#fff" ${s2}/>`).join('')}</g></g>
  ${stickerStraw('stI', 900, 500, .9)}
`)}${grain}</g>`;

/* ===================== inserts ===================== */
const clipInsert = () => `<g id="insClip" class="set">
  <rect width="1920" height="1080" style="fill:#e3d7bf"/>${grain}
  <g class="georgePeek" transform="translate(2200 520)">${bust('GP', GEO, 0, 0, 3, { mouth: 'flat' })}</g>
  <g class="board" transform="translate(0 0) rotate(0)"><g transform="rotate(-2 820 560)">
    <rect x="300" y="40" width="1040" height="1100" rx="24" style="fill:#9a6b3f" ${S}/>
    <rect x="340" y="110" width="960" height="1000" style="fill:#f7f2e6" ${S}/>
    <rect x="680" y="16" width="280" height="80" rx="16" style="fill:#aeb6bd" ${S}/>
    <text x="390" y="196" style="font:700 34px var(--ui);fill:#5a6672;letter-spacing:5px">CONSULTATION NOTES</text>
    <path d="M390 220 L1250 220" style="stroke:#c9d2da;stroke-width:3"/>
    ${[380, 500, 620, 740, 860].map(y => `<path d="M390 ${y + 18} L1250 ${y + 18}" style="stroke:#dfe5ea;stroke-width:3"/>`).join('')}
    ${[[1, 380, 'Judgement:', ' questionable.'], [2, 500, 'Confidence:', ' unfortunately unaffected.'], [3, 620, 'Memory:', ' highly selective.']].map(([n, y, a, b]) => `<text class="tl${n}" x="395" y="${y}" style="font:600 64px Caveat, cursive;fill:#22314a"><tspan style="font-weight:700">${a}</tspan>${b}</text><rect class="cv${n}" x="380" y="${y - 66}" width="900" height="100" style="fill:#f7f2e6"/><path d="M390 ${y + 18} L1250 ${y + 18}" style="stroke:#dfe5ea;stroke-width:3"/>`).join('')}
    <path class="uline" d="M0 0" style="fill:none;stroke:#22314a;stroke-width:5;stroke-linecap:round"/>
    <g class="pen" transform="translate(401 358)"><g transform="rotate(30)"><rect x="-8" y="-160" width="16" height="150" rx="6" style="fill:#2c3e5c" ${s2}/><path d="M-8 -10 L0 12 L8 -10 Z" style="fill:#d9b77e" ${s2}/></g></g>
    <g class="hand" transform="translate(0 0)"></g>
  </g></g>
</g>`;
const pagerInsert = () => `<g id="insPager" class="set">
  <rect width="1920" height="1080" style="fill:#d8b47c"/>${grain}
  <g class="pagerBig" transform="translate(0 0)"><rect x="560" y="300" width="800" height="440" rx="70" style="fill:#2b2e33" ${S}/>
  <rect x="640" y="380" width="640" height="240" rx="18" style="fill:#9fb59a" ${S}/>
  <text x="960" y="545" text-anchor="middle" style="font:170px VT323, monospace;fill:#1f2a1d;letter-spacing:10px">NANCY</text>
  <circle class="led" cx="1300" cy="680" r="20" style="fill:#c84a3a"/><rect x="700" y="660" width="140" height="36" rx="18" style="fill:#45494f"/></g>
</g>`;
const phoneInsert = () => `<g id="insPhone" class="set">
  <rect width="1920" height="1080" style="fill:#d8b47c"/>${grain}
  <rect x="680" y="60" width="560" height="1000" rx="64" style="fill:#16181c" ${S}/>
  <rect x="706" y="88" width="508" height="944" rx="44" style="fill:#2c3e5c"/>
  <text x="960" y="200" text-anchor="middle" style="font:300 96px var(--ui);fill:#f3ead8">9:41</text>
  <g class="notif" transform="translate(0 0)"><rect x="730" y="290" width="460" height="300" rx="30" style="fill:#f3ead8" ${S}/>
    <rect x="756" y="316" width="44" height="44" rx="10" style="fill:#4f8a5b"/><path d="M766 348 L778 334 L786 342 L792 326" style="fill:none;stroke:#fff;stroke-width:4;stroke-linecap:round"/>
    <text x="814" y="346" style="font:600 24px var(--ui);fill:#7a8691">Portfolio · now</text>
    <text x="760" y="410" style="font:700 40px var(--ui);fill:${INK}">INVESTMENT</text><text x="760" y="456" style="font:700 40px var(--ui);fill:${INK}">CONFIRMED</text>
    <polyline class="chart" points="760,560 810,540 860,550 910,510 960,520 1010,470 1070,440 1140,400" style="fill:none;stroke:#4f8a5b;stroke-width:8;stroke-linejoin:round;stroke-linecap:round"/></g>
</g>`;
const msgInsert = () => `<g id="insMsg" class="set">
  <rect width="1920" height="1080" style="fill:#cfd8de"/>${grain}
  ${phoneUI('phB', 960, 540, 'George', 780, 1040)}
</g>`;
const kitchenPhoneInsert = () => `<g id="insKPhone" class="set">${cam(`
  <rect x="-200" y="-200" width="2320" height="1480" style="fill:#c9b48a"/>
  ${phoneUI('phK', 960, 540, 'Luca', 780, 1040)}`)}${grain}
</g>`;
const titleCard = () => `<g id="title" class="set"><rect width="1920" height="1080" style="fill:#16181c"/>
  <text class="t1" x="960" y="500" text-anchor="middle" style="font:600 92px var(--ui);fill:#f3ead8;letter-spacing:2px">Latest-Generation Golf</text>
  <text class="t2" x="960" y="590" text-anchor="middle" style="font:500 36px var(--ui);fill:#c9b48a;letter-spacing:8px">A SHORT FILM ABOUT LUCA AND GEORGE</text></g>`;
const black = `<rect id="black" width="1920" height="1080" style="fill:#000" opacity="0" pointer-events="none"/>`;
