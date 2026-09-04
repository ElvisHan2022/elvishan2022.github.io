#!/usr/bin/env python3
"""Bundle a page and everything it references into one file.

  python3 build.py              -> dist/index.html (room, standalone)
  python3 build.py --artifact   -> dist/artifact.html (room, body-only fragment for claude.ai Artifacts)
  python3 build.py map          -> dist/map.html (floorplan, standalone)
"""
import re, sys, pathlib, base64, mimetypes

root = pathlib.Path(__file__).parent
page = "map.html" if "map" in sys.argv else "index.html"
html = (root / page).read_text()

def inline_css(m):
    return "<style>\n" + (root / m.group(1)).read_text() + "\n</style>"
def inline_js(m):
    return "<script>\n" + (root / m.group(1)).read_text() + "\n</script>"
def inline_img(m):
    f = root / m.group(1)
    mime = mimetypes.guess_type(f.name)[0] or "image/jpeg"
    return 'src="data:%s;base64,%s"' % (mime, base64.b64encode(f.read_bytes()).decode())

html = re.sub(r'<link rel="stylesheet" href="([^"h][^"]*)">', inline_css, html)
html = re.sub(r'<script src="([^"]+)"></script>', inline_js, html)
html = re.sub(r'src="(img/[^"]+)"', inline_img, html)
# the <picture> source: inline it too, else the bundled file has a dead srcset
def inline_srcset(m):
    f = root / m.group(1)
    mime = mimetypes.guess_type(f.name)[0] or "image/webp"
    return 'srcset="data:%s;base64,%s"' % (mime, base64.b64encode(f.read_bytes()).decode())
html = re.sub(r'srcset="(img/[^"]+)"', inline_srcset, html)

(root / "dist").mkdir(exist_ok=True)
out = "map.html" if page == "map.html" else "index.html"
(root / "dist" / out).write_text(html)

if "--artifact" in sys.argv:
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*?)</body>", html, re.S).group(1)
    cls = re.search(r'<body class="([^"]+)"', html)
    keep = [t for t in re.findall(r"<title>.*?</title>|<link[^>]+>|<style>.*?</style>", head, re.S) if "preconnect" not in t]
    wrap_open = '<div class="%s">' % cls.group(1) if cls else "<div>"
    (root / "dist" / "artifact.html").write_text("\n".join(keep) + "\n" + wrap_open + body + "</div>")
print("built dist/" + out)
