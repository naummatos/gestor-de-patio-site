"""Verifica as rotas e os links locais da consulta, sem dependências externas."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / "consulta-veicular" / route / "index.html" for route in ("", "termos", "cancelamento-e-reembolso", "privacidade")]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ("href", "src") and value:
                self.urls.append(value)

for page in PAGES:
    assert page.is_file(), f"Página ausente: {page.relative_to(ROOT)}"
    html = page.read_text()
    assert '<html lang="pt-BR">' in html
    assert "12/11/2026" in html
    parser = Links()
    parser.feed(html)
    for url in parser.urls:
        parts = urlsplit(url)
        if parts.scheme or parts.netloc or not parts.path:
            continue
        path = unquote(parts.path)
        target = ROOT / path.lstrip("/") if path.startswith("/") else page.parent / path
        if target.is_dir():
            target /= "index.html"
        assert target.is_file(), f"Link quebrado em {page.relative_to(ROOT)}: {url}"
    for route in ("termos/", "cancelamento-e-reembolso/", "privacidade/"):
        assert f"/consulta-veicular/{route}" in parser.urls
assert "/consulta-veicular/" in (ROOT / "index.html").read_text()
print("OK: quatro páginas em português, versão, navegação e links locais válidos.")
