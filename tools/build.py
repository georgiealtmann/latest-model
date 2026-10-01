"""Rebuild index.html from src/. Run: python3 tools/build.py"""
import re, base64, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = lambda f: open(os.path.join(ROOT, 'src', f)).read()
scene = S('clip7_scene.js')
player = S('clip7_player.js').replace("${setH()}${setI()}", "${setH()}${setI()}${setJ()}")
sets = S('clip3_sets.js').replace("/* ===================== inserts ===================== */", S('setJ.js') + "\n/* ===================== inserts ===================== */")
sc = S('scenes.js')
a = sc.index('/* ===================== the film ====================='); b = sc.index('/* small helper animations used above */')
sc = sc[:a] + scene + '\n' + sc[b:]
shell = S('shell.html'); post = shell[shell.index('<script>\n(() => {'):]
b64 = lambda f: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(ROOT, 'src', 'stk', f), 'rb').read()).decode()
stk = f"const STRAW_URI = '{b64('straw.png')}';\nconst HAND_URI = '{b64('handup.png')}';"
for k, v in [('STICKERS', stk), ('ENGINE', S('engine.js')), ('SETS', sets), ('AUDIO', S('audio7.js')), ('SCENES', sc), ('PLAYER', player)]:
    post = post.replace(f'/*__{k}__*/', v)
page = S('head.html') + post
i = page.index('<style>'); j = page.index('</style>') + len('</style>')
head = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="robots" content="noindex, nofollow">\n'
open(os.path.join(ROOT, 'index.html'), 'w').write(head + page[:i] + page[i:j] + '\n</head>\n<body>\n' + page[j:] + '\n</body>\n</html>\n')
print('built index.html')
