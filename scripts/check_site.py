#!/usr/bin/env python3
"""Validate rendered internal links, fragments, assets and document structure."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
from xml.etree import ElementTree
import sys

ROOT = Path('_site')
ORIGIN = 'https://rustyll.better-web.org'
class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.assets, self.ids = [], [], []
        self.canonical, self.og_url, self.og_image, self.description = None, None, None, None
        self.h1 = 0
        self.redirect = False
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ('img','script') and a.get('src'): self.assets.append(a['src'])
        if tag == 'link' and a.get('rel') in ('stylesheet','icon'): self.assets.append(a.get('href',''))
        if tag == 'meta' and a.get('property') == 'og:image': self.assets.append(a.get('content',''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta' and a.get('property') == 'og:url': self.og_url = a.get('content')
        if tag == 'meta' and a.get('property') == 'og:image': self.og_image = a.get('content')
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content')
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and a.get('http-equiv','').lower() == 'refresh': self.redirect = True

def route(file):
    name = '/' + file.relative_to(ROOT).as_posix()
    return name[:-10] if name.endswith('index.html') else name

documents = {route(p): Document(p.read_text()) for p in ROOT.rglob('*.html')}
errors = []
for source, doc in documents.items():
    if doc.redirect: continue
    if doc.h1 != 1: errors.append((source, f'Expected one h1, found {doc.h1}'))
    if len(doc.ids) != len(set(doc.ids)): errors.append((source, 'Duplicate IDs'))
    if not doc.canonical or not doc.canonical.startswith(ORIGIN + '/'):
        errors.append((source, 'Missing or off-origin canonical'))
    if doc.og_url != doc.canonical: errors.append((source, 'Open Graph URL differs from canonical'))
    if not doc.og_image or not doc.og_image.startswith(ORIGIN + '/'):
        errors.append((source, 'Missing or off-origin social image'))
    for href in doc.links + doc.assets:
        target = urlsplit(urljoin(ORIGIN + source, href))
        if target.hostname in ('localhost','127.0.0.1') and target.port == 4000: continue  # Tutorial examples run on the reader's machine.
        if target.scheme not in ('http','https') or target.hostname not in ('rustyll.better-web.org','127.0.0.1','localhost'): continue
        path = unquote(target.path)
        file = ROOT / path.lstrip('/')
        if file.is_dir(): file = file / 'index.html'
        if not file.exists():
            if not path.endswith('/') and (ROOT / path.lstrip('/') / 'index.html').exists(): continue
            errors.append((source, 'Missing target: ' + href)); continue
        key = route(file) if file.suffix == '.html' else None
        if target.fragment and key in documents and not documents[key].redirect and unquote(target.fragment) not in documents[key].ids:
            errors.append((source, 'Missing fragment: ' + href))
for source in ('/', '/docs/', '/news/', '/resources/', '/showcase/', '/404.html'):
    if not documents[source].description:
        errors.append((source, 'Missing page description'))
if (ROOT / 'sitemap.xml').exists():
    sitemap = ElementTree.parse(ROOT / 'sitemap.xml')
    locs = [node.text for node in sitemap.iter() if node.tag.endswith('}loc')]
    if any(not loc.startswith(ORIGIN + '/') for loc in locs):
        errors.append(('/sitemap.xml', 'Off-origin sitemap URL'))
    if any(loc.endswith('/404.html') for loc in locs):
        errors.append(('/sitemap.xml', '404 page must not be indexed'))
if (ROOT / 'feed.xml').exists():
    feed = ElementTree.parse(ROOT / 'feed.xml')
    atom = '{http://www.w3.org/2005/Atom}'
    if not (feed.findtext(atom + 'title') or '').startswith('Rustyll'):
        errors.append(('/feed.xml', 'Feed title must identify Rustyll'))
    if not (feed.findtext(atom + 'id') or '').startswith(ORIGIN + '/'):
        errors.append(('/feed.xml', 'Off-origin feed ID'))
for route_name, source_file in (
    ('/docs/', '_docs/index.md'),
    ('/resources/', 'pages/resources.md'),
    ('/tutorials/home/', '_tutorials/index.md'),
):
    built_file = ROOT / route_name.lstrip('/') / 'index.html'
    html = built_file.read_text()
    expected = f'https://github.com/betterwebinit/rustyll-website/edit/main/{source_file}'
    if expected not in html or '/opt/buildhome/' in html:
        errors.append((route_name, 'Incorrect source edit URL'))
for source, error in sorted(set(errors)): print(f'{source}: {error}')
print(f'Checked {len(documents)} HTML documents; {len(set(errors))} errors.')
sys.exit(bool(errors))
