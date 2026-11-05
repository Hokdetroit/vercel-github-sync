"""Extract the homepage footer into a reusable partial + scoped assets.

Outputs:
  mirror/partials/site-footer.html          footer markup (no inline style/script)
  public/assets/site-footer/site-footer.css  wave styles + Webflow rules scoped to .se-footer
  public/assets/site-footer/site-footer.js   wave animation (idempotent)

Re-run after editing the homepage footer: python3 scripts/build-footer.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, 'mirror', 'pages', 'index.html')
WEBFLOW_CSS = os.path.join(ROOT, 'public', 'assets', 'c91ba2f29048-roveia.webflow.shared.e24a8a4c7.css')
PARTIAL = os.path.join(ROOT, 'mirror', 'partials', 'site-footer.html')
ASSET_DIR = os.path.join(ROOT, 'public', 'assets', 'site-footer')
SCOPE = '.se-footer'

html = open(INDEX, encoding='utf8').read()

start = html.find('<section id="footer"')
depth = 0
for m in re.finditer(r'<(/?)section\b[^>]*>', html[start:]):
    depth += -1 if m.group(1) else 1
    if depth == 0:
        end = start + m.end()
        break
footer = html[start:end]

style_css = '\n'.join(re.findall(r'<style>(.*?)</style>', footer, re.S))
script_js = '\n'.join(re.findall(r'<script>(.*?)</script>', footer, re.S))

markup = re.sub(r'<style>.*?</style>', '', footer, flags=re.S)
markup = re.sub(r'<script>.*?</script>', '', markup, flags=re.S)
markup = re.sub(r'<!--.*?-->', '', markup, flags=re.S)
markup = markup.replace(' aria-current="page"', '').replace(' w--current', '')
markup = re.sub(r'\n\s*\n+', '\n', markup)
markup = f'<div class="se-footer">{markup}</div>'

classes = set()
for cl in re.findall(r'class="([^"]+)"', markup):
    classes.update(cl.split())

# --- scoped Webflow rules -------------------------------------------------
css = open(WEBFLOW_CSS, encoding='utf8').read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)

BASE_ELEMENTS = {'h2', 'p', 'a', 'svg', 'img', 'div'}


def parse(block):
    """Yield (prelude, body) for each top-level rule in block."""
    i, n = 0, len(block)
    while i < n:
        brace = block.find('{', i)
        if brace == -1:
            return
        prelude = block[i:brace].strip()
        depth, j = 1, brace + 1
        while depth and j < n:
            if block[j] == '{':
                depth += 1
            elif block[j] == '}':
                depth -= 1
            j += 1
        yield prelude, block[brace + 1:j - 1]
        i = j


def scope_selector(sel):
    sel = sel.strip()
    if sel in (':root', 'html'):
        return None
    if sel == 'body':
        return SCOPE
    tokens = set(re.findall(r'\.([a-zA-Z0-9_-]+)', sel))
    if tokens:
        if not tokens & classes or not tokens <= classes | {'w--current'}:
            return None
        return f'{SCOPE} {sel}'
    if re.fullmatch(r'[a-z0-9]+', sel) and sel in BASE_ELEMENTS:
        return f'{SCOPE} {sel}'
    return None


def process(block):
    out = []
    root_vars = []
    for prelude, body in parse(block):
        if prelude.startswith('@media'):
            inner, inner_vars = process(body)
            if inner:
                out.append(f'{prelude}{{{inner}}}')
            continue
        if prelude.startswith('@'):
            if prelude.startswith('@font-face'):
                out.append(f'{prelude}{{{body}}}')
            continue
        if prelude.strip() == ':root':
            root_vars.append(body)
            continue
        scoped = [s for s in (scope_selector(x) for x in prelude.split(',')) if s]
        if scoped:
            out.append(f'{",".join(scoped)}{{{body.strip()}}}')
    return '\n'.join(out), root_vars


rules, root_vars = process(css)
var_block = ''.join(root_vars)

os.makedirs(ASSET_DIR, exist_ok=True)
os.makedirs(os.path.dirname(PARTIAL), exist_ok=True)

with open(os.path.join(ASSET_DIR, 'site-footer.css'), 'w', encoding='utf8') as f:
    f.write("@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');\n")
    if var_block:
        f.write(f'{SCOPE}{{{var_block}}}\n')
    f.write(f'{SCOPE}{{display:block;font-family:Manrope,sans-serif;color:#101010;'
            f'-webkit-font-smoothing:antialiased;position:relative;isolation:isolate}}\n')
    f.write(f'{SCOPE} *,{SCOPE} *::before,{SCOPE} *::after{{box-sizing:border-box}}\n')
    f.write(rules + '\n')
    f.write(style_css.strip() + '\n')

with open(os.path.join(ASSET_DIR, 'site-footer.js'), 'w', encoding='utf8') as f:
    body = script_js.strip()
    body = body.replace("const root = document.getElementById('roveiaWaveBg');\n  if(!root) return;",
                        "const root = document.getElementById('roveiaWaveBg');\n  if(!root || root.dataset.ready) return;\n  root.dataset.ready = '1';")
    # On hydrated Next.js mirrors the server leaves the old footer (hidden) and exposes
    # the new markup on window; insert it only once React has hydrated that subtree.
    mount = r"""
var OLD = '.W_qXAG_footer,.ma3IoW_footer';
function mount(){
  var html = window.__SE_FOOTER_HTML__;
  if(!html || !document.querySelector(OLD) || document.querySelector('.se-footer')){ init(); return; }
  var t0 = performance.now();
  (function wait(){
    // Re-query each frame: if React re-renders, the server node is replaced by a new one.
    var old = document.querySelector(OLD);
    var hydrated = old && Object.keys(old).some(function(k){ return k.indexOf('__reactFiber') === 0; });
    if(hydrated || performance.now() - t0 > 8000){
      if(old && !document.querySelector('.se-footer')) old.insertAdjacentHTML('afterend', html);
      init();
    } else requestAnimationFrame(wait);
  })();
}
"""
    f.write("(function(){\nfunction init(){\n" + body + "\n}\n" + mount +
            "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();\n})();\n")

with open(PARTIAL, 'w', encoding='utf8') as f:
    f.write(markup)

print('classes:', len(classes), '| css bytes:', len(rules), '| js bytes:', len(script_js), '| markup bytes:', len(markup))
