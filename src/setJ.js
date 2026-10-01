/* ===================== SET J · concert hall (Royal Festival Hall style) ===================== */
const seat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-190" width="140" height="170" rx="22" style="fill:#9a2f2a" ${S}/><rect x="-58" y="-178" width="116" height="140" rx="16" style="fill:#b23a33"/><rect x="-82" y="-40" width="18" height="60" rx="6" style="fill:#5a3e28" ${s2}/><rect x="64" y="-40" width="18" height="60" rx="6" style="fill:#5a3e28" ${s2}/></g>`;
const seatFront = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-74" y="-36" width="148" height="44" rx="14" style="fill:#9a2f2a" ${S}/></g>`;
const musician = (x, y, inst) => `<g transform="translate(${x} ${y})"><rect x="-22" y="-30" width="44" height="34" rx="6" style="fill:#2a2522"/><circle cx="0" cy="-58" r="16" style="fill:#e3b08f"/><path d="M-26 -36 Q0 -50 26 -36 L22 0 L-22 0Z" style="fill:#1b1b1f"/><path d="M0 -12 L0 18" style="stroke:#555;stroke-width:3"/><rect x="18" y="-44" width="30" height="4" transform="rotate(-20 18 -44)" style="fill:#c9c3b6"/>${inst === 'cello' ? `<ellipse cx="-30" cy="-6" rx="16" ry="26" style="fill:#8a4a24" ${s2}/><path d="M-30 -32 L-30 -80" style="stroke:#3d2416;stroke-width:4"/>` : inst === 'violin' ? `<ellipse cx="18" cy="-60" rx="12" ry="7" transform="rotate(-25 18 -60)" style="fill:#a5582c"/>` : ''}</g>`;
const setJ = () => `<g id="setJ" class="set">${cam(`<g class="hall">
  <rect x="-400" y="-300" width="2720" height="1700" style="fill:#5e3a24"/>
  ${Array.from({ length: 40 }, (_, i) => `<rect x="${-400 + i * 70}" y="-300" width="34" height="900" style="fill:#6e4529"/>`).join('')}
  <path d="M-400 0 Q960 -140 2320 0 L2320 60 Q960 -80 -400 60Z" style="fill:#4a2c1a"/>
  ${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-150 + i * 280}" cy="${40 - Math.sin(i / 8 * Math.PI) * 80}" rx="60" ry="14" style="fill:#f3e2b0;opacity:.55"/>`).join('')}
  <rect x="160" y="200" width="1600" height="300" style="fill:#7a5236"/>
  ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 16 }, (_, c) => `<rect x="${180 + c * 98}" y="${210 + r * 46}" width="70" height="36" rx="8" style="fill:#8f2c28"/>`).join('')).join('')}
  <text x="960" y="186" text-anchor="middle" style="font:700 30px var(--ui);fill:#f3e2b0;letter-spacing:12px;opacity:.8">ROYAL FESTIVAL HALL</text>
  <path d="M100 560 L1820 560 L1920 700 L0 700Z" style="fill:#c99a62" ${S}/>
  ${[[300, 'cello'], [420, 'cello'], [600, 'violin'], [720, 'violin'], [840, 'violin'], [1080, 'violin'], [1200, 'violin'], [1320, 'violin'], [1500, 'cello'], [1620, 'cello']].map(([x, k]) => musician(x, 640, k)).join('')}
  <g transform="translate(960 640)"><rect x="-40" y="-20" width="80" height="24" style="fill:#3a2a20"/><circle cx="0" cy="-80" r="18" style="fill:#e3b08f"/><path d="M-26 -60 L26 -60 L22 -20 L-22 -20Z" style="fill:#111"/><path d="M20 -66 L60 -96" style="stroke:#f3ead8;stroke-width:3"/></g>
  <rect x="-400" y="700" width="2720" height="800" style="fill:#3e2618"/>
  ${Array.from({ length: 14 }, (_, i) => seat(-260 + i * 180, 820, .9)).join('')}
  ${[150, 310, 470, 640, 810, 970, 1130, 1290].map(x => seat(x, 1120, .95)).join('')}
  ${char('G9', GEO, 640, 1160, { seated: true, handR: PROP.phone(FO(GEO)) })}
  ${[150, 310, 470, 640, 810, 970, 1130, 1290].map(x => seatFront(x, 1120, .95)).join('')}
  <g class="prog" transform="translate(810 1062) rotate(-6)"><rect x="-46" y="-60" width="92" height="120" rx="4" style="fill:#f3ead8" ${s2}/><rect x="-46" y="-60" width="92" height="34" style="fill:#2c3e5c"/><text x="0" y="-36" text-anchor="middle" style="font:700 12px var(--ui);fill:#f3ead8;letter-spacing:2px">PROGRAMME</text>${[0, 1, 2, 3].map(k => `<path d="M-30 ${-6 + k * 14} h${50 + (k % 2) * 10}" style="stroke:#9aa3ab;stroke-width:5;stroke-linecap:round"/>`).join('')}</g>
  <g id="stJw" opacity="1">${stickerStraw('stJ', 810, 1010, .5).replace('<g id="stJ"', '<g id="stJ" opacity="0"')}</g>
  </g><rect class="dim" x="-400" y="-300" width="2720" height="1700" style="fill:#000;opacity:0" pointer-events="none"/>
`)}${grain}</g>`;
