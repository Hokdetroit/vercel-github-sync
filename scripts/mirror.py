"""Mirror mimicry-beta.vercel.app (pages + every referenced asset) into /tmp/mirror."""
import os, re, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor

BASE = "https://mimicry-beta.vercel.app"
OUT = "/tmp/mirror"
PAGES = {"/": "index", "/features": "features", "/medical-suite": "medical-suite",
         "/mortgage-suite": "mortgage-suite", "/pricing": "pricing"}

REF = re.compile(r"""(?<![A-Za-z0-9_.:/])(/(?:assets|images|_next|medical-suite|mortgage-suite|pricing|features)/[^"'\s)<>\\`?#]+|/[A-Za-z0-9_\-.]+\.(?:js|css|png|jpg|jpeg|svg|webp|webm|mp4|woff2?|ico|json|gif|avif))""")
CHUNK = re.compile(r"""static/immutable/(?:chunks|media)/[^"'\s)<>\\`]+""")
TEXT_EXT = (".html", ".css", ".js", ".json", ".svg")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.status, r.read()


def local_path(p):
    return os.path.join(OUT, "public", urllib.parse.unquote(p.lstrip("/")))


def extract(text):
    refs = {m.replace("&quot;", "") for m in REF.findall(text)}
    refs |= {"/_next/" + m for m in CHUNK.findall(text)}
    return {r.split("&quot")[0] for r in refs if not r.endswith("/")}


def grab(p):
    dest = local_path(p)
    try:
        if not os.path.exists(dest):
            status, data = fetch(BASE + urllib.parse.quote(p, safe="/%.-_~"))
            if status != 200 or data[:15].lower().startswith(b"<!doctype html"):
                return p, None
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as f:
                f.write(data)
        if dest.endswith(TEXT_EXT):
            return p, open(dest, encoding="utf-8", errors="ignore").read()
        return p, ""
    except Exception:
        return p, None


os.makedirs(os.path.join(OUT, "pages"), exist_ok=True)
pending = set()
for route, name in PAGES.items():
    _, html = fetch(BASE + route)
    html = html.decode("utf-8")
    open(os.path.join(OUT, "pages", name + ".html"), "w").write(html)
    pending |= extract(html)

seen, failed = set(), []
with ThreadPoolExecutor(16) as ex:
    while pending:
        batch = [p for p in pending if p not in seen]
        seen |= set(batch)
        pending = set()
        for p, text in ex.map(grab, batch):
            if text is None:
                failed.append(p)
            elif text:
                pending |= extract(text)

print("downloaded", len(seen) - len(failed))
print("failed/skipped", len(failed))
for f in sorted(failed):
    print("  ", f)
