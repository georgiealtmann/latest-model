# latest-model

A short interactive animated film George made for Luca: "Latest-Generation Golf".
It is a single self-contained web page: `index.html` (GSAP from cdnjs, Google Fonts; everything else inline, including the two stickers).

Runtime: ~2:55 of animation plus four interactive moments:
1. Scene 1 · the Golf (quiet street)
2. Scene 2 · Oxford, Pusey Street: tap to add the MDU job, Junior Dean keys, hospital pager; ends with "Move away! I'm a doctor!"
3. Scene 3 · Bob: drag/rub to wipe George's drool
4. Scene 4 · Edinburgh: "You're too important for humankind" → map to the café
5. Scene 5 · Royal Festival Hall: "Stop ignoring me. Your seat next to me is still free. Concert, eventually?" with a Yes button and a No button that runs away

## Current state

- **Offline.** GitHub Pages is switched off and this repo is **private** (taken down on 1 Oct 2026 at George's request).
- Old public URL (now 404): https://georgiealtmann.github.io/latest-model/
- A copy also exists as a Claude artifact: https://claude.ai/artifact/TtFqnt5bKxUQ9dUCH7ZRcC (sharing is controlled from that page's Share menu).

## Turn the website back ON

GitHub Pages on a free account only works from a public repo, so the repo must be made public again (it is unlisted: `noindex` meta tag + `robots.txt`).
Always confirm with George before making it public.

```bash
gh repo edit georgiealtmann/latest-model --visibility public --accept-visibility-change-consequences
gh api -X POST repos/georgiealtmann/latest-model/pages -f "source[branch]=main" -f "source[path]=/"
# wait ~1 minute, then check it returns 200:
curl -s -o /dev/null -w '%{http_code}\n' https://georgiealtmann.github.io/latest-model/
```

## Turn the website OFF again

```bash
gh api -X DELETE repos/georgiealtmann/latest-model/pages
gh repo edit georgiealtmann/latest-model --visibility private --accept-visibility-change-consequences
```

## Editing the film

Do not hand-edit `index.html`; edit `src/` and rebuild:

```bash
python3 tools/build.py          # writes index.html from src/
node tools/shoot.mjs check 1 60 160   # screenshots at those seconds into frames/check/ (needs Google Chrome, Node 22+)
```

Source layout (`src/`):
- `engine.js`: character drawing (GEO = George, LUCA = Luca; colours, glasses, hair), props, the Golf, phone UI
- `clip3_sets.js` + `setJ.js`: all backgrounds/sets (setA street, setB Oxford/Pusey Street, setD London street, setE Edinburgh flat, setJ concert hall, inserts)
- `clip7_scene.js`: **the timeline**. Every line of dialogue (`say(...)`), camera moves, interactive pauses (`waitTap`, `startWipe`, `startAsk`), sticker cameos (`cameo(t)`), and the per-scene score at the bottom
- `clip7_player.js`: player controls, tap/wipe/Yes-No interaction logic
- `audio7.js`: synthesized instruments, sound effects, music scheduler
- `scenes.js`: animation helpers + global overlays (IMF counter, EDINBURGH sign, sticker cameo)
- `shell.html` + `head.html`: page skeleton and CSS; `stk/`: the two real stickers

Times in `clip7_scene.js` are absolute seconds; later scenes are chained from earlier ones (`T2`, `B`, `C`, `END`, `T3`, `PW`, `END3`, `S`, `END4`, `S7`, `PA`, `END7`), so lengthening a scene shifts everything after it automatically.

After editing, rebuild, check frames, commit, and if the site is on, push (Pages redeploys from `main` automatically).
