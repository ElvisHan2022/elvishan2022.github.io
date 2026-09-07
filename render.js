/* =========================================================
   render.js — shared helpers used by both pages (room and map).
   Renders content.js blocks into DOM. No page-specific logic here.
   ========================================================= */
window.R = (function () {
  const S = () => window.SITE;

  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const k of kids) if (k != null) n.append(k);
    return n;
  };

  function linksList() {
    const ul = el("ul", { class: "links" });
    const L = S().links || {};
    const row = (k, href, label) => el("li", {}, el("a", { href, target: href.startsWith("mailto") ? "_self" : "_blank", rel: "noopener" }, el("span", { class: "k" }, k), label));
    if (L.email) ul.append(row("email", "mailto:" + L.email, L.email));
    if (L.github) ul.append(row("github", L.github, L.github.replace(/^https?:\/\//, "")));
    if (L.linkedin) ul.append(row("linkedin", L.linkedin, L.linkedin.replace(/^https?:\/\//, "")));
    if (L.scholar) ul.append(row("scholar", L.scholar, "google scholar"));
    return ul;
  }

  function pubStatusClass(status) {
    const s = (status || "").toLowerCase();
    if (s.includes("accepted")) return "accepted";
    if (s.includes("submitted") || s.includes("in review") || s.includes("under review")) return "review";
    return "progress";
  }

  function renderBlocks(room) {
    const frag = document.createDocumentFragment();
    if (room.intro) frag.append(el("p", { class: "intro" }, room.intro));
    if (room.beliefs) {
      const ol = el("ol", { class: "beliefs" });
      room.beliefs.forEach(b => ol.append(el("li", {}, b)));
      frag.append(ol);
    }
    (room.blocks || []).forEach(b => {
      switch (b.type) {
        case "p": frag.append(el("p", {}, b.text)); break;
        case "h": frag.append(el("h3", {}, b.text)); break;
        case "list": {
          const ul = el("ul");
          b.items.forEach(i => ul.append(el("li", {}, i)));
          frag.append(ul); break;
        }
        case "entry": {
          const d = el("div", { class: "entry" },
            el("h4", {}, b.title),
            el("p", { class: "meta" }, b.meta || ""),
            el("p", {}, b.text || ""));
          if (b.link) d.append(el("a", { class: "more", href: b.link, target: "_blank", rel: "noopener" }, "source ↗"));
          if (b.tags && b.tags.length) {
            const t = el("div", { class: "tags" });
            b.tags.forEach(x => t.append(el("span", {}, x)));
            d.append(t);
          }
          frag.append(d); break;
        }
        case "pub-legend": {
          const leg = el("ul", { class: "pub-legend", "aria-label": "Publication status key" });
          [["accepted", "Accepted"], ["review", "In review"], ["progress", "In progress"]].forEach(([cls, label]) => {
            leg.append(el("li", {}, el("span", { class: "pub-status " + cls }, label)));
          });
          frag.append(leg); break;
        }
        case "pub": {
          const cls = pubStatusClass(b.status);
          const d = el("div", { class: "pub" },
            el("h4", {}, b.title),
            el("div", { class: "pub-meta" },
              b.venue ? el("span", { class: "venue" }, b.venue) : null,
              el("span", { class: "pub-status " + cls }, b.status || "")));
          if (b.text) d.append(el("p", {}, b.text));
          if (b.link) d.append(el("a", { class: "more", href: b.link, target: "_blank", rel: "noopener" }, "code ↗"));
          frag.append(d); break;
        }
        case "links": frag.append(linksList()); break;
      }
    });
    return frag;
  }

  function clock(sel) {
    const n = document.querySelector(sel); if (!n) return;
    const tick = () => {
      try {
        n.textContent = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }).format(new Date());
      } catch (e) { n.textContent = new Date().toTimeString().slice(0, 5); }
    };
    tick(); setInterval(tick, 30000);
  }

  function colophon(sel) {
    const col = document.querySelector(sel); if (!col) return;
    const L = S().links || {};
    if (L.github) col.append(el("a", { href: L.github, target: "_blank", rel: "noopener" }, "github"));
    if (L.linkedin) col.append(el("a", { href: L.linkedin, target: "_blank", rel: "noopener" }, "linkedin"));
    if (L.email) col.append(el("a", { href: "mailto:" + L.email }, "email"));
  }

  return { el, renderBlocks, linksList, clock, colophon };
})();
