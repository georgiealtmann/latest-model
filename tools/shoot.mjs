// Screenshot frames: node tools/shoot.mjs <outdir> <seconds...>  (needs Google Chrome)
// node shoot.mjs outdir t1 t2 ...   — one Chrome, many frames
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const D = dirname(dirname(fileURLToPath(import.meta.url))) + '/';
const [out, ...ts] = process.argv.slice(2);
mkdirSync(D + 'frames/' + out, { recursive: true });
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/shoot_${port}`, '--window-size=1280,720', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ver; for (let i = 0; i < 50 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await sleep(200); } }
const page = ver.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const logs = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') logs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') logs.push(m.params.args.map(a => a.value).join(' ')); };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'file://' + D + 'index.html#0' });
for (let i = 0; i < 100; i++) { const r = await send('Runtime.evaluate', { expression: 'window.__boot===true', returnByValue: true }); if (r.result?.result?.value) break; await sleep(150); }
await send('Runtime.evaluate', { expression: `document.querySelector('.bar').style.display='none'; const p=document.getElementById('player'); p.style.width='1280px'; p.style.borderRadius='0'; document.body.style.padding='0'; document.querySelector('.wrap').style.padding='0'; document.querySelector('.wrap').style.gap='0';` });
await sleep(300);
for (const t of ts) {
  await send('Runtime.evaluate', { expression: `document.getElementById('cover').hidden = true; __tl.time(${t}, true); 1` });
  await send('Runtime.evaluate', { expression: `(()=>{const t=__tl.time(); return 1})()` });
  await sleep(60);
  const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1280, height: 720, scale: 1 } });
  writeFileSync(D + 'frames/' + out + '/' + String(Number(t).toFixed(1)).padStart(6, '0') + '.png', Buffer.from(r.result.data, 'base64'));
}
if (logs.length) console.log('ERRORS:', [...new Set(logs)].slice(0, 10).join('\n'));
ws.close(); chrome.kill();
console.log('done', ts.length);
