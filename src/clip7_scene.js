function buildFilm() {
  tl.set(q('.set:not(#setA)'), { autoAlpha: 0 }, 0);
  silent(2.7, 8.6); silent(18.1, 19.9);
  camTo('setA', 960, 600, 1, 0);
  // George mid-verdict
  arm('G1', 'L', 8, -20, 0, 0); op('#G1 .handL', 0, 0);
  arm('G1', 'R', -48, -36, 0, 0); look('G1', .6, .4, 0, 0); look('L1', -.2, 0, 0, 0);
  say('G1', .4, 2.4, '“…a Golf. At best.”');
  arm('G1', 'R', -62, -48, .7, .3, 'back.out(1.6)');
  mouth('G1', 'smirk', 1.8); look('G1', 1, -.2, 1.7, .2); brow('G1', 'R', .5, 1.8);
  cameo(2.4);
  // the stare
  camTo('setA', 1380, 640, 2.6, 2.8);
  look('L1', -1, -.1, 3.1, .4); head('L1', -5, 3.6, .4); brow('L1', 'R', 1.4, 4.2, .3);
  // George reconsiders
  camTo('setA', 970, 640, 1.6, 5.2);
  look('G1', 1, 0, 5.3, .2); look('G1', -.1, .9, 5.8, .3); look('G1', 1, 0, 6.4, .3);
  mouth('G1', 'smile', 6.4); mouth('G1', 'flat', 6.8); brow('G1', 'R', 0, 6.7);
  arm('G1', 'R', 0, 0, 6.8, .5);
  say('G1', 7.2, 9.1, '“That sounded better in my head.”');
  tl.set(q('#L1 .lids'), { attr: { opacity: 1 } }, 9.3); tl.set(q('#L1 .lids'), { attr: { opacity: 0 } }, 9.7);
  brow('L1', 'R', 0, 9.3, .3); head('L1', 0, 9.3, .3);
  nod('L1', 9.9, 1, 4);
  // coat from off-screen
  camTo('setA', 1060, 640, 1.45, 10.3);
  arm('L1', 'R', -100, 0, 10.4, .3);
  tl.fromTo(q('.flyCoat'), { attr: { opacity: 1, transform: 'translate(2100 600)' } }, { attr: { transform: 'translate(1470 600)' }, duration: .3, ease: 'power2.out' }, 10.55);
  fx('fwip', 10.85);
  tl.to(q('#L1 .lean'), { attr: { transform: 'rotate(-12)' }, duration: .1, yoyo: true, repeat: 3 }, 10.85);
  op('.flyCoat', 0, 11.0); op('#L1 .coat, #L1 .cS', 1, 11.0);
  arm('L1', 'R', 0, 0, 11.0, .3);
  arm('L1', 'L', 20, -95, 11.4, .3); op('#L1 .pClip', 1, 11.6); fx('pop', 11.6);
  arm('L1', 'R', -20, 95, 11.8, .3); op('#L1 .pPen', 1, 12.0); fx('click', 12.05);
  look('G1', 1, .3, 10.6, .2); look('G1', 1, .6, 11.6, .2); look('G1', 1, .4, 12.0, .2); brows('G1', .5, 11.0);
  say('G1', 12.4, 13.9, '“What are you doing?”');
  camTo('setA', 1380, 640, 2.5, 14.0);
  look('L1', -.8, -1, 14.0, .2); brows('L1', -.3, 14.0); head('L1', 4, 14.0, .3);
  say('L1', 14.2, 15.9, '“Checking your eyesight.”');
  camTo('setA', 560, 610, 2.4, 16.0);
  brows('G1', 0, 16.0);
  arm('G1', 'R', 105, 108, 16.1, .3); op('#G1 .handL', 1, 16.1);
  say('G1', 16.4, 18.1, '“These glasses cost a fortune.”');
  arm('G1', 'R', 0, 0, 18.2, .3); head('G1', -5, 18.2, .4); mouth('G1', 'smile', 18.3);
  camTo('setA', 1380, 640, 2.5, 18.5);
  look('L1', -.8, -.9, 18.6, .3); head('L1', 0, 18.6, .3); look('L1', -1, .1, 19.1, .3);
  say('L1', 19.5, 20.4, '“And yet.”');
  look('L1', -.3, 1, 20.8, .2); head('G1', 0, 20.8, .3);
  // clipboard insert
  cut('insClip', 21.2); tl.set(q('#insClip .pen'), { attr: { transform: 'translate(401 358)' } }, 21.2);
  writeLine(1, 380, 21.5, 1.1);
  writeLine(2, 500, 22.9, 1.4);
  underline(2, 'unaffected', 24.4, .4);
  op('#L1 .pcl1, #L1 .pcl2', 1, 24.8);
  pos('.georgePeek', 1760, 560, 25.0, .5, 'power2.out'); look('GP', -1, .6, 25.2, .2);
  tl.to(q('.board'), { attr: { transform: 'translate(-160 30) rotate(-8)' }, duration: .4, ease: 'power2.inOut' }, 25.9);
  brows('GP', .4, 26.2);
  // the correction
  cut('setA', 26.9); camTo('setA', 970, 640, 1.6, 26.9);
  look('G1', 1, .2, 26.9, 0); brows('G1', 0, 26.9, 0); mouth('G1', 'flat', 26.9);
  fx('tap', 27.1); tl.to(q('#L1 .pClip'), { attr: { transform: 'translate(-4 52.7) rotate(-10) scale(1 .2)' }, duration: .15 }, 27.1);
  op('#L1 .pClip, #L1 .pPen', 0, 27.3); arm('L1', 'L', 0, 0, 27.3, .3); arm('L1', 'R', 0, 0, 27.3, .3);
  camTo('setA', 960, 620, 1.05, 27.4, .5);
  walkTo('L1', 900, 960, 27.6, 1.4);
  look('G1', 1, 0, 27.6, .3); look('G1', .6, .1, 28.4, .4);
  op('#L1', 0, 29.1); op('#car1 .driver', 1, 29.1); fx('door', 29.05);
  tl.to(q('#car1 .mirror'), { attr: { transform: 'rotate(-12 -20 -206)' }, duration: .25, yoyo: true, repeat: 1 }, 29.4);
  camTo('setA', 900, 650, 1.8, 29.8);
  mouth('car1D', 'flat', 29.8);
  say('car1D', 30.0, 32.2, '“A brand-new Golf. Latest model.”');
  camTo('setA', 740, 650, 1.6, 32.3);
  nod('G1', 32.4, 1, 3);
  say('G1', 32.7, 34.4, '“Right. Important distinction.”');
  mouth('car1D', 'smirk', 34.5);
  arm('G1', 'L', 30, -50, 34.6, .3); arm('G1', 'R', -30, 50, 34.6, .3); op('#G1 .handL', 1, 34.6);
  fx('beepbeep', 35.1); tl.to(q('#car1 .body'), { attr: { transform: 'translate(0 -6)' }, duration: .08, yoyo: true, repeat: 3 }, 35.1);
  mouth('G1', 'laugh', 35.3); mouth('G1', 'smirk', 35.6); blush('G1', true, 35.3); look('G1', -.2, .4, 35.6, .2);
  camTo('setA', 960, 600, 1, 36.0);
  arm('G1', 'L', 0, 0, 36.0, .3); arm('G1', 'R', 0, 0, 36.0, .3);
  fx('engine', 36.1, 1.5);
  tl.to(q('#car1'), { attr: { transform: 'translate(-2100 0)' }, duration: 1.6, ease: 'power2.in' }, 36.2);
  wheelSpin('car1', -1100, 36.2, 1.6);
  look('G1', -1, .2, 36.3, .5);

  /* ---------------- SCENE 2 · A quiet year at Oxford (interactive) ---------------- */
  const T2 = 38.4;
  cut('setB', T2); camTo('setB', 960, 560, 1, T2);
  op('#car2 .driver', 1, T2); op('#L2', 0, T2); op('.bLaw', 0, T2);
  fx('engine', T2, 1.6);
  pos('#car2wrap', 0, 0, T2, 1.8, 'power2.out'); wheelSpin('car2', 1100, T2, 1.8);
  op('#car2 .driver', 0, T2 + 2.2); fx('door', T2 + 2.15);
  pos('#L2', 1000, 1010, T2 + 2.2, 0); op('#L2', 1, T2 + 2.2);
  pos('.pile', 1000, 880, T2 + 2.2, 0); op('.bLaw', 1, T2 + 2.2);
  holdPile('L2', T2 + 2.2, 0);
  mouth('L2', 'smile', T2 + 2.2); brows('L2', .3, T2 + 2.2, 0);
  walkTo('L2', 820, 1010, T2 + 2.4, .9); pos('.pile', 820, 880, T2 + 2.4, .9, 'sine.inOut');
  camTo('setB', 860, 640, 1.6, T2 + 3.4);
  say('L2', T2 + 3.6, T2 + 5.6, '“This year, I’m going to focus.”');
  walkTo('L2', 740, 1010, T2 + 5.8, .5); pos('.pile', 740, 880, T2 + 5.8, .5, 'sine.inOut');
  // TAP 1 · MDU
  const P1 = T2 + 7.2;
  hover('.bMdu', 'translate(0 -330)', T2 + 6.6);
  waitTap(P1, 'Add the MDU job');
  drop('.bMdu', 'translate(0 -330)', P1);
  fx('thudDull', P1 + .35); tl.to(q('#L2 > .sc'), { attr: { transform: 'scale(1 0.97)' }, duration: .08, yoyo: true, repeat: 1 }, P1 + .35);
  look('L2', 0, 1, P1 + .6, .25); mouth('L2', 'flat', P1 + .7); brows('L2', 0, P1 + .7);
  tl.to(q('#setB > .cam'), { filter: 'saturate(.3) brightness(.9)', duration: .35 }, P1 + .8);
  tl.to(q('#setB > .cam'), { filter: 'saturate(1) brightness(1)', duration: 1.2 }, P1 + 2.2);
  nose('L2', P1 + 1.4);
  // TAP 2 · Junior Dean keys
  const P2 = P1 + 3.4;
  hover('.bKeys', 'translate(-30 -274)', P1 + 2.8);
  waitTap(P2, 'Add the Junior Dean keys');
  drop('.bKeys', 'translate(-30 -274)', P2);
  fx('jangle', P2 + .3); look('L2', .2, 1, P2 + .4, .2);
  // TAP 3 · the pager
  const P3 = P2 + 1.8;
  hover('.bPager', 'translate(58 -340)', P2 + 1.2);
  waitTap(P3, 'Add the hospital pager');
  drop('.bPager', 'translate(58 -340)', P3);
  fx('pager', P3 + .4); tl.set(q('#setB .pagerScr'), { fill: '#b9d9a8' }, P3 + .4);
  cut('insPager', P3 + .8); shake('#insPager .pagerBig', P3 + .8); fx('pager', P3 + 1.2);
  cut('setB', P3 + 2.4); tl.set(q('#setB .pagerScr'), { fill: '#5d6b5a' }, P3 + 2.4);
  look('L2', -.4, 1, P3 + 2.5, .2); look('L2', .4, 1, P3 + 3.0, .25); look('L2', 0, 0, P3 + 3.5, .3);
  say('L2', P3 + 3.9, P3 + 5.9, '“It’s fine. I’ll figure it out.”');
  tl.to(q('.pile'), { attr: { transform: 'translate(744 876)' }, duration: .12, yoyo: true, repeat: 3 }, P3 + 6.1);
  fx('notify', P3 + 6.6);
  cut('insPhone', P3 + 6.9); tl.from(q('#insPhone .notif'), { attr: { transform: 'translate(0 -320)' }, duration: .45, ease: 'back.out(1.6)', immediateRender: false }, P3 + 6.9);
  const B = P3 + 8.9;
  cut('setB', B + 0.0); camTo('setB', 760, 600, 1.15, B + 0.0);
  walkTo('G2', 470, 1010, B + 0.0, 1.8); swingArms('G2', B + 0.0, B + 1.8);
  look('G2', 1, .5, B + 1.9, .25); brows('G2', .9, B + 2.3, .2); mouth('G2', 'o', B + 2.3);
  camTo('setB', 610, 640, 1.6, B + 2.6);
  say('G2', B + 2.9, B + 5.2, '“Hang on. You actually invest?”');
  look('L2', -1, 0, B + 5.3, .25); half('L2', true, B + 5.9);
  say('L2', B + 6.3, B + 8.4, '“Yes, George. I’ve told you.”');
  half('L2', false, B + 8.6); mouth('G2', 'smile', B + 8.6); brows('G2', .2, B + 8.6);
  lean('G2', 3, B + 8.7, .4); tl.to(q('#G2 > .sc'), { attr: { transform: 'scale(1.03 1.03)' }, duration: .4 }, B + 8.7);
  arm('G2', 'R', -15, 115, B + 8.8, .4);
  say('G2', B + 9.1, B + 11.1, '“I worked at a hedge fund.”');
  pos('.nameplate', 150, 470, B + 9.6, 0); op('.nameplate', 1, B + 9.6); tl.from(q('.nameplate > g'), { attr: { transform: 'translate(0 40)' }, duration: .3, ease: 'back.out(2)' }, B + 9.6); fx('pop', B + 9.6);
  arm('G2', 'R', 0, 0, B + 11.3, .3);
  tl.to(q('.pile'), { attr: { transform: 'translate(740 872)' }, duration: .3 }, B + 11.4);
  say('L2', B + 11.6, B + 13.6, '“And where’s your money?”');
  mouth('G2', 'o', B + 14.0); mouth('G2', 'flat', B + 14.6); look('G2', -1, .2, B + 15.0, .3);
  lean('G2', -1, B + 15.0, .4); tl.to(q('#G2 > .sc'), { attr: { transform: 'scale(1 1)' }, duration: .5 }, B + 15.0);
  mouth('G2', 'sheep', B + 15.6); brows('G2', .6, B + 15.6);
  say('G2', B + 15.8, B + 17.6, '“…a savings account.”');
  cameo(B + 17.8);
  pos('.nameplate', -700, 470, B + 18.0, .6, 'power2.in');
  look('L2', -1, .1, B + 18.2, .2); nod('L2', B + 19.0, 1, 4);

  // CBDCs, still on Broad Street
  const C = B + 20.6;
  camTo('setB', 610, 640, 1.6, C);
  say('L2', C + .3, C + 2.9, '“Anyway. What do you think about stablecoins?”');
  mouth('G2', 'grin', C + 3.1); brows('G2', .5, C + 3.1); look('G2', 1, 0, C + 3.1, .2);
  arm('G2', 'R', -60, -90, C + 3.2, .3);
  say('G2', C + 3.5, C + 5.7, '“Well, when I was at the IMF—”');
  op('#counterO', 1, C + 4.9); tl.fromTo(q('#counterO > g'), { attr: { transform: 'translate(1600 70)' } }, { attr: { transform: 'translate(1600 110)' }, duration: .3, ease: 'back.out(2)', immediateRender: false }, C + 4.9); fx('pop', C + 4.9);
  fx('ding', C + 5.8); op('#counterO .c103', 0, C + 5.8); op('#counterO .c104', 1, C + 5.8);
  look('L2', 1, -1, C + 6.2, .2); look('L2', -1, 0, C + 6.8, .25);
  say('L2', C + 7.2, C + 9.0, '“That bit I remember.”');
  arm('G2', 'R', 0, 0, C + 9.2, .4); mouth('G2', 'smirk', C + 9.2); blush('G2', true, C + 9.2);
  op('#counterO', 0, C + 9.9, .4); blush('G2', false, C + 10.6);
  // the "lawyer job"
  arm('G2', 'R', -80, -10, C + 10.4, .4); look('G2', 1, .6, C + 10.4, .2);
  op('.bMdu', 0, C + 10.8); op('#G2 .gMdu', 1, C + 10.8); fx('swish', C + 10.8);
  arm('G2', 'R', -30, 60, C + 11.0, .4); look('G2', .3, 1, C + 11.3, .3);
  say('G2', C + 11.8, C + 14.4, '“So remind me. This is the lawyer job?”');
  silent(C + 14.4, C + 17.2);
  camTo('setB', 740, 650, 2.4, C + 14.6);
  look('L2', -.5, .4, C + 15.0, .5); look('L2', -1, 0, C + 15.8, .6);
  op('#L2 .pClip', 1, C + 16.6); op('#L2 .pcl1, #L2 .pcl2', 1, C + 16.6); fx('swish', C + 16.6);
  cut('insClip', C + 17.2);
  tl.set(q('.board'), { attr: { transform: 'translate(0 0) rotate(0)' } }, C + 17.2);
  pos('.georgePeek', 2200, 520, C + 17.2, 0);
  tl.set(q('.cv1, .cv2'), { attr: { width: 0 } }, C + 17.2);
  tl.set(q('#insClip .uline'), { strokeDashoffset: 0 }, C + 17.2);
  writeLine(3, 620, C + 17.7, 1.2);
  tl.to(q('#insClip .pen'), { attr: { transform: 'translate(1500 760)' }, duration: .4 }, C + 19.1);
  pos('.georgePeek', 1700, 560, C + 19.2, .6, 'power2.out'); look('GP', -1, .7, C + 19.4, .2); brows('GP', -.2, C + 19.8); mouth('GP', 'sheep', C + 20.0);
  fx('pager', C + 20.8);
  cut('insPager', C + 21.1); shake('#insPager .pagerBig', C + 21.1);
  cut('setB', C + 22.4); camTo('setB', 610, 640, 1.6, C + 22.4);
  look('L2', .4, 1, C + 22.5, .2); fx('tap', C + 23.0); op('#L2 .pClip', 0, C + 23.2);
  look('L2', -1, 0, C + 23.4, .2);
  say('L2', C + 23.7, C + 26.1, '“I’m going to see Nancy. She listens.”');
  // doctor mode: coat on, and he rushes off to Nancy
  fx('fwip', C + 26.4); tl.to(q('#L2 .lean'), { attr: { transform: 'rotate(-10)' }, duration: .1, yoyo: true, repeat: 3 }, C + 26.4);
  op('#L2 .coat, #L2 .cS', 1, C + 26.6); mouth('L2', 'flat', C + 26.6); brows('L2', -.6, C + 26.6);
  camTo('setB', 760, 640, 1.25, C + 26.8, .6);
  say('L2', C + 27.0, C + 28.6, '“Move away! I’m a doctor!”');
  walkTo('L2', 1700, 1010, C + 27.0, 1.5); pos('.pile', 1700, 880, C + 27.0, 1.5, 'sine.inOut');
  look('G2', 1, 0, C + 27.1, .3); brows('G2', .8, C + 27.1); mouth('G2', 'o', C + 27.3);
  say(null, C + 28.8, C + 30.2, '(off-screen) “Move away! I’m a doctor!!!”');
  say(null, C + 30.4, C + 33.0, '(off-screen) “Nobody knows medicine better than me. NOBODYYY.”');
  mouth('G2', 'flat', C + 30.6); look('G2', .3, .6, C + 31.6, .4); blink('G2', C + 32.0);
  pos('.reachHand', 590, 800, C + 33.3, .45, 'power2.out');
  op('#G2 .gMdu', 0, C + 33.8); op('.rhMdu', 1, C + 33.8); fx('swish', C + 33.8);
  pos('.reachHand', 2300, 800, C + 34.0, .45, 'power2.in');
  look('G2', 1, .2, C + 34.0, .2); arm('G2', 'R', 0, 0, C + 34.2, .4); brows('G2', .5, C + 34.2); mouth('G2', 'flat', C + 34.2);
  fx('jangle', C + 34.7);
  const END = C + 35.8;
  silent(P1 + .7, P1 + 2.4); silent(B + 15.6, B + 20.0);

  /* ---------------- SCENE 3 · Bob (interactive wipe) ---------------- */
  const T3 = END + .4;
  cut('setD', T3); camTo('setD', 1030, 690, 1.55, T3);
  op('#BOB', 0, T3);
  const WALK = T3 + 11.4;
  tl.fromTo(q('#setD .scroll'), { attr: { transform: 'translate(0 0)' } }, { attr: { transform: 'translate(-1100 0)' }, duration: WALK - T3, ease: 'none' }, T3);
  tl.fromTo(q('#setD .bus'), { attr: { transform: 'translate(2400 0)' } }, { attr: { transform: 'translate(-900 0)' }, duration: 9, ease: 'none' }, T3 + 1);
  walkCycle('G4', T3, WALK, true); walkCycle('L4', T3, WALK, false);
  look('G4', 1, 0, T3, 0); look('L4', -1, 0, T3, 0);
  say('L4', T3 + .5, T3 + 3.1, '“…so that’s separate from the Oxford work.”');
  arm('L4', 'L', 20, -60, T3 + .5, .3); rot('#L4 .foreL', -40, T3 + 1.2, .25); rot('#L4 .foreL', -70, T3 + 1.8, .25); rot('#L4 .foreL', -50, T3 + 2.4, .25); arm('L4', 'L', 0, 0, T3 + 3.2, .3);
  nod('G4', T3 + 3.3, 3, 6);
  say('G4', T3 + 3.6, T3 + 5.8, '“Yes. Obviously. I’m listening.”');
  arm('G4', 'R', 105, 108, T3 + 6.0, .3); arm('G4', 'R', 0, 0, T3 + 6.6, .3); brows('G4', .6, T3 + 6.7); mouth('G4', 'flat', T3 + 6.7);
  look('L4', -1, .2, T3 + 7.0, .2); half('L4', true, T3 + 7.1); half('L4', false, T3 + 7.9);
  // Bob walks towards them and past
  op('#BOB', 1, T3 + 7.4);
  tl.fromTo(q('#BOB'), { attr: { transform: 'translate(1950 960)' } }, { attr: { transform: 'translate(560 1000)' }, duration: 4.6, ease: 'none', immediateRender: false }, T3 + 7.4);
  tl.fromTo(q('#BOB > .sc'), { attr: { transform: 'scale(.62 .62)' } }, { attr: { transform: 'scale(.8 .8)' }, duration: 4.6, ease: 'none', immediateRender: false }, T3 + 7.4);
  walkCycle('BOB', T3 + 7.4, T3 + 12.0, false, .6, false);
  look('L4', 1, -.2, T3 + 8.2, .2);
  say('L4', T3 + 8.8, T3 + 9.6, '“Bob.”');
  look('G4', 1, -.2, T3 + 9.9, .08); head('G4', -9, T3 + 9.9, .1, 'power3.out');
  say('G4', T3 + 10.1, T3 + 10.9, '“Where?”');
  mouth('L4', 'smirk', T3 + 10.9); look('L4', -1, 0, T3 + 10.9, .2);
  // George keeps staring as Bob passes; drool
  look('G4', -.4, -.1, T3 + 11.6, .5); head('G4', 4, T3 + 11.6, .5); mouth('G4', 'o', T3 + 11.4); brows('G4', .7, T3 + 11.4);
  op('#G4 .drool', 1, T3 + 11.8, .4);
  camTo('setD', 900, 650, 3.0, T3 + 12.4, .7, 'power2.inOut');
  // INTERACTIVE: wipe the drool
  const PW = T3 + 13.4;
  silent(T3 + 11.3, PW + 3.0);
  tl.addPause(PW, () => { setPlaying(false); startWipe('Wipe George’s drool: drag across his mouth'); });
  op('#G4 .drool', 0, PW + .05);
  camTo('setD', 1030, 690, 1.55, PW + .5, .6);
  op('#BOB', 0, PW + .5);
  head('G4', 0, PW + .6, .25); look('G4', 1, 0, PW + .6, .2); brows('G4', -.8, PW + .6); mouth('G4', 'flat', PW + .6);
  say('G4', PW + 1.2, PW + 2.8, '“I wasn’t staring.”');
  cameo(PW + 2.9);
  mouth('L4', 'smirk', PW + 3.0); half('L4', true, PW + 3.1);
  // street sign wipe to Edinburgh
  const END3 = PW + 4.6;
  tl.fromTo(q('#edSignO'), { attr: { transform: 'translate(2800 0)' } }, { attr: { transform: 'translate(-900 0)' }, duration: 1.6, ease: 'power1.inOut', immediateRender: false }, END3 - .4);
  fx('swish', END3);

  /* ---------------- SCENE 4 · Protecting humankind (Edinburgh, short) ---------------- */
  const S = END3 + .4;
  cut('setE', S); camTo('setE', 670, 690, 3.0, S);
  look('G5', .2, 1, S, 0); mouth('G5', 'smile', S);
  tl.to(q('#setE .lidR'), { attr: { transform: 'scale(1 0.06)' }, duration: .3, ease: 'power2.in' }, S + .5); fx('click', S + .8);
  mouth('G5', 'grin', S + .9);
  camTo('setE', 820, 640, 2.2, S + 1.2);
  arm('G5', 'R', -38, -60, S + 1.2, .35); op('#G5 .pMap', 1, S + 1.3); fx('flip', S + 1.3);
  look('G5', .3, .6, S + 1.3, .2);
  say('G5', S + 1.6, S + 2.8, '“Right. Hiking.”');
  look('G5', 1, -.3, S + 2.9, .2);
  camTo('setE', 1080, 600, 1.15, S + 3.0);
  look('L5', -1, .5, S + 3.1, .25); look('L5', -1, -.6, S + 3.5, .25); head('L5', -4, S + 3.5, .25); look('L5', -1, .2, S + 3.9, .25); head('L5', 0, S + 3.9, .25);
  walkTo('L5', 1000, 1000, S + 4.2, .8);
  arm('L5', 'L', 50, -40, S + 5.0, .3); op('#G5 .pMap', 0, S + 5.3); op('#L5 .pMap', 1, S + 5.3); fx('flip', S + 5.3); arm('G5', 'R', 0, 0, S + 5.3, .35);
  arm('L5', 'L', 20, -80, S + 5.4, .3);
  say('L5', S + 5.5, S + 7.4, '“No. We need to think about your safety.”');
  look('G5', 1, -.4, S + 7.4, .2); brows('G5', -.3, S + 7.4); mouth('G5', 'flat', S + 7.4);
  say('G5', S + 7.6, S + 8.9, '“It’s a hill, Luca.”');
  look('L5', -.3, 1, S + 9.0, .2); brows('L5', -.5, S + 9.0);
  say('L5', S + 9.1, S + 11.0, '“You’re too important for humankind.”');
  brows('G5', .7, S + 11.1); mouth('G5', 'smile', S + 11.1); lean('G5', -2, S + 11.1, .3); tl.to(q('#G5 > .sc'), { attr: { transform: 'scale(1.03 1.03)' }, duration: .3 }, S + 11.1);
  look('L5', -1, -.2, S + 11.2, .2); brows('L5', 0, S + 11.2);
  say('L5', S + 11.4, S + 13.5, '“You’re in line for a Nobel Prize, remember?”');
  mouth('G5', 'smirk', S + 13.6); blush('G5', true, S + 13.6); look('G5', -.4, .5, S + 13.6, .25);
  say('G5', S + 13.8, S + 14.4, '“Well—”');
  say('L5', S + 14.4, S + 15.2, '“Exactly.”');
  // the map: Arthur's Seat → café
  arm('L5', 'L', 0, 0, S + 15.3, .3); op('#L5 .pMap', 0, S + 15.5); op('#setE .mapOnDesk', 1, S + 15.5); fx('flip', S + 15.5);
  camTo('setE', 790, 745, 4.0, S + 15.6);
  tl.fromTo(q('#setE .mapOnDesk > g'), { attr: { transform: 'translate(820 772) rotate(-6)' } }, { attr: { transform: 'translate(820 772) rotate(20)' }, duration: .5, ease: 'power2.inOut', immediateRender: false }, S + 15.7);
  op('#setE .tapF', 1, S + 16.3); pos('#setE .tapF', 899, 730, S + 16.3, 0); pos('#setE .tapF', 783, 727, S + 16.4, .4);
  fx('tap', S + 16.9); tl.to(q('#setE .tapF circle'), { attr: { r: 11 }, duration: .08, yoyo: true, repeat: 1 }, S + 16.9);
  fx('tap', S + 17.3); tl.to(q('#setE .tapF circle'), { attr: { r: 11 }, duration: .08, yoyo: true, repeat: 1 }, S + 17.3);
  tl.to(q('#setE .mapCafe'), { attr: { r: 14 }, duration: .2, yoyo: true, repeat: 3 }, S + 16.9);
  const END4 = S + 18.4;

  tl.to(q('#black'), { attr: { opacity: 1 }, duration: .9 }, END4);
  /* ---------------- SCENE 7 · Your seat (ending, interactive) ---------------- */
  const S7 = END4 + 1.3;
  cut('setJ', S7); camTo('setJ', 820, 760, 1.15, S7);
  tl.to(q('#black'), { attr: { opacity: 0 }, duration: 1.0 }, S7);
  look('G9', .4, -.6, S7, 0); mouth('G9', 'flat', S7);
  camTo('setJ', 730, 900, 1.75, S7 + .1, 4.0, 'sine.inOut');
  look('G9', 1, .5, S7 + 2.0, .4); head('G9', 6, S7 + 2.0, .4);
  look('G9', .4, -.6, S7 + 3.2, .4); head('G9', 0, S7 + 3.2, .4);
  arm('G9', 'R', -40, 120, S7 + 3.8, .4); op('#G9 .pPhone', 1, S7 + 4.0); look('G9', .3, 1, S7 + 4.2, .2);
  const k1 = addMsg('phK', true, 'Stop ignoring me.');
  const k2 = addMsg('phK', true, 'Your seat next to me is still free. Concert, eventually?');
  cut('insKPhone', S7 + 4.8); camTo('insKPhone', 960, 540, 1, S7 + 4.8);
  showMsg(k1, S7 + 5.4, 'send'); showMsg(k2, S7 + 7.0, 'send');
  const PA = S7 + 9.4;
  tl.addPause(PA, () => { setPlaying(false); startAsk(); });
  // after Yes
  cut('setJ', PA + .3); camTo('setJ', 730, 900, 1.75, PA + .3);
  op('#G9 .pPhone', 0, PA + .3); arm('G9', 'R', 0, 0, PA + .3, 0);
  fx('notify', PA + .3);
  look('G9', .3, 1, PA + .4, 0); mouth('G9', 'smile', PA + 1.0); brows('G9', .4, PA + 1.0); nod('G9', PA + 1.4, 1, 4);
  look('G9', 1, .6, PA + 2.2, .3); head('G9', 5, PA + 2.2, .3);
  arm('G9', 'L', -70, -20, PA + 2.6, .4); arm('G9', 'L', 0, 0, PA + 3.4, .4);
  tl.to(q('#setJ .prog'), { attr: { transform: 'translate(810 1062) rotate(0)' }, duration: .3 }, PA + 3.0);
  op('#setJ #stJ', 1, PA + 3.5); tl.fromTo(q('#stJ > .sc'), { attr: { transform: 'scale(.1 .1)' } }, { attr: { transform: 'scale(.5 .5)' }, duration: .4, ease: 'back.out(2.4)', immediateRender: false }, PA + 3.5); fx('pop', PA + 3.5); fx('sip', PA + 4.0, 1.6);
  look('G9', 1, .6, PA + 3.6, .2); brows('G9', .5, PA + 3.6);
  head('G9', 0, PA + 4.4, .3); look('G9', .3, -.8, PA + 4.4, .3);
  camTo('setJ', 900, 720, 1.05, PA + 4.0, 3.2, 'sine.inOut');
  tl.to(q('#setJ .dim'), { opacity: .45, duration: 2.0 }, PA + 4.6);
  const END7 = PA + 7.6;
  tl.to(q('#black'), { attr: { opacity: 1 }, duration: 1.4 }, END7);
  tl.call(() => { if (soundOn && ac) { const t = ac.currentTime; [41, 53, 60, 64, 67, 72].forEach((m, i) => piano(m, t + i * .09, .45, 5)); } }, null, END7);
  silent(END7 - .1, END7 + 30);
  tl.to({}, { duration: .1 }, END7 + 2.4);
  [[S7 + 1.2, 'G9'], [S7 + 3.0, 'G9'], [PA + 1.8, 'G9'], [PA + 5.0, 'G9']].forEach(([t, w]) => blink(w, t));
  [[S + 4.4, 'G5'], [S + 9.6, 'G5'], [S + 6.8, 'L5'], [S + 12.6, 'L5']].forEach(([t, w]) => blink(w, t));
  [[T3 + 2.0, 'G4'], [T3 + 4.2, 'L4'], [T3 + 7.0, 'G4'], [PW + 3.6, 'G4']].forEach(([t, w]) => blink(w, t));
  [[T2 + 4.6, 'L2'], [B + 4.0, 'G2'], [B + 7.0, 'G2'], [B + 12.0, 'G2'], [C + 1.6, 'G2'], [C + 8.0, 'L2']].forEach(([t, w]) => blink(w, t));

  /* ---------- the score, scene by scene ---------- */
  // 1 · jaunty pizzicato (F major)
  { const ch = [[41, [65, 69, 72]], [38, [62, 65, 69]], [46, [58, 62, 65]], [36, [60, 64, 67]]];
    const mel = [77,0,81,0,84,0,81,0, 79,0,77,0,74,0,0,0, 74,0,77,0,82,0,77,0, 76,74,72,0,0,0,0,0];
    sec(0, T2 - .2, .25, (n, at, v) => { const [b, c] = ch[Math.floor(n / 8) % 4], i = n % 8;
      if (i === 0) INST.pbass(b, at, v); if (i === 4) INST.pbass(b + 7, at, v);
      if (i === 2 || i === 6) c.forEach(m => INST.pizz(m, at, v * .6));
      const m = mel[n % 32]; if (m) INST.pizz(m, at, v); }); }
  // 2 · Bach, Prelude in C, on harpsichord (Oxford)
  { const ch = [[48,52,55,60,64],[48,50,57,62,65],[47,50,55,62,65],[48,52,55,60,64],[48,52,57,64,69],[48,50,54,57,62],[47,50,55,62,67],[47,48,52,55,60]];
    const idx = [0,1,2,3,4,2,3,4,0,1,2,3,4,2,3,4];
    sec(T2, C + 26.3, .19, (n, at, v) => { const c = ch[Math.floor(n / 16) % 8]; INST.harp(c[idx[n % 16]], at, v * .8); }, .85); }
  // 2b · "Move away! I'm a doctor!" — hospital drama
  sec(C + 26.4, C + 34.6, .125, (n, at, v) => {
    if (n % 8 === 0 || n % 8 === 3) INST.thump(at, v);
    INST.stab(n % 2 ? 64 : 67, at, v * .7); if (n % 16 === 0) INST.str(52, at, 1.9, v * 1.3);
    if (n % 8 === 0) INST.beep(at + .02, v); if (n % 32 === 28) INST.str(71, at, .5, v); });
  // 3 · lounge jazz walk (Bob)
  { const ch = [[50, [53, 57, 60, 64]], [43, [53, 57, 59, 64]], [48, [52, 55, 59, 62]], [45, [55, 61, 64, 67]]];
    const walk = [[50,53,57,55],[43,47,50,52],[48,52,55,57],[45,49,52,55]];
    sec(T3, PW - .6, .3, (n, at, v) => { const bar = Math.floor(n / 8) % 4, i = n % 8, [r, c] = ch[bar];
      if (i % 2 === 0) INST.wbass(walk[bar][i / 2], at, v);
      if (i === 0 || i === 3) c.forEach(m => INST.rhodes(m, at + (i === 3 ? .1 : 0), v * .7));
      if (i % 2 === 1) INST.hat(at + .1, v); if (i % 4 === 2) INST.hat(at, v * .6);
      const t = T3 + n * .3; if (t > T3 + 7.4 && t < T3 + 11.2 && i === 0) INST.sax([69, 72, 71, 67][bar], at, 1.1, v); }); }
  // 4 · bagpipes (Edinburgh)
  { const jig = [69,71,73,76,73,71, 69,0,76,0,73,0, 74,73,71,69,71,73, 76,0,0,81,0,0];
    sec(S - .2, END4, .19, (n, at, v) => { if (n % 24 === 0) { INST.drone(45, at, .19 * 24 + .1, v); INST.drone(57, at, .19 * 24 + .1, v * .7); }
      const m = jig[n % 24]; if (m) INST.pipe(m, at, .17, v); }, .8); }
  // 5 · concert hall: orchestra tuning, then Pachelbel's Canon after Yes
  sec(S7 + .4, S7 + 4.6, .5, (n, at, v) => { if (n === 0) INST.oboe(69, at, 2.2, v); if (n === 3) { INST.str(57, at, 1.6, v); INST.str(64, at + .2, 1.4, v); }
    if (n === 5) { INST.str(62, at, 1.2, v * .8); INST.str(69, at + .1, 1.2, v * .8); INST.str(76, at + .3, 1.0, v * .6); } });
  sec(S7 + 4.6, PA, 2.4, (n, at, v) => { [[50, 57, 62, 66], [47, 54, 59, 62]][n % 2].forEach(m => INST.str(m, at, 2.3, v * .6)); });
  { const canon = [[50, 66], [45, 64], [47, 62], [42, 61], [43, 59], [38, 57], [43, 59], [45, 61]];
    sec(PA + .3, END7 + 1.6, .9, (n, at, v) => { const [b, m] = canon[n % 8]; INST.str(b, at, .85, v * 1.2); INST.str(b + 12, at, .85, v * .6); INST.str(m + 12, at, .85, v * .9); INST.harp(m + 12, at, v * .5); }); }
  [[1.3, 'G1'], [5.0, 'G1'], [12.2, 'L1'], [15.2, 'G1'], [31.0, 'G1'], [33.6, 'G1']].forEach(([t, w]) => blink(w, t));
}

/* interactive helpers */
function hover(sel, tr, t) {
  tl.set(q(sel), { attr: { opacity: 1, transform: tr } }, t);
  tl.fromTo(q(sel), { attr: { opacity: 0 } }, { attr: { opacity: 1 }, duration: .3, immediateRender: false }, t);
}
function drop(sel, from, t) {
  tl.fromTo(q(sel), { attr: { transform: from } }, { attr: { transform: 'translate(0 0)' }, duration: .32, ease: 'power3.in', immediateRender: false }, t + .05);
}
function waitTap(t, label) {
  tl.addPause(t, () => { setPlaying(false); startWait(label); });
}

function cameo(t) {
  tl.set(q('#stickO'), { attr: { opacity: 1 } }, t);
  tl.fromTo(q('#stickOi > .sc'), { attr: { transform: 'scale(.1 .1) rotate(-20)' } }, { attr: { transform: 'scale(1 1) rotate(-4)' }, duration: .35, ease: 'back.out(2.4)', immediateRender: false }, t);
  fx('pop', t); fx('sip', t + .35, .9);
  tl.to(q('#stickOi > .sc'), { attr: { transform: 'scale(1 1) rotate(4)' }, duration: .6, ease: 'sine.inOut' }, t + .45);
  tl.to(q('#stickOi > .sc'), { attr: { transform: 'scale(.1 .1) rotate(10)' }, duration: .25, ease: 'back.in(2)' }, t + 1.35);
  tl.set(q('#stickO'), { attr: { opacity: 0 } }, t + 1.62);
}
